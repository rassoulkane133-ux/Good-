import { Exercise } from '../types/fitness';

export const EXERCISES_DATABASE: Exercise[] = [
  // --- PECTORAUX ---
  {
    id: 'bench-press',
    name: 'Développé Couché à la Barre',
    category: 'Pectoraux',
    secondaryMuscles: ['Triceps', 'Épaules'],
    equipment: 'Barre',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 90,
    iconType: 'barbell',
    instructions: [
      'Allongez-vous sur le banc, les yeux sous la barre, les pieds bien ancrés au sol.',
      'Saisissez la barre avec une prise légèrement plus large que la largeur des épaules.',
      'Resserrez vos omoplates (rétraction scapulaire) et bombez le torse.',
      'Décrochez la barre et descendez-la de manière contrôlée jusquau milieu de la poitrine.',
      'Poussez de façon explosive en expirant, sans décoller le dos du banc.'
    ],
    tips: [
      'Gardez les coudes à un angle de 45 à 70 degrés par rapport au buste.',
      'Ne laissez jamais rebondir la barre sur le sternum.'
    ],
    commonMistakes: [
      'Écarter excessivement les coudes (risque pour les épaules).',
      'Décoller les fesses du banc pendant la poussée.'
    ]
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Développé Incliné aux Haltères',
    category: 'Pectoraux',
    secondaryMuscles: ['Épaules', 'Triceps'],
    equipment: 'Haltères',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 75,
    iconType: 'dumbbell',
    instructions: [
      'Réglez le banc à une inclinaison de 30° à 45°.',
      'Asseyez-vous avec un haltère sur chaque cuisse, puis basculez en arrière.',
      'Positionnez les haltères au niveau de la partie supérieure des pectoraux.',
      'Poussez vers le haut en convergeant légèrement, sans faire claquer les haltères.',
      'Contrôlez la descente en ouvrant la cage thoracique.'
    ],
    tips: [
      'L inclinaison à 30° cible idéalement le faisceau claviculaire (haut des pecs).',
      'Maintenez les poignets solides et alignés avec les avant-bras.'
    ],
    commonMistakes: [
      'Inclinaison trop forte (> 50°) qui reporte le travail sur les épaules.',
      'Descente trop rapide sans tempo contrôlé.'
    ]
  },
  {
    id: 'cable-crossover',
    name: 'Écarté à la Poulie Vis-à-Vis',
    category: 'Pectoraux',
    secondaryMuscles: ['Épaules'],
    equipment: 'Poulie / Câble',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'cable',
    instructions: [
      'Réglez les poulies en position haute ou moyenne.',
      'Avancez d un pas en avant en position décalée (fente) pour la stabilité.',
      'Gardez une légère flexion des coudes constante tout au long du mouvement.',
      'Rapprochez les poignées devant vous en contractant fort les pectoraux 1 seconde.',
      'Revenez lentement en ressentant l étirement de la poitrine.'
    ],
    tips: [
      'Pensez à vouloir rapprocher vos biceps l un de l autre.',
      'Concentrez-vous sur la tension continue offerte par le câble.'
    ],
    commonMistakes: [
      'Transformer l écarté en développé en pliant et tendant excessivement les bras.',
      'Prendre de l élan avec le tronc.'
    ]
  },
  {
    id: 'push-ups',
    name: 'Pompes Classiques (Push-Ups)',
    category: 'Pectoraux',
    secondaryMuscles: ['Triceps', 'Abdominaux', 'Épaules'],
    equipment: 'Poids du corps',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'bodyweight',
    instructions: [
      'Placez les mains au sol, largeur des épaules ou légèrement plus large.',
      'Corps parfaitement gainé en ligne droite des talons jusqu au sommet du crâne.',
      'Descendez la poitrine à quelques centimètres du sol en inspirant.',
      'Poussez énergiquement jusqu à extension quasi complète des bras.'
    ],
    tips: [
      'Contractez les fessiers et les abdominaux pour protéger le bas du dos.',
      'Gardez la nuque neutre, regard vers le sol.'
    ],
    commonMistakes: [
      'Bassin qui s affaisse vers le bas.',
      'Coudes écartés à 90 degrés formant une lettre T.'
    ]
  },
  {
    id: 'chest-dips',
    name: 'Dips aux Barres Parallèles',
    category: 'Pectoraux',
    secondaryMuscles: ['Triceps', 'Épaules'],
    equipment: 'Poids du corps',
    difficulty: 'Avancé',
    defaultRestSeconds: 90,
    iconType: 'bodyweight',
    instructions: [
      'Montez sur les barres parallèles, bras tendus, torse penché vers l avant à 30°.',
      'Fléchissez les genoux si nécessaire et croisez les chevilles.',
      'Descendez lentement jusqu à ce que vos bras forment un angle de 90°.',
      'Poussez avec la force des pectoraux et des triceps pour remonter.'
    ],
    tips: [
      'Pencher le buste vers l avant accentue le travail des pectoraux.',
      'Ne descendez pas plus bas que le confort de vos épaules.'
    ],
    commonMistakes: [
      'Rester trop droit (reporte tout sur les triceps).',
      'Donner des à-coups avec les jambes pour remonter.'
    ]
  },

  // --- DOS ---
  {
    id: 'deadlift',
    name: 'Soulevé de Terre Traditionnel (Deadlift)',
    category: 'Dos',
    secondaryMuscles: ['Ischio-jambiers', 'Fessiers', 'Quadriceps'],
    equipment: 'Barre',
    difficulty: 'Avancé',
    defaultRestSeconds: 120,
    iconType: 'barbell',
    instructions: [
      'Pieds largeur des hanches, barre au-dessus du milieu des pieds.',
      'Fléchissez les hanches et genoux, saisissez la barre juste à l extérieur des jambes.',
      'Redressez la poitrine, engagez les dorsaux et créez une tension avant de lever.',
      'Poussez le sol avec les talons en étendant simultanément hanches et genoux.',
      'Verrouillez debout avec les fessiers serrés, sans hyper-extension lombaire.'
    ],
    tips: [
      'Gardez la barre collée aux tibias et aux cuisses tout au long de la montée.',
      'Pensez à « repousser la terre » plutôt que tirer avec les bras.'
    ],
    commonMistakes: [
      'Arrondir le bas du dos (danger pour les disques vertébraux).',
      'Éloigner la barre du corps.'
    ]
  },
  {
    id: 'pull-ups',
    name: 'Tractions Prise Pronation (Pull-Ups)',
    category: 'Dos',
    secondaryMuscles: ['Biceps', 'Épaules'],
    equipment: 'Poids du corps',
    difficulty: 'Avancé',
    defaultRestSeconds: 90,
    iconType: 'bodyweight',
    instructions: [
      'Suspendez-vous à la barre, mains en pronation (paumes vers l avant), plus large que les épaules.',
      'Activez d abord vos omoplates vers le bas avant de tirer avec les bras.',
      'Tirez jusqu à dépasser la barre avec le menton en ouvrant la cage thoracique.',
      'Contrôlez la descente jusqu à extension complète contrôlée des bras.'
    ],
    tips: [
      'Imaginez que vous tirez vos coudes vers le bas et vers vos poches arrière.',
      'Utilisez un élastique d assistance si vous débutez.'
    ],
    commonMistakes: [
      'Balancer le corps (kipping) sans contrôle musculaire.',
      'Faire seulement un demi-mouvement.'
    ]
  },
  {
    id: 'barbell-row',
    name: 'Rowing Barre Buste Penché',
    category: 'Dos',
    secondaryMuscles: ['Biceps', 'Épaules'],
    equipment: 'Barre',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 90,
    iconType: 'barbell',
    instructions: [
      'Debout, pieds écartés largeur des épaules, barre saisie en pronation ou supination.',
      'Inclinez le buste à environ 45°, genoux légèrement fléchis, dos droit et cambrure naturelle.',
      'Tirez la barre vers le nombril en conduisant le mouvement avec les coudes.',
      'Serrez les omoplates 1 seconde au sommet.',
      'Redescendez la charge avec contrôle.'
    ],
    tips: [
      'Gardez le gainage abdominal solide pour protéger la zone lombaire.',
      'Ne relevez pas le torse pendant la traction.'
    ],
    commonMistakes: [
      'Prendre de l élan avec les hanches à chaque répétition.',
      'Arrondir le haut ou le bas du dos.'
    ]
  },
  {
    id: 'lat-pulldown',
    name: 'Tirage Vertical Poitrine à la Poulie',
    category: 'Dos',
    secondaryMuscles: ['Biceps', 'Épaules'],
    equipment: 'Machine',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'cable',
    instructions: [
      'Asseyez-vous sur la machine, les cuisses calées sous les boudins.',
      'Prenez la barre avec une prise large en pronation.',
      'Inclinez légèrement le buste en arrière (15°) et bombez le torse.',
      'Tirez la barre vers le haut des pectoraux en amenant les coudes vers le bas.',
      'Remontez lentement en maîtrisant la charge.'
    ],
    tips: [
      'Ne tirez jamais la barre derrière la nuque (mauvais pour les cervicales).',
      'Concentrez-vous sur la contraction du grand dorsal.'
    ],
    commonMistakes: [
      'Se balancer d avant en arrière pour tricher sur la charge.',
      'Tirer uniquement avec les bras sans engager le dos.'
    ]
  },
  {
    id: 'seated-cable-row',
    name: 'Tirage Horizontal à la Poulie Basse',
    category: 'Dos',
    secondaryMuscles: ['Biceps', 'Épaules'],
    equipment: 'Poulie / Câble',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'cable',
    instructions: [
      'Pieds sur les cales, genoux légèrement déverrouillés, dos bien droit.',
      'Attrapez la poignée double en V, bras tendus devant.',
      'Tirez la poignée vers l abdomen tout en resserrant les omoplates.',
      'Maintenez 1 seconde de contraction maximale.',
      'Revenez lentement vers l avant sans enrouler le dos.'
    ],
    tips: [
      'Gardez le buste stable, évitez les mouvements pendulaires de va-et-vient.',
      'Sortez la poitrine au moment où vous touchez le ventre.'
    ],
    commonMistakes: [
      'Tendre complètement les genoux (met en tension les ischio-jambiers).',
      'Hausser les épaules au lieu de baisser les omoplates.'
    ]
  },

  // --- ÉPAULES ---
  {
    id: 'military-press',
    name: 'Développé Militaire Debout (Overhead Press)',
    category: 'Épaules',
    secondaryMuscles: ['Triceps', 'Abdominaux'],
    equipment: 'Barre',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 90,
    iconType: 'barbell',
    instructions: [
      'Pieds largeur des épaules, fessiers et abdos verrouillés.',
      'Barre posée sur le haut des clavicules, mains juste à l extérieur des épaules.',
      'Poussez la barre droit vers le haut en dégageant légèrement la tête.',
      'Passez la tête sous la barre une fois celle-ci au-dessus des yeux.',
      'Verrouillez au-dessus de la tête, bras tendus, puis redescendez doucement.'
    ],
    tips: [
      'Gardez le corps rigide comme une planche : les fessiers contractés stabilisent le bassin.',
      'Les avant-bras doivent rester verticaux sous la barre.'
    ],
    commonMistakes: [
      'Cambrer excessivement le dos en arrière.',
      'Pousser vers l avant au lieu de pousser droit vers le ciel.'
    ]
  },
  {
    id: 'lateral-raises',
    name: 'Élévations Latérales aux Haltères',
    category: 'Épaules',
    secondaryMuscles: ['Trapèzes'],
    equipment: 'Haltères',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'dumbbell',
    instructions: [
      'Debout, un haltère dans chaque main le long du corps, léger pli au niveau des coudes.',
      'Levez les bras sur les côtés jusqu à hauteur des épaules.',
      'Pensez à verser une cruche d eau (auriculaires légèrement vers le haut).',
      'Contrôlez la descente sur 2 à 3 secondes.'
    ],
    tips: [
      'Priorisez la forme plutôt que la charge lourde : le deltoïde latéral répond au tempo.',
      'Ne levez pas au-delà de l horizontale pour préserver l articulation.'
    ],
    commonMistakes: [
      'Hausser les trapèzes vers les oreilles.',
      'Prendre de l élan avec les genoux et le dos.'
    ]
  },
  {
    id: 'face-pull',
    name: 'Face Pull à la Poulie Haute',
    category: 'Épaules',
    secondaryMuscles: ['Dos', 'Trapèzes'],
    equipment: 'Poulie / Câble',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'cable',
    instructions: [
      'Attachez une corde à la poulie en position haute (hauteur du front).',
      'Saisissez les extrémités en prise neutre ou avec les pouces pointés vers l arrière.',
      'Reculez d un pas et tirez la corde vers votre visage en écartant les mains.',
      'Terminez en effectuant une rotation externe des épaules (coudes hauts et en arrière).',
      'Revenez lentement à la position initiale.'
    ],
    tips: [
      'C est l exercice roi pour la santé des épaules et la posture.',
      'Gardez les coudes plus hauts que les poignets.'
    ],
    commonMistakes: [
      'Mettre trop de poids et compenser avec le torse.',
      'Tirer vers la gorge au lieu des yeux / du front.'
    ]
  },

  // --- JAMBES & FESSIERS ---
  {
    id: 'barbell-squat',
    name: 'Squat à la Barre Arrière (Back Squat)',
    category: 'Quadriceps',
    secondaryMuscles: ['Fessiers', 'Ischio-jambiers', 'Abdominaux'],
    equipment: 'Barre',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 120,
    iconType: 'barbell',
    instructions: [
      'Placez la barre sur vos trapèzes, pieds largeur des épaules, pointes légèrement ouvertes.',
      'Prenez une inspiration profonde dans le ventre et bloquez (manœuvre de Valsalva).',
      'Descendez en pliant hanches et genoux simultanément, comme pour s asseoir.',
      'Descendez au moins jusqu à ce que les cuisses soient parallèles au sol.',
      'Poussez fort sur le milieu du pied et les talons pour remonter.'
    ],
    tips: [
      'Les genoux doivent toujours suivre l alignement des orteils.',
      'Gardez le torse fier et le regard droit devant.'
    ],
    commonMistakes: [
      'Genoux qui rentrent vers l intérieur (valgus).',
      'Décoller les talons du sol.'
    ]
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Squat Bulgare Fente Arrière',
    category: 'Quadriceps',
    secondaryMuscles: ['Fessiers', 'Ischio-jambiers'],
    equipment: 'Haltères',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 75,
    iconType: 'dumbbell',
    instructions: [
      'Debout devant un banc, posez le dessus du pied arrière sur le banc.',
      'Avancez le pied avant suffisamment pour permettre une flexion confortable.',
      'Descendez le genou arrière vers le sol jusqu à former un angle de 90° à l avant.',
      'Poussez avec la jambe avant pour remonter à la position de départ.'
    ],
    tips: [
      'Un léger penchant du buste vers l avant augmente le recrutement du grand fessier.',
      'Focalisez votre appui sur le talon avant.'
    ],
    commonMistakes: [
      'Avoir le pied avant trop proche du banc (genou trop en avant).',
      'Perdre l équilibre en regardant ses pieds.'
    ]
  },
  {
    id: 'hip-thrust',
    name: 'Hip Thrust Barre au Bassin',
    category: 'Fessiers',
    secondaryMuscles: ['Ischio-jambiers', 'Quadriceps'],
    equipment: 'Barre',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 90,
    iconType: 'barbell',
    instructions: [
      'Haut du dos appuyé contre un banc stable, barre rembourrée sur les hanches.',
      'Pieds au sol largeur des épaules, tibias verticaux au sommet du mouvement.',
      'Poussez dans vos talons pour élever le bassin jusqu à l alignement cuisses-buste.',
      'Contractez très fort les fessiers 1 à 2 secondes au sommet.',
      'Redescendez le bassin de manière contrôlée sans reposer au sol.'
    ],
    tips: [
      'Gardez le menton rentré vers la poitrine et le regard dirigé vers l avant.',
      'Ne cambrez pas le bas du dos en haut, le mouvement vient des hanches.'
    ],
    commonMistakes: [
      'Pieds placés trop loin (sollicite trop les ischios) ou trop près (quadriceps).',
      'Hyper-extension lombaire au sommet.'
    ]
  },
  {
    id: 'romanian-deadlift',
    name: 'Soulevé de Terre Roumain (RDL)',
    category: 'Ischio-jambiers',
    secondaryMuscles: ['Fessiers', 'Dos'],
    equipment: 'Haltères',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 90,
    iconType: 'dumbbell',
    instructions: [
      'Debout, pieds largeur des hanches, un haltère dans chaque main devant les cuisses.',
      'Genoux légèrement déverrouillés (angle fixe qui ne bouge pas).',
      'Poussez les fesses en arrière en inclinant le buste, dos droit comme une table.',
      'Descendez les haltères le long des jambes jusqu à ressentir un étirement net des ischios.',
      'Contractez fessiers et ischios pour ramener le bassin vers l avant.'
    ],
    tips: [
      'Imaginez que vous voulez toucher un mur derrière vous avec vos fesses.',
      'Les haltères doivent frôler vos cuisses et vos tibias.'
    ],
    commonMistakes: [
      'Plier les genoux comme dans un squat.',
      'Arrondir la colonne vertébrale pour aller chercher plus bas.'
    ]
  },
  {
    id: 'leg-press',
    name: 'Presse à Cuisses Inclinée (Leg Press)',
    category: 'Quadriceps',
    secondaryMuscles: ['Fessiers', 'Ischio-jambiers'],
    equipment: 'Machine',
    difficulty: 'Débutant',
    defaultRestSeconds: 90,
    iconType: 'machine',
    instructions: [
      'Asseyez-vous sur la machine, bas du dos fermement plaqué contre le dossier.',
      'Placez vos pieds sur le plateau au milieu, écartement largeur des épaules.',
      'Déverrouillez les sécurités et fléchissez les genoux jusqu à un angle de 90°.',
      'Poussez le plateau sans jamais verrouiller complètement les genoux au sommet.'
    ],
    tips: [
      'Ne verrouillez jamais brusquement les genoux en fin de poussée.',
      'Gardez les mains sur les poignées de maintien latérales pour rester ancré.'
    ],
    commonMistakes: [
      'Décoller le bas du dos ou les fesses du siège lors de la flexion.',
      'Amplitude trop courte (demi-répétitions).'
    ]
  },
  {
    id: 'standing-calf-raise',
    name: 'Mollets Debout à la Machine',
    category: 'Mollets',
    secondaryMuscles: [],
    equipment: 'Machine',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'machine',
    instructions: [
      'Placez l avant des pieds sur le rebord de la cale, épaules calées sous les coussins.',
      'Descendez les talons au maximum pour un étirement profond du triceps sural.',
      'Poussez sur la pointe des pieds pour monter le plus haut possible.',
      'Marquez une pause d 1 seconde au sommet en contractant les mollets.'
    ],
    tips: [
      'Les mollets nécessitent une amplitude complète pour un développement optimal.',
      'Évitez tout rebond au fond.'
    ],
    commonMistakes: [
      'Rebondir vite avec les genoux fléchis.',
      'N utiliser que 50% de l amplitude.'
    ]
  },

  // --- BRAS (BICEPS & TRICEPS) ---
  {
    id: 'ez-bar-curl',
    name: 'Curl Biceps à la Barre EZ',
    category: 'Biceps',
    secondaryMuscles: ['Épaules'],
    equipment: 'Barre',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'barbell',
    instructions: [
      'Debout, saisissez la barre EZ au niveau des poignées courbées en supination.',
      'Coudes calés contre les flancs, épaules basses et torse bombé.',
      'Fléchissez les avant-bras vers les épaules en contractant les biceps.',
      'Contrôlez la descente sur 2 secondes jusqu à extension presque complète.'
    ],
    tips: [
      'La barre EZ protège les poignets par rapport à une barre droite.',
      'Gardez les coudes immobiles pendant toute la série.'
    ],
    commonMistakes: [
      'Donner un coup de rein en arrière pour démarrer la montée.',
      'Avancer les coudes vers l avant pendant la flexion.'
    ]
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Curl Incliné aux Haltères',
    category: 'Biceps',
    secondaryMuscles: [],
    equipment: 'Haltères',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 60,
    iconType: 'dumbbell',
    instructions: [
      'Réglez le banc à 45° et allongez-vous, bras pendants vers le bas.',
      'Commencez bras tendus pour étirer le chef long du biceps.',
      'Fléchissez les avant-bras tout en tournant les paumes vers le haut (supination).',
      'Contrôlez fermement la phase excentrique de descente.'
    ],
    tips: [
      'Cet exercice procure un étirement sans égal de la longue portion du biceps.',
      'Ne laissez pas les épaules avancer en avant.'
    ],
    commonMistakes: [
      'Décoller le dos du dossier pour faciliter le mouvement.',
      'Laisser tomber les poids sans retenir.'
    ]
  },
  {
    id: 'triceps-pushdown',
    name: 'Extension Triceps à la Corde (Poulie Haute)',
    category: 'Triceps',
    secondaryMuscles: [],
    equipment: 'Poulie / Câble',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'cable',
    instructions: [
      'Fixez une corde à la poulie haute, buste légèrement penché en avant.',
      'Verrouillez les coudes le long du corps, ils doivent agir comme un pivot fixe.',
      'Poussez la corde vers le bas jusqu à extension complète des bras.',
      'Écartez légèrement les brins de la corde en bas pour une contraction maximale.',
      'Remontez lentement jusqu à ce que les avant-bras soient à l horizontale.'
    ],
    tips: [
      'Seuls les avant-bras doivent bouger, le reste du corps reste statique.',
      'Bloquez 1 seconde en bas à chaque répétition.'
    ],
    commonMistakes: [
      'Laisser les coudes monter et descendre avec le câble.',
      'Utiliser le poids du corps pour écraser la poulie.'
    ]
  },
  {
    id: 'skullcrushers',
    name: 'Barre au Front Allongé (Skullcrusher)',
    category: 'Triceps',
    secondaryMuscles: [],
    equipment: 'Barre',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 75,
    iconType: 'barbell',
    instructions: [
      'Allongé sur un banc plat, tenez la barre EZ bras tendus au-dessus du visage.',
      'Inclinez légèrement les bras vers l arrière (vers le sommet du crâne).',
      'Pliez uniquement les coudes pour amener la barre juste au-dessus du front ou derrière la tête.',
      'Poussez avec les triceps pour revenir à la position de départ.'
    ],
    tips: [
      'Garder les coudes serrés vers l intérieur évite les douleurs articulaires.',
      'Descendre la barre derrière la tête augmente l étirement du chef long.'
    ],
    commonMistakes: [
      'Écarter les coudes vers l extérieur.',
      'Faire bouger l articulation de l épaule au lieu du coude.'
    ]
  },

  // --- ABDOMINAUX & CORE ---
  {
    id: 'plank',
    name: 'Gainage Planche Abdominale',
    category: 'Abdominaux',
    secondaryMuscles: ['Épaules', 'Dos'],
    equipment: 'Poids du corps',
    difficulty: 'Débutant',
    defaultRestSeconds: 60,
    iconType: 'bodyweight',
    instructions: [
      'En appui sur les avant-bras et la pointe des pieds, coudes sous les épaules.',
      'Corps aligné en ligne droite : tête, épaules, bassin, chevilles.',
      'Rétroversion du bassin (aspirez le nombril vers la colonne).',
      'Maintenez la position en respirant calmement et régulièrement.'
    ],
    tips: [
      'Contractez volontairement fessiers et quadriceps pour un gainage plus intense.',
      'Mieux vaut 30 secondes parfaites que 2 minutes le dos creusé.'
    ],
    commonMistakes: [
      'Laisser le bassin tomber vers le sol (cambrure lombaire).',
      'Monter les fesses trop haut en pyramide.'
    ]
  },
  {
    id: 'hanging-leg-raise',
    name: 'Relevé de Jambes Suspendu à la Barre',
    category: 'Abdominaux',
    secondaryMuscles: ['Quadriceps'],
    equipment: 'Poids du corps',
    difficulty: 'Avancé',
    defaultRestSeconds: 60,
    iconType: 'bodyweight',
    instructions: [
      'Suspendez-vous à la barre de traction, corps immobile.',
      'Engagez le centre du corps et enroulez le bassin vers le haut.',
      'Montez les jambes tendues (ou genoux fléchis pour débuter) jusqu à l horizontale.',
      'Contrôlez la descente sans balancer le corps pour éviter l élan.'
    ],
    tips: [
      'C est l enroulement du bassin qui recrute les abdominaux, pas juste la levée des cuisses.',
      'Expirez complètement au point le plus haut.'
    ],
    commonMistakes: [
      'Utiliser le balancier du corps pour faire monter les jambes.',
      'Cambrer le bas du dos à la descente.'
    ]
  },
  {
    id: 'cable-crunch',
    name: 'Crunch à la Poulie Haute',
    category: 'Abdominaux',
    secondaryMuscles: [],
    equipment: 'Poulie / Câble',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 60,
    iconType: 'cable',
    instructions: [
      'À genoux devant la poulie haute, tenez la corde de chaque côté de la tête.',
      'Fixez le bassin : il ne doit pas reculer vers les talons.',
      'Enroulez la colonne vertébrale en amenant les coudes vers les cuisses.',
      'Contractez intensément les abdos 1 seconde en bas en expirant tout l air.',
      'Revenez lentement sans relâcher la tension.'
    ],
    tips: [
      'Imaginez que vous voulez rouler votre buste comme un tapis de sol.',
      'Ne pliez pas les hanches, pliez la colonne lombaire.'
    ],
    commonMistakes: [
      'S asseoir sur ses talons au lieu d enrouler le buste.',
      'Tirer avec les bras plutôt que les abdominaux.'
    ]
  },

  // --- CARDIO & HIIT ---
  {
    id: 'burpees',
    name: 'Burpees Explosifs',
    category: 'Cardio',
    secondaryMuscles: ['Pectoraux', 'Quadriceps', 'Abdominaux'],
    equipment: 'Poids du corps',
    difficulty: 'Intermédiaire',
    defaultRestSeconds: 45,
    iconType: 'bodyweight',
    instructions: [
      'Départ debout, descendez en squat et posez les mains au sol.',
      'Jetez les pieds en arrière d un saut pour atterrir en position de planche.',
      'Effectuez une pompe complète en touchant la poitrine au sol.',
      'Ramenez vivement les pieds près des mains.',
      'Explosez vers le haut dans un saut vertical en levant les bras au ciel.'
    ],
    tips: [
      'Gardez un rythme régulier et constant plutôt que d exploser au premier round.',
      'Atterrissez souplement sur la pointe des pieds.'
    ],
    commonMistakes: [
      'Creuser le dos lors de la planche.',
      'Oublier de respirer de manière cadencée.'
    ]
  },
  {
    id: 'jump-rope',
    name: 'Corde à Sauter (Jump Rope)',
    category: 'Cardio',
    secondaryMuscles: ['Mollets', 'Épaules'],
    equipment: 'Cardio',
    difficulty: 'Débutant',
    defaultRestSeconds: 30,
    iconType: 'cardio',
    instructions: [
      'Tenez les poignées à hauteur de hanches, coudes près du corps.',
      'Faites tourner la corde uniquement avec la rotation des poignets.',
      'Sautez sur la plante des pieds à quelques centimètres du sol.',
      'Gardez les genoux légèrement souples pour amortir les réceptions.'
    ],
    tips: [
      'Inutile de sauter très haut : 2 à 3 cm suffisent pour laisser passer la corde.',
      'Idéal pour l endurance aérobie et la coordination pied-œil.'
    ],
    commonMistakes: [
      'Sauter en pliant les genoux vers l arrière.',
      'Faire tourner les bras entiers au lieu des poignets.'
    ]
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers Rapides',
    category: 'Cardio',
    secondaryMuscles: ['Abdominaux', 'Épaules', 'Quadriceps'],
    equipment: 'Poids du corps',
    difficulty: 'Débutant',
    defaultRestSeconds: 45,
    iconType: 'bodyweight',
    instructions: [
      'Départ en position de planche haute, mains sous les épaules.',
      'Ramenez alternativement un genou vers la poitrine de manière dynamique.',
      'Alternez les jambes comme dans un sprint au sol.',
      'Gardez les hanches stables et le dos plat.'
    ],
    tips: [
      'Ne laissez pas les fesses monter vers le haut du corps.',
      'Fixez un point au sol entre vos mains.'
    ],
    commonMistakes: [
      'Faire rebondir le bassin excessivement.',
      'Éloigner les épaules des poignets.'
    ]
  }
];
