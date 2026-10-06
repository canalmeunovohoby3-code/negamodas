/* =============================================================================
   NEGA MODAS — LOJA (carrinho, vitrines, filtros e WhatsApp)
   Depende de assets/js/data.js carregado antes.
   ============================================================================= */
(function () {
  'use strict';

  var SITE = window.NEGA.SITE;
  var CATEGORIES = window.NEGA.CATEGORIES;
  var COLLECTIONS = window.NEGA.COLLECTIONS;

  var PRODUTOS = (window.NEGA.PRODUCTS && window.NEGA.PRODUCTS.length)
    ? window.NEGA.PRODUCTS
    : window.NEGA.DEMO_PRODUCTS;

  var CART_KEY = 'nega_modas_cart_v1';

  /* --------------------------------------------------------------- Ícones */
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>';

  var ICON = {
    whatsapp: WA_SVG,
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2.5 3.5 6.5v13a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-13L18 2.5Z"/><path d="M3.5 6.5h17"/><path d="M15.5 10a3.5 3.5 0 0 1-7 0"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 20s-7-4.6-9.3-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.3 11C19 15.4 12 20 12 20Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>',
    chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 22s7-6.1 7-11.4A7 7 0 0 0 5 10.6C5 15.9 12 22 12 22Z"/><circle cx="12" cy="10.5" r="2.6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9Z"/><circle cx="7.5" cy="7.5" r="1.4"/></svg>'
  };

  /* --------------------------------------------------------------- Helpers */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function fmt(v) { if (v == null || isNaN(v)) return null; return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v)); }
  function precoDe(p) { return (p.salePrice != null && p.salePrice !== '') ? p.salePrice : p.price; }
  function emPromo(p) { return p.salePrice != null && p.salePrice !== ''; }
  function temPreco(p) { return p.price != null || emPromo(p); }
  function slugify(t) { return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
  function getParam(n) { return new URLSearchParams(location.search).get(n); }
  function categoriaNome(s) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].slug === s) return CATEGORIES[i].name;
    for (var j = 0; j < COLLECTIONS.length; j++) if (COLLECTIONS[j].slug === s) return COLLECTIONS[j].name;
    return s;
  }
  function grupoDe(slug) { for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].slug === slug) return CATEGORIES[i].group; return ''; }
  function corHex(n) {
    var m = { 'preto': '#16130f', 'branco': '#f2ede6', 'off white': '#ece6dc', 'off-white': '#ece6dc', 'vermelho': '#b0112b', 'vinho': '#5c1220', 'rose': '#e3b7ad', 'rosê': '#e3b7ad', 'dourado': '#b9945a', 'nude': '#e6cdbf', 'bege': '#ddccb8', 'marrom': '#6b4a34', 'cinza': '#9a948c', 'grafite': '#3a3a3a', 'azul': '#2f4a72', 'azul-marinho': '#1f2f4d', 'azul marinho': '#1f2f4d', 'verde': '#3f6b4a', 'amarelo': '#d9b53b', 'lilas': '#cbb6d6', 'lilás': '#cbb6d6', 'roxo': '#5b3d78', 'laranja': '#d97a3b', 'caramelo': '#b07a4a', 'creme': '#f2e7d5', 'prata': '#c8c8c8', 'animal print': '#b79b7a' };
    return m[slugify(n)] || '#d9cfc4';
  }
  function acharProduto(id) { for (var i = 0; i < PRODUTOS.length; i++) if (PRODUTOS[i].id === id) return PRODUTOS[i]; return null; }
  function ativos() { return PRODUTOS.filter(function (p) { return p.active !== false; }); }
  function imagemProduto(p, i) { if (p.images && p.images[i]) return p.images[i]; return ''; }

  /* --------------------------------------------------------------- Mídia */
  /* Imagem temporária exibida enquanto os produtos não têm foto cadastrada.
     Para trocar, basta enviar as fotos reais em assets/img e preencher "images". */
  var PLACEHOLDER_IMG = 'assets/img/produto-placeholder.jpg';

  function mediaHTML(src, alt, label) {
    if (src) return '<img src="' + esc(src) + '" alt="' + esc(alt || label) + '" loading="lazy" decoding="async">';
    return '<div class="placeholder-media" data-label="' + esc(label || 'Foto em breve') + '" role="img" aria-label="' + esc(alt || label || 'Imagem') + '">' + ICON.image + '</div>';
  }
  function imgHTML(src, alt) {
    return '<img src="' + esc(src || PLACEHOLDER_IMG) + '" alt="' + esc(alt || 'Produto Nega Modas') + '" loading="lazy" decoding="async">';
  }

  /* --------------------------------------------------------------- Toast */
  function toast(msg, tipo) {
    var wrap = $('#toastWrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toastWrap'; wrap.className = 'toast-wrap'; wrap.setAttribute('aria-live', 'polite'); document.body.appendChild(wrap); }
    var el = document.createElement('div');
    el.className = 'toast' + (tipo === 'info' ? ' toast--info' : '');
    el.innerHTML = (tipo === 'info' ? ICON.heart : ICON.check) + '<span>' + esc(msg) + '</span>';
    wrap.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-show'); });
    setTimeout(function () { el.classList.remove('is-show'); setTimeout(function () { el.remove(); }, 350); }, 2600);
  }

  /* --------------------------------------------------------------- Carrinho */
  function lerCarrinho() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function salvarCarrinho(itens) { try { localStorage.setItem(CART_KEY, JSON.stringify(itens)); } catch (e) {} atualizarBadge(); renderCarrinho(); }
  function chaveItem(id, size, color) { return id + '|' + (size || '') + '|' + (color || ''); }

  function addAoCarrinho(produto, qtd, size, color) {
    qtd = Math.max(1, parseInt(qtd, 10) || 1);
    var itens = lerCarrinho(), k = chaveItem(produto.id, size, color), achou = false;
    for (var i = 0; i < itens.length; i++) if (chaveItem(itens[i].id, itens[i].size, itens[i].color) === k) { itens[i].qty += qtd; achou = true; break; }
    if (!achou) itens.push({ id: produto.id, name: produto.name, category: produto.category, image: imagemProduto(produto, 0), price: produto.price != null ? produto.price : null, salePrice: produto.salePrice != null ? produto.salePrice : null, size: size || '', color: color || '', qty: qtd });
    salvarCarrinho(itens); bumpBadge(); toast('Produto adicionado ao carrinho');
  }
  function alterarQtd(id, size, color, d) {
    var itens = lerCarrinho(), k = chaveItem(id, size, color);
    for (var i = 0; i < itens.length; i++) if (chaveItem(itens[i].id, itens[i].size, itens[i].color) === k) { itens[i].qty = Math.max(1, itens[i].qty + d); break; }
    salvarCarrinho(itens);
  }
  function removerItem(id, size, color) {
    var k = chaveItem(id, size, color);
    salvarCarrinho(lerCarrinho().filter(function (it) { return chaveItem(it.id, it.size, it.color) !== k; }));
    toast('Produto removido do carrinho', 'info');
  }
  function limparCarrinho() { salvarCarrinho([]); toast('Carrinho esvaziado', 'info'); }
  function contarItens() { return lerCarrinho().reduce(function (s, it) { return s + it.qty; }, 0); }
  function subtotal() {
    var itens = lerCarrinho(), total = 0, pendente = false;
    itens.forEach(function (it) { var pr = (it.salePrice != null && it.salePrice !== '') ? it.salePrice : it.price; if (pr == null || pr === '') { pendente = true; return; } total += Number(pr) * it.qty; });
    return { total: total, pendente: pendente };
  }
  function atualizarBadge() {
    var n = contarItens();
    $$('.cart-count').forEach(function (el) { el.textContent = n > 99 ? '99+' : n; el.classList.toggle('is-visible', n > 0); });
  }
  function bumpBadge() { $$('.cart-count').forEach(function (el) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }); }

  /* --------------------------------------------------------------- WhatsApp */
  function waLink(msg) { return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(msg); }
  function abrirWhatsApp(msg) { window.open(waLink(msg), '_blank', 'noopener'); }
  function msgProduto(p, qtd, size, color) {
    var l = ['Olá! Tenho interesse neste produto da Nega Modas:', '', 'Produto: ' + p.name];
    l.push('Quantidade: ' + (qtd || 1));
    if (size) l.push('Tamanho: ' + size);
    if (color) l.push('Cor: ' + color);
    l.push(temPreco(p) ? 'Valor: ' + fmt(precoDe(p)) : 'Valor: a consultar');
    l.push('', 'Poderia me passar mais informações?');
    return l.join('\n');
  }
  function msgPedido() {
    var itens = lerCarrinho();
    var l = ['Olá! Gostaria de fazer um pedido na Nega Modas.', '', 'Produtos:'];
    itens.forEach(function (it) {
      var extra = [];
      if (it.size) extra.push('Tamanho: ' + it.size);
      if (it.color) extra.push('Cor: ' + it.color);
      var pr = (it.salePrice != null && it.salePrice !== '') ? it.salePrice : it.price;
      l.push('• ' + it.name + ' — ' + it.qty + (it.qty > 1 ? ' unidades' : ' unidade') + (temPrecoItem(it) ? ' — ' + fmt(pr) : ''));
      extra.forEach(function (e) { l.push('   ' + e); });
    });
    var s = subtotal();
    l.push('');
    l.push(s.pendente ? 'Total: a consultar' : 'Total: ' + fmt(s.total));
    l.push('', 'Gostaria de confirmar a disponibilidade.');
    return l.join('\n');
  }
  function temPrecoItem(it) { var pr = (it.salePrice != null && it.salePrice !== '') ? it.salePrice : it.price; return pr != null && pr !== ''; }

  /* --------------------------------------------------------------- Card */
  function badgesHTML(p) {
    var b = '';
    if (emPromo(p)) b += '<span class="badge badge--sale">Promoção</span>';
    if (p.isNew) b += '<span class="badge badge--new">Novo</span>';
    if (!temPreco(p)) b += '<span class="badge badge--soon">Sob consulta</span>';
    return b ? '<div class="card__badges">' + b + '</div>' : '';
  }
  function precoHTML(p) {
    if (!temPreco(p)) return '<span class="price price--soon">Preço sob consulta</span>';
    if (emPromo(p)) { var old = (p.price != null && p.price !== '') ? '<span class="price price--old">' + fmt(p.price) + '</span>' : ''; return old + '<span class="price price--sale">' + fmt(p.salePrice) + '</span>'; }
    return '<span class="price">' + fmt(p.price) + '</span>';
  }
  function swatchesHTML(p) {
    if (!p.colors || !p.colors.length) return '';
    var max = 4, extra = p.colors.length - max;
    var html = p.colors.slice(0, max).map(function (c) { return '<i style="background:' + corHex(c) + '" title="' + esc(c) + '"></i>'; }).join('');
    return '<div class="card__swatches">' + html + (extra > 0 ? '<span>+' + extra + '</span>' : '') + '</div>';
  }
  function cardHTML(p) {
    var url = 'produto.html?id=' + encodeURIComponent(p.id);
    var label = categoriaNome(p.category) || 'Peça';
    var alt = imagemProduto(p, 1);
    var imgsHTML = imgHTML(imagemProduto(p, 0), p.name) + (alt ? '<img class="card__img--alt" src="' + esc(alt) + '" alt="" loading="lazy" decoding="async">' : '');
    return '<article class="card" data-reveal-item>' +
      '<a class="card__media" href="' + url + '" aria-label="' + esc(p.name) + '">' + badgesHTML(p) + imgsHTML + '</a>' +
      '<div class="card__body">' +
        '<div class="card__cat">' + esc(label) + '</div>' +
        '<h3 class="card__name"><a href="' + url + '">' + esc(p.name) + '</a></h3>' +
        swatchesHTML(p) +
        '<div class="card__price">' + precoHTML(p) + '</div>' +
        '<div class="card__actions">' +
          '<button class="btn btn--sm" type="button" data-add-quick>' + ICON.bag + ' Adicionar</button>' +
          '<a class="btn btn--sm btn--wa" href="' + waLink(msgProduto(p, 1, '', '')) + '" target="_blank" rel="noopener" aria-label="Comprar ' + esc(p.name) + ' pelo WhatsApp" onclick="event.stopPropagation()">' + ICON.whatsapp + '</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* --------------------------------------------------------------- Reveal */
  var observer = null;
  function revelarItens(container) {
    var els = $$('[data-reveal-item]', container);
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-visible'); }); return; }
    if (!observer) observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          var idx = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
          el.style.transitionDelay = Math.min(idx, 6) * 55 + 'ms';
          el.classList.add('is-visible'); observer.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    els.forEach(function (e) { observer.observe(e); });
  }
  function initRevealGlobal() {
    var els = $$('[data-reveal], [data-reveal-stagger]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-visible'); }); return; }
    var o = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); o.unobserve(en.target); } }); }, { rootMargin: '0px 0px -5% 0px', threshold: 0.08 });
    els.forEach(function (e) { o.observe(e); });
  }

  function bindQuickAdd(container) {
    $$('[data-add-quick]', container).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var card = btn.closest('.card');
        var link = card ? card.querySelector('.card__name a') : null;
        if (!link) return;
        var id = decodeURIComponent(link.getAttribute('href').split('id=')[1]);
        var p = acharProduto(id);
        if (p) addAoCarrinho(p, 1, '', '');
      });
    });
  }

  /* --------------------------------------------------------------- Grades e carrosséis */
  function renderGrade(container, lista, opcoes) {
    opcoes = opcoes || {};
    if (!lista.length) {
      container.innerHTML = '<div class="empty-state"><h3>Nenhuma peça por aqui ainda</h3><p>' + esc(opcoes.vazio || 'Assim que as peças forem cadastradas, elas aparecem automaticamente nesta vitrine.') + '</p><a class="btn btn--wa" href="' + waLink('Olá! Gostaria de ver as novidades da Nega Modas.') + '" target="_blank" rel="noopener">' + ICON.whatsapp + ' Falar no WhatsApp</a></div>';
      return;
    }
    container.innerHTML = lista.map(cardHTML).join('');
    bindQuickAdd(container);
    revelarItens(container);
  }

  function renderCarrossel(mount, lista) {
    mount.innerHTML = '<div class="carousel">' +
      '<div class="carousel__track" data-track>' + lista.map(cardHTML).join('') + '</div>' +
      '<button class="carousel__arrow carousel__arrow--prev" type="button" data-nav="-1" aria-label="Anterior">' + ICON.chevL + '</button>' +
      '<button class="carousel__arrow carousel__arrow--next" type="button" data-nav="1" aria-label="Próximo">' + ICON.chevR + '</button>' +
      '</div>';
    bindQuickAdd(mount);
    initNavCarrossel(mount);
    revelarItens(mount);
  }
  function initNavCarrossel(mount) {
    var track = $('[data-track]', mount);
    if (!track) return;
    var prev = $('[data-nav="-1"]', mount), next = $('[data-nav="1"]', mount);
    function passo() { var c = track.querySelector('.card'); return c ? c.offsetWidth + 16 : 300; }
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -passo(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: passo(), behavior: 'smooth' }); });
    function estado() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    track.addEventListener('scroll', estado, { passive: true });
    setTimeout(estado, 60);
  }

  /* --------------------------------------------------------------- Vitrines da Home */
  function initVitrines() {
    if (!$('[data-vitrine]') && !$('[data-bloco]')) return;

    var A = ativos();
    function setBloco(mount, lista) {
      var bloco = mount.closest('[data-bloco]');
      if (!lista.length) { if (bloco) bloco.style.display = 'none'; return false; }
      if (bloco) bloco.style.display = '';
      return true;
    }

    var def = [
      { id: 'vitrineNovidades', get: function () { return A.filter(function (p) { return p.isNew; }); } },
      { id: 'vitrineDestaques', get: function () { return A.filter(function (p) { return p.featured; }); } },
      { id: 'vitrineFeminino', get: function () { return A.filter(function (p) { return grupoDe(p.category) === 'feminino'; }); } },
      { id: 'vitrineMasculino', get: function () { return A.filter(function (p) { return grupoDe(p.category) === 'masculino'; }); } },
      { id: 'vitrineEvangelica', get: function () { return A.filter(function (p) { return p.category === 'moda-evangelica-feminina' || p.category === 'moda-evangelica-masculina'; }); } },
      { id: 'vitrinePlus', get: function () { return A.filter(function (p) { return p.category === 'plus-size-feminino' || p.category === 'plus-size-masculino'; }); } },
      { id: 'vitrinePromocoes', get: function () { return A.filter(function (p) { return emPromo(p); }); } },
      { id: 'vitrineMaisVendidos', get: function () { return A.filter(function (p) { return p.bestSeller; }); } }
    ];
    def.forEach(function (d) {
      var mount = document.getElementById(d.id);
      if (!mount) return;
      var lista = d.get();
      if (!setBloco(mount, lista)) return;
      renderCarrossel(mount, lista.slice(0, 12));
    });

    // Navegue por categoria
    var tiles = $('#catTiles');
    if (tiles) {
      var feat = CATEGORIES.filter(function (c) { return c.featured; });
      tiles.innerHTML = feat.map(function (c) {
        var count = A.filter(function (p) { return p.category === c.slug; }).length;
        var sub = c.highlight ? 'Plus Size' : (c.group === 'feminino' ? 'Feminino' : 'Masculino');
        return '<a class="cat-tile" href="loja.html?categoria=' + c.slug + '">' +
          '<div class="cat-tile__media">' + imgHTML('', c.name) + '</div>' +
          '<span class="cat-tile__label"><small>' + esc(sub) + (count ? ' · ' + count : '') + '</small>' + esc(c.name) + '</span>' +
        '</a>';
      }).join('');
    }
  }

  /* --------------------------------------------------------------- Shop nav (todas as páginas) */
  function construirShopNav() {
    var nav = $('#shopNav');
    if (!nav) return;
    var fem = CATEGORIES.filter(function (c) { return c.group === 'feminino'; });
    var masc = CATEGORIES.filter(function (c) { return c.group === 'masculino'; });
    function links(arr) { return arr.map(function (c) { return '<a href="loja.html?categoria=' + c.slug + '"' + (c.highlight ? ' class="is-sale"' : '') + '>' + esc(c.name) + '</a>'; }).join(''); }
    nav.innerHTML =
      '<a href="loja.html?colecao=novidades">Novidades</a>' +
      '<a href="loja.html?colecao=promocoes" class="is-sale">Promoções</a>' +
      '<span class="shopnav__sep" aria-hidden="true"></span>' +
      links(fem) +
      '<span class="shopnav__sep" aria-hidden="true"></span>' +
      links(masc) +
      '<span class="shopnav__sep" aria-hidden="true"></span>' +
      '<a href="loja.html?categoria=plus-size-feminino">Plus Size Fem.</a>' +
      '<a href="loja.html?categoria=plus-size-masculino">Plus Size Masc.</a>';
  }

  /* --------------------------------------------------------------- Header / menus / busca */
  function construirMenus() {
    var fem = CATEGORIES.filter(function (c) { return c.group === 'feminino'; });
    var masc = CATEGORIES.filter(function (c) { return c.group === 'masculino'; });
    function lst(arr) { return arr.map(function (c) { return '<a href="loja.html?categoria=' + c.slug + '"' + (c.highlight ? ' class="is-highlight"' : '') + '>' + esc(c.name) + '</a>'; }).join(''); }
    var mega = $('#megaMenu');
    if (mega) mega.innerHTML =
      '<div class="mega__inner">' +
        '<div class="mega__col"><h3><a href="loja.html?grupo=feminino">Feminino</a></h3><div class="mega__list">' + lst(fem) + '</div></div>' +
        '<div class="mega__col"><h3><a href="loja.html?grupo=masculino">Masculino</a></h3><div class="mega__list">' + lst(masc) + '</div></div>' +
        '<div class="mega__promo"><span class="kicker">Coleções</span><h4>Novidades, lançamentos e promoções</h4>' +
        '<p>Acompanhe as peças que chegam na loja e as condições do momento.</p>' +
        '<div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">' +
        '<a class="btn btn--sm" href="loja.html?colecao=novidades">Ver novidades</a>' +
        '<a class="btn btn--sm btn--ghost" href="loja.html?colecao=promocoes">Promoções</a></div></div>' +
      '</div>';
    var mm = $('#mobileMenuBody');
    if (mm) mm.innerHTML =
      '<div class="mnav__group is-open"><button class="mnav__toggle" type="button" aria-expanded="true">Feminino ' + ICON.chevR + '</button><div class="mnav__panel" style="max-height:900px"><ul>' + lst(fem) + '</ul></div></div>' +
      '<div class="mnav__group"><button class="mnav__toggle" type="button" aria-expanded="false">Masculino ' + ICON.chevR + '</button><div class="mnav__panel"><ul>' + lst(masc) + '</ul></div></div>' +
      '<a class="mnav__single" href="loja.html?colecao=novidades">Novidades</a>' +
      '<a class="mnav__single" href="loja.html?colecao=lancamentos">Lançamentos</a>' +
      '<a class="mnav__single" href="loja.html?colecao=promocoes">Promoções</a>' +
      '<a class="mnav__single" href="loja.html">Ver toda a loja</a>' +
      '<a class="mnav__single" href="index.html#sobre">Sobre a Nega Modas</a>';
  }

  function initHeader() {
    var header = $('#header');
    if (header) { var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); }; window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); }

    var gatilho = $('#megaTrigger'), mega = $('#megaMenu');
    if (gatilho && mega) {
      var t;
      var abrir = function () { clearTimeout(t); mega.classList.add('is-open'); gatilho.setAttribute('aria-expanded', 'true'); };
      var fechar = function () { mega.classList.remove('is-open'); gatilho.setAttribute('aria-expanded', 'false'); };
      gatilho.addEventListener('mouseenter', abrir); gatilho.addEventListener('focus', abrir);
      gatilho.addEventListener('click', function (e) { e.preventDefault(); mega.classList.contains('is-open') ? fechar() : abrir(); });
      gatilho.addEventListener('mouseleave', function () { t = setTimeout(fechar, 180); });
      mega.addEventListener('mouseenter', abrir); mega.addEventListener('mouseleave', function () { t = setTimeout(fechar, 180); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
    }

    var mMenu = $('#mobileMenu');
    var abrirMenu = function () { mMenu.classList.add('is-open'); document.body.classList.add('no-scroll'); };
    var fecharMenu = function () { mMenu.classList.remove('is-open'); document.body.classList.remove('no-scroll'); };
    ['#burger', '#burgerMobile'].forEach(function (s) { var b = $(s); if (b) b.addEventListener('click', abrirMenu); });
    $$('[data-close-menu]').forEach(function (b) { b.addEventListener('click', fecharMenu); });
    $$('.mnav__toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grupo = btn.closest('.mnav__group'), painel = grupo.querySelector('.mnav__panel');
        var aberto = grupo.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        painel.style.maxHeight = aberto ? (painel.scrollHeight + 40) + 'px' : '0px';
      });
      var g0 = btn.closest('.mnav__group');
      if (g0.classList.contains('is-open')) { var p0 = g0.querySelector('.mnav__panel'); p0.style.maxHeight = (p0.scrollHeight + 40) + 'px'; }
    });

    var overlay = $('#searchOverlay');
    if (overlay) {
      var abrirBusca = function () { overlay.classList.add('is-open'); setTimeout(function () { var i = $('#searchInput'); if (i) i.focus(); }, 60); };
      var fecharBusca = function () { overlay.classList.remove('is-open'); };
      $$('[data-open-search]').forEach(function (b) { b.addEventListener('click', abrirBusca); });
      overlay.addEventListener('click', function (e) { if (e.target === overlay) fecharBusca(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharBusca(); });
      var form = $('#searchForm');
      if (form) form.addEventListener('submit', function (e) { e.preventDefault(); var q = $('#searchInput').value.trim(); location.href = 'loja.html' + (q ? '?q=' + encodeURIComponent(q) : ''); });
      $$('[data-search-chip]').forEach(function (c) { c.addEventListener('click', function () { location.href = 'loja.html?categoria=' + c.getAttribute('data-search-chip'); }); });
    }

    var drawer = $('#cartDrawer');
    var abrirCart = function () { renderCarrinho(); if (drawer) { drawer.classList.add('is-open'); document.body.classList.add('no-scroll'); } };
    var fecharCart = function () { if (drawer) { drawer.classList.remove('is-open'); document.body.classList.remove('no-scroll'); } };
    $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); abrirCart(); }); });
    $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', fecharCart); });
    if (drawer) { drawer.addEventListener('click', function (e) { if (e.target === drawer || e.target.classList.contains('drawer__backdrop')) fecharCart(); }); document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharCart(); }); }
    window.__abrirCart = abrirCart;
  }

  /* --------------------------------------------------------------- Carrinho render */
  function renderCarrinho() {
    var body = $('#cartBody'), foot = $('#cartFoot');
    if (!body) return;
    var itens = lerCarrinho();
    if (!itens.length) {
      body.innerHTML = '<div class="cart-empty">' + ICON.bag + '<h3>Seu carrinho está vazio</h3><p>Explore as categorias e adicione suas peças favoritas.</p><a class="btn btn--dark" href="loja.html" style="margin-top:8px">Ver a loja</a></div>';
      if (foot) foot.style.display = 'none';
      return;
    }
    if (foot) foot.style.display = '';
    body.innerHTML = itens.map(function (it) {
      var k = chaveItem(it.id, it.size, it.color);
      var pr = (it.salePrice != null && it.salePrice !== '') ? it.salePrice : it.price;
      var linha = (pr == null || pr === '') ? '<span class="cart-item__price price--soon" style="font-family:var(--font-body);font-size:.8rem">Sob consulta</span>' : '<span class="cart-item__price">' + fmt(pr) + '</span>';
      var meta = [categoriaNome(it.category)];
      if (it.size) meta.push('Tam ' + it.size);
      if (it.color) meta.push(it.color);
      return '<div class="cart-item">' +
        '<div class="cart-item__media">' + imgHTML(it.image, it.name) + '</div>' +
        '<div class="cart-item__body">' +
          '<div class="cart-item__name">' + esc(it.name) + '</div>' +
          '<div class="cart-item__meta">' + esc(meta.join(' · ')) + '</div>' +
          '<div class="cart-item__row"><div class="qty" data-qty="' + esc(k) + '">' +
            '<button type="button" data-qtd="-1" aria-label="Diminuir">−</button><span>' + it.qty + '</span><button type="button" data-qtd="1" aria-label="Aumentar">+</button>' +
          '</div>' + linha + '</div>' +
          '<button class="cart-item__remove" type="button" data-remove aria-label="Remover item">' + ICON.trash + ' Remover</button>' +
        '</div></div>';
    }).join('');
    $$('[data-qty]', body).forEach(function (g) {
      var parts = g.getAttribute('data-qty').split('|');
      $$('[data-qtd]', g).forEach(function (b) { b.addEventListener('click', function () { alterarQtd(parts[0], parts[1], parts[2], parseInt(b.getAttribute('data-qtd'), 10)); }); });
    });
    $$('[data-remove]', body).forEach(function (b, i) { b.addEventListener('click', function () { var it = itens[i]; removerItem(it.id, it.size, it.color); }); });
    var s = subtotal();
    var el = $('#cartSubtotal'); if (el) el.textContent = s.pendente ? 'A consultar' : fmt(s.total);
    var c = $('#cartFootCount'); if (c) c.textContent = contarItens();
  }

  /* --------------------------------------------------------------- Catálogo */
  function initCatalogo() {
    var grade = $('#catalogoGrade');
    if (!grade) return;

    var estado = {
      grupo: getParam('grupo') || '', categoria: getParam('categoria') || '', colecao: getParam('colecao') || '',
      q: getParam('q') || '', tamanho: getParam('tamanho') || '', cor: getParam('cor') || '',
      disponivel: getParam('disponivel') || '', ordenar: 'relevancia', visiveis: 12
    };

    function base() { return ativos(); }
    function filtrar() {
      return base().filter(function (p) {
        if (estado.grupo && grupoDe(p.category) !== estado.grupo) return false;
        if (estado.categoria && p.category !== estado.categoria) return false;
        if (estado.colecao === 'novidades' && !p.isNew) return false;
        if (estado.colecao === 'lancamentos' && !p.isNew) return false;
        if (estado.colecao === 'promocoes' && !emPromo(p)) return false;
        if (estado.tamanho && (!p.sizes || p.sizes.indexOf(estado.tamanho) === -1)) return false;
        if (estado.cor && (!p.colors || p.colors.map(slugify).indexOf(slugify(estado.cor)) === -1)) return false;
        if (estado.disponivel === 'pronta-entrega' && p.stock === 0) return false;
        if (estado.q) {
          var alvo = (p.name + ' ' + (p.description || '') + ' ' + categoriaNome(p.category)).toLowerCase();
          if (alvo.indexOf(estado.q.toLowerCase()) === -1) return false;
        }
        return true;
      });
    }
    function ordenar(l) {
      l = l.slice();
      if (estado.ordenar === 'nome') l.sort(function (a, b) { return a.name.localeCompare(b.name, 'pt-BR'); });
      else if (estado.ordenar === 'menor-preco') l.sort(function (a, b) { return (precoDe(a) || Infinity) - (precoDe(b) || Infinity); });
      else if (estado.ordenar === 'maior-preco') l.sort(function (a, b) { return (precoDe(b) || -Infinity) - (precoDe(a) || -Infinity); });
      else l.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
      return l;
    }
    function titulo() {
      if (estado.q) return 'Busca: “' + estado.q + '”';
      if (estado.categoria) return categoriaNome(estado.categoria);
      if (estado.colecao) return categoriaNome(estado.colecao);
      if (estado.grupo === 'feminino') return 'Moda Feminino';
      if (estado.grupo === 'masculino') return 'Moda Masculino';
      return 'Toda a loja';
    }
    function url(over) {
      var e = { grupo: estado.grupo, categoria: estado.categoria, colecao: estado.colecao, q: estado.q, tamanho: estado.tamanho, cor: estado.cor, disponivel: estado.disponivel };
      over = over || {};
      for (var k in over) { if (over[k] === null || over[k] === '') delete e[k]; else e[k] = over[k]; }
      var parts = [];
      for (var k2 in e) if (e[k2]) parts.push(encodeURIComponent(k2) + '=' + encodeURIComponent(e[k2]));
      return 'loja.html' + (parts.length ? '?' + parts.join('&') : '');
    }

    function renderFiltros() {
      var b = base();
      var tamanhos = {}, cores = {}, grupos = { feminino: [], masculino: [] };
      b.forEach(function (p) { (p.sizes || []).forEach(function (s) { tamanhos[s] = (tamanhos[s] || 0) + 1; }); (p.colors || []).forEach(function (c) { cores[c] = (cores[c] || 0) + 1; }); });
      function lista(arr) { return arr.map(function (c) { var ativo = estado.categoria === c.slug; return '<a href="' + url({ categoria: ativo ? null : c.slug }) + '" class="' + (ativo ? 'is-active' : '') + '">' + esc(c.name) + '</a>'; }).join(''); }
      var html =
        '<div class="filter-group"><h3>Coleções</h3><div class="filter-list">' + COLLECTIONS.map(function (c) { var a = estado.colecao === c.slug; return '<a href="' + url({ colecao: a ? null : c.slug }) + '" class="' + (a ? 'is-active' : '') + '">' + esc(c.name) + '</a>'; }).join('') + '</div></div>' +
        '<div class="filter-group"><h3>Feminino</h3><div class="filter-list">' + lista(CATEGORIES.filter(function (c) { return c.group === 'feminino'; })) + '</div></div>' +
        '<div class="filter-group"><h3>Masculino</h3><div class="filter-list">' + lista(CATEGORIES.filter(function (c) { return c.group === 'masculino'; })) + '</div></div>';

      var ts = Object.keys(tamanhos);
      if (ts.length) html += '<div class="filter-group"><h3>Tamanho</h3><div class="filter-chips">' +
        ts.map(function (s) { var a = estado.tamanho === s; return '<a class="chip ' + (a ? 'is-active' : '') + '" href="' + url({ tamanho: a ? null : s }) + '">' + esc(s) + '</a>'; }).join('') + '</div></div>';

      var cs = Object.keys(cores);
      if (cs.length) html += '<div class="filter-group"><h3>Cor</h3><div class="filter-swatches">' +
        cs.map(function (c) { var a = slugify(estado.cor) === slugify(c); return '<a class="swatch-mini ' + (a ? 'is-active' : '') + '" href="' + url({ cor: a ? null : c }) + '" style="background:' + corHex(c) + '" title="' + esc(c) + '" aria-label="Cor ' + esc(c) + '"></a>'; }).join('') + '</div></div>';

      html += '<div class="filter-group"><h3>Disponibilidade</h3><div class="filter-list">' +
        '<a href="' + url({ disponivel: estado.disponivel === 'pronta-entrega' ? null : 'pronta-entrega' }) + '" class="' + (estado.disponivel === 'pronta-entrega' ? 'is-active' : '') + '">Pronta entrega</a>' +
        '<a href="' + url({ disponivel: null }) + '" class="' + (!estado.disponivel ? 'is-active' : '') + '">Todas as peças</a>' +
        '</div></div>';

      $('#filtros').innerHTML = html;
    }

    function renderAtivos() {
      var chips = [];
      if (estado.q) chips.push({ l: 'Busca: ' + estado.q, h: url({ q: null }) });
      if (estado.grupo) chips.push({ l: estado.grupo === 'feminino' ? 'Feminino' : 'Masculino', h: url({ grupo: null }) });
      if (estado.categoria) chips.push({ l: categoriaNome(estado.categoria), h: url({ categoria: null }) });
      if (estado.colecao) chips.push({ l: categoriaNome(estado.colecao), h: url({ colecao: null }) });
      if (estado.tamanho) chips.push({ l: 'Tam ' + estado.tamanho, h: url({ tamanho: null }) });
      if (estado.cor) chips.push({ l: estado.cor, h: url({ cor: null }) });
      if (estado.disponivel) chips.push({ l: 'Pronta entrega', h: url({ disponivel: null }) });
      var box = $('#filtrosAtivos');
      box.innerHTML = chips.length ? chips.map(function (c) { return '<a class="chip is-active" href="' + c.h + '">' + esc(c.l) + ' ' + ICON.check + '</a>'; }).join('') + '<a class="chip" href="loja.html" style="border-style:dashed">Limpar tudo</a>' : '';
    }

    function aplicar() {
      var lista = ordenar(filtrar());
      var t = titulo();
      var a = $('#tituloPagina'); if (a) a.textContent = t;
      var b = $('#paginaTituloVisivel'); if (b) b.textContent = t;
      var d = document.querySelector('.page-head p');
      var cat = CATEGORIES.filter(function (c) { return c.slug === estado.categoria; })[0];
      if (d) d.textContent = cat ? ('Peças de ' + cat.name + ' da Nega Modas. Escolha tamanho, cor e finalize pelo WhatsApp.') : 'Escolha as peças, monte seu carrinho e finalize o pedido pelo WhatsApp. Atendimento em Monte Azul – MG e região.';
      document.title = t + ' | ' + SITE.name;
      $('#contagem').textContent = lista.length === 1 ? '1 peça' : lista.length + ' peças';

      var mostradas = lista.slice(0, estado.visiveis);
      renderGrade(grade, mostradas, { vazio: 'Ainda não há peças cadastradas nesta seleção. Fale com a gente pelo WhatsApp para ver as novidades.' });
      var lm = $('#loadMore');
      if (lm) lm.style.display = lista.length > estado.visiveis ? '' : 'none';
      renderFiltros(); renderAtivos();
      var box = $('#filtros'); box.style.display = window.innerWidth >= 980 ? '' : 'none';
    }

    var sel = $('#ordenar'); if (sel) sel.addEventListener('change', function () { estado.ordenar = sel.value; aplicar(); });
    var tg = $('#filtrosToggle'); if (tg) tg.addEventListener('click', function () { var b = $('#filtros'); b.style.display = (b.style.display === 'none' || !b.style.display) ? 'block' : 'none'; });
    var lmBtn = $('#loadMoreBtn'); if (lmBtn) lmBtn.addEventListener('click', function () { estado.visiveis += 12; aplicar(); });
    aplicar();
  }

  /* --------------------------------------------------------------- Produto */
  function initProduto() {
    var alvo = $('#produtoConteudo');
    if (!alvo) return;
    var p = acharProduto(getParam('id') || '');
    if (!p) { alvo.innerHTML = '<div class="empty-state"><h3>Produto não encontrado</h3><p>Essa peça pode ter saído do catálogo.</p><a class="btn" href="loja.html">Ver a loja</a></div>'; return; }

    document.title = p.name + ' | ' + SITE.name;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', (p.description || p.name) + ' — ' + SITE.name);

    try {
      var ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.description || p.name, category: categoriaNome(p.category), brand: { '@type': 'Brand', name: SITE.name } };
      if (p.images && p.images.length) ld.image = p.images.map(function (s) { return new URL(s, location.href).href; });
      if (temPreco(p)) ld.offers = { '@type': 'Offer', priceCurrency: 'BRL', price: String(precoDe(p)), availability: (p.stock === 0) ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', url: location.href };
      var sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc);
    } catch (e) {}

    var estado = { qty: 1, size: (p.sizes && p.sizes.length ? p.sizes[0] : ''), color: (p.colors && p.colors.length ? p.colors[0] : '') };
    var imgs = (p.images && p.images.length) ? p.images : [''];
    var cat = categoriaNome(p.category);
    var disp = !(p.stock === 0);

    function galeriaHTML() {
      var mainSrc = imgs[0] || PLACEHOLDER_IMG;
      var main = '<img id="galeriaMain" src="' + esc(mainSrc) + '" alt="' + esc(p.name) + '" decoding="async">';
      var thumbs = imgs.length > 1 ? '<div class="gallery__thumbs">' + imgs.map(function (src, i) { return '<button class="gallery__thumb' + (i === 0 ? ' is-active' : '') + '" type="button" data-thumb="' + i + '" aria-label="Foto ' + (i + 1) + '">' + (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : '<div class="placeholder-media"></div>') + '</button>'; }).join('') + '</div>' : '';
      return '<div class="gallery"><div class="gallery__main">' + main + '</div>' + thumbs + '</div>';
    }
    function precoProd() {
      if (!temPreco(p)) return '<span class="price price--soon">Preço sob consulta</span>';
      if (emPromo(p)) { var o = (p.price != null && p.price !== '') ? '<span class="price price--old">' + fmt(p.price) + '</span>' : ''; return o + '<span class="price price--sale">' + fmt(p.salePrice) + '</span>'; }
      return '<span class="price">' + fmt(p.price) + '</span>';
    }
    function opcoesHTML() {
      var h = '';
      if (p.sizes && p.sizes.length) h += '<div class="option-block"><div class="option-block__head"><h3>Tamanho</h3></div><div class="option-chips">' + p.sizes.map(function (s, i) { return '<button class="opt' + (i === 0 ? ' is-active' : '') + '" type="button" data-size="' + esc(s) + '">' + esc(s) + '</button>'; }).join('') + '</div></div>';
      if (p.colors && p.colors.length) h += '<div class="option-block"><div class="option-block__head"><h3>Cor</h3></div><div class="option-chips">' + p.colors.map(function (c, i) { return '<button class="swatch' + (i === 0 ? ' is-active' : '') + '" type="button" data-color="' + esc(c) + '"><i style="background:' + corHex(c) + '"></i>' + esc(c) + '</button>'; }).join('') + '</div></div>';
      return h;
    }

    alvo.innerHTML = '<div class="product__grid">' + galeriaHTML() +
      '<div><div class="product__cat">' + esc(cat) + (p.isNew ? ' · Novo' : '') + '</div>' +
      '<h1 class="product__title">' + esc(p.name) + '</h1>' +
      '<div class="product__price">' + precoProd() + '</div>' +
      '<div class="availability' + (disp ? '' : ' is-out') + '"><i></i>' + (disp ? 'Disponível para pedido pelo WhatsApp' : 'Consulte disponibilidade') + '</div>' +
      (p.description ? '<p class="product__desc">' + esc(p.description) + '</p>' : '') +
      opcoesHTML() +
      '<div class="product__buy"><div class="product__qty"><label>Quantidade</label><div class="qty" id="qtyProduto"><button type="button" data-pqtd="-1" aria-label="Diminuir">−</button><span id="qtyValor">1</span><button type="button" data-pqtd="1" aria-label="Aumentar">+</button></div></div>' +
      '<button class="btn btn--lg btn--block" type="button" id="btnAddProduto">' + ICON.bag + ' Adicionar ao carrinho</button>' +
      '<button class="btn btn--lg btn--block btn--wa" type="button" id="btnWaProduto">' + ICON.whatsapp + ' Comprar pelo WhatsApp</button></div>' +
      '<div class="product__meta"><div>' + ICON.pin + '<span>Atendimento em ' + esc(SITE.region) + ' e por WhatsApp para outras cidades.</span></div><div>' + ICON.shield + '<span>Pedido confirmado diretamente com a loja, com atendimento pessoal.</span></div><div>' + ICON.tag + '<span>Valores e condições são confirmados no atendimento.</span></div></div>' +
      '</div></div>';

    $$('[data-thumb]', alvo).forEach(function (b) { b.addEventListener('click', function () { var i = parseInt(b.getAttribute('data-thumb'), 10); $$('[data-thumb]', alvo).forEach(function (x) { x.classList.remove('is-active'); }); b.classList.add('is-active'); var m = $('#galeriaMain'); if (m && imgs[i]) m.src = imgs[i]; }); });
    $$('[data-size]', alvo).forEach(function (b) { b.addEventListener('click', function () { $$('[data-size]', alvo).forEach(function (x) { x.classList.remove('is-active'); }); b.classList.add('is-active'); estado.size = b.getAttribute('data-size'); }); });
    $$('[data-color]', alvo).forEach(function (b) { b.addEventListener('click', function () { $$('[data-color]', alvo).forEach(function (x) { x.classList.remove('is-active'); }); b.classList.add('is-active'); estado.color = b.getAttribute('data-color'); }); });
    $$('[data-pqtd]', alvo).forEach(function (b) { b.addEventListener('click', function () { estado.qty = Math.min(99, Math.max(1, estado.qty + parseInt(b.getAttribute('data-pqtd'), 10))); $('#qtyValor').textContent = estado.qty; }); });
    $('#btnAddProduto').addEventListener('click', function () { addAoCarrinho(p, estado.qty, estado.size, estado.color); if (window.__abrirCart) window.__abrirCart(); });
    $('#btnWaProduto').addEventListener('click', function () { abrirWhatsApp(msgProduto(p, estado.qty, estado.size, estado.color)); });

    var rel = ativos().filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 8);
    var sec = $('#relacionados');
    if (rel.length && sec) { sec.style.display = ''; renderCarrossel($('#relacionadosVitrine'), rel); }
  }

  /* --------------------------------------------------------------- Boot */
  function boot() {
    construirMenus();
    construirShopNav();
    initHeader();
    atualizarBadge();
    renderCarrinho();
    initRevealGlobal();
    initVitrines();
    initCatalogo();
    initProduto();

    $$('[data-wa-generic]').forEach(function (el) { el.setAttribute('href', waLink(el.getAttribute('data-wa-generic') || 'Olá! Gostaria de falar com a Nega Modas.')); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); });
    var ano = $('#ano'); if (ano) ano.textContent = new Date().getFullYear();
    $$('[data-clear-cart]').forEach(function (b) { b.addEventListener('click', function () { if (lerCarrinho().length) limparCarrinho(); }); });
    var fin = $('#btnFinalizar'); if (fin) fin.addEventListener('click', function () { if (!lerCarrinho().length) { toast('Seu carrinho está vazio', 'info'); return; } abrirWhatsApp(msgPedido()); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.NEGAUI = { toast: toast, addAoCarrinho: addAoCarrinho, abrirWhatsApp: abrirWhatsApp, waLink: waLink };
})();
