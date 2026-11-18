# O quão garantista você é?

Quiz recreativo de Direito Penal e Processo Penal. Site estático, sem build e sem dependências:
abra `index.html` no navegador ou sirva a pasta (`python3 -m http.server`).

## Estrutura
- `index.html` — telas (intro, perguntas, resultado)
- `css/styles.css` — identidade visual e responsividade
- `js/data/questions.js` — **banco de perguntas** (edite/amplie aqui; 15 perguntas, 5 por eixo)
- `js/data/results.js` — categorias, textos por eixo e frases personalizadas
- `js/scoring.js` — média, eixos, categoria e frase (sem DOM)
- `js/card.js` — cartão de resultado em canvas (1080×1350)
- `js/app.js` — fluxo, compartilhamento (Web Share com arquivo, com fallback) e download
- `test/scoring.test.js` — `node test/scoring.test.js`

## Pontuação
Cada alternativa vale 0 (garantista) a 4 (punitivista) conforme a **substância** da posição.
Média < 0,8 Garantista raiz · < 1,6 Moderado · < 2,4 Equilibrado · < 3,2 Punitivista moderado · ≥ 3,2 Punitivista raiz.
Eixos: garantias processuais, política criminal e penas, limites do poder punitivo.

Para ampliar o banco, adicione perguntas e use `GQ.config.perguntasPorPartida` (ex.: 15) para sortear.
