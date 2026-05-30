document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Sticky Header
       ========================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when a link is clicked
        const navLinks = navbar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    /* ==========================================
       Active Link Highlighting on Scroll
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            const activeNavLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            if (activeNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
                    activeNavLink.classList.add('active');
                }
            }
        });
    });

    /* ==========================================
       Booking Modal Dialog Toggle
       ========================================== */
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const bookingModal = document.getElementById('booking-modal');
    
    function openModal() {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }
    
    function closeModal() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Resume scrolling
        
        // Reset success states if open
        document.getElementById('modal-success-msg').style.display = 'none';
        document.getElementById('modal-appointment-form').reset();
    }
    
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content card
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeModal();
        }
    });

    /* ==========================================
       Form Submission Simulation
       ========================================== */
    // Main Section Form
    const appointmentForm = document.getElementById('appointment-form');
    const successMsg = document.getElementById('form-success-msg');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather values (mock submit)
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service-select').value;
            
            console.log(`Booking request for: ${name}, Phone: ${phone}, Service: ${service}`);
            
            // Show Success Animation
            successMsg.style.display = 'flex';
            appointmentForm.reset();
            
            setTimeout(() => {
                successMsg.style.opacity = '0';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                    successMsg.style.opacity = '1';
                }, 500);
            }, 5000);
        });
    }
    
    // Modal Form
    const modalForm = document.getElementById('modal-appointment-form');
    const modalSuccessMsg = document.getElementById('modal-success-msg');
    
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('modal-name').value;
            const phone = document.getElementById('modal-phone').value;
            const service = document.getElementById('modal-service').value;
            
            console.log(`Modal booking request for: ${name}, Phone: ${phone}, Service: ${service}`);
            
            modalSuccessMsg.style.display = 'flex';
            modalForm.reset();
            
            // Auto close modal after brief delay
            setTimeout(() => {
                closeModal();
            }, 3000);
        });
    }

    /* ==========================================
       Testimonials Carousel
       ========================================== */
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        testimonials.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let next = (currentSlide + 1) % testimonials.length;
        showSlide(next);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 6000); // Rotate every 6 seconds
    }
    
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Add dot click events
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            showSlide(idx);
            startSlideShow();
        });
    });
    
    // Initialize slider
    if (testimonials.length > 0) {
        showSlide(0);
        startSlideShow();
    }

    /* ==========================================
       Gallery Filter Interaction
       ========================================== */
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    // Subtle animation trigger
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================
       Leaflet.js Map Integration
       ========================================== */
    // Location Coordinates: Chandanpur, Puri, Odisha (Plot No-104, Medical Chhaka)
    // Approximate Lat: 19.8974, Lon: 85.8197
    const hospitalLat = 19.8974;
    const hospitalLon = 85.8197;
    
    try {
        const map = L.map('hospital-map', {
            scrollWheelZoom: false // Prevent accidental zoom on scroll
        }).setView([hospitalLat, hospitalLon], 15);
        
        // Add beautiful custom tile layer from CartoDB (cleaner and matches the premium medical aesthetic)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);
        
        // Add custom markers
        const customIcon = L.divIcon({
            html: `<div style="background-color: var(--primary); width: 16px; height: 16px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.3); animation: pulse-map 2s infinite;"></div>`,
            className: 'custom-map-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        // Pulsating animation for marker
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            @keyframes pulse-map {
                0% { box-shadow: 0 0 0 0 rgba(2, 128, 144, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(2, 128, 144, 0); }
                100% { box-shadow: 0 0 0 0 rgba(2, 128, 144, 0); }
            }
        `;
        document.getElementsByTagName('head')[0].appendChild(style);

        const marker = L.marker([hospitalLat, hospitalLon], {icon: customIcon}).addTo(map);
        
        // Bind Popup
        marker.bindPopup(`
            <div style="font-family: var(--font-heading); padding: 5px;">
                <h4 style="margin: 0 0 4px 0; color: var(--primary);">Tribeni Eye Hospital</h4>
                <p style="margin: 0; font-size: 0.8rem; color: var(--text-secondary);">Plot No-104, Medical Chhaka, Chandanpur, Puri, Odisha</p>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; font-weight: bold; color: var(--secondary);">Call: 79786 36375</p>
            </div>
        `).openPopup();
        
    } catch (error) {
        console.error("Leaflet.js Map Initialization failed:", error);
    }
});
