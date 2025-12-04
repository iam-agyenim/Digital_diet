// Navigation and flow control
let currentScreen = 'home-screen';
let currentLevel = 0;
let awarenessScreenIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof initGameData === 'function') {
            initGameData();
        }
        setupEventListeners();
        setupAwarenessScroll();
        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Error initializing game:', error);
    }
});

function setupEventListeners() {
    // Start button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        console.log('Start button found, adding event listener');
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Start button clicked!');
            showScreen('awareness-intro');
        });
        // Also try direct onclick as backup
        startBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Start button onclick triggered!');
            showScreen('awareness-intro');
        };
    } else {
        console.error('Start button not found!');
    }
    
    // Begin game button
    const beginGameBtn = document.getElementById('begin-game-btn');
    if (beginGameBtn) {
        beginGameBtn.addEventListener('click', () => {
            startGame();
        });
    }
    
    // Next level button
    const nextLevelBtn = document.getElementById('next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.addEventListener('click', () => {
            continueToNextLevel();
        });
    }
    
    // Restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            restartGame();
        });
    }
    
    // Submit reflection button
    const submitReflectionBtn = document.getElementById('submit-reflection-btn');
    if (submitReflectionBtn) {
        submitReflectionBtn.addEventListener('click', () => {
            submitReflection();
        });
    }
    
    // View reflections button
    const viewReflectionsBtn = document.getElementById('view-reflections-btn');
    if (viewReflectionsBtn) {
        viewReflectionsBtn.addEventListener('click', () => {
            showReflectionsPage();
        });
    }
    
    // Back to game button
    const backToGameBtn = document.getElementById('back-to-game-btn');
    if (backToGameBtn) {
        backToGameBtn.addEventListener('click', () => {
            showScreen('final-awareness');
        });
    }
}

function showScreen(screenId) {
    console.log('showScreen called with:', screenId);
    
    // Smooth transition
    const currentScreenEl = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(screenId);
    
    if (!targetScreen) {
        console.error('Target screen not found:', screenId);
        alert('Screen not found: ' + screenId);
        return;
    }
    
    console.log('Current screen:', currentScreenEl?.id, 'Target screen:', targetScreen.id);
    
    if (currentScreenEl && currentScreenEl !== targetScreen) {
        currentScreenEl.style.opacity = '0';
        setTimeout(() => {
            currentScreenEl.classList.remove('active');
            targetScreen.classList.add('active');
            // Force reflow
            targetScreen.offsetHeight;
            targetScreen.style.opacity = '1';
            currentScreen = screenId;
            console.log('Screen transitioned to:', screenId);
        }, 300);
    } else {
        // No current screen or same screen
        if (currentScreenEl) {
            currentScreenEl.classList.remove('active');
        }
        targetScreen.classList.add('active');
        targetScreen.style.opacity = '1';
        currentScreen = screenId;
        console.log('Screen set to:', screenId);
    }
}

function setupAwarenessScroll() {
    const scrollContainer = document.querySelector('#awareness-intro .scroll-container');
    const screens = document.querySelectorAll('#awareness-intro .scroll-screen');
    const dots = document.querySelectorAll('#awareness-intro .scroll-dot');
    
    if (!scrollContainer) {
        console.log('Awareness scroll container not found (this is OK if not on awareness intro screen)');
        return;
    }
    
    // Create notification bubbles for screen 1
    createNotificationBubbles();
    
    scrollContainer.addEventListener('scroll', () => {
        const scrollTop = scrollContainer.scrollTop;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.round(scrollTop / windowHeight);
        const maxIndex = screens.length - 1;
        
        // Update active screen
        screens.forEach((screen, index) => {
            const scrollIndicator = screen.querySelector('.scroll-down-indicator');
            
            if (index === currentIndex) {
                screen.classList.add('active');
                // Hide scroll indicator on last screen or if scrolled past 80% of screen
                if (index === maxIndex || (scrollTop % windowHeight) > windowHeight * 0.8) {
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '0';
                    }
                } else {
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '1';
                    }
                }
            } else {
                screen.classList.remove('active');
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = '0';
                }
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        awarenessScreenIndex = currentIndex;
    });
}

function createNotificationBubbles() {
    const bubbleContainer = document.querySelector('.notification-bubbles');
    if (!bubbleContainer) return;
    
    const notifications = [
        'New message from Sarah',
        '3 new likes on your post',
        'Flash sale: 50% off!',
        'Trending video for you',
        'Someone viewed your story'
    ];
    
    notifications.forEach((text, index) => {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'notification-bubble';
            bubble.textContent = text;
            bubble.style.animationDelay = `${index * 0.2}s`;
            bubbleContainer.appendChild(bubble);
        }, index * 500);
    });
}

function startGame() {
    showScreen('game-container');
    startLevel1();
}

function startLevel1() {
    currentLevel = 1;
    const level1Screen = document.getElementById('level-1');
    const otherLevels = document.querySelectorAll('.level-screen');
    
    otherLevels.forEach(level => {
        level.classList.remove('active');
        level.style.opacity = '0';
        level.style.transform = 'translateY(20px)';
    });
    
    level1Screen.classList.add('active');
    // Force reflow for smooth transition
    setTimeout(() => {
        level1Screen.style.opacity = '1';
        level1Screen.style.transform = 'translateY(0)';
        if (typeof initLevel1 === 'function') {
            initLevel1();
        }
    }, 50);
}

function startLevel2() {
    currentLevel = 2;
    const level2Screen = document.getElementById('level-2');
    const otherLevels = document.querySelectorAll('.level-screen');
    
    otherLevels.forEach(level => {
        level.classList.remove('active');
        level.style.opacity = '0';
        level.style.transform = 'translateY(20px)';
    });
    
    level2Screen.classList.add('active');
    setTimeout(() => {
        level2Screen.style.opacity = '1';
        level2Screen.style.transform = 'translateY(0)';
        if (typeof initLevel2 === 'function') {
            initLevel2();
        }
    }, 50);
}

function startLevel3() {
    currentLevel = 3;
    const level3Screen = document.getElementById('level-3');
    const otherLevels = document.querySelectorAll('.level-screen');
    
    otherLevels.forEach(level => {
        level.classList.remove('active');
        level.style.opacity = '0';
        level.style.transform = 'translateY(20px)';
    });
    
    level3Screen.classList.add('active');
    setTimeout(() => {
        level3Screen.style.opacity = '1';
        level3Screen.style.transform = 'translateY(0)';
        if (typeof initLevel3 === 'function') {
            initLevel3();
        }
    }, 50);
}

function showLevelTransition(message) {
    const transition = document.getElementById('level-transition');
    const messageEl = document.getElementById('transition-message');
    
    if (transition && messageEl) {
        messageEl.textContent = message;
        transition.classList.add('active');
        // Force reflow for smooth transition
        setTimeout(() => {
            transition.style.opacity = '1';
        }, 10);
    }
}

function hideLevelTransition() {
    const transition = document.getElementById('level-transition');
    if (transition) {
        transition.style.opacity = '0';
        setTimeout(() => {
            transition.classList.remove('active');
        }, 300);
    }
}

function continueToNextLevel() {
    hideLevelTransition();
    
    if (currentLevel === 1) {
        startLevel2();
    } else if (currentLevel === 2) {
        startLevel3();
    } else if (currentLevel === 3) {
        // End level 3 and show final awareness
        if (typeof endLevel3 === 'function') {
            endLevel3();
        }
        showReport();
    }
}

function showReport() {
    showScreen('final-awareness');
    populateFinalAwareness();
    setupFinalAwarenessScroll();
}

function populateFinalAwareness() {
    // Get personalized insights
    const level1Data = generateLevel1Insight();
    const level2Data = generateLevel2Insight();
    const level3Data = generateLevel3Insight();
    const overallData = generateOverallPatternInsight();
    
    // Update Level 1 section
    const level1Content = document.querySelector('#final-awareness .scroll-screen[data-screen="2"] .awareness-content');
    if (level1Content) {
        level1Content.innerHTML = `
            <p>This level measured how well you can distinguish between what is <span class="highlight">truly urgent</span> and what is designed to manipulate your attention.</p>
            <p style="margin-top: 1.5rem;"><strong>Your performance:</strong></p>
            <div style="margin-top: 1rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--accent-white);">
                ${level1Data.insight}
            </div>
            <p style="margin-top: 1.5rem;"><strong>How to improve:</strong></p>
            <p style="margin-top: 1rem;">${level1Data.advice}</p>
        `;
    }
    
    // Update Level 2 section
    const level2Content = document.querySelector('#final-awareness .scroll-screen[data-screen="3"] .awareness-content');
    if (level2Content) {
        level2Content.innerHTML = `
            <p>Here, you examined content the way a surgeon examines a lens — separating <span class="highlight">clarity from distortion</span>.</p>
            <p style="margin-top: 1.5rem;"><strong>Your performance:</strong></p>
            <div style="margin-top: 1rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--accent-white);">
                ${level2Data.insight}
            </div>
            <p style="margin-top: 1.5rem;"><strong>How to improve:</strong></p>
            <p style="margin-top: 1rem;">${level2Data.advice}</p>
        `;
    }
    
    // Update Level 3 section
    const level3Content = document.querySelector('#final-awareness .scroll-screen[data-screen="4"] .awareness-content');
    if (level3Content) {
        level3Content.innerHTML = `
            <p>This level turned your attention into a <span class="highlight">currency</span> — something limited, valuable, and spendable.</p>
            <p style="margin-top: 1.5rem;"><strong>Your performance:</strong></p>
            <div style="margin-top: 1rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--accent-white);">
                ${level3Data.insight}
            </div>
            <p style="margin-top: 1.5rem;"><strong>How to improve:</strong></p>
            <p style="margin-top: 1rem;">${level3Data.advice}</p>
        `;
    }
    
    // Update Overall Pattern section
    const overallContent = document.querySelector('#final-awareness .scroll-screen[data-screen="5"] .awareness-content');
    if (overallContent) {
        overallContent.innerHTML = `
            <p style="margin-top: 1rem; font-size: 1.2rem; font-weight: 600;">${overallData.pattern}</p>
            <p style="margin-top: 2rem;"><strong>Who you are:</strong></p>
            <p style="margin-top: 1rem; font-style: italic; line-height: 1.8;">${overallData.whoYouAre}</p>
            <p style="margin-top: 2rem;"><strong>How to get over it:</strong></p>
            <p style="margin-top: 1rem; line-height: 1.8;">${overallData.howToImprove}</p>
        `;
    }
}

function setupFinalAwarenessScroll() {
    const scrollContainer = document.querySelector('#final-awareness .scroll-container');
    const screens = document.querySelectorAll('#final-awareness .scroll-screen');
    const dots = document.querySelectorAll('#final-awareness .scroll-dot');
    
    if (!scrollContainer) return;
    
    // Save reflection to localStorage when user types
    const reflectionInput = document.getElementById('reflection-input');
    if (reflectionInput) {
        // Load saved reflection if exists
        const savedReflection = localStorage.getItem('digitalDietReflection');
        if (savedReflection) {
            reflectionInput.value = savedReflection;
        }
        
        reflectionInput.addEventListener('input', () => {
            localStorage.setItem('digitalDietReflection', reflectionInput.value);
        });
    }
    
    scrollContainer.addEventListener('scroll', () => {
        const scrollTop = scrollContainer.scrollTop;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.round(scrollTop / windowHeight);
        
        // Update active screen
        screens.forEach((screen, index) => {
            const scrollIndicator = screen.querySelector('.scroll-down-indicator');
            
            if (index === currentIndex) {
                screen.classList.add('active');
                // Hide scroll indicator on last screen
                if (index === screens.length - 1) {
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '0';
                    }
                } else {
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '1';
                    }
                }
            } else {
                screen.classList.remove('active');
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = '0';
                }
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
}

// Reflection submission and community features
function submitReflection() {
    const reflectionInput = document.getElementById('reflection-input');
    if (!reflectionInput || !reflectionInput.value.trim()) {
        alert('Please write a reflection before submitting.');
        return;
    }
    
    const reflectionText = reflectionInput.value.trim();
    
    // Create reflection object
    const reflection = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text: reflectionText,
        timestamp: new Date().toISOString(),
        likes: 0,
        likedBy: [], // Track who liked (using localStorage key)
        comments: []
    };
    
    // Get existing reflections
    const reflections = getReflections();
    reflections.unshift(reflection); // Add to beginning
    
    // Save to localStorage
    localStorage.setItem('digitalDietReflections', JSON.stringify(reflections));
    
    // Clear the input
    reflectionInput.value = '';
    localStorage.removeItem('digitalDietReflection');
    
    // Show success message
    alert('Your reflection has been shared anonymously! Thank you for contributing.');
    
    // Optionally navigate to reflections page
    showReflectionsPage();
}

function getReflections() {
    const stored = localStorage.getItem('digitalDietReflections');
    const reflections = stored ? JSON.parse(stored) : [];
    
    // Filter out reflections older than 2 hours
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    
    const validReflections = reflections.filter(reflection => {
        const reflectionDate = new Date(reflection.timestamp);
        return reflectionDate > twoHoursAgo;
    });
    
    // If any reflections were removed, update localStorage
    if (validReflections.length !== reflections.length) {
        localStorage.setItem('digitalDietReflections', JSON.stringify(validReflections));
    }
    
    return validReflections;
}

function showReflectionsPage() {
    // Clean up expired reflections before showing
    getReflections(); // This will automatically remove expired ones
    showScreen('reflections-page');
    loadReflections();
}

function loadReflections() {
    // Get reflections (this will automatically filter out expired ones)
    const reflections = getReflections();
    const reflectionsList = document.getElementById('reflections-list');
    const noReflections = document.getElementById('no-reflections');
    
    if (!reflectionsList) return;
    
    if (reflections.length === 0) {
        reflectionsList.style.display = 'none';
        if (noReflections) noReflections.style.display = 'block';
        return;
    }
    
    if (noReflections) noReflections.style.display = 'none';
    reflectionsList.style.display = 'block';
    reflectionsList.innerHTML = '';
    
    reflections.forEach(reflection => {
        const reflectionCard = createReflectionCard(reflection);
        reflectionsList.appendChild(reflectionCard);
    });
}

function createReflectionCard(reflection) {
    const card = document.createElement('div');
    card.className = 'reflection-card';
    card.dataset.id = reflection.id;
    
    const date = new Date(reflection.timestamp);
    const timeAgo = getTimeAgo(date);
    
    // Check if user has liked this reflection
    const userLikes = getUserLikes();
    const isLiked = userLikes.includes(reflection.id);
    
    card.innerHTML = `
        <div class="reflection-content">
            <p class="reflection-text">${escapeHtml(reflection.text)}</p>
            <div class="reflection-meta">
                <span class="reflection-time">${timeAgo}</span>
                <span class="reflection-anonymous">Anonymous</span>
            </div>
        </div>
        <div class="reflection-actions">
            <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${reflection.id}">
                <span class="like-icon">${isLiked ? '❤️' : '🤍'}</span>
                <span class="like-count">${reflection.likes || 0}</span>
            </button>
            <button class="comment-btn" data-id="${reflection.id}">
                <span class="comment-icon">💬</span>
                <span class="comment-count">${reflection.comments ? reflection.comments.length : 0}</span>
            </button>
        </div>
        <div class="comments-section" id="comments-${reflection.id}" style="display: none;">
            <div class="comments-list" id="comments-list-${reflection.id}">
                ${renderComments(reflection.comments || [])}
            </div>
            <div class="comment-input-container">
                <textarea class="comment-input" placeholder="Write a comment..." data-id="${reflection.id}"></textarea>
                <button class="submit-comment-btn" data-id="${reflection.id}">Post Comment</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => toggleLike(reflection.id));
    
    const commentBtn = card.querySelector('.comment-btn');
    commentBtn.addEventListener('click', () => toggleComments(reflection.id));
    
    const submitCommentBtn = card.querySelector('.submit-comment-btn');
    submitCommentBtn.addEventListener('click', () => submitComment(reflection.id));
    
    return card;
}

function toggleLike(reflectionId) {
    const reflections = getReflections(); // This filters expired reflections
    const reflection = reflections.find(r => r.id === reflectionId);
    if (!reflection) return; // Reflection might have expired
    
    const userLikes = getUserLikes();
    const isLiked = userLikes.includes(reflectionId);
    
    if (isLiked) {
        // Unlike
        reflection.likes = Math.max(0, (reflection.likes || 0) - 1);
        const newLikes = userLikes.filter(id => id !== reflectionId);
        localStorage.setItem('digitalDietUserLikes', JSON.stringify(newLikes));
    } else {
        // Like
        reflection.likes = (reflection.likes || 0) + 1;
        userLikes.push(reflectionId);
        localStorage.setItem('digitalDietUserLikes', JSON.stringify(userLikes));
    }
    
    // Save updated reflections (only valid ones)
    localStorage.setItem('digitalDietReflections', JSON.stringify(reflections));
    
    // Reload reflections
    loadReflections();
}

function getUserLikes() {
    const stored = localStorage.getItem('digitalDietUserLikes');
    return stored ? JSON.parse(stored) : [];
}

function toggleComments(reflectionId) {
    const commentsSection = document.getElementById(`comments-${reflectionId}`);
    if (commentsSection) {
        commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
    }
}

function submitComment(reflectionId) {
    const commentInput = document.querySelector(`.comment-input[data-id="${reflectionId}"]`);
    if (!commentInput || !commentInput.value.trim()) {
        alert('Please write a comment.');
        return;
    }
    
    const commentText = commentInput.value.trim();
    const reflections = getReflections(); // This filters expired reflections
    const reflection = reflections.find(r => r.id === reflectionId);
    
    if (!reflection) {
        alert('This reflection has expired and can no longer be commented on.');
        loadReflections(); // Reload to update the view
        return;
    }
    
    if (!reflection.comments) {
        reflection.comments = [];
    }
    
    const comment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text: commentText,
        timestamp: new Date().toISOString(),
        author: 'Anonymous'
    };
    
    reflection.comments.push(comment);
    localStorage.setItem('digitalDietReflections', JSON.stringify(reflections));
    
    // Clear input
    commentInput.value = '';
    
    // Reload reflections
    loadReflections();
    
    // Keep comments section open
    setTimeout(() => {
        const commentsSection = document.getElementById(`comments-${reflectionId}`);
        if (commentsSection) {
            commentsSection.style.display = 'block';
        }
    }, 100);
}

function renderComments(comments) {
    if (!comments || comments.length === 0) {
        return '<p class="no-comments">No comments yet. Be the first to comment!</p>';
    }
    
    return comments.map(comment => {
        const date = new Date(comment.timestamp);
        const timeAgo = getTimeAgo(date);
        return `
            <div class="comment-item">
                <p class="comment-text">${escapeHtml(comment.text)}</p>
                <div class="comment-meta">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${timeAgo}</span>
                </div>
            </div>
        `;
    }).join('');
}

function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function restartGame() {
    initGameData();
    showScreen('home-screen');
    currentLevel = 0;
    
    // Reset all level states
    if (typeof resetLevel1 === 'function') resetLevel1();
    if (typeof resetLevel2 === 'function') resetLevel2();
    if (typeof resetLevel3 === 'function') resetLevel3();
}

