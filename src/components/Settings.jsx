function Settings({ difficulty, setDifficulty, problemType, setProblemType }) {
  return (
    <div className="settings">
      <div className="setting-group">
        <label htmlFor="difficulty">Moeilijkheidsgraad:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="setting-select"
        >
          <option value="easy">Makkelijk</option>
          <option value="medium">Gemiddeld</option>
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="problemType">Soort Som:</label>
        <select
          id="problemType"
          value={problemType}
          onChange={(e) => setProblemType(e.target.value)}
          className="setting-select"
        >
          <option value="+">Optellen</option>
          <option value="-">Aftrekken</option>
          <option value="×">Vermenigvuldigen</option>
          <option value="÷">Delen</option>
          <option value="mixed">Gemengd</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
