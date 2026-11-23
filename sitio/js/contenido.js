/* Surco Digital · carga de contenido desde data/*.json
   Mientras llega cada archivo se ven los skeletons que ya están en el HTML. */

(function () {
  const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  const observa = (nodos) => window.SURCO && window.SURCO.observa && window.SURCO.observa(nodos);

  const el = (tag, attrs = {}, ...hijos) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v);
    }
    hijos.flat().forEach((h) => h != null && n.append(h));
    return n;
  };

  const carga = (url) =>
    fetch(url, { cache: 'no-cache' }).then((r) => {
      if (!r.ok) throw new Error(url + ' respondió ' + r.status);
      return r.json();
    });

  const error = (contenedor, reintentar) => {
    contenedor.replaceChildren(
      el('div', { class: 'carga-error', role: 'alert' },
        el('p', { text: 'No pudimos cargar esta sección.' }),
        el('button', { type: 'button', text: 'Intentar de nuevo' }))
    );
    contenedor.querySelector('button').addEventListener('click', reintentar);
    contenedor.setAttribute('aria-busy', 'false');
  };

  const dosCifras = (n) => String(n).padStart(2, '0');

  /* ---------- Proyectos ----------
     Solo se pintan los que están en data/proyectos.json.
     Los que aún no tienen permiso del cliente viven fuera de sitio/ (ver pendientes/). */
  const proyectos = document.querySelector('[data-proyectos]');
  function pintaProyectos() {
    carga('data/proyectos.json').then((lista) => {
      const items = lista.map((p, i) => {
        const primera = p.vistas[0];
        const modoCarga = i === 0 ? 'eager' : 'lazy';

        // Pantalla grande: ventana de navegador para páginas web, laptop para sistemas
        const pantalla = el('img', { src: primera.img, alt: primera.alt, width: 1600, height: 1000, loading: modoCarga, decoding: 'async' });
        const barra = el('span', { class: 'equipo__direccion', text: primera.barra });
        const equipo = el('figure', { class: 'equipo equipo--' + primera.equipo, id: 'vista-' + p.id },
          el('div', { class: 'equipo__barra', 'aria-hidden': 'true' }, el('i'), el('i'), el('i'), barra),
          el('div', { class: 'equipo__marco' }, pantalla),
          el('div', { class: 'equipo__base', 'aria-hidden': 'true' }));

        // Teléfono con la misma pantalla en versión celular
        const celImg = primera.celular
          ? el('img', { src: primera.celular.img, alt: primera.celular.alt, width: 600, height: 1298, loading: modoCarga, decoding: 'async' })
          : null;
        const telefono = celImg ? el('figure', { class: 'telefono' }, el('div', { class: 'telefono__pantalla' }, celImg)) : null;

        // Si el proyecto tiene varias pantallas (página, dashboard, punto de venta), se eligen con pestañas.
        let pestanas = null;
        if (p.vistas.length > 1) {
          const botones = p.vistas.map((v, j) => el('button', {
            type: 'button', class: 'vista', 'aria-pressed': String(j === 0), 'aria-controls': 'vista-' + p.id, text: v.nombre
          }));
          botones.forEach((b, j) => b.addEventListener('click', () => {
            const v = p.vistas[j];
            botones.forEach((o, k) => o.setAttribute('aria-pressed', String(j === k)));
            equipo.className = 'equipo equipo--' + v.equipo;
            pantalla.src = v.img;
            pantalla.alt = v.alt;
            barra.textContent = v.barra;
            if (celImg && v.celular) { celImg.src = v.celular.img; celImg.alt = v.celular.alt; }
            [equipo, telefono].forEach((n) => {
              if (!n) return;
              n.classList.remove('cambia');
              void n.offsetWidth;
              n.classList.add('cambia');
            });
          }));
          pestanas = el('div', { class: 'proyecto__vistas', role: 'group', 'aria-label': 'Pantallas de ' + p.nombre }, botones);
        }

        const enlace = p.url
          ? el('a', { class: 'proyecto__enlace', href: p.url, target: '_blank', rel: 'noopener' },
              el('span', { text: p.dominio || 'Ver sitio' }),
              el('span', { 'aria-hidden': 'true', text: '↗' }))
          : null;

        return el('li', { class: 'proyecto', id: 'proyecto-' + p.id, 'data-revela': '' },
          el('div', { class: 'proyecto__texto' },
            el('span', { class: 'proyecto__numero', 'aria-hidden': 'true', text: dosCifras(i + 1) }),
            el('h3', { text: p.nombre }),
            el('p', { class: 'proyecto__giro', text: p.giro }),
            el('p', { class: 'proyecto__resumen', text: p.resumen }),
            el('ul', { class: 'proyecto__hicimos', 'aria-label': 'Lo que hicimos' }, p.hicimos.map((h) => el('li', { text: h }))),
            pestanas,
            enlace),
          el('div', { class: 'proyecto__escena' }, equipo, telefono));
      });
      proyectos.replaceChildren(...items);
      proyectos.setAttribute('aria-busy', 'false');
      observa(items);
    }).catch(() => error(proyectos, pintaProyectos));
  }
  if (proyectos) pintaProyectos();

  /* ---------- Servicios ---------- */
  const servicios = document.querySelector('[data-servicios]');
  function pintaServicios() {
    carga('data/servicios.json').then((lista) => {
      const fichas = lista.map((s, i) =>
        el('li', { class: 'servicio', 'data-revela': '' },
          el('span', { class: 'servicio__numero', 'aria-hidden': 'true', text: dosCifras(i + 1) }),
          el('h3', { text: s.nombre }),
          el('p', { text: s.beneficio })));
      servicios.replaceChildren(...fichas);
      servicios.setAttribute('aria-busy', 'false');
      observa(fichas);
    }).catch(() => error(servicios, pintaServicios));
  }
  if (servicios) pintaServicios();

  /* ---------- Preguntas frecuentes ---------- */
  const faq = document.querySelector('[data-faq]');
  function pintaFaq() {
    carga('data/faq.json').then((lista) => {
      const items = lista.map((p, i) =>
        el('details', { class: 'pregunta', name: 'faq', 'data-revela': '', ...(i === 0 ? { open: '' } : {}) },
          el('summary', {}, el('span', { text: p.pregunta }), el('span', { class: 'mas', 'aria-hidden': 'true' })),
          el('div', { class: 'pregunta__respuesta' }, el('p', { text: p.respuesta }))));
      faq.replaceChildren(...items);
      faq.setAttribute('aria-busy', 'false');
      observa(items);
    }).catch(() => error(faq, pintaFaq));
  }
  if (faq) pintaFaq();

  /* ---------- Demo: el panel multisucursal ---------- */
  const tabs = document.querySelector('[data-demo-tabs]');
  const panel = document.querySelector('[data-demo-panel]');
  const seccion = document.querySelector('#demo');

  // Junta las sucursales: suma ventas, tickets y productos; reúne lo que falta surtir.
  function consolida(sucursales) {
    const productos = new Map();
    sucursales.forEach((s) => s.productos.forEach((p) => productos.set(p.nombre, (productos.get(p.nombre) || 0) + p.importe)));
    return {
      id: 'todas',
      nombre: 'Todas',
      ventas: sucursales.reduce((a, s) => a + s.ventas, 0),
      tickets: sucursales.reduce((a, s) => a + s.tickets, 0),
      productos: Array.from(productos, ([nombre, importe]) => ({ nombre, importe }))
        .sort((a, b) => b.importe - a.importe).slice(0, 4),
      surtir: sucursales.flatMap((s) => s.surtir.map((p) => ({ ...p, sucursal: s.nombre })))
    };
  }

  function pintaPanel(s, negocio, animar) {
    const max = Math.max(...s.productos.map((p) => p.importe));
    const titulo = s.id === 'todas' ? 'Todas las sucursales' : 'Sucursal ' + s.nombre;
    panel.replaceChildren(
      el('div', { class: 'panel__cabeza' }, el('strong', { text: titulo }), el('span', { text: negocio + ' · hoy' })),
      el('div', { class: 'panel__cifras' },
        el('div', { class: 'cifra' }, el('span', { text: 'Ventas' }), el('strong', { text: pesos.format(s.ventas) })),
        el('div', { class: 'cifra' }, el('span', { text: 'Tickets' }), el('strong', { text: String(s.tickets) })),
        el('div', { class: 'cifra' }, el('span', { text: 'Ticket promedio' }), el('strong', { text: pesos.format(s.ventas / s.tickets) }))),
      el('div', { class: 'panel__cuerpo' },
        el('div', {},
          el('h3', { text: 'Lo más vendido' }),
          el('ul', { class: 'barras' }, s.productos.map((p) =>
            el('li', {},
              el('span', { text: p.nombre }), el('b', { text: pesos.format(p.importe) }),
              el('span', { class: 'barras__tira', 'aria-hidden': 'true' },
                Array.from({ length: Math.max(1, Math.round((p.importe / max) * 22)) }, () => el('i'))))))),
        el('div', {},
          el('h3', { text: 'Te falta surtir (' + s.surtir.length + ')' }),
          s.surtir.length
            ? el('ul', { class: 'surtir' }, s.surtir.map((p) =>
                el('li', {},
                  p.nombre,
                  el('span', { text: 'Quedan ' + p.quedan + ', mínimo ' + p.minimo }),
                  p.sucursal ? el('em', { text: 'Sucursal ' + p.sucursal }) : null)))
            : el('p', { class: 'panel__nada', text: 'Todo surtido.' })))
    );
    panel.setAttribute('aria-busy', 'false');
    panel.setAttribute('aria-label', titulo);
    if (animar) {
      panel.classList.remove('cambia');
      void panel.offsetWidth;
      panel.classList.add('cambia');
    }
  }

  function pintaDemo() {
    carga('data/demo.json').then((datos) => {
      const opciones = [...datos.sucursales, consolida(datos.sucursales)];
      const botones = opciones.map((s, i) =>
        el('button', {
          class: 'sucursal', type: 'button', role: 'tab', id: 'tab-' + s.id,
          'aria-controls': 'panel-demo', 'aria-selected': String(i === 0), tabindex: i === 0 ? '0' : '-1',
          text: s.id === 'todas' ? 'Todas juntas' : s.nombre
        }));
      panel.id = 'panel-demo';

      const elige = (i, animar, enfoca) => {
        botones.forEach((b, j) => { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
        if (enfoca) botones[i].focus();
        panel.setAttribute('aria-labelledby', botones[i].id);
        seccion.dataset.sucursal = opciones[i].id;
        pintaPanel(opciones[i], datos.negocio, animar);
      };
      botones.forEach((b, i) => {
        b.addEventListener('click', () => elige(i, true));
        b.addEventListener('keydown', (e) => {
          const n = botones.length;
          const mapa = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
          if (e.key in mapa) { e.preventDefault(); elige((i + mapa[e.key] + n) % n, true, true); }
          if (e.key === 'Home') { e.preventDefault(); elige(0, true, true); }
          if (e.key === 'End') { e.preventDefault(); elige(n - 1, true, true); }
        });
      });
      tabs.replaceChildren(...botones);
      elige(0, false);
    }).catch(() => error(panel, pintaDemo));
  }
  if (tabs && panel) pintaDemo();
})();
