import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  Check, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Timer, 
  Maximize2, 
  Minimize2, 
  Flame, 
  Dumbbell, 
  X,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';
import { ActiveWorkoutSession, CompletedWorkout, PersonalRecord } from '../types/fitness';
import { sound } from '../utils/audio';
import { getStoredRecords, saveWorkoutToHistory } from '../utils/storage';

interface WorkoutPlayerProps {
  session: ActiveWorkoutSession;
  onUpdateSession: (session: ActiveWorkoutSession) => void;
  onCloseSession: () => void;
  onWorkoutFinished: (completed: CompletedWorkout) => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  session,
  onUpdateSession,
  onCloseSession,
  onWorkoutFinished,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [soundActive, setSoundActive] = useState<boolean>(sound.isEnabled());

  // Rest Timer state
  const [restRemaining, setRestRemaining] = useState<number>(0);
  const [restTotal, setRestTotal] = useState<number>(60);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);

  // Finishing modal
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [workoutRating, setWorkoutRating] = useState<number>(5);
  const [sessionNotes, setSessionNotes] = useState<string>('');

  const currentExercise = session.exercises[session.currentExerciseIndex] || session.exercises[0];
  const personalRecords = getStoredRecords();
  const currentPR = personalRecords.find(
    pr => pr.exerciseName.toLowerCase() === currentExercise?.exerciseName.toLowerCase()
  );

  // Interval for elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      if (!session.isPaused) {
        setElapsedSeconds(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [session.isPaused]);

  // Interval for rest timer
  const restRemainingRef = useRef(restRemaining);
  restRemainingRef.current = restRemaining;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRestActive && restRemaining > 0) {
      interval = setInterval(() => {
        setRestRemaining(prev => {
          if (prev <= 4 && prev > 1) {
            sound.playCountdownTick();
          } else if (prev === 1) {
            sound.playRestCompleted();
            setIsRestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRestActive, restRemaining]);

  const formatTime = (secs: number): string => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startRestTimer = (seconds: number) => {
    setRestTotal(seconds);
    setRestRemaining(seconds);
    setIsRestActive(true);
  };

  const handleToggleSound = () => {
    const res = sound.toggleSound();
    setSoundActive(res);
  };

  const handleUpdateSet = (setId: string, field: 'weightKg' | 'reps', value: number) => {
    const val = isNaN(value) ? 0 : Math.max(0, value);
    const updatedExercises = [...session.exercises];
    const currEx = { ...updatedExercises[session.currentExerciseIndex] };
    currEx.sets = currEx.sets.map(s => (s.id === setId ? { ...s, [field]: val } : s));
    updatedExercises[session.currentExerciseIndex] = currEx;

    onUpdateSession({
      ...session,
      exercises: updatedExercises,
    });
  };

  const handleToggleSetComplete = (setId: string) => {
    const updatedExercises = [...session.exercises];
    const currEx = { ...updatedExercises[session.currentExerciseIndex] };
    const setIndex = currEx.sets.findIndex(s => s.id === setId);
    if (setIndex === -1) return;

    const targetSet = currEx.sets[setIndex];
    const nextCompleted = !targetSet.completed;

    currEx.sets = currEx.sets.map(s => (s.id === setId ? { ...s, completed: nextCompleted } : s));
    updatedExercises[session.currentExerciseIndex] = currEx;

    onUpdateSession({
      ...session,
      exercises: updatedExercises,
    });

    // Auto-trigger rest timer if set was marked completed
    if (nextCompleted) {
      startRestTimer(75);
    }
  };

  const handleAddSet = () => {
    const updatedExercises = [...session.exercises];
    const currEx = { ...updatedExercises[session.currentExerciseIndex] };
    const lastSet = currEx.sets[currEx.sets.length - 1];

    const newSet = {
      id: 'set_' + Date.now(),
      setNumber: currEx.sets.length + 1,
      weightKg: lastSet ? lastSet.weightKg : 20,
      reps: lastSet ? lastSet.reps : 10,
      completed: false,
    };

    currEx.sets = [...currEx.sets, newSet];
    updatedExercises[session.currentExerciseIndex] = currEx;

    onUpdateSession({
      ...session,
      exercises: updatedExercises,
    });
  };

  const handleRemoveSet = (setId: string) => {
    const updatedExercises = [...session.exercises];
    const currEx = { ...updatedExercises[session.currentExerciseIndex] };
    if (currEx.sets.length <= 1) return;

    currEx.sets = currEx.sets
      .filter(s => s.id !== setId)
      .map((s, idx) => ({ ...s, setNumber: idx + 1 }));

    updatedExercises[session.currentExerciseIndex] = currEx;

    onUpdateSession({
      ...session,
      exercises: updatedExercises,
    });
  };

  // Calculate live volume
  const calculateTotalVolume = (): number => {
    let total = 0;
    session.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed) {
          total += s.weightKg * s.reps;
        }
      });
    });
    return total;
  };

  const calculateTotalCompletedSets = (): number => {
    let count = 0;
    session.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed) count++;
      });
    });
    return count;
  };

  const handleFinishWorkout = () => {
    const totalVolume = calculateTotalVolume();
    const durationMins = Math.max(1, Math.round(elapsedSeconds / 60));
    const completedSetsCount = calculateTotalCompletedSets();

    let totalRepsCount = 0;
    const summary = session.exercises.map(ex => {
      const completedSets = ex.sets.filter(s => s.completed);
      const reps = completedSets.reduce((sum, s) => sum + s.reps, 0);
      totalRepsCount += reps;
      const maxWeight = completedSets.reduce((max, s) => Math.max(max, s.weightKg), 0);

      return {
        exerciseName: ex.exerciseName,
        category: ex.category,
        setsCompleted: completedSets.length,
        maxWeightKg: maxWeight,
        totalReps: reps,
      };
    });

    const estimatedCal = Math.round(durationMins * 7.5 + (completedSetsCount * 4));

    const completed: CompletedWorkout = {
      id: 'w_' + Date.now(),
      routineTitle: session.routineTitle || 'Séance Libre',
      date: new Date().toISOString(),
      durationMinutes: durationMins,
      totalVolumeKg: totalVolume,
      totalSets: completedSetsCount,
      totalReps: totalRepsCount,
      estimatedCalories: estimatedCal,
      exercises: summary,
      rating: workoutRating,
      notes: sessionNotes.trim() || undefined,
    };

    saveWorkoutToHistory(completed);
    sound.playWorkoutComplete();

    // Trigger victory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a3e635', '#38bdf8', '#fbbf24', '#ffffff']
      });
    } catch {
      // Ignore
    }

    setShowFinishModal(false);
    onWorkoutFinished(completed);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50 bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl shadow-2xl p-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lime-400/20 text-lime-400 flex items-center justify-center font-mono font-bold">
            <Dumbbell className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white truncate max-w-[160px]">
              {session.routineTitle}
            </div>
            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 font-mono">
              <span>{formatTime(elapsedSeconds)}</span>
              <span>·</span>
              <span className="text-lime-400 font-medium">{calculateTotalVolume()} kg</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isRestActive && (
            <div className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-mono font-semibold mr-1">
              {restRemaining}s
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            aria-label="Agrandir la séance"
            className="p-2 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col overflow-y-auto">
      {/* Top Header */}
      <header className="sticky top-0 z-10 bg-neutral-950/90 border-b border-neutral-800 px-4 md:px-8 py-3 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
              {session.routineTitle}
            </h1>
            <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
              <span className="text-lime-400 font-semibold">{formatTime(elapsedSeconds)}</span>
              <span>·</span>
              <span>Volume : <strong className="text-white">{calculateTotalVolume()} kg</strong></span>
              <span>·</span>
              <span>Séries : <strong className="text-white">{calculateTotalCompletedSets()}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={soundActive ? 'Désactiver le son' : 'Activer le son'}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-lime-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            aria-label="Réduire"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setShowFinishModal(true)}
            className="px-3.5 py-1.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold rounded-lg text-xs md:text-sm shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Terminer
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Rest Timer Floating Bar if active */}
        {isRestActive && (
          <div className="bg-neutral-900 border border-amber-500/40 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono">
                <Timer className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-amber-400">
                  Temps de repos en cours
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  {formatTime(restRemaining)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => setRestRemaining(prev => Math.max(0, prev - 15))}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg font-mono font-medium"
              >
                -15s
              </button>
              <button
                type="button"
                onClick={() => setRestRemaining(prev => prev + 30)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg font-mono font-medium"
              >
                +30s
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRestActive(false);
                  setRestRemaining(0);
                }}
                className="px-4 py-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-semibold rounded-lg"
              >
                Passer
              </button>
            </div>
          </div>
        )}

        {/* Exercise Switcher & Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 md:p-7 shadow-xl">
          {/* Pagination Navigation */}
          <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-4">
            <button
              type="button"
              disabled={session.currentExerciseIndex === 0}
              onClick={() => onUpdateSession({ ...session, currentExerciseIndex: session.currentExerciseIndex - 1 })}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">
                Exercice {session.currentExerciseIndex + 1} sur {session.exercises.length}
              </span>
              <h2 className="text-lg md:text-2xl font-bold text-white mt-0.5">
                {currentExercise.exerciseName}
              </h2>
              <div className="text-xs text-neutral-400 mt-1 flex items-center justify-center gap-2">
                <span>{currentExercise.category}</span>
                <span>·</span>
                <span>{currentExercise.equipment}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={session.currentExerciseIndex === session.exercises.length - 1}
              onClick={() => onUpdateSession({ ...session, currentExerciseIndex: session.currentExerciseIndex + 1 })}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Record Badge */}
          {currentPR && (
            <div className="mb-6 p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Record Personnel actuel :</span>
              </div>
              <div className="font-mono font-bold text-amber-400">
                {currentPR.maxWeightKg} kg × {currentPR.maxReps} reps (1RM est. ~{currentPR.estimatedOneRepMaxKg} kg)
              </div>
            </div>
          )}

          {/* Sets Table */}
          <div className="space-y-3">
            <div className="grid grid-cols-12 text-[11px] font-bold text-neutral-500 uppercase tracking-wider px-3 pb-1">
              <div className="col-span-2">Série</div>
              <div className="col-span-4 text-center">Poids (kg)</div>
              <div className="col-span-4 text-center">Répétitions</div>
              <div className="col-span-2 text-right">Statut</div>
            </div>

            {currentExercise.sets.map((set, idx) => (
              <div
                key={set.id}
                className={`grid grid-cols-12 items-center p-3 rounded-2xl border transition-all ${
                  set.completed
                    ? 'bg-lime-950/20 border-lime-500/40 text-neutral-100'
                    : 'bg-neutral-950/60 border-neutral-800 text-neutral-300'
                }`}
              >
                {/* Set number */}
                <div className="col-span-2 flex items-center gap-1.5 font-bold text-sm">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono ${
                    set.completed ? 'bg-lime-400 text-neutral-950 font-black' : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    {idx + 1}
                  </span>
                </div>

                {/* Weight Input */}
                <div className="col-span-4 flex items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleUpdateSet(set.id, 'weightKg', Math.max(0, set.weightKg - 2.5))}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    step="0.5"
                    value={set.weightKg}
                    onChange={(e) => handleUpdateSet(set.id, 'weightKg', parseFloat(e.target.value))}
                    className="w-16 bg-neutral-900 border border-neutral-700 text-center font-mono font-bold text-sm text-white rounded-lg py-1 px-1 focus:outline-hidden focus:border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpdateSet(set.id, 'weightKg', set.weightKg + 2.5)}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                {/* Reps Input */}
                <div className="col-span-4 flex items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleUpdateSet(set.id, 'reps', Math.max(1, set.reps - 1))}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) => handleUpdateSet(set.id, 'reps', parseInt(e.target.value, 10))}
                    className="w-14 bg-neutral-900 border border-neutral-700 text-center font-mono font-bold text-sm text-white rounded-lg py-1 px-1 focus:outline-hidden focus:border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpdateSet(set.id, 'reps', set.reps + 1)}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                {/* Action / Checkbox */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSetComplete(set.id)}
                    aria-label={set.completed ? "Annuler série" : "Valider série"}
                    className={`p-2.5 rounded-xl transition-all shadow-sm ${
                      set.completed
                        ? 'bg-lime-400 text-neutral-950'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                  {currentExercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSet(set.id)}
                      aria-label="Supprimer la série"
                      className="text-neutral-600 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Set Button & Rest trigger */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleAddSet}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4 text-lime-400" />
              Ajouter une série
            </button>

            <button
              type="button"
              onClick={() => startRestTimer(60)}
              className="px-3 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 font-medium rounded-xl flex items-center gap-1.5"
            >
              <Timer className="w-4 h-4 text-amber-400" />
              Lancer 60s repos
            </button>
          </div>
        </div>

        {/* Quick Exercise Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {session.exercises.map((ex, idx) => {
            const isCompleted = ex.sets.every(s => s.completed);
            const isCurrent = idx === session.currentExerciseIndex;
            return (
              <button
                key={ex.exerciseId + idx}
                type="button"
                onClick={() => onUpdateSession({ ...session, currentExerciseIndex: idx })}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isCurrent
                    ? 'bg-neutral-800 text-lime-400 border-lime-400/50 shadow-sm'
                    : isCompleted
                    ? 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {idx + 1}. {ex.exerciseName}
                {isCompleted && ' ✓'}
              </button>
            );
          })}
        </div>
      </main>

      {/* Finishing Confirmation Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-lime-400/20 text-lime-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Terminer l'entraînement</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 space-y-4">
              {/* Summary Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-2xl">
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Durée</div>
                  <div className="text-base font-bold font-mono text-lime-400 mt-1">
                    {Math.round(elapsedSeconds / 60)} min
                  </div>
                </div>
                <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-2xl">
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Volume</div>
                  <div className="text-base font-bold font-mono text-lime-400 mt-1">
                    {calculateTotalVolume()} kg
                  </div>
                </div>
                <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-2xl">
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Séries</div>
                  <div className="text-base font-bold font-mono text-lime-400 mt-1">
                    {calculateTotalCompletedSets()}
                  </div>
                </div>
              </div>

              {/* Workout Rating */}
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-2">
                  Ressenti de la séance :
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setWorkoutRating(star)}
                      className={`text-xl transition-transform hover:scale-110 ${
                        star <= workoutRating ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1">
                  Notes personnelles (optionnel) :
                </label>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Ex : Super congestion, énergie au top, ajouter +2.5kg la prochaine fois..."
                  rows={2}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-600 focus:outline-hidden focus:border-lime-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs rounded-xl"
              >
                Continuer la séance
              </button>
              <button
                type="button"
                onClick={handleFinishWorkout}
                className="flex-1 py-2.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-400/20"
              >
                Enregistrer & Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
