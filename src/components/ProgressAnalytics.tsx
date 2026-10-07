import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  History, 
  Plus, 
  Calendar, 
  Scale, 
  Flame, 
  Dumbbell, 
  Download, 
  Upload,
  Check
} from 'lucide-react';
import { 
  getStoredHistory, 
  getStoredRecords, 
  getStoredMeasurements, 
  addBodyMeasurement, 
  getStoredProfile 
} from '../utils/storage';
import { BodyMeasurement, CompletedWorkout, PersonalRecord } from '../types/fitness';

export const ProgressAnalytics: React.FC = () => {
  const [history, setHistory] = useState<CompletedWorkout[]>(getStoredHistory());
  const [records, setRecords] = useState<PersonalRecord[]>(getStoredRecords());
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(getStoredMeasurements());
  const profile = getStoredProfile();

  // Add measurement modal
  const [showAddMeasure, setShowAddMeasure] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(profile.currentWeightKg);
  const [waist, setWaist] = useState<number>(82);
  const [chest, setChest] = useState<number>(102);
  const [arms, setArms] = useState<number>(38);
  const [thighs, setThighs] = useState<number>(58);

  // Tab inside analytics
  const [subTab, setSubTab] = useState<'records' | 'history' | 'body'>('records');

  const handleSaveMeasure = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    addBodyMeasurement({
      date: today,
      weightKg: weight,
      waistCm: waist,
      chestCm: chest,
      armsCm: arms,
      thighsCm: thighs,
    });
    setMeasurements(getStoredMeasurements());
    setShowAddMeasure(false);
  };

  // Export JSON backup
  const handleExportData = () => {
    const data = {
      profile,
      history,
      records,
      measurements,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pulsefit-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // SVG Chart points calculation for weight curve
  const sortedMeasurements = [...measurements].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const weights = sortedMeasurements.map(m => m.weightKg);
  const minWeight = Math.min(...weights, profile.targetWeightKg) - 1;
  const maxWeight = Math.max(...weights, profile.targetWeightKg) + 1;
  const range = maxWeight - minWeight || 1;

  const chartWidth = 500;
  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 25;

  const points = sortedMeasurements.map((m, idx) => {
    const x = paddingX + (idx / Math.max(1, sortedMeasurements.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((m.weightKg - minWeight) / range) * (chartHeight - paddingY * 2);
    return { x, y, ...m };
  });

  const svgPath = points.length > 1
    ? points.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '')
    : '';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-3xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-lime-400" />
            Progression, Records & Historique
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Visualisez vos gains de force, votre évolution pondérale et l'historique de vos séances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportData}
            className="px-3.5 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-lime-400" />
            Exporter JSON
          </button>
          <button
            type="button"
            onClick={() => setShowAddMeasure(true)}
            className="px-3.5 py-2 bg-lime-400 hover:bg-lime-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nouvelle Pesée
          </button>
        </div>
      </div>

      {/* Weight Chart Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Courbe d'Évolution du Poids Corporel
            </span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {profile.currentWeightKg} kg{' '}
              <span className="text-xs text-neutral-400 font-normal">
                (Objectif : {profile.targetWeightKg} kg)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400 inline-block" />
              Poids réel
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-neutral-600 inline-block" />
              Cible
            </span>
          </div>
        </div>

        {/* SVG Curve */}
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 filter drop-shadow-md">
            {/* Grid lines */}
            <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#262626" strokeDasharray="3 3" />
            <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#262626" strokeDasharray="3 3" />
            <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#262626" strokeDasharray="3 3" />

            {/* Target Weight dashed line */}
            {(() => {
              const targetY = chartHeight - paddingY - ((profile.targetWeightKg - minWeight) / range) * (chartHeight - paddingY * 2);
              return (
                <line
                  x1={paddingX}
                  y1={targetY}
                  x2={chartWidth - paddingX}
                  y2={targetY}
                  stroke="#525252"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              );
            })()}

            {/* Real Weight Line */}
            {svgPath && (
              <path
                d={svgPath}
                fill="none"
                stroke="#a3e635"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data point dots */}
            {points.map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="4" fill="#a3e635" stroke="#0a0a0a" strokeWidth="2" />
                <text
                  x={pt.x}
                  y={pt.y - 8}
                  fill="#ffffff"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {pt.weightKg}k
                </text>
                <text
                  x={pt.x}
                  y={chartHeight - 6}
                  fill="#737373"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {pt.date.split('-').slice(1).join('/')}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Tab Switcher for Details */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          type="button"
          onClick={() => setSubTab('records')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'records'
              ? 'bg-neutral-800 text-lime-400 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          🏆 Records Personnels (PR & 1RM)
        </button>
        <button
          type="button"
          onClick={() => setSubTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'history'
              ? 'bg-neutral-800 text-lime-400 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          📋 Journal des Séances ({history.length})
        </button>
        <button
          type="button"
          onClick={() => setSubTab('body')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'body'
              ? 'bg-neutral-800 text-lime-400 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          📏 Mensurations Corporelles
        </button>
      </div>

      {/* SUBTAB 1: RECORDS */}
      {subTab === 'records' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {records.map((rec) => (
              <div
                key={rec.exerciseId}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{rec.exerciseName}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    {rec.category} · Enregistré le {rec.date}
                  </div>
                  <div className="text-xs text-neutral-300 font-mono mt-2">
                    Charge max : <strong className="text-white font-bold">{rec.maxWeightKg} kg</strong> × {rec.maxReps} reps
                  </div>
                </div>

                <div className="text-right bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded-2xl">
                  <div className="text-[10px] text-neutral-500 uppercase font-bold">1RM Estimé</div>
                  <div className="text-xl font-black font-mono text-lime-400">
                    ~{rec.estimatedOneRepMaxKg} kg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: WORKOUT HISTORY */}
      {subTab === 'history' && (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="p-8 text-center bg-neutral-900 border border-neutral-800 rounded-3xl text-neutral-500 text-xs">
              Aucune séance enregistrée pour l'instant. Démarrez un entraînement depuis l'onglet Séances !
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.routineTitle}</h3>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {new Date(item.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-lime-400 font-bold">{item.durationMinutes} min</span>
                    <span>·</span>
                    <span className="text-white font-bold">{item.totalVolumeKg} kg</span>
                    <span>·</span>
                    <span className="text-neutral-400">{item.estimatedCalories} kcal</span>
                    {item.rating && (
                      <span className="ml-1">{'⭐'.repeat(item.rating)}</span>
                    )}
                  </div>
                </div>

                {/* Exercises summary chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.exercises.map((ex, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300"
                    >
                      <strong className="text-white">{ex.exerciseName}</strong> : {ex.setsCompleted} séries (max {ex.maxWeightKg}kg)
                    </div>
                  ))}
                </div>

                {item.notes && (
                  <p className="text-xs text-neutral-400 italic bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/50">
                    « {item.notes} »
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* SUBTAB 3: BODY MEASUREMENTS */}
      {subTab === 'body' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 uppercase font-mono text-[11px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Poids (kg)</th>
                  <th className="py-2.5 px-3">Taille (cm)</th>
                  <th className="py-2.5 px-3">Poitrine (cm)</th>
                  <th className="py-2.5 px-3">Bras (cm)</th>
                  <th className="py-2.5 px-3">Cuisses (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300 font-mono">
                {measurements.map((m) => (
                  <tr key={m.id} className="hover:bg-neutral-950/40">
                    <td className="py-2.5 px-3 font-semibold text-white">{m.date}</td>
                    <td className="py-2.5 px-3 text-lime-400 font-bold">{m.weightKg} kg</td>
                    <td className="py-2.5 px-3">{m.waistCm || '-'} cm</td>
                    <td className="py-2.5 px-3">{m.chestCm || '-'} cm</td>
                    <td className="py-2.5 px-3">{m.armsCm || '-'} cm</td>
                    <td className="py-2.5 px-3">{m.thighsCm || '-'} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Measurement Modal */}
      {showAddMeasure && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in duration-200">
            <h3 className="font-bold text-white text-base mb-1">Enregistrer une pesée & mensurations</h3>
            <p className="text-xs text-neutral-400 mb-4">Mettez à jour vos mesures pour suivre vos progrès physiques.</p>

            <form onSubmit={handleSaveMeasure} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Poids (kg) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-sm text-lime-400 font-bold font-mono focus:outline-hidden focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Tour de taille (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={waist}
                    onChange={(e) => setWaist(parseFloat(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Tour de poitrine (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={chest}
                    onChange={(e) => setChest(parseFloat(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Tour de bras (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={arms}
                    onChange={(e) => setArms(parseFloat(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Tour de cuisses (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={thighs}
                    onChange={(e) => setThighs(parseFloat(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMeasure(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
