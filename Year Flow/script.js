const elements = {
    currentDate: document.getElementById('currentDate'),
    dayNumber: document.getElementById('dayNumber'),
    daysPassed: document.getElementById('daysPassed'),
    daysRemaining: document.getElementById('daysRemaining'),
    progressPercent: document.getElementById('progressPercent'),
    yearProgress: document.getElementById('yearProgress'),
    dailyQuote: document.getElementById('dailyQuote'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    ampm: document.getElementById('ampm')
};

const quotes = [
    "Every day is a new beginning.",
    "Make today amazing.",
    "Your future is created by what you do today.",
    "Dream big, start small, but most of all, start.",
    "The best time to start was yesterday. The next best time is now.",
    "Be the change you wish to see in the world.",
    "Success is not final, failure is not fatal.",
    "Believe you can and you're halfway there.",
    "Your time is limited, don't waste it living someone else's life.",
    "The way to get started is to quit talking and begin doing.",
    "Don't watch the clock; do what it does. Keep going.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Everything you've ever wanted is sitting on the other side of fear.",
    "The future depends on what you do today.",
    "Don't let yesterday take up too much of today.",
    "The journey of a thousand miles begins with one step.",
    "Today's actions are tomorrow's results.",
    "Small progress is still progress.",
    "Focus on the step in front of you, not the whole staircase.",
    "Your potential is endless. Go do what you were created to do."
];

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function formatDate(date) {
    try {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${mm}.${dd}.${yy}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
}

function updateElementWithAnimation(element, newValue) {
    if (!element) return;
    
    if (element.textContent !== newValue.toString()) {
        element.style.animation = 'none';
        void element.offsetHeight;
        element.textContent = newValue;
        element.style.animation = 'numberChange 0.3s ease-out';
    }
}

function getDailyQuote() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyQuote');
    
    try {
        if (stored) {
            const { date, quote } = JSON.parse(stored);
            if (date === today) return quote;
        }
        
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
        const quoteIndex = dayOfYear % quotes.length;
        const todaysQuote = quotes[quoteIndex];
        
        localStorage.setItem('dailyQuote', JSON.stringify({
            date: today,
            quote: todaysQuote
        }));
        
        return todaysQuote;
    } catch (error) {
        console.error('Error getting daily quote:', error);
        return quotes[0];
    }
}

function updateDate() {
    try {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const diff = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
        const totalDays = isLeapYear(now.getFullYear()) ? 366 : 365;
        const daysRemaining = totalDays - diff;
        const progress = (diff / totalDays) * 100;
        
        elements.currentDate.textContent = formatDate(now);
        updateElementWithAnimation(elements.dayNumber, diff.toString().padStart(2, '0'));
        updateElementWithAnimation(elements.daysPassed, diff);
        updateElementWithAnimation(elements.daysRemaining, daysRemaining);
        updateElementWithAnimation(elements.progressPercent, `${Math.round(progress)}%`);
        
        if (elements.yearProgress) {
            elements.yearProgress.style.width = `${progress}%`;
        }
        if (elements.dailyQuote) {
            elements.dailyQuote.textContent = getDailyQuote();
        }
    } catch (error) {
        console.error('Error updating date:', error);
    }
}
function updateClock() {
    try {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;

        updateElementWithAnimation(elements.hours, displayHours.toString().padStart(2, '0'));
        updateElementWithAnimation(elements.minutes, minutes.toString().padStart(2, '0'));
        updateElementWithAnimation(elements.seconds, seconds.toString().padStart(2, '0'));
        
        if (elements.ampm) {
            elements.ampm.textContent = ampm;
        }
        const millisToNextSecond = 1000 - now.getMilliseconds();
        setTimeout(() => {
            updateClock();
        }, millisToNextSecond);
    } catch (error) {
        console.error('Error updating clock:', error);
    }
}
function initializeStatHoverEffects() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const handleHover = (e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
    };
    
    const handleMouseOut = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
    };
    
    statItems.forEach(item => {
        item.addEventListener('mouseover', handleHover);
        item.addEventListener('mouseout', handleMouseOut);

        item.setAttribute('tabindex', '0');
        item.addEventListener('focus', handleHover);
        item.addEventListener('blur', handleMouseOut);
    });
}

function initialize() {
    elements.currentDate.setAttribute('aria-label', 'Current date');
    elements.dayNumber.setAttribute('aria-label', 'Current day of the year');
    elements.dailyQuote.setAttribute('aria-label', 'Daily inspirational quote');
    
    updateDate();
    updateClock();
    initializeStatHoverEffects();
    setInterval(updateDate, 60000);
}
document.addEventListener('DOMContentLoaded', initialize);