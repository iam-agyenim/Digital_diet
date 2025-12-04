// Level 2: Scroll Cataract Surgery
let level2Timer = null;
let feedItems = [];
let selectedItem = null;
let meaningfulCount = 0;
let baitCount = 0;
let incorrectCount = 0;
let totalItemsProcessed = 0;
let itemsProcessed = [];
let feedScrollInterval = null;
let autoScrollSpeed = 1;

// Content pool - meaningful vs algorithmic bait
const contentPool = [
    // MEANINGFUL CONTENT - Valuable, educational, personal
    {
        type: 'meaningful',
        title: 'Friend\'s Life Update',
        content: 'Sarah shared photos from her graduation ceremony. Congratulations!',
        author: 'Sarah',
        icon: '👤',
        category: 'personal'
    },
    {
        type: 'meaningful',
        title: 'Educational Article',
        content: 'How to improve your focus: Evidence-based techniques from neuroscience research.',
        author: 'Science Daily',
        icon: '📚',
        category: 'education'
    },
    {
        type: 'meaningful',
        title: 'Family Photo',
        content: 'Mom posted: "Family dinner this Sunday at 6pm. Hope you can make it!"',
        author: 'Mom',
        icon: '👨‍👩‍👧',
        category: 'personal'
    },
    {
        type: 'meaningful',
        title: 'Work Announcement',
        content: 'Team meeting notes: Project timeline and next steps discussed.',
        author: 'Work Team',
        icon: '💼',
        category: 'work'
    },
    {
        type: 'meaningful',
        title: 'Recipe Share',
        content: 'Grandma\'s recipe: How to make her famous apple pie (with step-by-step photos).',
        author: 'Aunt Mary',
        icon: '🍎',
        category: 'personal'
    },
    {
        type: 'meaningful',
        title: 'News Article',
        content: 'Local community center opens new programs for residents. Registration starts Monday.',
        author: 'Local News',
        icon: '📰',
        category: 'community'
    },
    {
        type: 'meaningful',
        title: 'Friend\'s Achievement',
        content: 'Mike just got promoted! Celebrating his hard work and dedication.',
        author: 'Mike',
        icon: '🎉',
        category: 'personal'
    },
    {
        type: 'meaningful',
        title: 'Tutorial',
        content: 'Step-by-step guide: Learn a new skill in 30 minutes. Practical and actionable.',
        author: 'Skill Builder',
        icon: '🎓',
        category: 'education'
    },
    {
        type: 'meaningful',
        title: 'Event Invitation',
        content: 'You\'re invited: Community garden volunteer day this Saturday at 9am.',
        author: 'Community Group',
        icon: '🌱',
        category: 'community'
    },
    {
        type: 'meaningful',
        title: 'Health Tip',
        content: 'Evidence-based: 5 simple habits that improve sleep quality (backed by research).',
        author: 'Health Weekly',
        icon: '💤',
        category: 'health'
    },
    
    // ALGORITHMIC BAIT - Designed to keep you scrolling, low value
    {
        type: 'bait',
        title: 'You Won\'t Believe',
        content: 'This one trick will change your life! Click to see what happens next...',
        author: 'Trending Now',
        icon: '🔥',
        category: 'clickbait'
    },
    {
        type: 'bait',
        title: 'Sponsored: Shop Now',
        content: 'People are obsessed with this product! Limited stock - buy before it\'s gone!',
        author: 'Ad',
        icon: '🛒',
        category: 'advertisement'
    },
    {
        type: 'bait',
        title: 'Viral Video',
        content: 'This video is breaking the internet! Watch before it gets taken down!',
        author: 'Viral Content',
        icon: '📹',
        category: 'entertainment'
    },
    {
        type: 'bait',
        title: 'Trending Now',
        content: 'Everyone is talking about this! See what all the buzz is about...',
        author: 'For You',
        icon: '⭐',
        category: 'trending'
    },
    {
        type: 'bait',
        title: 'You May Like',
        content: 'Based on your viewing history: More videos just like this one!',
        author: 'Recommended',
        icon: '🎯',
        category: 'algorithm'
    },
    {
        type: 'bait',
        title: 'Flash Sale',
        content: 'Only 2 hours left! 80% off everything - don\'t miss this deal!',
        author: 'Shopping App',
        icon: '⚡',
        category: 'advertisement'
    },
    {
        type: 'bait',
        title: 'Breaking News',
        content: 'Shocking revelation that will blow your mind! Read more to find out...',
        author: 'News Feed',
        icon: '📢',
        category: 'clickbait'
    },
    {
        type: 'bait',
        title: 'Your Friend Liked',
        content: '3 of your friends liked this post. See what caught their attention!',
        author: 'Social Feed',
        icon: '👥',
        category: 'social-proof'
    },
    {
        type: 'bait',
        title: 'Continue Watching',
        content: 'You\'re halfway through this series. Binge the next 5 episodes now!',
        author: 'Streaming',
        icon: '▶️',
        category: 'engagement'
    },
    {
        type: 'bait',
        title: 'Personalized For You',
        content: 'We picked this just for you! Based on your interests and behavior.',
        author: 'Algorithm',
        icon: '🤖',
        category: 'algorithm'
    },
    {
        type: 'bait',
        title: 'Limited Time Offer',
        content: 'Special deal expires in 1 hour! Act now before prices go back up!',
        author: 'Deals App',
        icon: '⏰',
        category: 'advertisement'
    },
    {
        type: 'bait',
        title: 'Trending Topic',
        content: 'Join 1M+ people discussing this right now! Don\'t be left out...',
        author: 'Trending',
        icon: '📈',
        category: 'fomo'
    }
];

function initLevel2() {
    resetLevel2();
    
    const timerEl = document.getElementById('level2-timer');
    const feedContainer = document.getElementById('feed-container');
    
    if (!timerEl || !feedContainer) return;
    
    // Initialize counters to 0 and update score display
    meaningfulCount = 0;
    baitCount = 0;
    incorrectCount = 0;
    updateScoreDisplay();
    
    // Create initial feed items
    createFeedItems();
    
    // Start timer (30 seconds)
    let timeLeft = 30;
    timerEl.textContent = timeLeft;
    
    level2Timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endLevel2();
        }
    }, 1000);
    
    // Setup content action buttons
    setupContentButtons();
    
    // Start auto-scrolling feed
    startAutoScroll();
    
    // Add more items as user scrolls
    setupInfiniteScroll();
}

function resetLevel2() {
    if (level2Timer) clearInterval(level2Timer);
    if (feedScrollInterval) clearInterval(feedScrollInterval);
    
    feedItems = [];
    selectedItem = null;
    meaningfulCount = 0;
    baitCount = 0;
    incorrectCount = 0;
    totalItemsProcessed = 0;
    itemsProcessed = [];
    autoScrollSpeed = 1;
    
    const feedContainer = document.getElementById('feed-container');
    if (feedContainer) {
        feedContainer.innerHTML = '';
        feedContainer.scrollTop = 0;
    }
    
    // Hide content actions
    const contentActions = document.getElementById('content-actions');
    if (contentActions) {
        contentActions.style.display = 'none';
    }
}

function createFeedItems() {
    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) return;
    
    // Create 20 initial items with better mix (alternate pattern for seamless flow)
    const meaningfulItems = contentPool.filter(c => c.type === 'meaningful');
    const baitItems = contentPool.filter(c => c.type === 'bait');
    
    for (let i = 0; i < 20; i++) {
        let content;
        // Alternate pattern: meaningful, bait, meaningful, bait, etc. for first 10
        // Then random mix for variety
        if (i < 10) {
            content = (i % 2 === 0) 
                ? meaningfulItems[Math.floor(Math.random() * meaningfulItems.length)]
                : baitItems[Math.floor(Math.random() * baitItems.length)];
        } else {
            // Random mix after first 10 for natural flow
            content = contentPool[Math.floor(Math.random() * contentPool.length)];
        }
        
        const item = createFeedItem(content, i);
        feedContainer.appendChild(item);
        feedItems.push({ element: item, content: content, id: i });
    }
}

function getRandomContent() {
    return contentPool[Math.floor(Math.random() * contentPool.length)];
}

function createFeedItem(content, id) {
    const item = document.createElement('div');
    item.className = 'feed-item-content';
    item.dataset.itemId = id;
    item.dataset.contentType = content.type;
    
    // Different styling for meaningful vs bait
    const bgColor = content.type === 'meaningful' 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(255, 255, 255, 0.03)';
    
    item.style.background = bgColor;
    item.style.border = `1px solid ${content.type === 'meaningful' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`;
    
    item.innerHTML = `
        <div class="feed-item-header">
            <div class="feed-icon">${content.icon}</div>
            <div class="feed-author">${content.author}</div>
        </div>
        <div class="feed-title">${content.title}</div>
        <div class="feed-text">${content.content}</div>
        <div class="feed-category">${content.category}</div>
    `;
    
    // Add click handler
    item.addEventListener('click', () => {
        selectFeedItem(item, content);
    });
    
    return item;
}

function selectFeedItem(item, content) {
    // Don't allow selection of already processed items
    if (item.classList.contains('processed')) {
        return;
    }
    
    // Deselect previous smoothly
    if (selectedItem && selectedItem.element) {
        selectedItem.element.classList.remove('selected');
    }
    
    // Select new item
    item.classList.add('selected');
    selectedItem = { element: item, content: content };
    
    // Show action buttons smoothly
    const contentActions = document.getElementById('content-actions');
    if (contentActions) {
        contentActions.style.display = 'flex';
        contentActions.style.opacity = '0';
        contentActions.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            contentActions.style.opacity = '1';
        }, 10);
    }
}

function setupContentButtons() {
    const meaningfulBtn = document.getElementById('meaningful-btn');
    const baitBtn = document.getElementById('bait-btn');
    
    if (meaningfulBtn) {
        meaningfulBtn.addEventListener('click', () => {
            handleContentChoice('meaningful');
        });
    }
    
    if (baitBtn) {
        baitBtn.addEventListener('click', () => {
            handleContentChoice('bait');
        });
    }
}

function handleContentChoice(choice) {
    if (!selectedItem) return;
    
    const content = selectedItem.content;
    const item = selectedItem.element;
    const isCorrect = (choice === content.type);
    
    // Track result
    itemsProcessed.push({
        content: content,
        userChoice: choice,
        correct: isCorrect,
        timestamp: Date.now()
    });
    
    totalItemsProcessed++;
    
    // Update counters immediately
    if (isCorrect) {
        if (choice === 'meaningful') {
            meaningfulCount++;
        } else {
            baitCount++;
        }
        
        // Show correct feedback smoothly
        item.style.transition = 'all 0.3s ease';
        item.style.border = '2px solid #000000';
        item.style.background = 'rgba(0, 0, 0, 0.2)';
        item.style.opacity = '0.7';
        item.classList.add('processed', 'correct');
    } else {
        // Incorrect choice
        incorrectCount++;
        
        // Show incorrect feedback smoothly
        item.style.transition = 'all 0.3s ease';
        item.style.border = '2px solid #808080';
        item.style.opacity = '0.5';
        item.style.background = 'rgba(128, 128, 128, 0.1)';
        item.classList.add('processed', 'incorrect');
    }
    
    // Update score immediately - update DOM directly for instant feedback
    const meaningfulEl = document.getElementById('meaningful-count');
    const baitEl = document.getElementById('bait-count');
    const incorrectEl = document.getElementById('incorrect-count');
    
    if (meaningfulEl) {
        meaningfulEl.textContent = meaningfulCount;
    }
    if (baitEl) {
        baitEl.textContent = baitCount;
    }
    if (incorrectEl) {
        incorrectEl.textContent = incorrectCount;
    }
    
    // Also call the function for game data update
    updateScoreDisplay();
    
    // Deselect and hide buttons smoothly
    item.classList.remove('selected');
    selectedItem = null;
    
    const contentActions = document.getElementById('content-actions');
    if (contentActions) {
        contentActions.style.opacity = '0';
        contentActions.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
            contentActions.style.display = 'none';
        }, 200);
    }
}

function updateScoreDisplay() {
    const meaningfulEl = document.getElementById('meaningful-count');
    const baitEl = document.getElementById('bait-count');
    const incorrectEl = document.getElementById('incorrect-count');
    
    if (meaningfulEl) {
        meaningfulEl.textContent = meaningfulCount;
    }
    if (baitEl) {
        baitEl.textContent = baitCount;
    }
    if (incorrectEl) {
        incorrectEl.textContent = incorrectCount;
    }
    
    // Update game data
    gameData.totalScrolls = totalItemsProcessed;
}

function startAutoScroll() {
    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) return;
    
    // Smooth auto-scroll with better pacing
    feedScrollInterval = setInterval(() => {
        if (feedContainer && level2Timer) {
            feedContainer.scrollTop += autoScrollSpeed;
            
            // Gradually increase speed (slower, more natural)
            if (autoScrollSpeed < 1.5) {
                autoScrollSpeed += 0.005;
            }
        }
    }, 50);
}

function setupInfiniteScroll() {
    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) return;
    
    feedContainer.addEventListener('scroll', () => {
        // Check if near bottom
        const scrollBottom = feedContainer.scrollHeight - feedContainer.scrollTop - feedContainer.clientHeight;
        
        if (scrollBottom < 500) {
            // Add more items
            addMoreFeedItems();
        }
    });
}

function addMoreFeedItems() {
    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) return;
    
    // Add 8 more items with good mix
    const meaningfulItems = contentPool.filter(c => c.type === 'meaningful');
    const baitItems = contentPool.filter(c => c.type === 'bait');
    const currentCount = feedItems.length;
    
    for (let i = 0; i < 8; i++) {
        let content;
        // Mix pattern: 2 meaningful, 2 bait, 2 meaningful, 2 bait for natural flow
        const patternIndex = i % 4;
        if (patternIndex < 2) {
            content = meaningfulItems[Math.floor(Math.random() * meaningfulItems.length)];
        } else {
            content = baitItems[Math.floor(Math.random() * baitItems.length)];
        }
        
        const item = createFeedItem(content, currentCount + i);
        feedContainer.appendChild(item);
        feedItems.push({ element: item, content: content, id: currentCount + i });
    }
}

function endLevel2() {
    // Clear all intervals
    if (level2Timer) clearInterval(level2Timer);
    if (feedScrollInterval) clearInterval(feedScrollInterval);
    
    // Calculate accuracy
    const correctChoices = itemsProcessed.filter(item => item.correct).length;
    const total = itemsProcessed.length;
    const accuracy = total > 0 ? Math.round((correctChoices / total) * 100) : 0;
    
    // Update game data
    gameData.totalScrolls = totalItemsProcessed;
    gameData.impulseScrolls = itemsProcessed.filter(item => !item.correct).length;
    gameData.level2Meaningful = meaningfulCount;
    gameData.level2Bait = baitCount;
    gameData.level2Incorrect = incorrectCount;
    gameData.level2Total = totalItemsProcessed;
    
    // Show transition with personalized message
    let message = "You just experienced how algorithms flood feeds with bait. ";
    if (accuracy >= 80) {
        message += "Excellent! You can spot meaningful content from manipulative bait.";
    } else if (accuracy >= 60) {
        message += "Good awareness! Intentional consumption helps you focus on what matters.";
    } else {
        message += "Practice identifying algorithmic bait. Intentional consumption is key.";
    }
    
    // Show transition (function defined in main.js)
    if (typeof showLevelTransition === 'function') {
        showLevelTransition(message);
    }
}
