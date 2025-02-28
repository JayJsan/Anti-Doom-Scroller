chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggle_shorts_feed_removal') {
    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
});
