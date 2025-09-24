import { useState } from 'react'
import { LoadingScreen } from './components'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={handleLoadingComplete}
        duration={5000}
        brandText="Interactive Loading Screen"
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-6 shadow-lg">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-4">
              Loading Complete
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Interactive Loading Screen with real-time code typing and smooth animations
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{'<>'}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-time Typing</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Watch algorithms type out character by character with perfect synchronization
                </p>
              </div>

              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">8+</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Built-in Algorithms</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Dijkstra, QuickSort, A*, Binary Search, and more professional implementations
                </p>
              </div>

              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">TS</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">TypeScript Ready</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Full TypeScript support with complete type definitions included
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="text-center mb-12">
              <button
                onClick={() => setIsLoading(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Try Loading Screen Again</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <p className="text-slate-500 text-sm mt-4">
                Each reload shows a different algorithm implementation
              </p>
            </div>

            {/* Code Example */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-slate-400 text-sm font-medium">Quick Start</span>
                </div>
                <div className="text-xs text-slate-500">TypeScript</div>
              </div>
              <div className="p-6">
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code className="language-typescript">{`// 1. Install dependencies
npm install framer-motion

// 2. Import and use
import { LoadingScreen } from './components/LoadingScreen';
import './styles/loading-screen.css';

function MyApp() {
  const [loading, setLoading] = useState(true);
  
  return loading ? (
    <LoadingScreen 
      onComplete={() => setLoading(false)}
      duration={5000}
      brandText="Loading My App..."
    />
  ) : (
    <YourAppContent />
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-slate-500 text-sm">
              Built with React, TypeScript, and Framer Motion
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
