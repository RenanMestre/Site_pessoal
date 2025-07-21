// Animação de carregamento da página
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.add('hidden');
    loadingOverlay.addEventListener('transitionend', () => {
        loadingOverlay.style.display = 'none';
    }, { once: true });
});

function atualizarContador() {
    const textarea = document.getElementById('mensagem');
    const contador = document.getElementById('contador-mensagem');
    const max = textarea.maxLength;
    contador.textContent = max - textarea.value.length;
}
document.addEventListener('DOMContentLoaded', atualizarContador);

// Frase animada do título
const jobTitles = [
    "Segurança Cibernético", "DevOps & DevSecOps Engineer",
    "Hacker Ético", "Desenvolvedor FullStack", "Desenvolvedor de IAs " 
];
let currentTitleIndex = 0;
const animatedJobTitleElement = document.getElementById('animated-job-title');

function typeWriter(text, i, callback) {
    if (i < text.length) {
        animatedJobTitleElement.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1, callback), 80);
    } else if (callback) {
        setTimeout(callback, 2000);
    }
}

function eraseText(callback) {
    const currentText = animatedJobTitleElement.textContent;
    if (currentText.length > 0) {
        animatedJobTitleElement.textContent = currentText.slice(0, -1);
        setTimeout(() => eraseText(callback), 40);
    } else if (callback) {
        callback();
    }
}

function animateJobTitle() {
    const nextTitle = jobTitles[currentTitleIndex];
    typeWriter(nextTitle, 0, () => {
        eraseText(() => {
            currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
            animateJobTitle();
        });
    });
}

// Botão de voltar ao topo
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    scrollToTopBtn.classList.toggle('hidden', window.scrollY <= 200);
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Barras de habilidade 2D dinâmicas
const skillBarsSection = document.getElementById('habilidades-tecnicas');
const skillBarFills = document.querySelectorAll('.skill-bar-column .bar-fill');
const skillPercentages = document.querySelectorAll('.skill-bar-column .bar-percentage');

function animateSkillBars2D() {
    skillBarFills.forEach((barFill, index) => {
        const level = parseInt(barFill.dataset.skillLevel);
        const percentageElement = skillPercentages[index];
        barFill.style.height = level + '%';
        barFill.classList.add('animated');
        let currentPercentage = 0;
        function updatePercentage() {
            if (currentPercentage < level) {
                currentPercentage++;
                percentageElement.textContent = currentPercentage + '%';
                requestAnimationFrame(updatePercentage);
            }
        }
        setTimeout(updatePercentage, 500);
    });
}

// Intersection Observer para animar barras de habilidade
if (skillBarsSection) {
    const observer2D = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars2D();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer2D.observe(skillBarsSection);
}

// Animação de entrada das seções
const animatedSections = document.querySelectorAll('.section-animated');
if (animatedSections.length) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    animatedSections.forEach(section => sectionObserver.observe(section));
}

// Scroll Spy
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').includes(current));
    });
});

// Menu hambúrguer
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
});
closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
});
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
    });
});

// Inicializa animação do título
animateJobTitle();