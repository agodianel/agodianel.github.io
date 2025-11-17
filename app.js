// Presentation Navigation System
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');

// Initialize presentation
function init() {
    showSlide(currentSlide);
    updateNavigation();
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Add active class to current slide
    slides[index].classList.add('active');
    
    // Scroll to top of slide
    slides[index].scrollTop = 0;
    
    // Update counter
    slideCounter.textContent = `${index + 1} / ${totalSlides}`;
}

// Navigate to next slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
        updateNavigation();
    }
}

// Navigate to previous slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
        updateNavigation();
    }
}

// Update navigation button states
function updateNavigation() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Event Listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            prevSlide();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            nextSlide();
            break;
        case 'Home':
            currentSlide = 0;
            showSlide(currentSlide);
            updateNavigation();
            break;
        case 'End':
            currentSlide = totalSlides - 1;
            showSlide(currentSlide);
            updateNavigation();
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const slideContainer = document.querySelector('.slide-container');

slideContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slideContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Initialize on page load
init();