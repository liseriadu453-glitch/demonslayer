/* ============================================
   MAIN JS — Empire RP (Optimized)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Hyperdrive Intro ──
    const hyperdrive = document.getElementById('hyperdrive');
    if (hyperdrive) {
        setTimeout(() => {
            hyperdrive.classList.add('hidden');
        }, 2500);
        setTimeout(() => {
            hyperdrive.style.display = 'none';
        }, 3300);
    }

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (navbar) {
                    navbar.classList.toggle('scrolled', window.scrollY > 50);
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ── Mobile Menu ──
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // ── Animate On Scroll (AOS) ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // ── Counter Animation ──
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateCounter(target, count);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const step = target / 60;

        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target + '+';
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        update();
    }

    // ── Smooth reveal on page load ──
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    // ── Form multi-step logic ──
    window.currentStep = 1;

    window.nextStep = function(step) {
        const currentEl = document.getElementById('step' + window.currentStep);
        const nextEl = document.getElementById('step' + step);
        if (!currentEl || !nextEl) return;

        currentEl.classList.remove('active');
        nextEl.classList.add('active');
        window.currentStep = step;
        updateProgress();
        window.scrollTo({ top: document.querySelector('.form-section').offsetTop - 100, behavior: 'smooth' });
    };

    window.prevStep = function(step) {
        const currentEl = document.getElementById('step' + window.currentStep);
        const prevEl = document.getElementById('step' + step);
        if (!currentEl || !prevEl) return;

        currentEl.classList.remove('active');
        prevEl.classList.add('active');
        window.currentStep = step;
        updateProgress();
        window.scrollTo({ top: document.querySelector('.form-section').offsetTop - 100, behavior: 'smooth' });
    };

    function updateProgress() {
        const steps = document.querySelectorAll('.progress-step');
        const fills = document.querySelectorAll('.progress-fill');

        steps.forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            if (stepNum < window.currentStep) {
                step.classList.add('completed');
            } else if (stepNum === window.currentStep) {
                step.classList.add('active');
            }
        });

        fills.forEach((fill, index) => {
            fill.style.width = index < window.currentStep - 1 ? '100%' : '0';
        });
    }

    // ── Form submission ──
    const staffForm = document.getElementById('staffForm');
    const formSuccess = document.getElementById('formSuccess');

    if (staffForm) {
        staffForm.addEventListener('submit', (e) => {
            e.preventDefault();
            staffForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.classList.add('active');
                window.scrollTo({ top: formSuccess.offsetTop - 200, behavior: 'smooth' });
            }
        });
    }

    // ── Input focus effects ──
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.input-wrap')?.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.closest('.input-wrap')?.classList.remove('focused');
        });
    });

    // ── Lightweight card hover (CSS-only tilt via class, no per-pixel tracking) ──
    document.querySelectorAll('.rank-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

});
