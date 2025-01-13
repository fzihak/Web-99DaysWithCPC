/**
 * Main application entry point
 */
class App {
    constructor() {
        // Core handlers
        this.messageHandler = new MessageHandler();
        this.uiHandler = new UIHandler();
        this.ws = new WebSocket();
        
        // State tracking
        this.isProcessing = false;
        this.messageQueue = [];
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        
        // Initialize
        this.setupEventListeners();
        this.initializeConnection();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Message sending
        document.getElementById('send-button').addEventListener('click', () => {
            this.handleMessageSend();
        });

        // Clear history
        document.getElementById('clear-history').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the chat history?')) {
                this.messageHandler.clearMessages();
                utils.setSessionStorage('chatHistory', []);
            }
        });

        // Connection retry
        document.getElementById('retry-connection').addEventListener('click', () => {
            this.reconnectAttempts = 0;
            this.initializeConnection();
            this.uiHandler.hideErrorModal();
        });

        // WebSocket events
        this.ws.onMessage(this.handleIncomingMessage.bind(this));
        this.ws.onConnect(this.handleConnectionSuccess.bind(this));
        this.ws.onDisconnect(this.handleConnectionError.bind(this));

        // Load saved theme
        this.uiHandler.loadTheme();

        // Load chat history
        this.loadChatHistory();
    }

    /**
     * Initialize WebSocket connection
     */
    async initializeConnection() {
        try {
            this.uiHandler.updateConnectionStatus('connecting', 'Connecting to server...');
            await this.ws.connect();
        } catch (error) {
            this.handleConnectionError(error);
        }
    }

    /**
     * Handle successful connection
     */
    handleConnectionSuccess() {
        this.reconnectAttempts = 0;
        this.uiHandler.updateConnectionStatus('connected', 'Connected to server');
        this.uiHandler.enableInput();
        
        // Process any queued messages
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.sendMessage(message);
        }
    }

    /**
     * Handle connection error
     * @param {Error} error - Connection error
     */
    handleConnectionError(error) {
        console.error('Connection error:', error);
        this.uiHandler.updateConnectionStatus('disconnected', 'Disconnected from server');
        this.uiHandler.disableInput();

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
            
            this.uiHandler.showErrorModal(
                `Connection lost. Retrying in ${delay/1000} seconds... (Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
            );

            setTimeout(() => this.initializeConnection(), delay);
        } else {
            this.uiHandler.showErrorModal(
                'Unable to establish connection. Please check your internet connection and try again.'
            );
        }
    }

    /**
     * Handle message sending
     */
    async handleMessageSend() {
        if (this.isProcessing) return;

        const message = this.uiHandler.getInputValue();
        if (!message || message.trim().length === 0) return;

        this.isProcessing = true;
        const loadingIndicator = this.messageHandler.createLoadingIndicator();

        try {
            // Create and display user message
            const userMessage = {
                content: message,
                type: 'user',
                timestamp: new Date().toISOString()
            };

            this.messageHandler.createMessage(userMessage.content, 'user');
            this.uiHandler.clearInput();
            this.saveChatHistory(userMessage);

            // Send message
            await this.sendMessage(message);

        } catch (error) {
            console.error('Failed to send message:', error);
            this.messageHandler.createMessage(
                'Failed to send message. Please try again.',
                'ai'
            );
        } finally {
            this.messageHandler.removeLoadingIndicator(loadingIndicator);
            this.isProcessing = false;
            this.uiHandler.focusInput();
        }
    }

    /**
     * Send message to server
     * @param {string} message - Message to send
     */
    async sendMessage(message) {
        if (!this.ws.isConnected()) {
            this.messageQueue.push(message);
            throw new Error('Not connected to server');
        }

        try {
            await this.ws.send({
                type: 'message',
                content: message,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            this.messageQueue.push(message);
            throw error;
        }
    }

    /**
     * Handle incoming messages
     * @param {Object} data - Message data
     */
    handleIncomingMessage(data) {
        if (!data || !data.content) return;

        const aiMessage = {
            content: data.content,
            type: 'ai',
            timestamp: new Date().toISOString()
        };

        // Remove loading indicator if exists
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            this.messageHandler.removeLoadingIndicator(loadingIndicator);
        }

        // Create message and save to history
        this.messageHandler.createMessage(aiMessage.content, 'ai');
        this.saveChatHistory(aiMessage);

        // Process code blocks if any
        this.processCodeBlocks();
    }

    /**
     * Process and highlight code blocks in messages
     */
    processCodeBlocks() {
        document.querySelectorAll('pre code').forEach(block => {
            if (!block.classList.contains('hljs')) {
                const code = block.textContent;
                const language = utils.detectLanguage(code);
                block.classList.add(`language-${language}`);
                hljs.highlightElement(block);
            }
        });
    }

    /**
     * Load chat history from session storage
     */
    loadChatHistory() {
        const history = utils.getSessionStorage('chatHistory') || [];
        history.forEach(message => {
            this.messageHandler.createMessage(message.content, message.type);
        });
    }

    /**
     * Save message to chat history
     * @param {Object} message - Message to save
     */
    saveChatHistory(message) {
        const history = utils.getSessionStorage('chatHistory') || [];
        history.push(message);
        utils.setSessionStorage('chatHistory', history);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});