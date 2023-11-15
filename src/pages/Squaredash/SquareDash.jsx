import './SquareDash.css';
import React, { useEffect, useRef, useState } from 'react';

const Game = () => {
  const canvasRef = useRef(null);
  const playerRef = useRef({
    positionX: 0,
    positionY: 0,
    velocityY: 0,
    isJumping: false,
    jumpHeight: 90,
    jumpSpeed: 0.1,
    gravity: 0.5,
    size: 50,
  });
  const obstacleRef = useRef([]);

  const [gameOver, setGameOver] = useState(false);

  const currentBlockIndexRef = useRef(0);
  
  useEffect(() => {
    const map = [
        { type: 'block', height: 50 },
        { type: 'empty', height: 50 },
        { type: 'longblock', height: 100 },
        { type: 'block', height: 50 },
      ];

    const currentBlockIndex = currentBlockIndexRef.current;
    let animationFrameId
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const player = playerRef.current;
    const obstacle = obstacleRef.current;

    const handleJump = (event) => {
        if (event.key === "ArrowUp" && (!player.isJumping || isSliding())) {
            player.isJumping = true;
            player.velocityY = player.jumpHeight * player.jumpSpeed
        }
    };

    const handleResetGame = (event) => {
        if (gameOver) {
            resetGame();
        }
    };
    document.addEventListener('keydown', handleJump);
    document.addEventListener('keydown', handleResetGame);

    const gameLoop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        if (!gameOver) {
            updatePlayerPosition();
            updateObstaclePosition();
        }
    
        checkCollision();
    
        context.fillStyle = 'blue';
        const playerX = canvas.width / 4 - player.size / 2;
        const playerY = canvas.height - player.positionY - player.size;
        context.fillRect(playerX, playerY, player.size, player.size);
    
        if (gameOver) {
            context.fillStyle = 'black';
            context.font = '30px Arial';
            context.textAlign = 'center';
            context.fillText('Perdu', canvas.width / 2, canvas.height / 2);
        } else {
            animationFrameId = requestAnimationFrame(gameLoop);
        }

        obstacleRef.current.forEach(obstacle => {
            if (obstacle.width > 0 && obstacle.height > 0) {
              context.fillStyle = 'red';
              context.fillRect(
                obstacle.positionX,
                canvas.height - obstacle.positionY - obstacle.height,
                obstacle.width,
                obstacle.height
              );
            }
          });
    };
    const updatePlayerPosition = () => {
      if (player.isJumping) {
        player.positionY += player.velocityY;
    
        if (player.positionY <= 0) {
          player.positionY = 0;
          player.velocityY = 0;
          player.isJumping = false;
        }
        player.velocityY -= player.gravity;
      } else {
        const blockObstacles = obstacleRef.current.filter(
          (obstacle) => obstacle.width > 0 && obstacle.height > 0
        );
    
        // Check if the player is sliding on any block obstacle
        const isSliding = blockObstacles.some((obstacle) => {
          const obstacleTop = canvas.height - obstacle.positionY - obstacle.height;
          const obstacleLeft = obstacle.positionX;
          const obstacleRight = obstacle.positionX + obstacle.width;
    
          const playerBottom = canvas.height - player.positionY;
          const playerLeft = player.positionX;
          const playerRight = player.positionX + player.size;
    
          const slidingRange = 2;
    
          return (
            playerBottom >= obstacleTop - slidingRange &&
            playerRight > obstacleLeft &&
            playerLeft < obstacleRight
          );
        });
    
        if (!isSliding || player.positionY > 0) {
          // Player is not sliding or is above the block, apply gravity
          player.positionY += player.velocityY;
       
          // Check if the player hits the ground
          if (player.positionY <= 0) {
            player.positionY = 0;
            player.velocityY = 0;
          } else {
            player.velocityY -= player.gravity;
          }
        }
      }
    };
    const isSliding = () => {
      const playerBottom = canvas.height - player.positionY;
      const playerLeft = canvas.width / 4 - player.size / 2;
      const playerRight = canvas.width / 4 + player.size / 2;
    
      const blockObstacle = obstacleRef.current.find(obstacle => obstacle.type === 'block');
      
      if (blockObstacle) {
        const obstacleTop = canvas.height - blockObstacle.positionY - blockObstacle.height;
        const obstacleLeft = blockObstacle.positionX;
        const obstacleRight = blockObstacle.positionX + blockObstacle.width;
    
        const slidingRange = 2;
    
        return (
          playerBottom >= obstacleTop - slidingRange &&
          playerRight > obstacleLeft &&
          playerLeft < obstacleRight &&
          player.positionY > obstacleTop
        );
      }
    
      return false;
    };
      
      const updateObstaclePosition = () => {
        if (!gameOver) {
          obstacleRef.current.forEach(obstacle => {
            obstacle.positionX -= obstacle.speed;
          });
      
          let lastObstacle = obstacleRef.current[obstacleRef.current.length - 1];
      
          // Create a new block when there is no obstacle or the last obstacle crosses 50 pixels
          if (!lastObstacle || canvas.width - lastObstacle.positionX >= 50) {
            const currentBlockIndex = currentBlockIndexRef.current;
            // Get the next block from the map array
            const currentBlock = map[currentBlockIndex];
            // Create a new obstacle object and add to the array
            obstacleRef.current.push({
                positionX: canvas.width,
                positionY: 0,
                width: currentBlock.type === 'empty' ? 0 : 50,
                height: currentBlock.type === 'empty' ? 0 : 50,
                speed: 5,
              });
      
            // Move to the next block in the map array
            currentBlockIndexRef.current = (currentBlockIndex + 1) % map.length;
          }
        }
      };

      const checkCollision = () => {
        let isColliding = false;
      
        obstacleRef.current.forEach(obstacle => {
          // Exclude empty obstacles
          if (obstacle.width > 0 && obstacle.height > 0) {
            const playerTop = canvas.height - player.positionY - player.size;
            const obstacleTop = canvas.height - obstacle.positionY - obstacle.height;
            const playerBottom = canvas.height - player.positionY;
            const obstacleBottom = canvas.height - obstacle.positionY;
            const playerLeft = canvas.width / 4 - player.size / 2;
            const playerRight = canvas.width / 4 + player.size / 2;
            const obstacleLeft = obstacle.positionX;
            const obstacleRight = obstacle.positionX + obstacle.width;

            if (
              playerBottom >= obstacleTop &&
              playerTop <= obstacleBottom &&
              playerRight >= obstacleLeft &&
              playerLeft <= obstacleRight
            ) {
              isColliding = true;
            }
      }});

  if (isColliding) {
    obstacleRef.current.forEach(obstacle => {
      obstacle.speed = 0;
    });
    cancelAnimationFrame(animationFrameId);
    setGameOver(true);
  } else if (gameOver) {
    gameLoop();
  }
};

      
const resetGame = () => {
  setGameOver(false);
  player.isJumping = false;
  player.velocityY = 0;
  player.positionY = 0;
  
  // Check the type of the first block and set the width accordingly
  const firstBlockWidth = map[0].type === 'empty' ? 0 : 50;

  // Reset the obstacles array and re-initialize it with the new obstacle configuration
  obstacleRef.current = [];
  
  // Reset the current block index to point to the second block in the map
  currentBlockIndexRef.current = 0;
};


    gameLoop();

    return () => {
        document.removeEventListener('keydown', handleJump);
        document.removeEventListener('keydown', handleResetGame);
        cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver]);

  return <canvas ref={canvasRef} width={800} height={400} tabIndex="0" />;
};

export default Game;