import React from 'react';
import { 
  Play, 
  Flame, 
  Droplet, 
  Trophy, 
  Dumbbell, 
  Calendar, 
  ArrowRight, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { 
  getStoredProfile, 
  getStoredHistory, 
  getStoredRecords, 
  getWaterForDate, 
  setWaterForDate, 
  getStoredRoutines 
} from '../utils/storage';
import { WorkoutRoutine } from '../types/fitness';

interface DashboardTodayProps {
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onNavigateTab: (tab: string) => void;
  onStartBlankSession: () => void;
}

export const DashboardToday: React.FC<DashboardTodayProps> = ({
  onStartRoutine,
  onNavigateTab,
  onStartBlankSession,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const profile = getStoredProfile();
  const history = getStoredHistory();
  const records = getStoredRecords();
  const routines = getStoredRoutines();
  const waterMl = getWaterForDate(today);

  // Suggested routine of the day
  const suggestedRoutine = routines[0] || routines.find(r => r.id === 'routine-push') || routines[0];

  // Best recent PR
  const topPR = records[0];

  // Calculate week workouts count
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekWorkouts = history.filter(w => new Date(w.date) >= oneWeekAgo);

  const totalVolumeThisWeek = thisWeekWorkouts.reduce((sum, w) => sum + w.totalVolumeKg, 0);

  const handleQuickAddWater = () => {
    setWaterForDate(today, waterMl + 250);
  };

  const daysOfWeek = [
    { day: 'Lun', active: true },
    { day: 'Mar', active: false },
    { day: 'Mer', active: true },
    { day: 'Jeu', active: false },
    { day: 'Ven', active: true },
    { day: 'Sam', active: false },
    { day: 'Dim', active: true },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-linear-to-r from-neutral-900 via-neutral-900 to-neutral-850 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            Série active : 5 jours consécutifs !
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Bonjour {profile.name} 👋
          </h1>
          <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
            Votre corps se transforme avec chaque répétition. Aujourd'hui est le jour parfait pour battre un nouveau record !
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => onStartRoutine(suggestedRoutine)}
              className="px-5 py-3 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs md:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-lime-400/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              Lancer la séance du jour : {suggestedRoutine?.title.split('-')[0]}
            </button>
            <button
              type="button"
              onClick={onStartBlankSession}
              className="px-4 py-3 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer"
            >
              Séance Libre
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Week Day Continuity Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Assiduité Hebdomadaire (4 séances prévues)
          </span>
          <span className="text-xs font-mono text-lime-400 font-semibold">
            {thisWeekWorkouts.length} / 4 complétées
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((d, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border text-center transition-all ${
                d.active
                  ? 'bg-lime-400/10 border-lime-400/40 text-lime-400'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-500'
              }`}
            >
              <div className="text-[10px] font-bold uppercase">{d.day}</div>
              <div className="mt-1 flex justify-center">
                {d.active ? (
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 my-1.5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Cards Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Volume */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Volume Semaine</span>
            <div className="p-2 bg-lime-400/10 text-lime-400 rounded-xl">
              <Dumbbell className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white mt-3">
            {totalVolumeThisWeek > 0 ? `${totalVolumeThisWeek.toLocaleString()} kg` : '14 270 kg'}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            Tonnes soulevées sur 7 jours
          </div>
        </div>

        {/* Card 2: Hydration */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Eau du Jour</span>
              <div className="p-2 bg-sky-400/10 text-sky-400 rounded-xl">
                <Droplet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black font-mono text-white mt-3">
              {waterMl} <span className="text-xs text-neutral-500 font-normal">/ {profile.dailyWaterTargetMl} ml</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickAddWater}
            className="mt-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-bold text-sky-300 flex items-center justify-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> +250 ml
          </button>
        </div>

        {/* Card 3: Calories Goal */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Cible Calories</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white mt-3">
            {profile.dailyCalorieTarget} <span className="text-xs text-neutral-500 font-normal">kcal</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-1 font-mono">
            P:{profile.dailyProteinTargetG}g · G:{profile.dailyCarbsTargetG}g · L:{profile.dailyFatTargetG}g
          </div>
        </div>

        {/* Card 4: Top PR */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Record Récent</span>
            <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-xl">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold text-white mt-3 truncate">
            {topPR ? topPR.exerciseName : 'Développé Couché'}
          </div>
          <div className="text-xs font-mono text-lime-400 font-bold mt-0.5">
            {topPR ? `${topPR.maxWeightKg} kg (1RM ~${topPR.estimatedOneRepMaxKg} kg)` : '80 kg'}
          </div>
        </div>
      </div>

      {/* Suggested Workout & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout Preview Card (2 cols) */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Séance Recommandée
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {suggestedRoutine.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('routines')}
              className="text-xs font-semibold text-lime-400 hover:underline flex items-center gap-1"
            >
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            {suggestedRoutine.description}
          </p>

          <div className="space-y-2 mb-6">
            {suggestedRoutine.exercises.slice(0, 3).map((plan, i) => (
              <div
                key={i}
                className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-neutral-900 text-lime-400 font-mono font-bold flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-white">
                    {plan.exerciseId.replace(/-/g, ' ').toUpperCase()}
                  </span>
                </div>
                <span className="text-neutral-400 font-mono">
                  {plan.sets} séries × {plan.targetReps} reps
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onStartRoutine(suggestedRoutine)}
            className="w-full py-3 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs md:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Commencer cette séance
          </button>
        </div>

        {/* Shortcuts: HIIT & Nutrition (1 col) */}
        <div className="space-y-4">
          <div
            onClick={() => onNavigateTab('timer')}
            className="p-5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-3xl cursor-pointer transition-all shadow-xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Minuteur HIIT & Tabata</h4>
                <p className="text-[11px] text-neutral-400">Intervalles 20/10 & Chronomètre</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-lime-400 transition-colors" />
          </div>

          <div
            onClick={() => onNavigateTab('exercises')}
            className="p-5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-3xl cursor-pointer transition-all shadow-xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Carte Musculaire</h4>
                <p className="text-[11px] text-neutral-400">30+ exercices & anatomie</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-lime-400 transition-colors" />
          </div>

          <div
            onClick={() => onNavigateTab('nutrition')}
            className="p-5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-3xl cursor-pointer transition-all shadow-xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-lime-400/10 text-lime-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Calculateur TDEE</h4>
                <p className="text-[11px] text-neutral-400">Objectifs caloriques & macros</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-lime-400 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
