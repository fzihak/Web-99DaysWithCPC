/**
 * Handles WebSocket connection and communication
 */
class WebSocketHandler {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000; // Start with 1 second delay
        this.listeners = new Map();
        
        this.connect();
    }

    /**
     * Initialize WebSocket connection
     */
    connect() {
        try {
            this.ws = new WebSocket(this.url);
            this.setupEventListeners();
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.handleConnectionError();
        }
    }

    /**
     * Setup WebSocket event listeners
     */
    setupEventListeners() {
        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
            this.reconnectDelay = 1000;
            this.emit('connected');
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            this.emit('disconnected');
            this.handleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.emit('error', error);
        };

        this.ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                this.emit('message', message);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };
    }

    /**
     * Handle WebSocket reconnection
     */
    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            console.log(`Attempting to reconnect... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
            this.emit('connecting');
            
            setTimeout(() => {
                this.reconnectAttempts++;
                this.connect();
                // Exponential backoff
                this.reconnectDelay *= 2;
            }, this.reconnectDelay);
        } else {
            this.handleConnectionError();
        }
    }

    /**
     * Handle connection error
     */
    handleConnectionError() {
        console.error('Maximum reconnection attempts reached');
        this.emit('maxReconnectAttempts');
    }

    /**
     * Send message through WebSocket
     * @param {object} message - Message to send
     * @returns {boolean} Success status
     */
    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(JSON.stringify(message));
                return true;
            } catch (error) {
                console.error('Error sending message:', error);
                return false;
            }
        }
        return false;
    }

    /**
     * Add event listener
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
    }

    /**
     * Remove event listener
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     */
    off(event, callback) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(callback);
        }
    }

    /**
     * Emit event to all listeners
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in ${event} listener:`, error);
                }
            });
        }
    }

    /**
     * Close WebSocket connection
     */
    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Export WebSocketHandler
window.WebSocketHandler = WebSocketHandler;