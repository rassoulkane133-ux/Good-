import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Flame, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Flag
} from 'lucide-react';
import { sound } from '../utils/audio';

type TimerMode = 'tabata' | 'custom_hiit' | 'stopwatch';
type IntervalPhase = 'prepare' | 'work' | 'rest' | 'complete';

export const HiitTimer: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('tabata');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.isEnabled());

  // HIIT / Tabata Configuration
  const [prepareSeconds, setPrepareSeconds] = useState<number>(5);
  const [workSeconds, setWorkSeconds] = useState<number>(20);
  const [restSeconds, setRestSeconds] = useState<number>(10);
  const [totalRounds, setTotalRounds] = useState<number>(8);

  // Interval Running State
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [phase, setPhase] = useState<IntervalPhase>('prepare');
  const [secondsLeft, setSecondsLeft] = useState<number>(5);

  // Stopwatch State
  const [stopwatchMs, setStopwatchMs] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);

  // Sound toggle
  const handleToggleSound = () => {
    const res = sound.toggleSound();
    setSoundEnabled(res);
  };

  // Switch timer presets
  const handleSelectMode = (m: TimerMode) => {
    setIsRunning(false);
    setMode(m);
    setPhase('prepare');
    if (m === 'tabata') {
      setPrepareSeconds(5);
      setWorkSeconds(20);
      setRestSeconds(10);
      setTotalRounds(8);
      setSecondsLeft(5);
      setCurrentRound(1);
    } else if (m === 'custom_hiit') {
      setSecondsLeft(prepareSeconds);
      setCurrentRound(1);
    } else {
      setStopwatchMs(0);
      setLaps([]);
    }
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setPhase('prepare');
    setCurrentRound(1);
    if (mode === 'stopwatch') {
      setStopwatchMs(0);
      setLaps([]);
    } else {
      setSecondsLeft(prepareSeconds);
    }
  };

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      if (mode === 'stopwatch') {
        const startTime = Date.now() - stopwatchMs;
        interval = setInterval(() => {
          setStopwatchMs(Date.now() - startTime);
        }, 10);
      } else {
        interval = setInterval(() => {
          setSecondsLeft((prev) => {
            // Audio beeps for 3, 2, 1
            if (prev <= 4 && prev > 1) {
              sound.playCountdownTick();
            }

            if (prev <= 1) {
              // Transition between phases
              if (phase === 'prepare') {
                sound.playGoTone();
                setPhase('work');
                return workSeconds;
              } else if (phase === 'work') {
                if (currentRound >= totalRounds) {
                  sound.playWorkoutComplete();
                  setPhase('complete');
                  setIsRunning(false);
                  return 0;
                } else {
                  sound.playRestCompleted();
                  setPhase('rest');
                  return restSeconds;
                }
              } else if (phase === 'rest') {
                sound.playGoTone();
                setCurrentRound((r) => r + 1);
                setPhase('work');
                return workSeconds;
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, phase, currentRound, totalRounds, workSeconds, restSeconds, prepareSeconds, stopwatchMs]);

  // Lap for stopwatch
  const handleAddLap = () => {
    setLaps([stopwatchMs, ...laps]);
  };

  // Formatting helpers
  const formatStopwatch = (ms: number): string => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    if (phase === 'prepare') return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    if (phase === 'work') return 'text-lime-400 bg-lime-500/10 border-lime-500/40';
    if (phase === 'rest') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
  };

  const getPhaseTitle = () => {
    if (phase === 'prepare') return 'PRÉPARATION';
    if (phase === 'work') return 'EFFORT INTENSE (WORK)';
    if (phase === 'rest') return 'RÉCUPÉRATION (REST)';
    return 'SESSION TERMINÉE !';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header controls & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-semibold w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleSelectMode('tabata')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all ${
              mode === 'tabata' ? 'bg-neutral-800 text-lime-400 font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tabata 20/10
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('custom_hiit')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all ${
              mode === 'custom_hiit' ? 'bg-neutral-800 text-lime-400 font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            HIIT Sur-mesure
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('stopwatch')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all ${
              mode === 'stopwatch' ? 'bg-neutral-800 text-lime-400 font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Chronomètre
          </button>
        </div>

        <button
          type="button"
          onClick={handleToggleSound}
          aria-label={soundEnabled ? 'Désactiver le son' : 'Activer le son'}
          className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-xl text-xs font-medium"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-lime-400" />
              <span>Sons activés</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-neutral-500" />
              <span>Sons coupés</span>
            </>
          )}
        </button>
      </div>

      {/* Main Display Area */}
      {mode === 'stopwatch' ? (
        /* Stopwatch Display */
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
            Chronomètre Haute Précision
          </div>
          <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-white py-6">
            {formatStopwatch(stopwatchMs)}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="p-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-2xl transition-all"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={`px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                  : 'bg-lime-400 hover:bg-lime-300 text-neutral-950'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-6 h-6 fill-current" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current" />
                  Démarrer
                </>
              )}
            </button>

            {isRunning && (
              <button
                type="button"
                onClick={handleAddLap}
                className="p-4 bg-neutral-800 hover:bg-neutral-700 text-lime-400 rounded-2xl transition-all"
              >
                <Flag className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Laps table */}
          {laps.length > 0 && (
            <div className="w-full max-w-sm mt-8 border-t border-neutral-800 pt-4 max-h-48 overflow-y-auto space-y-1">
              <div className="text-xs font-bold uppercase text-neutral-500 mb-2">Tours enregistrés</div>
              {laps.map((lap, idx) => (
                <div key={idx} className="flex justify-between text-xs font-mono py-1 border-b border-neutral-800/40 text-neutral-300">
                  <span>Tour {laps.length - idx}</span>
                  <span className="text-lime-400">{formatStopwatch(lap)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Interval / Tabata / HIIT Display */
        <div className={`border rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 ${getPhaseColor()}`}>
          {/* Phase Badge & Round Counter */}
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs md:text-sm font-black tracking-widest uppercase">
              {getPhaseTitle()}
            </span>
            <span className="text-xs font-mono font-bold bg-neutral-950/70 border border-current px-2.5 py-0.5 rounded-lg">
              Round {currentRound} / {totalRounds}
            </span>
          </div>

          {/* Big Number */}
          <div className="text-8xl md:text-[140px] font-black font-mono tracking-tighter leading-none py-6 select-none">
            {secondsLeft}s
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="p-4 bg-neutral-950/70 hover:bg-neutral-950 text-neutral-300 rounded-2xl transition-all border border-neutral-800"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="px-10 py-5 bg-neutral-950 hover:bg-neutral-900 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all border border-neutral-700"
            >
              {isRunning ? (
                <>
                  <Pause className="w-6 h-6 fill-current text-amber-400" />
                  Mettre en Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current text-lime-400" />
                  {phase === 'complete' ? 'Recommencer' : 'Démarrer le Timer'}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* HIIT Customization Panel */}
      {mode === 'custom_hiit' && !isRunning && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Settings className="w-4 h-4 text-lime-400" />
            Configuration des Intervalles
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl">
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Préparation (s)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={prepareSeconds}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setPrepareSeconds(val);
                  setSecondsLeft(val);
                }}
                className="w-full bg-neutral-900 border border-neutral-700 text-center text-lg font-bold font-mono text-sky-400 rounded-lg py-1"
              />
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl">
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Effort (s)
              </label>
              <input
                type="number"
                min="5"
                max="180"
                value={workSeconds}
                onChange={(e) => setWorkSeconds(parseInt(e.target.value, 10))}
                className="w-full bg-neutral-900 border border-neutral-700 text-center text-lg font-bold font-mono text-lime-400 rounded-lg py-1"
              />
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl">
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Repos (s)
              </label>
              <input
                type="number"
                min="0"
                max="180"
                value={restSeconds}
                onChange={(e) => setRestSeconds(parseInt(e.target.value, 10))}
                className="w-full bg-neutral-900 border border-neutral-700 text-center text-lg font-bold font-mono text-amber-400 rounded-lg py-1"
              />
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl">
              <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                Nb de Rounds
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={totalRounds}
                onChange={(e) => setTotalRounds(parseInt(e.target.value, 10))}
                className="w-full bg-neutral-900 border border-neutral-700 text-center text-lg font-bold font-mono text-white rounded-lg py-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
