# 🐍🪜 Snake & Ladder Game

An interactive Snake and Ladder game with both Java backend implementation and a beautiful web frontend for an engaging user experience.

## 🎮 Features

### Web Frontend
- **Interactive Gameplay**: Roll dice and move players on a beautifully designed 10x10 board
- **Multiplayer Support**: Two-player game with turn-based mechanics
- **Animated Dice**: Realistic 3D dice rolling animation
- **Visual Effects**: Smooth animations for snake bites and ladder climbs
- **Auto-Solve Feature**: Uses BFS algorithm to find the optimal path
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Game Statistics**: Track moves, snakes hit, and ladders used
- **Keyboard Controls**: Space to roll, R to reset, A to auto-solve

### Java Backend
- **Board Class**: Manages the game board with snakes and ladders
- **BFS Solver**: Finds the minimum number of moves to win using Breadth-First Search
- **Game Logic**: Complete game implementation with path tracking

## 🚀 Getting Started

### Playing the Web Version
1. Open `index.html` in any modern web browser
2. Click "Roll Dice" or press Space to start playing
3. Players take turns rolling the dice
4. First player to reach cell 100 wins!

### Running the Java Version
```bash
# Navigate to the src directory
cd src

# Compile the Java files
javac *.java

# Run the game
java SnakeLadderGame
```

## 🎯 Game Rules

1. **Objective**: Be the first player to reach cell 100
2. **Movement**: Roll a dice (1-6) to move forward
3. **Snakes**: Landing on a snake head takes you down to its tail
4. **Ladders**: Landing on a ladder bottom takes you up to its top
5. **Exact Landing**: Must land exactly on cell 100 to win

## 🏗️ Board Layout

### Snakes (Head → Tail)
- 99 → 78
- 95 → 75
- 92 → 88
- 89 → 68
- 74 → 53
- 64 → 60
- 62 → 19
- 46 → 25
- 37 → 20
- 16 → 6

### Ladders (Bottom → Top)
- 2 → 38
- 7 → 14
- 8 → 31
- 15 → 26
- 21 → 42
- 28 → 84
- 36 → 44
- 51 → 67
- 71 → 91
- 78 → 98

## 🛠️ Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript**: Game logic, BFS algorithm implementation, and DOM manipulation
- **CSS Grid**: Responsive board layout
- **CSS Animations**: Smooth transitions and visual feedback

### Backend Technologies
- **Java**: Object-oriented game implementation
- **BFS Algorithm**: Optimal path finding using queue-based traversal
- **Data Structures**: HashMap for snakes/ladders, ArrayList for path tracking

## 🎨 Design Features

- **Modern UI**: Clean, colorful interface with gradient backgrounds
- **Accessibility**: High contrast colors and keyboard navigation
- **Mobile-First**: Responsive design that works on all screen sizes
- **Visual Feedback**: Animations for dice rolls, player movements, and special events
- **Statistics**: Real-time game statistics and move tracking

## 🔧 File Structure

```
snake-ladder-game/
├── index.html          # Main game interface
├── style.css           # Styling and animations
├── script.js           # Game logic and interactions
├── README.md           # Project documentation
└── src/
    ├── Board.java      # Board management class
    ├── BFSSolver.java  # Optimal path solver
    └── SnakeLadderGame.java # Main game class
```

## 🎮 How to Play

1. **Start**: Open the web version in your browser
2. **Roll**: Click "Roll Dice" or press Spacebar
3. **Move**: Watch your token move automatically
4. **Special Cells**: 
   - 🐍 Snake heads will slide you down
   - 🪜 Ladder bottoms will climb you up
5. **Win**: First to reach cell 100 wins!

## 🤖 Auto-Solve Feature

The game includes an intelligent auto-solve feature that:
- Uses BFS algorithm to find the optimal path
- Calculates minimum number of moves required
- Highlights the optimal path on the board
- Shows step-by-step solution

## 📱 Mobile Support

The game is fully optimized for mobile devices with:
- Touch-friendly interface
- Responsive grid layout
- Optimized animations for performance
- Mobile-specific styling adjustments

## 🎯 Future Enhancements

- [ ] Sound effects and background music
- [ ] Player avatars and themes
- [ ] Online multiplayer support
- [ ] Different board sizes and configurations
- [ ] Tournament mode
- [ ] Achievement system
- [ ] Difficulty levels with different snake/ladder configurations

## 🤝 Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy playing Snake & Ladder! 🎉**