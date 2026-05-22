# 🗡️ Solo Leveling: Life Progress Tracker

## 💀 HELL MODE ACTIVE 💀
## 🤖 AI COACH ENABLED 🤖

A gamified personal development app inspired by Solo Leveling anime. Track your real-life progress in fitness, career, wealth, and confidence building - **with brutal penalties for failure and an AI coach to guide you!**

## 🎯 Features

### 📊 Core System
- **Leveling System**: Gain EXP and level up (1-200+) with challenging progression
- **Rank System**: Progress from E-Rank to SSS-Rank
- **Auto-Stat Growth**: Stats automatically increase based on quest types completed!
  - 💪 **Fitness Quests** → +Strength, +Vitality
  - 💼 **Career Quests** → +Intelligence, +Sense
  - 💰 **Wealth Quests** → +Intelligence, +Agility
  - ✨ **Confidence Quests** → +Sense, +Agility
- **Manual Stat Points**: Earn 5 additional points per level up to allocate freely
- **HP/MP Bars**: Visual representation that scales with your stats

### 🎯 Daily Quests (4 Categories)

#### 💪 Fitness Quests
- Morning workout (30 min) - +50 EXP
- Eat healthy meals - +40 EXP  
- Drink 8 glasses of water - +30 EXP
- 10,000 steps - +50 EXP
- Sleep 7-8 hours - +40 EXP

#### 💼 Career Quests
- Learn new skill (1 hour) - +80 EXP
- Complete work tasks on time - +60 EXP
- Deep work session (2 hours) - +70 EXP
- Network with someone - +50 EXP
- Update portfolio/resume - +60 EXP

#### 💰 Wealth Quests
- Track expenses - +40 EXP
- Save/invest money - +60 EXP
- Read about finance (30 min) - +50 EXP
- No unnecessary purchases - +50 EXP
- Work on side income - +80 EXP

#### ✨ Confidence Quests
- Meditation (10 min) - +40 EXP
- Journal/gratitude practice - +40 EXP
- Do something that scares you - +70 EXP
- Dress well/good grooming - +30 EXP
- Have meaningful conversation - +50 EXP

### 🏆 Achievements & Streaks
- Track daily streaks for each category
- Fitness, Career, Wealth, and Confidence streaks
- Total quest completion streak
- Streaks increase when you complete all quests in a category

### ⚡ Quick Actions
Completed a major milestone? Claim instant rewards:
- Gym Session (+50 EXP)
- Learned New Skill (+100 EXP)
- Career Win (+150 EXP)
- Saved Money (+100 EXP)
- Social Victory (+75 EXP)
- Major Achievement (+200 EXP)

### 📝 Daily Notes
- Journal your goals, wins, and reflections
- Plan tomorrow's tasks
- Auto-saves as you type
## 🤖 AI HELL MODE COACH

Your personal AI assistant analyzes your progress, provides brutal feedback, and helps you survive Hell Mode!

### Features:
- **Real-time Analysis**: AI evaluates your HP, stats, quests, and danger level
- **Automatic Feedback**: Get AI analysis after penalties or completing categories
- **Strategic Advice**: Ask for specific help on any area
- **Motivational Support**: AI provides tough love when you need it
- **Progress Tracking**: Conversation history saved for continuity

### Supported AI Providers:
1. **OpenAI** (GPT-4, GPT-4o-mini, GPT-3.5-turbo)
   - Get API key: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Recommended models: `gpt-4o-mini` (cheap), `gpt-4o` (powerful)

2. **Anthropic** (Claude 3.5 Sonnet, Claude 3 Opus)
   - Get API key: [console.anthropic.com](https://console.anthropic.com)
   - Recommended model: `claude-3-5-sonnet-20241022`

3. **Custom API** (Any OpenAI-compatible endpoint)
   - Use local models, proxy services, or other providers

### AI Coach Functions:
- 📊 **Analyze Progress**: Comprehensive Hell Mode status report
- 💬 **Ask Questions**: Get advice on any topic
- 🎯 **Strategy Planning**: How to survive and thrive
- ⚡ **Automatic Alerts**: AI comments on penalties and achievements
- 🔥 **Motivation**: Tough love when you're slacking

### Example Questions:
- "How am I doing today?"
- "What should I focus on to avoid death?"
- "Give me a strategy to build my career streak"
- "I'm at 15% HP - what do I do?"
- "Analyze my weakest area and give me action items"

### Security:
- ⚠️ API keys stored **locally** in your browser only
- Never shared or transmitted except to your chosen AI provider
- You control your data completely
- Can clear settings anytime
## � HELL MODE PENALTY SYSTEM

This app features a **BRUTAL penalty system** to keep you accountable:

### ⚠️ Daily Penalties (Applied Each Day You Fail)

#### 1. **HP Loss** 
- **Fitness category incomplete** → Lose 15% max HP
- **3+ consecutive day failures** → Lose 30% max HP
- Visual danger states: Yellow (30% HP), Red blinking (10% HP)

#### 2. **MP Loss**
- **Career category incomplete** → Lose 15% max MP  
- **Wealth category incomplete** → Lose 15% max MP
- Represents mental exhaustion from neglecting growth

#### 3. **Stat Decay**
- Complete **less than 50%** of any category → Lose stats gained from that category
  - Fitness fails → -1 Strength, -1 Vitality
  - Career fails → -1 Intelligence, -1 Sense
  - Wealth fails → -1 Intelligence, -1 Agility
  - Confidence fails → -1 Sense, -1 Agility
- Stats cannot go below base values (10)

#### 4. **EXP Debt**
- **Every incomplete category** → Lose EXP (50 + Level × 10)
- Higher level = more EXP lost
- Can drop to 0 EXP but won't lose levels (unless death occurs)

#### 5. **Streak Loss**
- All category streaks decrease by 1 when not completed
- Total streak resets if you miss any category

### ☠️ DEATH PENALTY (Below 10% HP)

When your HP drops below 10%:
- **Level Down**: Lose 1 level (minimum level 1)
- **Stat Loss**: All stats reduced by 2 points
- **EXP Reset**: Current EXP drops to 0
- **Streak Wipe**: All streaks reset to 0
- **HP/MP Recovery**: Restored to 50% of max values
- **Consecutive Failures Reset**: Counter resets

### 🔥 Consecutive Failure Counter
- Tracks days where you failed to complete ALL quests
- **3 consecutive failures** → Massive HP penalty (30% max HP)
- Resets when you complete all quests in a day

### 📅 MULTI-DAY ABSENCE PENALTY

**THIS IS TRUE HELL MODE:**

If you don't open the app for multiple days, penalties accumulate **for each day missed**!

**Example: 3 Days Absent**
- Day 1: -15% HP, -15% MP, -EXP, -Stats
- Day 2: -15% HP, -15% MP, -EXP, -Stats  
- Day 3: -15% HP, -15% MP, -EXP, -Stats
- **Total: -45% HP, -45% MP, massive stat decay**

**You CANNOT escape Hell Mode by avoiding the app!**

When you return:
- You'll see a comprehensive penalty breakdown for each missed day
- AI coach (if configured) will analyze your absence and provide recovery strategy
- Your HP may be critically low - immediate action required
- Death penalty may have triggered if HP dropped below 10%

**This ensures accountability even when you're tempted to quit!**

## ⚡ Survival Tips

1. **Prioritize Fitness Quests**: They protect your HP
2. **Balance All Categories**: Don't neglect any area
3. **Watch Your HP**: Get notifications when HP is critical
4. **Complete Full Categories**: Get auto-stat bonuses as protection
5. **Never Break Streaks**: Streaks are your shield against decay
6. **Level Up for Safety**: More stats = higher max HP/MP

## �💾 Data Persistence

Your progress is automatically saved to your browser's localStorage:
- All stats, level, and EXP are saved
- Quest completion status persists
- Streak data is maintained
- Notes are auto-saved
- Data survives page refreshes and browser restarts

**To reset:** Click the "Reset Progress" button (requires confirmation)

## 📱 Responsive Design

Fully optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Portrait and landscape orientations

## 🎮 How to Use

### Initial Setup:
1. **Open [index.html](index.html)** in any modern web browser
2. **Click "🤖 AI Coach Settings"** to configure your AI assistant
3. **Choose your AI provider** (OpenAI, Anthropic, or Custom)
4. **Enter your API key** and model name
5. **Test the connection** - AI will introduce itself
6. **Enter your hunter name** to personalize your profile

### Daily Workflow:
1. **Complete daily quests** in all four categories
2. **Watch your stats grow automatically** when you complete all quests in a category
3. **Get AI feedback** - AI automatically analyzes penalties and achievements
4. **Ask your AI coach** for advice, motivation, or strategy
5. **Click "Analyze Progress"** for comprehensive Hell Mode assessment
6. **Level up** to earn bonus stat points (5 points per level)
7. **Track your streaks** and avoid consecutive failures
8. **Journal daily** to reflect on your progress

### With AI Coach:
- **After penalties**: AI analyzes what went wrong and how to recover
- **After completing a category**: AI celebrates your win
- **When stuck**: Ask "What should I focus on?"
- **Low HP warning**: Ask "I'm at low HP, what's my survival strategy?"
- **Planning**: Ask "Help me plan tomorrow to maximize growth"

## 🎯 Tips for Success

### Auto-Stat Growth System
Complete **ALL quests in any category** to unlock automatic stat increases:
- 💪 **Complete all Fitness quests** → +1 Strength, +1 Vitality
- 💼 **Complete all Career quests** → +1 Intelligence, +1 Sense  
- 💰 **Complete all Wealth quests** → +1 Intelligence, +1 Agility
- ✨ **Complete all Confidence quests** → +1 Sense, +1 Agility

This rewards consistency and completing full daily routines!

### Building Streaks
Complete all quests in a category daily to build your streak. Miss a day and your streak decreases!

### Smart Stat Allocation
- **Strength**: Physical power (roleplay value)
- **Agility**: Speed and reflexes (roleplay value)
- **Intelligence**: Increases max MP
- **Vitality**: Increases max HP
- **Sense**: Perception (roleplay value)

### Stay Consistent
- Check in daily to maintain your streaks
- Use the notes section to plan your day
- Celebrate wins with Quick Actions

## 🚀 Arise and Level Up!

This is your personal hunter system with **HELL MODE** activated. Every day is an opportunity to become stronger, smarter, wealthier, and more confident - **but failure comes with severe consequences.**

The system is unforgiving. Missing quests will hurt. Your HP will drop. Your stats will decay. Fail for 3 consecutive days and face near-death.

**But that's the point.**

This isn't a casual game. This is a system to forge discipline, build real habits, and transform your life. The penalties are harsh because **real life is harsh**. The difference is, here you can see your progress and understand the cost of inaction.

### ⚠️ WARNING
This Hell Mode is designed for serious individuals committed to self-improvement. If you're not ready for brutal accountability, this isn't for you.

**The system has chosen you. Will you survive?**

---

*"The weakest die. The strong survive. Arise!"* 💀

---

## 🛡️ For New Hunters

### Getting Started Without AI:
The app works perfectly without AI - you'll still get Hell Mode penalties and automatic stat growth. AI is optional but highly recommended for maximum accountability and personalized guidance.

### Setting Up AI (Recommended):

**Option 1: OpenAI (Easiest)**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account and add payment method ($5 is plenty)
3. Get API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
4. In the app, click "AI Coach Settings"
5. Choose "OpenAI" and enter model: `gpt-4o-mini` (cheap) or `gpt-4o` (best)
6. Paste your API key
7. Click "Save & Test Connection"

**Option 2: Anthropic Claude**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account and add credits
3. Get API key from the console
4. In the app, choose "Anthropic" and enter model: `claude-3-5-sonnet-20241022`
5. Paste your API key

**Cost Estimates:**
- OpenAI GPT-4o-mini: ~$0.01 per day of active use
- OpenAI GPT-4o: ~$0.05-0.10 per day
- Anthropic Claude: ~$0.02-0.05 per day

### Modifying Hell Mode Difficulty:
If Hell Mode is too intense, you can modify the penalties in [script.js](script.js):
- Find the `checkDailyReset()` function
- Adjust penalty percentages (currently 15% and 30%)
- Reduce stat decay requirements
- Disable death penalty by commenting out `applyDeath()`

But remember: **Easy mode won't transform your life. The AI coach helps you survive Hell Mode - use it!**

## ⚠️ Important Notes

- **Privacy**: Your API key is stored only in your browser's localStorage. It never leaves your device except to call your chosen AI provider.
- **Data Persistence**: All progress, stats, quests, streaks, and AI chat history are saved locally.
- **No Backend**: This is a 100% client-side app. Your data stays on your device.
- **API Costs**: You pay your AI provider directly based on usage. Monitor your usage in their dashboards.

## 🆘 Troubleshooting

### "AI Coach Settings" Button Not Working

If clicking the button does nothing:

1. **Open Browser Console** (F12) and look for errors
2. **Hard refresh** the page (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check console messages**: Should see "AI Settings button clicked!" when you click
4. **Try different browser**: Chrome, Firefox, Edge
5. **Manual workaround**: Run in console: `document.getElementById('aiSettingsModal').style.display = 'block';`

📖 **See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed debugging steps**

### AI Configuration Issues

**Problem: "Cannot configure AI" or connection fails**

**Solution Steps:**

1. **Check API Key Format**
   - OpenAI keys start with `sk-`
   - Anthropic keys start with `sk-ant-`
   - No extra spaces before/after the key

2. **Verify Model Name**
   - OpenAI: Use `gpt-4o-mini` (cheapest) or `gpt-4o`
   - Anthropic: Use `claude-3-5-sonnet-20241022`
   - Model names are case-sensitive!

3. **Check Payment/Credits**
   - OpenAI: Go to [platform.openai.com/settings/organization/billing](https://platform.openai.com/settings/organization/billing)
   - Add payment method and ensure positive balance
   - Anthropic: Add credits at [console.anthropic.com](https://console.anthropic.com)

4. **Test API Key Manually**
   - Open browser developer console (F12)
   - Try the API call directly
   - Check for specific error messages

5. **Common Errors:**
   - `401 Unauthorized` → Wrong API key
   - `429 Rate Limit` → Out of credits or free tier limit
   - `404 Not Found` → Wrong model name
   - `500 Server Error` → Provider issue, try again later

6. **Alternative Solution:**
   - Try a different AI provider
   - Use "Custom API" with a proxy service
   - Continue without AI (app works fine without it)

**Still not working?**
- Check browser console (F12) for detailed error messages
- Verify you're on the correct AI provider's website
- Try clearing browser cache and reconfiguring
- Ensure you have internet connection

### Multi-Day Absence

### Multi-Day Absence

**Q: What happens if I don't open the app for several days?**

**A: BRUTAL PENALTIES ACCUMULATE!**

Hell Mode tracks every single day you miss:
- Each day applies full penalties
- If you're gone 5 days, you get 5 days worth of damage
- Can easily trigger death penalty upon return
- AI will analyze the full damage when you return

**Example:**
- Day 1: You complete 0 quests
- Days 2-4: You don't open the app
- Day 5: You return
- **Result:** 4 days of accumulated penalties hit all at once

**Recovery Strategy:**
1. Accept the penalty notification
2. Ask AI: "I was absent X days, how do I recover?"
3. Prioritize fitness quests to restore HP
4. Complete all categories today to stop the bleeding
5. Build streaks immediately to prevent further damage

**Prevention:**
- Open the app EVERY day, even if just to check in
- Set a daily reminder
- Keep the app bookmarked
- Hell Mode doesn't forgive absences!

**AI not responding?**
- Check your API key is correct
- Verify you have credits/payment method with your AI provider
- Check browser console for error messages
- Try "Clear Settings" and reconfigure

**Penalties too harsh?**
- Complete at least 3-4 quests per category to avoid major penalties
- Focus on one category at a time if needed
- Use AI coach to prioritize: "I'm struggling - what's my minimum viable routine?"

**Lost progress?**
- Data is in browser localStorage - clearing browser data will reset everything
- Use the same browser/device for persistence
- No cloud backup (by design for privacy)
