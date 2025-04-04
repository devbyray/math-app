import { useState, useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';

function MathTables({ selectedTable, difficulty }) {
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [problemCount, setProblemCount] = useState(0);
  const [maxProblems, setMaxProblems] = useState(10);

  // Generate a new problem
  const generateProblem = () => {
    let num1, num2;

    if (selectedTable === 'random') {
      // Random table between 1 and 15
      num1 = Math.floor(Math.random() * 15) + 1;
    } else {
      // Use the selected table
      num1 = parseInt(selectedTable);
    }

    // Determine the range of the second number based on difficulty
    let maxNum2;
    if (difficulty === 'easy') {
      maxNum2 = 5;
    } else if (difficulty === 'medium') {
      maxNum2 = 10;
    } else {
      maxNum2 = 15;
    }

    num2 = Math.floor(Math.random() * maxNum2) + 1;

    setCurrentProblem({ num1, num2 });
    setUserAnswer('');
    setFeedback('');
  };

  // Check the user's answer
  const checkAnswer = () => {
    const correctAnswer = currentProblem.num1 * currentProblem.num2;
    const userNum = parseInt(userAnswer);

    if (userNum === correctAnswer) {
      setFeedback('Goed zo! Geweldig gedaan! 🦄');
      setScore(score + 1);
      setShowConfetti(true);
      setProblemCount(problemCount + 1);

      setTimeout(() => {
        setShowConfetti(false);
        if (problemCount < maxProblems - 1) {
          generateProblem();
        } else {
          setFeedback(`Je hebt ${score + 1} van de ${maxProblems} sommen goed! 🎉`);
        }
      }, 2000);
    } else {
      setFeedback(`Probeer het nog eens! Het juiste antwoord is ${correctAnswer}`);
    }
  };

  // Handle key press for Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer) {
      checkAnswer();
    }
  };

  // Reset the practice session
  const resetPractice = () => {
    setProblemCount(0);
    setScore(0);
    generateProblem();
  };

  // Initialize confetti effect
  useEffect(() => {
    const confettiSettings = { target: 'confetti-canvas-tables', max: 150, size: 1.5, animate: true, props: ['circle', 'square', 'triangle', 'line'], colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]], clock: 25 };
    let confetti = null;

    if (showConfetti) {
      confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
    }

    return () => {
      if (confetti) {
        confetti.clear();
      }
    };
  }, [showConfetti]);

  // Generate initial problem
  useEffect(() => {
    resetPractice();
  }, [selectedTable, difficulty]);

  return (
    <div className="math-tables">
      {showConfetti && <canvas id="confetti-canvas-tables" className="confetti-canvas"></canvas>}

      <div className="problem-container">
        <h2 className="tables-title">
          {selectedTable === 'random'
            ? 'Gemengde Tafels Oefenen'
            : `Tafel van ${selectedTable} Oefenen`}
        </h2>

        {problemCount < maxProblems ? (
          <>
            <div className="problem">
              <span className="number">{currentProblem.num1}</span>
              <span className="operation">×</span>
              <span className="number">{currentProblem.num2}</span>
              <span className="equals">=</span>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyPress}
                className="answer-input"
                placeholder="?"
                autoFocus
              />
            </div>

            <button onClick={checkAnswer} className="check-button">
              Controleer Antwoord
            </button>

            <div className="feedback">
              {feedback && <p>{feedback}</p>}
            </div>

            <div className="progress">
              Som {problemCount + 1} van {maxProblems}
            </div>

            <div className="score">
              Score: {score}
            </div>
          </>
        ) : (
          <div className="practice-complete">
            <p className="feedback">{feedback}</p>
            <button onClick={resetPractice} className="reset-button">
              Opnieuw Oefenen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MathTables;
