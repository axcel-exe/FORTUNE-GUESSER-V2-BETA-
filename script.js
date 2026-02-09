// ==================== STATE MANAGEMENT ====================
const STATE = {
    user: {
        name: '',
        age: null
    },
    currentCategory: null,
    dailyUsage: 0,
    categoryUsage: {
        love: 0,
        money: 0,
        life: 0,
        chaos: 0
    },
    lastReadingTime: null,
    history: [],
    luckMeter: 50,
    adminUnlocked: false,
    limitsDisabled: false
};

// Constants
const CONSTANTS = {
    MAX_DAILY_READINGS: 10,
    MAX_CATEGORY_READINGS: 3,
    COOLDOWN_SECONDS: 30,
    ADMIN_PASSWORD: 'oracle',
    STORAGE_KEY: 'mysticOracle'
};

// ==================== FORTUNE DATABASE ====================
const FORTUNES = {
    love: [
        { symbol: '💕', title: 'The Heart\'s Whisper', text: 'A connection you thought lost will resurface. The universe conspires to mend what was broken. Keep your heart open to unexpected reunions.' },
        { symbol: '🌹', title: 'Passion\'s Bloom', text: 'Your emotional walls are dissolving. Someone sees the real you beneath the armor. Vulnerability is not weakness—it is the key to deeper intimacy.' },
        { symbol: '💫', title: 'Cosmic Union', text: 'The stars align in your favor. A chance encounter will spark something profound. Trust your instincts when they tell you this is different.' },
        { symbol: '🦋', title: 'Transformation', text: 'You are becoming who you needed when you were younger. This self-love will attract a mirror soul. The wait has been preparation.' },
        { symbol: '🌙', title: 'Lunar Embrace', text: 'Emotions run deep tonight. A confession lingers on someone\'s lips. The next full moon brings clarity to matters of the heart.' },
        { symbol: '✨', title: 'Stardust Promise', text: 'You are more loved than you realize. The signs you\'ve been missing are everywhere. Pay attention to the small gestures—they carry the weight of devotion.' }
    ],
    money: [
        { symbol: '💰', title: 'Golden Opportunity', text: 'An unexpected windfall approaches. Your past investments—whether in skills, relationships, or ventures—are about to pay dividends. Stay alert.' },
        { symbol: '🎯', title: 'Strategic Victory', text: 'Your careful planning has not gone unnoticed by the universe. Within three weeks, a door you\'ve been pushing will finally swing open. Prepare to act swiftly.' },
        { symbol: '🔥', title: 'Phoenix Rising', text: 'From financial ashes, you will rise. A failed venture contains the seeds of your greatest success. Look closer at what you dismissed.' },
        { symbol: '🌟', title: 'Prosperity Wave', text: 'Abundance flows toward those who give freely. Your generosity will return tenfold. The universe rewards a generous heart with material blessings.' },
        { symbol: '💎', title: 'Hidden Treasure', text: 'Your true value has been underestimated—by yourself most of all. A revelation about your worth will transform your financial trajectory. Believe in your price.' },
        { symbol: '⚡', title: 'Lightning Strike', text: 'Sudden opportunity knocks at the most unexpected hour. The deal that seems too good to be true might just be destiny calling. Trust your gut, but verify the details.' }
    ],
    life: [
        { symbol: '🌈', title: 'Rainbow Path', text: 'After the storm comes impossible beauty. You are exactly where you need to be. The detour was the path all along.' },
        { symbol: '🔮', title: 'Destiny\'s Mirror', text: 'You are closer to your purpose than you think. The thing you do effortlessly—that\'s your calling. Stop searching and start recognizing.' },
        { symbol: '🎭', title: 'Masks Falling', text: 'The version of yourself you\'ve been performing is exhausting. Permission granted to be authentic. Your real tribe will love the real you.' },
        { symbol: '🌺', title: 'Eternal Spring', text: 'A creative renaissance awaits. Old passions you abandoned will call to you again. This time, you\'re ready. This time, you\'ll listen.' },
        { symbol: '🕊️', title: 'Liberation', text: 'The cage was never locked. You\'ve been free this whole time. Fear, not circumstance, has been your captor. Today, you realize the truth.' },
        { symbol: '⭐', title: 'Stellar Alignment', text: 'Everything you\'ve experienced has led to this moment. The seemingly random events of your life form a perfect constellation. Step back and see the pattern.' }
    ],
    chaos: [
        { symbol: '🌪️', title: 'Blessed Disruption', text: 'What feels like destruction is actually construction. The universe is demolishing the old to make room for the extraordinary. Embrace the chaos.' },
        { symbol: '🎲', title: 'Wild Card', text: 'The most unexpected person will change your trajectory. Someone you\'ve overlooked or dismissed holds a key. Pay attention to everyone today.' },
        { symbol: '🌀', title: 'Spiral Dance', text: 'You\'re not going in circles—you\'re ascending in a spiral. Each loop brings you higher. The lesson you\'re learning again is deeper this time.' },
        { symbol: '🎪', title: 'Cosmic Joke', text: 'The universe has a wicked sense of humor. That thing you were desperately avoiding? It\'s exactly what you need. Surrender to the absurdity.' },
        { symbol: '🔱', title: 'Trident\'s Choice', text: 'Three paths diverge before you. None are wrong. The universe gifts you true free will in this moment. Choose based on joy, not fear.' },
        { symbol: '⚗️', title: 'Alchemical Chaos', text: 'Chaos is the crucible of transformation. Your life is being scrambled so it can be reassembled into something magnificent. Trust the process.' }
    ]
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeEventListeners();
    updateUI();
    updateLuckMeter();
});

// ==================== LOCAL STORAGE ====================
function loadState() {
    const saved = localStorage.getItem(CONSTANTS.STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Reset daily usage if it's a new day
            if (isNewDay(parsed.lastResetDate)) {
                parsed.dailyUsage = 0;
                parsed.categoryUsage = { love: 0, money: 0, life: 0, chaos: 0 };
                parsed.lastResetDate = new Date().toDateString();
            }
            Object.assign(STATE, parsed);
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    } else {
        STATE.lastResetDate = new Date().toDateString();
    }
}

function saveState() {
    try {
        localStorage.setItem(CONSTANTS.STORAGE_KEY, JSON.stringify(STATE));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

function isNewDay(lastResetDate) {
    if (!lastResetDate) return true;
    return lastResetDate !== new Date().toDateString();
}

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Welcome screen
    document.getElementById('begin-journey-btn').addEventListener('click', handleBeginJourney);
    document.getElementById('user-name').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleBeginJourney();
    });

    // Category screen
    document.getElementById('back-to-welcome').addEventListener('click', () => showScreen('welcome-screen'));
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', handleCategorySelection);
    });

    // Card screen
    document.getElementById('back-to-category').addEventListener('click', () => showScreen('category-screen'));
    document.querySelectorAll('.tarot-card').forEach(card => {
        card.addEventListener('click', handleCardSelection);
    });

    // Fortune screen
    document.getElementById('read-again-btn').addEventListener('click', () => showScreen('category-screen'));
    document.getElementById('view-history-btn').addEventListener('click', () => showScreen('history-screen'));

    // History screen
    document.getElementById('back-from-history').addEventListener('click', () => showScreen('fortune-screen'));

    // Admin
    document.getElementById('admin-toggle').addEventListener('click', () => {
        document.getElementById('admin-panel').classList.add('active');
    });
    document.getElementById('close-admin').addEventListener('click', () => {
        document.getElementById('admin-panel').classList.remove('active');
    });
    document.getElementById('admin-unlock-btn').addEventListener('click', handleAdminUnlock);
    document.getElementById('admin-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAdminUnlock();
    });
    document.getElementById('disable-limits-toggle').addEventListener('change', handleLimitsToggle);
    document.getElementById('reset-usage-btn').addEventListener('click', resetUsage);
    document.getElementById('reset-history-btn').addEventListener('click', resetHistory);
    document.getElementById('reset-all-btn').addEventListener('click', resetAll);
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenId) {
    // Remove active class from all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Add active class to target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Screen-specific actions
    if (screenId === 'category-screen') {
        updateCategoryUI();
        checkCooldown();
    } else if (screenId === 'card-screen') {
        resetCards();
    } else if (screenId === 'history-screen') {
        displayHistory();
    } else if (screenId === 'welcome-screen') {
        updateUI();
    }
}

// ==================== WELCOME SCREEN HANDLERS ====================
function handleBeginJourney() {
    const nameInput = document.getElementById('user-name');
    const ageInput = document.getElementById('user-age');
    const name = nameInput.value.trim();

    if (!name) {
        nameInput.style.borderColor = 'var(--danger)';
        nameInput.focus();
        setTimeout(() => {
            nameInput.style.borderColor = '';
        }, 2000);
        return;
    }

    STATE.user.name = name;
    STATE.user.age = ageInput.value ? parseInt(ageInput.value) : null;
    saveState();

    // Update greeting
    const greeting = document.getElementById('greeting');
    const greetings = [
        `Welcome, ${name}. The cards have been expecting you.`,
        `${name}, the threads of fate await your touch.`,
        `Greetings, ${name}. The oracle speaks through chosen paths.`,
        `${name}, destiny whispers your name. Choose your path.`
    ];
    greeting.textContent = greetings[Math.floor(Math.random() * greetings.length)];

    showScreen('category-screen');
}

// ==================== CATEGORY SCREEN HANDLERS ====================
function handleCategorySelection(e) {
    const card = e.currentTarget;
    if (card.classList.contains('disabled')) return;

    const category = card.dataset.category;
    
    // Check limits
    if (!STATE.limitsDisabled) {
        if (STATE.dailyUsage >= CONSTANTS.MAX_DAILY_READINGS) {
            showNotification('You have reached your daily limit of readings.', 'warning');
            return;
        }
        if (STATE.categoryUsage[category] >= CONSTANTS.MAX_CATEGORY_READINGS) {
            showNotification(`You have already consulted ${category} three times today.`, 'warning');
            return;
        }
        if (isOnCooldown()) {
            showNotification('The cards need time to recharge. Please wait.', 'warning');
            return;
        }
    }

    STATE.currentCategory = category;
    showScreen('card-screen');
}

function updateCategoryUI() {
    const categories = ['love', 'money', 'life', 'chaos'];
    
    categories.forEach(cat => {
        const usageSpan = document.getElementById(`${cat}-uses`);
        const card = document.querySelector(`.category-card[data-category="${cat}"]`);
        
        if (usageSpan) {
            usageSpan.textContent = `${STATE.categoryUsage[cat]}/3`;
        }

        if (card && !STATE.limitsDisabled) {
            if (STATE.categoryUsage[cat] >= CONSTANTS.MAX_CATEGORY_READINGS || 
                STATE.dailyUsage >= CONSTANTS.MAX_DAILY_READINGS) {
                card.classList.add('disabled');
            } else {
                card.classList.remove('disabled');
            }
        } else if (card && STATE.limitsDisabled) {
            card.classList.remove('disabled');
        }
    });
}

function checkCooldown() {
    const cooldownNotice = document.getElementById('cooldown-notice');
    
    if (isOnCooldown() && !STATE.limitsDisabled) {
        const remaining = getRemainingCooldown();
        cooldownNotice.textContent = `⏳ The cards are recharging... ${remaining}s remaining`;
        cooldownNotice.classList.add('visible');
        
        // Update countdown
        const interval = setInterval(() => {
            const rem = getRemainingCooldown();
            if (rem <= 0) {
                clearInterval(interval);
                cooldownNotice.classList.remove('visible');
            } else {
                cooldownNotice.textContent = `⏳ The cards are recharging... ${rem}s remaining`;
            }
        }, 1000);
    } else {
        cooldownNotice.classList.remove('visible');
    }
}

function isOnCooldown() {
    if (!STATE.lastReadingTime) return false;
    const elapsed = (Date.now() - STATE.lastReadingTime) / 1000;
    return elapsed < CONSTANTS.COOLDOWN_SECONDS;
}

function getRemainingCooldown() {
    if (!STATE.lastReadingTime) return 0;
    const elapsed = (Date.now() - STATE.lastReadingTime) / 1000;
    return Math.max(0, Math.ceil(CONSTANTS.COOLDOWN_SECONDS - elapsed));
}

// ==================== CARD SCREEN HANDLERS ====================
function resetCards() {
    document.querySelectorAll('.tarot-card').forEach(card => {
        card.style.transform = '';
        card.style.pointerEvents = 'auto';
    });
}

function handleCardSelection(e) {
    const selectedCard = e.currentTarget;
    const cardNumber = selectedCard.dataset.card;

    // Disable all cards
    document.querySelectorAll('.tarot-card').forEach(card => {
        card.style.pointerEvents = 'none';
    });

    // Animate selection
    selectedCard.style.transform = 'scale(1.1) translateY(-20px)';

    // Wait for animation, then reveal fortune
    setTimeout(() => {
        revealFortune(cardNumber);
    }, 600);
}

// ==================== FORTUNE REVEAL ====================
function revealFortune(cardNumber) {
    const category = STATE.currentCategory;
    const fortunes = FORTUNES[category];
    
    // Use card number to influence selection (not purely random)
    const seed = parseInt(cardNumber) + STATE.categoryUsage[category];
    const selectedFortune = fortunes[seed % fortunes.length];

    // Update UI
    document.getElementById('card-symbol').textContent = selectedFortune.symbol;
    document.getElementById('fortune-title').textContent = selectedFortune.title;
    document.getElementById('fortune-text').textContent = selectedFortune.text;

    // Update state
    STATE.dailyUsage++;
    STATE.categoryUsage[category]++;
    STATE.lastReadingTime = Date.now();
    
    // Add to history
    STATE.history.unshift({
        category,
        fortune: selectedFortune,
        timestamp: Date.now(),
        date: new Date().toLocaleString()
    });

    // Keep only last 20 readings
    if (STATE.history.length > 20) {
        STATE.history = STATE.history.slice(0, 20);
    }

    // Update luck meter
    updateLuckMeter();
    
    saveState();
    updateUI();

    // Show fortune screen
    showScreen('fortune-screen');

    // Trigger confetti
    triggerConfetti();

    // Show cooldown timer if applicable
    if (!STATE.limitsDisabled) {
        showCooldownTimer();
    }
}

function showCooldownTimer() {
    const timer = document.getElementById('next-reading-timer');
    timer.classList.add('visible');
    
    const updateTimer = () => {
        const remaining = getRemainingCooldown();
        if (remaining > 0) {
            timer.textContent = `⏳ Next reading available in ${remaining}s`;
            setTimeout(updateTimer, 1000);
        } else {
            timer.classList.remove('visible');
        }
    };
    
    updateTimer();
}

// ==================== HISTORY ====================
function displayHistory() {
    const container = document.getElementById('history-container');
    
    if (STATE.history.length === 0) {
        container.innerHTML = '<div class="empty-history">No fortunes revealed yet. Your journey begins now.</div>';
        return;
    }

    container.innerHTML = STATE.history.map(entry => `
        <div class="history-item">
            <div class="history-header">
                <span class="history-category">${getCategoryIcon(entry.category)} ${entry.category}</span>
                <span class="history-date">${entry.date}</span>
            </div>
            <div class="history-fortune">
                <strong>${entry.fortune.title}</strong><br>
                ${entry.fortune.text}
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        love: '💖',
        money: '💰',
        life: '🌟',
        chaos: '🔮'
    };
    return icons[category] || '✨';
}

// ==================== UI UPDATES ====================
function updateUI() {
    // Update daily usage
    const dailyUsageSpan = document.getElementById('daily-usage');
    if (dailyUsageSpan) {
        dailyUsageSpan.textContent = `${STATE.dailyUsage}/${CONSTANTS.MAX_DAILY_READINGS}`;
        if (STATE.dailyUsage >= CONSTANTS.MAX_DAILY_READINGS) {
            dailyUsageSpan.style.color = 'var(--danger)';
        } else {
            dailyUsageSpan.style.color = 'var(--primary-purple)';
        }
    }

    // Update luck value
    const luckValue = document.getElementById('luck-value');
    if (luckValue) {
        luckValue.textContent = `${STATE.luckMeter}%`;
    }
}

function updateLuckMeter() {
    // Calculate luck based on usage pattern and history
    let luck = 50; // Base luck
    
    // More readings = more luck (up to a point)
    luck += Math.min(STATE.history.length * 5, 30);
    
    // Recent readings boost luck
    const recentReadings = STATE.history.filter(h => Date.now() - h.timestamp < 3600000).length;
    luck += recentReadings * 3;
    
    // Variety across categories increases luck
    const uniqueCategories = new Set(STATE.history.map(h => h.category)).size;
    luck += uniqueCategories * 5;
    
    // Cap at 100
    luck = Math.min(100, luck);
    
    STATE.luckMeter = Math.round(luck);
    
    // Update UI
    const luckFill = document.getElementById('luck-fill');
    const luckValue = document.getElementById('luck-value');
    
    if (luckFill) {
        luckFill.style.width = `${STATE.luckMeter}%`;
    }
    if (luckValue) {
        luckValue.textContent = `${STATE.luckMeter}%`;
        
        // Color coding
        if (STATE.luckMeter < 40) {
            luckValue.style.color = 'var(--danger)';
        } else if (STATE.luckMeter < 70) {
            luckValue.style.color = 'var(--warning)';
        } else {
            luckValue.style.color = 'var(--success)';
        }
    }
}

// ==================== CONFETTI ====================
function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#a855f7', '#ec4899', '#06b6d4', '#fbbf24', '#f43f5e'];
    const pieceCount = 60;

    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        piece.style.animationDuration = `${2 + Math.random() * 2}s`;
        
        container.appendChild(piece);

        // Remove after animation
        setTimeout(() => {
            piece.remove();
        }, 4000);
    }
}

// ==================== ADMIN PANEL ====================
function handleAdminUnlock() {
    const password = document.getElementById('admin-password').value;
    
    if (password === CONSTANTS.ADMIN_PASSWORD) {
        STATE.adminUnlocked = true;
        document.getElementById('admin-lock').classList.add('hidden');
        document.getElementById('admin-controls').classList.remove('hidden');
        
        // Set toggle state
        document.getElementById('disable-limits-toggle').checked = STATE.limitsDisabled;
    } else {
        const input = document.getElementById('admin-password');
        input.value = '';
        input.style.borderColor = 'var(--danger)';
        setTimeout(() => {
            input.style.borderColor = '';
        }, 1000);
    }
}

function handleLimitsToggle(e) {
    STATE.limitsDisabled = e.target.checked;
    saveState();
    updateCategoryUI();
    showNotification(
        STATE.limitsDisabled ? 'All limits disabled' : 'Limits re-enabled',
        'success'
    );
}

function resetUsage() {
    if (!confirm('Reset daily usage and category limits?')) return;
    
    STATE.dailyUsage = 0;
    STATE.categoryUsage = { love: 0, money: 0, life: 0, chaos: 0 };
    STATE.lastReadingTime = null;
    STATE.lastResetDate = new Date().toDateString();
    saveState();
    updateUI();
    updateCategoryUI();
    showNotification('Usage reset successfully', 'success');
}

function resetHistory() {
    if (!confirm('Clear all fortune history?')) return;
    
    STATE.history = [];
    saveState();
    updateLuckMeter();
    showNotification('History cleared', 'success');
}

function resetAll() {
    if (!confirm('Reset everything? This cannot be undone.')) return;
    
    localStorage.removeItem(CONSTANTS.STORAGE_KEY);
    location.reload();
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--glass-bg);
        border: 2px solid ${type === 'warning' ? 'var(--warning)' : type === 'success' ? 'var(--success)' : 'var(--primary-purple)'};
        border-radius: 12px;
        color: var(--text-primary);
        backdrop-filter: blur(10px);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== EASTER EGG ====================
// Secret luck boost for persistent users
if (STATE.history.length >= 10) {
    console.log('%c🔮 The Oracle smiles upon you...', 'color: #a855f7; font-size: 16px; font-weight: bold;');
}
