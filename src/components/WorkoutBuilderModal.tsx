import React, { useState } from 'react';
import { X, Plus, Trash2, Search, Dumbbell, Clock, Flame } from 'lucide-react';
import { WorkoutRoutine, WorkoutExercisePlan, Exercise } from '../types/fitness';
import { EXERCISES_DATABASE } from '../data/exercisesData';

interface WorkoutBuilderModalProps {
  initialRoutine?: WorkoutRoutine | null;
  onSave: (routine: WorkoutRoutine) => void;
  onClose: () => void;
}

export const WorkoutBuilderModal: React.FC<WorkoutBuilderModalProps> = ({
  initialRoutine,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState<string>(initialRoutine?.title || '');
  const [description, setDescription] = useState<string>(initialRoutine?.description || '');
  const [category, setCategory] = useState<string>(initialRoutine?.category || 'Hypertrophie / Musculation');
  const [durationMinutes, setDurationMinutes] = useState<number>(initialRoutine?.durationMinutes || 45);
  const [selectedPlans, setSelectedPlans] = useState<WorkoutExercisePlan[]>(
    initialRoutine?.exercises || [
      { exerciseId: 'bench-press', sets: 4, targetReps: '8-10', targetWeightKg: 60, restSeconds: 90 },
      { exerciseId: 'military-press', sets: 3, targetReps: '10', targetWeightKg: 35, restSeconds: 75 }
    ]
  );

  // Exercise picker state
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('Tous');

  const filteredExercises = EXERCISES_DATABASE.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Tous' || ex.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddExerciseFromPicker = (exercise: Exercise) => {
    const newPlan: WorkoutExercisePlan = {
      exerciseId: exercise.id,
      sets: 3,
      targetReps: '10-12',
      targetWeightKg: 20,
      restSeconds: exercise.defaultRestSeconds || 60,
    };
    setSelectedPlans([...selectedPlans, newPlan]);
    setShowPicker(false);
  };

  const handleRemoveExercise = (idx: number) => {
    setSelectedPlans(selectedPlans.filter((_, i) => i !== idx));
  };

  const handleUpdatePlan = (idx: number, field: keyof WorkoutExercisePlan, val: any) => {
    const updated = [...selectedPlans];
    updated[idx] = { ...updated[idx], [field]: val };
    setSelectedPlans(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const routine: WorkoutRoutine = {
      id: initialRoutine?.id || 'custom_' + Date.now(),
      title: title.trim(),
      description: description.trim() || 'Programme personnalisé créé sur mesure.',
      category,
      durationMinutes,
      difficulty: 'Intermédiaire',
      estimatedCalories: Math.round(durationMinutes * 6.5),
      exercises: selectedPlans,
      isCustom: true,
    };

    onSave(routine);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-lime-400/20 text-lime-400 rounded-xl">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {initialRoutine ? 'Modifier le programme' : 'Créer une nouvelle routine'}
              </h3>
              <p className="text-xs text-neutral-400">
                Personnalisez vos exercices, séries et temps de repos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* General Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Titre du programme *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Upper Body Force & Volume"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-hidden focus:border-lime-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-lime-400"
              >
                <option value="Hypertrophie / Musculation">Hypertrophie / Musculation</option>
                <option value="Force & Explosivité">Force & Explosivité</option>
                <option value="Cardio & Perte de Poids">Cardio & Perte de Poids</option>
                <option value="Endurance & HIIT">Endurance & HIIT</option>
                <option value="Renforcement & Posture">Renforcement & Posture</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex : Focus sur les trapèzes et le faisceau claviculaire..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-hidden focus:border-lime-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Durée estimée (minutes)
              </label>
              <input
                type="number"
                min="10"
                max="180"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-lime-400"
              />
            </div>
          </div>

          {/* Exercises in Routine */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Exercices programmés ({selectedPlans.length})
              </label>
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                className="px-3 py-1.5 bg-lime-400/20 hover:bg-lime-400/30 text-lime-400 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Ajouter un exercice
              </button>
            </div>

            {selectedPlans.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-neutral-800 rounded-2xl text-neutral-500 text-xs">
                Aucun exercice dans ce programme. Cliquez sur « Ajouter un exercice ».
              </div>
            ) : (
              <div className="space-y-2.5">
                {selectedPlans.map((plan, idx) => {
                  const exData = EXERCISES_DATABASE.find(e => e.id === plan.exerciseId);
                  return (
                    <div
                      key={plan.exerciseId + idx}
                      className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-[180px]">
                        <span className="w-6 h-6 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-mono font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {exData?.name || plan.exerciseId}
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            {exData?.category} · {exData?.equipment}
                          </div>
                        </div>
                      </div>

                      {/* Controls for Sets, Reps, Rest */}
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-500">Séries:</span>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={plan.sets}
                            onChange={(e) => handleUpdatePlan(idx, 'sets', parseInt(e.target.value, 10))}
                            className="w-12 bg-neutral-900 border border-neutral-800 text-center rounded-lg py-1 text-white font-mono"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-neutral-500">Reps:</span>
                          <input
                            type="text"
                            value={plan.targetReps}
                            onChange={(e) => handleUpdatePlan(idx, 'targetReps', e.target.value)}
                            placeholder="8-10"
                            className="w-14 bg-neutral-900 border border-neutral-800 text-center rounded-lg py-1 text-white font-mono"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-neutral-500">Repos:</span>
                          <input
                            type="number"
                            step="15"
                            value={plan.restSeconds}
                            onChange={(e) => handleUpdatePlan(idx, 'restSeconds', parseInt(e.target.value, 10))}
                            className="w-14 bg-neutral-900 border border-neutral-800 text-center rounded-lg py-1 text-white font-mono"
                          />
                          <span className="text-[10px] text-neutral-500">s</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveExercise(idx)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs rounded-xl"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={selectedPlans.length === 0}
              className="px-5 py-2 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-400/20 disabled:opacity-40"
            >
              Enregistrer le programme
            </button>
          </div>
        </form>

        {/* Nested Exercise Picker Modal */}
        {showPicker && (
          <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Choisir un exercice</h4>
                <button
                  type="button"
                  onClick={() => setShowPicker(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 border-b border-neutral-800 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un exercice..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-lime-400"
                  />
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  {['Tous', 'Pectoraux', 'Dos', 'Épaules', 'Biceps', 'Triceps', 'Quadriceps', 'Fessiers', 'Abdominaux', 'Cardio'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                        filterCategory === cat
                          ? 'bg-lime-400 text-neutral-950 font-bold'
                          : 'bg-neutral-950 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredExercises.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => handleAddExerciseFromPicker(ex)}
                    className="p-3 bg-neutral-950 hover:bg-neutral-800/80 border border-neutral-800/80 rounded-xl flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-lime-400 transition-colors">
                        {ex.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {ex.category} · {ex.equipment} · Repos {ex.defaultRestSeconds}s
                      </div>
                    </div>
                    <span className="p-1.5 rounded-lg bg-neutral-900 group-hover:bg-lime-400 group-hover:text-neutral-950 text-neutral-400 text-xs">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
