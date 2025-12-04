// Level 1: Notification Triage
let level1Timer = null;
let notificationInterval = null;
let activeNotification = null;
let correctCount = 0;
let missedCount = 0;
let totalNotifications = 0;
let notificationsProcessed = [];

// Notification pool with type (urgent or manipulative)
const notificationPool = [
    // URGENT - Legitimate, time-sensitive notifications (ALWAYS OBVIOUS)
    { 
        title: 'Calendar', 
        text: 'Meeting starts in 5 minutes - Room 204', 
        type: 'urgent',
        icon: '📅',
        sound: 'reminder'
    },
    { 
        title: 'Messages', 
        text: 'Mom: Can you call me? It\'s important', 
        type: 'urgent',
        icon: '💬',
        sound: 'message'
    },
    { 
        title: 'Messages', 
        text: 'Sarah: Are you free? Need to talk', 
        type: 'urgent',
        icon: '💬',
        sound: 'message'
    },
    { 
        title: 'Messages', 
        text: 'Dad: Call me when you can', 
        type: 'urgent',
        icon: '💬',
        sound: 'message'
    },
    { 
        title: 'Messages', 
        text: 'Boss: Need to discuss project ASAP', 
        type: 'urgent',
        icon: '💬',
        sound: 'message'
    },
    { 
        title: 'Email', 
        text: 'Work: Deadline reminder - Due today at 5pm', 
        type: 'urgent',
        icon: '✉️',
        sound: 'email'
    },
    { 
        title: 'Email', 
        text: 'Important: Your appointment confirmation', 
        type: 'urgent',
        icon: '✉️',
        sound: 'email'
    },
    { 
        title: 'Bank', 
        text: 'Security Alert: Unusual activity detected', 
        type: 'urgent',
        icon: '🏦',
        sound: 'alert'
    },
    { 
        title: 'Alarm', 
        text: 'Wake up alarm - Time to get up', 
        type: 'urgent',
        icon: '⏰',
        sound: 'reminder'
    },
    { 
        title: 'Calendar', 
        text: 'Doctor appointment in 30 minutes - Dr. Smith', 
        type: 'urgent',
        icon: '📅',
        sound: 'reminder'
    },
    { 
        title: 'Calendar', 
        text: 'Time for shopping - Grocery list ready', 
        type: 'urgent',
        icon: '📅',
        sound: 'reminder'
    },
    { 
        title: 'Calendar', 
        text: 'Pick up kids from school - 3:00 PM', 
        type: 'urgent',
        icon: '📅',
        sound: 'reminder'
    },
    { 
        title: 'Email', 
        text: 'Flight confirmation - Check-in now required', 
        type: 'urgent',
        icon: '✉️',
        sound: 'email'
    },
    { 
        title: 'Phone', 
        text: 'Missed call from: Emergency contact', 
        type: 'urgent',
        icon: '📞',
        sound: 'alert'
    },
    
    // MANIPULATIVE - Designed to grab attention, not urgent (ALWAYS OBVIOUSLY MANIPULATIVE)
    { 
        title: 'Instagram', 
        text: '5 new likes on your post - Check it out!', 
        type: 'manipulative',
        icon: '📷',
        sound: 'like'
    },
    { 
        title: 'Shopping App', 
        text: 'Flash sale: 50% off everything! Limited time only!', 
        type: 'manipulative',
        icon: '🛒',
        sound: 'alert'
    },
    { 
        title: 'YouTube', 
        text: 'Trending video you might like - Watch now!', 
        type: 'manipulative',
        icon: '▶️',
        sound: 'video'
    },
    { 
        title: 'Twitter', 
        text: 'You have 3 new mentions - See what they said', 
        type: 'manipulative',
        icon: '🐦',
        sound: 'social'
    },
    { 
        title: 'News App', 
        text: 'You won\'t believe what happened! Click to read', 
        type: 'manipulative',
        icon: '📰',
        sound: 'news'
    },
    { 
        title: 'Game App', 
        text: 'Your energy is full! Come back and play now', 
        type: 'manipulative',
        icon: '🎮',
        sound: 'alert'
    },
    { 
        title: 'Shopping App', 
        text: 'Items in your cart are selling fast! Buy now!', 
        type: 'manipulative',
        icon: '🛒',
        sound: 'alert'
    },
    { 
        title: 'Social Media', 
        text: 'Someone viewed your profile - See who it was', 
        type: 'manipulative',
        icon: '👤',
        sound: 'social'
    },
    { 
        title: 'App Store', 
        text: 'You have 5 unread notifications - Tap to see', 
        type: 'manipulative',
        icon: '🔔',
        sound: 'alert'
    },
    { 
        title: 'Video App', 
        text: 'New content from creators you follow - Watch now', 
        type: 'manipulative',
        icon: '📺',
        sound: 'video'
    },
    { 
        title: 'Shopping App', 
        text: 'Special offer just for you! Don\'t miss out!', 
        type: 'manipulative',
        icon: '🛒',
        sound: 'alert'
    },
    { 
        title: 'Social Media', 
        text: 'Your friend posted something new - Check it out', 
        type: 'manipulative',
        icon: '📱',
        sound: 'social'
    },
    { 
        title: 'Entertainment', 
        text: 'New episode available - Binge watch now!', 
        type: 'manipulative',
        icon: '📺',
        sound: 'video'
    },
    { 
        title: 'Shopping App', 
        text: 'Last chance! Your favorite items are on sale', 
        type: 'manipulative',
        icon: '🛒',
        sound: 'alert'
    }
];

function initLevel1() {
    resetLevel1();
    
    const timerEl = document.getElementById('level1-timer');
    const notificationArea = document.getElementById('notification-area');
    const triageActions = document.getElementById('triage-actions');
    
    if (!timerEl || !notificationArea) return;
    
    // Initialize counters to 0 and update UI
    correctCount = 0;
    missedCount = 0;
    updateScoreDisplay();
    
    // Start timer (30 seconds)
    let timeLeft = 30;
    timerEl.textContent = timeLeft;
    
    level1Timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endLevel1();
        }
    }, 1000);
    
    // Setup triage buttons
    setupTriageButtons();
    
    // Start flooding notifications
    startNotificationFlood();
}

function resetLevel1() {
    // Clear all intervals
    if (level1Timer) clearInterval(level1Timer);
    if (notificationInterval) clearInterval(notificationInterval);
    
    // Clear notifications
    const notificationArea = document.getElementById('notification-area');
    if (notificationArea) {
        notificationArea.innerHTML = '';
    }
    
    // Reset tracking
    correctCount = 0;
    missedCount = 0;
    totalNotifications = 0;
    activeNotification = null;
    notificationsProcessed = [];
    
    // Hide triage actions
    const triageActions = document.getElementById('triage-actions');
    if (triageActions) {
        triageActions.style.display = 'none';
    }
}

function setupTriageButtons() {
    const urgentBtn = document.getElementById('urgent-btn');
    const manipulativeBtn = document.getElementById('manipulative-btn');
    
    if (urgentBtn) {
        urgentBtn.addEventListener('click', () => {
            handleTriageChoice('urgent');
        });
    }
    
    if (manipulativeBtn) {
        manipulativeBtn.addEventListener('click', () => {
            handleTriageChoice('manipulative');
        });
    }
}

function startNotificationFlood() {
    // Show first notification after 1 second
    setTimeout(() => {
        showNextNotification();
    }, 1000);
    
    // Then show notifications every 3-5 seconds (more seamless)
    notificationInterval = setInterval(() => {
        if (!activeNotification && level1Timer) {
            showNextNotification();
        }
    }, 3000 + Math.random() * 2000);
}

function showNextNotification() {
    if (activeNotification) return; // Wait for current one to be processed
    
    const notificationArea = document.getElementById('notification-area');
    const triageActions = document.getElementById('triage-actions');
    
    if (!notificationArea) return;
    
    // Get random notification
    const notif = notificationPool[Math.floor(Math.random() * notificationPool.length)];
    totalNotifications++;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification triage-notification';
    notification.dataset.type = notif.type;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 50px; height: 50px; border-radius: 10px; background: linear-gradient(135deg, #f5f5f5, #e0e0e0); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                ${notif.icon}
            </div>
            <div style="flex: 1;">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-text">${notif.text}</div>
            </div>
        </div>
    `;
    
    // Position notification
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.position = 'fixed';
    notification.style.zIndex = '1000';
    
    // Add entrance animation
    notification.style.opacity = '0';
    notification.style.scale = '0.9';
    
    notificationArea.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '1';
        notification.style.scale = '1';
    }, 10);
    
    // Show triage buttons
    if (triageActions) {
        triageActions.style.display = 'flex';
        triageActions.style.opacity = '0';
        setTimeout(() => {
            triageActions.style.transition = 'opacity 0.3s ease';
            triageActions.style.opacity = '1';
        }, 100);
    }
    
    // Play sound
    setTimeout(() => {
        playNotificationSound(notif.sound);
    }, 50);
    
    // Set as active
    activeNotification = {
        element: notification,
        data: notif
    };
    
    // Auto-dismiss after 7 seconds if not processed (smoother timing)
    const timeoutId = setTimeout(() => {
        if (activeNotification && activeNotification.element === notification) {
            handleNotificationTimeout();
        }
    }, 7000);
    
    // Store timeout ID for cleanup
    if (activeNotification) {
        activeNotification.timeoutId = timeoutId;
    }
}

function handleTriageChoice(choice) {
    if (!activeNotification) return;
    
    const notif = activeNotification.data;
    const notification = activeNotification.element;
    const isCorrect = (choice === notif.type);
    
    // Track result
    notificationsProcessed.push({
        notification: notif,
        userChoice: choice,
        correct: isCorrect,
        timestamp: Date.now()
    });
    
    // Update counters immediately BEFORE any other operations
    if (isCorrect) {
        correctCount++;
        gameData.notificationsClicked++; // Track for scoring
        // Show correct feedback
        notification.style.border = '3px solid #000000';
        notification.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
        notification.style.background = 'rgba(0, 0, 0, 0.1)';
    } else {
        missedCount++;
        // Show incorrect feedback
        notification.style.border = '3px solid #808080';
        notification.style.opacity = '0.6';
        notification.style.background = 'rgba(128, 128, 128, 0.1)';
    }
    
    // Update score display immediately - get elements first
    const correctEl = document.getElementById('correct-count');
    const missedEl = document.getElementById('missed-count');
    
    if (correctEl) {
        correctEl.textContent = correctCount;
    }
    if (missedEl) {
        missedEl.textContent = missedCount;
    }
    
    // Also call the function for game data update
    updateScoreDisplay();
    
    // Hide buttons immediately
    const triageActions = document.getElementById('triage-actions');
    if (triageActions) {
        triageActions.style.opacity = '0';
        triageActions.style.transition = 'opacity 0.2s ease';
    }
    
    // Dismiss notification smoothly
    setTimeout(() => {
        dismissNotification();
        // Show next notification after a brief pause
        setTimeout(() => {
            if (level1Timer) { // Only if level hasn't ended
                showNextNotification();
            }
        }, 500);
    }, 1200);
}

function handleNotificationTimeout() {
    if (!activeNotification) return;
    
    const notif = activeNotification.data;
    
    // If urgent notification was ignored, count as missed
    if (notif.type === 'urgent') {
        missedCount++;
    }
    // If manipulative notification times out, it's actually correct (they ignored it)
    else {
        correctCount++;
    }
    
    // Track timeout
    notificationsProcessed.push({
        notification: notif,
        userChoice: 'timeout',
        correct: (notif.type === 'manipulative'), // Correct if they ignored manipulative
        timestamp: Date.now()
    });
    
    // Update score display immediately
    const correctEl = document.getElementById('correct-count');
    const missedEl = document.getElementById('missed-count');
    
    if (correctEl) {
        correctEl.textContent = correctCount;
    }
    if (missedEl) {
        missedEl.textContent = missedCount;
    }
    
    updateScoreDisplay();
    
    // Hide buttons
    const triageActions = document.getElementById('triage-actions');
    if (triageActions) {
        triageActions.style.opacity = '0';
        triageActions.style.transition = 'opacity 0.2s ease';
    }
    
    dismissNotification();
    
    // Show next notification after brief pause
    setTimeout(() => {
        if (level1Timer) { // Only if level hasn't ended
            showNextNotification();
        }
    }, 500);
}

function dismissNotification() {
    const triageActions = document.getElementById('triage-actions');
    
    if (activeNotification) {
        // Clear timeout if exists
        if (activeNotification.timeoutId) {
            clearTimeout(activeNotification.timeoutId);
        }
        
        if (activeNotification.element) {
            const notification = activeNotification.element;
            notification.style.transition = 'all 0.4s ease';
            notification.style.opacity = '0';
            notification.style.scale = '0.8';
            notification.style.transform = 'translate(-50%, -60%)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }
    
    // Hide triage buttons
    if (triageActions) {
        triageActions.style.opacity = '0';
        triageActions.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
            triageActions.style.display = 'none';
        }, 200);
    }
    
    activeNotification = null;
}

function updateScoreDisplay() {
    const correctEl = document.getElementById('correct-count');
    const missedEl = document.getElementById('missed-count');
    
    // Force update with explicit check
    if (correctEl !== null) {
        correctEl.textContent = correctCount;
        correctEl.innerText = correctCount; // Double update to ensure it works
    }
    
    if (missedEl !== null) {
        missedEl.textContent = missedCount;
        missedEl.innerText = missedCount; // Double update to ensure it works
    }
    
    // Update game data
    gameData.totalNotifications = totalNotifications;
    gameData.notificationsClicked = correctCount;
    gameData.level1Correct = correctCount;
    gameData.level1Missed = missedCount;
    gameData.level1Total = totalNotifications;
}

// Sound generation using Web Audio API
function playNotificationSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different frequencies for different notification types
        const frequencies = {
            'message': 800,
            'like': 600,
            'alert': 1000,
            'video': 500,
            'social': 700,
            'email': 900,
            'news': 1100,
            'reminder': 750
        };
        
        oscillator.frequency.value = frequencies[type] || 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Fallback: silent if audio context fails
        console.log('Audio not available');
    }
}

function endLevel1() {
    // Clear all intervals
    if (level1Timer) clearInterval(level1Timer);
    if (notificationInterval) clearInterval(notificationInterval);
    
    // Dismiss any active notification
    if (activeNotification) {
        dismissNotification();
    }
    
    // Calculate accuracy
    const totalProcessed = notificationsProcessed.length;
    const accuracy = totalProcessed > 0 ? Math.round((correctCount / totalProcessed) * 100) : 0;
    
    // Update game data
    gameData.totalNotifications = totalNotifications;
    gameData.notificationsClicked = correctCount;
    gameData.level1Correct = correctCount;
    gameData.level1Missed = missedCount;
    gameData.level1Total = totalNotifications;
    
    // Show transition with personalized message
    let message = "You just experienced how notifications flood your attention. ";
    if (accuracy >= 80) {
        message += "Great job identifying urgent vs manipulative notifications!";
    } else if (accuracy >= 60) {
        message += "Good awareness! Practice will help you distinguish urgency from manipulation.";
    } else {
        message += "Not all buzzes deserve attention. Learning to triage is key.";
    }
    
    // Show transition (function defined in main.js)
    if (typeof showLevelTransition === 'function') {
        showLevelTransition(message);
    }
}
