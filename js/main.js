// ===== MENÚ HAMBURGUESA =====
const hamburguesa = document.querySelector('.hamburguesa');
const navLinks = document.querySelector('.nav-links');

if (hamburguesa && navLinks) {
  hamburguesa.addEventListener('click', () => {
    hamburguesa.classList.toggle('abierto');
    navLinks.classList.toggle('abierto');
  });

  // Cerrar al hacer click en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburguesa.classList.remove('abierto');
      navLinks.classList.remove('abierto');
    });
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!hamburguesa.contains(e.target) && !navLinks.contains(e.target)) {
      hamburguesa.classList.remove('abierto');
      navLinks.classList.remove('abierto');
    }
  });
}

// ===== MARCAR ENLACE ACTIVO EN NAVBAR =====
function marcarActivo() {
  const pagActual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === pagActual) {
      a.classList.add('activo');
    }
  });
}
marcarActivo();

// ===== ANIMACIÓN SCROLL (Intersection Observer) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Aplicar a elementos con clase .animar
document.querySelectorAll('.caja-texto, .tarjeta, .paso, .rol-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== BOTÓN VOLVER ARRIBA =====
const btnArriba = document.createElement('button');
btnArriba.innerHTML = '↑';
btnArriba.title = 'Volver arriba';
btnArriba.style.cssText = `
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: #1a3a5c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(26,58,92,0.3);
  z-index: 200;
  transition: background 0.2s, transform 0.2s;
`;
document.body.appendChild(btnArriba);

btnArriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
btnArriba.addEventListener('mouseenter', () => {
  btnArriba.style.background = '#f59e0b';
  btnArriba.style.transform = 'scale(1.1)';
});
btnArriba.addEventListener('mouseleave', () => {
  btnArriba.style.background = '#1a3a5c';
  btnArriba.style.transform = 'scale(1)';
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 320) {
    btnArriba.style.display = 'flex';
  } else {
    btnArriba.style.display = 'none';
  }
});

// ===== TOOLTIP EN BADGES =====
document.querySelectorAll('.badge').forEach(badge => {
  badge.style.cursor = 'default';
});

// ===== AÑO ACTUAL EN FOOTER =====
const yearEl = document.getElementById('anio');
if (yearEl) yearEl.textContent = new Date().getFullYear();
