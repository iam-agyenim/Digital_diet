# Digital Diet — The Attention Awareness Game

## 📖 Full Definition

**Digital Diet** is a complete, polished, interactive web-based game designed to help users understand and solve digital distraction and phone addiction through awareness, reflection, and healthy habit systems. It's not a simulation of chaos—it's a **solution-focused experience** that reveals your digital habits, measures distraction triggers, teaches better behaviors, and provides evidence-based, actionable strategies.

The game uses a monochrome design (white, black, and gray shades) to create a seamless, professional, and real experience. It's built with pure HTML, CSS, and Vanilla JavaScript—no frameworks required.

---

## 🎯 What to Expect

### Overall Experience
- **Duration**: Approximately 3-5 minutes for the full experience
- **Format**: Interactive web-based game with scrollable sections
- **Design**: Minimalist, monochrome (white/black/gray) aesthetic
- **Privacy**: All data stays in your browser—nothing is collected or sent to servers
- **Device Support**: Works on desktop and mobile devices

### Game Flow
1. **Home Screen** → Introduction and start button
2. **Awareness Intro** → 5 scrollable educational screens
3. **Level 1** → Notification Triage (30 seconds)
4. **Level 2** → Scroll Cataract Surgery (30 seconds)
5. **Level 3** → Your Attention Wallet (no time limit)
6. **Final Awareness** → Personalized insights and reflection (7 scrollable screens)

---

## 🚀 Complete Feature Breakdown

### 1. Home Screen

**Purpose**: First impression and game introduction

**Features**:
- Minimal, futuristic design with glowing phone silhouette animation
- Clean title: "DIGITAL DIET — Break the Habit"
- Subtitle: "A 3-minute awareness game to understand and reduce digital distraction"
- Smooth animations and transitions
- "Start Game" button with glow effect
- Privacy note: "No data saved or collected"

**Design Elements**:
- Dark background (#000000)
- White text and accents
- Animated phone silhouette with glow effect
- Smooth button hover effects

---

### 2. Awareness Intro (5 Scrollable Screens)

**Purpose**: Educate users about digital distraction patterns before gameplay

**Screen 1**: "We check our phones **96 times** per day."
- Animated notification bubbles appear
- Visual representation of phone usage frequency

**Screen 2**: "Most people unlock their phone **without knowing why**."
- Highlights automatic behavior patterns

**Screen 3**: "Apps use **dopamine loops**, scroll traps, and alerts to grab your attention."
- Explains the psychology behind digital manipulation

**Screen 4**: "This game will show you **how your attention responds** to these triggers."
- Sets expectations for the game experience

**Screen 5**: "Ready to see what you can't see?"
- Transition to gameplay
- "Continue" button to start Level 1

**Features**:
- Smooth vertical scroll with snap points
- Scroll indicators at bottom of each screen (animated "scroll down" text)
- Dot navigation indicators showing current position
- Fade-in animations for each screen
- Educational content that builds awareness

---

### 3. Level 1: Notification Triage (30 seconds)

**Concept**: Identify urgent vs manipulative notifications

**What You Do**:
- Fake notifications appear one at a time in the center of the screen
- Each notification shows:
  - App icon (📅 Calendar, 💬 Messages, 🛍️ Shopping, etc.)
  - Notification title
  - Notification text/message
  - Notification sound (different tones for different types)
- You must categorize each notification as:
  - **"✓ Urgent"** — Important, time-sensitive notifications
  - **"✗ Manipulative"** — Attention-grabbing, non-essential notifications
- Notifications appear every 3-5 seconds
- Each notification has a 7-second timeout if not processed

**Scoring System**:
- **Correct Count**: Tracks when you correctly identify urgent or manipulative notifications
- **Missed Count**: Tracks when you incorrectly categorize or miss urgent notifications
- Real-time counters update as you make choices
- Accuracy percentage calculated at level end

**Notification Types**:

**Urgent (Always Obvious)**:
- 📅 Calendar: "Meeting starts in 5 minutes - Room 204"
- 💬 Messages: "Mom: Can you call me? It's important"
- 💬 Messages: "Boss: Need to discuss project ASAP"
- 📧 Email: "Work: Deadline reminder - Due today at 5pm"
- 🔒 Security: "Suspicious login attempt detected"
- 🏥 Health: "Doctor appointment reminder - Tomorrow 2pm"
- ✈️ Travel: "Flight boarding in 30 minutes"

**Manipulative (Designed to Grab Attention)**:
- 🛍️ Shopping: "Flash Sale! 50% off ends in 1 hour!"
- 📱 Social: "Sarah liked your photo"
- 🎮 Games: "Your daily reward is ready!"
- 📺 Video: "Trending now: Watch this viral video"
- 📰 News: "You won't believe what happened!"
- 🎯 Ads: "Limited time offer - Don't miss out!"
- 💰 Deals: "Special offer just for you!"

**What It Teaches**: 
"Not all buzzes deserve attention" — Learn to distinguish between urgent, actionable notifications and manipulative ones designed to grab your attention.

**Features**:
- Notification sounds generated using Web Audio API
- Visual feedback (green for correct, red for incorrect)
- Smooth notification appearance/disappearance animations
- Timer countdown in header (30 seconds)
- Score display updates in real-time

---

### 4. Level 2: Scroll Cataract Surgery (30 seconds)

**Concept**: Identify meaningful content vs algorithmic bait in an infinite scroll

**What You Do**:
- Infinite scroll simulation with auto-scrolling social media-style feed
- Content items appear continuously in a feed format
- Each item shows:
  - Author/account name
  - Content title
  - Content preview/text
  - Category icon
- Click an item to select it (highlighted)
- Then categorize as:
  - **"✓ Meaningful"** — Valuable, enriching content
  - **"✗ Algorithmic Bait"** — Designed to keep you scrolling
- Feed auto-scrolls continuously
- New content generates as you scroll
- Multiple items can be processed

**Scoring System**:
- **Meaningful Count**: Tracks correct meaningful content identifications
- **Bait Count**: Tracks correct algorithmic bait identifications
- **Incorrect Count**: Tracks wrong categorizations
- Real-time counters update as you make choices
- Accuracy percentage calculated at level end

**Content Types**:

**Meaningful Content**:
- 👤 Friend's Life Update: "Sarah shared photos from her graduation ceremony"
- 📚 Educational Article: "How to improve your focus: Evidence-based techniques"
- 👨‍👩‍👧 Family Photo: "Mom posted: Family dinner this Sunday at 6pm"
- 💼 Work Announcement: "Team meeting notes: Project timeline discussed"
- 🍳 Recipe Share: "Grandma's famous chocolate cake recipe"
- 🏘️ Community Event: "Neighborhood cleanup this Saturday"
- 🏥 Health Tips: "Research-backed sleep hygiene practices"

**Algorithmic Bait**:
- 📰 Clickbait Headlines: "You won't believe what happened next!"
- 💰 Sponsored Ads: "Limited time offer - Act now!"
- 📺 Viral Video Recommendations: "Everyone is watching this!"
- 🔥 Trending Now: "This is breaking the internet!"
- 😱 FOMO Tactics: "Don't miss out on this exclusive deal!"
- 👥 Social Proof: "10,000 people are viewing this right now!"
- 🎯 Engagement Hooks: "Tap to see what happens!"

**What It Teaches**: 
"Intentional consumption" — Learn to distinguish between valuable, meaningful content and algorithmic bait designed to keep you scrolling.

**Features**:
- Auto-scrolling feed simulation
- Infinite content generation
- Click to select, then categorize
- Visual feedback (green for correct, red for incorrect)
- Timer countdown in header (30 seconds)
- Score display updates in real-time
- Scroll indicators at bottom

---

### 5. Level 3: Your Attention Wallet (No time limit)

**Concept**: Your attention is finite — how will you spend it?

**What You Do**:
- Start with **10 Attention Coins** (displayed prominently at top)
- Three action buttons appear:
  - **🎮 Quick Game** (Instant, costs 8 coins) — Pulses enticingly to grab attention
  - **📚 Learn a Fact** (15 seconds, costs 3 coins) — Shows interesting fact after timer
  - **☁️ Just Breathe** (30 seconds, free) — Guided breathing exercise
- Choose how to spend your attention coins
- Level ends when:
  - You use all coins (reach 0)
  - You have insufficient coins for any paid action (less than 3 coins)
- Multiple actions can be chained together

**Scoring System**:
- **Quick Game**: Instant "win" but loses 8 coins
  - Message: "Instant gratification achieved!"
  - Result: 10 - 8 = 2 coins remaining
- **Learn a Fact**: After 15 seconds, gain knowledge
  - Shows random interesting fact
  - Message: "You invested attention and gained knowledge"
  - Result: 10 - 3 = 7 coins remaining
- **Just Breathe**: Complete 30-second breathing exercise
  - Animated breathing circle (inhale/exhale)
  - Message: "You took time to breathe and be present"
  - Result: 10 coins remaining (no cost, no earnings)
- Final coins remaining tracked for insights

**What It Teaches**: 
"Your attention is finite. How you spend it changes what you gain." — Demonstrates that instant gratification costs more than mindful choices.

**Features**:
- No timer — play until coins are insufficient
- Real-time coin counter updates
- Buttons disable when you can't afford them
- Activity timer appears in header (not in activity box)
- Breathing exercise with animated circle
- Quick Game button pulses to simulate attention-grabbing design
- All content fits on one page (no scrolling)

**Activity Details**:

**Quick Game**:
- Instant completion (2 seconds display)
- High cost (8 coins)
- Low long-term value
- Button pulses to attract attention

**Learn a Fact**:
- 15-second countdown timer
- Shows interesting facts like:
  - "The human brain uses about 20% of the body's total energy"
  - "Deep breathing activates the parasympathetic nervous system"
  - "Multitasking reduces productivity by up to 40%"
- Small investment (3 coins)
- Meaningful return (knowledge)

**Just Breathe**:
- 30-second guided breathing exercise
- Animated circle expands/contracts
- Text changes: "Breathe In..." → "Hold..." → "Breathe Out..."
- Free (no cost)
- Restores attention (doesn't earn coins, but provides value)

---

### 6. Final Awareness Statement (7 Scrollable Screens)

**Purpose**: Personalized insights, reflection, and actionable takeaways

**Screen 1**: Introduction
- "You've completed all three challenges"
- Explains what the results mean

**Screen 2**: Level 1 — Notification Triage
- **Your Performance**: Personalized insight based on your accuracy
  - Shows correct count, missed count, total notifications
  - Accuracy percentage
  - Performance assessment (strong awareness / moderate / highly susceptible)
- **How to Improve**: Tailored advice based on your results
  - Specific recommendations for your performance level
  - Actionable steps to improve notification awareness

**Screen 3**: Level 2 — Scroll Cataract Surgery
- **Your Performance**: Personalized insight based on your accuracy
  - Shows meaningful count, bait count, incorrect count
  - Accuracy percentage
  - Performance assessment (excellent / good / easily pulled in)
- **How to Improve**: Tailored advice based on your results
  - Specific recommendations for content awareness
  - Tips for intentional consumption

**Screen 4**: Level 3 — Attention Wallet
- **Your Performance**: Personalized insight based on your choices
  - Shows coins remaining
  - Activities completed (Quick Game, Learn a Fact, Just Breathe counts)
  - Spending pattern assessment (conserved / balanced / spent quickly)
- **How to Improve**: Tailored advice based on your choices
  - Specific recommendations for attention management
  - Tips for making better attention investments

**Screen 5**: Overall Pattern
- **Your Pattern**: Assessment across all three levels
  - Strong digital awareness / Moderate / Highly reactive
- **Who You Are**: Personalized description based on your performance
  - Explains your digital behavior patterns
  - Helps you understand your relationship with technology
- **How to Get Over It**: Actionable steps tailored to your results
  - Specific recommendations based on your patterns
  - Practical strategies for improvement

**Screen 6**: A Question to Ponder
- Thought-provoking question in highlighted box:
  - "If your attention were real currency — something you could lose, invest, or save — would you spend it the same way you did in this game?"
- Encourages reflection without requiring immediate answer
- Styled prominently to stand out

**Screen 7**: Your Reflection
- Text area for writing thoughts and reflections
- Prompts:
  - "What did you learn about yourself?"
  - "What will you change?"
  - "What patterns did you notice?"
  - "How will you use this awareness in your daily life?"
- Auto-saves to localStorage as you type
- Loads saved reflection if you return
- "Play Again" button at bottom

**Features**:
- All insights are dynamically generated from your actual game performance
- Personalized recommendations based on your specific results
- Smooth scrolling with snap points
- Scroll indicators on each screen
- Dot navigation showing current position
- Reflection field saves automatically

---

## 📁 Project Structure

```
digital-diet/
├── index.html          # Main HTML structure (all screens and sections)
├── styles.css          # All styling (monochrome theme, animations)
├── main.js            # Navigation, screen transitions, scroll setup
├── utils.js           # Tracking, scoring, data management, insight generation
├── level1.js          # Notification Triage level logic
├── level2.js          # Scroll Cataract Surgery level logic
├── level3.js          # Your Attention Wallet level logic
├── report.js          # Report generation (legacy, not currently used)
├── README.md          # This comprehensive documentation
└── assets/
    ├── icons/         # Icon assets (if needed)
    ├── sounds/        # Sound effects (if needed)
    └── images/        # Image assets (if needed)
```

---

## 🎨 Design Philosophy

### Color Scheme
- **Monochrome Palette**: White, black, and gray shades exclusively
- **No AI Colors**: No blue, red, or other "AI-like" colors
- **Professional**: Seamless, real, and professional appearance
- **Dark Mode**: Gameplay uses dark backgrounds (#000000) for focus
- **Accent Colors**: White (#FFFFFF) for highlights and borders
- **Text Colors**: White text on dark backgrounds, dark text on light backgrounds

### Visual Design
- **Minimalist**: Clean, distraction-free interface
- **Smooth Animations**: All transitions are smooth and purposeful
- **Glow Effects**: Subtle white glow effects for emphasis
- **Responsive**: Works on desktop and mobile devices
- **No Scrolling in Levels**: Level 3 fits entirely on one page
- **Scroll Indicators**: Animated "scroll down" text on scrollable sections

### User Experience
- **Immediate Feedback**: Visual and audio feedback for all actions
- **Real-time Updates**: Counters and scores update instantly
- **Smooth Transitions**: Screen changes are animated smoothly
- **Clear Instructions**: Each level has clear instructions
- **Progress Indicators**: Timers, counters, and dot navigation show progress

---

## 💾 Data Storage & Privacy

### What's Stored
The game uses **localStorage** to save your progress locally in your browser:

**Game Performance Data**:
- Level 1: Correct count, missed count, total notifications
- Level 2: Meaningful count, bait count, incorrect count, total items
- Level 3: Coins remaining, activities completed
- Overall scores and calculations

**Reflection Data**:
- Your written reflection (auto-saved as you type)

**History** (if implemented):
- Previous game sessions
- Historical scores and insights

### Privacy Guarantee
- **No Server Communication**: All data stays in your browser
- **No Tracking**: No analytics, cookies, or external tracking
- **No Collection**: Nothing is sent to any server
- **Local Only**: Everything is stored locally using localStorage
- **You Control**: You can clear your browser data to remove all stored information

---

## 🎮 How to Play (Complete Guide)

### Step 1: Start the Game
1. Open `index.html` in a modern web browser
2. You'll see the home screen with "DIGITAL DIET — Break the Habit"
3. Click the "Start Game" button

### Step 2: Awareness Intro
1. Scroll down through 5 educational screens
2. Read about digital distraction patterns
3. Watch animated notification bubbles
4. Click "Continue" on the last screen

### Step 3: Level 1 — Notification Triage (30 seconds)
1. Notifications will appear one at a time in the center
2. Each notification plays a sound
3. Quickly decide: Is it urgent or manipulative?
4. Click "✓ Urgent" for important notifications (work, family, calendar)
5. Click "✗ Manipulative" for attention-grabbing notifications (ads, social media)
6. Watch your correct/missed counters update in real-time
7. Level ends after 30 seconds

### Step 4: Level 2 — Scroll Cataract Surgery (30 seconds)
1. A social media-style feed appears and auto-scrolls
2. Click on content items to select them
3. Categorize each as "✓ Meaningful" or "✗ Algorithmic Bait"
4. Watch your meaningful/bait/incorrect counters update
5. Feed continues scrolling and generating new content
6. Level ends after 30 seconds

### Step 5: Level 3 — Your Attention Wallet (No time limit)
1. You start with 10 Attention Coins
2. Three buttons appear:
   - Quick Game (costs 8 coins, pulses enticingly)
   - Learn a Fact (costs 3 coins, 15 seconds)
   - Just Breathe (free, 30 seconds)
3. Choose how to spend your coins
4. Watch the coin counter update
5. Activity timer appears in header when doing activities
6. Level ends when you can't afford any paid action

### Step 6: Final Awareness & Reflection
1. Scroll through 7 screens of personalized insights
2. See your performance for each level
3. Read personalized recommendations
4. Understand your overall pattern
5. Ponder the thought-provoking question
6. Write your reflection in the text area
7. Click "Play Again" to restart

---

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic structure, scroll snap, canvas (for potential charts)
- **CSS3**: Animations, transitions, flexbox, grid, scroll snap
- **Vanilla JavaScript**: No frameworks or libraries
- **Web Audio API**: For notification sounds
- **LocalStorage API**: For data persistence
- **Responsive Design**: Mobile-first approach with media queries

### Browser Compatibility
Works best in:
- **Chrome/Edge** (latest versions)
- **Firefox** (latest versions)
- **Safari** (latest versions)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

### Performance
- Lightweight: No external dependencies
- Fast loading: All assets are local
- Smooth animations: CSS-based for performance
- Responsive: Adapts to different screen sizes

---

## 📊 Scoring System (Complete Details)

### Level 1: Notification Triage

**Metrics Tracked**:
- `level1Correct`: Number of correctly identified notifications
- `level1Missed`: Number of missed or incorrectly categorized notifications
- `level1Total`: Total notifications shown
- Accuracy: `(correct / total) × 100`

**Scoring Logic**:
- Correct identification of urgent notification → +1 to correct count
- Correct identification of manipulative notification → +1 to correct count
- Incorrect categorization → +1 to missed count
- Missing urgent notification (timeout) → +1 to missed count

**Performance Levels**:
- **80%+ accuracy**: Strong awareness of what deserves attention
- **60-79% accuracy**: Moderate awareness, room for improvement
- **<60% accuracy**: Highly susceptible to notification manipulation

---

### Level 2: Scroll Cataract Surgery

**Metrics Tracked**:
- `level2Meaningful`: Correct meaningful content identifications
- `level2Bait`: Correct algorithmic bait identifications
- `level2Incorrect`: Wrong categorizations
- `level2Total`: Total items processed
- Accuracy: `((meaningful + bait) / total) × 100`

**Scoring Logic**:
- Correctly identify meaningful content → +1 to meaningful count
- Correctly identify algorithmic bait → +1 to bait count
- Incorrect categorization → +1 to incorrect count

**Performance Levels**:
- **80%+ accuracy**: Excellent content awareness
- **60-79% accuracy**: Good awareness, some struggles
- **<60% accuracy**: Easily pulled in by algorithmic bait

---

### Level 3: Your Attention Wallet

**Metrics Tracked**:
- `level3CoinsRemaining`: Final coin count
- `level3Activities`: Array of activities completed
  - 'quick-game': Number of times chosen
  - 'learn-fact': Number of times chosen
  - 'breathe': Number of times chosen

**Scoring Logic**:
- Quick Game: -8 coins (instant gratification)
- Learn a Fact: -3 coins (investment in knowledge)
- Just Breathe: 0 coins (free, no earnings)

**Performance Levels**:
- **7+ coins remaining**: Conserved attention, prioritized value
- **3-6 coins remaining**: Balanced spending, some intentional choices
- **<3 coins remaining**: Spent quickly, chose instant gratification

---

### Overall Pattern Analysis

**Formula**:
Combines all three levels to determine overall digital awareness:
- Level 1 accuracy (0-100%)
- Level 2 accuracy (0-100%)
- Level 3 coins remaining (0-10)

**Pattern Categories**:
- **Strong Digital Awareness**: High accuracy in Levels 1 & 2, 5+ coins remaining
- **Moderate Digital Awareness**: Medium accuracy, 3-4 coins remaining
- **Highly Reactive**: Low accuracy, <3 coins remaining

---

## 🎯 Key Features & Highlights

### Personalization
- **Dynamic Insights**: All insights are generated from your actual performance
- **Tailored Recommendations**: Advice is customized to your specific results
- **Performance-Based Descriptions**: "Who you are" section reflects your patterns

### User Experience
- **Smooth Animations**: All transitions are fluid and purposeful
- **Real-time Feedback**: Immediate visual and audio feedback
- **Clear Progress Indicators**: Timers, counters, and navigation dots
- **Auto-save Reflection**: Your thoughts are saved automatically

### Educational Value
- **Awareness Building**: Teaches recognition of digital manipulation
- **Pattern Recognition**: Helps identify personal digital habits
- **Actionable Strategies**: Provides specific steps for improvement
- **Evidence-Based**: Insights based on actual behavior data

### Design Excellence
- **Professional Appearance**: Monochrome, seamless, real
- **Responsive Design**: Works on all devices
- **Accessibility**: Clear text, good contrast, readable fonts
- **Performance**: Fast loading, smooth animations

---

## 🚀 Future Improvements (Potential Enhancements)

### Gameplay Enhancements
- More notification types and scenarios
- Additional content categories for Level 2
- More activity options in Level 3
- Difficulty levels (easy, medium, hard)
- Time attack mode
- Daily challenges

### Analytics & Tracking
- Historical performance tracking
- Progress graphs over time
- Comparison with previous sessions
- Achievement system
- Badges for milestones

### Social Features (Optional)
- Share results (anonymized)
- Compare with friends (opt-in)
- Community challenges
- Leaderboards (optional)

### Personalization
- Customizable notification types
- Personalized fact library
- Custom breathing exercises
- Habit tracking integration

### Technical Improvements
- Progressive Web App (PWA) support
- Offline functionality
- Export data as JSON/CSV
- Print-friendly report view

---

## 📝 License

This project is open source and available for educational and personal use.

---

## 🙏 Credits & Philosophy

Built as a solution-focused awareness tool to help people understand and improve their relationship with digital devices.

**Core Philosophy**: This game is designed to create awareness, not shame. Every moment of awareness is a step toward healthier digital habits.

**Design Principle**: Real, seamless, professional—not flashy or gimmicky. The monochrome design reflects the serious nature of digital distraction while maintaining an engaging, interactive experience.

---

## 🎓 Educational Value

### What You'll Learn
1. **Notification Awareness**: How to distinguish urgent from manipulative
2. **Content Discernment**: How to identify meaningful vs algorithmic bait
3. **Attention Management**: How to spend your finite attention wisely
4. **Pattern Recognition**: Understanding your own digital behavior patterns
5. **Actionable Strategies**: Specific steps to improve your digital habits

### Research-Backed Concepts
- Dopamine loops and habit formation
- Attention economy principles
- Digital minimalism strategies
- Mindfulness and breathing techniques
- Behavioral change psychology

---

## 🔍 Troubleshooting

### Common Issues

**Game not loading**:
- Ensure you're using a modern browser
- Check browser console for errors
- Try clearing browser cache

**Scores not updating**:
- Refresh the page and try again
- Check that JavaScript is enabled
- Ensure localStorage is available

**Animations not smooth**:
- Close other browser tabs
- Update your browser
- Check device performance

**Reflection not saving**:
- Ensure localStorage is enabled
- Check browser privacy settings
- Try typing again (auto-saves on input)

---

## 📞 Support & Feedback

For issues, questions, or feedback, please refer to the project repository or documentation.

---

**Remember**: This game is designed to create awareness, not shame. Every moment of awareness is a step toward healthier digital habits. Take your time, reflect on your results, and use the insights to make positive changes in your relationship with technology.

---

*Last Updated: 2024*
