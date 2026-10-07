import React, { useState } from 'react';
import { 
  Droplet, 
  Utensils, 
  Plus, 
  Trash2, 
  Flame, 
  Calculator, 
  TrendingUp, 
  PieChart, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { FoodItem, UserProfile } from '../types/fitness';
import { 
  getStoredProfile, 
  saveStoredProfile, 
  getWaterForDate, 
  setWaterForDate, 
  getMealsForDate, 
  saveMealsForDate,
  calculateTDEE 
} from '../utils/storage';

export const NutritionTracker: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());
  const [waterMl, setWaterMl] = useState<number>(getWaterForDate(today));
  const [meals, setMeals] = useState<FoodItem[]>(getMealsForDate(today));

  // Add meal modal
  const [showAddMeal, setShowAddMeal] = useState<boolean>(false);
  const [mealName, setMealName] = useState<string>('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [calories, setCalories] = useState<number>(450);
  const [protein, setProtein] = useState<number>(35);
  const [carbs, setCarbs] = useState<number>(45);
  const [fat, setFat] = useState<number>(12);

  // Calculator modal
  const [showCalcModal, setShowCalcModal] = useState<boolean>(false);
  const [calcGender, setCalcGender] = useState<'homme' | 'femme'>(profile.gender);
  const [calcAge, setCalcAge] = useState<number>(profile.age);
  const [calcWeight, setCalcWeight] = useState<number>(profile.currentWeightKg);
  const [calcHeight, setCalcHeight] = useState<number>(profile.heightCm);
  const [calcActivity, setCalcActivity] = useState<'sedentaire' | 'modere' | 'actif' | 'tres_actif'>(profile.activityLevel);
  const [calcGoal, setCalcGoal] = useState<'perte_poids' | 'prise_masse' | 'maintien' | 'endurance'>(profile.goal);

  // Totals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.proteinG, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbsG, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fatG, 0);

  // Water handlers
  const handleAddWater = (ml: number) => {
    const updated = Math.max(0, waterMl + ml);
    setWaterMl(updated);
    setWaterForDate(today, updated);
  };

  const handleResetWater = () => {
    setWaterMl(0);
    setWaterForDate(today, 0);
  };

  // Meal handlers
  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName.trim()) return;

    const newMeal: FoodItem = {
      id: 'food_' + Date.now(),
      name: mealName.trim(),
      mealType,
      calories,
      proteinG: protein,
      carbsG: carbs,
      fatG: fat,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...meals, newMeal];
    setMeals(updated);
    saveMealsForDate(today, updated);
    setShowAddMeal(false);
    setMealName('');
  };

  const handleDeleteMeal = (id: string) => {
    const updated = meals.filter(m => m.id !== id);
    setMeals(updated);
    saveMealsForDate(today, updated);
  };

  const handleApplyPreset = (name: string, cal: number, p: number, c: number, f: number, type: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const newMeal: FoodItem = {
      id: 'food_' + Date.now(),
      name,
      mealType: type,
      calories: cal,
      proteinG: p,
      carbsG: c,
      fatG: f,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [...meals, newMeal];
    setMeals(updated);
    saveMealsForDate(today, updated);
  };

  // Calculator apply
  const handleApplyCalculation = () => {
    const res = calculateTDEE(calcGender, calcWeight, calcHeight, calcAge, calcActivity, calcGoal);
    const updatedProfile: UserProfile = {
      ...profile,
      gender: calcGender,
      age: calcAge,
      currentWeightKg: calcWeight,
      heightCm: calcHeight,
      activityLevel: calcActivity,
      goal: calcGoal,
      dailyCalorieTarget: res.calories,
      dailyProteinTargetG: res.protein,
      dailyCarbsTargetG: res.carbs,
      dailyFatTargetG: res.fat,
    };
    setProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
    setShowCalcModal(false);
  };

  const waterPercent = Math.min(100, Math.round((waterMl / profile.dailyWaterTargetMl) * 100));
  const calPercent = Math.min(100, Math.round((totalCalories / profile.dailyCalorieTarget) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner with TDEE Calculator Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-3xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-lime-400" />
            Suivi Nutritionnel & Hydratation
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Objectif journalier : <strong className="text-white">{profile.dailyCalorieTarget} kcal</strong> ({profile.goal === 'prise_masse' ? 'Prise de masse musculaire' : profile.goal === 'perte_poids' ? 'Déficit / Perte de gras' : 'Maintien & Vitalité'})
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCalcModal(true)}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl flex items-center gap-2 border border-neutral-700 transition-colors shadow-sm"
        >
          <Calculator className="w-4 h-4 text-lime-400" />
          Calculateur de Besoins Métaboliques (TDEE)
        </button>
      </div>

      {/* Main Grid: Nutrition on Left, Water on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Calories & Macros (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Calorie Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Calories Consommées
              </span>
              <span className="font-mono text-xs text-lime-400 font-semibold">
                {totalCalories} / {profile.dailyCalorieTarget} kcal
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-950 h-3 rounded-full overflow-hidden border border-neutral-800 mb-6">
              <div
                className="bg-lime-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-lime-400/50"
                style={{ width: `${calPercent}%` }}
              />
            </div>

            {/* Macro Breakdown Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Protein */}
              <div className="bg-neutral-950 border border-neutral-800/80 p-3.5 rounded-2xl">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-sky-400">Protéines</span>
                  <span className="text-[11px] text-neutral-500 font-mono">{totalProtein}/{profile.dailyProteinTargetG}g</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (totalProtein / profile.dailyProteinTargetG) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-neutral-400 mt-2 font-mono">
                  {totalProtein * 4} kcal
                </div>
              </div>

              {/* Carbs */}
              <div className="bg-neutral-950 border border-neutral-800/80 p-3.5 rounded-2xl">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-400">Glucides</span>
                  <span className="text-[11px] text-neutral-500 font-mono">{totalCarbs}/{profile.dailyCarbsTargetG}g</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (totalCarbs / profile.dailyCarbsTargetG) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-neutral-400 mt-2 font-mono">
                  {totalCarbs * 4} kcal
                </div>
              </div>

              {/* Fat */}
              <div className="bg-neutral-950 border border-neutral-800/80 p-3.5 rounded-2xl">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-rose-400">Lipides</span>
                  <span className="text-[11px] text-neutral-500 font-mono">{totalFat}/{profile.dailyFatTargetG}g</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (totalFat / profile.dailyFatTargetG) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-neutral-400 mt-2 font-mono">
                  {totalFat * 9} kcal
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets for Instant Logging */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              Ajouts Rapides en 1 Clic
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('Shaker Whey Isolate 30g', 130, 28, 2, 1, 'snack')}
                className="p-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-left transition-all"
              >
                <div className="text-xs font-bold text-white truncate">Shaker Whey</div>
                <div className="text-[11px] text-sky-400 font-mono">28g prot · 130 kcal</div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('Poulet Grillé & Riz 150g', 550, 48, 65, 8, 'lunch')}
                className="p-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-left transition-all"
              >
                <div className="text-xs font-bold text-white truncate">Poulet & Riz</div>
                <div className="text-[11px] text-sky-400 font-mono">48g prot · 550 kcal</div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('Bowl Flocons d\'Avoine & Banane', 420, 16, 72, 7, 'breakfast')}
                className="p-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-left transition-all"
              >
                <div className="text-xs font-bold text-white truncate">Avoine & Banane</div>
                <div className="text-[11px] text-amber-400 font-mono">16g prot · 420 kcal</div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('Poignée d\'Amandes (30g)', 180, 6, 4, 15, 'snack')}
                className="p-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-left transition-all"
              >
                <div className="text-xs font-bold text-white truncate">Amandes 30g</div>
                <div className="text-[11px] text-rose-400 font-mono">15g lip · 180 kcal</div>
              </button>
            </div>
          </div>

          {/* Meals List */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Repas Enregistrés ({meals.length})
              </span>
              <button
                type="button"
                onClick={() => setShowAddMeal(true)}
                className="px-3 py-1.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Ajouter un aliment
              </button>
            </div>

            {meals.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-neutral-800 rounded-2xl text-neutral-500 text-xs">
                Aucun aliment enregistré aujourd'hui.
              </div>
            ) : (
              <div className="space-y-2">
                {meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="p-3 bg-neutral-950 border border-neutral-800/80 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{meal.name}</div>
                      <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                        <span className="text-neutral-400">{meal.calories} kcal</span> · 
                        <span className="text-sky-400 ml-1">P:{meal.proteinG}g</span> · 
                        <span className="text-amber-400 ml-1">G:{meal.carbsG}g</span> · 
                        <span className="text-rose-400 ml-1">L:{meal.fatG}g</span>
                        <span className="text-neutral-600 ml-2">({meal.time})</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Hydration Widget */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-3">
              <Droplet className="w-6 h-6 animate-pulse" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Hydratation du Jour
            </span>
            <div className="text-3xl font-black font-mono text-white mt-1">
              {waterMl} <span className="text-base text-neutral-400 font-normal">/ {profile.dailyWaterTargetMl} ml</span>
            </div>
            <div className="text-xs font-medium text-sky-400 mt-1">
              {waterPercent}% de votre objectif
            </div>

            {/* Bottle Gauge Graphic */}
            <div className="w-20 h-44 my-5 bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-1 relative overflow-hidden flex flex-col justify-end">
              <div
                className="w-full bg-linear-to-t from-sky-500 to-sky-400 rounded-2xl transition-all duration-500 shadow-lg shadow-sky-500/20"
                style={{ height: `${waterPercent}%` }}
              />
            </div>

            {/* Quick Add Water Buttons */}
            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              <button
                type="button"
                onClick={() => handleAddWater(250)}
                className="py-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-bold text-sky-300 transition-all"
              >
                +250 ml (Verre)
              </button>
              <button
                type="button"
                onClick={() => handleAddWater(500)}
                className="py-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-bold text-sky-300 transition-all"
              >
                +500 ml (Gourde)
              </button>
            </div>

            <div className="flex items-center justify-between w-full mt-3 pt-3 border-t border-neutral-800 text-xs">
              <button
                type="button"
                onClick={() => handleAddWater(-250)}
                className="text-neutral-500 hover:text-neutral-300"
              >
                -250 ml
              </button>
              <button
                type="button"
                onClick={handleResetWater}
                className="text-neutral-500 hover:text-red-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in duration-200">
            <h3 className="font-bold text-white text-base mb-4">Ajouter un aliment</h3>
            <form onSubmit={handleSaveMeal} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Nom de l'aliment / plat *
                </label>
                <input
                  type="text"
                  required
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="Ex : Omelette 3 œufs et pain complet"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-hidden focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(parseInt(e.target.value, 10))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Moment
                  </label>
                  <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="breakfast">Petit-déjeuner</option>
                    <option value="lunch">Déjeuner</option>
                    <option value="dinner">Dîner</option>
                    <option value="snack">Collation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-sky-400 block mb-1">
                    Protéines (g)
                  </label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(parseInt(e.target.value, 10))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-amber-400 block mb-1">
                    Glucides (g)
                  </label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(parseInt(e.target.value, 10))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-rose-400 block mb-1">
                    Lipides (g)
                  </label>
                  <input
                    type="number"
                    value={fat}
                    onChange={(e) => setFat(parseInt(e.target.value, 10))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMeal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TDEE Calculator Modal */}
      {showCalcModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in duration-200">
            <h3 className="font-bold text-white text-base mb-1">
              Calculateur Métabolique TDEE & Macros
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Ajustez vos cibles caloriques précises selon la formule de Mifflin-St Jeor.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Sexe</label>
                  <select
                    value={calcGender}
                    onChange={(e) => setCalcGender(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white"
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Âge</label>
                  <input
                    type="number"
                    value={calcAge}
                    onChange={(e) => setCalcAge(parseInt(e.target.value, 10))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Poids actuel (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Taille (cm)</label>
                  <input
                    type="number"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(parseInt(e.target.value, 10))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Niveau d'activité</label>
                  <select
                    value={calcActivity}
                    onChange={(e) => setCalcActivity(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white"
                  >
                    <option value="sedentaire">Sédentaire (Bureau)</option>
                    <option value="modere">Modéré (1-3 séances/sem)</option>
                    <option value="actif">Actif (3-5 séances/sem)</option>
                    <option value="tres_actif">Athlète (6+ séances/sem)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Objectif principal</label>
                  <select
                    value={calcGoal}
                    onChange={(e) => setCalcGoal(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-white"
                  >
                    <option value="perte_poids">Perte de Gras (-18%)</option>
                    <option value="prise_masse">Prise de Masse (+12%)</option>
                    <option value="maintien">Maintien du Poids</option>
                  </select>
                </div>
              </div>

              {/* Preview Result */}
              {(() => {
                const res = calculateTDEE(calcGender, calcWeight, calcHeight, calcAge, calcActivity, calcGoal);
                return (
                  <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-2xl text-center">
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Cible Calculée</div>
                    <div className="text-2xl font-black font-mono text-lime-400 mt-0.5">
                      {res.calories} kcal / jour
                    </div>
                    <div className="text-xs text-neutral-400 mt-1 flex justify-center gap-4 font-mono">
                      <span>P: {res.protein}g</span>
                      <span>G: {res.carbs}g</span>
                      <span>L: {res.fat}g</span>
                    </div>
                  </div>
                );
              })()}

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCalcModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleApplyCalculation}
                  className="px-4 py-2 bg-lime-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Appliquer aux Objectifs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
