/**
 * CITILINKERS (Noharc Ltd) - Main Interactive Script
 * Premium Executive Taxi & Airport Transfer Web Application
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeader();
  initMobileMenu();
  initSwiperSliders();
  initGSAPAnimations();
  initBookingEngine();
  initFAQAccordions();
  initAccountPortal();
  initContactForms();
  initCounterAnimations();
});

/* ----------------------------------------------------
   1. CUSTOM CURSOR EFFECT
---------------------------------------------------- */
function initCustomCursor() {
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
  if (isTouch) return;

  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursorDot);

  const cursorCircle = document.createElement('div');
  cursorCircle.className = 'custom-cursor-circle';
  cursorCircle.innerHTML = '<span class="custom-cursor-label">VIEW</span>';
  document.body.appendChild(cursorCircle);

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    circleX += (mouseX - circleX) * 0.18;
    circleY += (mouseY - circleY) * 0.18;
    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Attach hover triggers
  const interactiveElements = document.querySelectorAll('a, button, input, select, .vehicle-card, .service-card, [data-cursor]');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      const cursorText = el.getAttribute('data-cursor');
      const cursorLabel = cursorCircle.querySelector('.custom-cursor-label');
      if (cursorText) {
        cursorLabel.textContent = cursorText;
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.add('cursor-pointer-hover');
      }
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover', 'cursor-pointer-hover');
    });
  });
}

/* ----------------------------------------------------
   2. HEADER & STICKY NAVIGATION
---------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.nav-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ----------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
---------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const backdrop = document.querySelector('.mobile-menu-backdrop');

  if (!toggleBtn || !drawer) return;

  const openMenu = () => {
    drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ----------------------------------------------------
   4. SWIPER SLIDERS
---------------------------------------------------- */
function initSwiperSliders() {
  // Hero Slider
  if (document.querySelector('.hero-swiper')) {
    /* global Swiper */
    if (typeof Swiper !== 'undefined') {
      new Swiper('.hero-swiper', {
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.hero-pagination',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-custom-active'
        },
        navigation: {
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        },
        on: {
          slideChangeTransitionStart: function () {
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide && window.gsap) {
              const headline = activeSlide.querySelector('.hero-headline');
              const text = activeSlide.querySelector('.hero-text');
              const cta = activeSlide.querySelector('.hero-cta-box');

              if (headline) window.gsap.fromTo(headline, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
              if (text) window.gsap.fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'power3.out' });
              if (cta) window.gsap.fromTo(cta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' });
            }
          }
        }
      });
    }
  }

  // Testimonials Slider
  if (document.querySelector('.testimonial-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
}

/* ----------------------------------------------------
   5. GSAP & SCROLLTRIGGER ANIMATIONS
---------------------------------------------------- */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Fade Up Elements
  gsap.utils.toArray('.gsap-reveal').forEach((el) => {
    gsap.fromTo(el, 
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Staggered Cards
  gsap.utils.toArray('.gsap-stagger-container').forEach((container) => {
    const cards = container.querySelectorAll('.gsap-stagger-card');
    if (cards.length > 0) {
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Parallax Backgrounds
  gsap.utils.toArray('.gsap-parallax').forEach((img) => {
    gsap.to(img, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

/* ----------------------------------------------------
   6. ADVANCED BOOKING ENGINE
---------------------------------------------------- */
const VEHICLES_DATA = [
  { id: 'saloon', name: 'Standard Saloon', desc: 'Sleek & reliable sedan for everyday transfers', passengers: 4, luggage: 2, baseFare: 65, perMile: 2.20, img: 'assets/images/fleet_exec_saloon_1793814068663.jpg' },
  { id: 'exec_saloon', name: 'Executive Saloon', desc: 'Mercedes S-Class / E-Class premier executive luxury', passengers: 4, luggage: 3, baseFare: 95, perMile: 3.10, img: 'assets/images/2.jpg' },
  { id: 'exec_estate', name: 'Executive Estate', desc: 'Mercedes E-Class Estate with spacious luggage capacity', passengers: 4, luggage: 4, baseFare: 110, perMile: 3.40, img: 'assets/images/hero_airport_luggage_1793814068773.jpg' },
  { id: 'mpv', name: 'MPV Transporter', desc: 'Spacious 6-seater for families and small corporate groups', passengers: 6, luggage: 6, baseFare: 130, perMile: 3.80, img: 'assets/images/fleet_exec_mpv_1793814069276.jpg' },
  { id: 'exec_mpv', name: 'Executive MPV', desc: 'Mercedes V-Class 8-seater VIP luxury shuttle', passengers: 8, luggage: 8, baseFare: 160, perMile: 4.50, img: 'assets/images/1.jpg' }
];

const AIRPORT_DISTANCES = {
  'London Heathrow (LHR)': { 'Central London / Mayfair': 18, 'Canary Wharf': 23, 'Cambridge': 68, 'Oxford': 48, 'Brighton': 62 },
  'London Gatwick (LGW)': { 'Central London / Mayfair': 29, 'Canary Wharf': 31, 'Cambridge': 85, 'Oxford': 82, 'Brighton': 28 },
  'London Stansted (STN)': { 'Central London / Mayfair': 38, 'Canary Wharf': 34, 'Cambridge': 29, 'Oxford': 88 },
  'London Luton (LTN)': { 'Central London / Mayfair': 34, 'Canary Wharf': 38, 'Cambridge': 42, 'Oxford': 46 },
  'London City Airport (LCY)': { 'Central London / Mayfair': 10, 'Canary Wharf': 4, 'Cambridge': 58, 'Oxford': 64 },
  'Birmingham Airport (BHX)': { 'Central London / Mayfair': 112, 'Birmingham City Centre': 9, 'Coventry': 12 },
  'Manchester Airport (MAN)': { 'Central London / Mayfair': 195, 'Manchester City Centre': 10, 'Liverpool': 35 }
};

let bookingState = {
  journeyType: 'one-way', // 'one-way' | 'return'
  pickup: 'London Heathrow (LHR)',
  dropoff: 'Central London / Mayfair',
  pickupDate: '',
  pickupTime: '10:00',
  returnDate: '',
  returnTime: '18:00',
  passengers: 2,
  luggage: 2,
  selectedVehicleId: 'exec_saloon',
  flightNumber: '',
  meetAndGreet: true,
  childSeat: false,
  notes: '',
  passengerName: '',
  passengerEmail: '',
  passengerPhone: ''
};

function initBookingEngine() {
  const formContainer = document.querySelector('#booking-engine');
  if (!formContainer) return;

  // Render initial booking steps
  renderBookingTabs();
  bindBookingFormEvents();
  setDefaultBookingDates();
  calculateAndRenderVehicles();
}

function setDefaultBookingDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d) => d.toISOString().split('T')[0];
  
  bookingState.pickupDate = formatDate(today);
  bookingState.returnDate = formatDate(tomorrow);

  const dateInput = document.querySelector('#pickup-date');
  if (dateInput) dateInput.value = bookingState.pickupDate;

  const returnDateInput = document.querySelector('#return-date');
  if (returnDateInput) returnDateInput.value = bookingState.returnDate;
}

function renderBookingTabs() {
  const tabOneWay = document.querySelector('#tab-oneway');
  const tabReturn = document.querySelector('#tab-return');
  const returnDateField = document.querySelector('#return-date-field');

  if (tabOneWay && tabReturn) {
    tabOneWay.addEventListener('click', () => {
      bookingState.journeyType = 'one-way';
      tabOneWay.classList.add('bg-[#041F38]', 'text-white');
      tabOneWay.classList.remove('bg-slate-100', 'text-slate-600');
      tabReturn.classList.remove('bg-[#041F38]', 'text-white');
      tabReturn.classList.add('bg-slate-100', 'text-slate-600');
      if (returnDateField) returnDateField.classList.add('hidden');
      calculateAndRenderVehicles();
    });

    tabReturn.addEventListener('click', () => {
      bookingState.journeyType = 'return';
      tabReturn.classList.add('bg-[#041F38]', 'text-white');
      tabReturn.classList.remove('bg-slate-100', 'text-slate-600');
      tabOneWay.classList.remove('bg-[#041F38]', 'text-white');
      tabOneWay.classList.add('bg-slate-100', 'text-slate-600');
      if (returnDateField) returnDateField.classList.remove('hidden');
      calculateAndRenderVehicles();
    });
  }
}

function bindBookingFormEvents() {
  const pickupInput = document.querySelector('#pickup-location');
  const dropoffInput = document.querySelector('#dropoff-location');
  const dateInput = document.querySelector('#pickup-date');
  const timeInput = document.querySelector('#pickup-time');
  const passSelect = document.querySelector('#passengers-count');
  const luggSelect = document.querySelector('#luggage-count');

  if (pickupInput) {
    pickupInput.addEventListener('change', (e) => {
      bookingState.pickup = e.target.value;
      calculateAndRenderVehicles();
    });
  }

  if (dropoffInput) {
    dropoffInput.addEventListener('change', (e) => {
      bookingState.dropoff = e.target.value;
      calculateAndRenderVehicles();
    });
  }

  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      bookingState.pickupDate = e.target.value;
    });
  }

  if (timeInput) {
    timeInput.addEventListener('change', (e) => {
      bookingState.pickupTime = e.target.value;
    });
  }

  if (passSelect) {
    passSelect.addEventListener('change', (e) => {
      bookingState.passengers = parseInt(e.target.value) || 1;
      calculateAndRenderVehicles();
    });
  }

  if (luggSelect) {
    luggSelect.addEventListener('change', (e) => {
      bookingState.luggage = parseInt(e.target.value) || 0;
      calculateAndRenderVehicles();
    });
  }

  // Quick Airport Select Badges
  document.querySelectorAll('.airport-badge-select').forEach(badge => {
    badge.addEventListener('click', () => {
      const airportName = badge.getAttribute('data-airport');
      if (pickupInput && airportName) {
        pickupInput.value = airportName;
        bookingState.pickup = airportName;
        calculateAndRenderVehicles();
      }
    });
  });

  // Next Step / Proceed Button
  const calculateBtn = document.querySelector('#btn-calculate-fare');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const vehicleStep = document.querySelector('#booking-step-vehicles');
      if (vehicleStep) {
        vehicleStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

function estimateDistance(pickup, dropoff) {
  if (AIRPORT_DISTANCES[pickup] && AIRPORT_DISTANCES[pickup][dropoff]) {
    return AIRPORT_DISTANCES[pickup][dropoff];
  }
  if (AIRPORT_DISTANCES[dropoff] && AIRPORT_DISTANCES[dropoff][pickup]) {
    return AIRPORT_DISTANCES[dropoff][pickup];
  }
  // Default estimated distance for custom UK addresses
  return 22;
}

function calculateAndRenderVehicles() {
  const container = document.querySelector('#vehicles-list-container');
  if (!container) return;

  const distanceMiles = estimateDistance(bookingState.pickup, bookingState.dropoff);
  const isReturnMultiplier = bookingState.journeyType === 'return' ? 1.85 : 1.0;

  // Update distance badge text
  const distanceBadge = document.querySelector('#route-distance-text');
  if (distanceBadge) {
    distanceBadge.textContent = `Estimated Distance: ~${distanceMiles} miles (${bookingState.journeyType === 'return' ? 'Return Journey' : 'One Way'})`;
  }

  let html = '';
  VEHICLES_DATA.forEach(v => {
    const rawFare = (v.baseFare + (distanceMiles * v.perMile)) * isReturnMultiplier;
    const finalFare = Math.round(rawFare);
    const isSelected = v.id === bookingState.selectedVehicleId;

    html += `
      <div class="vehicle-card p-5 ${isSelected ? 'selected' : ''}" data-vehicle-id="${v.id}">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="w-full md:w-1/3 h-36 overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
            <img src="${v.img}" alt="${v.name}" class="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-4 mb-1">
                <h4 class="text-xl font-bold text-[#041F38]">${v.name}</h4>
                <div class="text-right">
                  <span class="text-xs text-slate-500 uppercase tracking-wider block font-medium">Guaranteed Fare</span>
                  <span class="text-2xl font-black text-[#041F38]">£${finalFare}</span>
                </div>
              </div>
              <p class="text-sm text-slate-600 mb-3">${v.desc}</p>
              <div class="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 mb-4">
                <span class="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md">
                  <svg class="w-4 h-4 text-[#041F38]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  ${v.passengers} Passengers
                </span>
                <span class="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md">
                  <svg class="w-4 h-4 text-[#041F38]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  ${v.luggage} Cases
                </span>
                <span class="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-md">
                  ✓ Free Flight Tracking
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between border-t border-slate-100 pt-3">
              <span class="text-xs text-slate-500 font-medium">Includes 60-min airport waiting time</span>
              <button type="button" class="btn-select-vehicle px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all ${isSelected ? 'bg-[#041F38] text-white shadow-md' : 'bg-slate-100 text-[#041F38] hover:bg-[#041F38] hover:text-white'}" data-vehicle-id="${v.id}">
                ${isSelected ? 'Selected' : 'Select Vehicle'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Attach vehicle selection listeners
  container.querySelectorAll('.btn-select-vehicle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vehicleId = btn.getAttribute('data-vehicle-id');
      bookingState.selectedVehicleId = vehicleId;
      calculateAndRenderVehicles();
      openPassengerModal();
    });
  });
}

function openPassengerModal() {
  const modal = document.querySelector('#booking-confirm-modal');
  if (!modal) return;

  const vehicle = VEHICLES_DATA.find(v => v.id === bookingState.selectedVehicleId) || VEHICLES_DATA[0];
  const distanceMiles = estimateDistance(bookingState.pickup, bookingState.dropoff);
  const isReturnMultiplier = bookingState.journeyType === 'return' ? 1.85 : 1.0;
  const finalFare = Math.round((vehicle.baseFare + (distanceMiles * vehicle.perMile)) * isReturnMultiplier);

  // Update modal summary
  const summaryBox = modal.querySelector('#modal-summary-box');
  if (summaryBox) {
    summaryBox.innerHTML = `
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2 mb-4">
        <div class="flex justify-between font-bold text-[#041F38]">
          <span>Route:</span>
          <span>${bookingState.pickup} → ${bookingState.dropoff}</span>
        </div>
        <div class="flex justify-between text-slate-600">
          <span>Type & Date:</span>
          <span>${bookingState.journeyType.toUpperCase()} | ${bookingState.pickupDate} at ${bookingState.pickupTime}</span>
        </div>
        <div class="flex justify-between text-slate-600">
          <span>Selected Vehicle:</span>
          <span class="font-semibold text-[#041F38]">${vehicle.name}</span>
        </div>
        <div class="flex justify-between border-t border-slate-200 pt-2 text-base font-black text-[#041F38]">
          <span>Total Fare:</span>
          <span>£${finalFare} GBP</span>
        </div>
      </div>
    `;
  }

  modal.classList.remove('hidden');

  // Modal Submit Action
  const submitBtn = modal.querySelector('#btn-submit-booking');
  if (submitBtn) {
    submitBtn.onclick = (e) => {
      e.preventDefault();

      const nameInput = modal.querySelector('#p-name');
      const emailInput = modal.querySelector('#p-email');
      const phoneInput = modal.querySelector('#p-phone');

      if (!nameInput.value || !emailInput.value || !phoneInput.value) {
        alert('Please fill in your name, email and contact phone number.');
        return;
      }

      bookingState.passengerName = nameInput.value;
      bookingState.passengerEmail = emailInput.value;
      bookingState.passengerPhone = phoneInput.value;

      // Generate Ref Number
      const bookingRef = 'CTL-' + Math.floor(100000 + Math.random() * 900000);

      const modalContent = modal.querySelector('#modal-inner-content');
      if (modalContent) {
        modalContent.innerHTML = `
          <div class="text-center py-6 space-y-4">
            <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
              ✓
            </div>
            <h3 class="text-2xl font-bold text-[#041F38]">Booking Voucher Confirmed!</h3>
            <p class="text-slate-600 max-w-md mx-auto text-sm">
              Thank you, <strong class="text-[#041F38]">${bookingState.passengerName}</strong>. Your executive transfer reference code is:
            </p>
            <div class="bg-[#041F38] text-white px-6 py-3 rounded-lg inline-block font-mono text-xl tracking-widest font-black shadow-lg">
              ${bookingRef}
            </div>
            <p class="text-xs text-slate-500">
              A detailed booking confirmation voucher and driver arrival instructions have been dispatched to <strong>${bookingState.passengerEmail}</strong>.
            </p>
            <div class="pt-4 flex justify-center gap-3">
              <button type="button" onclick="window.location.href='account.html'" class="px-6 py-3 bg-[#041F38] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:bg-slate-800">
                View My Booking Dashboard
              </button>
              <button type="button" onclick="document.querySelector('#booking-confirm-modal').classList.add('hidden')" class="px-6 py-3 bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-300">
                Close
              </button>
            </div>
          </div>
        `;
      }
    };
  }

  const closeModalBtn = modal.querySelector('#btn-close-modal');
  if (closeModalBtn) {
    closeModalBtn.onclick = () => modal.classList.add('hidden');
  }
}

/* ----------------------------------------------------
   7. FAQ ACCORDIONS
---------------------------------------------------- */
function initFAQAccordions() {
  const accordionButtons = document.querySelectorAll('.faq-accordion-header');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');

      const isOpen = !content.classList.contains('hidden');

      // Close all other items in same container
      const parent = btn.closest('.faq-container') || document;
      parent.querySelectorAll('.faq-accordion-content').forEach(c => c.classList.add('hidden'));
      parent.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ----------------------------------------------------
   8. ACCOUNT PORTAL (LOGIN/REGISTER/DASHBOARD)
---------------------------------------------------- */
function initAccountPortal() {
  const tabLogin = document.querySelector('#tab-auth-login');
  const tabRegister = document.querySelector('#tab-auth-register');
  const formLogin = document.querySelector('#form-auth-login');
  const formRegister = document.querySelector('#form-auth-register');

  if (tabLogin && tabRegister && formLogin && formRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('border-[#041F38]', 'text-[#041F38]');
      tabLogin.classList.remove('border-transparent', 'text-slate-500');
      tabRegister.classList.remove('border-[#041F38]', 'text-[#041F38]');
      tabRegister.classList.add('border-transparent', 'text-slate-500');

      formLogin.classList.remove('hidden');
      formRegister.classList.add('hidden');
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('border-[#041F38]', 'text-[#041F38]');
      tabRegister.classList.remove('border-transparent', 'text-slate-500');
      tabLogin.classList.remove('border-[#041F38]', 'text-[#041F38]');
      tabLogin.classList.add('border-transparent', 'text-slate-500');

      formRegister.classList.remove('hidden');
      formLogin.classList.add('hidden');
    });
  }
}

/* ----------------------------------------------------
   9. CONTACT & NEWSLETTER FORMS
---------------------------------------------------- */
function initContactForms() {
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const alertBox = contactForm.querySelector('.form-alert');
      if (alertBox) {
        alertBox.innerHTML = `
          <div class="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-sm font-semibold border border-emerald-200">
            ✓ Thank you for contacting Citilinkers. Our executive dispatch team will respond within 15 minutes.
          </div>
        `;
        alertBox.classList.remove('hidden');
        contactForm.reset();
      }
    });
  }

  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Citilinkers Executive Travel Updates.');
      newsletterForm.reset();
    });
  }
}

/* ----------------------------------------------------
   10. COUNTER ANIMATIONS
---------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || 100;
        let count = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / target));

        const timer = setInterval(() => {
          count += Math.ceil(target / 40);
          if (count >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = count;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
