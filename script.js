/**
 * Flevo Route Experience JavaScript
 * Handles Particles.js background, dynamic quote rotation,
 * and scroll-triggered animations (Intersection Observer).
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // The main execution function
    function initializeFlevoRoute() {
        initParticles();
        setupScrollObserver();
        setupSmoothScrolling();
        // Start quote rotation 
        initQuoteRotation();
    }

    // 1. Initialize Particles.js for the dynamic background
    function initParticles() {
        // Using the Flevo accent color (#f4c430) for particle lines and dots
        const accentColor = "#f4c430"; 

        particlesJS('particles-js', {
            "particles": {
                "number": { 
                    "value": 40, // Reduced for subtlety
                    "density": { "enable": true, "value_area": 800 } 
                },
                "color": { "value": accentColor }, 
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": accentColor, "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": true, "mode": "grab" }, 
                    "onclick": { "enable": true, "mode": "push" }, 
                    "resize": true 
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }

    // 2. Dynamic Quote Rotation
    function initQuoteRotation() {
        const quotes = [
            { text: "A journey through history, color, and a landscape born from the sea.", author: "– Flevoland Explorer" },
            { text: "Driving on the bottom of a former sea: an unparalleled experience.", author: "– Local Resident" },
            { text: "The vastness of the polder truly puts you in awe of human engineering.", author: "– Visitor Review" },
            { text: "Every turn offers a new, unique perspective of reclaimed land.", author: "– Traveler's Note" }
        ];

        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        let currentQuoteIndex = 0;

        // Ensure elements exist before trying to manipulate them
        if (!quoteText || !quoteAuthor) return;

        function changeQuote() {
            // Calculate the next quote index
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            const newQuote = quotes[currentQuoteIndex];
            
            // Fade out
            quoteText.style.transition = 'opacity 0.5s ease-in-out';
            quoteAuthor.style.transition = 'opacity 0.5s ease-in-out';
            quoteText.style.opacity = 0;
            quoteAuthor.style.opacity = 0;

            // Update content and fade in after transition
            setTimeout(() => {
                quoteText.textContent = newQuote.text;
                quoteAuthor.textContent = newQuote.author;
                quoteText.style.opacity = 1;
                quoteAuthor.style.opacity = 1;
            }, 500); 
        }
        
        // Start quote rotation 8 seconds after the page loads
        setInterval(changeQuote, 8000); 
    }

    // 3. Scroll-triggered animations for sections and cards (Intersection Observer)
    function setupScrollObserver() {
        // Select all elements marked for animation
        const animatedElements = document.querySelectorAll('.section-hidden');

        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            // Trigger when 10% of the element is visible
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    entry.target.classList.remove('section-hidden');
                    
                    // For the feature cards, apply the custom slide-up animation 
                    // which uses the custom keyframe defined in the HTML <style> block
                    if (entry.target.classList.contains('feature-card')) {
                        // The delay is already set inline in the HTML for staggering
                        entry.target.style.animation = 'slide-up 0.8s ease-out forwards';
                    } else {
                        // For main sections, let the default CSS transition handle the reveal
                    }

                    // Stop observing once visible
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        // Observe each element
        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Apply the initial hero text animation which is handled by a different class
        const heroElements = document.querySelectorAll('.animate-hero-text');
        heroElements.forEach(el => {
             el.style.animation = 'fade-in 1.2s ease-out forwards';
        });
    }

    // 4. Smooth Scrolling for internal links
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                // Don't interrupt if the href is just "#"
                if (href === '#') return; 
                
                e.preventDefault();

                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // Execute the main function
    initializeFlevoRoute();
});
