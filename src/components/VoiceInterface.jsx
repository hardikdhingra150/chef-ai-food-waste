import { useState } from 'react'
import { Mic, MicOff } from 'lucide-react'

export default function VoiceInterface() {
  const [isListening, setIsListening] = useState(false)

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Voice Assistant</h3>
      
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
            isListening ? 'bg-red-500' : 'bg-primary'
          } shadow-lg`}
        >
          {isListening ? (
            <MicOff className="w-10 h-10 text-white" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </button>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400">
        {isListening ? 'Listening...' : 'Click to activate voice command'}
      </p>
    </div>
  )
}
