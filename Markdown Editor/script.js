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

    function filterDropdownItems(dropdownId) {
const input = document.querySelector(`#${dropdownId} .search-input`);
const filter = input.value.toLowerCase();
const items = document.querySelectorAll(`#${dropdownId} .dropdown-item`);

items.forEach(item => {
    const text = item.querySelector('img').alt;
    if (text.toLowerCase().indexOf(filter) > -1) {
        item.style.display = "";
    } else {
        item.style.display = "none";
    }
});
}

    function toggleSkill(skill) {
const skillBadges = {
    // Programming Languages
    python: '![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)',
    javascript: '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)',
    typescript: '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)',
    java: '![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=java&logoColor=white)',
    csharp: '![C#](https://img.shields.io/badge/C%23-239120?style=flat&logo=c-sharp&logoColor=white)',
    cpp: '![C++](https://img.shields.io/badge/C++-00599C?style=flat&logo=c%2B%2B&logoColor=white)',
    c: '![C](https://img.shields.io/badge/C-00599C?style=flat&logo=c&logoColor=white)',
    php: '![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white)',
    ruby: '![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=flat&logo=ruby&logoColor=white)',
    swift: '![Swift](https://img.shields.io/badge/Swift-FA7343?style=flat&logo=swift&logoColor=white)',
    kotlin: '![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?style=flat&logo=kotlin&logoColor=white)',
    go: '![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)',
    rust: '![Rust](https://img.shields.io/badge/Rust-000000?style=flat&logo=rust&logoColor=white)',

    // Frontend Frameworks/Libraries
    react: '![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)',
    html: '![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)',
    css: '![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)',
    vue: '![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vue.js&logoColor=white)',
    angular: '![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)',
    svelte: '![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=flat&logo=svelte&logoColor=white)',
    jquery: '![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white)',
    nextjs: '![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)',
    nuxtjs: '![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00C58E?style=flat&logo=nuxt.js&logoColor=white)',

    // CSS Frameworks/Preprocessors
    tailwind: '![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)',
    bootstrap: '![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white)',
    sass: '![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white)',
    materialui: '![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=flat&logo=material-ui&logoColor=white)',

    // Backend Frameworks
    nodejs: '![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)',
    express: '![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)',
    django: '![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)',
    flask: '![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)',
    spring: '![Spring](https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=spring&logoColor=white)',
    laravel: '![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat&logo=laravel&logoColor=white)',
    dotnet: '![.NET](https://img.shields.io/badge/.NET-512BD4?style=flat&logo=.net&logoColor=white)',

    // Databases
    mysql: '![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)',
    postgresql: '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)',
    mongodb: '![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)',
    redis: '![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)',
    sqlite: '![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)',
    cassandra: '![Cassandra](https://img.shields.io/badge/Cassandra-1287B1?style=flat&logo=apache-cassandra&logoColor=white)',

    // Cloud Platforms
    aws: '![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)',
    azure: '![Azure](https://img.shields.io/badge/Azure-0089D6?style=flat&logo=microsoft-azure&logoColor=white)',
    gcp: '![GCP](https://img.shields.io/badge/GCP-4285F4?style=flat&logo=google-cloud&logoColor=white)',
    heroku: '![Heroku](https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white)',
    netlify: '![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)',
    vercel: '![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)',

    // DevOps & Tools
    docker: '![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)',
    kubernetes: '![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)',
    jenkins: '![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=jenkins&logoColor=white)',
    git: '![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)',
    github: '![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)',
    gitlab: '![GitLab](https://img.shields.io/badge/GitLab-FCA121?style=flat&logo=gitlab&logoColor=black)',
    nginx: '![NGINX](https://img.shields.io/badge/NGINX-009639?style=flat&logo=nginx&logoColor=white)',

    // Testing
    jest: '![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)',
    mocha: '![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat&logo=mocha&logoColor=white)',
    selenium: '![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=flat&logo=selenium&logoColor=white)',
    cypress: '![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white)',

    // Mobile Development
    reactnative: '![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)',
    flutter: '![Flutter](https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white)',
    ionic: '![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=flat&logo=ionic&logoColor=white)',

    // API & GraphQL
    graphql: '![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white)',
    apollo: '![Apollo](https://img.shields.io/badge/Apollo-311C87?style=flat&logo=apollo-graphql&logoColor=white)',
    swagger: '![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)',

    // State Management
    redux: '![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)',
    vuex: '![Vuex](https://img.shields.io/badge/Vuex-4FC08D?style=flat&logo=vue.js&logoColor=white)',
    mobx: '![MobX](https://img.shields.io/badge/MobX-FF9955?style=flat&logo=mobx&logoColor=white)',

    // Build Tools
    webpack: '![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=flat&logo=webpack&logoColor=black)',
    babel: '![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=flat&logo=babel&logoColor=black)',
    gulp: '![Gulp](https://img.shields.io/badge/Gulp-CF4647?style=flat&logo=gulp&logoColor=white)',
    gradle: '![Gradle](https://img.shields.io/badge/Gradle-02303A?style=flat&logo=gradle&logoColor=white)',

    // CMS
    wordpress: '![WordPress](https://img.shields.io/badge/WordPress-21759B?style=flat&logo=wordpress&logoColor=white)',
    strapi: '![Strapi](https://img.shields.io/badge/Strapi-2F2E8B?style=flat&logo=strapi&logoColor=white)',
    drupal: '![Drupal](https://img.shields.io/badge/Drupal-0678BE?style=flat&logo=drupal&logoColor=white)',

    // AI/ML
    tensorflow: '![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)',
    pytorch: '![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)',
    scikitlearn: '![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)',

    // Game Development
    unity: '![Unity](https://img.shields.io/badge/Unity-000000?style=flat&logo=unity&logoColor=white)',
    unreal: '![Unreal Engine](https://img.shields.io/badge/Unreal_Engine-313131?style=flat&logo=unreal-engine&logoColor=white)',

    // Design Tools
    figma: '![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white)',
    sketch: '![Sketch](https://img.shields.io/badge/Sketch-F7B500?style=flat&logo=sketch&logoColor=black)',
    adobe: '![Adobe Creative Cloud](https://img.shields.io/badge/Adobe_Creative_Cloud-DA1F26?style=flat&logo=adobe-creative-cloud&logoColor=white)'
};

        const editor = document.getElementById('editor');
        const skillMarkdown = skillBadges[skill];
        
        if (editor.value.includes(skillMarkdown)) {
            editor.value = editor.value.replace(skillMarkdown + '\n', '');
        } else {
            editor.value += skillMarkdown + '\n';
        }
        updatePreview();
    }

    function toggleAddon(addon) {
        const username = 'yourusername';
        const addonMarkdown = {
            'visitor-badge': `![Visitors](https://visitor-badge.laobi.icu/badge?page_id=${username}.${username})`,
            'github-stats': `![Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical)`,
            'github-trophy': `![Trophy](https://github-profile-trophy.vercel.app/?username=${username})`,
            'top-skills': `![Top Skills](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact)`
        };

        const editor = document.getElementById('editor');
        const markdown = addonMarkdown[addon];
        
        if (editor.value.includes(markdown)) {
            editor.value = editor.value.replace(markdown + '\n', '');
        } else {
            editor.value += markdown + '\n';
        }
        updatePreview();
    }
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

function handleShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
            case 'b':
                e.preventDefault();
                formatText('bold');
                break;
            case 'i':
                e.preventDefault();
                formatText('italic');
                break;
            case 'k':
                e.preventDefault();
                formatText('link');
                break;
            case 's':
                e.preventDefault();
                saveToLocalStorage();
                showNotification('Content saved!');
                break;
        }
    }
}

function syncScroll(e) {
    const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
}

function initializeEditor() {
    if (!editor.value) {
        editor.value = `# Welcome to the Markdown Editor

Start writing your markdown here! Some features to try:

## Formatting
- **Bold** and *italic* text
- ~~Strikethrough~~
- [Links](https://example.com)
- \`Inline code\` and code blocks
- Lists and tables

## Shortcuts
- Ctrl/Cmd + B: Bold
- Ctrl/Cmd + I: Italic
- Ctrl/Cmd + K: Link
- Ctrl/Cmd + S: Save

Try the toolbar above for more formatting options!`;
    }
    
    editor.addEventListener('input', updatePreview);
    editor.addEventListener('scroll', debounce(syncScroll, 10));
    editor.addEventListener('keydown', handleShortcuts);
    
    loadFromLocalStorage();
    
    updatePreview();
}

window.addEventListener('load', initializeEditor);

window.addEventListener('beforeunload', saveToLocalStorage);
