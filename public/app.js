(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.nav');
  const closeMenu = () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
  };
  menuButton?.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  const video = document.querySelector('#presentation-video');
  if (video) {
    const launch = document.querySelector('#video-launch');
    const message = document.querySelector('#video-message');
    const chapters = [...document.querySelectorAll('[data-time]')];
    launch.hidden = false;
    let requestedTime = null;
    const play = time => {
      if (typeof time === 'number') {
        if (video.readyState > 0) video.currentTime = Math.min(time, video.duration || time);
        else requestedTime = time;
      }
      launch.hidden = true;
      message.textContent = '';
      const promise = video.play();
      if (promise?.catch) promise.catch(() => {
        message.textContent = 'Use o botão de reprodução do vídeo para continuar.';
      });
    };
    video.addEventListener('loadedmetadata', () => {
      if (requestedTime !== null) {
        video.currentTime = Math.min(requestedTime, video.duration);
        requestedTime = null;
      }
    });
    launch.addEventListener('click', () => play());
    document.querySelectorAll('[data-watch]').forEach(link => link.addEventListener('click', () => play()));
    chapters.forEach(chapter => chapter.addEventListener('click', () => play(Number(chapter.dataset.time))));
    video.addEventListener('play', () => { launch.hidden = true; });
    video.addEventListener('timeupdate', () => {
      let current = chapters[0];
      for (const chapter of chapters) {
        if (video.currentTime >= Number(chapter.dataset.time)) current = chapter;
      }
      chapters.forEach(chapter => {
        const active = chapter === current;
        chapter.classList.toggle('active', active);
        if (active) chapter.setAttribute('aria-current', 'true');
        else chapter.removeAttribute('aria-current');
      });
    });
    video.addEventListener('error', () => {
      launch.hidden = true;
      message.textContent = 'Não foi possível carregar o vídeo. Você pode usar a opção Baixar vídeo ou ler a apresentação completa.';
    });
  }

  const route = (returnTrip = false, intermediate = false) => `<svg viewBox="0 0 450 145" role="img" aria-label="Percurso ilustrativo entre Pelotas, Camaquã e Porto Alegre"><path d="M40 87C103 87 117 40 208 40S319 87 410 87" stroke="#d7e1f8" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M40 87C103 87 117 40 208 40S319 87 410 87" stroke="#3867f1" stroke-width="2" stroke-dasharray="5 5" fill="none"/><circle cx="40" cy="87" r="7" fill="#3867f1" stroke="white" stroke-width="3"/><circle cx="410" cy="87" r="7" fill="#3867f1" stroke="white" stroke-width="3"/>${intermediate ? '<circle cx="208" cy="40" r="8" fill="#ffb452" stroke="white" stroke-width="3"/><text x="208" y="16" text-anchor="middle" fill="#516582" font-size="12">Camaquã</text>' : ''}${returnTrip ? '<path d="M408 103C296 149 147 149 43 103" fill="none" stroke="#ffb452" stroke-width="2"/><path d="m51 102-10-1 5 10" fill="none" stroke="#ffb452" stroke-width="2"/><text x="224" y="116" fill="#8d661f" font-size="11" text-anchor="middle">Uma nova carga na volta</text>' : ''}<text x="40" y="61" fill="#516582" font-size="12">Pelotas</text><text x="410" y="61" fill="#516582" font-size="12" text-anchor="end">Porto Alegre</text></svg>`;
  const featureContent = {
    personalizacao: {
      kicker: 'Sua identidade, novas possibilidades',
      title: 'A plataforma com a sua marca.',
      description: 'Adapte a identidade visual para uma empresa, um projeto regional ou até um time de futebol. A tecnologia pode fazer parte de uma proposta alinhada ao público que você quer alcançar.',
      visual: '<div class="personalization-cards" aria-hidden="true"><div class="identity-card"><b class="identity-mark">↗</b><span>SUA EMPRESA</span></div><div class="identity-card"><b class="identity-mark">R.</b><span>SUA REGIÃO</span></div><div class="identity-card"><b class="identity-mark">FC</b><span>SEU CLUBE</span></div></div>',
      caption: 'Representação ilustrativa da possibilidade de personalização.'
    },
    regionalizacao: {
      kicker: 'Proximidade também é estratégia',
      title: 'Pense por território. Construa conexões locais.',
      description: 'Estruture a comercialização do produto por região e desenvolva parcerias locais. A proposta pode acompanhar a identidade e o contexto de cada território.',
      visual: '<svg viewBox="0 0 450 145" role="img" aria-label="Três regiões ilustrativas conectadas à mesma plataforma"><path d="M82 83 225 54 368 83" fill="none" stroke="#bbcdf7" stroke-width="2" stroke-dasharray="5 5"/><circle cx="82" cy="73" r="34" fill="#eaf0ff"/><circle cx="225" cy="47" r="34" fill="#3867f1"/><circle cx="368" cy="73" r="34" fill="#eaf0ff"/><path d="m72 73 7 7 14-15M215 47l7 7 14-15M358 73l7 7 14-15" fill="none" stroke="#3867f1" stroke-width="2.5"/><path d="m215 47 7 7 14-15" fill="none" stroke="white" stroke-width="2.5"/><text x="82" y="129" text-anchor="middle" font-size="12" fill="#516582">Região A</text><text x="225" y="102" text-anchor="middle" font-size="12" fill="#516582">Região B</text><text x="368" y="129" text-anchor="middle" font-size="12" fill="#516582">Região C</text></svg>',
      caption: 'Cenário ilustrativo de atuação por região.'
    },
    reboque: {
      kicker: 'Outra possibilidade para o profissional',
      title: 'Um carro. Um reboque. Novas possibilidades.',
      description: 'O projeto contempla carros com reboque, permitindo que motoristas que já trabalham com aplicativos explorem outra modalidade de transporte.',
      visual: '<svg viewBox="0 0 450 145" role="img" aria-label="Representação esquemática de carro com reboque"><path d="M20 117h410" stroke="#dce4f2" stroke-width="2"/><path d="m48 95 4-29 25-7 24-30h61l27 31 27 10v25H48Z" fill="#eaf0ff" stroke="#3867f1" stroke-width="2.5"/><path d="m94 59 16-21h44l20 21H94Z" fill="white" stroke="#3867f1" stroke-width="2"/><path d="M216 93h38M254 61h124v34H254z" fill="#eaf0ff" stroke="#3867f1" stroke-width="2.5"/><rect x="274" y="27" width="37" height="34" rx="2" fill="#ffdeae" stroke="#d9a251" stroke-width="1.5"/><path d="M292 28v11" stroke="#d9a251" stroke-width="1.5"/><rect x="316" y="37" width="40" height="24" rx="2" fill="#ffdeae" stroke="#d9a251" stroke-width="1.5"/><circle cx="86" cy="97" r="15" fill="#203452"/><circle cx="178" cy="97" r="15" fill="#203452"/><circle cx="330" cy="97" r="15" fill="#203452"/><circle cx="86" cy="97" r="6" fill="#c4d3ed"/><circle cx="178" cy="97" r="6" fill="#c4d3ed"/><circle cx="330" cy="97" r="6" fill="#c4d3ed"/></svg>',
      caption: 'Representação ilustrativa da modalidade com reboque.'
    },
    retorno: {
      kicker: 'A volta também pode movimentar',
      title: 'A viagem termina. A oportunidade continua.',
      description: 'Depois da entrega, o motorista pode aproveitar o retorno para transportar outra carga. A modalidade amplia o uso do trajeto e pode permitir uma proposta mais competitiva.',
      visual: route(true, false),
      caption: 'Exemplo esquemático de ida e retorno, sem escala geográfica.'
    },
    caminho: {
      kicker: 'Oportunidades ao longo do percurso',
      title: 'Tem mais de uma oportunidade no seu caminho.',
      description: 'Em uma viagem de Pelotas a Porto Alegre, por exemplo, o motorista pode atender uma coleta ou entrega em Camaquã. O frete pelo caminho aproveita possibilidades durante o percurso.',
      visual: route(false, true),
      caption: 'Percurso ilustrativo. Sem escala geográfica ou informação de trânsito.'
    }
  };
  const featureTabs = [...document.querySelectorAll('[data-feature]')];
  const panel = document.querySelector('#feature-panel');
  const selectFeature = tab => {
    const content = featureContent[tab.dataset.feature];
    if (!content || !panel) return;
    featureTabs.forEach(item => {
      item.setAttribute('aria-selected', String(item === tab));
      item.tabIndex = item === tab ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    document.querySelector('#feature-kicker').textContent = content.kicker;
    document.querySelector('#feature-title').textContent = content.title;
    document.querySelector('#feature-description').textContent = content.description;
    document.querySelector('#feature-visual').innerHTML = content.visual;
    panel.querySelector('.visual-caption').textContent = content.caption;
    if (!reducedMotion.matches && typeof panel.animate === 'function') {
      panel.animate([
        { opacity: 0.55, transform: 'translateY(7px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 300, easing: 'cubic-bezier(.2,.75,.2,1)' });
    }
  };
  featureTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectFeature(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % featureTabs.length;
      else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (index - 1 + featureTabs.length) % featureTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = featureTabs.length - 1;
      else return;
      event.preventDefault();
      selectFeature(featureTabs[next]);
      featureTabs[next].focus();
    });
  });
  const tabsList = document.querySelector('.feature-tabs');
  if (tabsList) {
    const mobile = window.matchMedia('(max-width: 850px)');
    const setOrientation = () => tabsList.setAttribute('aria-orientation', mobile.matches ? 'horizontal' : 'vertical');
    setOrientation();
    mobile.addEventListener('change', setOrientation);
  }

  // Full-size original screens, with native dialog focus and Escape handling.
  const previews = [...document.querySelectorAll('[data-preview]')];
  const screenDialog = document.querySelector('#screen-dialog');
  if (previews.length && screenDialog && typeof screenDialog.showModal === 'function') {
    const dialogImage = document.querySelector('#screen-dialog-image');
    const dialogTitle = document.querySelector('#screen-dialog-title');
    let currentScreen = 0;
    let previousOverflow = '';
    const renderScreen = index => {
      currentScreen = (index + previews.length) % previews.length;
      const trigger = previews[currentScreen];
      const source = trigger.querySelector('img');
      dialogImage.src = trigger.href;
      dialogImage.alt = source.alt;
      dialogTitle.textContent = `${trigger.dataset.caption} · ${currentScreen + 1}/${previews.length}`;
    };
    previews.forEach((trigger, index) => trigger.addEventListener('click', event => {
      event.preventDefault();
      renderScreen(index);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      screenDialog.showModal();
    }));
    screenDialog.querySelector('[data-screen-prev]').addEventListener('click', () => renderScreen(currentScreen - 1));
    screenDialog.querySelector('[data-screen-next]').addEventListener('click', () => renderScreen(currentScreen + 1));
    screenDialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        renderScreen(currentScreen + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    screenDialog.addEventListener('click', event => {
      if (event.target === screenDialog) screenDialog.close();
    });
    screenDialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
  }

  // Reveal each content block once; preserve readable content without JS.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -35px 0px' });
    const revealSelectors = '.section-heading, .overview-copy, .step, .feature-tabs, .feature-panel, .package-item, .screens-top, .screen-example, .faq-layout > div, .contact-copy, .contact-methods, .article-content section';
    document.querySelectorAll(revealSelectors).forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 55}ms`);
      element.classList.add('reveal-pending');
      revealObserver.observe(element);
    });
    document.documentElement.classList.add('motion-ready');
  }

  // One passive scroll listener and one animation frame for progress/parallax.
  const header = document.querySelector('.site-header');
  const heroArt = document.querySelector('.hero-art');
  const desktop = window.matchMedia('(min-width: 851px)');
  let framePending = false;
  const updateScroll = () => {
    framePending = false;
    const y = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? Math.max(0, Math.min(1, y / total)) : 0;
    document.documentElement.style.setProperty('--reading-progress', progress.toFixed(4));
    header?.classList.toggle('is-scrolled', y > 20);
    if (heroArt) {
      const offset = !reducedMotion.matches && desktop.matches ? -Math.min(y * 0.035, 19) : 0;
      heroArt.style.setProperty('--scene-y', `${offset.toFixed(1)}px`);
    }
  };
  const scheduleScroll = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateScroll);
  };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });
  window.addEventListener('pageshow', scheduleScroll);
  reducedMotion.addEventListener('change', scheduleScroll);
  updateScroll();

  const floatingContact = document.querySelector('.floating-contact');
  const contactSection = document.querySelector('#contato');
  if ('IntersectionObserver' in window && floatingContact && contactSection) {
    const contactObserver = new IntersectionObserver(entries => {
      const visible = entries.some(entry => entry.isIntersecting);
      floatingContact.classList.toggle('is-hidden', visible);
      floatingContact.tabIndex = visible ? -1 : 0;
      floatingContact.setAttribute('aria-hidden', String(visible));
    }, { threshold: 0.15 });
    contactObserver.observe(contactSection);
  }

  const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  if ('IntersectionObserver' in window && sectionLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(link => link.classList.toggle('is-active', link.hash === '#' + entry.target.id));
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    sectionLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) sectionObserver.observe(section);
    });
  }

  const tocLinks = [...document.querySelectorAll('.article-toc nav a')];
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        tocLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
      }
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('.article-content section').forEach(section => observer.observe(section));
  }

  function formatPhone(digits) {
    if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
      const local = digits.slice(4);
      return `+55 (${digits.slice(2, 4)}) ${local.slice(0, -4)}-${local.slice(-4)}`;
    }
    return '+' + digits;
  }
  function activateContact(type, label, href) {
    document.querySelectorAll(`[data-contact="${type}"]`).forEach(row => {
      const value = row.querySelector('[data-contact-value]');
      const link = document.createElement('a');
      link.textContent = label;
      link.href = href;
      if (type === 'whatsapp') { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      value.replaceChildren(link);
      row.hidden = false;
      row.classList.remove('pending');
      row.querySelector('.out-arrow').hidden = false;
    });
  }
  fetch('./site-data.json', { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw new Error('Contact data unavailable'); return response.json(); })
    .then(data => {
      const phone = typeof data.whatsapp === 'string' ? data.whatsapp.replace(/\D/g, '') : '';
      const email = typeof data.email === 'string' ? data.email.trim() : '';
      let active = false;
      if (/^[1-9]\d{7,14}$/.test(phone)) {
        const text = typeof data.message === 'string' ? data.message : 'Olá! Gostaria de conhecer o projeto Frete Express.';
        activateContact('whatsapp', formatPhone(phone), `https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
        document.querySelectorAll('[data-whatsapp-link]').forEach(link => {
          link.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        });
        active = true;
      }
      if (/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(email)) {
        activateContact('email', email, `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Interesse na aquisição do Frete Express')}`);
        active = true;
      }
      if (active) document.querySelectorAll('[data-contact-status]').forEach(element => {
        element.textContent = 'Entre em contato para conhecer os materiais e conversar sobre a aquisição do projeto.';
      });
    })
    .catch(() => { /* Keep the commercial WhatsApp in the HTML usable if loading configuration fails. */ });
})();
