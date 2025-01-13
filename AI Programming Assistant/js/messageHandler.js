/**
 * Handles message creation, rendering, and management
 */
class MessageHandler {
    constructor() {
        this.messageTemplate = document.getElementById('message-template');
        this.messagesContainer = document.getElementById('chat-messages');
    }

    /**
     * Create and append a new message to the chat
     * @param {string} content - Message content
     * @param {string} type - Message type ('user' or 'ai')
     */
    createMessage(content, type) {
        const messageElement = this.messageTemplate.content.cloneNode(true);
        const messageDiv = messageElement.querySelector('.message');
        const contentDiv = messageElement.querySelector('.message-content');
        const timeSpan = messageElement.querySelector('.message-time');

        // Add appropriate class based on message type
        messageDiv.classList.add(`${type}-message`);

        // Format and sanitize content
        let formattedContent = content;
        if (type === 'ai') {
            // Process markdown and code blocks for AI messages
            formattedContent = marked.parse(utils.sanitizeText(content));
            formattedContent = utils.formatCodeBlocks(formattedContent);
        } else {
            formattedContent = utils.sanitizeText(content);
        }

        // Set content and time
        contentDiv.innerHTML = formattedContent;
        timeSpan.textContent = utils.getTimestamp();

        // Add copy buttons to code blocks
        this.setupCodeBlockCopyButtons(messageDiv);

        // Append message and scroll into view
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();

        // Highlight code blocks
        messageDiv.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });

        return messageDiv;
    }

    /**
     * Setup copy buttons for code blocks
     * @param {HTMLElement} messageDiv - Message container element
     */
    setupCodeBlockCopyButtons(messageDiv) {
        messageDiv.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', () => {
                const codeBlock = button.closest('.code-block');
                const code = codeBlock.querySelector('code').textContent;
                
                navigator.clipboard.writeText(code).then(() => {
                    // Visual feedback for copy
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
                    
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                    }, 2000);
                });
            });
        });
    }

    /**
     * Create a loading indicator
     * @returns {HTMLElement} Loading indicator element
     */
    createLoadingIndicator() {
        const loading = document.createElement('div');
        loading.className = 'loading-indicator';
        loading.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(loading);
        this.scrollToBottom();
        return loading;
    }

    /**
     * Remove the loading indicator
     * @param {HTMLElement} loadingElement - Loading indicator to remove
     */
    removeLoadingIndicator(loadingElement) {
        if (loadingElement && loadingElement.parentNode) {
            loadingElement.remove();
        }
    }

    /**
     * Clear all messages from the chat
     */
    clearMessages() {
        while (this.messagesContainer.firstChild) {
            this.messagesContainer.removeChild(this.messagesContainer.firstChild);
        }
    }

    /**
     * Scroll chat to the bottom
     */
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Export MessageHandler
window.MessageHandler = MessageHandler;