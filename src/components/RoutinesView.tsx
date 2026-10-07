import React, { useState } from 'react';
import { 
  Dumbbell, 
  Play, 
  Plus, 
  Clock, 
  Flame, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { WorkoutRoutine, Exercise, ActiveWorkoutSession } from '../types/fitness';
import { getStoredRoutines, saveRoutines, addOrUpdateRoutine } from '../utils/storage';
import { EXERCISES_DATABASE } from '../data/exercisesData';
import { WorkoutBuilderModal } from './WorkoutBuilderModal';

interface RoutinesViewProps {
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onStartBlankSession: () => void;
}

export const RoutinesView: React.FC<RoutinesViewProps> = ({
  onStartRoutine,
  onStartBlankSession,
}) => {
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(getStoredRoutines());
  const [selectedFilter, setSelectedFilter] = useState<string>('Tous');
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [routineToEdit, setRoutineToEdit] = useState<WorkoutRoutine | null>(null);

  const categories = ['Tous', 'Hypertrophie / Musculation', 'Force & Volume', 'Général / Débutant & Pro', 'Cardio / Perte de poids', 'Gainage & Posture'];

  const filteredRoutines = routines.filter(r => {
    if (selectedFilter === 'Tous') return true;
    return r.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const handleSaveRoutine = (newRoutine: WorkoutRoutine) => {
    addOrUpdateRoutine(newRoutine);
    setRoutines(getStoredRoutines());
    setIsBuilderOpen(false);
    setRoutineToEdit(null);
  };

  const handleDeleteRoutine = (id: string) => {
    const updated = routines.filter(r => r.id !== id);
    saveRoutines(updated);
    setRoutines(updated);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-lime-400" />
            Programmes & Séances d'Entraînement
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Sélectionnez une routine guidée ou créez votre propre programme sur-mesure.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onStartBlankSession}
            className="flex-1 sm:flex-none px-4 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors"
          >
            Séance Libre
          </button>
          <button
            type="button"
            onClick={() => {
              setRoutineToEdit(null);
              setIsBuilderOpen(true);
            }}
            className="flex-1 sm:flex-none px-4 py-2 bg-lime-400 hover:bg-lime-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nouveau Programme
          </button>
        </div>
      </div>

      {/* Category Filter Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all border ${
              selectedFilter === cat
                ? 'bg-neutral-800 text-lime-400 font-bold border-lime-400/40 shadow-xs'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoutines.map((routine) => (
          <div
            key={routine.id}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between hover:border-neutral-700 transition-all group"
          >
            <div>
              {/* Category & Custom badge */}
              <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                <span className="text-lime-400 font-medium">{routine.category}</span>
                {routine.isCustom && (
                  <span className="px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 text-[10px]">
                    Personnalisé
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-white text-base group-hover:text-lime-300 transition-colors">
                {routine.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                {routine.description}
              </p>

              {/* Meta metrics (duration, calories, exercises count) */}
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mt-4 py-3 border-y border-neutral-800/80">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{routine.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>~{routine.estimatedCalories} kcal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{routine.exercises.length} exos</span>
                </div>
              </div>

              {/* Exercises Preview List */}
              <div className="my-3 space-y-1.5">
                {routine.exercises.slice(0, 4).map((plan, idx) => {
                  const ex = EXERCISES_DATABASE.find(e => e.id === plan.exerciseId);
                  return (
                    <div
                      key={idx}
                      className="text-xs text-neutral-300 flex items-center justify-between"
                    >
                      <span className="truncate max-w-[200px]">
                        • {ex?.name || plan.exerciseId}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {plan.sets} × {plan.targetReps}
                      </span>
                    </div>
                  );
                })}
                {routine.exercises.length > 4 && (
                  <div className="text-[11px] text-neutral-500 italic">
                    + {routine.exercises.length - 4} autres exercices
                  </div>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-2">
              {routine.isCustom && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setRoutineToEdit(routine);
                      setIsBuilderOpen(true);
                    }}
                    className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteRoutine(routine.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => onStartRoutine(routine)}
                className="w-full py-2.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-lime-400/10 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Lancer l'entraînement
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Builder Modal */}
      {isBuilderOpen && (
        <WorkoutBuilderModal
          initialRoutine={routineToEdit}
          onSave={handleSaveRoutine}
          onClose={() => {
            setIsBuilderOpen(false);
            setRoutineToEdit(null);
          }}
        />
      )}
    </div>
  );
};
