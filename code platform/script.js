// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.switch input');
    const body = document.body;

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('light-theme');
    });

    // Feed Navigation
    const feedButtons = document.querySelectorAll('.feed-nav button');
    feedButtons.forEach(button => {
        button.addEventListener('click', () => {
            feedButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Close Pro Banner
    const closeBanner = document.querySelector('.close-banner');
    const proBanner = document.querySelector('.pro-banner');

    if (closeBanner && proBanner) {
        closeBanner.addEventListener('click', () => {
            proBanner.style.display = 'none';
        });
    }

    // Mobile Menu Toggle (for responsive design)
    const createMobileMenu = () => {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.classList.add('mobile-menu-toggle');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        const topBar = document.querySelector('.top-bar');
        topBar.prepend(mobileMenuButton);

        const sidebar = document.querySelector('.sidebar');
        
        mobileMenuButton.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    };

    // Create mobile menu if window width is less than 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
        if (window.innerWidth < 768 && !mobileMenuButton) {
            createMobileMenu();
        } else if (window.innerWidth >= 768 && mobileMenuButton) {
            mobileMenuButton.remove();
            document.querySelector('.sidebar').classList.remove('show');
        }
    });

    // Sample TypeScript code for the code block
    const typeScriptCode = `interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

// Use Pick to create a preview type with selected properties
type UserPreview = Pick<User, "id" | "name">;

// Use Partial to allow optional updates to a user
type UpdateUserInput = Partial<User>;

// Example function
const updateUser = (user: User, updates: UpdateUserInput): User => {
  return { ...user, ...updates };
};

// Example usage
const user: User = { id: 1, name: "Alice", email: "alice@example.com", role: "admin" };

const preview: UserPreview = { id: 1, name: "Alice" }; // Only shows preview info
const updatedUser = updateUser(user, { name: "Alicia", email: "alicia@example.com" });

console.log("User Preview:", preview);
console.log("Updated User:", updatedUser);
`;

    const codeBlock = document.querySelector('.code-block');
    if (codeBlock) {
        codeBlock.innerHTML = `<pre><code>${typeScriptCode}</code></pre>`;
    }
});