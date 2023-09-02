document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize the toggle switch based on stored settings
    chrome.storage.sync.get('enabled', (data) => {
      document.getElementById('toggleSwitch').checked = !!data.enabled;
    });
  
    // Listen for changes to the toggle switch
    document.getElementById('toggleSwitch').addEventListener('change', (event) => {
      chrome.storage.sync.set({ enabled: event.target.checked });
    });
  });
  