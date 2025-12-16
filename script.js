// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    let targetTheme = 'light';
    if (htmlElement.getAttribute('data-theme') === 'light') {
        targetTheme = 'dark';
    }

    htmlElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateIcon(targetTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Project Tab Switching
function showProjectCategory(category) {
    // Hide all project categories
    document.querySelectorAll('.project-category').forEach(cat => {
        cat.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.project-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected category
    document.getElementById(category + '-projects').classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Toggle Show More/Less for project descriptions
function toggleDescription(button) {
    const description = button.closest('.project-description');
    const fullDesc = description.querySelector('.full-desc');

    if (fullDesc.style.display === 'none' || fullDesc.style.display === '') {
        fullDesc.style.display = 'inline';
        button.textContent = 'Show Less';
    } else {
        fullDesc.style.display = 'none';
        button.textContent = 'Show More';
    }
}

// Toggle Show More/Less for publication categories
function showPublicationCategory(category) {
    // Hide all publication categories
    document.querySelectorAll('#journal-publications, #conference-publications, #others-publications').forEach(cat => {
        cat.classList.remove('active');
    });

    // Remove active class from all publication tabs
    document.querySelectorAll('.project-tab').forEach(tab => {
        if (tab.onclick && tab.onclick.toString().includes('showPublicationCategory')) {
            tab.classList.remove('active');
        }
    });

    // Show selected category
    document.getElementById(category + '-publications').classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');
}

console.log("Welcome to CHAMAN's Portfolio!");

// Contact Carousel Logic
const contactData = [
    { icon: 'fa-envelope', link: 'mailto:chamanmaimona@gmail.com', tooltip: 'Email Me' },
    { icon: 'fa-linkedin', link: 'https://www.linkedin.com/in/ummaymaimonachaman', tooltip: 'LinkedIn' },
    { icon: 'fa-github', link: 'https://github.com/UmmayMaimonaChaman', tooltip: 'GitHub' },
    { icon: 'fa-hackerrank', link: 'https://www.hackerrank.com/profile/chamanmaimona', tooltip: 'HackerRank' }, // Note: check FA version support or use custom
    { icon: 'fa-facebook', link: 'https://www.facebook.com/share/14TB8utCnvY/', tooltip: 'Facebook' },
    { icon: 'fa-instagram', link: 'https://www.instagram.com/chaman_maimona/', tooltip: 'Instagram' },
    { icon: 'fa-phone', link: 'tel:+8801715003815', tooltip: 'Call Me' },
    { icon: 'fa-map-marker-alt', link: 'https://www.google.com/maps/search/?api=1&query=Mirpur,+Dhaka-1216,+Bangladesh', tooltip: 'Mirpur, Dhaka-1216' }
];

const carouselTrack = document.getElementById('contact-carousel');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let carouselIndex = 0;

if (carouselTrack) {
    // Initialize Carousel
    contactData.forEach((item, index) => {
        const el = document.createElement('a');
        el.className = 'carousel-item';
        el.href = item.link;
        el.target = item.link.startsWith('http') ? '_blank' : '_self';
        el.innerHTML = `<i class="fab ${item.icon} ${item.icon.startsWith('fa-') && !item.icon.startsWith('fa-facebook') && !item.icon.startsWith('fa-linkedin') && !item.icon.startsWith('fa-github') ? 'fas' : ''} ${item.icon === 'fa-envelope' || item.icon === 'fa-phone' || item.icon === 'fa-map-marker-alt' ? 'fas' : 'fab'}"></i>`;

        // Fix for specific icons that might be solid (fas) instead of brand (fab) or vice versa
        // Actually, let's simplify: just use the class string from data if specific needed, or default logic
        // Reset innerHTML for cleaner logic
        let prefix = 'fab';
        if (['fa-envelope', 'fa-phone', 'fa-map-marker-alt'].includes(item.icon)) {
            prefix = 'fas';
        }
        el.innerHTML = `<i class="${prefix} ${item.icon}"></i>`;

        el.setAttribute('data-tooltip', item.tooltip);
        // Add click event to rotate to this item if not active
        el.addEventListener('click', (e) => {
            if (carouselIndex !== index) {
                e.preventDefault(); // Don't navigate, just rotate
                carouselIndex = index;
                updateCarousel();
            }
        });
        carouselTrack.appendChild(el);
    });

    const items = document.querySelectorAll('.carousel-item');

    function updateCarousel() {
        items.forEach((item, i) => {
            // Calculate distance from active index
            // We want a circular difference: e.g. with 8 items, if current is 0, 7 is -1, 1 is +1
            let offset = i - carouselIndex;

            // Normalize offset to be within -Total/2 to +Total/2
            if (offset > items.length / 2) offset -= items.length;
            if (offset < -items.length / 2) offset += items.length;

            // Apply styles based on offset
            if (offset === 0) {
                // Active Center
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1.5)';
                item.style.zIndex = '10';
                item.style.boxShadow = '0 0 20px var(--accent-color)';
                item.classList.add('active');
            } else {
                item.classList.remove('active');

                // Calculate position: spread items out
                // e.g. 100px per step
                const spacing = 90;
                const translateX = offset * spacing;

                // Scale drops as we go further out
                // 1 -> 0.8, 2 -> 0.6, etc.
                const scale = Math.max(0.5, 1 - Math.abs(offset) * 0.2);

                // Opacity also drops
                const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.3);

                // Z-index drops
                const zIndex = 10 - Math.abs(offset);

                item.style.transform = `translateX(${translateX}px) scale(${scale})`;
                item.style.opacity = `${opacity}`;
                item.style.zIndex = `${zIndex}`;
                item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex + 1) % items.length;
        updateCarousel();
    });

    // Initial call
    updateCarousel();
}
