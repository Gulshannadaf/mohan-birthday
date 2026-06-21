// ========================================
// MOHAN'S BIRTHDAY - LIGHT THEME JS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    initMusic();
    initWishButton();
    initScrollAnimations();
});

// Create beautiful floating elements
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    const items = ['💙', '✨', '🏸', '💫', '🎈', '⭐', '🌸', '💝', '🎉', '🦋'];

    function addFloatItem() {
        const item = document.createElement('div');
        item.className = 'float-item';
        item.textContent = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.animationDuration = (Math.random() * 6 + 10) + 's';
        item.style.animationDelay = Math.random() * 3 + 's';
        item.style.fontSize = (Math.random() * 1 + 1.2) + 'rem';
        container.appendChild(item);

        setTimeout(() => item.remove(), 18000);
    }

    // Initial burst
    for (let i = 0; i < 12; i++) {
        setTimeout(addFloatItem, i * 300);
    }

    // Continuous floating
    setInterval(addFloatItem, 1000);
}

// Music control
function initMusic() {
    const btn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    let playing = false;

    audio.volume = 0.4;

    btn.addEventListener('click', () => {
        if (playing) {
            audio.pause();
            btn.classList.remove('playing');
            btn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play().catch(e => console.log('Audio:', e));
            btn.classList.add('playing');
            btn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        playing = !playing;
    });
}

// Wish button with confetti
function initWishButton() {
    const btn = document.getElementById('wishBtn');
    const message = document.getElementById('wishMessage');
    const candles = document.querySelector('.candles');
    const cake = document.querySelector('.cake');

    btn.addEventListener('click', () => {
        // Blow out candles
        candles.style.opacity = '0.3';
        candles.style.animation = 'none';

        // Show message
        setTimeout(() => {
            btn.style.display = 'none';
            message.classList.add('show');
            triggerConfetti();
        }, 500);
    });
}

// Beautiful confetti burst
function triggerConfetti() {
    const colors = ['#FF9A9E', '#FECFEF', '#A18CD1', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1'];
    const emojis = ['🎉', '✨', '💙', '🏸', '⭐', '🎊', '💫'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const isEmoji = Math.random() > 0.7;

            if (isEmoji) {
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            } else {
                confetti.style.width = (Math.random() * 12 + 6) + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
            }

            confetti.style.cssText += `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -20px;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${Math.random() * 2 + 2.5}s ease-out forwards;
            `;

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 25);
    }

    // Add confetti animation if not exists
    if (!document.getElementById('confetti-anim')) {
        const style = document.createElement('style');
        style.id = 'confetti-anim';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg) scale(0.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .special-item, .memory-item, .gallery-item, .bff-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Click to create hearts
document.body.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.music-btn')) return;

    const heart = document.createElement('span');
    const hearts = ['💙', '💜', '💖', '✨'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        animation: heartFloat 1s ease-out forwards;
    `;
    document.body.appendChild(heart);

    // Add heart animation if not exists
    if (!document.getElementById('heart-anim')) {
        const style = document.createElement('style');
        style.id = 'heart-anim';
        style.textContent = `
            @keyframes heartFloat {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-60px) scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => heart.remove(), 1000);
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('%c🏸 Happy 22nd Birthday Mohan! 🏸',
    'background: linear-gradient(135deg, #FF9A9E, #FECFEF); color: white; padding: 15px 30px; font-size: 18px; border-radius: 10px; font-weight: bold;');
