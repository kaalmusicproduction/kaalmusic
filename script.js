// ===================================
// Portfolio Videos Data
// Add your YouTube video IDs here
// ===================================
const portfolioVideos = [
    {
        title: "DED INSIDE - OPEN THE EYE ",
        youtubeId: "lZ3kLnXm4nM",
        category: "Beat Production"
    },
    {
        title: "YA ALI - BOLLYWOOD DRILL",
        youtubeId: "3yHP72K3rdk",
        category: "Beat Production"
    },
    {
        title: "SHATIR - LOYALTY IS RARE ",
        youtubeId: "0ygUTO5bf7s",
        category: "Beat Production"
    },
    {
        title: "KING D - STILL KING ",
        youtubeId: "gaMPPik6-Hk",
        category: "Mixing & Mastering"
    },
    {
        title: "MC TRUTH - MERI KAHANI ",
        youtubeId: "stQqtpil9D4",
        category: "Beat Production, Mixing & Mastering"
    },
    {
        title: "MC TRUTH - MAUJ MAA ",
        youtubeId: "g3sYDuQO_UU",
        category: "Beat Production"
    },
    {
        title: "MC TRUTH - MUJHSE DUR MAT JAANA ",
        youtubeId: "HxF-uH30syI",
        category: "Beat Production"
    },

    {
        title: "DON - RAP BEAT ",
        youtubeId: "tWC_FNZUi04",
        category: "Beat Production"
    },
    {
        title: "LOWRIDER - RAP BEAT",
        youtubeId: "qzRsLkpYcEI",
        category: "Beat Production"
    },
    {
        title: "INDIAN DRILL X HOUSE BEAT",
        youtubeId: "EBLOkKQ2-WI",
        category: "Beat Production"
    },
    // {
    //     title: "NARCOS - Indian Rap Beat",
    //     youtubeId: "TPxJmv5AluA",
    //     category: "Beat Production"
    // },
    // {
    //     title: "MAHABHARAT (THEME) - DRILL BEAT",
    //     youtubeId: "yurFeQLGlbA",
    //     category: "Beat Production"
    // },
    // {
    //     title: "KAAL MUSIC - MILA MUJHE TU ",
    //     youtubeId: "SN9pTr6B7Yw",
    //     category: "Beat Production"
    // },


];

// ===================================
// DOM Ready
// ===================================
$(document).ready(function () {

    // Initialize all functionality
    initNavbar();
    initSmoothScroll();
    initWorkGrid();
    initVideoModal();
    initTestimonialSlider();
    initContactForm();
    initScrollAnimations();

});

// ===================================
// Navbar Functionality
// ===================================
function initNavbar() {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Close mobile menu on link click
    $('.nav-link').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
}

// ===================================
// Smooth Scroll Navigation
// ===================================
function initSmoothScroll() {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        const target = $(this.getAttribute('href'));

        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'swing');
        }
    });
}

// ===================================
// Work Grid - Dynamic Video Loading
// ===================================
function initWorkGrid() {
    const workGrid = $('#workGrid');

    portfolioVideos.forEach((video, index) => {
        const videoCard = `
            <div class="work-card" data-video-id="${video.youtubeId}" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="work-thumbnail">
                    <img src="https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg" 
                         alt="${video.title}"
                         onerror="this.src='https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg'">
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="work-info">
                    <h3 class="work-title">${video.title}</h3>
                    <p class="work-category">${video.category}</p>
                </div>
            </div>
        `;

        workGrid.append(videoCard);
    });
}

// ===================================
// Video Modal Functionality
// ===================================
function initVideoModal() {
    const modal = $('#videoModal');
    const videoFrame = $('#videoFrame');
    const closeBtn = $('#closeModal');
    const overlay = $('.video-modal-overlay');

    $(document).on('click', '.work-card', function () {

        const videoId = $(this).data('video-id');

        const videoUrl =
            `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1`;

        videoFrame.attr('src', videoUrl);
        modal.addClass('active');
        $('body').css('overflow', 'hidden');
    });

    function closeModal() {
        modal.removeClass('active');
        videoFrame.attr('src', '');
        $('body').css('overflow', 'auto');
    }

    closeBtn.click(closeModal);
    overlay.click(closeModal);

    $(document).keyup(function (e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}


// ===================================
// Testimonial Slider
// ===================================
function initTestimonialSlider() {
    const track = $('.testimonial-track');
    const cards = $('.testimonial-card');
    const prevBtn = $('#prevBtn');
    const nextBtn = $('#nextBtn');

    let currentIndex = 0;
    const cardWidth = cards.outerWidth(true);
    const visibleCards = getVisibleCards();
    const maxIndex = cards.length - visibleCards;

    function getVisibleCards() {
        const windowWidth = $(window).width();
        if (windowWidth < 768) return 1;
        if (windowWidth < 992) return 2;
        return 3;
    }

    function updateSlider() {
        const offset = -(currentIndex * cardWidth);
        track.css('transform', `translateX(${offset}px)`);

        // Update button states
        prevBtn.prop('disabled', currentIndex === 0);
        nextBtn.prop('disabled', currentIndex >= maxIndex);
    }

    nextBtn.click(function () {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.click(function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Auto-play slider
    let autoPlayInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);

    // Pause autoplay on hover
    $('.testimonials-slider').hover(
        function () { clearInterval(autoPlayInterval); },
        function () {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
        }
    );

    // Update on window resize
    $(window).resize(function () {
        const newVisibleCards = getVisibleCards();
        const newCardWidth = cards.outerWidth(true);

        if (newVisibleCards !== visibleCards || newCardWidth !== cardWidth) {
            location.reload(); // Simple solution for responsive recalculation
        }
    });

    // Initial update
    updateSlider();
}

// ===================================
// Contact Form Functionality
// ===================================
function initContactForm() {
    const form = $('#contactForm');
    const successMessage = $('#formSuccess');

    form.submit(function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            service: $('#service').val(),
            message: $('#message').val()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        // Simulate form submission (replace with actual API call)
        console.log('Form Data:', formData);

        // Show success message
        form.fadeOut(400, function () {
            successMessage.addClass('active').fadeIn(400);
        });

        // Reset form after 5 seconds
        setTimeout(function () {
            successMessage.fadeOut(400, function () {
                successMessage.removeClass('active');
                form[0].reset();
                form.fadeIn(400);
            });
        }, 5000);

        // Here you would typically send the data to your backend
        // Example:
        // $.ajax({
        //     url: 'your-backend-endpoint',
        //     method: 'POST',
        //     data: formData,
        //     success: function(response) {
        //         // Handle success
        //     },
        //     error: function(error) {
        //         // Handle error
        //     }
        // });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in animation
    const animatedElements = document.querySelectorAll('.service-card, .work-card, .testimonial-card, .about-image-wrapper, .contact-method');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(el);
    });

    // Add animated class behavior
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Parallax Effect (Optional Enhancement)
// ===================================
$(window).scroll(function () {
    const scrolled = $(window).scrollTop();
    $('.hero-particles').css('transform', `translateY(${scrolled * 0.5}px)`);
});

// ===================================
// Preloader (Optional)
// ===================================
$(window).on('load', function () {
    // Add preloader if needed
    $('body').addClass('loaded');
});

// ===================================
// Custom Cursor Effect (Optional Enhancement)
// ===================================
function initCustomCursor() {
    const cursor = $('<div class="custom-cursor"></div>');
    $('body').append(cursor);

    $(document).mousemove(function (e) {
        cursor.css({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        });
    });

    // Add hover effect for interactive elements
    $('a, button, .work-card, .service-card').hover(
        function () { cursor.addClass('cursor-hover'); },
        function () { cursor.removeClass('cursor-hover'); }
    );
}

// Uncomment to enable custom cursor
// initCustomCursor();

// ===================================
// Page Load Animations
// ===================================
window.addEventListener('load', function () {
    // Add staggered animations to hero elements
    const heroElements = document.querySelectorAll('.fade-in-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, index * 100);
    });
});

// ===================================
// Utility Functions
// ===================================

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add active class to current section in navbar
function updateActiveNav() {
    const sections = $('section');
    const navLinks = $('.nav-link');

    $(window).scroll(throttle(function () {
        let current = '';

        sections.each(function () {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).height();

            if ($(window).scrollTop() >= (sectionTop - 200)) {
                current = $(this).attr('id');
            }
        });

        navLinks.each(function () {
            $(this).removeClass('active');
            if ($(this).attr('href') === '#' + current) {
                $(this).addClass('active');
            }
        });
    }, 100));
}

// Initialize active nav tracking
updateActiveNav();

// ===================================
// Performance Optimization
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Analytics Events (Optional)
// ===================================
function trackEvent(category, action, label) {
    console.log('Event:', category, action, label);

    // Add your analytics tracking here
    // Example for Google Analytics:
    // gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    // });
}

// Track video plays
$(document).on('click', '.work-card', function () {
    const videoTitle = $(this).find('.work-title').text();
    trackEvent('Video', 'Play', videoTitle);
});

// Track form submissions
$('#contactForm').submit(function () {
    trackEvent('Form', 'Submit', 'Contact Form');
});

// Track social link clicks
$('.social-link').click(function () {
    const platform = $(this).find('i').attr('class').split(' ')[1].replace('fa-', '');
    trackEvent('Social', 'Click', platform);
});

// ===================================
// Console Message
// ===================================
console.log('%c🎵 SonicCraft Portfolio', 'color: #00f5ff; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped with ♥ for the Music Industry', 'color: #b8b8d1; font-size: 12px;');
console.log('%cInterested in collaborating? Reach out!', 'color: #ff00ff; font-size: 12px;');