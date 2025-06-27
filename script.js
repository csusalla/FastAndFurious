document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for user's preferred color scheme or saved preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'enabled' || (savedDarkMode === null && prefersDarkMode)) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️'; // Sun icon for light mode
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙'; // Moon icon for dark mode
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');

    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            // Trigger animation when section is in viewport
            if (sectionTop < screenHeight * 0.75) {
                section.classList.add('animated');
            } else {
                section.classList.remove('animated'); // Optional: remove class if scrolled away
            }
        });
    };

    // Initial check and add event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
