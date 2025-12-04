// Tracking variables
let gameData = {
    totalNotifications: 0,
    notificationsClicked: 0,
    // Level 1 specific
    level1Correct: 0,
    level1Missed: 0,
    level1Total: 0,
    // Level 2 specific
    level2Meaningful: 0,
    level2Bait: 0,
    level2Incorrect: 0,
    level2Total: 0,
    // Level 3 specific
    level3CoinsRemaining: 0,
    level3Activities: [],
    totalScrolls: 0,
    impulseScrolls: 0,
    realChoices: 0,
    phoneChoices: 0,
    focusTime: 0,
    distractionTime: 0,
    focusStability: [],
    scrollTimings: [],
    choiceTimings: []
};

// Initialize game data
function initGameData() {
    gameData = {
        totalNotifications: 0,
        notificationsClicked: 0,
        // Level 1 specific
        level1Correct: 0,
        level1Missed: 0,
        level1Total: 0,
        // Level 2 specific
        level2Meaningful: 0,
        level2Bait: 0,
        level2Incorrect: 0,
        level2Total: 0,
        // Level 3 specific
        level3CoinsRemaining: 0,
        level3Activities: [],
        totalScrolls: 0,
        impulseScrolls: 0,
        realChoices: 0,
        phoneChoices: 0,
        focusTime: 0,
        distractionTime: 0,
        focusStability: [],
        scrollTimings: [],
        choiceTimings: []
    };
}

// Calculate Digital Trigger Score (0-100)
function calculateTriggerScore() {
    let score = 100;
    score -= gameData.notificationsClicked * 8;
    score -= gameData.impulseScrolls * 6;
    score += gameData.realChoices * 4;
    
    // Normalize to 0-100
    score = Math.max(0, Math.min(100, score));
    return Math.round(score);
}

// Calculate Impulse Scroll Index (0-100%)
function calculateScrollIndex() {
    if (gameData.totalScrolls === 0) return 0;
    return Math.round((gameData.impulseScrolls / gameData.totalScrolls) * 100);
}

// Calculate choice ratio
function calculateChoiceRatio() {
    const total = gameData.realChoices + gameData.phoneChoices;
    if (total === 0) return { real: 0, phone: 0 };
    return {
        real: Math.round((gameData.realChoices / total) * 100),
        phone: Math.round((gameData.phoneChoices / total) * 100)
    };
}

// Generate personalized insight
function generateInsight() {
    const triggerScore = calculateTriggerScore();
    const scrollIndex = calculateScrollIndex();
    const choiceRatio = calculateChoiceRatio();
    
    let insight = "You show ";
    
    if (triggerScore >= 70) {
        insight += "strong resistance to digital distractions";
    } else if (triggerScore >= 40) {
        insight += "moderate awareness of digital habits";
    } else {
        insight += "high reactivity to digital triggers";
    }
    
    insight += ". ";
    
    if (scrollIndex >= 60) {
        insight += "You scroll impulsively, often before consciously deciding. ";
    } else if (scrollIndex >= 30) {
        insight += "You show some awareness when scrolling, but still act on impulse sometimes. ";
    } else {
        insight += "You demonstrate good control over your scrolling habits. ";
    }
    
    if (choiceRatio.real >= 60) {
        insight += "You chose healthy real-life actions " + choiceRatio.real + "% of the time, showing strong potential for habit improvement.";
    } else if (choiceRatio.real >= 40) {
        insight += "You balanced phone and real-life choices, with " + choiceRatio.real + "% real-life actions. There's room to increase intentional choices.";
    } else {
        insight += "You leaned toward phone choices (" + choiceRatio.phone + "%), but this awareness is the first step toward change.";
    }
    
    return insight;
}

// Generate recommendations
function generateRecommendations() {
    const triggerScore = calculateTriggerScore();
    const scrollIndex = calculateScrollIndex();
    const choiceRatio = calculateChoiceRatio();
    
    const recommendations = [];
    
    if (triggerScore < 50 || gameData.notificationsClicked > 3) {
        recommendations.push({
            title: "Turn off lock-screen notifications",
            description: "Disable non-essential notifications for 24 hours. This reduces the constant pull to check your phone."
        });
    }
    
    if (scrollIndex > 40) {
        recommendations.push({
            title: "Use intentional unlock",
            description: "Before unlocking your phone, ask yourself 'WHY?' This simple pause breaks automatic behavior patterns."
        });
    }
    
    if (choiceRatio.real < 60) {
        recommendations.push({
            title: "Replace night scrolling with real tasks",
            description: "When you feel the urge to scroll, choose one real-life action from Level 3 instead. Build this habit over 7 days."
        });
    }
    
    // Always add at least 3 recommendations
    if (recommendations.length < 3) {
        recommendations.push({
            title: "Set phone-free zones",
            description: "Designate specific times or places where your phone is not allowed. Start with meal times or the first hour after waking."
        });
    }
    
    if (recommendations.length < 3) {
        recommendations.push({
            title: "Practice the 2-minute rule",
            description: "When you want to check your phone, wait 2 minutes. Often the urge passes, revealing it was just a habit trigger."
        });
    }
    
    return recommendations.slice(0, 3);
}

// Generate 24-hour challenge
function generateChallenge() {
    const challenges = [
        "No notifications for 1 hour. Turn off all non-essential alerts and experience the peace of uninterrupted focus.",
        "No social apps after midnight. Replace late-night scrolling with a book, meditation, or sleep preparation.",
        "Use phone only during intentional breaks. Set specific times (e.g., 12pm, 3pm, 6pm) when you allow yourself to check messages and apps.",
        "One-touch rule: When you unlock your phone, complete only one task, then lock it again. No mindless browsing.",
        "Phone-free morning: Keep your phone away for the first hour after waking. Start your day with intention, not notifications."
    ];
    
    return challenges[Math.floor(Math.random() * challenges.length)];
}

// Save to localStorage
function saveGameData() {
    const reportData = {
        triggerScore: calculateTriggerScore(),
        scrollIndex: calculateScrollIndex(),
        choiceRatio: calculateChoiceRatio(),
        insight: generateInsight(),
        timestamp: new Date().toISOString(),
        gameData: { ...gameData }
    };
    
    const history = JSON.parse(localStorage.getItem('digitalDietHistory') || '[]');
    history.push(reportData);
    
    // Keep only last 10 entries
    if (history.length > 10) {
        history.shift();
    }
    
    localStorage.setItem('digitalDietHistory', JSON.stringify(history));
    return reportData;
}

// Get history from localStorage
function getGameHistory() {
    return JSON.parse(localStorage.getItem('digitalDietHistory') || '[]');
}

// Generate personalized Level 1 insight
function generateLevel1Insight() {
    const correct = gameData.level1Correct || 0;
    const missed = gameData.level1Missed || 0;
    const total = gameData.level1Total || 0;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    let insight = "";
    let advice = "";
    
    if (accuracy >= 80) {
        insight = "You have <strong>strong awareness</strong> of what deserves your attention. You correctly identified " + correct + " out of " + total + " notifications (" + accuracy + "% accuracy).";
        advice = "You're already good at filtering urgency from manipulation. Keep this skill sharp by questioning every notification in real life.";
    } else if (accuracy >= 60) {
        insight = "You show <strong>moderate awareness</strong> but sometimes struggle to distinguish urgency. You got " + correct + " correct out of " + total + " notifications (" + accuracy + "% accuracy).";
        advice = "Practice pausing before reacting to notifications. Ask yourself: 'Is this truly urgent, or is it designed to grab my attention?'";
    } else {
        insight = "You're <strong>highly susceptible</strong> to notification manipulation. You correctly identified only " + correct + " out of " + total + " notifications (" + accuracy + "% accuracy).";
        advice = "Start by turning off non-essential notifications. Your brain is being trained to react to every buzz. Break this pattern by reducing the noise.";
    }
    
    if (missed > 0) {
        insight += " You missed " + missed + " urgent notification" + (missed > 1 ? "s" : "") + ".";
        advice += " Remember: Not all buzzes are manipulation—some genuinely need your attention. The skill is knowing the difference.";
    }
    
    return { insight, advice };
}

// Generate personalized Level 2 insight
function generateLevel2Insight() {
    const meaningful = gameData.level2Meaningful || 0;
    const bait = gameData.level2Bait || 0;
    const incorrect = gameData.level2Incorrect || 0;
    const total = gameData.level2Total || 0;
    const accuracy = total > 0 ? Math.round(((meaningful + bait) / total) * 100) : 0;
    
    let insight = "";
    let advice = "";
    
    if (accuracy >= 80) {
        insight = "You have <strong>excellent content awareness</strong>. You correctly identified " + (meaningful + bait) + " out of " + total + " items (" + accuracy + "% accuracy).";
        advice = "You can see through algorithmic manipulation. Apply this skill to your real feeds—be intentional about what you consume.";
    } else if (accuracy >= 60) {
        insight = "You show <strong>good awareness</strong> but sometimes struggle to separate meaning from bait. You got " + (meaningful + bait) + " correct out of " + total + " items (" + accuracy + "% accuracy).";
        advice = "Practice asking: 'Does this add value to my life, or is it just designed to keep me scrolling?' This question helps you spot bait.";
    } else {
        insight = "You're <strong>easily pulled in by algorithmic bait</strong>. You correctly identified only " + (meaningful + bait) + " out of " + total + " items (" + accuracy + "% accuracy).";
        advice = "The feed is designed to hijack your attention. Start by curating your follows—only follow accounts that add genuine value to your life.";
    }
    
    if (incorrect > 0) {
        insight += " You miscategorized " + incorrect + " item" + (incorrect > 1 ? "s" : "") + ".";
        advice += " Remember: Meaningful content enriches you. Algorithmic bait drains you. Learn to feel the difference.";
    }
    
    return { insight, advice };
}

// Generate personalized Level 3 insight
function generateLevel3Insight() {
    const coinsRemaining = gameData.level3CoinsRemaining || 0;
    const activities = gameData.level3Activities || [];
    const quickGameCount = activities.filter(a => a === 'quick-game').length;
    const learnFactCount = activities.filter(a => a === 'learn-fact').length;
    const breatheCount = activities.filter(a => a === 'breathe').length;
    
    let insight = "";
    let advice = "";
    
    if (coinsRemaining >= 7) {
        insight = "You <strong>conserved your attention</strong>, ending with " + coinsRemaining + " coins remaining. You prioritized value over instant gratification.";
        advice = "You understand that attention is finite. Apply this mindset to real life—invest your focus in activities that truly matter.";
    } else if (coinsRemaining >= 3) {
        insight = "You <strong>balanced your attention spending</strong>, ending with " + coinsRemaining + " coins. You made some intentional choices.";
        advice = "You're learning to be more selective. Next time, try investing more in learning and breathing—they build your attention capacity.";
    } else {
        insight = "You <strong>spent your attention quickly</strong>, ending with " + coinsRemaining + " coin" + (coinsRemaining !== 1 ? "s" : "") + " remaining. You chose instant gratification over long-term value.";
        advice = "Your attention was drained by quick hits. In real life, these are the apps and activities that feel urgent but add little value. Start by reducing them.";
    }
    
    if (quickGameCount > 0) {
        insight += " You chose Quick Game " + quickGameCount + " time" + (quickGameCount > 1 ? "s" : "") + ".";
        advice += " Quick games offer instant reward but high cost. Notice when you're reaching for your phone for a 'quick check'—that's the same pattern.";
    }
    
    if (learnFactCount > 0) {
        insight += " You invested in learning " + learnFactCount + " time" + (learnFactCount > 1 ? "s" : "") + ".";
        advice += " Learning builds your mind. Make time for reading, courses, or deep conversations—they're investments in yourself.";
    }
    
    if (breatheCount > 0) {
        insight += " You took time to breathe " + breatheCount + " time" + (breatheCount > 1 ? "s" : "") + ".";
        advice += " Breathing doesn't cost attention—it restores it. Make this a daily practice, especially when you feel overwhelmed.";
    }
    
    return { insight, advice };
}

// Generate overall pattern insight
function generateOverallPatternInsight() {
    const level1Insight = generateLevel1Insight();
    const level2Insight = generateLevel2Insight();
    const level3Insight = generateLevel3Insight();
    
    let pattern = "";
    let whoYouAre = "";
    let howToImprove = "";
    
    // Determine overall pattern
    const level1Accuracy = gameData.level1Total > 0 ? Math.round((gameData.level1Correct / gameData.level1Total) * 100) : 0;
    const level2Accuracy = gameData.level2Total > 0 ? Math.round(((gameData.level2Meaningful + gameData.level2Bait) / gameData.level2Total) * 100) : 0;
    const coinsRemaining = gameData.level3CoinsRemaining || 0;
    
    if (level1Accuracy >= 70 && level2Accuracy >= 70 && coinsRemaining >= 5) {
        pattern = "You show <strong>strong digital awareness</strong> across all levels.";
        whoYouAre = "You're someone who can recognize manipulation, value meaningful content, and manage attention wisely. You have the skills to navigate the digital world intentionally.";
        howToImprove = "Your challenge is maintaining this awareness when you're tired, stressed, or bored. Build systems that support your good instincts—like notification filters and curated feeds.";
    } else if (level1Accuracy >= 50 && level2Accuracy >= 50 && coinsRemaining >= 3) {
        pattern = "You show <strong>moderate digital awareness</strong> with room for growth.";
        whoYouAre = "You're aware of digital manipulation but sometimes fall into its traps. You know what's good for you, but habits still pull you toward distraction.";
        howToImprove = "Focus on one area at a time. Start with notifications—turn off everything non-essential. Then curate your feeds. Finally, practice the 2-minute rule before opening apps.";
    } else {
        pattern = "You're <strong>highly reactive to digital triggers</strong> and need stronger boundaries.";
        whoYouAre = "You're someone whose attention is easily hijacked by digital design. Your brain has been trained to react to every notification, scroll, and quick hit. This isn't your fault—it's by design.";
        howToImprove = "Start small: Turn off all non-essential notifications for one week. Use app timers to limit social media. Create phone-free zones (meals, first hour after waking). Build one habit at a time.";
    }
    
    return { pattern, whoYouAre, howToImprove };
}

