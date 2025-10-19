import { useState, useRef, useEffect } from 'react';
import { Mic, Loader2, Volume2 } from 'lucide-react';

// ✅ Use environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      handleCommand(text);
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  const handleCommand = async (text) => {
    setIsProcessing(true);
    try {
      // ✅ Use API_URL variable instead of hardcoded localhost
      const res = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      const reply = data.data.message;
      setResponse(reply);
      speak(reply);
    } catch (err) {
      setResponse('Error: ' + err.message);
    }
    setIsProcessing(false);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    setTranscript('');
    setResponse('');
    recognitionRef.current?.start();
    setIsListening(true);
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Voice Assistant</h2>
      
      <div className="flex justify-center mb-8">
        <button
          onClick={startListening}
          disabled={isListening || isProcessing}
          className={`w-32 h-32 rounded-full flex items-center justify-center ${
            isListening ? 'bg-red-500' : 'bg-white'
          } disabled:opacity-50`}
        >
          {isProcessing ? (
            <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
          ) : (
            <Mic className={`w-16 h-16 ${isListening ? 'text-white' : 'text-purple-600'}`} />
          )}
        </button>
      </div>

      <div className="text-center mb-4">
        {isListening && <p className="text-xl font-bold">Listening...</p>}
        {isProcessing && <p className="text-xl font-bold">Processing...</p>}
      </div>

      {transcript && (
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <p className="text-sm opacity-80">You said:</p>
          <p className="font-bold">{transcript}</p>
        </div>
      )}

      {response && (
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4" />
            <p className="text-sm opacity-80">AI Response:</p>
          </div>
          <p className="text-sm">{response}</p>
        </div>
      )}

      <div className="mt-8 text-center text-sm opacity-60">
        <p>💡 Click microphone and say something</p>
      </div>
    </div>
  );
}
