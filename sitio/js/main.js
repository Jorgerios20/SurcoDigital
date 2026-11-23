/* Surco Digital · comportamiento general */

/* Contacto: todo entra por WhatsApp */
window.SURCO = {
  whatsapp: '525560678097', // lada de país + número, sin espacios ni signos
  mensaje: 'Hola, quiero platicar sobre un sistema para mi negocio.'
};

(function () {
  const raiz = document.documentElement;
  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const enlaceWhatsApp = (texto) =>
    'https://wa.me/' + window.SURCO.whatsapp + '?text=' + encodeURIComponent(texto || window.SURCO.mensaje);

  /* Enlaces de WhatsApp */
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    a.href = enlaceWhatsApp();
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Año en el pie */
  const anio = document.querySelector('[data-anio]');
  if (anio) anio.textContent = new Date().getFullYear();

  /* Formulario de contacto → WhatsApp con el mensaje escrito */
  const form = document.querySelector('[data-contacto]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const necesidad = form.necesidad.value.trim();
      let texto = 'Hola, soy ' + nombre + '.';
      texto += necesidad ? ' Mi negocio necesita: ' + necesidad + '.' : ' Quiero platicar sobre un sistema para mi negocio.';
      const presupuesto = form.querySelector('input[name="presupuesto"]:checked');
      if (presupuesto) texto += ' Presupuesto aproximado: ' + presupuesto.value + '.';
      window.open(enlaceWhatsApp(texto), '_blank', 'noopener');
    });
  }

  /* Menú en teléfono */
  const barra = document.querySelector('[data-barra]');
  const boton = document.querySelector('[data-menu]');
  if (boton && barra) {
    const cierra = () => { barra.classList.remove('menu-abierto'); boton.setAttribute('aria-expanded', 'false'); boton.textContent = 'Menú'; };
    boton.addEventListener('click', () => {
      const abierto = barra.classList.toggle('menu-abierto');
      boton.setAttribute('aria-expanded', String(abierto));
      boton.textContent = abierto ? 'Cerrar' : 'Menú';
    });
    barra.querySelectorAll('.barra__enlaces a').forEach((a) => a.addEventListener('click', cierra));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cierra(); });
  }

  /* La barra toma el color de la parcela que tiene debajo */
  if (barra) {
    const OSCUROS = ['bosque', 'noche'];
    const parcelas = Array.from(document.querySelectorAll('.hero__cielo, .hero__tierra, main > section.capitulo, .pie'));
    const actualiza = () => {
      const y = barra.offsetHeight / 2;
      const debajo = parcelas.find((p) => { const r = p.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
      if (!debajo) return;
      const color = debajo.dataset.capitulo;
      barra.dataset.capitulo = color;
      barra.classList.toggle('es-oscura', OSCUROS.includes(color));
    };
    let pendiente = false;
    addEventListener('scroll', () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => { actualiza(); pendiente = false; });
    }, { passive: true });
    addEventListener('resize', actualiza);
    actualiza();
  }

  /* Tira de fotos del contacto: se duplica para que el carrusel no tenga fin */
  const carril = document.querySelector('.contacto__carril');
  if (carril && !sinMovimiento) carril.append(...Array.from(carril.children).map((n) => n.cloneNode(true)));

  /* Entradas al hacer scroll, escalonadas dentro de cada sección */
  if (!sinMovimiento && 'IntersectionObserver' in window) {
    raiz.classList.add('revela-listo');
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('es-visible');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    window.SURCO.observa = (nodos) => {
      const porSeccion = new Map();
      nodos.forEach((n) => {
        const s = n.closest('section, footer') || document.body;
        const i = porSeccion.get(s) || 0;
        n.style.setProperty('--retraso', Math.min(i, 6) * 80 + 'ms');
        porSeccion.set(s, i + 1);
        io.observe(n);
      });
    };
    window.SURCO.observa(document.querySelectorAll('[data-revela]'));
  } else {
    window.SURCO.observa = () => {};
  }
})();
