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
  const obstacleRef = useRef({
    positionX: 800,
    positionY: 0,
    width: 50,
    height: 50,
    speed: 5,
  });
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
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
            gameLoop();
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
    
        context.fillStyle = 'red';
        context.fillRect(obstacle.positionX, canvas.height - obstacle.positionY - obstacle.height, obstacle.width, obstacle.height);
    
        if (gameOver) {
            context.fillStyle = 'black';
            context.font = '30px Arial';
            context.textAlign = 'center';
            context.fillText('Perdu', canvas.width / 2, canvas.height / 2);
        } else {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
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
      }
      if(isSliding()){
        player.positionY = obstacle.height + 1
        player.velocityY = 0
      }
    };

    const isSliding = () => {
        const playerBottom = canvas.height - player.positionY;
        const playerLeft = canvas.width / 4 - player.size / 2;
        const playerRight = canvas.width / 4 + player.size / 2;
      
        const obstacleTop = canvas.height - obstacle.positionY - obstacle.height;
        const obstacleLeft = obstacle.positionX;
        const obstacleRight = obstacle.positionX + obstacle.width;
      
        const slidingRange = 2; 
  
        return (
          playerBottom >= obstacleTop - slidingRange &&
            playerRight > obstacleLeft &&
            playerLeft < obstacleRight
        );
      };

    const updateObstaclePosition = () => {
        if (!gameOver) {
          obstacle.positionX -= obstacle.speed;
      
          if (obstacle.positionX + obstacle.width < 0) {
            obstacle.positionX = canvas.width;
          }
        }
      };

    const checkCollision = () => {
    const playerTop = canvas.height - player.positionY - player.size;
    const playerBottom = canvas.height - player.positionY;
    const playerLeft = canvas.width / 4 - player.size / 2;
    const playerRight = canvas.width / 4 + player.size / 2;
    
    const obstacleTop = canvas.height - obstacle.positionY - obstacle.height;
    const obstacleBottom = canvas.height - obstacle.positionY;
    const obstacleLeft = obstacle.positionX;
    const obstacleRight = obstacle.positionX + obstacle.width;
    
    const isColliding =
        playerBottom >= obstacleTop &&
        playerTop <= obstacleBottom &&
        playerRight >= obstacleLeft &&
        playerLeft <= obstacleRight;
    
    if (isColliding) {
        obstacle.speed = 0;
        cancelAnimationFrame(animationFrameId);
        setGameOver(true);
    }
    };

    const resetGame = () => {
        setGameOver(false);
        player.positionY= 0;
        player.isJumping=false;
        obstacle.positionX = canvas.width 
        obstacle.speed = 5;
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