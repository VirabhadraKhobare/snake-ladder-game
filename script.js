// Game State
let gameState = {
    currentPlayer: 1,
    player1Position: 1,
    player2Position: 1,
    player1Moves: 0,
    player2Moves: 0,
    snakesHit: 0,
    laddersUsed: 0,
    gameWon: false,
    isRolling: false
};

// Initialize sound system
let soundEffects = null;

// Board Configuration (10x10 = 100 cells)
const BOARD_SIZE = 100;
const snakes = {
    99: 78, 95: 75, 92: 88, 89: 68, 74: 53, 64: 60, 62: 19, 46: 25, 37: 20, 16: 6
};
const ladders = {
    2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98
};

// Initialize the game
function initGame() {
    // Initialize sound system
    soundEffects = new SoundEffects();
    
    createBoard();
    updatePlayerPositions();
    updateUI();
    setupEventListeners();
    
    // Play game start sound
    setTimeout(() => {
        soundEffects.gameStart();
    }, 500);
}

// Create the game board
function createBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    
    // Create cells from 100 to 1 (reverse order for proper display)
    for (let i = BOARD_SIZE; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.textContent = i;
        
        // Add special styling for different cell types
        if (i === 1) cell.classList.add('start');
        if (i === BOARD_SIZE) cell.classList.add('finish');
        
        // Mark snake heads and tails
        if (snakes[i]) {
            cell.classList.add('snake-head');
            cell.title = `Snake! Goes to ${snakes[i]}`;
        }
        if (Object.values(snakes).includes(i)) {
            cell.classList.add('snake-tail');
        }
        
        // Mark ladder bottoms and tops
        if (ladders[i]) {
            cell.classList.add('ladder-bottom');
            cell.title = `Ladder! Goes to ${ladders[i]}`;
        }
        if (Object.values(ladders).includes(i)) {
            cell.classList.add('ladder-top');
        }
        
        board.appendChild(cell);
    }
}

// Update player positions on the board
function updatePlayerPositions() {
    // Clear all existing player tokens
    document.querySelectorAll('.player-token').forEach(token => token.remove());
    
    // Add player 1 token
    if (gameState.player1Position <= BOARD_SIZE) {
        const cell1 = document.getElementById(`cell-${gameState.player1Position}`);
        const token1 = document.createElement('div');
        token1.className = 'player-token player1';
        token1.textContent = '1';
        cell1.appendChild(token1);
    }
    
    // Add player 2 token
    if (gameState.player2Position <= BOARD_SIZE) {
        const cell2 = document.getElementById(`cell-${gameState.player2Position}`);
        const token2 = document.createElement('div');
        token2.className = 'player-token player2';
        token2.textContent = '2';
        cell2.appendChild(token2);
    }
}

// Update UI elements
function updateUI() {
    document.getElementById('player1-position').textContent = gameState.player1Position;
    document.getElementById('player2-position').textContent = gameState.player2Position;
    document.getElementById('p1-moves').textContent = gameState.player1Moves;
    document.getElementById('p2-moves').textContent = gameState.player2Moves;
    document.getElementById('snakes-hit').textContent = gameState.snakesHit;
    document.getElementById('ladders-used').textContent = gameState.laddersUsed;
    
    // Update current player indicator
    const player1 = document.querySelector('.player1');
    const player2 = document.querySelector('.player2');
    const currentPlayerText = document.getElementById('current-player-text');
    
    if (gameState.currentPlayer === 1) {
        player1.classList.add('active');
        player2.classList.remove('active');
        currentPlayerText.textContent = "Player 1's Turn";
    } else {
        player1.classList.remove('active');
        player2.classList.add('active');
        currentPlayerText.textContent = "Player 2's Turn";
    }
    
    // Enable/disable roll button
    const rollBtn = document.getElementById('rollBtn');
    rollBtn.disabled = gameState.gameWon || gameState.isRolling;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('rollBtn').addEventListener('click', () => {
        soundEffects?.buttonClick();
        rollDice();
    });
    
    document.getElementById('resetBtn').addEventListener('click', () => {
        soundEffects?.buttonClick();
        resetGame();
    });
    
    document.getElementById('autoSolveBtn').addEventListener('click', () => {
        soundEffects?.buttonClick();
        autoSolve();
    });
    
    document.getElementById('soundToggleBtn').addEventListener('click', toggleSound);
    
    // Resume audio context on first user interaction
    document.addEventListener('click', () => {
        if (soundEffects) {
            soundEffects.resume();
        }
    }, { once: true });
}

// Roll dice animation and logic
function rollDice() {
    if (gameState.gameWon || gameState.isRolling) return;
    
    gameState.isRolling = true;
    const dice = document.getElementById('dice');
    const diceFace = document.getElementById('dice-face');
    const rollBtn = document.getElementById('rollBtn');
    
    // Play dice roll sound
    soundEffects?.diceRoll();
    
    // Disable button during roll
    rollBtn.disabled = true;
    
    // Add rolling animation
    dice.classList.add('rolling');
    
    // Simulate dice roll
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        const tempValue = Math.floor(Math.random() * 6) + 1;
        updateDiceFace(tempValue);
        rollCount++;
        
        if (rollCount >= 10) {
            clearInterval(rollInterval);
            dice.classList.remove('rolling');
            
            // Final dice value
            const diceValue = Math.floor(Math.random() * 6) + 1;
            updateDiceFace(diceValue);
            
            // Move player
            setTimeout(() => {
                movePlayer(diceValue);
                gameState.isRolling = false;
                updateUI();
            }, 500);
        }
    }, 100);
}

// Update dice face display
function updateDiceFace(value) {
    const diceFace = document.getElementById('dice-face');
    diceFace.className = `dice-face face-${value}`;
    diceFace.innerHTML = '';
    
    for (let i = 0; i < value; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        diceFace.appendChild(dot);
    }
}

// Move player based on dice roll
function movePlayer(diceValue) {
    const isPlayer1 = gameState.currentPlayer === 1;
    let currentPosition = isPlayer1 ? gameState.player1Position : gameState.player2Position;
    let newPosition = currentPosition + diceValue;
    
    // Don't exceed board size
    if (newPosition > BOARD_SIZE) {
        newPosition = BOARD_SIZE;
    }
    
    // Play player move sound
    soundEffects?.playerMove();
    
    // Update position
    if (isPlayer1) {
        gameState.player1Position = newPosition;
        gameState.player1Moves++;
    } else {
        gameState.player2Position = newPosition;
        gameState.player2Moves++;
    }
    
    // Check for snakes and ladders
    checkSnakesAndLadders(newPosition, isPlayer1);
    
    // Update positions on board
    updatePlayerPositions();
    
    // Check for win condition
    if (newPosition >= BOARD_SIZE) {
        gameWon(gameState.currentPlayer);
        return;
    }
    
    // Switch players
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
}

// Check for snakes and ladders
function checkSnakesAndLadders(position, isPlayer1) {
    let finalPosition = position;
    
    // Check for snake
    if (snakes[position]) {
        finalPosition = snakes[position];
        gameState.snakesHit++;
        soundEffects?.snakeBite();
        showMessage(`Oh no! ${isPlayer1 ? 'Player 1' : 'Player 2'} got bitten by a snake! 🐍`, 'error');
        
        // Add snake animation
        setTimeout(() => {
            const cell = document.getElementById(`cell-${position}`);
            cell.classList.add('snake-animation');
            setTimeout(() => cell.classList.remove('snake-animation'), 1000);
        }, 300);
    }
    
    // Check for ladder
    if (ladders[position]) {
        finalPosition = ladders[position];
        gameState.laddersUsed++;
        soundEffects?.ladderClimb();
        showMessage(`Great! ${isPlayer1 ? 'Player 1' : 'Player 2'} climbed a ladder! 🪜`, 'success');
        
        // Add ladder animation
        setTimeout(() => {
            const cell = document.getElementById(`cell-${position}`);
            cell.classList.add('ladder-animation');
            setTimeout(() => cell.classList.remove('ladder-animation'), 1000);
        }, 300);
    }
    
    // Update final position
    if (isPlayer1) {
        gameState.player1Position = finalPosition;
    } else {
        gameState.player2Position = finalPosition;
    }
}

// Show temporary message
function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(messageDiv), 300);
    }, 3000);
}

// Handle game victory
function gameWon(player) {
    gameState.gameWon = true;
    
    // Play victory sound
    soundEffects?.victory();
    
    // Show victory modal
    const modal = document.getElementById('victoryModal');
    const victoryText = document.getElementById('victory-text');
    victoryText.textContent = `Player ${player} Wins! 🎉`;
    
    // Add celebration animation to winner's token
    const winnerToken = document.querySelector(`.player${player}`);
    winnerToken.style.animation = 'bounce 0.5s infinite';
    
    modal.style.display = 'block';
    
    // Play victory sound (if you add audio)
    // const victorySound = new Audio('victory.mp3');
    // victorySound.play();
}

// Reset game
function resetGame() {
    // Play reset sound
    soundEffects?.gameReset();
    
    gameState = {
        currentPlayer: 1,
        player1Position: 1,
        player2Position: 1,
        player1Moves: 0,
        player2Moves: 0,
        snakesHit: 0,
        laddersUsed: 0,
        gameWon: false,
        isRolling: false
    };
    
    // Hide modal
    document.getElementById('victoryModal').style.display = 'none';
    
    // Reset dice
    updateDiceFace(1);
    
    // Update UI
    updatePlayerPositions();
    updateUI();
    
    showMessage('New game started! 🎮', 'success');
}

// Auto-solve using BFS (similar to Java implementation)
async function autoSolve() {
    // Play auto-solve start sound
    soundEffects?.autoSolveStart();
    
    const loadingModal = document.getElementById('loadingModal');
    loadingModal.style.display = 'block';
    
    // Simulate the BFS algorithm
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = findOptimalPath();
    
    loadingModal.style.display = 'none';
    
    if (result.path) {
        showOptimalPath(result);
    } else {
        soundEffects?.error();
        showMessage('No optimal path found!', 'error');
    }
}

// Find optimal path using BFS
function findOptimalPath() {
    const visited = new Array(BOARD_SIZE + 1).fill(false);
    const queue = [{cell: 1, dist: 0, path: [1]}];
    visited[1] = true;
    
    while (queue.length > 0) {
        const node = queue.shift();
        const cell = node.cell;
        
        if (cell === BOARD_SIZE) {
            return {
                distance: node.dist,
                path: node.path,
                moves: node.dist
            };
        }
        
        for (let dice = 1; dice <= 6; dice++) {
            let nextCell = cell + dice;
            if (nextCell > BOARD_SIZE) continue;
            
            // Apply snake or ladder
            if (snakes[nextCell]) {
                nextCell = snakes[nextCell];
            } else if (ladders[nextCell]) {
                nextCell = ladders[nextCell];
            }
            
            if (!visited[nextCell]) {
                visited[nextCell] = true;
                const newPath = [...node.path, nextCell];
                queue.push({cell: nextCell, dist: node.dist + 1, path: newPath});
            }
        }
    }
    
    return {path: null}; // No path found
}

// Show optimal path animation
function showOptimalPath(result) {
    showMessage(`Optimal path found! Minimum moves: ${result.moves}`, 'success');
    
    // Highlight path cells
    result.path.forEach((cell, index) => {
        setTimeout(() => {
            const cellElement = document.getElementById(`cell-${cell}`);
            cellElement.classList.add('highlighted');
            soundEffects?.pathHighlight();
            setTimeout(() => {
                cellElement.classList.remove('highlighted');
            }, 1000);
        }, index * 300);
    });
    
    // Log path to console
    console.log('Optimal Path:', result.path);
    console.log('Minimum Moves:', result.moves);
}

// Toggle sound on/off
function toggleSound() {
    if (!soundEffects) return;
    
    const enabled = soundEffects.toggle();
    const btn = document.getElementById('soundToggleBtn');
    const icon = btn.querySelector('i');
    
    if (enabled) {
        icon.className = 'fas fa-volume-up';
        btn.innerHTML = '<i class="fas fa-volume-up"></i> Sound On';
        btn.classList.remove('muted');
        showMessage('Sound effects enabled! 🔊', 'success');
    } else {
        icon.className = 'fas fa-volume-mute';
        btn.innerHTML = '<i class="fas fa-volume-mute"></i> Sound Off';
        btn.classList.add('muted');
        showMessage('Sound effects disabled 🔇', 'error');
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .message {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('victoryModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Keyboard controls
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !gameState.gameWon && !gameState.isRolling) {
        event.preventDefault();
        rollDice();
    }
    if (event.code === 'KeyR') {
        event.preventDefault();
        resetGame();
    }
    if (event.code === 'KeyA') {
        event.preventDefault();
        autoSolve();
    }
    if (event.code === 'KeyS') {
        event.preventDefault();
        toggleSound();
    }
});

// Add helpful tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard shortcuts info
    const shortcutsInfo = document.createElement('div');
    shortcutsInfo.innerHTML = `
        <div style="position: fixed; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 10px; font-size: 12px; z-index: 1000;">
            <strong>Keyboard Shortcuts:</strong><br>
            Space - Roll Dice<br>
            R - Reset Game<br>
            A - Auto Solve<br>
            S - Toggle Sound
        </div>
    `;
    document.body.appendChild(shortcutsInfo);
});

// Performance optimization for mobile
if (window.innerWidth <= 768) {
    // Reduce animation duration on mobile
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        .dice.rolling .dice-face {
            animation-duration: 0.5s;
        }
        .player-token.moving {
            animation-duration: 0.3s;
        }
    `;
    document.head.appendChild(mobileStyle);
}
