// Report generation
function generateReport() {
    // Save game data
    const reportData = saveGameData();
    
    // Update trigger score
    updateTriggerScore(reportData.triggerScore);
    
    // Update scroll index
    updateScrollIndex(reportData.scrollIndex);
    
    // Draw choice chart
    drawChoiceChart(reportData.choiceRatio);
    
    // Draw attention stability chart
    drawAttentionChart();
    
    // Update insights
    updateInsights(reportData.insight);
    
    // Update recommendations
    updateRecommendations();
    
    // Update challenge
    updateChallenge();
}

function updateTriggerScore(score) {
    const scoreCircle = document.getElementById('trigger-score-circle');
    const scoreValue = document.getElementById('trigger-score-value');
    
    if (scoreValue) {
        scoreValue.textContent = score;
    }
    
    if (scoreCircle) {
        // Animate the score circle
        const percentage = score;
        scoreCircle.style.background = `conic-gradient(
            from 0deg,
            #000000 0%,
            #404040 ${percentage}%,
            #e0e0e0 ${percentage}%,
            #e0e0e0 100%
        )`;
    }
}

function updateScrollIndex(index) {
    const indexFill = document.getElementById('scroll-index-fill');
    const indexValue = document.getElementById('scroll-index-value');
    
    if (indexFill) {
        indexFill.style.width = index + '%';
    }
    
    if (indexValue) {
        indexValue.textContent = index + '%';
    }
}

function drawChoiceChart(choiceRatio) {
    const canvas = document.getElementById('choice-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw donut chart
    let startAngle = -Math.PI / 2;
    
    // Phone choices (dark gray)
    const phoneAngle = (choiceRatio.phone / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + phoneAngle);
    ctx.closePath();
    ctx.fillStyle = '#808080';
    ctx.fill();
    
    // Real life choices (black)
    startAngle += phoneAngle;
    const realAngle = (choiceRatio.real / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + realAngle);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();
    
    // Inner circle (white)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Labels
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Phone label
    const phoneLabelAngle = -Math.PI / 2 + phoneAngle / 2;
    const phoneLabelX = centerX + Math.cos(phoneLabelAngle) * radius * 0.8;
    const phoneLabelY = centerY + Math.sin(phoneLabelAngle) * radius * 0.8;
    ctx.fillText('Phone', phoneLabelX, phoneLabelY - 15);
    ctx.font = '20px sans-serif';
    ctx.fillText(choiceRatio.phone + '%', phoneLabelX, phoneLabelY + 10);
    
    // Real label
    const realLabelAngle = -Math.PI / 2 + phoneAngle + realAngle / 2;
    const realLabelX = centerX + Math.cos(realLabelAngle) * radius * 0.8;
    const realLabelY = centerY + Math.sin(realLabelAngle) * radius * 0.8;
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Real Life', realLabelX, realLabelY - 15);
    ctx.font = '20px sans-serif';
    ctx.fillText(choiceRatio.real + '%', realLabelX, realLabelY + 10);
}

function drawAttentionChart() {
    const canvas = document.getElementById('attention-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const stability = gameData.focusStability;
    
    if (stability.length === 0) {
        // Draw placeholder
        ctx.fillStyle = '#666';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No focus data available', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const stepX = chartWidth / (stability.length - 1 || 1);
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    stability.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + chartHeight - (value * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#000000';
    stability.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + chartHeight - (value * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Labels
    ctx.fillStyle = '#666';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Time', canvas.width / 2, canvas.height - 10);
    
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Focus Stability', 0, 0);
    ctx.restore();
    
    // Y-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('1.0', padding - 10, padding + 5);
    ctx.fillText('0.5', padding - 10, padding + chartHeight / 2 + 5);
    ctx.fillText('0.0', padding - 10, padding + chartHeight + 5);
}

function updateInsights(insight) {
    const insightBox = document.getElementById('insight-box');
    const insightText = document.getElementById('insight-text');
    
    if (insightText) {
        insightText.textContent = insight;
    }
    
    if (insightBox) {
        insightBox.style.opacity = '0';
        setTimeout(() => {
            insightBox.style.opacity = '1';
        }, 100);
    }
}

function updateRecommendations() {
    const recommendations = generateRecommendations();
    const container = document.getElementById('recommendations');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        item.innerHTML = `
            <h3>${index + 1}. ${rec.title}</h3>
            <p>${rec.description}</p>
        `;
        
        container.appendChild(item);
        
        // Animate in
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function updateChallenge() {
    const challenge = generateChallenge();
    const challengeBox = document.getElementById('challenge-box');
    const challengeText = document.getElementById('challenge-text');
    
    if (challengeText) {
        challengeText.textContent = challenge;
    }
    
    if (challengeBox) {
        challengeBox.style.opacity = '0';
        setTimeout(() => {
            challengeBox.style.opacity = '1';
        }, 100);
    }
}

