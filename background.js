chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // Get the current queue from storage
    chrome.storage.sync.get('queue', (data) => {
        if (data.queue) {
            const queue = data.queue;
            // Find the site corresponding to the closed tab and remove it
            const index = queue.findIndex(site => site.tabId === tabId);
            if (index !== -1) {
                queue.splice(index, 1);
                chrome.storage.sync.set({ queue: queue });
            }
        }
    });
});

