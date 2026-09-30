// ==========================================================================
// Yukta Padekar Portfolio - Dynamic Interactions & Animations
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typewriter Effect ---
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Computer Engineering Student 🎓",
        "Full Stack Web Developer 💻",
        "AI & Machine Learning Enthusiast 🤖",
        "Software Engineering Explorer 🚀"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 75;

    function typeRoles() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at full word
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeRoles, typingSpeed);
    }

    typeRoles();


    // --- 2. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }


    // --- 3. Sticky Navbar & Active Link on Scroll ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links .nav-item');

    window.addEventListener('scroll', () => {
        // Navbar shadow toggle
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 4. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navLinks');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

});


// --- 5. Smooth Scroll Helper ---
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Backward compatibility with previous button calls
function scrollToProjects() {
    scrollToSection('projects');
}


// --- 6. Copy Email with Toast Notification ---
function copyEmail() {
    const email = "yuktapadekar@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast();
    }).catch(err => {
        // Fallback
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}