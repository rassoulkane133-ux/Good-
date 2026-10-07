import { 
  CompletedWorkout, 
  PersonalRecord, 
  BodyMeasurement, 
  FoodItem, 
  UserProfile, 
  WorkoutRoutine 
} from '../types/fitness';
import { DEFAULT_ROUTINES } from '../data/routinesData';

// Initial realistic seed data for an inspiring first experience
const INITIAL_PROFILE: UserProfile = {
  name: 'Alexandre',
  gender: 'homme',
  age: 28,
  heightCm: 180,
  currentWeightKg: 78.5,
  targetWeightKg: 82.0,
  goal: 'prise_masse',
  activityLevel: 'actif',
  dailyCalorieTarget: 2750,
  dailyProteinTargetG: 160,
  dailyCarbsTargetG: 320,
  dailyFatTargetG: 75,
  dailyWaterTargetMl: 2500,
};

const INITIAL_MEASUREMENTS: BodyMeasurement[] = [
  { id: 'm1', date: '2026-09-08', weightKg: 76.8, waistCm: 83, chestCm: 101, armsCm: 37, thighsCm: 57 },
  { id: 'm2', date: '2026-09-15', weightKg: 77.2, waistCm: 82.5, chestCm: 101.5, armsCm: 37.3, thighsCm: 57.5 },
  { id: 'm3', date: '2026-09-22', weightKg: 77.9, waistCm: 82.5, chestCm: 102, armsCm: 37.8, thighsCm: 58 },
  { id: 'm4', date: '2026-09-29', weightKg: 78.1, waistCm: 82, chestCm: 103, armsCm: 38.2, thighsCm: 58.5 },
  { id: 'm5', date: '2026-10-05', weightKg: 78.5, waistCm: 82, chestCm: 103.5, armsCm: 38.5, thighsCm: 59 },
];

const INITIAL_HISTORY: CompletedWorkout[] = [
  {
    id: 'w1',
    routineTitle: 'Push Day - Pectoraux, Épaules & Triceps',
    date: '2026-10-02T18:30:00.000Z',
    durationMinutes: 52,
    totalVolumeKg: 6420,
    totalSets: 18,
    totalReps: 184,
    estimatedCalories: 390,
    rating: 5,
    exercises: [
      { exerciseName: 'Développé Couché à la Barre', category: 'Pectoraux', setsCompleted: 4, maxWeightKg: 80, totalReps: 36 },
      { exerciseName: 'Développé Incliné aux Haltères', category: 'Pectoraux', setsCompleted: 3, maxWeightKg: 26, totalReps: 32 },
      { exerciseName: 'Développé Militaire Debout (Overhead Press)', category: 'Épaules', setsCompleted: 3, maxWeightKg: 42.5, totalReps: 28 },
      { exerciseName: 'Élévations Latérales aux Haltères', category: 'Épaules', setsCompleted: 4, maxWeightKg: 10, totalReps: 52 },
      { exerciseName: 'Extension Triceps à la Corde (Poulie Haute)', category: 'Triceps', setsCompleted: 4, maxWeightKg: 27.5, totalReps: 48 }
    ],
    notes: 'Excellente séance, bon pump sur les pectoraux !'
  },
  {
    id: 'w2',
    routineTitle: 'Pull Day - Dos Épais, Arrière d\'Épaules & Biceps',
    date: '2026-10-04T17:45:00.000Z',
    durationMinutes: 48,
    totalVolumeKg: 7850,
    totalSets: 17,
    totalReps: 160,
    estimatedCalories: 375,
    rating: 4,
    exercises: [
      { exerciseName: 'Soulevé de Terre Traditionnel (Deadlift)', category: 'Dos', setsCompleted: 4, maxWeightKg: 120, totalReps: 28 },
      { exerciseName: 'Tractions Prise Pronation (Pull-Ups)', category: 'Dos', setsCompleted: 4, maxWeightKg: 0, totalReps: 38 },
      { exerciseName: 'Rowing Barre Buste Penché', category: 'Dos', setsCompleted: 3, maxWeightKg: 65, totalReps: 30 },
      { exerciseName: 'Curl Biceps à la Barre EZ', category: 'Biceps', setsCompleted: 3, maxWeightKg: 32.5, totalReps: 32 },
      { exerciseName: 'Face Pull à la Poulie Haute', category: 'Épaules', setsCompleted: 3, maxWeightKg: 22.5, totalReps: 45 }
    ],
    notes: 'Record battu au soulevé de terre (4x120kg) sans douleur.'
  }
];

const INITIAL_RECORDS: PersonalRecord[] = [
  { exerciseId: 'bench-press', exerciseName: 'Développé Couché', category: 'Pectoraux', maxWeightKg: 80, maxReps: 8, estimatedOneRepMaxKg: 99, date: '2026-10-02' },
  { exerciseId: 'deadlift', exerciseName: 'Soulevé de Terre (Deadlift)', category: 'Dos', maxWeightKg: 120, maxReps: 6, estimatedOneRepMaxKg: 140, date: '2026-10-04' },
  { exerciseId: 'barbell-squat', exerciseName: 'Squat Arrière', category: 'Quadriceps', maxWeightKg: 100, maxReps: 8, estimatedOneRepMaxKg: 124, date: '2026-09-28' },
  { exerciseId: 'military-press', exerciseName: 'Développé Militaire', category: 'Épaules', maxWeightKg: 45, maxReps: 6, estimatedOneRepMaxKg: 53, date: '2026-09-25' }
];

const INITIAL_MEALS: FoodItem[] = [
  { id: 'f1', name: 'Bowl Flocons d\'Avoine, Banane & Whey', mealType: 'breakfast', calories: 580, proteinG: 42, carbsG: 78, fatG: 12, time: '08:15' },
  { id: 'f2', name: 'Filet de Poulet Grillé, Riz Basmati & Haricots Verts', mealType: 'lunch', calories: 720, proteinG: 55, carbsG: 85, fatG: 14, time: '12:45' },
  { id: 'f3', name: 'Amandes & Pomme', mealType: 'snack', calories: 230, proteinG: 6, carbsG: 24, fatG: 14, time: '16:30' }
];

const STORAGE_KEYS = {
  PROFILE: 'pulsefit_profile',
  HISTORY: 'pulsefit_history',
  RECORDS: 'pulsefit_records',
  MEASUREMENTS: 'pulsefit_measurements',
  ROUTINES: 'pulsefit_routines',
  WATER_PREFIX: 'pulsefit_water_',
  MEALS_PREFIX: 'pulsefit_meals_',
};

export const getStoredProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : INITIAL_PROFILE;
  } catch {
    return INITIAL_PROFILE;
  }
};

export const saveStoredProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getStoredHistory = (): CompletedWorkout[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : INITIAL_HISTORY;
  } catch {
    return INITIAL_HISTORY;
  }
};

export const saveWorkoutToHistory = (workout: CompletedWorkout): void => {
  const current = getStoredHistory();
  const updated = [workout, ...current];
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));

  // Check and update personal records automatically
  updateRecordsFromWorkout(workout);
};

export const getStoredRecords = (): PersonalRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return data ? JSON.parse(data) : INITIAL_RECORDS;
  } catch {
    return INITIAL_RECORDS;
  }
};

export const calculateEstimated1RM = (weightKg: number, reps: number): number => {
  if (reps <= 1) return weightKg;
  // Brzycki / Epley hybrid
  return Math.round(weightKg * (1 + reps / 30));
};

export const updateRecordsFromWorkout = (workout: CompletedWorkout): void => {
  const currentRecords = getStoredRecords();
  const updatedRecords = [...currentRecords];

  workout.exercises.forEach(ex => {
    if (ex.maxWeightKg > 0) {
      const estimated1RM = calculateEstimated1RM(ex.maxWeightKg, 8); // approximate
      const existingIdx = updatedRecords.findIndex(r => r.exerciseName.toLowerCase() === ex.exerciseName.toLowerCase());

      if (existingIdx >= 0) {
        if (ex.maxWeightKg > updatedRecords[existingIdx].maxWeightKg) {
          updatedRecords[existingIdx] = {
            ...updatedRecords[existingIdx],
            maxWeightKg: ex.maxWeightKg,
            maxReps: 8,
            estimatedOneRepMaxKg: estimated1RM,
            date: workout.date.split('T')[0]
          };
        }
      } else {
        updatedRecords.push({
          exerciseId: ex.exerciseName.toLowerCase().replace(/\s+/g, '-'),
          exerciseName: ex.exerciseName,
          category: ex.category,
          maxWeightKg: ex.maxWeightKg,
          maxReps: 8,
          estimatedOneRepMaxKg: estimated1RM,
          date: workout.date.split('T')[0]
        });
      }
    }
  });

  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(updatedRecords));
};

export const getStoredMeasurements = (): BodyMeasurement[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MEASUREMENTS);
    return data ? JSON.parse(data) : INITIAL_MEASUREMENTS;
  } catch {
    return INITIAL_MEASUREMENTS;
  }
};

export const addBodyMeasurement = (m: Omit<BodyMeasurement, 'id'>): void => {
  const current = getStoredMeasurements();
  const newItem: BodyMeasurement = {
    ...m,
    id: 'm_' + Date.now()
  };
  const updated = [...current, newItem];
  localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(updated));

  // Also update current profile weight
  const profile = getStoredProfile();
  profile.currentWeightKg = m.weightKg;
  saveStoredProfile(profile);
};

export const getStoredRoutines = (): WorkoutRoutine[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    if (!data) return DEFAULT_ROUTINES;
    const parsed = JSON.parse(data);
    return parsed.length > 0 ? parsed : DEFAULT_ROUTINES;
  } catch {
    return DEFAULT_ROUTINES;
  }
};

export const saveRoutines = (routines: WorkoutRoutine[]): void => {
  localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
};

export const addOrUpdateRoutine = (routine: WorkoutRoutine): void => {
  const current = getStoredRoutines();
  const idx = current.findIndex(r => r.id === routine.id);
  let updated: WorkoutRoutine[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = routine;
  } else {
    updated = [routine, ...current];
  }
  saveRoutines(updated);
};

export const getWaterForDate = (dateStr: string): number => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.WATER_PREFIX + dateStr);
    return val ? parseInt(val, 10) : 1500; // default initial 1.5L for today
  } catch {
    return 1500;
  }
};

export const setWaterForDate = (dateStr: string, ml: number): void => {
  localStorage.setItem(STORAGE_KEYS.WATER_PREFIX + dateStr, ml.toString());
};

export const getMealsForDate = (dateStr: string): FoodItem[] => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.MEALS_PREFIX + dateStr);
    if (val) return JSON.parse(val);
    // If today, return initial meals
    const today = new Date().toISOString().split('T')[0];
    if (dateStr === today) return INITIAL_MEALS;
    return [];
  } catch {
    return [];
  }
};

export const saveMealsForDate = (dateStr: string, meals: FoodItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.MEALS_PREFIX + dateStr, JSON.stringify(meals));
};

export const calculateTDEE = (
  gender: 'homme' | 'femme',
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: 'sedentaire' | 'modere' | 'actif' | 'tres_actif',
  goal: 'perte_poids' | 'prise_masse' | 'maintien' | 'endurance'
): { calories: number; protein: number; carbs: number; fat: number } => {
  // Mifflin-St Jeor formula
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmr += gender === 'homme' ? 5 : -161;

  const activityMultipliers = {
    sedentaire: 1.2,
    modere: 1.4,
    actif: 1.6,
    tres_actif: 1.85,
  };

  const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.4));

  let targetCalories = tdee;
  if (goal === 'perte_poids') targetCalories = Math.round(tdee * 0.82); // -18% deficit
  if (goal === 'prise_masse') targetCalories = Math.round(tdee * 1.12); // +12% surplus

  // Protein ~2.0g per kg of bodyweight for active fitness
  const protein = Math.round(weightKg * 2.0);
  const proteinCal = protein * 4;

  // Fat ~0.9g per kg
  const fat = Math.round(weightKg * 0.9);
  const fatCal = fat * 9;

  // Remainder in carbs
  const remainingCal = Math.max(0, targetCalories - (proteinCal + fatCal));
  const carbs = Math.round(remainingCal / 4);

  return { calories: targetCalories, protein, carbs, fat };
};
