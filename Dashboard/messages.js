document.addEventListener('DOMContentLoaded', () => {
    const messagesNav = document.querySelector('.messages-nav');
    const messagesContainer = document.getElementById('messagesContainer');
    const closeMessagesBtn = document.getElementById('closeMessages');
    const messagesList = document.getElementById('messagesList');
    const messageBadge = document.querySelector('.message-badge');
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');

    const messages = [
        {
            id: 1,
            sender: 'Foysal Zihak',
            avatar: 'assets/images/message_avatar1.jpg',
            preview: 'Kicchu Vallage Naaaaaaa',
            time: '2 min ago',
            unread: true
        },
        {
            id: 2,
            sender: 'Bob Smith',
            avatar: 'assets/images/message_avatar2.jpg',
            preview: 'The latest code changes look great!',
            time: '15 min ago',
            unread: true
        },
        {
            id: 3,
            sender: 'Charlie Brown',
            avatar: 'assets/images/message_avatar3.jpg',
            preview: 'Meeting scheduled for tomorrow at 10 AM.',
            time: '1 hour ago',
            unread: false
        },
        {
            id: 4,
            sender: 'Diana Rodriguez',
            avatar: 'assets/images/message_avatar4.jpg',
            preview: 'Can you review the design mockups?',
            time: '45 min ago',
            unread: true
        },
        {
            id: 5,
            sender: 'Ethan Kim',
            avatar: 'assets/images/message_avatar5.jpg',
            preview: 'Deployment script needs your attention.',
            time: '3 hours ago',
            unread: true
        },
        {
            id: 6,
            sender: 'Fiona Watson',
            avatar: 'assets/images/message_avatar6.jpg',
            preview: 'Great job on the last sprint!',
            time: 'Yesterday',
            unread: false
        }
    ];

    function renderMessages() {
        messagesList.innerHTML = messages.map(message => `
            <div class="message-item ${message.unread ? 'unread' : ''}" data-message-id="${message.id}">
                <img src="${message.avatar}" alt="${message.sender}" class="message-avatar">
                <div class="message-content">
                    <div class="message-sender">${message.sender}</div>
                    <div class="message-preview">${message.preview}</div>
                </div>
                <div class="message-time">${message.time}</div>
                ${message.unread ? '<span class="unread-indicator"></span>' : ''}
            </div>
        `).join('');

        updateUnreadCount();
    }

    function updateUnreadCount() {
        const unreadMessages = messages.filter(msg => msg.unread);
        const unreadCount = unreadMessages.length;

        if (unreadCount > 0) {
            messageBadge.textContent = unreadCount;
            messageBadge.style.display = 'inline-block';
        } else {
            messageBadge.style.display = 'none';
        }
    }

    function fadeOutContent() {
        document.querySelectorAll('.dashboard-card, .stat-card').forEach(element => {
            element.style.opacity = '0.3';
            element.style.transform = 'scale(0.95)';
        });
    }

    function restoreContent() {
        document.querySelectorAll('.dashboard-card, .stat-card').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    function markMessageAsRead(messageId) {
        const message = messages.find(msg => msg.id === messageId);
        if (message) {
            message.unread = false;
            renderMessages();
        }
    }

    function openMessagesSidebar() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            document.body.style.overflow = 'hidden';
            
            sidebar.classList.remove('active');
            menuToggle.style.display = 'flex';
        }

        messagesContainer.classList.add('active');
        fadeOutContent();
        messageBadge.style.display = 'none';
    }

    function closeMessagesSidebar() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            document.body.style.overflow = '';
        }

        messagesContainer.classList.remove('active');
        restoreContent();
        updateUnreadCount();
    }

    messagesNav.addEventListener('click', openMessagesSidebar);
    closeMessagesBtn.addEventListener('click', closeMessagesSidebar);

    messagesList.addEventListener('click', (event) => {
        const messageItem = event.target.closest('.message-item');
        if (messageItem) {
            const messageId = parseInt(messageItem.dataset.messageId);
            markMessageAsRead(messageId);
        }
    });

    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            messagesContainer.classList.remove('active');
        }
    });

    renderMessages();
});