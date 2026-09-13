/**
 * Bash Unisex Salon - Interactive JavaScript Engine
 * Prabhadevi, Mumbai
 */

(function () {
  'use strict';

  // Salon Configuration
  const SALON_CONFIG = {
    phoneCall: '9067257872',
    whatsappNumber: '918329931123',
    openHour: 10,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 30
  };

  /* --------------------------------------------------------------------------
   * 1. HEADER SCROLL & MOBILE DRAWER
   * -------------------------------------------------------------------------- */
  const mainHeader = document.getElementById('main-header');
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 25) {
      if (mainHeader) mainHeader.classList.add('scrolled');
    } else {
      if (mainHeader) mainHeader.classList.remove('scrolled');
    }
  });

  if (hamburgerToggle && mobileNavDrawer) {
    hamburgerToggle.addEventListener('click', function () {
      const isOpen = hamburgerToggle.classList.toggle('open');
      mobileNavDrawer.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburgerToggle.classList.remove('open');
        mobileNavDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 2. SCROLL FADE-IN OBSERVER
   * -------------------------------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --------------------------------------------------------------------------
   * 3. LIVE SALON HOURS STATUS (IST / Mumbai Time)
   * -------------------------------------------------------------------------- */
  function updateSalonStatus() {
    const badge = document.getElementById('live-hours-badge');
    const badgeText = document.getElementById('live-hours-text');
    if (!badge || !badgeText) return;

    try {
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTotalMin = currentHours * 60 + currentMinutes;

      const openTotalMin = SALON_CONFIG.openHour * 60 + SALON_CONFIG.openMinute; // 10:00 AM -> 600 min
      const closeTotalMin = SALON_CONFIG.closeHour * 60 + SALON_CONFIG.closeMinute; // 10:30 PM -> 1350 min

      const isOpen = currentTotalMin >= openTotalMin && currentTotalMin < closeTotalMin;

      if (isOpen) {
        badge.classList.remove('closed');
        badgeText.textContent = 'Open Now · Closes at 10:30 PM';
      } else {
        badge.classList.add('closed');
        badgeText.textContent = 'Closed Now · Opens at 10:00 AM';
      }
    } catch (e) {
      badgeText.textContent = 'Open Daily · 10:00 AM – 10:30 PM';
    }
  }
  updateSalonStatus();
  setInterval(updateSalonStatus, 60000);

  /* --------------------------------------------------------------------------
   * 4. INTERACTIVE STYLE CONSULTATION QUIZ ("STYLE MATCHER")
   * -------------------------------------------------------------------------- */
  let quizAnswers = {
    target: 'women',
    goal: 'frizz',
    length: 'medium'
  };

  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizDots = document.querySelectorAll('.quiz-step-dot');

  function showQuizStep(stepIndex) {
    quizSteps.forEach(function (step, idx) {
      step.classList.toggle('active', idx === stepIndex);
    });
    quizDots.forEach(function (dot, idx) {
      dot.classList.toggle('active', idx === stepIndex);
    });
  }

  // Quiz Option Clicks
  document.querySelectorAll('.quiz-option-card').forEach(function (card) {
    card.addEventListener('click', function () {
      const step = parseInt(this.getAttribute('data-step'), 10);
      const val = this.getAttribute('data-val');

      if (step === 1) {
        quizAnswers.target = val;
        showQuizStep(1);
      } else if (step === 2) {
        quizAnswers.goal = val;
        showQuizStep(2);
      } else if (step === 3) {
        quizAnswers.length = val;
        renderQuizResult();
        showQuizStep(3);
      }
    });
  });

  const retakeBtn = document.getElementById('retake-quiz-btn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', function () {
      showQuizStep(0);
    });
  }

  function renderQuizResult() {
    const titleEl = document.getElementById('quiz-result-name');
    const priceEl = document.getElementById('quiz-result-price');
    const timeEl = document.getElementById('quiz-result-time');
    const tipEl = document.getElementById('quiz-result-tip');
    const bookBtn = document.getElementById('quiz-result-book');

    let rec = {
      name: 'L\'OrÃ©al Powerdose Hair Spa & Blowdry',
      price: 'â‚¹1,400',
      time: '50 Mins',
      tip: 'Our senior color & texture artists will infuse deep micro-lipids to restore elasticity and shine.'
    };

    if (quizAnswers.target === 'men') {
      if (quizAnswers.goal === 'haircut' || quizAnswers.goal === 'style') {
        rec = {
          name: 'The Gentleman\'s Precision Fade & Beard Sculpt',
          price: 'â‚¹750',
          time: '45 Mins',
          tip: 'Tailored scissor work followed by warm-towel steam, razor lining, and scalp refresh.'
        };
      } else {
        rec = {
          name: 'Scalp Detox & Therapeutic Head Massage',
          price: 'â‚¹850',
          time: '40 Mins',
          tip: 'Relieves Mumbai work stress with essential oils and pressure point stimulation.'
        };
      }
    } else {
      if (quizAnswers.goal === 'color') {
        rec = {
          name: 'Signature Caramel Balayage & Olaplex Glaze',
          price: 'â‚¹4,500',
          time: '3 - 3.5 Hours',
          tip: 'Freehand balayage customized to your skin tone, sealed with bonding care for zero damage.'
        };
      } else if (quizAnswers.goal === 'frizz' || quizAnswers.goal === 'smooth') {
        rec = {
          name: 'Liquid Silk Keratin Infusion Treatment',
          price: 'â‚¹4,999',
          time: '2.5 Hours',
          tip: 'Eliminates 95% of Mumbai monsoon humidity frizz, leaving high-gloss, manageable glass hair.'
        };
      } else if (quizAnswers.goal === 'volume' || quizAnswers.goal === 'haircut') {
        rec = {
          name: 'Korean Layered Cut & Voluminous Blowdry',
          price: 'â‚¹750',
          time: '45 Mins',
          tip: 'Feathered face-framing curtain bangs and textured layers to give effortless bounce.'
        };
      } else {
        rec = {
          name: 'Luxe KÃ©rastase Scalp & Hair Spa Ritual',
          price: 'â‚¹1,800',
          time: '60 Mins',
          tip: 'Deep cellular restoration with steam infusion and soothing neck-shoulder therapy.'
        };
      }
    }

    if (titleEl) titleEl.textContent = rec.name;
    if (priceEl) priceEl.textContent = `Starting at ${rec.price}`;
    if (timeEl) timeEl.textContent = `Duration: ~${rec.time}`;
    if (tipEl) tipEl.textContent = rec.tip;

    if (bookBtn) {
      bookBtn.onclick = function () {
        const text = `Hi Bash Unisex Salon Prabhadevi! I took your Style Matcher Quiz and got recommended: *${rec.name}* (${rec.price}). I'd like to book an appointment!`;
        window.open(`https://wa.me/${SALON_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
      };
    }
  }

  /* --------------------------------------------------------------------------
   * 5. INTERACTIVE PACKAGE BUILDER & SAVINGS CALCULATOR
   * -------------------------------------------------------------------------- */
  const builderCheckboxes = document.querySelectorAll('.builder-checkbox');
  const countDisplay = document.getElementById('calc-selected-count');
  const subtotalDisplay = document.getElementById('calc-subtotal');
  const discountDisplay = document.getElementById('calc-discount');
  const totalDisplay = document.getElementById('calc-total');
  const savingsDisplay = document.getElementById('calc-savings');
  const builderBookBtn = document.getElementById('calc-book-btn');

  function calculateBundle() {
    let count = 0;
    let subtotal = 0;
    let selectedNames = [];

    builderCheckboxes.forEach(function (cb) {
      const parent = cb.closest('.builder-item-label');
      if (cb.checked) {
        count++;
        const price = parseInt(cb.getAttribute('data-price'), 10) || 0;
        subtotal += price;
        const name = cb.getAttribute('data-name');
        if (name) selectedNames.push(name);
        if (parent) parent.classList.add('selected');
      } else {
        if (parent) parent.classList.remove('selected');
      }
    });

    // Discount tiers: 2 items = 10%, 3 items = 15%, 4+ items = 20%
    let discountPercent = 0;
    if (count === 2) discountPercent = 10;
    else if (count === 3) discountPercent = 15;
    else if (count >= 4) discountPercent = 20;

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const finalTotal = subtotal - discountAmount;

    if (countDisplay) countDisplay.textContent = `${count} Service${count === 1 ? '' : 's'}`;
    if (subtotalDisplay) subtotalDisplay.textContent = `â‚¹${subtotal.toLocaleString('en-IN')}`;
    if (discountDisplay) discountDisplay.textContent = discountPercent > 0 ? `-${discountPercent}% (â‚¹${discountAmount.toLocaleString('en-IN')})` : 'â‚¹0';
    if (totalDisplay) totalDisplay.textContent = `â‚¹${finalTotal.toLocaleString('en-IN')}`;
    if (savingsDisplay) {
      savingsDisplay.textContent = discountAmount > 0 ? `You Save â‚¹${discountAmount.toLocaleString('en-IN')} with our Combo Benefit!` : 'Select 2+ services for instant savings';
    }

    if (builderBookBtn) {
      if (count === 0) {
        builderBookBtn.disabled = true;
        builderBookBtn.style.opacity = '0.5';
      } else {
        builderBookBtn.disabled = false;
        builderBookBtn.style.opacity = '1';
        builderBookBtn.onclick = function () {
          const listStr = selectedNames.join(', ');
          const message =
            `*Custom Pamper Package Booking - Bash Unisex Salon*\n` +
            `-----------------------------------\n` +
            `*Selected Services (${count}):* ${listStr}\n` +
            `*Subtotal:* â‚¹${subtotal.toLocaleString('en-IN')}\n` +
            `*Combo Discount (${discountPercent}%):* -â‚¹${discountAmount.toLocaleString('en-IN')}\n` +
            `*Package Total:* â‚¹${finalTotal.toLocaleString('en-IN')}\n` +
            `-----------------------------------\n` +
            `Please confirm available appointment slots for me at Prabhadevi salon!`;
          window.open(`https://wa.me/${SALON_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        };
      }
    }
  }

  builderCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', calculateBundle);
  });
  calculateBundle(); // Initial calculation

  /* --------------------------------------------------------------------------
   * 6. MULTI-LOOK BEFORE & AFTER COMPARISON SLIDER
   * -------------------------------------------------------------------------- */
  const baData = {
    look1: {
      title: 'Keratin Revive: Frizz to Liquid Glass Hair',
      desc: 'Infused with botanical keratin to eliminate humidity puffiness and deliver intense mirror shine for 4+ months.',
      beforeImg: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80'
    },
    look2: {
      title: 'Sun-Kissed Caramel Balayage & Glaze',
      desc: 'Seamless blended babylights and face-framing ribbons with zero harsh line regrowth, protected with Olaplex.',
      beforeImg: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    },
    look3: {
      title: 'Gentleman\'s Skin Fade & Architectural Beard',
      desc: 'Razor-sharp gradient transition with hot towel softening, beard oil infusion, and crisp natural hairline contour.',
      beforeImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
    }
  };

  const baSlider = document.getElementById('ba-slider');
  const baBeforeLayer = document.getElementById('ba-before-layer');
  const baHandle = document.getElementById('ba-handle');
  const baBeforeImg = document.getElementById('ba-before-img');
  const baAfterImg = document.getElementById('ba-after-img');
  const baTitle = document.getElementById('ba-title');
  const baDesc = document.getElementById('ba-desc');
  const baTabs = document.querySelectorAll('.ba-tab');

  baTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      baTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      const lookKey = this.getAttribute('data-look');
      const look = baData[lookKey];
      if (look) {
        if (baBeforeImg) baBeforeImg.src = look.beforeImg;
        if (baAfterImg) baAfterImg.src = look.afterImg;
        if (baTitle) baTitle.textContent = look.title;
        if (baDesc) baDesc.textContent = look.desc;
      }
    });
  });

  if (baSlider && baBeforeLayer && baHandle) {
    let isSliding = false;

    function setSliderPosition(x) {
      const rect = baSlider.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      baBeforeLayer.style.width = percentage + '%';
      baHandle.style.left = percentage + '%';
      baHandle.setAttribute('aria-valuenow', Math.round(percentage));
    }

    baSlider.addEventListener('mousedown', function (e) {
      isSliding = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', function (e) {
      if (!isSliding) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', function () {
      isSliding = false;
    });

    baSlider.addEventListener('touchstart', function (e) {
      isSliding = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
      if (!isSliding) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', function () {
      isSliding = false;
    });
  }

  /* --------------------------------------------------------------------------
   * 7. SERVICES FILTER & SEARCH
   * -------------------------------------------------------------------------- */
  const serviceTabs = document.querySelectorAll('.services-section .tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceSearchInput = document.getElementById('service-search');

  function filterServices() {
    const activeTab = document.querySelector('.services-section .tab-btn.active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
    const query = serviceSearchInput ? serviceSearchInput.value.toLowerCase().trim() : '';

    serviceCards.forEach(function (card) {
      const cardCategory = card.getAttribute('data-service-category') || '';
      const cardText = card.textContent.toLowerCase();

      const matchesCat = (selectedCategory === 'all' || cardCategory === selectedCategory);
      const matchesSearch = (!query || cardText.includes(query));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  serviceTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      serviceTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      filterServices();
    });
  });

  if (serviceSearchInput) {
    serviceSearchInput.addEventListener('input', filterServices);
  }

  /* --------------------------------------------------------------------------
   * 8. GALLERY FILTER & LIGHTBOX MODAL
   * -------------------------------------------------------------------------- */
  const galleryTabs = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      galleryTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      const cat = this.getAttribute('data-gallery-cat');
      galleryCards.forEach(function (card) {
        const itemCat = card.getAttribute('data-gallery-item');
        if (cat === 'all' || itemCat === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaptionText = document.getElementById('lightbox-caption-text');
  const lightboxBookBtn = document.getElementById('lightbox-book-btn');

  function openLightbox(card) {
    if (!lightbox) return;
    const caption = card.getAttribute('data-caption') || 'Bash Unisex Salon Signature Look';
    const category = card.getAttribute('data-cat') || 'Styling';
    const imgEl = card.querySelector('img');
    const imgSrc = imgEl ? imgEl.src : '';

    if (lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = caption;
    }
    if (lightboxCaptionText) {
      lightboxCaptionText.innerHTML = `<strong>${category}:</strong> ${caption}`;
    }
    if (lightboxBookBtn) {
      lightboxBookBtn.onclick = function () {
        closeLightbox();
        openBookingModal(`${category} - ${caption}`);
      };
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openLightbox(this);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 9. TESTIMONIALS CAROUSEL & FILTER
   * -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoSlideTimer = null;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
      resetAutoSlide();
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      const idx = parseInt(this.getAttribute('data-slide'), 10);
      goToSlide(idx);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideTimer = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 6500);
  }

  function resetAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    startAutoSlide();
  }
  startAutoSlide();

  /* --------------------------------------------------------------------------
   * 10. FAQ ACCORDION
   * -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        faqItems.forEach(function (f) { f.classList.remove('active'); });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
   * 11. WHATSAPP BOOKING MODAL & SUBMISSION
   * -------------------------------------------------------------------------- */
  const bookingModal = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const bookingForm = document.getElementById('whatsapp-booking-form');
  const serviceSelect = document.getElementById('booking-service');
  const dateInput = document.getElementById('booking-date');
  const notesInput = document.getElementById('booking-notes');

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  function openBookingModal(serviceName, notePrefill) {
    if (!bookingModal) return;
    if (serviceName && serviceSelect) {
      let optionFound = false;
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase() === serviceName.toLowerCase()) {
          serviceSelect.selectedIndex = i;
          optionFound = true;
          break;
        }
      }
      if (!optionFound) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
              serviceName.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            optionFound = true;
            break;
          }
        }
      }
    }
    if (notePrefill && notesInput) {
      notesInput.value = notePrefill;
    }
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-booking-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openBookingModal();
    });
  });

  document.querySelectorAll('.service-book-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const svcName = this.getAttribute('data-service-name');
      openBookingModal(svcName);
    });
  });

  document.querySelectorAll('.team-book-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const stylistName = this.getAttribute('data-stylist-name') || '';
      openBookingModal(null, `Requested Stylist: ${stylistName}`);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', function (e) {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('booking-name').value.trim();
      const phone = document.getElementById('booking-phone').value.trim();
      const service = document.getElementById('booking-service').value;
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;
      const notes = document.getElementById('booking-notes').value.trim();

      const messageText =
        `*New Appointment Booking - Bash Unisex Salon*\n` +
        `-----------------------------------\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Service:* ${service}\n` +
        `*Preferred Date:* ${date}\n` +
        `*Preferred Time Slot:* ${time}\n` +
        (notes ? `*Notes/Stylist Request:* ${notes}\n` : ``) +
        `-----------------------------------\n` +
        `_Booked via Bash Unisex Salon Prabhadevi Website_`;

      const encoded = encodeURIComponent(messageText);
      const targetUrl = `https://wa.me/${SALON_CONFIG.whatsappNumber}?text=${encoded}`;

      closeBookingModal();
      window.open(targetUrl, '_blank');
    });
  }

  /* --------------------------------------------------------------------------
   * 12. KEYBOARD SHORTCUTS
   * -------------------------------------------------------------------------- */
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeLightbox();
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
        hamburgerToggle.classList.remove('open');
        mobileNavDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
})();
