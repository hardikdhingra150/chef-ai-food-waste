import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">CHEF AI</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            © 2025 CHEF AI. Powered by predictive intelligence.
          </div>
        </div>
      </div>
    </footer>
  )
}
