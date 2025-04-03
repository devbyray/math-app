import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import MathProblem from './components/MathProblem'
import Settings from './components/Settings'

function App() {
  const [difficulty, setDifficulty] = useState('easy')
  const [problemType, setProblemType] = useState('+')

  return (
    <div className="app">
      <div className="rainbow-background"></div>
      <div className="content">
        <Header />

        <main>
          <Settings
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            problemType={problemType}
            setProblemType={setProblemType}
          />

          <MathProblem
            difficulty={difficulty}
            problemType={problemType}
          />
        </main>

        <footer>
          <p>Gemaakt met ❤️ om rekenen te leren met eenhoorns!</p>
        </footer>
      </div>
    </div>
  )
}

export default App
