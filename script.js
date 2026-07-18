// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', () => {
    inicializarEstrelas();
    inicializarNuvens();
    inicializarNuvensBackground();
    inicializarPersonagens();
    inicializarConfetes();
    inicializarMusica();
    inicializarAnimacoes();
});

// ===== ESTRELAS PISCANDO =====
function inicializarEstrelas() {
    const starsContainer = document.getElementById('stars');
    const numEstrelas = 20;

    for (let i = 0; i < numEstrelas; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        starsContainer.appendChild(star);
    }
}

// ===== NUVENS ANIMADAS =====
function inicializarNuvens() {
    const cloudsContainer = document.getElementById('clouds');
    const numNuvens = 5;

    for (let i = 0; i < numNuvens; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = Math.random() * 50 + '%';
        cloud.style.width = (80 + Math.random() * 60) + 'px';
        cloud.style.height = (30 + Math.random() * 20) + 'px';
        cloud.style.animationDuration = (10 + Math.random() * 10) + 's';
        cloud.style.animationDelay = Math.random() * 5 + 's';
        cloudsContainer.appendChild(cloud);
    }
}

function inicializarNuvensBackground() {
    const cloudsBg = document.getElementById('cloudsBg');
    const numNuvens = 3;

    for (let i = 0; i < numNuvens; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud-main';
        cloud.style.top = (Math.random() * 100) + 'px';
        cloud.style.left = (Math.random() * 100) + '%';
        cloud.style.width = (150 + Math.random() * 100) + 'px';
        cloud.style.height = (60 + Math.random() * 40) + 'px';
        cloud.style.animationDuration = (15 + Math.random() * 20) + 's';
        cloud.style.animationDelay = Math.random() * 5 + 's';
        cloudsBg.appendChild(cloud);
    }
}

// ===== ANIMAÇÃO DE PERSONAGENS =====
function inicializarPersonagens() {
    const personagens = document.querySelectorAll('.personagem');
    personagens.forEach((personagem, index) => {
        setTimeout(() => {
            personagem.classList.add('animate');
        }, 200 * index);
    });
}

// ===== CONFETES =====
function inicializarConfetes() {
    // Criar confetes quando a página carregar completamente
    setTimeout(() => {
        criarConfetes();
    }, 3000); // Começar após 3 segundos
}

function criarConfetes() {
    const confettiContainer = document.getElementById('confetti');
    const numConfetes = 50;

    for (let i = 0; i < numConfetes; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        
        // Cores variadas
        const cores = ['#E9C46A', '#FFE89A', '#A9D8FF', '#CDECCB', '#4ECDC4'];
        confetti.style.background = cores[Math.floor(Math.random() * cores.length)];
        
        confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        confettiContainer.appendChild(confetti);

        // Remover elemento após animação
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }

    // Recriar confetes a cada 6 segundos
    setTimeout(criarConfetes, 6000);
}

// ===== MÚSICA DE FUNDO =====
function inicializarMusica() {
    const audio = document.getElementById('musica');
    
    // Tentar tocar música ao interagir com a página
    document.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(err => {
                console.log('Autoplay bloqueado pelo navegador:', err);
            });
        }
    }, { once: true });

    // Tentar tocar no load
    audio.play().catch(err => {
        console.log('Autoplay bloqueado:', err);
    });
}

// ===== ANIMAÇÕES SEQUENCIAIS =====
function inicializarAnimacoes() {
    // Animar elementos quando ficam visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease-out forwards';
            }
        });
    });

    document.querySelectorAll('.fade-in-texto').forEach(el => {
        observer.observe(el);
    });
}

// ===== SCROLL SUAVE =====
document.addEventListener('wheel', (e) => {
    // Comportamento padrão
}, { passive: true });

// ===== INTERATIVIDADE DOS BOTÕES =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });

    btn.addEventListener('click', () => {
        // Efeito de clique
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    });
});

// ===== CONTADOR REGRESSIVO =====
function inicializarContagem() {
    const dataPiscina = new Date('2026-09-20T14:00:00').getTime();

    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const diferenca = dataPiscina - agora;

        if (diferenca < 0) {
            clearInterval(intervalo);
            console.log('O evento começou!');
            return;
        }

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        console.log(`Faltam: ${dias}d ${horas}h ${minutos}m ${segundos}s`);
    }, 1000);
}

// ===== FUNÇÕES AUXILIARES =====

// Gerar número aleatório entre min e max
function gerarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Verificar se elemento está visível
function estaVisivel(elemento) {
    const rect = elemento.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ===== GESTOS MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe para esquerda
        console.log('Swipe para esquerda');
    } else if (touchEndX > touchStartX + 50) {
        // Swipe para direita
        console.log('Swipe para direita');
    }
}

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const skyBg = document.querySelector('.sky-bg');
    
    if (skyBg) {
        skyBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ===== LOG DE INICIALIZAÇÃO =====
console.log('🎉 Anthony Cauan - 1 Aninho');
console.log('🎬 Baby Looney Tunes');
console.log('✅ Página carregada com sucesso!');