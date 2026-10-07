// =================================================================== //
// VIBUDHA B R - PORTFOLIO INTERACTIVE APPLICATION SCRIPT              //
// =================================================================== //

document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------------------------------------- //
    // 1. TYPEWRITER EFFECT FOR HERO SUBTITLE                              //
    // ------------------------------------------------------------------- //
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        "Senior Software Engineer",
        "Full-Stack Architect",
        "Cloud Native Engineer",
        "Open-Source Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typewriterElement) return;
        
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ------------------------------------------------------------------- //
    // 2. THEME SWITCHER (DARK / LIGHT MODE WITH LOCALSTORAGE)            //
    // ------------------------------------------------------------------- //
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    // ------------------------------------------------------------------- //
    // 3. MOBILE NAVIGATION DRAWER TOGGLE                                 //
    // ------------------------------------------------------------------- //
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ------------------------------------------------------------------- //
    // 4. ACTIVE NAVBAR SCROLL SPY                                         //
    // ------------------------------------------------------------------- //
    const sections = document.querySelectorAll('section[id]');

    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    // ------------------------------------------------------------------- //
    // 5. SKILLS FILTER TABS                                              //
    // ------------------------------------------------------------------- //
    const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab button
            skillTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ------------------------------------------------------------------- //
    // 6. PROJECTS FILTER                                                 //
    // ------------------------------------------------------------------- //
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ------------------------------------------------------------------- //
    // 7. PROJECT DETAILS MODAL DIALOG                                     //
    // ------------------------------------------------------------------- //
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const viewDetailBtns = document.querySelectorAll('.view-details-btn');

    const projectDetailsData = {
        "1": {
            title: "CloudPulse Real-time Monitoring",
            category: "Full-Stack SaaS",
            tech: ["React", "Node.js", "WebSockets", "InfluxDB", "Docker"],
            description: "CloudPulse is an enterprise-grade server telemetry and monitoring dashboard engineered to handle high-frequency metrics. Features customizable data visualization graphs, automated anomaly alert thresholds, and multi-tenant user access control.",
            highlights: [
                "Streamed metrics via WebSockets with < 50ms latency.",
                "Integrated InfluxDB for time-series telemetry storage.",
                "Built responsive chart widgets using Recharts and Canvas API."
            ]
        },
        "2": {
            title: "Nexus Orchestrator Engine",
            category: "Cloud / Infrastructure",
            tech: ["Docker", "AWS Lambda", "Python", "Terraform"],
            description: "Nexus Orchestrator simplifies multi-cloud infrastructure deployment using declarative configuration specs. Automatically provisions EC2 instances, configures VPC peering, and triggers CI/CD deployment pipelines.",
            highlights: [
                "Reduced deployment downtime by 70%.",
                "Built modular Terraform blueprints for AWS and GCP.",
                "Implemented automated rollback logic for failed pipeline runs."
            ]
        },
        "3": {
            title: "DevFlow CLI Toolkit",
            category: "Developer Tool",
            tech: ["TypeScript", "Node.js", "Commander.js", "Jest"],
            description: "A fast command-line developer utility designed to standardize team boilerplate generation, manage environment variables, and run automated pre-commit hook checks across distributed repositories.",
            highlights: [
                "Over 10,000+ npm downloads in first month of release.",
                "Built custom plugin architecture for extension scripts.",
                "Fully unit-tested with Jest achieving 95% test coverage."
            ]
        },
        "4": {
            title: "Synth AI Collaborative Workspace",
            category: "Full-Stack Application",
            tech: ["Next.js", "Tailwind CSS", "OpenAI API", "PostgreSQL"],
            description: "An AI-enhanced workspace allowing engineering teams to brainstorm, draft API specifications, and generate markdown documentation collaboratively in real-time.",
            highlights: [
                "Implemented live cursor co-editing using Yjs CRDTs.",
                "Integrated OpenAI GPT-4 API for inline code generation.",
                "Deployed on Vercel with serverless PostgreSQL database."
            ]
        }
    };

    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectDetailsData[projectId];

            if (data && modalBody && modalOverlay) {
                modalBody.innerHTML = `
                    <div style="font-family: var(--font-code); color: var(--accent-cyan); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 8px;">${data.category}</div>
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">${data.title}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${data.description}</p>
                    <h4 style="font-size: 1.05rem; font-weight: 600; margin-bottom: 10px;">Key Accomplishments & Architecture:</h4>
                    <ul style="list-style-type: disc; padding-left: 20px; color: var(--text-secondary); margin-bottom: 24px;">
                        ${data.highlights.map(h => `<li style="margin-bottom: 6px;">${h}</li>`).join('')}
                    </ul>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
                        ${data.tech.map(t => `<span style="padding: 4px 12px; border-radius: 99px; background: var(--bg-tertiary); font-size: 0.8rem; color: var(--text-secondary);">${t}</span>`).join('')}
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <a href="https://github.com" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.85rem;"><i class="fa-brands fa-github"></i> GitHub Repo</a>
                        <button onclick="document.getElementById('modal-close').click()" class="btn btn-secondary" style="padding: 8px 20px; font-size: 0.85rem;">Close</button>
                    </div>
                `;
                modalOverlay.classList.add('active');
                modalOverlay.setAttribute('aria-hidden', 'false');
            }
        });
    });

    if (modalCloseBtn && modalOverlay) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            modalOverlay.setAttribute('aria-hidden', 'true');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                modalOverlay.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // ------------------------------------------------------------------- //
    // 8. STAT COUNTER ANIMATION ON SCROLL                                 //
    // ------------------------------------------------------------------- //
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    function animateStats() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100 && !animatedStats) {
            animatedStats = true;

            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = Math.ceil(target / 40);

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = count;
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
        }
    }

    window.addEventListener('scroll', animateStats);

    // ------------------------------------------------------------------- //
    // 9. BACK TO TOP BUTTON                                               //
    // ------------------------------------------------------------------- //
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------------------------------------------------------- //
    // 10. CONTACT FORM SUBMISSION FEEDBACK                                //
    // ------------------------------------------------------------------- //
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');

    if (contactForm && formAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formAlert.className = 'form-alert error';
                formAlert.textContent = 'Please fill out all required fields before submitting.';
                return;
            }

            // Simulate successful form dispatch
            formAlert.className = 'form-alert success';
            formAlert.textContent = `Thank you ${name}! Your message has been sent successfully. I will get back to you shortly.`;
            contactForm.reset();

            setTimeout(() => {
                formAlert.style.display = 'none';
            }, 5000);
        });
    }

});
