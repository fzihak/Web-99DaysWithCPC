/**
 * Utility functions for the chat application
 */

const utils = {
    /**
     * Get the current timestamp in a readable format
     * @returns {string} Formatted timestamp
     */
    getTimestamp() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Format code blocks within markdown text
     * @param {string} text - The text to format
     * @returns {string} Formatted text with code blocks
     */
    formatCodeBlocks(text) {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        return text.replace(codeBlockRegex, (match, language, code) => {
            const template = document.getElementById('code-block-template');
            const codeBlock = template.content.cloneNode(true);
            
            // Set language tag if provided
            if (language) {
                codeBlock.querySelector('.language-tag').textContent = language;
            } else {
                codeBlock.querySelector('.language-tag').remove();
            }
            
            // Set code content
            const codeElement = codeBlock.querySelector('code');
            codeElement.textContent = code.trim();
            if (language) {
                codeElement.className = `language-${language}`;
            }
            
            return codeBlock.querySelector('.code-block').outerHTML;
        });
    },

    /**
     * Detect code language from content
     * @param {string} code - The code to analyze
     * @returns {string} Detected language
     */
    detectLanguage(code) {
        const patterns = {
            python: /\b(def|import|from|class|if __name__ == ['"]__main__['"]:)\b/,
            javascript: /\b(function|const|let|var|=>)\b/,
            html: /<\/?[a-z][\s\S]*>/i,
            css: /[a-z-]+:\s*[^;{}]+;/,
            sql: /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\b/i,
            java: /\b(public|private|class|void|static)\b/,
            cpp: /\b(include|namespace|cout|cin|std::)\b/,
            ruby: /\b(def|end|module|require)\b/,
            php: /(<\?php|\$[a-zA-Z_])/,
            swift: /\b(func|var|let|guard|if let)\b/,
            go: /\b(func|package|import|defer|go|chan)\b/,
            rust: /\b(fn|let|mut|impl|struct|enum)\b/
        };

        for (const [language, pattern] of Object.entries(patterns)) {
            if (pattern.test(code)) {
                return language;
            }
        }

        return 'plaintext';
    },

    /**
     * Sanitize text to prevent XSS
     * @param {string} text - Text to sanitize
     * @returns {string} Sanitized text
     */
    sanitizeText(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Debounce function to limit rate of execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function to limit rate of execution
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Auto-resize textarea based on content
     * @param {HTMLTextAreaElement} textarea - Textarea element to resize
     */
    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    },

    /**
     * Store data in session storage
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    setSessionStorage(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to session storage:', error);
        }
    },

    /**
     * Retrieve data from session storage
     * @param {string} key - Storage key
     * @returns {any} Stored value or null
     */
    getSessionStorage(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from session storage:', error);
            return null;
        }
    },

    /**
     * Check if code might be malicious
     * @param {string} code - Code to check
     * @returns {boolean} True if code might be malicious
     */
    isSuspiciousCode(code) {
        const suspiciousPatterns = [
            /eval\s*\(/,
            /document\.write/,
            /<script>/i,
            /javascript:/i,
            /onerror\s*=/i,
            /onclick\s*=/i,
            /onload\s*=/i,
            /onmouseover\s*=/i,
            /new\s+Function/,
            /document\.cookie/i,
            /window\.location/i,
            /document\.location/i,
            /localStorage\./i,
            /sessionStorage\./i,
            /indexedDB\./i,
            /document\.domain/i,
            /\.innerHTML\s*=/i,
            /\.outerHTML\s*=/i,
            /XMLHttpRequest/i,
            /fetch\s*\(/,
            /WebSocket/i,
            /crypto\./i,
            /require\s*\(/,
            /process\./,
            /__proto__/,
            /prototype\.[^a-zA-Z]/
        ];

        return suspiciousPatterns.some(pattern => pattern.test(code));
    },

    /**
     * Generate a unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Export utils object
window.utils = utils;