// Sound Effects System for Snake & Ladder Game
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.volume = 0.3;
        this.enabled = true;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // Create oscillator-based sound effects
    createSound(frequency, duration, type = 'sine', volume = this.volume) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Multi-tone sound effects
    createComplexSound(notes, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        notes.forEach((note, index) => {
            setTimeout(() => {
                this.createSound(note.frequency, note.duration || duration, type, note.volume || this.volume);
            }, note.delay || index * 100);
        });
    }

    // Dice roll sound - rattling effect
    diceRoll() {
        if (!this.enabled) return;

        // Create rattling sound
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const frequency = 200 + Math.random() * 100;
                this.createSound(frequency, 0.1, 'square', 0.2);
            }, i * 80);
        }

        // Final landing sound
        setTimeout(() => {
            this.createSound(300, 0.3, 'sine', 0.3);
        }, 800);
    }

    // Player move sound - step effect
    playerMove() {
        this.createSound(440, 0.2, 'sine', 0.25);
    }

    // Snake bite sound - descending tone
    snakeBite() {
        const notes = [
            { frequency: 800, duration: 0.1, delay: 0 },
            { frequency: 600, duration: 0.1, delay: 100 },
            { frequency: 400, duration: 0.1, delay: 200 },
            { frequency: 200, duration: 0.3, delay: 300 }
        ];
        this.createComplexSound(notes, 0.1, 'sawtooth');
    }

    // Ladder climb sound - ascending tone
    ladderClimb() {
        const notes = [
            { frequency: 200, duration: 0.1, delay: 0 },
            { frequency: 300, duration: 0.1, delay: 100 },
            { frequency: 400, duration: 0.1, delay: 200 },
            { frequency: 500, duration: 0.2, delay: 300 }
        ];
        this.createComplexSound(notes, 0.1, 'triangle');
    }

    // Victory fanfare
    victory() {
        const victoryMelody = [
            { frequency: 523, duration: 0.3, delay: 0 },     // C
            { frequency: 659, duration: 0.3, delay: 300 },   // E
            { frequency: 784, duration: 0.3, delay: 600 },   // G
            { frequency: 1047, duration: 0.6, delay: 900 }   // C (higher)
        ];
        this.createComplexSound(victoryMelody, 0.3, 'triangle');

        // Add celebration sparkle sounds
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                this.createSound(800 + Math.random() * 400, 0.2, 'sine', 0.2);
            }, 1500 + i * 150);
        }
    }

    // Button click sound
    buttonClick() {
        this.createSound(800, 0.1, 'square', 0.2);
    }

    // Game start sound
    gameStart() {
        const startMelody = [
            { frequency: 392, duration: 0.2, delay: 0 },   // G
            { frequency: 523, duration: 0.2, delay: 200 }, // C
            { frequency: 659, duration: 0.4, delay: 400 }  // E
        ];
        this.createComplexSound(startMelody, 0.2, 'triangle');
    }

    // Reset game sound
    gameReset() {
        const resetMelody = [
            { frequency: 659, duration: 0.15, delay: 0 },   // E
            { frequency: 523, duration: 0.15, delay: 150 }, // C
            { frequency: 392, duration: 0.3, delay: 300 }   // G
        ];
        this.createComplexSound(resetMelody, 0.15, 'sine');
    }

    // Auto-solve start sound
    autoSolveStart() {
        // Robotic beeping sound
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createSound(1000, 0.1, 'square', 0.25);
            }, i * 200);
        }
    }

    // Path highlight sound
    pathHighlight() {
        this.createSound(600, 0.1, 'sine', 0.15);
    }

    // Error sound
    error() {
        this.createSound(150, 0.5, 'sawtooth', 0.3);
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            this.buttonClick();
        }
        return this.enabled;
    }

    // Set volume (0.0 to 1.0)
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    // Resume audio context (required for some browsers)
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Export for use in main script
window.SoundEffects = SoundEffects;
