import React, { useState } from 'react';
import { Navigation, TabType } from './components/Navigation';
import { DashboardToday } from './components/DashboardToday';
import { RoutinesView } from './components/RoutinesView';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { HiitTimer } from './components/HiitTimer';
import { NutritionTracker } from './components/NutritionTracker';
import { ProgressAnalytics } from './components/ProgressAnalytics';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { 
  ActiveWorkoutSession, 
  WorkoutRoutine, 
  Exercise, 
  CompletedWorkout, 
  SessionExercise 
} from './types/fitness';
import { EXERCISES_DATABASE } from './data/exercisesData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('today');
  const [activeSession, setActiveSession] = useState<ActiveWorkoutSession | null>(null);

  // Start a specific routine in the live player
  const handleStartRoutine = (routine: WorkoutRoutine) => {
    const sessionExercises: SessionExercise[] = routine.exercises.map((plan) => {
      const exData = EXERCISES_DATABASE.find(e => e.id === plan.exerciseId);
      const sets = Array.from({ length: plan.sets }, (_, i) => ({
        id: `set_${Date.now()}_${i}`,
        setNumber: i + 1,
        weightKg: plan.targetWeightKg || 20,
        reps: parseInt(plan.targetReps.split('-')[0], 10) || 10,
        completed: false,
      }));

      return {
        exerciseId: plan.exerciseId,
        exerciseName: exData?.name || plan.exerciseId,
        category: exData?.category || 'Pectoraux',
        equipment: exData?.equipment || 'Barre',
        sets,
      };
    });

    const newSession: ActiveWorkoutSession = {
      routineId: routine.id,
      routineTitle: routine.title,
      startTime: Date.now(),
      exercises: sessionExercises,
      currentExerciseIndex: 0,
      isPaused: false,
    };

    setActiveSession(newSession);
  };

  // Start an empty free-workout session
  const handleStartBlankSession = () => {
    const firstEx = EXERCISES_DATABASE[0];
    const newSession: ActiveWorkoutSession = {
      routineTitle: 'Entraînement Libre',
      startTime: Date.now(),
      currentExerciseIndex: 0,
      isPaused: false,
      exercises: [
        {
          exerciseId: firstEx.id,
          exerciseName: firstEx.name,
          category: firstEx.category,
          equipment: firstEx.equipment,
          sets: [
            { id: `set_${Date.now()}_1`, setNumber: 1, weightKg: 20, reps: 10, completed: false },
            { id: `set_${Date.now()}_2`, setNumber: 2, weightKg: 20, reps: 10, completed: false },
            { id: `set_${Date.now()}_3`, setNumber: 3, weightKg: 20, reps: 10, completed: false },
          ],
        },
      ],
    };

    setActiveSession(newSession);
  };

  // Start workout from an exercise in the library
  const handleStartExerciseDirectly = (exercise: Exercise) => {
    const newSession: ActiveWorkoutSession = {
      routineTitle: `Séance : ${exercise.name}`,
      startTime: Date.now(),
      currentExerciseIndex: 0,
      isPaused: false,
      exercises: [
        {
          exerciseId: exercise.id,
          exerciseName: exercise.name,
          category: exercise.category,
          equipment: exercise.equipment,
          sets: [
            { id: `set_${Date.now()}_1`, setNumber: 1, weightKg: 20, reps: 10, completed: false },
            { id: `set_${Date.now()}_2`, setNumber: 2, weightKg: 20, reps: 10, completed: false },
            { id: `set_${Date.now()}_3`, setNumber: 3, weightKg: 20, reps: 10, completed: false },
          ],
        },
      ],
    };

    setActiveSession(newSession);
  };

  const handleWorkoutFinished = (_completed: CompletedWorkout) => {
    setActiveSession(null);
    setCurrentTab('analytics');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col pb-20 md:pb-8">
      {/* Top Navbar */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeSession={activeSession}
        onOpenActiveSession={() => {
          // If already minimized, open
        }}
      />

      {/* Main Tab Content */}
      <main className="flex-1 px-4 md:px-8 py-6">
        {currentTab === 'today' && (
          <DashboardToday
            onStartRoutine={handleStartRoutine}
            onNavigateTab={(tab) => setCurrentTab(tab as TabType)}
            onStartBlankSession={handleStartBlankSession}
          />
        )}

        {currentTab === 'routines' && (
          <RoutinesView
            onStartRoutine={handleStartRoutine}
            onStartBlankSession={handleStartBlankSession}
          />
        )}

        {currentTab === 'exercises' && (
          <ExerciseLibrary
            onStartExerciseDirectly={handleStartExerciseDirectly}
          />
        )}

        {currentTab === 'timer' && (
          <HiitTimer />
        )}

        {currentTab === 'nutrition' && (
          <NutritionTracker />
        )}

        {currentTab === 'analytics' && (
          <ProgressAnalytics />
        )}
      </main>

      {/* Active Workout Session Overlay / Minimized player */}
      {activeSession && (
        <WorkoutPlayer
          session={activeSession}
          onUpdateSession={setActiveSession}
          onCloseSession={() => setActiveSession(null)}
          onWorkoutFinished={handleWorkoutFinished}
        />
      )}
    </div>
  );
}
