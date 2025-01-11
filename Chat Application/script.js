// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const chatItems = document.querySelectorAll('.chat-item');
const messageInput = document.querySelector('.message-input');
const sendBtn = document.querySelector('.send-btn');
const messagesContainer = document.querySelector('.messages-container');

// Toggle sidebar on mobile
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Chat item selection
chatItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        chatItems.forEach(chat => chat.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        // Update chat header
        updateChatHeader(item);
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Update chat header with selected chat info
function updateChatHeader(chatItem) {
    const chatName = chatItem.querySelector('.chat-name').textContent;
    const avatar = chatItem.querySelector('.avatar img').src;
    
    document.querySelector('.chat-header .chat-name').textContent = chatName;
    document.querySelector('.chat-header .avatar img').src = avatar;
}

// Send message function
function sendMessage(message) {
    if (!message.trim()) return;

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sent');
    messageElement.textContent = message;

    // Add message to container
    messagesContainer.appendChild(messageElement);

    // Clear input
    messageInput.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate received message (demo purpose)
    setTimeout(() => {
        const replyElement = document.createElement('div');
        replyElement.classList.add('message', 'received');
        replyElement.textContent = 'This is an automated reply to: ' + message;
        messagesContainer.appendChild(replyElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

// Send message on button click
sendBtn.addEventListener('click', () => {
    sendMessage(messageInput.value);
});

// Send message on Enter key press
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage(messageInput.value);
    }
});

// Auto-resize messages container on window resize
window.addEventListener('resize', () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Scroll to bottom of messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add smooth scrolling to messages container
    messagesContainer.style.scrollBehavior = 'smooth';
});