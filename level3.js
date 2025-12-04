// Level 3: Your Attention Wallet
let activityTimer = null;
let attentionCoins = 10;
let currentActivity = null;
let activitiesCompleted = [];

const facts = [
    "The human brain uses about 20% of the body's total energy, despite being only 2% of body weight.",
    "Neuroscientists found that taking breaks improves focus and creativity by allowing the brain to process information.",
    "The average person has about 6,000 thoughts per day, and many are repetitive patterns.",
    "Deep breathing activates the parasympathetic nervous system, reducing stress and improving focus.",
    "Studies show that mindfulness practices can physically change brain structure, increasing gray matter in areas related to attention.",
    "The 'attention economy' means your focus is worth more than ever - companies compete for it constantly.",
    "Multitasking reduces productivity by up to 40% because the brain switches between tasks inefficiently.",
    "Taking a 20-second break every 20 minutes can significantly improve sustained attention.",
    "The prefrontal cortex, responsible for decision-making, gets fatigued from constant choices - this is called 'decision fatigue'.",
    "Research shows that people who practice meditation have better attention control and less mind-wandering."
];

function initLevel3() {
    resetLevel3();
    
    const quickGameBtn = document.getElementById('quick-game-btn');
    const learnFactBtn = document.getElementById('learn-fact-btn');
    const breatheBtn = document.getElementById('breathe-btn');
    
    // Update coin display
    updateCoinDisplay();
    
    // Setup button handlers
    if (quickGameBtn) {
        quickGameBtn.addEventListener('click', () => {
            handleQuickGame();
        });
    }
    
    if (learnFactBtn) {
        learnFactBtn.addEventListener('click', () => {
            handleLearnFact();
        });
    }
    
    if (breatheBtn) {
        breatheBtn.addEventListener('click', () => {
            handleBreathe();
        });
    }
    
    // Make Quick Game button pulse enticingly
    startPulsingAnimation();
    
    // Check button states initially
    updateButtonStates();
}

function resetLevel3() {
    if (activityTimer) clearInterval(activityTimer);
    
    attentionCoins = 10;
    currentActivity = null;
    activitiesCompleted = [];
    
    const activityDisplay = document.getElementById('activity-display');
    const attentionActions = document.getElementById('attention-actions');
    
    if (activityDisplay) {
        activityDisplay.style.display = 'none';
    }
    if (attentionActions) {
        attentionActions.style.display = 'flex';
    }
}

function startPulsingAnimation() {
    const quickGameBtn = document.getElementById('quick-game-btn');
    if (quickGameBtn) {
        quickGameBtn.style.animation = 'enticing-pulse 2s ease-in-out infinite';
    }
}

function updateCoinDisplay() {
    const coinCountEl = document.getElementById('coin-count');
    if (coinCountEl) {
        coinCountEl.textContent = attentionCoins;
        
        // Animate coin change
        coinCountEl.style.transition = 'all 0.3s ease';
        coinCountEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            coinCountEl.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Check if level should end
    checkLevelEnd();
    
    // Update button states
    updateButtonStates();
}

function updateButtonStates() {
    const quickGameBtn = document.getElementById('quick-game-btn');
    const learnFactBtn = document.getElementById('learn-fact-btn');
    const breatheBtn = document.getElementById('breathe-btn');
    
    // Quick Game costs 8 coins
    if (quickGameBtn) {
        if (attentionCoins >= 8 && !currentActivity) {
            quickGameBtn.disabled = false;
            quickGameBtn.style.opacity = '1';
            quickGameBtn.style.cursor = 'pointer';
        } else {
            quickGameBtn.disabled = true;
            quickGameBtn.style.opacity = '0.5';
            quickGameBtn.style.cursor = 'not-allowed';
        }
    }
    
    // Learn Fact costs 3 coins
    if (learnFactBtn) {
        if (attentionCoins >= 3 && !currentActivity) {
            learnFactBtn.disabled = false;
            learnFactBtn.style.opacity = '1';
            learnFactBtn.style.cursor = 'pointer';
        } else {
            learnFactBtn.disabled = true;
            learnFactBtn.style.opacity = '0.5';
            learnFactBtn.style.cursor = 'not-allowed';
        }
    }
    
    // Breathe is always available (doesn't cost or earn coins)
    if (breatheBtn) {
        if (!currentActivity) {
            breatheBtn.disabled = false;
            breatheBtn.style.opacity = '1';
            breatheBtn.style.cursor = 'pointer';
        } else {
            breatheBtn.disabled = true;
            breatheBtn.style.opacity = '0.5';
            breatheBtn.style.cursor = 'not-allowed';
        }
    }
}

function checkLevelEnd() {
    // End level if coins are insufficient for any paid action
    // Quick Game costs 8 coins, Learn a Fact costs 3 coins
    // Breathe is free but doesn't earn coins, so if you can't afford either paid activity, level ends
    const canAffordQuickGame = attentionCoins >= 8;
    const canAffordLearnFact = attentionCoins >= 3;
    
    // If no activity is running and can't afford any paid action
    if (!currentActivity && !canAffordQuickGame && !canAffordLearnFact) {
        // Wait a moment to ensure UI updates are complete
        setTimeout(() => {
            if (!currentActivity && !canAffordQuickGame && !canAffordLearnFact) {
                // Show transition message first
                showLevelEndTransition();
            }
        }, 500);
    }
}

function showLevelEndTransition() {
    // Hide activity display
    const activityDisplay = document.getElementById('activity-display');
    const attentionActions = document.getElementById('attention-actions');
    
    if (activityDisplay) {
        activityDisplay.style.display = 'none';
    }
    if (attentionActions) {
        attentionActions.style.display = 'none';
    }
    
    // Hide timer
    hideActivityTimer();
    
    // Show transition message
    let message = "";
    if (attentionCoins === 0) {
        message = "You've used all your attention coins. Your attention is finite. How you spend it changes what you gain.";
    } else {
        message = "You don't have enough coins for any paid activity. Your attention is finite. How you spend it changes what you gain.";
    }
    
    if (typeof showLevelTransition === 'function') {
        showLevelTransition(message);
    }
    
    // After transition is shown, endLevel3 will be called when user clicks Continue
    // This happens in main.js continueToNextLevel function
}

function handleQuickGame() {
    if (attentionCoins < 8 || currentActivity) return;
    
    currentActivity = 'quick-game';
    activitiesCompleted.push('quick-game');
    
    // Hide buttons temporarily
    const attentionActions = document.getElementById('attention-actions');
    if (attentionActions) {
        attentionActions.style.display = 'none';
    }
    
    // Deduct coins
    attentionCoins = Math.max(0, attentionCoins - 8);
    updateCoinDisplay();
    
    // Show activity
    showActivityContent('quick-game');
    
    // Show timer in header
    showActivityTimer(2);
    
    // Quick game is instant, but show brief timer
    let timeLeft = 2;
    const timerHeader = document.getElementById('activity-timer-header');
    const timerText = document.getElementById('activity-timer-text');
    
    const quickTimer = setInterval(() => {
        timeLeft--;
        if (timerText) {
            timerText.textContent = timeLeft > 0 ? `${timeLeft}s` : 'Complete!';
        }
        
        if (timeLeft <= 0) {
            clearInterval(quickTimer);
            hideActivityTimer();
        }
    }, 1000);
    
    // Show buttons again after message
    setTimeout(() => {
        clearInterval(quickTimer);
        currentActivity = null;
        hideActivityTimer();
        if (attentionActions) {
            attentionActions.style.display = 'flex';
        }
        const activityDisplay = document.getElementById('activity-display');
        if (activityDisplay) {
            activityDisplay.style.display = 'none';
        }
        updateButtonStates();
        // Check if level should end after quick game completes
        checkLevelEnd();
    }, 3000);
}

function handleLearnFact() {
    if (attentionCoins < 3 || currentActivity) return;
    
    currentActivity = 'learn-fact';
    activitiesCompleted.push('learn-fact');
    
    // Hide buttons temporarily
    const attentionActions = document.getElementById('attention-actions');
    if (attentionActions) {
        attentionActions.style.display = 'none';
    }
    
    // Deduct coins
    attentionCoins = Math.max(0, attentionCoins - 3);
    updateCoinDisplay();
    
    // Show activity
    showActivityContent('learn-fact');
    
    // Show timer in header
    showActivityTimer(15);
    
    // Start 15-second countdown
    let factTimeLeft = 15;
    const timerText = document.getElementById('activity-timer-text');
    
    activityTimer = setInterval(() => {
        factTimeLeft--;
        
        if (timerText) {
            timerText.textContent = `${factTimeLeft}s`;
        }
        
        if (factTimeLeft <= 0) {
            clearInterval(activityTimer);
            if (timerText) {
                timerText.textContent = 'Complete!';
            }
            setTimeout(() => {
                hideActivityTimer();
                showFactResult();
            }, 500);
        }
    }, 1000);
}

function handleBreathe() {
    if (currentActivity) return;
    
    currentActivity = 'breathe';
    activitiesCompleted.push('breathe');
    
    // Hide buttons temporarily
    const attentionActions = document.getElementById('attention-actions');
    if (attentionActions) {
        attentionActions.style.display = 'none';
    }
    
    // Show breathing activity
    showActivityContent('breathe');
    
    // Show timer in header
    showActivityTimer(30);
    
    // Start 30-second breathing timer
    let breatheTimeLeft = 30;
    const activityContent = document.getElementById('activity-content');
    const timerText = document.getElementById('activity-timer-text');
    let breathePhase = 'inhale'; // inhale, hold, exhale
    
    const breatheCycle = () => {
        if (breatheTimeLeft <= 0) {
            clearInterval(activityTimer);
            // Breathe doesn't earn coins
            hideActivityTimer();
            showBreatheResult();
            return;
        }
        
        breatheTimeLeft--;
        
        // Update timer in header
        if (timerText) {
            timerText.textContent = `${breatheTimeLeft}s`;
        }
        
        // Breathing animation cycle (4 seconds per cycle: 2s inhale, 1s hold, 1s exhale)
        const cyclePosition = (30 - breatheTimeLeft) % 4;
        
        if (cyclePosition === 0 || cyclePosition === 1) {
            breathePhase = 'inhale';
        } else if (cyclePosition === 2) {
            breathePhase = 'hold';
        } else {
            breathePhase = 'exhale';
        }
        
        if (activityContent) {
            const breatheText = activityContent.querySelector('.breathe-text');
            const breatheCircle = activityContent.querySelector('.breathe-circle');
            
            if (breatheText) {
                breatheText.textContent = breathePhase === 'inhale' ? 'Breathe In...' : 
                                        breathePhase === 'hold' ? 'Hold...' : 'Breathe Out...';
            }
            
            if (breatheCircle) {
                if (breathePhase === 'inhale') {
                    breatheCircle.style.transform = 'scale(1.2)';
                    breatheCircle.style.transition = 'transform 2s ease-in';
                } else if (breathePhase === 'hold') {
                    breatheCircle.style.transition = 'transform 1s ease';
                } else {
                    breatheCircle.style.transform = 'scale(1)';
                    breatheCircle.style.transition = 'transform 1s ease-out';
                }
            }
        }
    };
    
    activityTimer = setInterval(breatheCycle, 1000);
}

function showActivityContent(activityType) {
    const activityDisplay = document.getElementById('activity-display');
    const activityContent = document.getElementById('activity-content');
    
    if (!activityDisplay || !activityContent) return;
    
    activityDisplay.style.display = 'block';
    activityDisplay.style.opacity = '0';
    activityDisplay.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        activityDisplay.style.opacity = '1';
    }, 10);
    
    if (activityType === 'quick-game') {
        activityContent.innerHTML = `
            <div class="activity-message">
                <h3>🎮 Quick Game</h3>
                <p style="margin-top: 1rem;">Instant gratification achieved!</p>
            </div>
        `;
    } else if (activityType === 'learn-fact') {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        activityContent.innerHTML = `
            <div class="activity-message">
                <h3>📚 Learn a Fact</h3>
                <p class="fact-text" style="margin-top: 1rem;">Learning...</p>
                <div class="fact-preview" style="opacity: 0.5; margin-top: 2rem;">
                    <p style="font-size: 0.9rem; font-style: italic;">${randomFact}</p>
                </div>
            </div>
        `;
    } else if (activityType === 'breathe') {
        activityContent.innerHTML = `
            <div class="activity-message">
                <h3>☁️ Just Breathe</h3>
                <p class="breathe-text" style="margin-top: 1rem;">Breathe In...</p>
                <div class="breathe-circle"></div>
            </div>
        `;
    }
}

function showActivityTimer(seconds) {
    const timerHeader = document.getElementById('activity-timer-header');
    const timerText = document.getElementById('activity-timer-text');
    
    if (timerHeader && timerText) {
        timerText.textContent = `${seconds}s`;
        timerHeader.style.display = 'flex';
        timerHeader.style.opacity = '0';
        setTimeout(() => {
            timerHeader.style.transition = 'opacity 0.3s ease';
            timerHeader.style.opacity = '1';
        }, 10);
    }
}

function hideActivityTimer() {
    const timerHeader = document.getElementById('activity-timer-header');
    if (timerHeader) {
        timerHeader.style.opacity = '0';
        timerHeader.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            timerHeader.style.display = 'none';
        }, 300);
    }
}

function showFactResult() {
    const activityContent = document.getElementById('activity-content');
    if (activityContent) {
        activityContent.innerHTML = `
            <div class="activity-message">
                <h3>📚 Knowledge Gained!</h3>
                <p>You invested attention and gained knowledge.</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;">You have ${attentionCoins} attention coins remaining.</p>
            </div>
        `;
    }
    
    // Show buttons again after result
    setTimeout(() => {
        currentActivity = null;
        hideActivityTimer();
        const attentionActions = document.getElementById('attention-actions');
        if (attentionActions) {
            attentionActions.style.display = 'flex';
        }
        const activityDisplay = document.getElementById('activity-display');
        if (activityDisplay) {
            activityDisplay.style.display = 'none';
        }
        updateButtonStates();
        // Check if level should end after learn fact completes
        checkLevelEnd();
    }, 3000);
}

function showBreatheResult() {
    const activityContent = document.getElementById('activity-content');
    if (activityContent) {
        activityContent.innerHTML = `
            <div class="activity-message">
                <h3>☁️ Peace Achieved</h3>
                <p>You took time to breathe and be present.</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;">You have ${attentionCoins} attention coins remaining.</p>
            </div>
        `;
    }
    
    // Show buttons again after result
    setTimeout(() => {
        currentActivity = null;
        hideActivityTimer();
        const attentionActions = document.getElementById('attention-actions');
        if (attentionActions) {
            attentionActions.style.display = 'flex';
        }
        const activityDisplay = document.getElementById('activity-display');
        if (activityDisplay) {
            activityDisplay.style.display = 'none';
        }
        updateButtonStates();
        // Check if level should end after breathe completes
        checkLevelEnd();
    }, 3000);
}

function endLevel3() {
    if (activityTimer) clearInterval(activityTimer);
    
    // Hide timer
    hideActivityTimer();
    
    // Update game data
    gameData.realChoices = attentionCoins;
    gameData.phoneChoices = 10 - attentionCoins;
    gameData.level3CoinsRemaining = attentionCoins;
    gameData.level3Activities = [...activitiesCompleted];
    
    // Note: endLevel3 is now called from showLevelEndTransition after showing the transition message
    // The transition will then proceed to final awareness pages
}
