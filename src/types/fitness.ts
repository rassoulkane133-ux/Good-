export type MuscleGroup = 
  | 'Pectoraux'
  | 'Dos'
  | 'Trapèzes'
  | 'Épaules'
  | 'Biceps'
  | 'Triceps'
  | 'Quadriceps'
  | 'Ischio-jambiers'
  | 'Fessiers'
  | 'Mollets'
  | 'Abdominaux'
  | 'Cardio';

export type EquipmentType = 
  | 'Poids du corps'
  | 'Haltères'
  | 'Barre'
  | 'Machine'
  | 'Poulie / Câble'
  | 'Bande élastique'
  | 'Kettlebell'
  | 'Cardio';

export type ExerciseDifficulty = 'Débutant' | 'Intermédiaire' | 'Avancé';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: EquipmentType;
  difficulty: ExerciseDifficulty;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  defaultRestSeconds: number;
  iconType: string;
}

export interface WorkoutExercisePlan {
  exerciseId: string;
  sets: number;
  targetReps: string;
  targetWeightKg?: number;
  restSeconds: number;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  description: string;
  category: string;
  durationMinutes: number;
  difficulty: ExerciseDifficulty;
  exercises: WorkoutExercisePlan[];
  estimatedCalories: number;
  isCustom?: boolean;
}

export interface WorkoutSetRecord {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  rpe?: number; // Rate of perceived exertion 1-10
}

export interface SessionExercise {
  exerciseId: string;
  exerciseName: string;
  category: MuscleGroup;
  equipment: EquipmentType;
  sets: WorkoutSetRecord[];
  notes?: string;
}

export interface ActiveWorkoutSession {
  routineId?: string;
  routineTitle: string;
  startTime: number;
  exercises: SessionExercise[];
  currentExerciseIndex: number;
  isPaused: boolean;
}

export interface CompletedWorkout {
  id: string;
  routineTitle: string;
  date: string; // ISO string
  durationMinutes: number;
  totalVolumeKg: number;
  totalSets: number;
  totalReps: number;
  estimatedCalories: number;
  exercises: {
    exerciseName: string;
    category: MuscleGroup;
    setsCompleted: number;
    maxWeightKg: number;
    totalReps: number;
  }[];
  notes?: string;
  rating?: number; // 1-5
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  category: MuscleGroup;
  maxWeightKg: number;
  maxReps: number;
  estimatedOneRepMaxKg: number;
  date: string;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercentage?: number;
  waistCm?: number;
  chestCm?: number;
  armsCm?: number;
  thighsCm?: number;
}

export interface FoodItem {
  id: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  time: string;
}

export interface UserProfile {
  name: string;
  gender: 'homme' | 'femme';
  age: number;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  goal: 'perte_poids' | 'prise_masse' | 'maintien' | 'endurance';
  activityLevel: 'sedentaire' | 'modere' | 'actif' | 'tres_actif';
  dailyCalorieTarget: number;
  dailyProteinTargetG: number;
  dailyCarbsTargetG: number;
  dailyFatTargetG: number;
  dailyWaterTargetMl: number;
}
