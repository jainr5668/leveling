# 🔧 Troubleshooting Guide

## AI Coach Settings Button Not Working

If clicking the "🤖 AI Coach Settings" button does nothing, follow these steps:

### Step 1: Check Browser Console

1. **Open Developer Tools**:
   - Windows/Linux: Press `F12` or `Ctrl + Shift + I`
   - Mac: Press `Cmd + Option + I`
   
2. **Click the Console tab**

3. **Look for errors**:
   - Red text indicates errors
   - Look for messages like "AI Settings button not found" or other errors

4. **Click the AI Settings button again** and watch the console:
   - You should see: `"AI Settings button clicked!"`
   - If you don't see this message, the event listener isn't attached

### Step 2: Verify the App Loaded Correctly

In the console, you should see:
```
Solo Leveling App Initializing...
AI Settings Button: <button id="aiSettingsBtn"...>
Event listeners attached
Initialization complete
```

If you don't see these messages, the JavaScript didn't load properly.

### Step 3: Common Fixes

**Fix 1: Hard Refresh**
- Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
- Mac: `Cmd + Shift + R`
- This clears cached files

**Fix 2: Clear Browser Cache**
1. Open Settings
2. Privacy & Security
3. Clear Browsing Data
4. Select "Cached images and files"
5. Click Clear

**Fix 3: Try a Different Browser**
- Chrome
- Firefox
- Edge
- Safari

**Fix 4: Check File Integrity**
Make sure all three files are in the same folder:
- `index.html`
- `script.js`
- `styles.css`

**Fix 5: Manual Test**
Open the browser console and type:
```javascript
document.getElementById('aiSettingsBtn').click()
```
If this opens the modal, the button works but event listener failed to attach.

### Step 4: Workaround

If nothing works, you can manually open the AI settings modal by running this in the console:
```javascript
document.getElementById('aiSettingsModal').style.display = 'block';
```

Then configure your AI and save settings.

### Step 5: Report the Issue

If none of the above works:
1. Note your browser name and version
2. Copy any error messages from console
3. Take a screenshot
4. Note what you tried
5. Open an issue or contact support

## Other Common Issues

### Modal Opens But Nothing Appears
- The modal content may be loading
- Check console for errors
- Try refreshing the page

### Button Appears Greyed Out
- This is normal CSS styling
- The button should still be clickable
- Try hovering over it to see the hover effect

### JavaScript Errors on Load
- Check all files are in the correct location
- Verify you're opening `index.html` not just viewing files
- Make sure browser supports ES6 JavaScript (update your browser)

### Nothing Happens When Testing Connection
- Check API key is correct
- Verify internet connection
- Check browser console for network errors
- Verify API provider is not down (check their status page)

## Debug Mode

To enable verbose debugging, open the console and run:
```javascript
localStorage.setItem('debug', 'true');
location.reload();
```

This will show additional debug messages in the console.

To disable:
```javascript
localStorage.removeItem('debug');
location.reload();
```

## Still Having Issues?

The app works 100% client-side with no backend required. If you're still having issues:

1. Make sure you're using a modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
2. Enable JavaScript in your browser settings
3. Disable browser extensions that might interfere (ad blockers, script blockers)
4. Try opening in an incognito/private window
5. Check if antivirus software is blocking JavaScript execution

## Known Limitations

- The app requires localStorage support (all modern browsers have this)
- API calls require CORS support (handled by AI providers)
- Some corporate networks may block API calls to AI providers
- Older browsers may not support ES6 features like `async/await`
