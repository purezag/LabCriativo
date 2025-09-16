const menuToggle = document.getElementById('menu-toggle');
const cartToggle = document.getElementById('cart-toggle');
const sidebar = document.querySelector('.hidden-left-bar');
const cartPopup = document.querySelector('.cart-popup');
const stickBar = document.querySelector('.stick-bar');

let lastScrollTop = 0;

menuToggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = sidebar.classList.contains('active');
  closeAll();
  if (!isOpen) sidebar.classList.add('active');
});

cartToggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = cartPopup.classList.contains('active');
  closeAll();
  if (!isOpen) cartPopup.classList.add('active');
});

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) stickBar.style.top = '-60px';
  else stickBar.style.top = '1rem';
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

window.addEventListener('click', (e) => {
  const isClickInside = e.target.closest('.click-ignore');
  if (!isClickInside) closeAll();
});

function closeAll() {
  sidebar.classList.remove('active');
  cartPopup.classList.remove('active');
}

function updateTotal() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseFloat(item.querySelector('.price')?.dataset?.price || 0);
    const qty = parseInt(item.querySelector('input')?.value || 0);
    total += price * qty;
  });
  const el = document.getElementById('cart-total');
  if (el) el.textContent = "$ " + total.toFixed(2).replace(".", ",");
}

document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const input = e.target.parentElement.querySelector('input');
    let value = parseInt(input.value);
    if (e.target.textContent.trim() === "+") input.value = value + 1;
    else if (e.target.textContent.trim() === "-" && value > 1) input.value = value - 1;
    updateTotal();
  });
});

document.querySelectorAll('.quantity input').forEach(input => {
  input.addEventListener('change', () => {
    if (input.value < 1) input.value = 1;
    updateTotal();
  });
});

document.querySelectorAll('.remove-item').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.closest('.cart-item')?.remove();
    updateTotal();
  });
});

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  window.location.href = "checkout.html";
});

updateTotal();

const items = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let autoPlay;

function showSlide(index) {
  items.forEach((item, i) => {
    item.classList.remove("active");
    dots[i].classList.remove("active");
  });

  items[index].classList.add("active");
  dots[index].classList.add("active");
  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % items.length;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentIndex - 1 + items.length) % items.length;
  showSlide(prevIndex);
}

function startAutoPlay() {
  autoPlay = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
}

nextBtn.addEventListener("click", () => {
  stopAutoPlay();
  nextSlide();
  startAutoPlay();
});

prevBtn.addEventListener("click", () => {
  stopAutoPlay();
  prevSlide();
  startAutoPlay();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    stopAutoPlay();
    showSlide(i);
    startAutoPlay();
  });
});

let startX = 0;
let endX = 0;

document.querySelector(".carousel").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.querySelector(".carousel").addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});

showSlide(currentIndex);
startAutoPlay();

const glasses = [
  { el: document.querySelector('.img-glass1'), depth: 30, baseRotate: -5, floatAmp: 8, floatSpeed: 0.002, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass2'), depth: 50, baseRotate: -10, floatAmp: 12, floatSpeed: 0.003, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass3'), depth: 70, baseRotate: -15, floatAmp: 6, floatSpeed: 0.004, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass4'), depth: 40, baseRotate: 0, floatAmp: 2, floatSpeed: 0.0025, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass5'), depth: 40, baseRotate: -20, floatAmp: 7, floatSpeed: 0.0035, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass6'), depth: 50, baseRotate: 10, floatAmp: 9, floatSpeed: 0.0028, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass7'), depth: 30, baseRotate: -50, floatAmp: 5, floatSpeed: 0.0032, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass8'), depth: 30, baseRotate: -5, floatAmp: 8, floatSpeed: 0.002, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass9'), depth: 50, baseRotate: -10, floatAmp: 12, floatSpeed: 0.003, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass10'), depth: 70, baseRotate: -15, floatAmp: 6, floatSpeed: 0.004, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass11'), depth: 90, baseRotate: 30, floatAmp: 10, floatSpeed: 0.0025, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass12'), depth: 40, baseRotate: -20, floatAmp: 7, floatSpeed: 0.0035, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass13'), depth: 50, baseRotate: 10, floatAmp: 9, floatSpeed: 0.0028, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass14'), depth: 30, baseRotate: -50, floatAmp: 5, floatSpeed: 0.0032, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass15'), depth: 70, baseRotate: -15, floatAmp: 6, floatSpeed: 0.004, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass16'), depth: 90, baseRotate: 30, floatAmp: 10, floatSpeed: 0.0025, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass17'), depth: 40, baseRotate: -20, floatAmp: 7, floatSpeed: 0.0035, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass18'), depth: 50, baseRotate: 10, floatAmp: 9, floatSpeed: 0.0028, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass19'), depth: 30, baseRotate: -50, floatAmp: 5, floatSpeed: 0.0032, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass20'), depth: 30, baseRotate: -50, floatAmp: 5, floatSpeed: 0.0032, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass21'), depth: 70, baseRotate: -15, floatAmp: 6, floatSpeed: 0.004, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass22'), depth: 90, baseRotate: 30, floatAmp: 10, floatSpeed: 0.0025, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass23'), depth: 40, baseRotate: -20, floatAmp: 7, floatSpeed: 0.0035, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass24'), depth: 50, baseRotate: 10, floatAmp: 9, floatSpeed: 0.0028, floatPhase: Math.random() * 1000 },
  { el: document.querySelector('.img-glass25'), depth: 30, baseRotate: -50, floatAmp: 5, floatSpeed: 0.0032, floatPhase: Math.random() * 1000 },
];

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
const friction = 0.05;
let time = 0;

window.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  targetX = -x;
  targetY = -y;
});

function animate() {
  currentX += (targetX - currentX) * friction;
  currentY += (targetY - currentY) * friction;

  time += 1;

  glasses.forEach(glass => {
    const moveX = currentX * glass.depth;
    const moveY = currentY * glass.depth + Math.sin(time * glass.floatSpeed + glass.floatPhase) * glass.floatAmp;

    const rotateDeg = glass.baseRotate + currentX * 15 + Math.sin(time * glass.floatSpeed + glass.floatPhase) * 5;
    glass.el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotateDeg}deg)`;
  });

  requestAnimationFrame(animate);
}

animate();

(function () {
  const carousel = document.querySelector('.feedback-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.feedback-track');
  if (!track) return;

  const speedPxPerSecond = 25;
  const minOpacity = 0.06;

  function imagesLoaded(el) {
    const imgs = Array.from(el.querySelectorAll('img'));
    if (imgs.length === 0) return Promise.resolve();
    return new Promise(resolve => {
      let loaded = 0;
      imgs.forEach(img => {
        if (img.complete) {
          loaded++;
          if (loaded === imgs.length) resolve();
        } else {
          img.addEventListener('load', () => {
            loaded++; if (loaded === imgs.length) resolve();
          }, { once: true });
          img.addEventListener('error', () => {
            loaded++; if (loaded === imgs.length) resolve();
          }, { once: true });
        }
      });
    });
  }

  imagesLoaded(track).then(initCarousel);

  function initCarousel() {
    const originalCards = Array.from(track.children);
    track.innerHTML += track.innerHTML;
    const cards = Array.from(track.children);
    const gapPx = parseFloat(getComputedStyle(track).gap) || 20;
    let singleLoopWidth = 0;
    originalCards.forEach((c, i) => {
      singleLoopWidth += c.offsetWidth;
    });
    singleLoopWidth += gapPx * Math.max(0, originalCards.length - 1);

    const thresholdList = [];
    for (let i = 0; i <= 100; i++) thresholdList.push(i / 100);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const card = entry.target;
        const ratio = entry.intersectionRatio;
        const opacity = Math.max(minOpacity, Math.min(1, ratio));
        card.style.opacity = String(opacity);
      });
    }, {
      root: carousel,
      threshold: thresholdList
    });

    cards.forEach(c => {
      c.setAttribute('aria-hidden', 'false');
      observer.observe(c);
    });

    let pos = 0;
    let lastTime = performance.now();
    const speedPerMs = speedPxPerSecond / 1000;
    let isPaused = false;

    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; });

    function frame(now) {
      const dt = now - lastTime;
      lastTime = now;

      if (!isPaused) {
        pos += speedPerMs * dt;

        if (pos >= singleLoopWidth) {
          pos -= singleLoopWidth;
        }
        track.style.transform = `translateX(${-pos}px)`;
      }

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        let newWidth = 0;
        originalCards.forEach(c => newWidth += c.offsetWidth);
        singleLoopWidth = newWidth + gapPx * Math.max(0, originalCards.length - 1);
      }, 150);
    });
  }
})();

const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === "") {
    alert("Digite algo para pesquisar!");
    return;
  }

  const cards = document.querySelectorAll(".shop");
  let found = false;
  cards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!found) alert("Nenhum produto encontrado!");
}

searchIcon.addEventListener("click", performSearch);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") performSearch();
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    const cards = document.querySelectorAll(".shop");
    cards.forEach(card => card.style.display = "block");
  }
});



document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".shop");
    const name = card.querySelector("h2").textContent;
    const imgSrc = card.querySelector("img").src;
    const price = parseFloat(card.querySelector(".new-price").textContent.replace("R$", "").replace(",", ".").trim());
    const qty = parseInt(card.querySelector(".quantity-btn").textContent);

    const cartItems = document.querySelector(".cart-items");

    let existing = Array.from(cartItems.querySelectorAll(".cart-item")).find(item =>
      item.querySelector("h5").textContent === name
    );

    if (existing) {
      const input = existing.querySelector("input");
      input.value = parseInt(input.value) + qty;
    } else {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <a href="#" class="cart-item-link">
          <img src="${imgSrc}" alt="${name}">
        </a>
        <div class="cart-item-info">
          <a href="#"><h5>${name}</h5></a>
          <p class="price" data-price="${price}">R$ ${price.toFixed(2).replace(".", ",")}</p>
          <div class="quantity">
            <button class="qty-btn">-</button>
            <input type="number" value="${qty}" min="1">
            <button class="qty-btn">+</button>
          </div>
        </div>
        <button class="remove-item">✖</button>
      `;
      cartItems.appendChild(div);

      div.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const input = e.target.parentElement.querySelector('input');
          let value = parseInt(input.value);
          if (e.target.textContent.trim() === "+") input.value = value + 1;
          else if (e.target.textContent.trim() === "-" && value > 1) input.value = value - 1;
          updateTotal();
        });
      });
      div.querySelector('.remove-item').addEventListener('click', () => {
        div.remove();
        updateTotal();
      });
    }

    updateTotal();
    cartPopup.classList.add('active');
  });
});

const FORM_ENDPOINT = '';

const $ = (sel) => document.querySelector(sel);
const formatPhoneForTel = (s) => s.replace(/[^\d+]/g, '');

const copyPhoneBtn = $('#copyPhone');
if (copyPhoneBtn) {
  copyPhoneBtn.addEventListener('click', async () => {
    try {
      const telLink = document.querySelector('.contact-link[href^="tel:"]');
      const tel = telLink ? telLink.textContent.trim() : '+55 53 9999 9999';
      await navigator.clipboard.writeText(tel);
      copyPhoneBtn.textContent = 'Copiado';
      setTimeout(() => copyPhoneBtn.textContent = 'Copiar', 1500);
    } catch (e) {
      copyPhoneBtn.textContent = 'Erro';
      setTimeout(() => copyPhoneBtn.textContent = 'Copiar', 1500);
    }
  });
}

const presetSelect = $('#presetSelect');
const quickNote = $('#quickNote');
const applyBtn = $('#applyTemplate');
applyBtn.addEventListener('click', () => {
  const preset = presetSelect.value;
  const note = quickNote.value.trim();
  const subjectInput = $('#subject');
  const messageInput = $('#message');
  if (preset === 'orçamento') {
    subjectInput.value = 'Solicitação de Orçamento — Site Institucional';
    messageInput.value = `Olá!\n\nGostaria de receber um orçamento para um site institucional.\n\nInformações adicionais:\n${note || '-'}\n\nObrigado.`;
  } else if (preset === 'ecommerce') {
    subjectInput.value = 'Solicitação — Loja Virtual / WooCommerce';
    messageInput.value = `Olá!\n\nTenho interesse em desenvolver/integrar uma loja virtual com WooCommerce.\n\nDetalhes:\n${note || '-'}\n\nAguardo contato.`;
  } else if (preset === 'parceria') {
    subjectInput.value = 'Proposta de Parceria';
    messageInput.value = `Olá!\n\nTenho uma proposta de parceria e gostaria de conversar.\n\nResumo:\n${note || '-'}\n\nAtenciosamente.`;
  } else if (preset === 'suporte') {
    subjectInput.value = 'Suporte Técnico — Pedido/Checkout';
    messageInput.value = `Olá!\n\nPreciso de suporte técnico. Detalhes do problema:\n${note || '-'}\n\nID / Pedido: (se aplicável)\n`;
  } else {
    if (note) messageInput.value = note;
  }
  $('#name').focus();
});

const form = $('#contactForm');
const submitBtn = $('#submitBtn');
const statusEl = $('#formStatus');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  if (!data.name || !data.email || !data.subject || !data.message) {
    statusEl.textContent = 'Por favor preencha os campos obrigatórios (nome, e-mail, assunto e mensagem).';
    return;
  }

  submitBtn.disabled = true;
  const oldText = submitBtn.textContent;
  submitBtn.textContent = 'Enviando...';
  statusEl.textContent = '';

  let sent = false;
  if (FORM_ENDPOINT) {
    try {
      const resp = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (resp.ok) {
        sent = true;
        statusEl.textContent = 'Mensagem enviada com sucesso! Obrigado.';
        form.reset();
      } else {
        const text = await resp.text();
        console.warn('endpoint error', resp.status, text);
      }
    } catch (err) {
      console.warn('Erro ao enviar para endpoint:', err);
    }
  }

  if (!sent) {
    try {
      const mailTo = 'teuemail@mail.com';
      const subject = encodeURIComponent(data.subject);
      const bodyLines = [
        `Nome: ${data.name}`,
        `Telefone: ${data.phone}`,
        `E-mail do remetente: ${data.email}`,
        '',
        'Mensagem:',
        data.message
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
      statusEl.textContent = 'Abrindo seu cliente de e-mail...';
      form.reset();
    } catch (e) {
      statusEl.textContent = 'Não foi possível abrir o cliente de e-mail automaticamente. Copie e envie manualmente.';
    }
  }

  submitBtn.disabled = false;
  submitBtn.textContent = oldText;
});

const contactFrom = $('#contactFrom');
contactFrom.addEventListener && contactFrom.addEventListener('input', (e) => {
  $('#email').value = e.target.value;
});

(function () {
  const segmentToSection = {
    canecas: 'mug',
    roupas: 'clothes',
    garrafas: 'bottles',
    misc: 'misc',
  };

  const icons = document.querySelectorAll('.icons-section .icon');
  const filterSections = document.querySelectorAll('.filter-section');
  const hero = document.querySelector('.hero');
  const home = document.querySelector('.home-page');
  const contact = document.querySelector('.contact-section');
  const backBtns = document.querySelectorAll('.back-btn');

  const menuLinks = {
    inicio: document.querySelector('.menu-inicio a'),
    sobre: document.querySelector('.menu-sobre a'),
    promocoes: document.querySelector('.menu-promocoes a'),
    contato: document.querySelector('.menu-contato a'),
    logo: document.querySelector('.logo-home a')
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

  function hideMainForFilter() {
    if (hero) hero.classList.add('hidden-by-filter');
    if (home) home.classList.add('hidden-by-filter');
  }

  function restoreMain() {
    if (hero) hero.classList.remove('hidden-by-filter');
    if (home) home.classList.remove('hidden-by-filter');
  }

  function closeAllFilters() {
    filterSections.forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-hidden', 'true');
    });
  }

  function goToSection(sectionEl) {
    if (!sectionEl) return;
    closeAllFilters();
    restoreMain();
    if (!sectionEl.hasAttribute('tabindex')) {
      sectionEl.setAttribute('tabindex', '-1');
    }

    requestAnimationFrame(() => {
      try {
        sectionEl.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      } catch (e) {
        window.scrollTo({ top: sectionEl.offsetTop, behavior: scrollBehavior });
      }
      sectionEl.focus({ preventScroll: true });
    });
  }

  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      const segment = icon.dataset.segment;
      const short = segmentToSection[segment] || segment;
      const selector = `.section-${short}`;
      const targetSection = document.querySelector(selector);
      if (!targetSection) return;

      hideMainForFilter();
      closeAllFilters();

      targetSection.classList.add('active');
      targetSection.setAttribute('aria-hidden', 'false');

      if (!targetSection.hasAttribute('tabindex')) {
        targetSection.setAttribute('tabindex', '-1');
      }

      requestAnimationFrame(() => {
        try {
          targetSection.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        } catch (e) {
          window.scrollTo({ top: targetSection.offsetTop, behavior: scrollBehavior });
        }
        targetSection.focus({ preventScroll: true });
      });
      AOS.refresh();
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const about = document.querySelector('.about-section');
      if (about) {
        about.classList.remove('active');
        about.setAttribute('aria-hidden', 'true');
      }

      restoreMain();

      setTimeout(() => {
        goToSection(hero);
      }, 10);
    });
  });
  

  function closeAbout() {
    const about = document.querySelector('.about-section');
    if (about) {
      about.classList.remove('active');
      about.setAttribute('aria-hidden', 'true');
    }
  }

  if (menuLinks.logo) {
    menuLinks.logo.addEventListener('click', (e) => {
      e.preventDefault();
      closeAbout();
      restoreMain();
      goToSection(hero);
    });
  }

  if (menuLinks.inicio) {
    menuLinks.inicio.addEventListener('click', (e) => {
      e.preventDefault();
      closeAbout();
      restoreMain();
      goToSection(hero);
    });
  }

  if (menuLinks.sobre) {
    menuLinks.sobre.addEventListener('click', (e) => {
      e.preventDefault();

      const about = document.querySelector('.about-section');
      if (!about) return;

      if (hero) hero.classList.add('hidden-by-filter');
      if (home) home.classList.add('hidden-by-filter');

      closeAllFilters();

      about.classList.add('active');
      about.setAttribute('aria-hidden', 'false');

      if (!about.hasAttribute('tabindex')) {
        about.setAttribute('tabindex', '-1');
      }

      setTimeout(() => {
        try {
          about.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        } catch (e) {
          window.scrollTo({ top: about.offsetTop, behavior: scrollBehavior });
        }
        about.focus({ preventScroll: true });
      }, 100);
      AOS.refresh();
    });
  }

  if (menuLinks.promocoes) {
    menuLinks.promocoes.addEventListener('click', (e) => {
      e.preventDefault();
      closeAbout();
      const promotions = document.querySelector('.promotions-section');
      goToSection(promotions);
    });
  }
  if (menuLinks.contato) {
    menuLinks.contato.addEventListener('click', (e) => {
      e.preventDefault();
      closeAbout();
      goToSection(contact);
    });
  }

})();

