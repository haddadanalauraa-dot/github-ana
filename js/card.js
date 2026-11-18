/* Desenha o cartão de resultado (1080×1350) num <canvas>. A mesma imagem é exibida e baixada. */
(function (root) {
  const GQ = (root.GQ = root.GQ || {});
  const W = 1080, H = 1350;
  const SERIF = '"Playfair Display", "Times New Roman", Georgia, serif';
  const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';

  function spaced(ctx, text, x, y, spacing, align) {
    // letter-spacing manual (ctx.letterSpacing não existe em todos os navegadores)
    const chars = [...text];
    const widths = chars.map((c) => ctx.measureText(c).width);
    const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
    let cx = align === 'center' ? x - total / 2 : x;
    ctx.textAlign = 'left';
    chars.forEach((c, i) => { ctx.fillText(c, cx, y); cx += widths[i] + spacing; });
  }

  function wrap(ctx, text, maxW) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const w of words) {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    }
    if (line) lines.push(line);
    return lines;
  }

  // Ajusta o tamanho da fonte até caber em `maxLines` linhas.
  function fit(ctx, text, fontFn, maxW, maxLines, start, min) {
    for (let s = start; s >= min; s -= 2) {
      ctx.font = fontFn(s);
      const lines = wrap(ctx, text, maxW);
      if (lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxW)) return { size: s, lines };
    }
    ctx.font = fontFn(min);
    return { size: min, lines: wrap(ctx, text, maxW) };
  }

  /* Balança. media 0 → prato das garantias (esq.) desce; 4 → prato da punição (dir.) desce. */
  function drawScale(ctx, cx, top, size, media, color) {
    const k = size / 400;
    const tilt = ((media - 2) / 2) * 0.17; // rad; >0 = direita desce
    ctx.save();
    ctx.translate(cx, top);
    ctx.scale(k, k);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';

    // base e coluna
    ctx.beginPath();
    ctx.moveTo(-70, 400); ctx.quadraticCurveTo(-55, 372, -22, 366); ctx.lineTo(22, 366);
    ctx.quadraticCurveTo(55, 372, 70, 400); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-9, 366); ctx.lineTo(-6, 90); ctx.lineTo(6, 90); ctx.lineTo(9, 366); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 300, 17, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 250, 13, 7, 0, 0, Math.PI * 2); ctx.fill();
    // ponta (losango)
    ctx.beginPath();
    ctx.moveTo(0, 18); ctx.quadraticCurveTo(14, 50, 11, 72); ctx.lineTo(-11, 72); ctx.quadraticCurveTo(-14, 50, 0, 18);
    ctx.fill();

    // travessão
    const L = 235, py = 94;
    const lx = -L * Math.cos(tilt), ly = py - L * Math.sin(tilt);
    const rx = L * Math.cos(tilt), ry = py + L * Math.sin(tilt);
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.quadraticCurveTo(lx * 0.5, py - 24 - Math.sin(tilt) * L * 0.2, 0, py - 10);
    ctx.quadraticCurveTo(rx * 0.5, py - 24 + Math.sin(tilt) * L * 0.2, rx, ry);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(0, py - 8, 15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(lx, ly, 11, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rx, ry, 11, 0, Math.PI * 2); ctx.fill();

    // pratos
    const pan = (x, y) => {
      const drop = 205, half = 98;
      ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - half + 6, y + drop); ctx.moveTo(x, y); ctx.lineTo(x + half - 6, y + drop); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + drop); ctx.lineWidth = 2.5; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - half, y + drop - 6);
      ctx.quadraticCurveTo(x, y + drop + 40, x + half, y + drop - 6);
      ctx.quadraticCurveTo(x, y + drop + 8, x - half, y + drop - 6);
      ctx.fill();
    };
    pan(lx, ly); pan(rx, ry);
    ctx.restore();
    return { lx: cx + lx * k, ly: top + (ly + 205 + 40) * k, rx: cx + rx * k, ry: top + (ry + 205 + 40) * k };
  }

  function background(ctx, tema) {
    ctx.fillStyle = tema.bg;
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.strokeStyle = tema.suave;
    ctx.fillStyle = tema.suave;
    switch (tema.estilo) {
      case 'noite': // colunas tênues
        ctx.lineWidth = 2;
        for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(60 + i * 120, 0); ctx.lineTo(60 + i * 120, H); ctx.stroke(); }
        break;
      case 'grafite': // grade de código
        ctx.lineWidth = 1.5;
        for (let y = 70; y < H; y += 56) { ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(W - 60, y); ctx.stroke(); }
        break;
      case 'papel': // moldura dupla
        ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, H - 72);
        ctx.lineWidth = 1.5; ctx.strokeRect(52, 52, W - 104, H - 104);
        break;
      case 'papel-vermelho': // faixa diagonal vermelha
        ctx.fillStyle = 'rgba(179,40,31,.16)';
        ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, 380); ctx.lineTo(380, H); ctx.lineTo(0, H); ctx.lineTo(0, H - 340); ctx.lineTo(W - 340, 0); ctx.closePath(); ctx.fill();
        ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, H - 72);
        break;
      case 'vermelho': // "X" em faixas claras, estética de tribunal
        ctx.fillStyle = 'rgba(246,239,226,.14)';
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(170, 0); ctx.lineTo(W, H - 170); ctx.lineTo(W, H); ctx.lineTo(W - 170, H); ctx.lineTo(0, 170); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, 170); ctx.lineTo(170, H); ctx.lineTo(0, H); ctx.lineTo(0, H - 170); ctx.lineTo(W - 170, 0); ctx.closePath(); ctx.fill();
        break;
    }
    ctx.restore();
  }

  function draw(canvas, d) {
    const { categoria: cat, frase, media, mediaTexto } = d;
    const t = cat.tema;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    background(ctx, t);
    ctx.textBaseline = 'alphabetic';

    // topo
    ctx.fillStyle = t.fg; ctx.font = `700 28px ${SANS}`;
    spaced(ctx, 'O QUÃO GARANTISTA VOCÊ É?', W / 2, 112, 6, 'center');
    ctx.fillStyle = t.suave; ctx.fillRect(W / 2 - 40, 140, 80, 3);

    // balança
    const sc = drawScale(ctx, W / 2, 170, 390, media, t.fg);
    ctx.fillStyle = t.fg; ctx.globalAlpha = 0.75; ctx.font = `600 19px ${SANS}`;
    spaced(ctx, 'GARANTIAS', sc.lx, 650, 4, 'center');
    spaced(ctx, 'PUNIÇÃO', sc.rx, 650, 4, 'center');
    ctx.globalAlpha = 1;

    // classificação
    ctx.fillStyle = t.acento === t.fg ? t.fg : t.acento;
    ctx.textAlign = 'center';
    const nome = fit(ctx, cat.nomeCurto, (s) => `900 ${s}px ${SERIF}`, 900, 2, 112, 64);
    const lh = nome.size * 1.04;
    let y = 755 + (nome.lines.length === 1 ? 20 : 0);
    ctx.font = `900 ${nome.size}px ${SERIF}`;
    nome.lines.forEach((l, i) => ctx.fillText(l, W / 2, y + i * lh));
    y += (nome.lines.length - 1) * lh;
    if (cat.sufixo) {
      ctx.fillStyle = t.fg; ctx.font = `italic 400 34px ${SERIF}`;
      y += 48; ctx.fillText(cat.sufixo, W / 2, y);
    }

    // frase personalizada
    ctx.fillStyle = t.fg;
    y += 64;
    // reduz a fonte até a frase terminar acima da área da pontuação
    let f;
    for (let size = 44; size >= 26; size -= 2) {
      f = fit(ctx, '“' + frase + '”', (s) => `italic 400 ${s}px ${SERIF}`, 840, 5, size, size);
      if (y + (f.lines.length - 1) * size * 1.3 <= 1085) break;
    }
    ctx.font = `italic 400 ${f.size}px ${SERIF}`;
    f.lines.forEach((l, i) => ctx.fillText(l, W / 2, y + i * f.size * 1.3));
    y += (f.lines.length - 1) * f.size * 1.3;

    // pontuação + régua
    const gy = 1170;
    ctx.fillStyle = t.fg; ctx.font = `700 34px ${SANS}`;
    ctx.fillText(`Minha pontuação: ${mediaTexto}/4`, W / 2, gy - 34);
    const gx0 = 190, gx1 = W - 190;
    ctx.strokeStyle = t.fg; ctx.globalAlpha = 0.35; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(gx0, gy); ctx.lineTo(gx1, gy); ctx.stroke();
    for (let i = 0; i <= 4; i++) { const x = gx0 + ((gx1 - gx0) * i) / 4; ctx.beginPath(); ctx.moveTo(x, gy - 8); ctx.lineTo(x, gy + 8); ctx.stroke(); }
    ctx.globalAlpha = 1;
    const mx = gx0 + ((gx1 - gx0) * media) / 4;
    ctx.fillStyle = t.acento === t.fg ? t.fg : t.acento;
    ctx.beginPath(); ctx.arc(mx, gy, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = t.bg; ctx.beginPath(); ctx.arc(mx, gy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = t.fg; ctx.globalAlpha = 0.7; ctx.font = `600 17px ${SANS}`;
    spaced(ctx, 'GARANTISTA', gx0 - 60, gy + 48, 3, 'left');
    ctx.textAlign = 'right';
    const pw = [...'PUNITIVISTA'].reduce((a, c) => a + ctx.measureText(c).width + 3, -3);
    ctx.textAlign = 'left';
    spaced(ctx, 'PUNITIVISTA', gx1 + 60 - pw, gy + 48, 3, 'left');
    ctx.globalAlpha = 1;

    // rodapé
    ctx.fillStyle = t.fg; ctx.textAlign = 'center'; ctx.font = `700 30px ${SANS}`;
    ctx.fillText('Faça o teste e descubra seu perfil!', W / 2, 1275);
    ctx.globalAlpha = 0.6; ctx.font = `500 18px ${SANS}`;
    ctx.fillText('Quiz recreativo de posicionamento jurídico, não uma classificação acadêmica.', W / 2, 1306);
    ctx.globalAlpha = 1;
    return canvas;
  }

  // Aguarda as fontes (com limite) para o canvas não sair com fonte reserva.
  async function fontsReady() {
    if (!document.fonts || !document.fonts.load) return;
    const loads = ['900 60px "Playfair Display"', 'italic 400 40px "Playfair Display"', '700 28px Inter', '500 18px Inter']
      .map((f) => document.fonts.load(f).catch(() => null));
    await Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, 2500))]);
  }

  GQ.card = { draw, fontsReady, W, H };
})(typeof window !== 'undefined' ? window : globalThis);
