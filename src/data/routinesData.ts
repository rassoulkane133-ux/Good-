import { WorkoutRoutine } from '../types/fitness';

export const DEFAULT_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'routine-push',
    title: 'Push Day - Pectoraux, Épaules & Triceps',
    description: 'Séance axée sur les mouvements de poussée pour développer le volume du torse, des épaules et des triceps.',
    category: 'Hypertrophie / Musculation',
    durationMinutes: 55,
    difficulty: 'Intermédiaire',
    estimatedCalories: 380,
    exercises: [
      { exerciseId: 'bench-press', sets: 4, targetReps: '8-10', targetWeightKg: 70, restSeconds: 90 },
      { exerciseId: 'incline-dumbbell-press', sets: 3, targetReps: '10-12', targetWeightKg: 24, restSeconds: 75 },
      { exerciseId: 'military-press', sets: 3, targetReps: '8-10', targetWeightKg: 40, restSeconds: 90 },
      { exerciseId: 'lateral-raises', sets: 4, targetReps: '12-15', targetWeightKg: 10, restSeconds: 60 },
      { exerciseId: 'triceps-pushdown', sets: 3, targetReps: '12-15', targetWeightKg: 25, restSeconds: 60 },
      { exerciseId: 'chest-dips', sets: 3, targetReps: '10-12', targetWeightKg: 0, restSeconds: 75 }
    ]
  },
  {
    id: 'routine-pull',
    title: 'Pull Day - Dos Épais, Arrière d\'Épaules & Biceps',
    description: 'Séance de tirage pour construire un dos en V puissant et des bras sculptés.',
    category: 'Hypertrophie / Musculation',
    durationMinutes: 50,
    difficulty: 'Intermédiaire',
    estimatedCalories: 360,
    exercises: [
      { exerciseId: 'deadlift', sets: 4, targetReps: '6-8', targetWeightKg: 110, restSeconds: 120 },
      { exerciseId: 'pull-ups', sets: 4, targetReps: '8-10', targetWeightKg: 0, restSeconds: 90 },
      { exerciseId: 'barbell-row', sets: 3, targetReps: '8-10', targetWeightKg: 60, restSeconds: 90 },
      { exerciseId: 'face-pull', sets: 4, targetReps: '15-20', targetWeightKg: 20, restSeconds: 60 },
      { exerciseId: 'ez-bar-curl', sets: 3, targetReps: '10-12', targetWeightKg: 30, restSeconds: 60 },
      { exerciseId: 'incline-dumbbell-curl', sets: 3, targetReps: '12-12', targetWeightKg: 12, restSeconds: 60 }
    ]
  },
  {
    id: 'routine-legs',
    title: 'Leg Day - Cuisses, Fessiers & Mollets',
    description: 'L\'entraînement complet du bas du corps pour des jambes athlétiques et explosives.',
    category: 'Force & Volume',
    durationMinutes: 60,
    difficulty: 'Avancé',
    estimatedCalories: 450,
    exercises: [
      { exerciseId: 'barbell-squat', sets: 4, targetReps: '6-8', targetWeightKg: 90, restSeconds: 120 },
      { exerciseId: 'romanian-deadlift', sets: 3, targetReps: '10-12', targetWeightKg: 30, restSeconds: 90 },
      { exerciseId: 'hip-thrust', sets: 3, targetReps: '10-12', targetWeightKg: 80, restSeconds: 90 },
      { exerciseId: 'bulgarian-split-squat', sets: 3, targetReps: '10-12', targetWeightKg: 14, restSeconds: 75 },
      { exerciseId: 'standing-calf-raise', sets: 4, targetReps: '15-20', targetWeightKg: 50, restSeconds: 60 }
    ]
  },
  {
    id: 'routine-fullbody',
    title: 'Full Body Express - Tout le Corps en 45 Min',
    description: 'Parfait pour s\'entraîner 3 fois par semaine avec des mouvements polyarticulaires majeurs.',
    category: 'Général / Débutant & Pro',
    durationMinutes: 45,
    difficulty: 'Débutant',
    estimatedCalories: 340,
    exercises: [
      { exerciseId: 'barbell-squat', sets: 3, targetReps: '8-10', targetWeightKg: 60, restSeconds: 90 },
      { exerciseId: 'bench-press', sets: 3, targetReps: '8-10', targetWeightKg: 50, restSeconds: 90 },
      { exerciseId: 'lat-pulldown', sets: 3, targetReps: '10-12', targetWeightKg: 45, restSeconds: 60 },
      { exerciseId: 'military-press', sets: 3, targetReps: '10-10', targetWeightKg: 30, restSeconds: 75 },
      { exerciseId: 'plank', sets: 3, targetReps: '45 sec', targetWeightKg: 0, restSeconds: 60 }
    ]
  },
  {
    id: 'routine-hiit',
    title: 'HIIT Brûle-Graisses & Cardio Intense',
    description: 'Enchaînement à haute intensité pour booster le métabolisme et brûler un maximum de calories.',
    category: 'Cardio / Perte de poids',
    durationMinutes: 25,
    difficulty: 'Intermédiaire',
    estimatedCalories: 300,
    exercises: [
      { exerciseId: 'burpees', sets: 4, targetReps: '15', targetWeightKg: 0, restSeconds: 45 },
      { exerciseId: 'mountain-climbers', sets: 4, targetReps: '30 sec', targetWeightKg: 0, restSeconds: 30 },
      { exerciseId: 'jump-rope', sets: 4, targetReps: '60 sec', targetWeightKg: 0, restSeconds: 45 },
      { exerciseId: 'push-ups', sets: 3, targetReps: '15', targetWeightKg: 0, restSeconds: 45 }
    ]
  },
  {
    id: 'routine-core',
    title: 'Abdos Sculpt & Gainage Fondamental',
    description: 'Renforcement ciblé de la sangle abdominale et des muscles stabilisateurs profonds.',
    category: 'Gainage & Posture',
    durationMinutes: 20,
    difficulty: 'Débutant',
    estimatedCalories: 150,
    exercises: [
      { exerciseId: 'plank', sets: 3, targetReps: '60 sec', targetWeightKg: 0, restSeconds: 45 },
      { exerciseId: 'hanging-leg-raise', sets: 3, targetReps: '12-15', targetWeightKg: 0, restSeconds: 60 },
      { exerciseId: 'cable-crunch', sets: 3, targetReps: '15-20', targetWeightKg: 35, restSeconds: 60 },
      { exerciseId: 'mountain-climbers', sets: 3, targetReps: '40 sec', targetWeightKg: 0, restSeconds: 45 }
    ]
  }
];
