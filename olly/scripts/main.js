/* ============================================
   MAIN.JS — Olly Motors
   ============================================ */

/* ---------- 1. Active nav link ---------- */
(function setActiveNav() {
    const page = document.body.dataset.page;
    document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
        if (link.dataset.page === page) link.classList.add('active');
    });
})();

/* ---------- 2. Nav scroll effect ---------- */
(function navScroll() {
    const navs = document.querySelectorAll('.site-nav, .about-nav, .book-nav');
    if (!navs.length) return;
    const onScroll = () => {
        navs.forEach(nav => nav.classList.toggle('scrolled', window.scrollY > 40));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ---------- 3. Mobile hamburger menu ---------- */
(function mobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('open');
        links.classList.toggle('mobile-open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('open');
            links.classList.remove('mobile-open');
            toggle.setAttribute('aria-expanded', false);
        });
    });
})();

/* ---------- 4. Services accordion ---------- */
function toggleService(header) {
    const body   = header.nextElementSibling;
    const isOpen = body.classList.contains('open');

    document.querySelectorAll('.service-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.service-header').forEach(h => h.classList.remove('active'));

    if (!isOpen) {
        body.classList.add('open');
        header.classList.add('active');
    }
}

/* ---------- 5. Book form handling ---------- */
(function bookForm() {
    const form    = document.getElementById('booking-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    // Set min date to today
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('.form-submit');
        btn.textContent = 'Sending…';
        btn.disabled = true;

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                form.style.display = 'none';
                if (success) {
                    success.classList.add('show');
                }
            } else {
                throw new Error('Server error');
            }
        } catch {
            btn.textContent = 'Book Now';
            btn.disabled = false;
            alert('Something went wrong. Please try WhatsApp or call us directly.');
        }
    });
})();

/* ---------- 6. Scroll-reveal animation ---------- */
(function scrollReveal() {
    const items = document.querySelectorAll('.review-card, .service-item, .contact-item');
    if (!items.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
        observer.observe(item);
    });
})();

// Apply revealed state
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(style);
});