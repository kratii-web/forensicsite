// ===== ForensicLab Academy - Main Script =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initDNAHelix();
    initParticles();
    initExperimentModals();
    initEvidenceTabs();
    initCounterAnimation();
    initSearchBar();
    initSmoothScroll();
    initTypingEffect();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('.section[id]');
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
            }
        });
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (hamburger) {
        hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
    }
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// ===== DNA HELIX ANIMATION =====
function initDNAHelix() {
    const container = document.querySelector('.dna-helix');
    if (!container) return;

    const numStrands = 20;
    for (let i = 0; i < numStrands; i++) {
        const strand1 = document.createElement('div');
        const strand2 = document.createElement('div');
        strand1.className = 'dna-strand';
        strand2.className = 'dna-strand';

        const angle = (i / numStrands) * Math.PI * 4;
        const y = (i / numStrands) * 100;
        const x1 = 50 + Math.sin(angle) * 35;
        const x2 = 50 + Math.sin(angle + Math.PI) * 35;

        strand1.style.cssText = `left:${x1}%;top:${y}%;background:var(--accent-cyan);box-shadow:0 0 8px var(--accent-cyan);`;
        strand2.style.cssText = `left:${x2}%;top:${y}%;background:var(--accent-purple);box-shadow:0 0 8px var(--accent-purple);`;

        container.appendChild(strand1);
        container.appendChild(strand2);

        // Connector line
        if (i % 3 === 0) {
            const conn = document.createElement('div');
            conn.style.cssText = `
        position:absolute; top:${y}%; left:${Math.min(x1, x2)}%;
        width:${Math.abs(x1 - x2)}%; height:1px;
        background:linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
        opacity:0.3;
      `;
            container.appendChild(conn);
        }
    }
}

// ===== FLOATING PARTICLES =====
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '0, 212, 255' : '168, 85, 247';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== EXPERIMENT MODALS =====
function initExperimentModals() {
    const experimentData = {
        hair: {
            title: '🔬 Hair Morphology Analysis',
            sections: [
                { title: 'THEORY', content: 'Hair is one of the most commonly found trace evidence at crime scenes. Forensic hair analysis involves examining the morphological characteristics of hair — including the cuticle, cortex, and medulla — to determine species origin, body area, and potential individual characteristics. Microscopic comparison can link a suspect to a crime scene.' },
                { title: 'PROCEDURE', items: ['Collect hair samples using tweezers and place on glass slide', 'Prepare wet mount with glycerin or DPX mountant', 'Observe under compound microscope at 10x, 40x, and 100x magnification', 'Note cuticle pattern, medullary index, cortical texture, and pigment distribution', 'Compare known and questioned hair samples side by side'] },
                { title: 'OBSERVATION', content: 'Record the cuticle scale pattern (imbricate, spinous, coronal), medullary index (ratio of medulla diameter to hair diameter), pigment distribution (uniform, peripheral, central), and root morphology (anagen, catagen, telogen phase).' },
                { title: 'PRECAUTIONS', items: ['Handle samples with gloves to avoid contamination', 'Use separate instruments for known and questioned samples', 'Maintain chain of custody documentation', 'Do not touch the hair with bare hands'] },
                { title: 'FORENSIC SIGNIFICANCE', content: 'Hair analysis can determine human vs animal origin, racial characteristics, body area of origin, cosmetic treatment history, drug use (through toxicological analysis), and can potentially narrow down suspects. While not definitive for individual identification, it provides valuable associative evidence.' }
            ]
        },
        blood: {
            title: '🩸 Blood Stain Pattern Analysis',
            sections: [
                { title: 'THEORY', content: 'Blood Stain Pattern Analysis (BPA) is the systematic examination of bloodstain shapes, locations, and distribution patterns to reconstruct the events that produced them. The physics of blood in flight and its interaction with surfaces create predictable patterns that forensic analysts can interpret.' },
                { title: 'PROCEDURE', items: ['Document the scene with photography before any contact', 'Identify and classify bloodstain patterns (passive, transfer, projected)', 'Measure stain dimensions — length and width', 'Calculate angle of impact using sin⁻¹(width/length)', 'Use stringing or software methods to determine area of convergence', 'Reconstruct area of origin using 3D analysis'] },
                { title: 'OBSERVATION', content: 'Passive drops create circular stains on 90° surfaces. Impact spatter shows satellite droplets. Cast-off patterns indicate swinging motion. Transfer patterns reveal contact with bloody objects. Void patterns indicate an object or person blocked the blood.' },
                { title: 'PRECAUTIONS', items: ['Wear full PPE — gloves, mask, protective suit', 'Treat all blood as potentially infectious (BSL-2)', 'Use proper biohazard disposal protocols', 'Document before collecting to preserve pattern context'] },
                { title: 'FORENSIC SIGNIFICANCE', content: 'BPA can determine the position of victim and assailant, type and sequence of events, type of weapon used, number of blows struck, left- or right-handedness of assailant, and whether the crime scene has been staged.' }
            ]
        },
        fingerprint: {
            title: '👆 Fingerprint Examination',
            sections: [
                { title: 'THEORY', content: 'Fingerprints are unique impressions formed by friction ridges on the fingertips. They are classified into three main patterns: loops (60-65%), whorls (30-35%), and arches (5%). No two individuals have identical fingerprints, making them one of the most reliable forms of personal identification in forensic science.' },
                { title: 'PROCEDURE', items: ['Detect latent prints using chemical, physical, or optical methods', 'Apply fingerprint powder (carbon black, aluminum) with a camel hair brush', 'Use chemical methods: ninhydrin, DFO, cyanoacrylate fuming', 'Lift developed prints using transparent tape onto backing cards', 'Scan and compare using AFIS (Automated Fingerprint Identification System)', 'Perform ACE-V methodology: Analysis, Comparison, Evaluation, Verification'] },
                { title: 'OBSERVATION', content: 'Identify Level 1 (pattern type), Level 2 (minutiae — bifurcations, ridge endings, dots, islands), and Level 3 (pores, ridge contours) details. Document ridge count, core, and delta positions.' },
                { title: 'PRECAUTIONS', items: ['Avoid touching surfaces before processing', 'Use development methods appropriate to the surface type', 'Process porous and non-porous surfaces differently', 'Maintain detailed chain of custody records'] },
                { title: 'FORENSIC SIGNIFICANCE', content: 'Fingerprints provide positive identification and are admissible in court worldwide. They can link suspects to crime scenes, objects, and documents, and can identify unknown deceased persons.' }
            ]
        },
        fiber: {
            title: '🧵 Fiber & Soil Analysis',
            sections: [
                { title: 'THEORY', content: 'Fiber analysis involves the identification and comparison of textile fibers transferred between individuals and objects during contact. Soil forensics examines the mineralogical, chemical, and biological composition of soil to associate persons or objects with specific locations.' },
                { title: 'PROCEDURE', items: ['Collect fiber samples with tape lifting or tweezers', 'Mount fibers on glass slides for microscopic examination', 'Determine fiber type: natural (cotton, wool) or synthetic (nylon, polyester)', 'Use polarized light microscopy for optical properties', 'For soil: collect samples from suspect and crime scene at multiple points', 'Analyze soil color (Munsell chart), texture, mineral content, and pH'] },
                { title: 'OBSERVATION', content: 'For fibers: record color, diameter, cross-sectional shape, birefringence, and dye composition. For soil: note color consistency, particle size distribution, presence of unique minerals or biological markers.' },
                { title: 'PRECAUTIONS', items: ['Prevent cross-contamination between known and questioned samples', 'Package fiber evidence separately in paper bindles', 'Collect soil samples from undisturbed areas near the crime scene', 'Use clean tools for each sample collection'] },
                { title: 'FORENSIC SIGNIFICANCE', content: 'Fiber and soil evidence can establish contact between persons, place individuals at crime scenes, connect vehicles to hit-and-run incidents, and provide investigative leads when combined with other evidence types.' }
            ]
        }
    };

    document.querySelectorAll('.experiment-card').forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.experiment;
            const data = experimentData[type];
            if (!data) return;
            showModal(data);
        });
    });

    function showModal(data) {
        const modal = document.getElementById('experimentModal');
        const content = modal.querySelector('.modal-body');
        content.innerHTML = `<h2>${data.title}</h2>` + data.sections.map(s => `
      <div class="modal-section">
        <h4>${s.title}</h4>
        ${s.content ? `<p>${s.content}</p>` : ''}
        ${s.items ? `<ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
        modal.classList.add('active');
    }

    // Close modal
    document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === el) {
                el.closest('.modal-overlay')?.classList.remove('active') ||
                    el.parentElement.closest('.modal-overlay')?.classList.remove('active');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        }
    });
}

// ===== EVIDENCE TABS =====
function initEvidenceTabs() {
    const tabs = document.querySelectorAll('.evidence-tab');
    const groups = document.querySelectorAll('.evidence-group');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tab;

            groups.forEach(group => {
                if (target === 'all' || group.dataset.category === target) {
                    group.style.display = 'flex';
                    group.style.opacity = '0';
                    setTimeout(() => { group.style.opacity = '1'; }, 50);
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));

    function animateCount(el) {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
}

// ===== SEARCH BAR =====
function initSearchBar() {
    const searchInput = document.querySelector('.nav-search input');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            const sections = document.querySelectorAll('.section[id]');
            for (const section of sections) {
                if (section.textContent.toLowerCase().includes(query)) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    section.style.outline = '2px solid var(--accent-cyan)';
                    setTimeout(() => { section.style.outline = 'none'; }, 3000);
                    break;
                }
            }
            searchInput.value = '';
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const phrases = [
        'Hair Morphology Analysis',
        'Blood Stain Pattern Analysis',
        'Fingerprint Examination',
        'Fiber & Soil Analysis',
        'Digital Forensics',
        'Toxicology Reports'
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            el.textContent = current.substring(0, charIdx--);
            if (charIdx < 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
        } else {
            el.textContent = current.substring(0, charIdx++);
            if (charIdx > current.length) { isDeleting = true; setTimeout(type, 1500); return; }
        }
        setTimeout(type, isDeleting ? 40 : 80);
    }
    type();
}
