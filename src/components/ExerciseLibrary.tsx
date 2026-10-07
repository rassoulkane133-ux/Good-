import React, { useState } from 'react';
import { 
  Search, 
  Dumbbell, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Clock, 
  X, 
  Award,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Exercise, MuscleGroup } from '../types/fitness';
import { EXERCISES_DATABASE } from '../data/exercisesData';
import { AnatomyViewer } from './AnatomyViewer';
import { getStoredRecords } from '../utils/storage';

interface ExerciseLibraryProps {
  onStartExerciseDirectly?: (exercise: Exercise) => void;
}

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  onStartExerciseDirectly,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'Tous'>('Tous');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('Tous');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const personalRecords = getStoredRecords();

  const muscleCategories: (MuscleGroup | 'Tous')[] = [
    'Tous',
    'Pectoraux',
    'Dos',
    'Épaules',
    'Biceps',
    'Triceps',
    'Quadriceps',
    'Ischio-jambiers',
    'Fessiers',
    'Mollets',
    'Abdominaux',
    'Cardio'
  ];

  const equipmentList = [
    'Tous',
    'Barre',
    'Haltères',
    'Poids du corps',
    'Machine',
    'Poulie / Câble',
    'Cardio'
  ];

  const filteredExercises = EXERCISES_DATABASE.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'Tous' || ex.category === selectedMuscle || ex.secondaryMuscles.includes(selectedMuscle as MuscleGroup);
    const matchesEquip = selectedEquipment === 'Tous' || ex.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquip;
  });

  const getRecordForExercise = (name: string) => {
    return personalRecords.find(r => r.exerciseName.toLowerCase() === name.toLowerCase());
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Section: Title & Anatomy Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Search, Filters & Stats */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              <Dumbbell className="w-5 h-5 text-lime-400" />
              Bibliothèque d'Exercices & Anatomie
            </h2>
            <p className="text-xs text-neutral-400 mb-5">
              Explorez plus de 30 mouvements avec conseils biomécaniques détaillés et erreurs à éviter.
            </p>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom d'exercice (ex: Squat, Développé, Tractions...)"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-lime-400 transition-colors"
              />
            </div>

            {/* Equipment Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              <span className="text-neutral-500 font-medium whitespace-nowrap text-[11px]">Équipement :</span>
              {equipmentList.map((eq) => (
                <button
                  key={eq}
                  type="button"
                  onClick={() => setSelectedEquipment(eq)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    selectedEquipment === eq
                      ? 'bg-neutral-800 text-lime-400 font-bold border border-lime-400/30'
                      : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>

          {/* Muscle Group Horizontal Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {muscleCategories.map((muscle) => (
              <button
                key={muscle}
                type="button"
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedMuscle === muscle
                    ? 'bg-lime-400 text-neutral-950 border-lime-400 shadow-md shadow-lime-400/20'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>

          {/* Exercises Grid List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredExercises.map((exercise) => {
              const rec = getRecordForExercise(exercise.name);
              return (
                <div
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className="bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between group shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-white text-sm group-hover:text-lime-400 transition-colors">
                        {exercise.name}
                      </h3>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-400">
                        {exercise.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1.5">
                      <span className="text-lime-400 font-medium">{exercise.category}</span>
                      <span>·</span>
                      <span>{exercise.equipment}</span>
                      <span>·</span>
                      <span>Repos : {exercise.defaultRestSeconds}s</span>
                    </div>
                  </div>

                  {rec && (
                    <div className="mt-3 pt-2.5 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Award className="w-3.5 h-3.5" /> Record
                      </span>
                      <span className="font-bold text-white">
                        {rec.maxWeightKg} kg × {rec.maxReps} reps
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Interactive Anatomy Visualizer */}
        <div className="sticky top-20">
          <AnatomyViewer
            selectedCategory={selectedMuscle === 'Tous' ? null : (selectedMuscle as MuscleGroup)}
            onSelectMuscle={(m) => setSelectedMuscle(m)}
            interactive={true}
          />
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400">
                  {selectedExercise.category} · {selectedExercise.equipment}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                  {selectedExercise.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExercise(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
              {/* Muscle Targeting Summary */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Muscle principal</div>
                  <div className="text-sm font-bold text-lime-400 mt-0.5">{selectedExercise.category}</div>
                </div>
                {selectedExercise.secondaryMuscles.length > 0 && (
                  <div className="text-right">
                    <div className="text-[10px] text-neutral-500 uppercase font-semibold">Muscles secondaires</div>
                    <div className="text-xs text-sky-400 font-medium mt-0.5">
                      {selectedExercise.secondaryMuscles.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions Steps */}
              <div>
                <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  Instructions Pas à Pas
                </h4>
                <ol className="space-y-2 text-neutral-300">
                  {selectedExercise.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-lime-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Pro Tips */}
              {selectedExercise.tips.length > 0 && (
                <div className="p-4 bg-neutral-950/80 border border-lime-400/20 rounded-2xl">
                  <h4 className="font-bold text-lime-400 text-xs mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    Conseils du Coach
                  </h4>
                  <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                    {selectedExercise.tips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {selectedExercise.commonMistakes.length > 0 && (
                <div className="p-4 bg-neutral-950/80 border border-amber-500/20 rounded-2xl">
                  <h4 className="font-bold text-amber-400 text-xs mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Erreurs Fréquentes à Éviter
                  </h4>
                  <ul className="space-y-1.5 text-neutral-300 list-disc list-inside">
                    {selectedExercise.commonMistakes.map((err, idx) => (
                      <li key={idx} className="leading-relaxed">{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Repos conseillé : {selectedExercise.defaultRestSeconds}s</span>
              </div>

              {onStartExerciseDirectly && (
                <button
                  type="button"
                  onClick={() => {
                    onStartExerciseDirectly(selectedExercise);
                    setSelectedExercise(null);
                  }}
                  className="px-4 py-2 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Démarrer avec cet exercice
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
