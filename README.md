# 🔮 Mystic Oracle - Interactive Fortune Teller

A mystical, interactive fortune-telling web experience built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies, just pure magic.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ✨ Features

### Core Experience
- **Personalized Journey** - Enter your name and age for a tailored experience
- **4 Mystical Paths** - Choose between Love, Money, Life, or Chaos readings
- **3-Card Selection** - Pick your card wisely - each choice influences your fortune
- **Beautiful Animations** - Smooth transitions, glowing effects, and confetti celebrations
- **Fortune History** - Track your past readings with timestamps

### Smart Limitations
- **Daily Limit** - 10 readings per day maximum
- **Category Limits** - 3 readings per category per day
- **Soft Cooldown** - 30-second wait between readings
- **Auto Reset** - Limits automatically reset at midnight

### Admin Control Panel
- **Password Protected** - Secure access to administrative functions
- **Disable Limits** - Toggle all restrictions for testing
- **Reset Controls** - Clear usage, history, or everything
- **Visual Feedback** - Notifications for all admin actions

### Dynamic Features
- **Luck Meter** - Increases based on reading variety and engagement
- **Responsive Design** - Beautiful on desktop, tablet, and mobile
- **Local Storage** - All data persists between sessions
- **Animated Stars** - Twinkling background that sets the mood

---

## 🚀 Quick Start

### Installation

1. **Download** the three files:
   - `index.html`
   - `style.css`
   - `script.js`

2. **Place** all three files in the same directory

3. **Open** `index.html` in any modern web browser

That's it! No build process, no npm install, no servers needed.

### First Use

1. Enter your name (required)
2. Optionally enter your age
3. Click "Begin Your Journey"
4. Choose a category (Love, Money, Life, or Chaos)
5. Select one of three glowing cards
6. Receive your fortune with magical effects!

---

## 🎮 How to Use

### User Flow

```
Welcome Screen
    ↓
Enter Name & Age
    ↓
Category Selection (Love/Money/Life/Chaos)
    ↓
Choose 1 of 3 Cards
    ↓
Fortune Revealed + Confetti
    ↓
View History or Read Again
```

### Limits & Cooldowns

The app enforces gentle limits to create a mystical experience:

- **10 total readings per day** - Prevents overuse
- **3 readings per category per day** - Encourages variety
- **30-second cooldown** - Time for reflection between readings

All limits reset automatically at midnight (based on your local time).

### Admin Panel

**Access:** Click the ⚙️ icon in the bottom-right corner

**Password:** `oracle` (can be changed in `script.js`)

**Admin Options:**
- **Disable All Limits** - Perfect for testing or demos
- **Reset Daily Usage** - Clear today's reading counts
- **Clear History** - Remove all past readings
- **Reset Everything** - Complete factory reset

---

## 🎨 Customization Guide

### Change Admin Password

**File:** `script.js`  
**Line:** 26

```javascript
const CONSTANTS = {
    MAX_DAILY_READINGS: 10,
    MAX_CATEGORY_READINGS: 3,
    COOLDOWN_SECONDS: 30,
    ADMIN_PASSWORD: 'oracle', // ← Change this
    STORAGE_KEY: 'mysticOracle'
};
```

### Adjust Limits

**File:** `script.js`  
**Lines:** 23-25

```javascript
const CONSTANTS = {
    MAX_DAILY_READINGS: 10,      // ← Total daily readings
    MAX_CATEGORY_READINGS: 3,    // ← Per-category limit
    COOLDOWN_SECONDS: 30,        // ← Seconds between readings
    ADMIN_PASSWORD: 'oracle',
    STORAGE_KEY: 'mysticOracle'
};
```

### Add New Fortunes

**File:** `script.js`  
**Lines:** 32-91

Each category needs this structure:

```javascript
category_name: [
    { 
        symbol: '✨',                    // Emoji displayed on card
        title: 'Fortune Title',          // Heading of the fortune
        text: 'The fortune message...'   // Main fortune text
    },
    // Add more fortunes here
]
```

### Change Color Scheme

**File:** `style.css`  
**Lines:** 10-20

```css
:root {
    --primary-purple: #a855f7;    /* Main accent color */
    --secondary-purple: #7c3aed;  /* Secondary accent */
    --deep-purple: #5b21b6;       /* Dark accent */
    --accent-pink: #ec4899;       /* Pink highlights */
    --accent-cyan: #06b6d4;       /* Cyan highlights */
    --dark-bg: #0f0820;           /* Main background */
    --darker-bg: #070312;         /* Darker background */
    /* ... more colors ... */
}
```

### Modify Card Count

**File:** `index.html`  
**Lines:** 109-128

Add or remove `.tarot-card` divs. Each needs:
- Unique `data-card` attribute (1, 2, 3, 4, etc.)
- Complete `.card-back` structure

**File:** `script.js`  
Update fortune selection logic if needed (line 337).

---

## 📊 Fortune Database

The app includes **24 unique fortunes** across 4 categories:

| Category | Count | Themes |
|----------|-------|--------|
| Love     | 6     | Romance, connections, self-love, destiny |
| Money    | 6     | Prosperity, opportunities, investments, abundance |
| Life     | 6     | Purpose, authenticity, transformation, freedom |
| Chaos    | 6     | Disruption, wild cards, cosmic jokes, alchemy |

Each fortune includes:
- **Symbol** - Emoji representing the fortune
- **Title** - Evocative 2-4 word heading
- **Text** - 2-3 sentence mystical message

---

## 🛠️ Technical Details

### Technologies
- **HTML5** - Semantic structure
- **CSS3** - Animations, gradients, glass-morphism
- **Vanilla JavaScript** - ES6+, no frameworks

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Storage
- **LocalStorage** - All user data persists locally
- **Storage Key** - `mysticOracle`
- **Data Stored:**
  - User name and age
  - Daily usage counts
  - Category usage counts
  - Reading history (last 20)
  - Luck meter value
  - Admin settings
  - Last reset date

### File Structure
```
mystic-oracle/
│
├── index.html          # Main HTML structure (180 lines)
├── style.css           # All styling & animations (690 lines)
└── script.js           # Application logic (550 lines)
```

### Key Architecture Decisions

**State Management:**
- Single `STATE` object for all application state
- Centralized save/load functions
- Automatic persistence after state changes

**Screen Management:**
- Class-based system (`.screen.active`)
- Smooth fade transitions
- Proper cleanup on screen switches

**No Global Pollution:**
- All functions properly scoped
- No `var` declarations
- Event listeners properly attached

**Defensive Programming:**
- Input validation on all user inputs
- Safe JSON parsing with error handling
- Null checks before DOM manipulation

---

## 🎯 User Experience Features

### Visual Feedback
- **Hover Effects** - Cards glow and lift on hover
- **Button Animations** - Shimmer effect on primary buttons
- **Confetti** - 60 pieces on fortune reveal
- **Notifications** - Toast messages for errors and confirmations
- **Loading States** - Disabled states during cooldowns

### Accessibility
- **Keyboard Navigation** - Enter key submits forms
- **Clear Feedback** - Visual indicators for disabled states
- **Readable Text** - High contrast ratios
- **Responsive Touch** - Optimized for mobile interaction

### Mobile Optimizations
- Responsive grid layouts
- Touch-friendly button sizes
- Adjusted card sizes for smaller screens
- Single-column layouts on mobile
- Viewport meta tag for proper scaling

---

## 🐛 Known Limitations

1. **Browser Storage** - Clearing browser data will reset all progress
2. **Single Device** - Data doesn't sync across devices
3. **No Backend** - Everything is client-side only
4. **Timezone** - Daily reset uses local timezone
5. **No Analytics** - No tracking of user behavior

---

## 🔧 Troubleshooting

### My readings aren't saving
- Check that browser's LocalStorage is enabled
- Make sure you're not in Incognito/Private mode
- Clear the `mysticOracle` key and refresh

### Cards won't select
- Check if you're on cooldown (30s between readings)
- Verify you haven't hit daily/category limits
- Try using admin panel to disable limits temporarily

### Admin panel won't unlock
- Default password is `oracle` (lowercase)
- Check `script.js` line 26 for the correct password
- Refresh the page and try again

### Page looks broken
- Ensure all 3 files are in the same directory
- Check browser console for errors
- Verify you're using a modern browser
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## 🎁 Easter Eggs

- Check your browser console after 10 readings
- The luck meter has hidden calculation logic
- Fortune selection uses a seed based on card choice + usage
- Stars twinkle at different rates for depth effect

---

## 📝 Customization Examples

### Example: Add a New Category

**1. Update HTML** (`index.html` line ~95):
```html
<div class="category-card" data-category="dreams">
    <div class="category-icon">🌙</div>
    <h3>Dreams</h3>
    <p>Subconscious whispers</p>
    <div class="category-uses">
        <span id="dreams-uses">0/3</span> today
    </div>
</div>
```

**2. Add Fortunes** (`script.js` line ~32):
```javascript
dreams: [
    { symbol: '🌙', title: 'Lunar Vision', text: 'Your dreams speak truth...' },
    { symbol: '💭', title: 'Mind\'s Eye', text: 'The subconscious reveals...' },
    // Add 4-6 more
]
```

**3. Initialize Usage** (`script.js` line ~15):
```javascript
categoryUsage: {
    love: 0,
    money: 0,
    life: 0,
    chaos: 0,
    dreams: 0  // ← Add this
}
```

**4. Update Category Icon Function** (`script.js` line ~366):
```javascript
const icons = {
    love: '💖',
    money: '💰',
    life: '🌟',
    chaos: '🔮',
    dreams: '🌙'  // ← Add this
};
```

---

## 🚀 Deployment

### GitHub Pages
1. Create a new repository
2. Upload all 3 files to the repository
3. Go to Settings → Pages
4. Select "main" branch
5. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the folder into Netlify
2. Site deploys instantly
3. Free HTTPS and custom domain support

### Self-Hosted
1. Upload files to your web server
2. No special server configuration needed
3. Works from any directory

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

## 🙏 Credits

**Created by:** Built from scratch with vanilla web technologies  
**Inspiration:** Tarot mysticism, fortune cookies, destiny themes  
**Design:** Glass-morphism, cosmic gradients, mystical aesthetics

---

## 📮 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the code comments for implementation details
3. Modify and experiment - the code is designed to be readable

---

## 🔮 Final Words

*"The cards never lie, but they always speak in riddles. May your fortunes be illuminating."*

Enjoy your mystical journey! ✨
