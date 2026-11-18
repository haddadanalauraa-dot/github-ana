/*
 * Classificações, textos por eixo e frases personalizadas.
 * Tudo aqui é conteúdo editável; a lógica fica em scoring.js.
 */
(function (root) {
  const GQ = (root.GQ = root.GQ || {});

  // Limites: média < limite → categoria (comparação feita com inteiros em scoring.js).
  GQ.categorias = [
    {
      id: 'garantista-raiz',
      faixa: [0, 0.8],
      nome: 'GARANTISTA RAIZ',
      nomeCurto: 'GARANTISTA RAIZ',
      sufixo: '',
      descricao:
        'Você não brinca quando o assunto é limitar o poder de punir. A Constituição é seu ponto de partida, de chegada e, se deixar, também seu papel de parede.',
      perfil:
        'Seu perfil indica forte desconfiança de que o Estado, ao acusar, deve provar tudo, sempre, dentro das regras. Para você, garantias não são favor ao acusado: são o preço de uma Justiça que se pretende legítima. Atenção: garantismo não é defesa de impunidade, e sim a exigência de que punir seja a exceção justificada, não o reflexo automático.',
      caracteristicas: [
        'Trata o devido processo como condição de legitimidade, não como obstáculo',
        'Enxerga a prisão como última ratio',
        'Desconfia de fórmulas vagas como “ordem pública” e “gravidade abstrata”',
        'Considera que absolver na dúvida é o sistema funcionando',
      ],
      fraseEfeito: 'Sem regras para o Estado, não há liberdade para ninguém.',
      tema: { bg: '#0b0b0c', fg: '#f4efe6', acento: '#f4efe6', suave: 'rgba(244,239,230,.18)', estilo: 'noite' },
    },
    {
      id: 'garantista-moderado',
      faixa: [0.8, 1.6],
      nome: 'GARANTISTA MODERADO',
      nomeCurto: 'GARANTISTA MODERADO',
      sufixo: '',
      descricao:
        'Você acredita que o Estado pode punir, mas não de qualquer maneira. Eficiência penal, para você, não é salvo-conduto para atropelar direitos fundamentais, mas também não é palavrão.',
      perfil:
        'Você defende garantias robustas e aceita que a resposta penal é necessária em muitos casos. A pergunta que mais te move não é “ele merece?”, e sim “o Estado seguiu as regras para chegar a isso?”. Admite exceções, desde que motivadas, controladas e explicadas.',
      caracteristicas: [
        'Aceita punição, mas exige fundamentação concreta',
        'Busca equilíbrio entre garantias e resposta estatal',
        'Prefere reformas graduais a respostas de impacto',
        'Costuma ser a pessoa do grupo que diz “depende, vamos ver os autos”',
      ],
      fraseEfeito: 'Punir pode ser necessário. Punir mal é sempre evitável.',
      tema: { bg: '#1c1b19', fg: '#f4efe6', acento: '#d9c9a3', suave: 'rgba(217,201,163,.22)', estilo: 'grafite' },
    },
    {
      id: 'equilibrado',
      faixa: [1.6, 2.4],
      nome: 'EQUILIBRADO (OU EM CRISE EXISTENCIAL)',
      nomeCurto: 'EQUILIBRADO',
      sufixo: '(ou em crise existencial)',
      descricao:
        'Você tenta conciliar garantias individuais e segurança pública. Dependendo do caso concreto, defende a liberdade ou uma resposta bem mais firme. Sua coerência? Depende do réu e do dia da semana.',
      perfil:
        'Seu perfil é intermediário: você enxerga razões legítimas em ambos os lados e resiste a respostas simples. Isso pode ser sofisticação jurídica ou apenas o hábito de responder “depende” em prova oral. O mais provável é uma mistura das duas coisas.',
      caracteristicas: [
        'Sente o peso dos dois lados em quase todo dilema',
        'Muda de opinião conforme o caso concreto',
        'Desconfia de teses absolutas, de qualquer lado',
        'Provavelmente já discutiu com si mesmo no chuveiro',
      ],
      fraseEfeito: 'Entre a Constituição e o clamor popular, você ainda está calculando.',
      tema: { bg: '#f1ece1', fg: '#0e0e0e', acento: '#0e0e0e', suave: 'rgba(14,14,14,.16)', estilo: 'papel' },
    },
    {
      id: 'punitivista-moderado',
      faixa: [2.4, 3.2],
      nome: 'PUNITIVISTA MODERADO',
      nomeCurto: 'PUNITIVISTA MODERADO',
      sufixo: '',
      descricao:
        'Você entende que as garantias são importantes, mas acredita que o sistema penal precisa responder com mais firmeza. Respeita o devido processo, desde que ele não demore tanto a chegar ao fim.',
      perfil:
        'Você valoriza segurança, previsibilidade e resposta estatal efetiva. Aceita regras do jogo, mas tende a acreditar que, em casos graves, elas devem ser aplicadas com sensibilidade à realidade da criminalidade e às vítimas. Atenção: defender a aplicação da lei penal não é, por si só, punitivismo.',
      caracteristicas: [
        'Prioriza efetividade e proteção às vítimas',
        'Aceita flexibilizar formalidades em casos graves',
        'Enxerga a pena como resposta e também como mensagem',
        'Costuma ser a voz do “mas e a vítima?” na discussão',
      ],
      fraseEfeito: 'Garantias são importantes, desde que não virem pretexto.',
      tema: { bg: '#e8dccc', fg: '#14100e', acento: '#b3281f', suave: 'rgba(179,40,31,.28)', estilo: 'papel-vermelho' },
    },
    {
      id: 'punitivista-raiz',
      faixa: [3.2, 4.01],
      nome: 'PUNITIVISTA RAIZ',
      nomeCurto: 'PUNITIVISTA RAIZ',
      sufixo: '',
      descricao:
        'O Estado precisa punir, e você não tem muita paciência com o que considera excesso de garantias. Seu princípio favorito é o da duração razoável do processo, de preferência curta e terminando em condenação.',
      perfil:
        'Seu perfil indica forte prioridade para a resposta penal firme, a retribuição e a proteção da sociedade, mesmo quando isso exige relativizar formalidades. É uma posição que existe e é defendida por muita gente, e por isso mesmo deve enfrentar o argumento garantista: regras que valem só para inocentes não são regras.',
      caracteristicas: [
        'Acredita que a pena deve ser firme, previsível e visível',
        'Vê formalismo onde outros veem garantia',
        'Prioriza a vítima e a segurança coletiva',
        'Pode adorar dizer “bandido bom é bandido preso”. Pior: com juridiquês',
      ],
      fraseEfeito: 'Se a lei não pune, para que serve a lei?',
      tema: { bg: '#c9372b', fg: '#f6efe2', acento: '#f6efe2', suave: 'rgba(246,239,226,.28)', estilo: 'vermelho' },
    },
  ];

  // Texto por eixo: [0] garantista, [1] intermediário, [2] punitivista
  GQ.textoEixos = {
    processo: [
      'No processo, você trata as regras como parte do próprio resultado: prova obtida fora delas não vale, e a dúvida razoável favorece o acusado.',
      'No processo, você oscila: aceita flexibilizar formalidades em alguns casos, mas não abre mão de um núcleo mínimo de garantias.',
      'No processo, você prioriza a efetividade: para você, formalidades não devem impedir que a verdade dos fatos chegue à condenação.',
    ],
    penas: [
      'Na política criminal, você desconfia do aumento de penas e da prisão como resposta padrão; aposta em alternativas, execução individualizada e ressocialização.',
      'Na política criminal, você combina proporcionalidade com firmeza: aceita penas duras onde há razão concreta, sem enxergar nelas uma solução universal.',
      'Na política criminal, você acredita que a resposta penal precisa ser firme e previsível: pena também comunica que o Estado leva a lei a sério.',
    ],
    poder: [
      'Quanto aos limites do poder, você faz poucas concessões: privacidade, domicílio e integridade valem mesmo quando atrapalham a investigação.',
      'Quanto aos limites do poder, você tolera exceções motivadas e controladas, desde que haja fundamentação e fiscalização.',
      'Quanto aos limites do poder, você tende a dar mais margem ao Estado e a quem enfrenta o crime, mesmo com algum custo à privacidade ou à proporcionalidade.',
    ],
  };

  GQ.niveis = [
    'Fortemente garantista',
    'Tendência garantista',
    'Posição intermediária',
    'Tendência punitivista',
    'Fortemente punitivista',
  ];

  /*
   * Frases personalizadas, avaliadas em ordem; vence a primeira cujo `quando` for verdadeiro.
   * ctx = { media, eixos: {processo, penas, poder}, resp: {idPergunta: pontos}, desvio, categoria }
   * `desvio` = desvio-padrão das respostas (alto = incoerência entre casos).
   */
  GQ.frases = [
    {
      id: 'cidade-alerta',
      quando: (c) => c.media < 1.6 && c.resp.clamor >= 3,
      texto: 'Você é garantista até o caso aparecer no Cidade Alerta.',
    },
    {
      id: 'garantista-processo-linha-dura-pena',
      quando: (c) => c.eixos.processo <= 1.2 && c.eixos.penas >= 2.4,
      texto: 'Garantista no processo, linha-dura na pena: exige prova impecável para condenar, mas depois não quer conversa.',
    },
    {
      id: 'pena-branda-processo-agil',
      quando: (c) => c.eixos.penas <= 1.2 && c.eixos.processo >= 2.4,
      texto: 'Pena humana, processo ligeiro: você quer condenar depressa e punir com delicadeza. Confie no sistema, ele adora essa combinação.',
    },
    {
      id: 'depende-do-reu',
      quando: (c) => c.desvio >= 1.45,
      texto: 'Você acredita no devido processo legal, mas depende do réu.',
    },
    {
      id: 'sobrenome',
      quando: (c) => c.media < 0.5,
      texto: 'A presunção de inocência é seu sobrenome.',
    },
    {
      id: 'poder-alto-garantista',
      quando: (c) => c.media < 1.6 && c.eixos.poder <= 0.6,
      texto: 'Para você, até o flagrante precisa de mandado: o Estado entra na sua casa só se a Constituição abrir a porta.',
    },
    {
      id: 'entre-constituicao-e-clamor',
      quando: (c) => c.media >= 1.6 && c.media < 2.4,
      texto: 'Entre a Constituição e o clamor popular, você já escolheu seu lado. Só falta contar para o grupo da faculdade.',
    },
    {
      id: 'punitivista-raiz',
      quando: (c) => c.media >= 3.2,
      texto: 'Seu princípio favorito é a duração razoável do processo, de preferência terminando em condenação.',
    },
    {
      id: 'punitivista-moderado',
      quando: (c) => c.media >= 2.4,
      texto: 'Você respeita o devido processo, mas espera que ele chegue logo ao veredicto.',
    },
    {
      id: 'garantista-moderado',
      quando: (c) => c.media >= 0.8,
      texto: 'Você aceita que o Estado puna, desde que ele saiba exatamente onde estão as regras.',
    },
    {
      id: 'garantista-raiz',
      quando: () => true,
      texto: 'A Constituição não é só seu ponto de partida: é seu ponto final, seu ponto e vírgula e seu papel de parede.',
    },
  ];
})(typeof window !== 'undefined' ? window : globalThis);
