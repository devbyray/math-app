import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import MathProblem from './components/MathProblem'
import MathTables from './components/MathTables'
import Settings from './components/Settings'

function App() {
  const [difficulty, setDifficulty] = useState('easy')
  const [problemType, setProblemType] = useState('+')
  const [appMode, setAppMode] = useState('basic') // 'basic' or 'tables'
  const [selectedTable, setSelectedTable] = useState('1')

  return (
    <div className="app">
      <div className="rainbow-background"></div>
      <div className="content">
        <Header />

        <div className="mode-selector">
          <button
            className={`mode-button ${appMode === 'basic' ? 'active' : ''}`}
            onClick={() => setAppMode('basic')}
          >
            Basis Rekenen
          </button>
          <button
            className={`mode-button ${appMode === 'tables' ? 'active' : ''}`}
            onClick={() => setAppMode('tables')}
          >
            Tafels Oefenen
          </button>
        </div>

        <main>
          {appMode === 'basic' ? (
            <>
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
            </>
          ) : (
            <>
              <div className="tables-settings">
                <div className="setting-group">
                  <label htmlFor="tableSelect">Kies een tafel:</label>
                  <select
                    id="tableSelect"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="setting-select"
                  >
                    <option value="random">Willekeurig</option>
                    {[...Array(15)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Tafel van {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="setting-group">
                  <label htmlFor="tableDifficulty">Moeilijkheidsgraad:</label>
                  <select
                    id="tableDifficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="setting-select"
                  >
                    <option value="easy">Makkelijk (1-5)</option>
                    <option value="medium">Gemiddeld (1-10)</option>
                    <option value="hard">Moeilijk (1-15)</option>
                  </select>
                </div>
              </div>

              <MathTables
                selectedTable={selectedTable}
                difficulty={difficulty}
              />
            </>
          )}
        </main>

        <footer>
          <p>Gemaakt met ❤️ om rekenen te leren met eenhoorns!</p>
        </footer>
      </div>
    </div>
  )
}

export default App
