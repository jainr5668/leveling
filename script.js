// Game State
let gameState = {
    playerName: "Hunter",
    level: 1,
    currentExp: 0,
    currentHP: 100,
    currentMP: 50,
    availablePoints: 0,
    stats: {
        strength: 10,
        agility: 10,
        intelligence: 10,
        vitality: 10,
        sense: 10
    },
    baseStats: {
        strength: 10,
        agility: 10,
        intelligence: 10,
        vitality: 10,
        sense: 10
    },
    quests: {
        fitness: {
            fitness1: false,
            fitness2: false,
            fitness3: false,
            fitness4: false,
            fitness5: false
        },
        career: {
            career1: false,
            career2: false,
            career3: false,
            career4: false,
            career5: false
        },
        wealth: {
            wealth1: false,
            wealth2: false,
            wealth3: false,
            wealth4: false,
            wealth5: false
        },
        confidence: {
            confidence1: false,
            confidence2: false,
            confidence3: false,
            confidence4: false,
            confidence5: false
        }
    },
    streaks: {
        fitness: 0,
        career: 0,
        wealth: 0,
        confidence: 0,
        total: 0
    },
    lastQuestDate: null,
    dailyNotes: "",
    currentQuestTab: "fitness",
    penaltyQuest: {
        active: false,
        category: null,
        reason: ""
    },
    consecutiveFailures: 0,
    isDead: false,
    aiSettings: {
        provider: "openai",
        model: "gpt-4o-mini",
        apiKey: "",
        endpoint: "https://api.openai.com/v1/chat/completions",
        enabled: false
    },
    aiChatHistory: []
};

// Constants
const RANKS = [
    { level: 1, name: "E" },
    { level: 10, name: "D" },
    { level: 25, name: "C" },
    { level: 50, name: "B" },
    { level: 75, name: "A" },
    { level: 100, name: "S" },
    { level: 150, name: "SS" },
    { level: 200, name: "SSS" }
];

// Calculate required EXP for next level (increased difficulty)
function getRequiredExp(level) {
    // More challenging progression: starts at 200, scales faster
    return Math.floor(200 * Math.pow(1.15, level - 1));
}

// Calculate max HP based on vitality and level
function getMaxHP() {
    return 100 + (gameState.stats.vitality - 10) * 10 + (gameState.level - 1) * 5;
}

// Calculate max MP based on intelligence and level
function getMaxMP() {
    return 50 + (gameState.stats.intelligence - 10) * 5 + (gameState.level - 1) * 3;
}

// Get current rank based on level
function getCurrentRank() {
    let rank = "E";
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (gameState.level >= RANKS[i].level) {
            rank = RANKS[i].name;
            break;
        }
    }
    return rank;
}

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('soloLevelingGame', JSON.stringify(gameState));
}

// Load game state from localStorage
function loadGame() {
    const saved = localStorage.getItem('soloLevelingGame');
    if (saved) {
        const loadedState = JSON.parse(saved);
        
        // Merge loaded state with default state to handle new properties
        gameState = {
            ...gameState,
            ...loadedState,
            // Ensure aiSettings exists with defaults
            aiSettings: {
                provider: "openai",
                model: "gpt-4o-mini",
                apiKey: "",
                endpoint: "https://api.openai.com/v1/chat/completions",
                enabled: false,
                ...loadedState.aiSettings
            },
            // Ensure aiChatHistory exists
            aiChatHistory: loadedState.aiChatHistory || [],
            // Ensure other new properties exist
            consecutiveFailures: loadedState.consecutiveFailures || 0,
            isDead: loadedState.isDead || false
        };
        
        updateAllUI();
    }
}

// Update all UI elements
function updateAllUI() {
    updatePlayerInfo();
    updateStats();
    updateBars();
    updateQuests();
    updateStreaks();
    updateNotes();
    updateAIStatus();
    loadAIChatHistory();
    checkDailyReset();
}

// Update player info display
function updatePlayerInfo() {
    document.getElementById('playerName').value = gameState.playerName;
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('rank').textContent = getCurrentRank();
}

// Update stat displays
function updateStats() {
    document.getElementById('availablePoints').textContent = gameState.availablePoints;
    
    for (let stat in gameState.stats) {
        document.getElementById(stat).textContent = gameState.stats[stat];
    }
}

// Update HP, MP, and EXP bars
function updateBars() {
    const maxHP = getMaxHP();
    const maxMP = getMaxMP();
    const requiredExp = getRequiredExp(gameState.level);
    
    // Ensure current values don't exceed max
    gameState.currentHP = Math.min(gameState.currentHP, maxHP);
    gameState.currentMP = Math.min(gameState.currentMP, maxMP);
    
    // Update HP
    const hpPercent = (gameState.currentHP / maxHP) * 100;
    const hpBar = document.getElementById('hpBar');
    hpBar.style.width = hpPercent + '%';
    document.getElementById('hpValue').textContent = `${Math.floor(gameState.currentHP)}/${maxHP}`;
    
    // Add danger states for HP
    hpBar.classList.remove('danger', 'critical');
    if (hpPercent <= 10) {
        hpBar.classList.add('critical');
    } else if (hpPercent <= 30) {
        hpBar.classList.add('danger');
    }
    
    // Update MP
    const mpPercent = (gameState.currentMP / maxMP) * 100;
    const mpBar = document.getElementById('mpBar');
    mpBar.style.width = mpPercent + '%';
    document.getElementById('mpValue').textContent = `${Math.floor(gameState.currentMP)}/${maxMP}`;
    
    // Add danger states for MP
    mpBar.classList.remove('danger', 'critical');
    if (mpPercent <= 10) {
        mpBar.classList.add('critical');
    } else if (mpPercent <= 30) {
        mpBar.classList.add('danger');
    }
    
    // Update EXP
    const expPercent = (gameState.currentExp / requiredExp) * 100;
    document.getElementById('expBar').style.width = expPercent + '%';
    document.getElementById('expValue').textContent = `${gameState.currentExp}/${requiredExp}`;
}

// Update quest checkboxes
function updateQuests() {
    for (let category in gameState.quests) {
        for (let quest in gameState.quests[category]) {
            const checkbox = document.getElementById(quest);
            if (checkbox) {
                checkbox.checked = gameState.quests[category][quest];
            }
        }
    }
}

// Update streak displays
function updateStreaks() {
    document.getElementById('fitnessStreak').textContent = gameState.streaks.fitness + ' days';
    document.getElementById('careerStreak').textContent = gameState.streaks.career + ' days';
    document.getElementById('wealthStreak').textContent = gameState.streaks.wealth + ' days';
    document.getElementById('confidenceStreak').textContent = gameState.streaks.confidence + ' days';
    document.getElementById('totalStreak').textContent = gameState.streaks.total + ' days';
}

// Update notes
function updateNotes() {
    document.getElementById('dailyNotes').value = gameState.dailyNotes || "";
}

// Update AI status indicator
function updateAIStatus() {
    const indicator = document.getElementById('aiStatusIndicator');
    const statusText = document.getElementById('aiStatusText');
    
    if (!indicator || !statusText) {
        console.warn('AI status elements not found');
        return;
    }
    
    // Ensure aiSettings exists
    if (!gameState.aiSettings) {
        gameState.aiSettings = {
            provider: "openai",
            model: "gpt-4o-mini",
            apiKey: "",
            endpoint: "https://api.openai.com/v1/chat/completions",
            enabled: false
        };
    }
    
    if (gameState.aiSettings.enabled && gameState.aiSettings.apiKey) {
        indicator.textContent = '🟢';
        statusText.textContent = `AI Active (${gameState.aiSettings.provider} - ${gameState.aiSettings.model})`;
    } else {
        indicator.textContent = '⚪';
        statusText.textContent = 'AI Not Configured - Click Settings';
    }
}

// Load AI chat history
function loadAIChatHistory() {
    const chatHistory = document.getElementById('aiChatHistory');
    if (!chatHistory) {
        console.warn('AI chat history element not found');
        return;
    }
    
    chatHistory.innerHTML = '';
    
    // Ensure aiChatHistory exists
    if (!gameState.aiChatHistory) {
        gameState.aiChatHistory = [];
    }
    
    if (gameState.aiChatHistory.length === 0) {
        chatHistory.innerHTML = '<div class="ai-welcome">🤖 Your AI Hell Mode Coach is ready. Ask for advice or request a progress analysis!</div>';
    } else {
        gameState.aiChatHistory.forEach(msg => {
            addChatMessage(msg.role, msg.content, false);
        });
    }
}

// Check if we need to reset daily quests
function checkDailyReset() {
    const today = new Date().toDateString();
    
    if (gameState.lastQuestDate && gameState.lastQuestDate !== today) {
        // Calculate how many days were missed
        const lastDate = new Date(gameState.lastQuestDate);
        const currentDate = new Date(today);
        const daysDifference = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
        
        // 💀 HELL MODE: APPLY PENALTIES FOR EACH MISSED DAY 💀
        let allPenalties = [];
        let totalHPLoss = 0;
        let totalMPLoss = 0;
        let totalEXPLoss = 0;
        
        for (let day = 0; day < daysDifference; day++) {
            let dayPenalties = [];
            
            // Check if all quests in any category were completed
            for (let category in gameState.quests) {
                const quests = gameState.quests[category];
                const allCompleted = Object.values(quests).every(q => q === true);
                const completedCount = Object.values(quests).filter(q => q === true).length;
                const totalCount = Object.values(quests).length;
                
                if (allCompleted) {
                    gameState.streaks[category]++;
                } else {
                    // PENALTY: Streak loss
                    if (gameState.streaks[category] > 0) {
                        gameState.streaks[category] = Math.max(0, gameState.streaks[category] - 1);
                    }
                    
                    // PENALTY 1: HP/MP Loss based on category
                    if (category === 'fitness') {
                        const hpLoss = Math.floor(getMaxHP() * 0.15);
                        gameState.currentHP = Math.max(1, gameState.currentHP - hpLoss);
                        totalHPLoss += hpLoss;
                        dayPenalties.push(`💔 -${hpLoss} HP (Fitness neglected)`);
                    }
                    
                    if (category === 'career' || category === 'wealth') {
                        const mpLoss = Math.floor(getMaxMP() * 0.15);
                        gameState.currentMP = Math.max(0, gameState.currentMP - mpLoss);
                        totalMPLoss += mpLoss;
                        dayPenalties.push(`💙 -${mpLoss} MP (Mental fatigue)`);
                    }
                    
                    // PENALTY 2: Stat Decay
                    if (completedCount < totalCount / 2) {
                        applyStatDecay(category);
                        dayPenalties.push(`📉 Stat decay (${category})`);
                    }
                    
                    // PENALTY 3: EXP Debt
                    const expLoss = Math.floor(50 + gameState.level * 10);
                    gameState.currentExp = Math.max(0, gameState.currentExp - expLoss);
                    totalEXPLoss += expLoss;
                    dayPenalties.push(`⚠️ -${expLoss} EXP (Incomplete ${category})`);
                }
            }
            
            // Check total quest completion
            const allCategoriesComplete = Object.keys(gameState.quests).every(category => {
                return Object.values(gameState.quests[category]).every(q => q === true);
            });
            
            if (allCategoriesComplete) {
                gameState.streaks.total++;
                gameState.consecutiveFailures = 0;
            } else {
                if (gameState.streaks.total > 0) {
                    gameState.streaks.total = Math.max(0, gameState.streaks.total - 1);
                }
                
                gameState.consecutiveFailures++;
                
                // PENALTY 4: Massive penalty for consecutive failures
                if (gameState.consecutiveFailures >= 3) {
                    const massiveHpLoss = Math.floor(getMaxHP() * 0.3);
                    gameState.currentHP = Math.max(1, gameState.currentHP - massiveHpLoss);
                    totalHPLoss += massiveHpLoss;
                    dayPenalties.push(`💀 -${massiveHpLoss} HP (3 DAYS FAILED!)`);
                }
            }
            
            if (dayPenalties.length > 0) {
                allPenalties.push({
                    day: day + 1,
                    penalties: dayPenalties
                });
            }
            
            // Reset quests for next day simulation
            for (let category in gameState.quests) {
                for (let quest in gameState.quests[category]) {
                    gameState.quests[category][quest] = false;
                }
            }
        }
        
        // PENALTY 5: Death & Level Down if HP is critical
        if (gameState.currentHP <= getMaxHP() * 0.1) {
            applyDeath();
            allPenalties.push({
                day: 'FINAL',
                penalties: ['☠️ DEATH PENALTY - Level Down! HP was below 10%']
            });
        }
        
        // Show comprehensive penalty notification
        if (allPenalties.length > 0) {
            showMultiDayPenaltyNotification(daysDifference, allPenalties, totalHPLoss, totalMPLoss, totalEXPLoss);
            
            // AI analyzes multi-day absence
            if (gameState.aiSettings.enabled && gameState.aiSettings.apiKey) {
                setTimeout(() => {
                    const absenceContext = `I was absent for ${daysDifference} day(s)! During this time:\n- Total HP Lost: ${totalHPLoss}\n- Total MP Lost: ${totalMPLoss}\n- Total EXP Lost: ${totalEXPLoss}\n- Current HP: ${Math.floor(gameState.currentHP)}/${getMaxHP()}\n- Current Level: ${gameState.level}\n\nWhat's my situation and how do I recover?`;
                    callAI(absenceContext, true);
                }, 2000);
            }
        }
        
        updateStreaks();
        updateQuests();
        updateAllUI();
    }
    
    gameState.lastQuestDate = today;
    saveGame();
}

// Apply stat decay penalty
function applyStatDecay(category) {
    if (category === 'fitness') {
        gameState.stats.strength = Math.max(gameState.baseStats.strength, gameState.stats.strength - 1);
        gameState.stats.vitality = Math.max(gameState.baseStats.vitality, gameState.stats.vitality - 1);
    } else if (category === 'career') {
        gameState.stats.intelligence = Math.max(gameState.baseStats.intelligence, gameState.stats.intelligence - 1);
        gameState.stats.sense = Math.max(gameState.baseStats.sense, gameState.stats.sense - 1);
    } else if (category === 'wealth') {
        gameState.stats.intelligence = Math.max(gameState.baseStats.intelligence, gameState.stats.intelligence - 1);
        gameState.stats.agility = Math.max(gameState.baseStats.agility, gameState.stats.agility - 1);
    } else if (category === 'confidence') {
        gameState.stats.sense = Math.max(gameState.baseStats.sense, gameState.stats.sense - 1);
        gameState.stats.agility = Math.max(gameState.baseStats.agility, gameState.stats.agility - 1);
    }
}

// Apply death penalty
function applyDeath() {
    if (gameState.level > 1) {
        gameState.level = Math.max(1, gameState.level - 1);
        
        // Lose some stats
        for (let stat in gameState.stats) {
            gameState.stats[stat] = Math.max(gameState.baseStats[stat], gameState.stats[stat] - 2);
        }
        
        // Reset EXP
        gameState.currentExp = 0;
    }
    
    // Restore HP/MP to 50%
    gameState.currentHP = Math.floor(getMaxHP() * 0.5);
    gameState.currentMP = Math.floor(getMaxMP() * 0.5);
    
    // Reset streaks
    for (let streak in gameState.streaks) {
        gameState.streaks[streak] = 0;
    }
    
    gameState.consecutiveFailures = 0;
}

// Show penalty notification
function showPenaltyNotification(penalties) {
    const modal = document.getElementById('penaltyModal');
    const penaltyList = document.getElementById('penaltyList');
    
    penaltyList.innerHTML = penalties.map(p => `<li>${p}</li>`).join('');
    modal.style.display = 'block';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 5000);
}

// Show multi-day penalty notification
function showMultiDayPenaltyNotification(daysAbsent, allPenalties, totalHP, totalMP, totalEXP) {
    const modal = document.getElementById('penaltyModal');
    const penaltyList = document.getElementById('penaltyList');
    const warningText = document.querySelector('.penalty-warning');
    
    // Update warning to show days absent
    warningText.textContent = `You were absent for ${daysAbsent} day(s)! Penalties accumulated:`;
    
    // Build penalty list with day-by-day breakdown
    let html = `
        <li style="background: rgba(255, 0, 0, 0.4); font-weight: bold; font-size: 1.1em;">
            📅 TOTAL DAMAGE: -${totalHP} HP, -${totalMP} MP, -${totalEXP} EXP
        </li>
    `;
    
    allPenalties.forEach(dayPenalty => {
        html += `<li style="margin-top: 10px; background: rgba(139, 0, 0, 0.3);"><strong>Day ${dayPenalty.day}:</strong></li>`;
        dayPenalty.penalties.forEach(p => {
            html += `<li style="margin-left: 20px;">${p}</li>`;
        });
    });
    
    penaltyList.innerHTML = html;
    modal.style.display = 'block';
    
    // Don't auto-close for multi-day penalties - too important
}

// Get quest rewards
function getQuestReward(questId) {
    const rewards = {
        fitness1: 50, fitness2: 40, fitness3: 30, fitness4: 50, fitness5: 40,
        career1: 80, career2: 60, career3: 70, career4: 50, career5: 60,
        wealth1: 40, wealth2: 60, wealth3: 50, wealth4: 50, wealth5: 80,
        confidence1: 40, confidence2: 40, confidence3: 70, confidence4: 30, confidence5: 50
    };
    return rewards[questId] || 50;
}

// Auto-increase stats based on quest category
function autoIncreaseStats(category) {
    // Fitness quests increase Strength and Vitality
    if (category === 'fitness') {
        gameState.stats.strength++;
        gameState.stats.vitality++;
        gameState.baseStats.strength++;
        gameState.baseStats.vitality++;
        gameState.currentHP = getMaxHP(); // Update HP immediately
        showStatGainNotification('💪 Strength +1, ❤️ Vitality +1 (Fitness Training!)');
    }
    // Career quests increase Intelligence and Sense
    else if (category === 'career') {
        gameState.stats.intelligence++;
        gameState.stats.sense++;
        gameState.baseStats.intelligence++;
        gameState.baseStats.sense++;
        gameState.currentMP = getMaxMP(); // Update MP immediately
        showStatGainNotification('🧠 Intelligence +1, 👁️ Sense +1 (Career Growth!)');
    }
    // Wealth quests increase Intelligence and Agility
    else if (category === 'wealth') {
        gameState.stats.intelligence++;
        gameState.stats.agility++;
        gameState.baseStats.intelligence++;
        gameState.baseStats.agility++;
        gameState.currentMP = getMaxMP();
        showStatGainNotification('🧠 Intelligence +1, ⚡ Agility +1 (Financial Wisdom!)');
    }
    // Confidence quests increase Sense and Agility
    else if (category === 'confidence') {
        gameState.stats.sense++;
        gameState.stats.agility++;
        gameState.baseStats.sense++;
        gameState.baseStats.agility++;
        showStatGainNotification('👁️ Sense +1, ⚡ Agility +1 (Confidence Boost!)');
    }
}

// Show stat gain notification
function showStatGainNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'stat-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add experience points
function addExp(amount) {
    gameState.currentExp += amount;
    const requiredExp = getRequiredExp(gameState.level);
    
    // Check for level up
    if (gameState.currentExp >= requiredExp) {
        levelUp();
    }
    
    updateBars();
    saveGame();
}

// Level up function
function levelUp() {
    const requiredExp = getRequiredExp(gameState.level);
    gameState.currentExp -= requiredExp;
    gameState.level++;
    gameState.availablePoints += 5;
    
    // Heal HP and MP on level up
    gameState.currentHP = getMaxHP();
    gameState.currentMP = getMaxMP();
    
    // Show level up modal
    showLevelUpModal();
    
    updateAllUI();
    saveGame();
}

// Show level up modal
function showLevelUpModal() {
    const modal = document.getElementById('levelUpModal');
    document.getElementById('modalLevel').textContent = gameState.level;
    modal.style.display = 'block';
    
    // Play a simple animation (you can add sound effects here)
    setTimeout(() => {
        modal.querySelector('.modal-content').style.animation = 'scaleIn 0.3s';
    }, 10);
}

// Initialize event listeners
function initEventListeners() {
    // Player name input
    document.getElementById('playerName').addEventListener('change', (e) => {
        gameState.playerName = e.target.value || "Hunter";
        saveGame();
    });
    
    // Stat buttons
    document.querySelectorAll('.stat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const stat = btn.dataset.stat;
            const isPlus = btn.classList.contains('plus');
            
            if (isPlus && gameState.availablePoints > 0) {
                gameState.stats[stat]++;
                gameState.availablePoints--;
                
                // Update HP and MP if vitality or intelligence changed
                if (stat === 'vitality') {
                    gameState.currentHP = getMaxHP();
                } else if (stat === 'intelligence') {
                    gameState.currentMP = getMaxMP();
                }
                
                updateAllUI();
                saveGame();
            } else if (!isPlus && gameState.stats[stat] > gameState.baseStats[stat]) {
                gameState.stats[stat]--;
                gameState.availablePoints++;
                
                updateAllUI();
                saveGame();
            }
        });
    });
    
    // Quest tabs
    document.querySelectorAll('.quest-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update active tab
            document.querySelectorAll('.quest-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active category
            document.querySelectorAll('.quest-category').forEach(c => c.classList.remove('active'));
            document.querySelector(`.quest-category[data-category="${category}"]`).classList.add('active');
            
            gameState.currentQuestTab = category;
            saveGame();
        });
    });
    
    // Quest checkboxes
    document.querySelectorAll('.quest-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const questId = e.target.id;
            
            // Find which category this quest belongs to
            let category = null;
            for (let cat in gameState.quests) {
                if (gameState.quests[cat].hasOwnProperty(questId)) {
                    category = cat;
                    break;
                }
            }
            
            if (category) {
                const wasCompleted = gameState.quests[category][questId];
                gameState.quests[category][questId] = e.target.checked;
                
                // Add EXP if quest was just completed
                if (!wasCompleted && e.target.checked) {
                    const exp = getQuestReward(questId);
                    addExp(exp);
                    
                    // Check if all quests in category are completed
                    const allCategoryComplete = Object.values(gameState.quests[category]).every(q => q === true);
                    if (allCategoryComplete) {
                        // Auto-increase stats for completing all quests in category
                        autoIncreaseStats(category);
                        updateAllUI();
                        
                        // AI congratulates if enabled
                        if (gameState.aiSettings.enabled && gameState.aiSettings.apiKey) {
                            setTimeout(() => {
                                callAI(`I just completed ALL ${category} quests for today! Give me a quick motivational message!`, false);
                            }, 1000);
                        }
                    }
                }
            }
            
            saveGame();
        });
    });
    
    // Reset quests button
    document.getElementById('resetQuests').addEventListener('click', () => {
        if (confirm('Reset all quests? This will not affect your streaks.')) {
            for (let category in gameState.quests) {
                for (let quest in gameState.quests[category]) {
                    gameState.quests[category][quest] = false;
                }
            }
            updateQuests();
            saveGame();
        }
    });
    
    // Notes functionality
    document.getElementById('dailyNotes').addEventListener('input', (e) => {
        gameState.dailyNotes = e.target.value;
        // Auto-save after typing stops for 1 second
        clearTimeout(window.notesTimeout);
        window.notesTimeout = setTimeout(() => {
            saveGame();
            showSaveStatus();
        }, 1000);
    });
    
    document.getElementById('saveNotes').addEventListener('click', () => {
        gameState.dailyNotes = document.getElementById('dailyNotes').value;
        saveGame();
        showSaveStatus();
    });
    
    // Training buttons
    document.querySelectorAll('.training-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const exp = parseInt(btn.dataset.exp);
            addExp(exp);
            
            // Add visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    });
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            localStorage.removeItem('soloLevelingGame');
            location.reload();
        }
    });
    
    // Check HP status and warn user
    setInterval(() => {
        const maxHP = getMaxHP();
        const hpPercent = (gameState.currentHP / maxHP) * 100;
        
        if (hpPercent <= 20 && hpPercent > 0) {
            // Show warning every 30 seconds when HP is critically low
            const warning = document.createElement('div');
            warning.className = 'stat-notification show';
            warning.style.background = 'linear-gradient(135deg, #c0392b, #8b0000)';
            warning.textContent = '⚠️ CRITICAL HP! Complete quests or face death!';
            document.body.appendChild(warning);
            
            setTimeout(() => {
                warning.classList.remove('show');
                setTimeout(() => warning.remove(), 300);
            }, 4000);
        }
    }, 30000); // Check every 30 seconds
    
    // Penalty modal close button
    document.getElementById('penaltyClose').addEventListener('click', () => {
        document.getElementById('penaltyModal').style.display = 'none';
    });
    
    // Modal close button
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('levelUpModal').style.display = 'none';
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('levelUpModal');
        const penaltyModal = document.getElementById('penaltyModal');
        const aiModal = document.getElementById('aiSettingsModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === penaltyModal) {
            penaltyModal.style.display = 'none';
        }
        if (e.target === aiModal) {
            aiModal.style.display = 'none';
        }
    });
    
    // AI Settings Modal
    const aiSettingsBtn = document.getElementById('aiSettingsBtn');
    console.log('AI Settings Button:', aiSettingsBtn);
    if (aiSettingsBtn) {
        aiSettingsBtn.addEventListener('click', () => {
            console.log('AI Settings button clicked!');
            const modal = document.getElementById('aiSettingsModal');
            console.log('AI Settings Modal:', modal);
            
            if (!modal) {
                console.error('AI Settings Modal not found!');
                alert('Error: AI Settings Modal not found. Please refresh the page.');
                return;
            }
            
            // Load current settings
            document.getElementById('aiProvider').value = gameState.aiSettings.provider;
            document.getElementById('aiModel').value = gameState.aiSettings.model;
            document.getElementById('aiApiKey').value = gameState.aiSettings.apiKey;
            document.getElementById('aiEndpoint').value = gameState.aiSettings.endpoint;
            
            modal.style.display = 'block';
            console.log('Modal should now be visible');
        });
    } else {
        console.error('AI Settings button not found! Check if element with id="aiSettingsBtn" exists.');
    }
    
    const closeAISettingsBtn = document.getElementById('closeAISettings');
    if (closeAISettingsBtn) {
        closeAISettingsBtn.addEventListener('click', () => {
            document.getElementById('aiSettingsModal').style.display = 'none';
        });
    }
    
    const saveAISettingsBtn = document.getElementById('saveAISettings');
    if (saveAISettingsBtn) {
        saveAISettingsBtn.addEventListener('click', async () => {
        const provider = document.getElementById('aiProvider').value;
        const model = document.getElementById('aiModel').value;
        const apiKey = document.getElementById('aiApiKey').value;
        const endpoint = document.getElementById('aiEndpoint').value;
        
        if (!apiKey) {
            alert('❌ Please enter an API key!\n\nGet your API key from:\n- OpenAI: platform.openai.com/api-keys\n- Anthropic: console.anthropic.com');
            return;
        }
        
        if (!model) {
            alert('❌ Please enter a model name!\n\nExamples:\n- OpenAI: gpt-4o-mini or gpt-4o\n- Anthropic: claude-3-5-sonnet-20241022');
            return;
        }
        
        // Save settings
        gameState.aiSettings = {
            provider,
            model,
            apiKey,
            endpoint: provider === 'custom' ? endpoint : 
                     provider === 'anthropic' ? 'https://api.anthropic.com/v1/messages' :
                     provider === 'github' ? 'https://models.inference.ai.azure.com/chat/completions' :
                     'https://api.openai.com/v1/chat/completions',
            enabled: true
        };
        
        saveGame();
        updateAIStatus();
        
        // Test connection
        const saveBtn = document.getElementById('saveAISettings');
        saveBtn.textContent = '⏳ Testing Connection...';
        saveBtn.disabled = true;
        
        try {
            await callAI('Hello! I just configured you as my Hell Mode AI coach. Give me a brief introduction (2-3 sentences) and confirm you\'re ready!', false);
            alert('✅ AI Coach connected successfully!\n\nYou can now:\n- Ask questions\n- Request progress analysis\n- Get automatic feedback');
            document.getElementById('aiSettingsModal').style.display = 'none';
        } catch (error) {
            alert(`❌ Connection failed!\n\nError: ${error.message}\n\nTroubleshooting:\n1. Check API key is correct\n2. Verify you have credits/payment method\n3. Check model name spelling\n4. Try a different model`);
            console.error('AI Connection Error:', error);
        } finally {
            saveBtn.textContent = '💾 Save & Test Connection';
            saveBtn.disabled = false;
        }
        });
    }
    
    const clearAISettingsBtn = document.getElementById('clearAISettings');
    if (clearAISettingsBtn) {
        clearAISettingsBtn.addEventListener('click', () => {
        if (confirm('Clear all AI settings? This will disable the AI coach.')) {
            gameState.aiSettings = {
                provider: 'openai',
                model: 'gpt-4o-mini',
                apiKey: '',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                enabled: false
            };
            gameState.aiChatHistory = [];
            saveGame();
            updateAIStatus();
            loadAIChatHistory();
            document.getElementById('aiSettingsModal').style.display = 'none';
        }
        });
    }
    
    // AI Provider change handler
    const aiProviderSelect = document.getElementById('aiProvider');
    if (aiProviderSelect) {
        aiProviderSelect.addEventListener('change', (e) => {
        const provider = e.target.value;
        const endpointField = document.getElementById('aiEndpoint');
        const modelField = document.getElementById('aiModel');
        const customSection = document.getElementById('customEndpointSection');
        
        if (provider === 'openai') {
            endpointField.value = 'https://api.openai.com/v1/chat/completions';
            modelField.placeholder = 'gpt-4o-mini (cheap) or gpt-4o (best)';
            customSection.style.display = 'none';
        } else if (provider === 'github') {
            endpointField.value = 'https://models.inference.ai.azure.com/chat/completions';
            modelField.placeholder = 'gpt-4o-mini (FREE!)';
            customSection.style.display = 'none';
        } else if (provider === 'anthropic') {
            endpointField.value = 'https://api.anthropic.com/v1/messages';
            modelField.placeholder = 'claude-3-5-sonnet-20241022';
            customSection.style.display = 'none';
        } else {
            modelField.placeholder = 'Enter model name';
            customSection.style.display = 'block';
        }
        });
    }
    
    // AI Chat functionality
    const askAIBtn = document.getElementById('askAIBtn');
    if (askAIBtn) {
        askAIBtn.addEventListener('click', async () => {
        const input = document.getElementById('aiInput');
        const message = input.value.trim();
        
        if (!message) {
            alert('Please enter a message!');
            return;
        }
        
        input.value = '';
        await callAI(message, true);
        });
    }
    
    const analyzeProgressBtn = document.getElementById('analyzeProgressBtn');
    if (analyzeProgressBtn) {
        analyzeProgressBtn.addEventListener('click', async () => {
            await analyzeProgress();
        });
    }
    
    // Allow Enter to send message (Shift+Enter for newline)
    const aiInputField = document.getElementById('aiInput');
    if (aiInputField) {
        aiInputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const askBtn = document.getElementById('askAIBtn');
            if (askBtn) askBtn.click();
        }
        });
    }
}

// Show save status message
function showSaveStatus() {
    const status = document.getElementById('saveStatus');
    status.textContent = '✓ Saved!';
    status.classList.add('show');
    
    setTimeout(() => {
        status.classList.remove('show');
    }, 2000);
}

// ============ AI COACH FUNCTIONS ============

// Add chat message to UI
function addChatMessage(role, content, saveToHistory = true) {
    const chatHistory = document.getElementById('aiChatHistory');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}-message`;
    
    if (role === 'user') {
        messageDiv.innerHTML = `<strong>You:</strong> ${content}`;
    } else {
        messageDiv.innerHTML = `<strong>🤖 AI Coach:</strong><br>${content.replace(/\n/g, '<br>')}`;
    }
    
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    if (saveToHistory) {
        gameState.aiChatHistory.push({ role, content });
        // Keep only last 20 messages
        if (gameState.aiChatHistory.length > 20) {
            gameState.aiChatHistory = gameState.aiChatHistory.slice(-20);
        }
        saveGame();
    }
}

// Generate progress analysis context
function generateProgressContext() {
    const maxHP = getMaxHP();
    const maxMP = getMaxMP();
    const hpPercent = ((gameState.currentHP / maxHP) * 100).toFixed(1);
    const mpPercent = ((gameState.currentMP / maxMP) * 100).toFixed(1);
    
    // Calculate quest completion rates
    const questStats = {};
    for (let category in gameState.quests) {
        const completed = Object.values(gameState.quests[category]).filter(q => q).length;
        const total = Object.values(gameState.quests[category]).length;
        questStats[category] = { completed, total, percent: ((completed/total)*100).toFixed(1) };
    }
    
    const context = `
HELL MODE HUNTER STATUS REPORT:

Player: ${gameState.playerName}
Level: ${gameState.level} | Rank: ${getCurrentRank()}
HP: ${Math.floor(gameState.currentHP)}/${maxHP} (${hpPercent}%)
MP: ${Math.floor(gameState.currentMP)}/${maxMP} (${mpPercent}%)
EXP: ${gameState.currentExp}/${getRequiredExp(gameState.level)}

STATS:
- Strength: ${gameState.stats.strength}
- Agility: ${gameState.stats.agility}
- Intelligence: ${gameState.stats.intelligence}
- Vitality: ${gameState.stats.vitality}
- Sense: ${gameState.stats.sense}
- Available Points: ${gameState.availablePoints}

TODAY'S QUEST COMPLETION:
- Fitness: ${questStats.fitness.completed}/${questStats.fitness.total} (${questStats.fitness.percent}%)
- Career: ${questStats.career.completed}/${questStats.career.total} (${questStats.career.percent}%)
- Wealth: ${questStats.wealth.completed}/${questStats.wealth.total} (${questStats.wealth.percent}%)
- Confidence: ${questStats.confidence.completed}/${questStats.confidence.total} (${questStats.confidence.percent}%)

STREAKS:
- Fitness: ${gameState.streaks.fitness} days
- Career: ${gameState.streaks.career} days
- Wealth: ${gameState.streaks.wealth} days
- Confidence: ${gameState.streaks.confidence} days
- Total: ${gameState.streaks.total} days

DANGER STATUS:
- Consecutive Failures: ${gameState.consecutiveFailures} days
- HP Status: ${hpPercent <= 10 ? 'CRITICAL - DEATH IMMINENT!' : hpPercent <= 30 ? 'DANGER' : 'Safe'}
- MP Status: ${mpPercent <= 10 ? 'CRITICAL' : mpPercent <= 30 ? 'DANGER' : 'Safe'}

${gameState.dailyNotes ? `\nPLAYER NOTES:\n${gameState.dailyNotes}` : ''}

You are a brutal, motivational AI coach in a HELL MODE leveling system inspired by Solo Leveling. Analyze this hunter's progress with tough love. Be direct, motivational, and strategic. Point out dangers, celebrate wins, and provide actionable advice.`.trim();
    
    return context;
}

// Call AI API
async function callAI(userMessage, includeContext = true) {
    if (!gameState.aiSettings.enabled || !gameState.aiSettings.apiKey) {
        addChatMessage('assistant', '⚠️ AI is not configured. Click "AI Coach Settings" to set up your API key.');
        return;
    }
    
    // Add user message to UI
    addChatMessage('user', userMessage);
    
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-message assistant-message loading';
    loadingDiv.innerHTML = '<strong>🤖 AI Coach:</strong><br>Analyzing... 💭';
    document.getElementById('aiChatHistory').appendChild(loadingDiv);
    
    try {
        const messages = [];
        
        // Add system context if requested
        if (includeContext) {
            messages.push({
                role: 'system',
                content: generateProgressContext()
            });
        }
        
        // Add conversation history (last 5 exchanges)
        const recentHistory = gameState.aiChatHistory.slice(-10);
        recentHistory.forEach(msg => {
            messages.push({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.content });
        });
        
        // Add current user message
        messages.push({ role: 'user', content: userMessage });
        
        // Prepare API request
        let response;
        
        if (gameState.aiSettings.provider === 'openai' || gameState.aiSettings.provider === 'custom' || gameState.aiSettings.provider === 'github') {
            response = await fetch(gameState.aiSettings.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${gameState.aiSettings.apiKey}`
                },
                body: JSON.stringify({
                    model: gameState.aiSettings.model,
                    messages: messages,
                    temperature: 0.8,
                    max_tokens: 1000
                })
            });
        } else if (gameState.aiSettings.provider === 'anthropic') {
            const systemMsg = messages.find(m => m.role === 'system');
            const conversationMsgs = messages.filter(m => m.role !== 'system');
            
            response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': gameState.aiSettings.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: gameState.aiSettings.model,
                    system: systemMsg ? systemMsg.content : '',
                    messages: conversationMsgs,
                    max_tokens: 1000
                })
            });
        }
        
        loadingDiv.remove();
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }
        
        const data = await response.json();
        let aiResponse;
        
        if (gameState.aiSettings.provider === 'anthropic') {
            aiResponse = data.content[0].text;
        } else {
            aiResponse = data.choices[0].message.content;
        }
        
        addChatMessage('assistant', aiResponse);
        
    } catch (error) {
        loadingDiv.remove();
        addChatMessage('assistant', `❌ Error: ${error.message}\n\nPlease check your API settings and try again.`);
        console.error('AI API Error:', error);
    }
}

// Analyze progress automatically
async function analyzeProgress() {
    const analysisPrompt = `Analyze my Hell Mode progress comprehensively. Give me:
1. Current danger assessment
2. What I'm doing well
3. What I'm failing at
4. Immediate action items
5. Strategy to avoid death penalty

Be brutally honest but motivational. This is HELL MODE - no sugarcoating!`;
    
    await callAI(analysisPrompt, true);
}

// Initialize the game
function init() {
    console.log('Solo Leveling App Initializing...');
    loadGame();
    initEventListeners();
    console.log('Event listeners attached');
    updateAllUI();
    
    // Restore quest tab selection
    if (gameState.currentQuestTab) {
        const tab = document.querySelector(`.quest-tab[data-category="${gameState.currentQuestTab}"]`);
        if (tab) {
            tab.click();
        }
    }
    console.log('Initialization complete');
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
