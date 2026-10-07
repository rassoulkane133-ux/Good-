import React from 'react';
import { 
  Home, 
  Dumbbell, 
  BookOpen, 
  Timer, 
  Utensils, 
  TrendingUp, 
  Zap, 
  Play, 
  Maximize2 
} from 'lucide-react';
import { ActiveWorkoutSession } from '../types/fitness';

export type TabType = 'today' | 'routines' | 'exercises' | 'timer' | 'nutrition' | 'analytics';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  activeSession: ActiveWorkoutSession | null;
  onOpenActiveSession: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  activeSession,
  onOpenActiveSession,
}) => {
  const tabs = [
    { id: 'today', label: 'Aujourd\'hui', icon: Home },
    { id: 'routines', label: 'Séances', icon: Dumbbell },
    { id: 'exercises', label: 'Exercices', icon: BookOpen },
    { id: 'timer', label: 'Minuteur HIIT', icon: Timer },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'analytics', label: 'Progression', icon: TrendingUp },
  ] as const;

  return (
    <>
      {/* Top Navbar for Desktop */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Branding */}
          <div 
            onClick={() => onSelectTab('today')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-lime-400/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>PULSE</span>
                <span className="text-lime-400">FIT</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono -mt-1 tracking-wider uppercase">
                Performance & Fitness
              </div>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900 border border-neutral-800/80 p-1 rounded-2xl shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id as TabType)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-800 text-lime-400 shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Active Workout Resume pill if in progress */}
          <div className="flex items-center gap-3">
            {activeSession ? (
              <button
                type="button"
                onClick={onOpenActiveSession}
                className="px-3 py-1.5 bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 text-lime-400 text-xs font-bold rounded-xl flex items-center gap-2 animate-pulse cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
                <span>Séance en cours</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelectTab('routines')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded-xl shadow-md shadow-lime-400/20 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>S'entraîner</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800 px-2 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id as TabType)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-lime-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
