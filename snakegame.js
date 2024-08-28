  // Game variables
  let snake = [{x: 20, y: 12}];
  let food = {};
  let direction = null;
  let score = 0;
  let highScore = 14;
  const gridSizeX = 40;
  const gridSizeY = 25;
  let gameInterval;
  let gameStarted = false;
  
  // Sound elements
  const eatSound = new Audio('eat.mp3');
  const gameOverSound = new Audio('gameover.mp3');

  // DOM elements
  const gameBoard = document.getElementById('game-board');
  const scoreElement = document.getElementById('score');
  const highScoreElement = document.getElementById('highscore');

  // Initialize the game
  function initGame() {
      createFood();
      document.addEventListener('keydown', changeDirection);
      updateGameBoard();
  }

  // Create food at a random position
  function createFood() {
      food = {
          x: Math.floor(Math.random() * gridSizeX),
          y: Math.floor(Math.random() * gridSizeY)
      };
  }

  // Move the snake
  function moveSnake() {
      if (!gameStarted || !direction) return;

      const head = {...snake[0]};

      switch(direction) {
          case 'up': head.y--; break;
          case 'down': head.y++; break;
          case 'left': head.x--; break;
          case 'right': head.x++; break;
      }

      // Check for wall collisions
      if (head.x < 0 || head.x >= gridSizeX || head.y < 0 || head.y >= gridSizeY || snakeCollision(head)) {
          gameOver();
          return;
      }

      snake.unshift(head);

      // Check if snake ate the food
      if (head.x === food.x && head.y === food.y) {
          score++;
          scoreElement.textContent = score;
          eatSound.play();
          createFood();
      } else {
          snake.pop();
      }

      updateGameBoard();
  }

  // Check if the snake collided with itself
  function snakeCollision(head) {
      return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }

  // Game over function
  function gameOver() {
      clearInterval(gameInterval);
      gameOverSound.play();
      if (score > highScore) {
          highScore = score;
          highScoreElement.textContent = highScore;
      }
      gameOverSound.onended = function() {
          alert('Game Over! Your score: ' + score);
          resetGame();
      };
  }

  // Reset the game
  function resetGame() {
      snake = [{x: 20, y: 12}];
      direction = null;
      score = 0;
      scoreElement.textContent = score;
      gameStarted = false;
      createFood();
      updateGameBoard();
  }

  // Update the game board
  function updateGameBoard() {
      gameBoard.innerHTML = '';
      snake.forEach(segment => {
          const snakeElement = createGameElement('div', 'snake');
          setPosition(snakeElement, segment);
          gameBoard.appendChild(snakeElement);
      });

      const foodElement = createGameElement('div', 'food');
      setPosition(foodElement, food);
      gameBoard.appendChild(foodElement);
  }

  // Create a game element (snake segment or food)
  function createGameElement(tag, className) {
      const element = document.createElement(tag);
      element.className = className;
      return element;
  }

  // Set the position of an element on the game board
  function setPosition(element, position) {
      element.style.gridColumn = position.x + 1;
      element.style.gridRow = position.y + 1;
  }

  // Change the direction of the snake
  function changeDirection(event) {
      const keyMap = {
          'ArrowUp': 'up',
          'ArrowDown': 'down',
          'ArrowLeft': 'left',
          'ArrowRight': 'right'
      };
      const newDirection = keyMap[event.key];
      if (newDirection && isValidDirection(newDirection)) {
          direction = newDirection;
          if (!gameStarted) {
              gameStarted = true;
              gameInterval = setInterval(moveSnake, 100);
          }
      }
  }

  // Check if the new direction is valid (prevent 180-degree turns)
  function isValidDirection(newDirection) {
      const opposites = {
          'up': 'down',
          'down': 'up',
          'left': 'right',
          'right': 'left'
      };
      return newDirection !== opposites[direction];
  }

  // Start the game
  initGame();