import { useState } from 'react'
import { ChefHat, Clock, Users, Flame, Sparkles, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatService } from '../services/chatService'

export default function RecipeGenerator() {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [recipe, setRecipe] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  // Mock surplus ingredients (you can fetch from backend later)
  const availableIngredients = [
    { id: 1, name: 'Tomatoes', amount: '3kg' },
    { id: 2, name: 'Lettuce', amount: '2kg' },
    { id: 3, name: 'Milk', amount: '8L' },
    { id: 4, name: 'Eggs', amount: '50pcs' },
    { id: 5, name: 'Rice', amount: '15kg' },
    { id: 6, name: 'Chicken', amount: '5kg' }
  ]

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => {
      const exists = prev.find(i => i.id === ingredient.id)
      if (exists) {
        return prev.filter(i => i.id !== ingredient.id)
      } else {
        return [...prev, ingredient]
      }
    })
  }

  const generateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      setError('Please select at least one ingredient')
      return
    }

    setIsGenerating(true)
    setError(null)
    setRecipe(null) // Clear previous recipe

    try {
      console.log('🍳 Generating recipe for:', selectedIngredients.map(i => i.name))
      
      const response = await chatService.generateRecipe(
        selectedIngredients.map(i => i.name)
      )

      console.log('✅ Full response:', response)
      
      // Backend returns: { success: true, data: { name, steps, etc } }
      if (response.success && response.data) {
        console.log('✅ Recipe data:', response.data)
        setRecipe(response.data)
      } else {
        throw new Error('Invalid recipe response')
      }
    } catch (err) {
      console.error('❌ Recipe generation failed:', err)
      setError('Failed to generate recipe. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-2xl p-8 text-white"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
          <ChefHat className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-black">Smart Recipe Generator</h2>
          <p className="text-white/80 text-sm">Transform surplus into delicious meals</p>
        </div>
      </div>

      {/* Select Ingredients */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Select surplus ingredients:</h3>
        <div className="flex flex-wrap gap-2">
          {availableIngredients.map(ingredient => (
            <button
              key={ingredient.id}
              onClick={() => toggleIngredient(ingredient)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedIngredients.find(i => i.id === ingredient.id)
                  ? 'bg-white text-orange-600 shadow-lg scale-105'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {ingredient.name} ({ingredient.amount})
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateRecipe}
        disabled={isGenerating || selectedIngredients.length === 0}
        className="w-full py-4 rounded-2xl bg-white text-orange-600 font-black text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-6"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Recipe...
          </>
        ) : (
          <>
            <ChefHat className="w-5 h-5" />
            Generate Recipe
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-300/50">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Recipe Display */}
      <AnimatePresence>
        {recipe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            {/* Recipe Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-black">{recipe.name}</h3>
              {recipe.savings && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Saves {recipe.savings}
                </div>
              )}
            </div>

            {/* Recipe Meta */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs opacity-80">Time</p>
                <p className="font-bold">{recipe.time}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs opacity-80">Servings</p>
                <p className="font-bold">{recipe.servings}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Flame className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs opacity-80">Difficulty</p>
                <p className="font-bold">{recipe.difficulty}</p>
              </div>
            </div>

            {/* Cooking Steps */}
            <div>
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Cooking Steps:
              </h4>
              <div className="space-y-3">
                {recipe.steps && recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="flex-1 text-white/90">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {recipe.tips && (
              <div className="mt-6 p-4 bg-yellow-500/20 rounded-xl border border-yellow-300/30">
                <p className="text-sm">
                  <span className="font-bold">💡 Pro Tip:</span> {recipe.tips}
                </p>
              </div>
            )}

            {/* Gemini Badge */}
            <div className="mt-4 text-center text-xs opacity-70">
              ✨ Generated by Gemini 2.5 Flash AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
