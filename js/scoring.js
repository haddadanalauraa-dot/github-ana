/* Pontuação, classificação e frase personalizada. Sem dependência de DOM. */
(function (root) {
  const GQ = (root.GQ = root.GQ || {});

  const round2 = (n) => Math.round(n * 100) / 100;

  // Média por eixo (null se o eixo não tiver respostas).
  function mediaPorEixo(perguntas, respostas) {
    const acc = {};
    for (const q of perguntas) {
      const op = q.opcoes.find((o) => o.id === respostas[q.id]);
      if (!op) continue;
      (acc[q.eixo] = acc[q.eixo] || []).push(op.pontos);
    }
    const out = {};
    for (const eixo of Object.keys(GQ.eixos)) {
      const v = acc[eixo] || [];
      out[eixo] = v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
    }
    return out;
  }

  // Compara com inteiros para não sofrer com ponto flutuante nas fronteiras
  // (ex.: soma 12 de 15 → média 0,80 exatamente → "garantista moderado").
  function indiceCategoria(soma, n) {
    for (let k = 1; k <= 4; k++) {
      if (soma * 5 < 4 * k * n) return k - 1;
    }
    return 4;
  }

  function nivelEixo(media) {
    return GQ.niveis[indiceCategoria(media, 1)];
  }

  function bandaEixo(media) {
    return media < 1.6 ? 0 : media < 2.4 ? 1 : 2;
  }

  function calcular(perguntas, respostas) {
    const pontos = [];
    const resp = {};
    for (const q of perguntas) {
      const op = q.opcoes.find((o) => o.id === respostas[q.id]);
      if (!op) throw new Error('Pergunta sem resposta: ' + q.id);
      pontos.push(op.pontos);
      resp[q.id] = op.pontos;
    }
    const n = pontos.length;
    const soma = pontos.reduce((a, b) => a + b, 0);
    const media = soma / n;
    const desvio = Math.sqrt(pontos.reduce((a, p) => a + (p - media) ** 2, 0) / n);
    const eixos = mediaPorEixo(perguntas, respostas);
    const idx = indiceCategoria(soma, n);
    const categoria = GQ.categorias[idx];
    const ctx = { media, eixos, resp, desvio, categoria };
    const frase = GQ.frases.find((f) => f.quando(ctx));
    return { n, soma, media, mediaTexto: round2(media).toFixed(2).replace('.', ','), eixos, desvio, categoria, frase: frase.texto, fraseId: frase.id };
  }

  GQ.scoring = { calcular, indiceCategoria, nivelEixo, bandaEixo, mediaPorEixo };
  if (typeof module !== 'undefined') module.exports = GQ.scoring;
})(typeof window !== 'undefined' ? window : globalThis);
