import { useState, useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';

function MathProblem({ difficulty, problemType }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Generate a new problem
  const generateProblem = () => {
    let firstNum, secondNum, op;

    // Set operation based on problemType
    if (problemType === 'mixed') {
      const operations = ['+', '-', '×', '÷'];
      op = operations[Math.floor(Math.random() * operations.length)];
    } else {
      op = problemType;
    }

    // Generate numbers based on difficulty and operation
    switch (op) {
      case '+':
        if (difficulty === 'easy') {
          firstNum = Math.floor(Math.random() * 10) + 1;
          secondNum = Math.floor(Math.random() * 10) + 1;
        } else {
          firstNum = Math.floor(Math.random() * 20) + 1;
          secondNum = Math.floor(Math.random() * 20) + 1;
        }
        break;
      case '-':
        if (difficulty === 'easy') {
          secondNum = Math.floor(Math.random() * 5) + 1;
          firstNum = secondNum + Math.floor(Math.random() * 5) + 1;
        } else {
          secondNum = Math.floor(Math.random() * 10) + 1;
          firstNum = secondNum + Math.floor(Math.random() * 10) + 1;
        }
        break;
      case '×':
        if (difficulty === 'easy') {
          firstNum = Math.floor(Math.random() * 5) + 1;
          secondNum = Math.floor(Math.random() * 5) + 1;
        } else {
          firstNum = Math.floor(Math.random() * 5) + 1;
          secondNum = Math.floor(Math.random() * 5) + 1;
        }
        break;
      case '÷':
        if (difficulty === 'easy') {
          secondNum = Math.floor(Math.random() * 5) + 1;
          firstNum = secondNum * (Math.floor(Math.random() * 5) + 1);
        } else {
          secondNum = Math.floor(Math.random() * 5) + 1;
          firstNum = secondNum * (Math.floor(Math.random() * 5) + 1);
        }
        break;
      default:
        firstNum = Math.floor(Math.random() * 10) + 1;
        secondNum = Math.floor(Math.random() * 10) + 1;
        op = '+';
    }

    setNum1(firstNum);
    setNum2(secondNum);
    setOperation(op);
    setUserAnswer('');
    setFeedback('');
  };

  // Check the user's answer
  const checkAnswer = () => {
    let correctAnswer;

    switch (operation) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '×':
        correctAnswer = num1 * num2;
        break;
      case '÷':
        correctAnswer = num1 / num2;
        break;
      default:
        correctAnswer = num1 + num2;
    }

    const userNum = parseFloat(userAnswer);

    if (userNum === correctAnswer) {
      setFeedback('Goed zo! Geweldig gedaan! 🦄');
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        generateProblem();
      }, 2000);
    } else {
      setFeedback(`Probeer het nog eens! Het juiste antwoord is ${correctAnswer}`);
    }
  };

  // Initialize confetti effect
  useEffect(() => {
    const confettiSettings = { target: 'confetti-canvas', max: 150, size: 1.5, animate: true, props: ['circle', 'square', 'triangle', 'line'], colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]], clock: 25 };
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
    generateProblem();
  }, [difficulty, problemType]);

  return (
    <div className="math-problem">
      {showConfetti && <canvas id="confetti-canvas" className="confetti-canvas"></canvas>}

      <div className="problem-container">
        <div className="problem">
          <span className="number">{num1}</span>
          <span className="operation">{operation}</span>
          <span className="number">{num2}</span>
          <span className="equals">=</span>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="answer-input"
            placeholder="?"
          />
        </div>

        <button onClick={checkAnswer} className="check-button">
          Controleer Antwoord
        </button>

        <div className="feedback">
          {feedback && <p>{feedback}</p>}
        </div>

        <div className="score">
          Score: {score}
        </div>
      </div>
    </div>
  );
}

export default MathProblem;
