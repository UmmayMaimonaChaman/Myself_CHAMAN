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
function showProjectCategory(category, event) {
    // Show selected category
    const categoryElement = document.getElementById(category + '-projects');
    if (categoryElement) {
        // Hide only project categories
        document.querySelectorAll('#projects .project-category').forEach(cat => {
            cat.classList.remove('active');
        });

        // Remove active class from only project tabs
        document.querySelectorAll('#projects .project-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        categoryElement.classList.add('active');
    }

    // Add active class to clicked tab
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Special logic for Software sub-tabs
    const softwareSubTabs = document.querySelector('.project-subtabs');
    if (softwareSubTabs) {
        if (category === 'software') {
            softwareSubTabs.style.display = 'flex';
            // Default to 'ml' if no software sub-grid is active
            const activeSubGrid = document.querySelector('.software-sub-grid.active');
            if (!activeSubGrid) {
                showSoftwareSubCategory('ml');
            }
        } else {
            softwareSubTabs.style.display = 'none';
            // Hide all sub-grids when leaving Software to ensure clean state
            document.querySelectorAll('.software-sub-grid').forEach(grid => {
                grid.classList.remove('active');
            });
        }
    }
}

// Software Sub-category Switching
function showSoftwareSubCategory(subCategory, event) {
    // Hide all sub-grids
    document.querySelectorAll('.software-sub-grid').forEach(grid => {
        grid.classList.remove('active');
    });

    // Remove active class from all subtabs
    document.querySelectorAll('.subtab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected sub-grid
    const targetGrid = document.getElementById(subCategory + '-software');
    if (targetGrid) {
        targetGrid.classList.add('active');
    }

    // Add active class to clicked subtab if it exists (for manual clicks)
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    } else {
        // Find the tab matching the category for programmatic calls
        const tabs = document.querySelectorAll('.subtab');
        tabs.forEach(tab => {
            if (tab.getAttribute('onclick').includes(subCategory)) {
                tab.classList.add('active');
            }
        });
    }
}

// Carousel Movement Logic
const carouselPositions = {}; // Keep track of each carousel index separately

function moveCarousel(trackId, direction) {
    const track = document.getElementById('track-' + trackId);
    if (!track) return;

    const cards = track.querySelectorAll('.project-card');
    const totalCards = cards.length;
    if (totalCards <= 1) return; // No need to move if 1 or 0 cards

    // Initialize position if not exists
    if (carouselPositions[trackId] === undefined) {
        carouselPositions[trackId] = 0;
    }

    // Update index
    carouselPositions[trackId] = (carouselPositions[trackId] + direction + totalCards) % totalCards;

    // Apply transform
    const cardWidth = cards[0].offsetWidth + 30; // 30 is the gap
    track.style.transform = `translateX(-${carouselPositions[trackId] * cardWidth}px)`;
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

function showPublicationCategory(category, event) {
    // Show selected category
    const categoryElement = document.getElementById(category + '-publications');
    if (categoryElement) {
        // Hide only publication categories
        document.querySelectorAll('#publications .project-category').forEach(cat => {
            cat.classList.remove('active');
        });

        // Remove active class from only publication tabs
        document.querySelectorAll('#publications .project-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        categoryElement.classList.add('active');
        
        // Add active class to clicked tab
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    }
}

// Contact Carousel Logic
const contactData = [
    { icon: 'fa-envelope', link: 'mailto:chamanmaimona@gmail.com', tooltip: 'Email Me' },
    { icon: 'fa-linkedin', link: 'https://www.linkedin.com/in/ummaymaimonachaman', tooltip: 'LinkedIn' },
    { icon: 'fa-github', link: 'https://github.com/UmmayMaimonaChaman', tooltip: 'GitHub' },
    { icon: 'fa-hackerrank', link: 'https://www.hackerrank.com/profile/chamanmaimona', tooltip: 'HackerRank' },
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
        
        // Icon prefix logic
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
            let offset = i - carouselIndex;

            // Normalize offset to be within -Total/2 to +Total/2
            if (offset > items.length / 2) offset -= items.length;
            if (offset < -items.length / 2) offset += items.length;

            if (offset === 0) {
                // Active Center
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1.5)';
                item.style.zIndex = '10';
                item.style.boxShadow = '0 0 20px var(--accent-color)';
                item.classList.add('active');
            } else {
                item.classList.remove('active');
                const spacing = 90;
                const translateX = offset * spacing;
                const scale = Math.max(0.5, 1 - Math.abs(offset) * 0.2);
                const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.3);
                const zIndex = 10 - Math.abs(offset);

                item.style.transform = `translateX(${translateX}px) scale(${scale})`;
                item.style.opacity = `${opacity}`;
                item.style.zIndex = `${zIndex}`;
                item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            carouselIndex = (carouselIndex - 1 + items.length) % items.length;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            carouselIndex = (carouselIndex + 1) % items.length;
            updateCarousel();
        });
    }

    // Initial call
    updateCarousel();
}

console.log("Welcome to CHAMAN's Portfolio!");

// Particle Background Logic
(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // State
    const mouse = { x: 0, y: 0 };
    const attachedParticles = new Set();
    const particles = [];

    // Set canvas size
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.radius = Math.random() * 2 + 1;
            this.color = 'rgba(255, 255, 255, 0.2)';
            this.attached = false;
            this.offsetX = 0;
            this.offsetY = 0;
        }

        update() {
            if (!this.attached) {
                // Normal movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Magnetic effect
                if (mouse.x !== 0 && mouse.y !== 0) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const magnetRadius = 150;

                    if (distance < magnetRadius) {
                        const force = (magnetRadius - distance) / magnetRadius;
                        this.x += dx * force * 0.03;
                        this.y += dy * force * 0.03;

                        // Auto-attach if very close
                        if (distance < 30 && !attachedParticles.has(this)) {
                            this.attached = true;
                            this.offsetX = this.x - mouse.x;
                            this.offsetY = this.y - mouse.y;
                            attachedParticles.add(this);
                        }
                    }
                }
            } else {
                // Follow mouse with offset
                this.x = mouse.x + this.offsetX;
                this.y = mouse.y + this.offsetY;
            }
        }

        draw() {
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Initialize particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    // Click handler to detach
    const handleClick = (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;

        particles.forEach(particle => {
            if (particle.attached) {
                const dx = clickX - particle.x;
                const dy = clickY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 50) {
                    particle.attached = false;
                    attachedParticles.delete(particle);

                    // Give it a little push away
                    const angle = Math.atan2(dy, dx);
                    particle.vx = -Math.cos(angle) * 2;
                    particle.vy = -Math.sin(angle) * 2;
                }
            }
        });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 100) * 0.1})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();
})();
