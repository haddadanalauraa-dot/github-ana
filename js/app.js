/* Fluxo da interface: intro → perguntas → resultado. */
(function () {
  const GQ = window.GQ;
  const $ = (s, r = document) => r.querySelector(s);
  const el = {
    intro: $('#screen-intro'), quiz: $('#screen-quiz'), result: $('#screen-result'),
    start: $('#btn-start'), prev: $('#btn-prev'), next: $('#btn-next'), hint: $('#hint'),
    form: $('#q-form'), qText: $('#q-text'), tema: $('#q-tema'), question: $('#question'),
    pLabel: $('#progress-label'), pBar: $('#progress-bar'), progress: $('#progress'),
    canvas: $('#card-canvas'), share: $('#btn-share'), download: $('#btn-download'),
    restart: $('#btn-restart'), status: $('#share-status'),
  };
  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = { perguntas: [], i: 0, respostas: {}, ordem: {}, resultado: null, blobPromise: null };

  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  function show(name) {
    for (const k of ['intro', 'quiz', 'result']) el[k].hidden = k !== name;
    document.body.dataset.screen = name;
    window.scrollTo({ top: 0, behavior: 'auto' });
    const s = el[name];
    s.classList.remove('enter'); void s.offsetWidth; s.classList.add('enter');
  }

  function iniciar() {
    let qs = GQ.questions.slice();
    const n = GQ.config.perguntasPorPartida;
    if (n && n < qs.length) qs = shuffle(qs).slice(0, n);
    state.perguntas = qs;
    state.i = 0;
    state.respostas = {};
    state.resultado = null;
    state.blobPromise = null;
    state.ordem = {};
    qs.forEach((q) => (state.ordem[q.id] = shuffle(q.opcoes)));
    el.progress.setAttribute('aria-valuemax', qs.length);
    show('quiz');
    renderPergunta(false);
  }

  function renderPergunta(animar = true) {
    const q = state.perguntas[state.i];
    const total = state.perguntas.length;
    el.pLabel.textContent = `Pergunta ${state.i + 1} de ${total}`;
    el.progress.setAttribute('aria-valuenow', state.i + 1);
    el.pBar.style.width = `${((state.i + 1) / total) * 100}%`;
    el.tema.textContent = q.tema;
    el.qText.textContent = q.texto;
    el.form.innerHTML = '';
    state.ordem[q.id].forEach((o, idx) => {
      const id = `opt-${q.id}-${o.id}`;
      const label = document.createElement('label');
      label.className = 'option';
      label.htmlFor = id;
      label.innerHTML = '<input type="radio" name="opcao" class="sr-only"><span class="letter"></span><span class="opt-text"></span>';
      const input = label.querySelector('input');
      input.id = id; input.value = o.id;
      label.querySelector('.letter').textContent = 'ABCD'[idx];
      label.querySelector('.opt-text').textContent = o.texto;
      if (state.respostas[q.id] === o.id) input.checked = true;
      input.addEventListener('change', () => { state.respostas[q.id] = o.id; atualizarNav(); });
      el.form.appendChild(label);
    });
    atualizarNav();
    if (animar && !reduceMotion) {
      el.question.classList.remove('swap'); void el.question.offsetWidth; el.question.classList.add('swap');
    }
    el.qText.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function atualizarNav() {
    const q = state.perguntas[state.i];
    const ok = !!state.respostas[q.id];
    const ultima = state.i === state.perguntas.length - 1;
    el.next.disabled = !ok;
    el.next.textContent = ultima ? 'Ver meu resultado' : 'Próxima →';
    el.prev.style.visibility = state.i === 0 ? 'hidden' : 'visible';
    el.hint.style.visibility = ok ? 'hidden' : 'visible';
  }

  function avancar() {
    const q = state.perguntas[state.i];
    if (!state.respostas[q.id]) return;
    if (state.i < state.perguntas.length - 1) { state.i++; renderPergunta(); }
    else finalizar();
  }
  function voltar() { if (state.i > 0) { state.i--; renderPergunta(); } }

  /* ---------- resultado ---------- */
  async function finalizar() {
    state.resultado = GQ.scoring.calcular(state.perguntas, state.respostas);
    renderResultado(state.resultado);
    show('result');
    await GQ.card.fontsReady();
    state.blobPromise = null;
    GQ.card.draw(el.canvas, state.resultado);
    el.canvas.setAttribute('aria-label', `Cartão de resultado: ${state.resultado.categoria.nome}, pontuação ${state.resultado.mediaTexto} de 4. ${state.resultado.frase}`);
  }

  function renderResultado(r) {
    const c = r.categoria;
    $('#r-nome').textContent = c.nome;
    $('#r-media').textContent = r.mediaTexto;
    $('#meter-dot').style.left = `${(r.media / 4) * 100}%`;
    $('#r-desc').textContent = c.descricao;
    $('#r-frase').textContent = `“${r.frase}”`;
    $('#r-perfil').textContent = c.perfil;
    $('#r-efeito').textContent = `“${c.fraseEfeito}”`;
    const ul = $('#r-caracteristicas'); ul.innerHTML = '';
    c.caracteristicas.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
    const box = $('#r-eixos'); box.innerHTML = '';
    for (const [key, info] of Object.entries(GQ.eixos)) {
      const m = r.eixos[key];
      if (m == null) continue;
      const row = document.createElement('div');
      row.className = 'eixo';
      row.innerHTML = '<div class="eixo-head"><h4></h4><span class="eixo-nivel"></span></div><div class="meter small" aria-hidden="true"><div class="meter-line"></div><div class="meter-dot"></div></div><p></p>';
      row.querySelector('h4').textContent = info.nome;
      row.querySelector('.eixo-nivel').textContent = `${GQ.scoring.nivelEixo(m)} · ${(Math.round(m * 100) / 100).toFixed(2).replace('.', ',')}`;
      row.querySelector('.meter-dot').style.left = `${(m / 4) * 100}%`;
      row.querySelector('p').textContent = GQ.textoEixos[key][GQ.scoring.bandaEixo(m)];
      box.appendChild(row);
    }
    document.documentElement.dataset.resultado = c.id;
    setStatus('');
  }

  function setStatus(msg) { el.status.textContent = msg; }

  function canvasBlob() {
    if (!state.blobPromise) {
      state.blobPromise = new Promise((res, rej) => el.canvas.toBlob((b) => (b ? res(b) : rej(new Error('toBlob'))), 'image/png'));
    }
    return state.blobPromise;
  }
  const FILE = 'quao-garantista-voce-e.png';

  function baixar(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = FILE;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  function textoCompartilhamento() {
    const r = state.resultado;
    const link = /^https?:/.test(location.protocol) ? location.href.split('#')[0] : '';
    return `Fui classificado como ${r.categoria.nomeCurto}${r.categoria.sufixo ? ' ' + r.categoria.sufixo : ''} no quiz “O quão garantista você é?” (${r.mediaTexto}/4). Faça o teste e descubra seu perfil!${link ? ' ' + link : ''}`;
  }

  async function compartilhar() {
    if (!state.resultado) return;
    try {
      const blob = await canvasBlob();
      const text = textoCompartilhamento();
      const file = new File([blob], FILE, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, title: 'O quão garantista você é?' });
        setStatus('Resultado compartilhado.');
        return;
      }
      if (navigator.share) {
        // sem suporte a arquivos: compartilha o texto e oferece a imagem
        await navigator.share({ text, title: 'O quão garantista você é?' });
        setStatus('Texto compartilhado. Use “Baixar imagem” para anexar o cartão.');
        return;
      }
      // desktop sem Web Share: baixa a imagem e copia o texto
      baixar(blob);
      let copiado = false;
      try { await navigator.clipboard.writeText(text); copiado = true; } catch (_) { /* ignora */ }
      setStatus(copiado ? 'Imagem baixada e texto copiado: é só colar no grupo.' : 'Imagem baixada. Anexe-a na conversa.');
    } catch (err) {
      if (err && err.name === 'AbortError') { setStatus(''); return; }
      setStatus('Não foi possível compartilhar. Tente “Baixar imagem”.');
    }
  }

  async function baixarImagem() {
    if (!state.resultado) return;
    try { baixar(await canvasBlob()); setStatus('Imagem baixada.'); }
    catch (_) { setStatus('Não foi possível gerar a imagem neste navegador.'); }
  }

  /* ---------- eventos ---------- */
  el.start.addEventListener('click', iniciar);
  el.next.addEventListener('click', avancar);
  el.prev.addEventListener('click', voltar);
  el.share.addEventListener('click', compartilhar);
  el.download.addEventListener('click', baixarImagem);
  el.restart.addEventListener('click', () => { show('intro'); });
  document.querySelector('[data-action="home"]').addEventListener('click', (e) => { e.preventDefault(); show('intro'); });

  document.addEventListener('keydown', (e) => {
    if (el.quiz.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^[1-4]$/.test(e.key)) {
      const inputs = el.form.querySelectorAll('input');
      const inp = inputs[Number(e.key) - 1];
      if (inp) { inp.checked = true; inp.dispatchEvent(new Event('change')); }
    } else if (e.key === 'Enter' && !el.next.disabled && document.activeElement !== el.prev) {
      e.preventDefault(); avancar();
    }
  });

  // contador dinâmico na intro
  const kicker = $('.kicker', el.intro);
  kicker.textContent = `Quiz jurídico · ${GQ.config.perguntasPorPartida || GQ.questions.length} dilemas`;
})();
