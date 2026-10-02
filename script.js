(function () {
  'use strict';

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------- Menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  var subButtons = nav.querySelectorAll('.has-sub > button');

  function closeSubs(except) {
    subButtons.forEach(function (b) { if (b !== except) b.setAttribute('aria-expanded', 'false'); });
  }

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  subButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      closeSubs(btn);
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      closeSubs();
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) closeSubs();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var openBtn = nav.querySelector('.has-sub > button[aria-expanded="true"]');
      closeSubs();
      if (openBtn) openBtn.focus();
    }
  });

  /* ---------- Acessibilidade ---------- */
  var root = document.documentElement;
  var sizes = [93.75, 100, 112.5, 125, 137.5];
  var sizeIdx = parseInt(store('opgp-font'), 10);
  if (isNaN(sizeIdx)) sizeIdx = 1;

  function applySize() { root.style.fontSize = sizes[sizeIdx] + '%'; store('opgp-font', String(sizeIdx)); }
  applySize();

  document.querySelectorAll('[data-font]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = parseInt(b.getAttribute('data-font'), 10);
      sizeIdx = d === 0 ? 1 : Math.max(0, Math.min(sizes.length - 1, sizeIdx + d));
      applySize();
    });
  });

  var contraste = document.getElementById('toggle-contraste');
  function applyContrast(on) {
    document.body.classList.toggle('alto-contraste', on);
    contraste.setAttribute('aria-pressed', String(on));
    store('opgp-contraste', on ? '1' : '0');
  }
  applyContrast(store('opgp-contraste') === '1');
  contraste.addEventListener('click', function () {
    applyContrast(!document.body.classList.contains('alto-contraste'));
  });

  /* ---------- Diretório "Onde encontrar" (19 temas PNTP) ---------- */
  var temas = [
    ['Informações prioritárias', 'O que todo portal precisa ter em destaque: acesso fácil, busca e informações essenciais.'],
    ['Informações institucionais', 'Estrutura organizacional, competências, endereços, horários e responsáveis.'],
    ['Receita', 'Quanto o município arrecada, de onde vêm os recursos e como são classificados.'],
    ['Despesa', 'Como o dinheiro é gasto: empenho, liquidação, pagamento e favorecidos.'],
    ['Convênios e transferências', 'Recursos recebidos ou repassados por meio de convênios, acordos e parcerias.'],
    ['Recursos humanos', 'Quadro de pessoal, cargos, remuneração e concursos públicos.'],
    ['Diárias', 'Pagamentos de diárias e passagens a servidores e agentes públicos.'],
    ['Licitações', 'Editais, modalidades, resultados e andamento das compras públicas.'],
    ['Contratos', 'Contratos firmados, aditivos, vigência, valores e fiscalização.'],
    ['Obras', 'Obras públicas em andamento e concluídas, valores, prazos e situação.'],
    ['Planejamento e prestação de contas', 'PPA, LDO, LOA, relatórios fiscais e julgamento das contas.'],
    ['SIC — Serviço de Informação ao Cidadão', 'Como pedir informações que não estão publicadas (e-SIC) e acompanhar o pedido.'],
    ['Acessibilidade', 'Recursos de acessibilidade do portal oficial do município.'],
    ['Ouvidoria', 'Canal para reclamações, sugestões, elogios e denúncias sobre serviços municipais.'],
    ['LGPD e governo digital', 'Tratamento de dados pessoais, encarregado e serviços públicos digitais.'],
    ['Renúncias de receitas', 'Isenções, anistias e benefícios fiscais concedidos pelo município.'],
    ['Emendas parlamentares', 'Recursos recebidos por emendas parlamentares e sua aplicação.'],
    ['Saúde', 'Plano de saúde, serviços, unidades, filas e aplicação de recursos na área.'],
    ['Educação', 'Plano de educação, unidades escolares, vagas e aplicação de recursos na área.'],
    ['Assistência social', 'Programas, equipamentos, benefícios e aplicação de recursos na área.']
  ];

  var lista = document.getElementById('diretorio');
  var busca = document.getElementById('busca-fontes');
  var status = document.getElementById('busca-status');

  function norm(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

  function render(q) {
    var termo = norm(q || '').trim();
    var html = '';
    var n = 0;
    temas.forEach(function (t, i) {
      if (termo && norm(t.join(' ')).indexOf(termo) === -1) return;
      n++;
      html += '<li>' +
        '<span class="dir-num">TEMA ' + String(i + 1).padStart(2, '0') + '</span>' +
        '<h3>' + t[0] + '</h3>' +
        '<p>' + t[1] + '</p>' +
        '<span class="dir-meta">Órgão responsável e link oficial em conferência</span>' +
        '</li>';
    });
    if (!n) html = '<li class="empty">Nenhum tema encontrado para “' + q.replace(/[<>&"]/g, '') + '”. Tente outra palavra ou <a href="#contato">fale com o OPGP</a>.</li>';
    lista.innerHTML = html;
    status.textContent = termo ? n + (n === 1 ? ' tema encontrado' : ' temas encontrados') : temas.length + ' temas disponíveis';
  }

  render('');
  busca.addEventListener('input', function () { render(busca.value); });

  /* ---------- Formulários ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var msg = form.querySelector('.form-msg');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;

      form.querySelectorAll('.err').forEach(function (el) { el.remove(); });
      form.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });

      form.querySelectorAll('[required]').forEach(function (el) {
        var ok = el.type === 'checkbox' ? el.checked : el.value.trim() !== '';
        el.setAttribute('aria-invalid', String(!ok));
        if (ok) { el.removeAttribute('aria-describedby'); return; }
        var field = el.closest('.field');
        field.classList.add('invalid');
        var err = document.createElement('span');
        err.className = 'err';
        err.id = el.id + '-err';
        var label = form.querySelector('label[for="' + el.id + '"]');
        var nome = label ? label.childNodes[0].textContent.trim() : 'este campo';
        err.textContent = el.type === 'checkbox'
          ? 'Para enviar, marque a ciência da política de privacidade.'
          : (el.tagName === 'SELECT' ? 'Selecione uma opção em “' + nome + '”.' : 'Preencha o campo “' + nome + '”.');
        field.appendChild(err);
        el.setAttribute('aria-describedby', err.id);
        if (!firstBad) firstBad = el;
      });

      if (firstBad) {
        msg.className = 'form-msg bad';
        msg.textContent = 'Revise os campos destacados.';
        firstBad.focus();
        return;
      }

      msg.className = 'form-msg ok';
      msg.textContent = 'Obrigado! Formulário validado. O envio será ativado na publicação oficial do site.';
      form.reset();
    });
  });

  /* ---------- Ano automático ---------- */
  document.getElementById('ano').textContent = new Date().getFullYear();
})();
