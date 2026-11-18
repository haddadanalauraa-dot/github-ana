/*
 * Banco de perguntas — edite/amplie aqui.
 *
 * Cada pergunta:
 *   id     identificador único (usado pelas regras de frases em results.js)
 *   eixo   'processo' | 'penas' | 'poder'
 *   tema   rótulo exibido acima do enunciado
 *   texto  situação hipotética / dilema
 *   opcoes [{ id, texto, pontos }]   pontos: 0 (garantista) … 4 (punitivista)
 *
 * A ordem das alternativas é embaralhada a cada partida. A pontuação mede a
 * SUBSTÂNCIA da posição (ex.: em "poder", responsabilizar com rigor o agente
 * abusivo é posição garantista; admitir reação letal contra quem foge com um
 * caixa é posição de maior tolerância à violência, logo mais punitivista).
 *
 * Para usar só parte do banco em cada partida, ajuste GQ.config.perguntasPorPartida.
 */
(function (root) {
  const GQ = (root.GQ = root.GQ || {});

  GQ.config = { perguntasPorPartida: null }; // null = usa todas

  GQ.eixos = {
    processo: { nome: 'Garantias processuais' },
    penas: { nome: 'Política criminal e penas' },
    poder: { nome: 'Limites do poder punitivo do Estado' },
  };

  GQ.questions = [
    {
      id: 'preventiva',
      eixo: 'processo',
      tema: 'Prisão preventiva',
      texto:
        'Homicídio qualificado. Câmeras e testemunhas apontam para o suspeito, que é primário, tem endereço fixo e não ameaçou ninguém. O delegado representa pela preventiva “em razão da gravidade do fato”. Como você decide?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Indefiro. Gravidade abstrata não é fundamento cautelar; se algo for necessário, há as medidas do art. 319 do CPP.' },
        { id: 'b', pontos: 2, texto: 'Indefiro a preventiva, mas imponho monitoramento eletrônico e recolhimento domiciliar: o caso exige uma resposta imediata do Estado.' },
        { id: 'c', pontos: 3, texto: 'Decreto. A brutalidade concreta da execução revela periculosidade e risco à ordem pública, ainda que não haja antecedentes.' },
        { id: 'd', pontos: 4, texto: 'Decreto. Deixar solto quem pratica crime dessa natureza desmoraliza a Justiça e abala a confiança da sociedade.' },
      ],
    },
    {
      id: 'reincidencia',
      eixo: 'penas',
      tema: 'Reincidência',
      texto:
        'Réu reincidente é condenado por furto de um celular, sem violência ou grave ameaça. O Código Penal prevê a reincidência como agravante. Qual deve ser o peso dela?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Nenhum. Punir mais por algo já punido é bis in idem disfarçado: a pessoa responde por seu passado, não pelo fato julgado.' },
        { id: 'b', pontos: 1, texto: 'A agravante é constitucional, mas o peso deve ser mínimo em crimes sem violência, preservando alternativas à prisão.' },
        { id: 'c', pontos: 3, texto: 'Peso relevante: quem reitera mostra que a resposta anterior não foi suficiente e merece reprovação maior.' },
        { id: 'd', pontos: 4, texto: 'Peso máximo, com regime inicial mais gravoso e sem benefícios, mesmo sem violência: reincidência é desprezo pela Justiça.' },
      ],
    },
    {
      id: 'legitima-defesa',
      eixo: 'poder',
      tema: 'Legítima defesa',
      texto:
        'Comerciante assaltado pela terceira vez dispara contra o assaltante armado que corre para a rua com o dinheiro do caixa. O assaltante morre. Há controvérsia sobre a atualidade da agressão e a proporcionalidade da reação. Qual a sua leitura?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Homicídio. Com a fuga, a agressão cessou; a vida de quem foge vale mais que o caixa. O contexto emocional pode reduzir a pena, não afastar o crime.' },
        { id: 'b', pontos: 1, texto: 'Houve legítima defesa no início, mas a reação se tornou desproporcional: excesso punível, com pena fortemente atenuada.' },
        { id: 'c', pontos: 3, texto: 'Não é fácil enquadrar como legítima defesa, mas o medo de uma vítima reiterada torna inexigível conduta diversa: não deve haver condenação.' },
        { id: 'd', pontos: 4, texto: 'Legítima defesa plena. Quem assalta armado assume o risco; não se pode exigir que a vítima calcule proporcionalidade em segundos.' },
      ],
    },
    {
      id: 'busca-pessoal',
      eixo: 'processo',
      tema: 'Busca pessoal',
      texto:
        'Policiais veem um rapaz desviar o olhar ao avistar a viatura e o abordam por “atitude suspeita”. Na busca pessoal, encontram dois quilos de droga. Nenhum outro elemento prévio é descrito. E a prova?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Ilícita. Sem fundada suspeita concreta (art. 244 do CPP), a busca é arbitrária, e o resultado não a convalida.' },
        { id: 'b', pontos: 1, texto: 'Em regra nula; admito apenas se a suspeita for descrita de forma objetiva e verificável (denúncia prévia, local, conduta específica).' },
        { id: 'c', pontos: 3, texto: 'Válida. O resultado confirma que a intuição policial tinha razão de ser; a experiência da atividade também conta.' },
        { id: 'd', pontos: 4, texto: 'Válida. Exigir motivação detalhada da suspeita paralisa o policiamento preventivo e premia o traficante.' },
      ],
    },
    {
      id: 'aumento-penas',
      eixo: 'penas',
      tema: 'Política criminal',
      texto:
        'O Congresso discute endurecer as penas de um crime patrimonial violento muito frequente na sua cidade. Você acredita que aumentar penas é um bom caminho para reduzir esse crime?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Não. A certeza de ser descoberto dissuade mais que a severidade da pena; aumentar penas é gesto simbólico que agrava a superlotação.' },
        { id: 'b', pontos: 1, texto: 'Efeito limitado. O foco deve ser a elucidação dos crimes; só aceitaria ajustes pontuais onde a pena seja desproporcionalmente baixa.' },
        { id: 'c', pontos: 3, texto: 'Sim, em crimes específicos: penas baixas demais estimulam a reiteração e comunicam leniência do Estado.' },
        { id: 'd', pontos: 4, texto: 'Sim. Penas mais longas retiram o autor de circulação e fazem a retribuição ser, no mínimo, proporcional ao mal causado.' },
      ],
    },
    {
      id: 'domicilio',
      eixo: 'poder',
      tema: 'Inviolabilidade domiciliar',
      texto:
        'Após denúncia anônima de tráfico numa casa, policiais veem um homem sair, avistar a viatura e voltar correndo para dentro. Entram sem mandado. Encontram drogas e balança de precisão. Como você avalia o ingresso?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Ilegal. Denúncia anônima e fuga para dentro de casa não bastam como “fundadas razões” de flagrante; a casa é asilo inviolável.' },
        { id: 'b', pontos: 2, texto: 'Depende da prova: se houve campana prévia ou filmagem da diligência e motivos objetivos, valido; do contrário, anulo.' },
        { id: 'c', pontos: 3, texto: 'Legal. Tráfico é crime permanente, o flagrante persiste enquanto a droga estiver lá, e o achado confirma a justa causa.' },
        { id: 'd', pontos: 4, texto: 'Legal. A inviolabilidade do domicílio não pode servir de escudo para o crime organizado dentro da comunidade.' },
      ],
    },
    {
      id: 'confissao-informal',
      eixo: 'processo',
      tema: 'Direito ao silêncio',
      texto:
        'No carro da polícia, sem advogado e sem ser avisado do direito ao silêncio, o preso confessa informalmente. Em juízo, nega tudo. Os policiais depõem sobre o que ouviram. Qual o valor da confissão informal?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Nenhum. Confissão obtida sem aviso do silêncio é ilícita, e o relato dos policiais sobre ela não pode ser usado como prova.' },
        { id: 'b', pontos: 1, texto: 'Não sustenta condenação por si só, mas pode orientar a investigação para obter provas independentes.' },
        { id: 'c', pontos: 3, texto: 'Os policiais são testemunhas como quaisquer outras; o que ouviram é prova válida a ser valorada pelo juiz.' },
        { id: 'd', pontos: 4, texto: 'É das provas mais fortes que existem. O aviso do silêncio, em flagrante, é formalidade que não pode apagar a espontaneidade.' },
      ],
    },
    {
      id: 'maioridade',
      eixo: 'penas',
      tema: 'Maioridade penal',
      texto:
        'Um adolescente de 17 anos participa de um latrocínio. O caso reabre o debate sobre a maioridade penal (art. 228 da Constituição). Qual a sua posição?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Manter os 18 anos. O art. 228 é garantia fundamental (tese defendida como cláusula pétrea); o problema é a execução precária das medidas socioeducativas.' },
        { id: 'b', pontos: 1, texto: 'Manter os 18 anos, mas rever o ECA para ampliar o prazo máximo de internação em atos infracionais gravíssimos.' },
        { id: 'c', pontos: 3, texto: 'Reduzir para 16 anos apenas para crimes violentos e hediondos, com cumprimento separado dos adultos.' },
        { id: 'd', pontos: 4, texto: 'Reduzir para 16 anos em geral: quem tem discernimento para votar tem discernimento para responder como adulto.' },
      ],
    },
    {
      id: 'prova-ilicita',
      eixo: 'poder',
      tema: 'Provas ilícitas',
      texto:
        'Um detetive particular, contratado pela empresa, invade o e-mail pessoal de um funcionário e descobre provas aparentemente irrefutáveis de um desvio milionário. A empresa entrega tudo ao Ministério Público. E agora?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Inadmissível. A vedação do art. 5º, LVI, da Constituição vale mesmo contra a verdade; derivadas também caem.' },
        { id: 'b', pontos: 1, texto: 'Em regra inadmissível para condenar; a prova ilícita só poderia ser aceita excepcionalmente em favor do acusado.' },
        { id: 'c', pontos: 3, texto: 'Pela proporcionalidade, admito: o crime é grave e a prova inequívoca; pune-se à parte quem invadiu o e-mail.' },
        { id: 'd', pontos: 4, texto: 'Admito sem hesitar. A prova é verdadeira; a ilicitude do meio é problema de quem a obteve, não do processo.' },
      ],
    },
    {
      id: 'clamor',
      eixo: 'processo',
      tema: 'In dubio pro reo',
      texto:
        'Em um caso de enorme repercussão, o júri absolve o réu por insuficiência de provas. A mídia, as redes e a família da vítima pedem uma resposta. Como você reage?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Como o sistema funcionando. In dubio pro reo é regra de julgamento: absolver na dúvida dói, mas é o preço de não condenar inocentes.' },
        { id: 'b', pontos: 1, texto: 'Respeito a decisão, mas defendo o direito de a acusação recorrer nos termos da lei, como em qualquer outro caso.' },
        { id: 'c', pontos: 3, texto: 'Respeito formal, mas penso que se exige prova “perfeita” demais; indícios fortes deveriam ser valorados com mais ousadia.' },
        { id: 'd', pontos: 4, texto: 'Sinal de que as regras probatórias protegem demais o réu. Em casos graves, elas precisam ser flexibilizadas.' },
      ],
    },
    {
      id: 'execucao',
      eixo: 'penas',
      tema: 'Execução penal',
      texto:
        'Condenado por tráfico cumpre pena em unidade superlotada, sem camas para todos, em condições que o próprio Estado reconhece como degradantes. O que o Judiciário deve fazer?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Reconhecer a ilegalidade da pena cumprida assim e compensá-la, inclusive com redução do tempo de cumprimento.' },
        { id: 'b', pontos: 1, texto: 'Priorizar soluções estruturais: mutirões, monitoramento eletrônico e progressões fundamentadas, sem soltura automática.' },
        { id: 'c', pontos: 3, texto: 'Cobrar o Executivo por vagas, mas manter a pena: a superlotação é problema de política pública, não motivo para relativizar a condenação.' },
        { id: 'd', pontos: 4, texto: 'Manter tudo como está. Diante das vítimas, o conforto de quem delinquiu é preocupação secundária.' },
      ],
    },
    {
      id: 'custodia',
      eixo: 'poder',
      tema: 'Audiência de custódia',
      texto:
        'Na audiência de custódia, o preso em flagrante exibe lesões e diz que apanhou dos policiais. Os policiais afirmam que ele “resistiu à prisão”. O que fazer?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Determinar apuração rigorosa e, se confirmada, responsabilização severa do agente; prova obtida sob violência é contaminada.' },
        { id: 'b', pontos: 1, texto: 'Mandar periciar e encaminhar para apuração, mantendo a prisão se o flagrante for formalmente regular.' },
        { id: 'c', pontos: 3, texto: 'Sem prova clara de agressão, prevalece a palavra dos policiais; a lesão pode ser da própria resistência.' },
        { id: 'd', pontos: 4, texto: 'Alegar violência é tática de defesa corriqueira; a custódia, como funciona, serve mais para soltar do que para apurar.' },
      ],
    },
    {
      id: 'reconhecimento',
      eixo: 'processo',
      tema: 'Reconhecimento de pessoas',
      texto:
        'Num roubo, a vítima “reconhece” o réu por uma foto enviada pela polícia no WhatsApp, sem seguir o procedimento do art. 226 do CPP. O réu nega, e não há outra prova. Condenar?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Não. Reconhecimento irregular é inválido e não se convalida nem se repetido em juízo; sem outra prova, absolvição.' },
        { id: 'b', pontos: 1, texto: 'É elemento frágil que exige corroboração independente; sem ela, absolvo.' },
        { id: 'c', pontos: 3, texto: 'A palavra firme da vítima é a principal prova em crimes patrimoniais; a irregularidade enfraquece, mas não impede condenar.' },
        { id: 'd', pontos: 4, texto: 'Sim. Os requisitos do art. 226 são mera recomendação; o que importa é o convencimento motivado do juiz.' },
      ],
    },
    {
      id: 'maternidade',
      eixo: 'penas',
      tema: 'Individualização da pena',
      texto:
        'Mulher primária, mãe de crianças pequenas, é condenada por pequeno tráfico, sem armas e sem vínculo com organização criminosa. Qual a resposta penal mais adequada?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Substituição ou regime domiciliar: prisão aqui causa mais dano (inclusive aos filhos) do que benefício à sociedade.' },
        { id: 'b', pontos: 1, texto: 'Domiciliar na fase provisória e regime aberto ou semiaberto na condenação, com acompanhamento e atenção aos filhos.' },
        { id: 'c', pontos: 3, texto: 'Regime fechado. Benefícios a mães podem estimular o recrutamento de mulheres como “mulas” do tráfico.' },
        { id: 'd', pontos: 4, texto: 'Pena sem distinção. Maternidade não pode virar salvo-conduto para o crime.' },
      ],
    },
    {
      id: 'geolocalizacao',
      eixo: 'poder',
      tema: 'Dados e privacidade',
      texto:
        'Sem suspeito identificado em um latrocínio, a polícia pede quebra de sigilo dos dados de todos os celulares que passaram num raio de 500 metros do local, na hora do crime. O que você decide?',
      opcoes: [
        { id: 'a', pontos: 0, texto: 'Indefiro. Vigilância indiscriminada de pessoas inocentes é mandado genérico, incompatível com a Constituição.' },
        { id: 'b', pontos: 2, texto: 'Defiro apenas de forma restrita: área e horário mínimos, dados anonimizados e descarte imediato do que não for relevante.' },
        { id: 'c', pontos: 3, texto: 'Defiro. Em crimes graves, a privacidade de quem estava no local cede à elucidação do crime.' },
        { id: 'd', pontos: 4, texto: 'Defiro, e isso devia ser rotina: usar todos os dados disponíveis é a forma de reduzir a impunidade.' },
      ],
    },
  ];
})(typeof window !== 'undefined' ? window : globalThis);
