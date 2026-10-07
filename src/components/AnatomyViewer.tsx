import React, { useState } from 'react';
import { MuscleGroup } from '../types/fitness';

interface AnatomyViewerProps {
  selectedCategory?: MuscleGroup | null;
  secondaryCategories?: MuscleGroup[];
  onSelectMuscle?: (muscle: MuscleGroup) => void;
  interactive?: boolean;
}

export const AnatomyViewer: React.FC<AnatomyViewerProps> = ({
  selectedCategory,
  secondaryCategories = [],
  onSelectMuscle,
  interactive = true,
}) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const getMuscleColor = (muscle: MuscleGroup): string => {
    if (selectedCategory === muscle) {
      return '#bef264'; // Vibrant lime
    }
    if (secondaryCategories.includes(muscle)) {
      return '#38bdf8'; // Sky blue for secondary muscles
    }
    return '#262626'; // Neutral dark gray for inactive
  };

  const getMuscleStroke = (muscle: MuscleGroup): string => {
    if (selectedCategory === muscle) {
      return '#84cc16';
    }
    if (secondaryCategories.includes(muscle)) {
      return '#0284c7';
    }
    return '#404040';
  };

  const handleMuscleClick = (muscle: MuscleGroup) => {
    if (interactive && onSelectMuscle) {
      onSelectMuscle(muscle);
    }
  };

  return (
    <div className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-xl">
      {/* Switcher Front / Back */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Anatomie Musculaire
        </div>
        <div className="flex items-center p-0.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setView('front')}
            className={`px-3 py-1 rounded-md transition-all ${
              view === 'front'
                ? 'bg-neutral-800 text-lime-400 font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Vue Face
          </button>
          <button
            type="button"
            onClick={() => setView('back')}
            className={`px-3 py-1 rounded-md transition-all ${
              view === 'back'
                ? 'bg-neutral-800 text-lime-400 font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Vue Dos
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-52 h-72 flex items-center justify-center">
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full filter drop-shadow-md transition-all"
        >
          {/* Head & Neck silhouette */}
          <path
            d="M93 18 C93 11 107 11 107 18 C107 26 93 26 93 18 Z"
            fill="#171717"
            stroke="#333"
            strokeWidth="1.5"
          />
          <path
            d="M95 27 L95 36 L105 36 L105 27 Z"
            fill="#171717"
            stroke="#333"
            strokeWidth="1.2"
          />

          {view === 'front' ? (
            /* ================= FRONT VIEW ================= */
            <g>
              {/* Shoulders Left & Right */}
              <path
                d="M66 42 Q60 52 64 68 Q75 62 76 44 Z"
                fill={getMuscleColor('Épaules')}
                stroke={getMuscleStroke('Épaules')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Épaules')}
              />
              <path
                d="M134 42 Q140 52 136 68 Q125 62 124 44 Z"
                fill={getMuscleColor('Épaules')}
                stroke={getMuscleStroke('Épaules')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Épaules')}
              />

              {/* Chest / Pectoraux */}
              <path
                d="M77 44 Q100 48 100 66 Q74 66 76 44 Z"
                fill={getMuscleColor('Pectoraux')}
                stroke={getMuscleStroke('Pectoraux')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Pectoraux')}
              />
              <path
                d="M123 44 Q100 48 100 66 Q126 66 124 44 Z"
                fill={getMuscleColor('Pectoraux')}
                stroke={getMuscleStroke('Pectoraux')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Pectoraux')}
              />

              {/* Biceps */}
              <path
                d="M62 70 Q56 86 64 102 Q72 96 70 72 Z"
                fill={getMuscleColor('Biceps')}
                stroke={getMuscleStroke('Biceps')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Biceps')}
              />
              <path
                d="M138 70 Q144 86 136 102 Q128 96 130 72 Z"
                fill={getMuscleColor('Biceps')}
                stroke={getMuscleStroke('Biceps')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Biceps')}
              />

              {/* Forearms */}
              <path
                d="M64 104 Q55 125 61 144 Q68 140 68 110 Z"
                fill="#262626"
                stroke="#404040"
                strokeWidth="1.2"
              />
              <path
                d="M136 104 Q145 125 139 144 Q132 140 132 110 Z"
                fill="#262626"
                stroke="#404040"
                strokeWidth="1.2"
              />

              {/* Abdominaux (Abs / Core) */}
              <g
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Abdominaux')}
              >
                <path
                  d="M82 68 L118 68 L114 122 L86 122 Z"
                  fill={getMuscleColor('Abdominaux')}
                  stroke={getMuscleStroke('Abdominaux')}
                  strokeWidth="1.5"
                />
                {/* 6 pack dividers subtle lines */}
                <line x1="100" y1="68" x2="100" y2="122" stroke="#171717" strokeWidth="1.2" />
                <line x1="86" y1="84" x2="114" y2="84" stroke="#171717" strokeWidth="1" />
                <line x1="85" y1="102" x2="115" y2="102" stroke="#171717" strokeWidth="1" />
              </g>

              {/* Hips / Pelvis */}
              <path
                d="M84 124 L116 124 L112 142 L88 142 Z"
                fill="#1c1c1c"
                stroke="#333"
                strokeWidth="1.2"
              />

              {/* Quadriceps (Thighs front) */}
              <path
                d="M82 144 Q70 185 82 222 Q96 220 95 146 Z"
                fill={getMuscleColor('Quadriceps')}
                stroke={getMuscleStroke('Quadriceps')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Quadriceps')}
              />
              <path
                d="M118 144 Q130 185 118 222 Q104 220 105 146 Z"
                fill={getMuscleColor('Quadriceps')}
                stroke={getMuscleStroke('Quadriceps')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Quadriceps')}
              />

              {/* Knees */}
              <circle cx="89" cy="227" r="4.5" fill="#1f1f1f" stroke="#383838" strokeWidth="1" />
              <circle cx="111" cy="227" r="4.5" fill="#1f1f1f" stroke="#383838" strokeWidth="1" />

              {/* Calves front */}
              <path
                d="M84 234 Q76 260 85 285 L94 285 Q94 260 93 234 Z"
                fill={getMuscleColor('Mollets')}
                stroke={getMuscleStroke('Mollets')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Mollets')}
              />
              <path
                d="M116 234 Q124 260 115 285 L106 285 Q106 260 107 234 Z"
                fill={getMuscleColor('Mollets')}
                stroke={getMuscleStroke('Mollets')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Mollets')}
              />
            </g>
          ) : (
            /* ================= BACK VIEW ================= */
            <g>
              {/* Traps / Upper back */}
              <path
                d="M92 36 L108 36 L124 46 L100 80 L76 46 Z"
                fill={selectedCategory === 'Trapèzes' ? '#bef264' : getMuscleColor('Dos')}
                stroke={selectedCategory === 'Trapèzes' ? '#84cc16' : getMuscleStroke('Dos')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Trapèzes')}
              />

              {/* Rear Deltoids */}
              <path
                d="M66 44 Q58 54 64 68 Q75 62 76 44 Z"
                fill={getMuscleColor('Épaules')}
                stroke={getMuscleStroke('Épaules')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Épaules')}
              />
              <path
                d="M134 44 Q142 54 136 68 Q125 62 124 44 Z"
                fill={getMuscleColor('Épaules')}
                stroke={getMuscleStroke('Épaules')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Épaules')}
              />

              {/* Triceps */}
              <path
                d="M62 70 Q56 86 64 102 Q70 96 69 72 Z"
                fill={getMuscleColor('Triceps')}
                stroke={getMuscleStroke('Triceps')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Triceps')}
              />
              <path
                d="M138 70 Q144 86 136 102 Q130 96 131 72 Z"
                fill={getMuscleColor('Triceps')}
                stroke={getMuscleStroke('Triceps')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Triceps')}
              />

              {/* Latissimus Dorsi (Lats / Dorsaux) */}
              <path
                d="M74 54 Q100 82 78 120 L86 122 Q100 86 100 80 Q100 86 114 122 L122 120 Q100 82 126 54 Z"
                fill={getMuscleColor('Dos')}
                stroke={getMuscleStroke('Dos')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Dos')}
              />

              {/* Lower back */}
              <path
                d="M88 114 L112 114 L114 134 L86 134 Z"
                fill={getMuscleColor('Dos')}
                stroke={getMuscleStroke('Dos')}
                strokeWidth="1"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Dos')}
              />

              {/* Glutes / Fessiers */}
              <path
                d="M82 136 Q98 136 99 164 Q80 168 78 142 Z"
                fill={getMuscleColor('Fessiers')}
                stroke={getMuscleStroke('Fessiers')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Fessiers')}
              />
              <path
                d="M118 136 Q102 136 101 164 Q120 168 122 142 Z"
                fill={getMuscleColor('Fessiers')}
                stroke={getMuscleStroke('Fessiers')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Fessiers')}
              />

              {/* Hamstrings / Ischios */}
              <path
                d="M80 166 Q72 195 83 222 Q97 220 98 166 Z"
                fill={getMuscleColor('Ischio-jambiers')}
                stroke={getMuscleStroke('Ischio-jambiers')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Ischio-jambiers')}
              />
              <path
                d="M120 166 Q128 195 117 222 Q103 220 102 166 Z"
                fill={getMuscleColor('Ischio-jambiers')}
                stroke={getMuscleStroke('Ischio-jambiers')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Ischio-jambiers')}
              />

              {/* Calves back (Gastrocnemius) */}
              <path
                d="M83 234 Q74 256 84 285 L94 285 Q95 258 93 234 Z"
                fill={getMuscleColor('Mollets')}
                stroke={getMuscleStroke('Mollets')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Mollets')}
              />
              <path
                d="M117 234 Q126 256 116 285 L106 285 Q105 258 107 234 Z"
                fill={getMuscleColor('Mollets')}
                stroke={getMuscleStroke('Mollets')}
                strokeWidth="1.5"
                className={`transition-colors ${interactive ? 'cursor-pointer hover:brightness-125' : ''}`}
                onClick={() => handleMuscleClick('Mollets')}
              />
            </g>
          )}
        </svg>
      </div>

      {/* Legend / Info bar */}
      <div className="w-full mt-3 pt-3 border-t border-neutral-800 text-[11px] flex items-center justify-between text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-lime-400 inline-block shadow-xs" />
          <span>Principal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-400 inline-block" />
          <span>Secondaire</span>
        </div>
        <div className="text-neutral-500">
          {interactive ? 'Cliquez pour filtrer' : ''}
        </div>
      </div>
    </div>
  );
};
