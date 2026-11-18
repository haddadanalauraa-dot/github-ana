// Rodar com: node test/scoring.test.js
const path = require('path');
require(path.join('..', 'js', 'data', 'questions.js'));
require(path.join('..', 'js', 'data', 'results.js'));
require(path.join('..', 'js', 'scoring.js'));
const assert = require('assert');
const { questions: Q, categorias, eixos } = globalThis.GQ;
const S = globalThis.GQ.scoring;

// Estrutura do banco
assert.strictEqual(Q.length, 15, '15 perguntas');
const ids = new Set(Q.map((q) => q.id));
assert.strictEqual(ids.size, Q.length, 'ids únicos');
const porEixo = {};
for (const q of Q) {
  assert.ok(eixos[q.eixo], 'eixo válido: ' + q.id);
  porEixo[q.eixo] = (porEixo[q.eixo] || 0) + 1;
  assert.strictEqual(q.opcoes.length, 4, '4 alternativas: ' + q.id);
  assert.strictEqual(new Set(q.opcoes.map((o) => o.id)).size, 4);
  for (const o of q.opcoes) assert.ok(Number.isInteger(o.pontos) && o.pontos >= 0 && o.pontos <= 4);
  assert.ok(q.opcoes.some((o) => o.pontos <= 1) && q.opcoes.some((o) => o.pontos >= 3), 'cobre os dois polos: ' + q.id);
}
assert.deepStrictEqual(porEixo, { processo: 5, penas: 5, poder: 5 });
console.log('banco ok', porEixo);

// Respostas "todas com pontuação X" (escolhe a alternativa mais próxima de X)
function responder(alvo) {
  const r = {};
  let alt = 0; // desempates alternados (1 ou 3 quando o alvo é 2)
  for (const q of Q) {
    const dist = (o) => Math.abs(o.pontos - alvo);
    const min = Math.min(...q.opcoes.map(dist));
    const empatadas = q.opcoes.filter((o) => dist(o) === min);
    r[q.id] = empatadas[alt++ % empatadas.length].id;
  }
  return r;
}
const casos = [[0, 'garantista-raiz'], [4, 'punitivista-raiz'], [2, 'equilibrado']];
for (const [alvo, esperado] of casos) {
  const res = S.calcular(Q, responder(alvo));
  console.log(alvo, res.mediaTexto, res.categoria.id, '|', res.frase);
  assert.strictEqual(res.categoria.id, esperado);
}

// Fronteiras exatas (n = 15): soma → categoria
const fronteiras = { 0: 0, 11: 0, 12: 1, 23: 1, 24: 2, 35: 2, 36: 3, 47: 3, 48: 4, 60: 4 };
for (const [soma, idx] of Object.entries(fronteiras)) {
  assert.strictEqual(S.indiceCategoria(Number(soma), 15), idx, 'soma ' + soma);
}
// Faixas declaradas em results.js coerentes com os limites
assert.deepStrictEqual(categorias.map((c) => c.faixa[0]), [0, 0.8, 1.6, 2.4, 3.2]);
// Toda soma possível de 0 a 60 cai numa categoria e a média bate com a faixa
for (let s = 0; s <= 60; s++) {
  const i = S.indiceCategoria(s, 15), m = s / 15, [lo, hi] = categorias[i].faixa;
  assert.ok(m >= lo - 1e-9 && m < hi, `soma ${s} média ${m} fora de [${lo},${hi})`);
}
// Enumeração aleatória: toda combinação gera frase e categoria válidas
for (let t = 0; t < 5000; t++) {
  const r = {};
  for (const q of Q) r[q.id] = q.opcoes[Math.floor(Math.random() * 4)].id;
  const res = S.calcular(Q, r);
  assert.ok(res.frase && res.categoria && res.media >= 0 && res.media <= 4);
}
// Frases específicas
const r = responder(0); r.clamor = Q.find((q) => q.id === 'clamor').opcoes.find((o) => o.pontos === 4).id;
assert.strictEqual(S.calcular(Q, r).fraseId, 'cidade-alerta');
console.log('todos os testes passaram');
