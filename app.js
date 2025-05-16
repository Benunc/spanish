class FlashcardApp {
    constructor() {
        this.currentCategory = 'all';
        this.currentIndex = 0;
        this.cards = [];
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isFlipped = false;

        // DOM elements
        this.spanishWord = document.getElementById('spanishWord');
        this.englishWord = document.getElementById('englishWord');
        this.cardCounter = document.getElementById('cardCounter');
        this.categorySelect = document.getElementById('categorySelect');
        this.flashcard = document.querySelector('.flashcard');
        this.checkAnswerBtn = document.getElementById('checkAnswer');
        this.prevBtn = document.getElementById('prevCard');
        this.nextBtn = document.getElementById('nextCard');

        // Initialize
        this.initializeEventListeners();
        this.loadCards();
        this.updateCard();
    }

    initializeEventListeners() {
        // Category selection
        this.categorySelect.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.currentIndex = 0;
            this.loadCards();
            this.updateCard();
        });

        // Card flip
        this.flashcard.addEventListener('click', () => this.flipCard());
        this.checkAnswerBtn.addEventListener('click', () => this.flipCard());

        // Navigation
        this.prevBtn.addEventListener('click', () => this.previousCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());

        // Touch events for swipe
        this.flashcard.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        this.flashcard.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousCard();
            if (e.key === 'ArrowRight') this.nextCard();
            if (e.key === ' ') this.flipCard();
        });
    }

    loadCards() {
        if (this.currentCategory === 'all') {
            this.cards = Object.values(vocabulary).flat();
        } else {
            this.cards = vocabulary[this.currentCategory] || [];
        }
        this.updateCardCounter();
    }

    updateCard() {
        if (this.cards.length === 0) {
            this.spanishWord.textContent = 'No cards available';
            this.englishWord.textContent = '';
            return;
        }

        const card = this.cards[this.currentIndex];
        this.spanishWord.textContent = card.spanish;
        this.englishWord.textContent = card.english;
        this.flashcard.classList.remove('flipped');
        this.isFlipped = false;
        this.updateCardCounter();
    }

    updateCardCounter() {
        this.cardCounter.textContent = `${this.currentIndex + 1}/${this.cards.length}`;
    }

    flipCard() {
        this.flashcard.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;
    }

    previousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCard();
        }
    }

    nextCard() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.updateCard();
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (Math.abs(swipeDistance) < swipeThreshold) return;

        if (swipeDistance > 0) {
            // Swipe right - previous card
            this.previousCard();
        } else {
            // Swipe left - next card
            this.nextCard();
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp();
}); 