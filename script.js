document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('particles');
    const PARTICLE_COUNT = 28;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 14 + 10}s;
            animation-delay: ${Math.random() * 12}s;
            opacity: 0;
        `;

        if (Math.random() > 0.7) {
            p.style.background = '#ff6b3d';
        }

        container.appendChild(p);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const skillGroupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, i) => {
                    tag.style.opacity = '0';
                    tag.style.transform = 'translateY(16px)';
                    setTimeout(() => {
                        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, i * 80);
                });
                skillGroupObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-group').forEach(g => skillGroupObserver.observe(g));

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.stat-card');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 130);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.about-stats').forEach(s => statsObserver.observe(s));

    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.feature-item');
                items.forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-14px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 90);
                });
                featuresObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.thesis-features').forEach(f => featuresObserver.observe(f));

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const links = entry.target.querySelectorAll('.contact-link');
                links.forEach((link, i) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(16px)';
                    setTimeout(() => {
                        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, color 0.25s, background 0.25s, box-shadow 0.25s';
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, i * 110);
                });
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.contact-links').forEach(c => contactObserver.observe(c));

    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.style.color = 'var(--accent)';
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => navObserver.observe(s));

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    const heroBio = document.querySelector('.hero-bio');
    if (heroBio) {
        heroBio.style.opacity = '0';
        setTimeout(() => {
            heroBio.style.transition = 'opacity 0.8s ease';
            heroBio.style.opacity = '1';
        }, 600);
    }

    const thesisCard = document.querySelector('.thesis-card');
    if (thesisCard) {
        thesisCard.addEventListener('mousemove', (e) => {
            const rect = thesisCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            const tiltX = ((y - midY) / midY) * 3;
            const tiltY = ((x - midX) / midX) * -3;
            thesisCard.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            thesisCard.style.transition = 'transform 0.1s ease';
        });
        thesisCard.addEventListener('mouseleave', () => {
            thesisCard.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
            thesisCard.style.transition = 'transform 0.5s ease, box-shadow 0.4s';
        });
    }

    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed; width: 320px; height: 320px; border-radius: 50%;
        background: radial-gradient(circle, rgba(79,124,255,0.06) 0%, transparent 70%);
        pointer-events: none; z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.3s ease, top 0.3s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

});