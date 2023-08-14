new Vue({
    el: '#app',
    data: {
        queue: [],
        note: ''
    },
    /**
     * Executes when the component is mounted.
     *
     * @param {none} none - No parameters required.
     * @return {none} No return value.
     */
    mounted() {
        chrome.storage.sync.get('queue', (data) => {
            if (data.queue) {
                this.queue = data.queue;
            }
        });
    },
    methods: {
        /**
         * Adds the current site to the queue.
         *
         * @param {type} paramName - description of parameter
         * @return {type} description of return value
         */
        addSiteToQueue() {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const currentTab = tabs[0];
                
                chrome.tabs.captureVisibleTab(null, { format: "png" }, (screenshotUrl) => {
                    this.queue.push({
                        title: currentTab.title,
                        url: currentTab.url,
                        note: this.note,
                        thumbnail: screenshotUrl,
                        tabId: currentTab.id  // Store the tab ID
                    });
                    this.note = '';
                    chrome.storage.sync.set({ queue: this.queue });
                });
            });
        },
        
        /**
         * Remove a site from the queue at the specified index.
         *
         * @param {number} index - The index of the site in the queue.
         * @return {undefined} This function does not return a value.
         */
        removeSiteFromQueue(index) {
            this.queue.splice(index, 1);
            chrome.storage.sync.set({ queue: this.queue });
        }
    }
});
