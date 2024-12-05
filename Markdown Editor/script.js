const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');

// Editor
let isFullScreen = false;
let isDarkMode = false;
let lastCursorPosition = 0;

// Marked options
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false,
    sanitize: false,
    silent: true,
    smartLists: true,
    smartypants: true,
    langPrefix: 'language-',
    highlight: function(code, lang) {
        return code;
    }
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const updatePreview = debounce(() => {
    const text = editor.value;
    try {
        requestAnimationFrame(() => {
            preview.innerHTML = marked.parse(text);
            updateCounts();
            saveToLocalStorage();
        });
    } catch (error) {
        console.error('Markdown parsing error:', error);
        preview.innerHTML = '<p class="error">Error rendering markdown</p>';
    }
}, 10);

function updateCounts() {
    const text = editor.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = text.length;
    wordCount.textContent = `${words} words`;
    charCount.textContent = `${chars} characters`;
}

function formatText(command) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    const selectedText = text.substring(start, end);
    let formatted = '';
    let cursorOffset = 0;

    switch(command) {
        case 'heading':
            formatted = selectedText ? `## ${selectedText}` : '## Heading';
            cursorOffset = selectedText ? formatted.length : 3;
            break;
        case 'bold':
            formatted = selectedText ? `**${selectedText}**` : '**bold text**';
            cursorOffset = selectedText ? formatted.length : 2;
            break;
        case 'italic':
            formatted = selectedText ? `*${selectedText}*` : '*italic text*';
            cursorOffset = selectedText ? formatted.length : 1;
            break;
        case 'strikethrough':
            formatted = selectedText ? `~~${selectedText}~~` : '~~strikethrough text~~';
            cursorOffset = selectedText ? formatted.length : 2;
            break;
        case 'link':
            formatted = selectedText ? `[${selectedText}](url)` : '[link text](url)';
            cursorOffset = formatted.length - 1;
            break;
        case 'image':
            formatted = '![alt text](image-url)';
            cursorOffset = 2;
            break;
        case 'code':
            if (selectedText.includes('\n')) {
                formatted = `\`\`\`\n${selectedText || 'code block'}\n\`\`\``;
            } else {
                formatted = selectedText ? `\`${selectedText}\`` : '`code`';
            }
            cursorOffset = selectedText ? formatted.length : 1;
            break;
        case 'bullet-list':
            formatted = selectedText ? selectedText.split('\n').map(line => `- ${line}`).join('\n') : '- list item';
            cursorOffset = 2;
            break;
        case 'number-list':
            formatted = selectedText ? 
                selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n') : 
                '1. list item';
            cursorOffset = 3;
            break;
        case 'task-list':
            formatted = selectedText ? 
                selectedText.split('\n').map(line => `- [ ] ${line}`).join('\n') : 
                '- [ ] task item';
            cursorOffset = 6;
            break;
        case 'quote':
            formatted = selectedText ? 
                selectedText.split('\n').map(line => `> ${line}`).join('\n') : 
                '> blockquote';
            cursorOffset = 2;
            break;
        case 'table':
            formatted = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1 | Cell 2 |';
            cursorOffset = formatted.length;
            break;
        case 'horizontal-rule':
            formatted = '\n---\n';
            cursorOffset = formatted.length;
            break;
    }
    editor.value = text.substring(0, start) + formatted + text.substring(end);
        
        const newPosition = start + (selectedText ? formatted.length : cursorOffset);
        editor.selectionStart = newPosition;
        editor.selectionEnd = newPosition;
        
        editor.focus();
        updatePreview();
    }

    function copyToClipboard() {
        const textToCopy = editor.value;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Content copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            showNotification('Failed to copy content', 'error');
        });
    }
    
    function clearEditor() {
    const editor = document.getElementById('editor');
    editor.value = '';
    updatePreview();
    updateCounts();
    showNotification('Editor content cleared!', 'success');
}

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }

    function togglePreviewMode() {
        const editorContainer = document.querySelector('.editor-container');
        const previewContainer = document.querySelector('.preview-container');
        
        isFullScreen = !isFullScreen;
        
        if (isFullScreen) {
            editorContainer.style.display = 'none';
            previewContainer.style.flex = '1';
        } else {
            editorContainer.style.display = 'flex';
            previewContainer.style.flex = '1';
        }
    }

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    }

    function saveToLocalStorage() {
        localStorage.setItem('markdownContent', editor.value);
    }

    function loadFromLocalStorage() {
        const savedContent = localStorage.getItem('markdownContent');
        if (savedContent) {
            editor.value = savedContent;
            updatePreview();
        }
        
        if (localStorage.getItem('darkMode') === 'true') {
            toggleDarkMode();
        }
    }
    
    function toggleDropdown(dropdownId) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                if (dropdown.contains(document.getElementById(dropdownId))) {
                    dropdown.classList.toggle('active');
                } else {
                    dropdown.classList.remove('active');
                }
            });
        }