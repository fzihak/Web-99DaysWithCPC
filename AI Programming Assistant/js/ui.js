/**
 * Handles UI interactions and state
 */
class UIHandler {
    constructor() {
        // UI Elements
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        this.clearButton = document.getElementById('clear-history');
        this.themeToggle = document.getElementById('theme-toggle');
        this.charCount = document.getElementById('char-count');
        this.connectionStatus = document.getElementById('connection-status');
        this.errorModal = document.getElementById('error-modal');
        this.retryButton = document.getElementById('retry-connection');

        // Bind methods
        this.handleInput = this.handleInput.bind(this);
        this.handleThemeToggle = this.handleThemeToggle.bind(this);
        this.updateCharCount = this.updateCharCount.bind(this);

        // Initialize
        this.setupEventListeners();
        this.loadTheme();
    }

    /**
     * Setup event listeners for UI elements
     */
    setupEventListeners() {
        // Input handling
        this.messageInput.addEventListener('input', this.handleInput);
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (this.sendButton.disabled) return;
                this.sendButton.click();
            }
        });

        // Theme toggle
        this.themeToggle.addEventListener('click', this.handleThemeToggle);

        // Clear history
        this.clearButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the chat history?')) {
                this.emit('clearHistory');
            }
        });

        // Character count
        this.messageInput.addEventListener('input', this.updateCharCount);
    }

    /**
     * Handle input changes
     */
    handleInput() {
        const value = this.messageInput.value.trim();
        this.sendButton.disabled = value.length === 0;
        utils.autoResizeTextarea(this.messageInput);
    }

    /**
     * Update character count
     */
    updateCharCount() {
        const current = this.messageInput.value.length;
        const max = this.messageInput.maxLength;
        this.charCount.textContent = `${current}/${max}`;
    }

    /**
     * Handle theme toggle
     */
    handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        utils.setSessionStorage('theme', newTheme);
        
        // Update syntax highlighting theme
        const themeLinkElement = document.getElementById('theme-highlight');
        themeLinkElement.href = newTheme === 'dark' 
            ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
            : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    }

    /**
     * Load saved theme
     */
    loadTheme() {
        const savedTheme = utils.getSessionStorage('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    /**
     * Update connection status UI
     * @param {string} status - Connection status
     * @param {string} message - Status message
     */
    updateConnectionStatus(status, message) {
        this.connectionStatus.className = `connection-status visible ${status}`;
        this.connectionStatus.textContent = message;

        if (status === 'connected') {
            setTimeout(() => {
                this.connectionStatus.classList.remove('visible');
            }, 3000);
        }
    }

    /**
     * Show error modal
     * @param {string} message - Error message
     */
    showErrorModal(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        this.errorModal.classList.add('visible');
    }

    /**
     * Hide error modal
     */
    hideErrorModal() {
        this.errorModal.classList.remove('visible');
    }

    /**
     * Clear input
     */
    clearInput() {
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.sendButton.disabled = true;
        this.updateCharCount();
    }

    /**
     * Get input value
     * @returns {string} Input value
     */
    getInputValue() {
        return this.messageInput.value.trim();
    }

    /**
     * Focus input
     */
    focusInput() {
        this.messageInput.focus();
    }

    /**
     * Disable input
     */
    disableInput() {
        this.messageInput.disabled = true;
        this.sendButton.disabled = true;
    }

    /**
     * Enable input
     */
    enableInput() {
        this.messageInput.disabled = false;
        this.handleInput();
    }
}

// Export UIHandler
window.UIHandler = UIHandler;