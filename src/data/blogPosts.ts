export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  filterCat: string;
  badge: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  bullets: string[];
  faq: { question: string; answer: string }[];
  content: {
    intro: string;
    sections: {
      heading: string;
      text: string[];
      tip?: string;
    }[];
    conclusion: string;
  };
  relatedCategory: {
    title: string;
    desc: string;
    href: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-escolher-manta-ortopedica-cavalo',
    title: 'Como escolher a manta ortopédica ideal para proteger a cernelha do cavalo',
    description: 'A combinação entre feltro de lã prensada 100% virgem e camadas internas de absorção de impacto alivia picos de pressão na coluna vertebral durante provas de velocidade.',
    category: 'Proteção & Dorso',
    filterCat: 'ortopedia',
    badge: 'Proteção & Dorso',
    date: '14 Set 2026',
    readTime: '5 min',
    author: 'Equipe Técnica Indiana Ranch',
    image: '/images/blog/como-escolher-manta-ortopedica-cavalo.avif',
    bullets: [
      'Feltro 3/4" (treino) vs 1" (prova de impacto)',
      'Recortes anatômicos para alívio da cernelha alta',
      'Como higienizar o suor sem compactar a lã'
    ],
    faq: [
      {
        question: 'Qual a espessura ideal de manta para treino e prova?',
        answer: 'Para treinos diários e rotina de campo, a espessura de 3/4 polegada (aprox. 1,9 cm) é ideal pela flexibilidade. Para provas de alto impacto como Três Tambores, Laço em Dupla e Ranch Sorting, recomendamos mantas de 1 polegada (aprox. 2,5 cm) com núcleo de absorção de choque.'
      },
      {
        question: 'Por que a lã virgem 100% natural é superior aos materiais sintéticos?',
        answer: 'A fibra de lã natural possui alta capacidade de respirabilidade e absorção de umidade (retirando o calor excessivo do dorso), além de manter sua elasticidade sem compactar de maneira rígida contra os processos espinhosos do cavalo.'
      },
      {
        question: 'Como lavar a manta sem danificar o feltro?',
        answer: 'Nunca utilize máquina de lavar ou sabão em pó agressivo. Utilize apenas água fria com mangueira de baixa pressão e escova de cerdas macias de borracha no sentido das fibras, secando sempre à sombra em local arejado.'
      }
    ],
    content: {
      intro: 'A manta ortopédica é a peça de conexão mais crítica entre a sela e a musculatura do cavalo. Uma escolha incorreta pode gerar pontos de sobrepressão (focal pressure), resultando em atrofia do trapézio, dor na cernelha, relutância em girar nas balizas e até queda precoce de desempenho.',
      sections: [
        {
          heading: '1. Anatomia da Cernelha e Alívio de Pressão',
          text: [
            'Cavalos de trabalho e alta velocidade possuem cernelhas bem definidas e dorsos musculosos. Quando a manta não possui recorte de cernelha vazado (cutout) ou formato anatômico contornado, o peso do cavaleiro estica o tecido sobre os ossos da cernelha, cortando a circulação sanguínea durante as manobras.',
            'As mantas ortopédicas de padrão profissional da Indiana Ranch contam com reforço lombar anatômico e abertura superior para alívio imediato da cernelha, garantindo passagem de ar contínua mesmo sob aperto máximo do loro e cilha.'
          ],
          tip: 'Dica do Especialista: Ao encilhar o cavalo, antes de apertar a cilha totalmente, puxe suavemente a manta para cima no canal da cernelha, criando uma câmara de ar de 2 a 3 dedos.'
        },
        {
          heading: '2. Espessura: 3/4" vs 1" (Qual a sua modalidade?)',
          text: [
            '• Mantas de 3/4" (19 mm): Indicadas para selas feitas sob medida, cavalos com dorso largo (arredondado) ou para modalidades onde a proximidade e sensibilidade com o animal são prioritárias.',
            '• Mantas de 1" (25 mm): O padrão ouro para Team Roping (Laço em Dupla), Bulldogging e Três Tambores. A espessura extra dissipa a força inercial no momento da puxada do novilho no cabeçote ou no breque brusco dos tambores.'
          ]
        },
        {
          heading: '3. Feltro de Lã Virgem vs Espumas Comuns',
          text: [
            'Muitas mantas de baixo custo utilizam espumas sintéticas de célula fechada (como EVA barato) revestidas por tecidos plásticos. Sob o sol forte da pista, essas espumas "fervem" o suor do animal, provocando queimaduras por atrito e perda de pelos.',
            'O feltro de lã prensada 100% natural respira. As fibras de queratina da lã absorvem até 30% do seu peso em umidade sem parecerem molhadas, expelindo o calor acumulado e mantendo a temperatura muscular estável.'
          ]
        }
      ],
      conclusion: 'Investir em uma manta técnica de alta performance é o seguro mais barato para a longevidade física e o rendimento atlético do seu cavalo.'
    },
    relatedCategory: {
      title: 'Selaria de Elite & Mantas Ortopédicas',
      desc: 'Conheça nossa seleção de mantas profissionais com feltro de lã virgem e tecnologia de alívio de cernelha.',
      href: '/categorias#selaria'
    }
  },
  {
    slug: 'feltro-de-la-vs-neoprene-qual-melhor-manta-cavalo',
    title: 'Feltro de lã virgem vs Neoprene: qual manta esquenta menos e protege melhor o lombo?',
    description: 'Comparativo definitivo entre os dois materiais mais usados em mantas western: dissipação de calor, absorção de choque e durabilidade.',
    category: 'Proteção & Dorso',
    filterCat: 'ortopedia',
    badge: 'Comparativo Técnico',
    date: '16 Set 2026',
    readTime: '6 min',
    author: 'Equipe Técnica Indiana Ranch',
    image: '/images/blog/feltro-de-la-vs-neoprene-qual-melhor-manta-cavalo.avif',
    bullets: [
      'Dissipação térmica: lã natural vs borracha sintética',
      'Absorção de choque sob provas de alta velocidade',
      'Facilidade de lavagem e resistência a mofo'
    ],
    faq: [
      {
        question: 'O neoprene esquenta as costas do cavalo?',
        answer: 'O neoprene tradicional de célula fechada não permite a troca de ar, criando uma barreira térmica que pode superaquecer a musculatura dorsal. Por isso, a Indiana Ranch recomenda feltro de lã 100% virgem para treinos longos e provas sob sol quente.'
      },
      {
        question: 'Mantas híbridas com feltro e núcleo de amortecimento são boas?',
        answer: 'Sim, são consideradas a evolução máxima da selaria western. Elas utilizam feltro natural em contato direto com a pele do cavalo (para respirar) e uma camada interna tecnológica para absorver o impacto da sela.'
      }
    ],
    content: {
      intro: 'Uma das dúvidas mais frequentes de cavaleiros amadores e competidores de ponta é a escolha entre a manta de feltro de lã natural e a manta de neoprene. Embora ambas tenham seu espaço, a resposta sobre qual protege melhor depende diretamente da temperatura de trabalho e da intensidade da prova.',
      sections: [
        {
          heading: '1. Termorregulação e Respirabilidade',
          text: [
            'O lombo do cavalo é uma das maiores massas musculares ativas durante o galope. Quando a temperatura muscular ultrapassa limites seguros, o animal perde potência e cansa mais rápido.',
            'O feltro de lã virgem é um isolante térmico poroso natural: no inverno mantém o calor equilibrado e no calor permite a evaporação contínua do suor. Já o neoprene é um elastômero impermeável que, sem microperfurações técnicas, aprisiona o suor quente contra o pelo do animal.'
          ],
          tip: 'Teste prático: Ao retirar a sela após um treino pesado, o pelo do cavalo sob uma manta de feltro de lã deve apresentar suor homogêneo sem pontos secos (pontos de pressão excessiva) e sem aspecto de "queimado".'
        },
        {
          heading: '2. Capacidade de Memória e Distribuição de Carga',
          text: [
            'O feltro de lã densa possui uma propriedade única de moldagem progressiva: após alguns treinos, ele se adapta à anatomia específica do cavalo e ao formato da armação da sela.',
            'O neoprene, embora tenha excelente retorno elástico imediato, não se conforma às curvas do dorso ao longo do tempo, dependendo exclusivamente da pressão exercida pela cilha.'
          ]
        }
      ],
      conclusion: 'Para provas de alto rendimento, o feltro de lã virgem continua sendo a escolha número 1 dos grandes campeões mundiais da AQHA e ABQM.'
    },
    relatedCategory: {
      title: 'Mantas Ortopédicas em Feltro de Lã',
      desc: 'Modelos profissionais contornados com reforço em couro legítimo e absorção de impacto.',
      href: '/categorias#selaria'
    }
  },
  {
    slug: 'como-medir-tamanho-sela-western-polegadas',
    title: 'Como medir o tamanho da sela western: guia de polegadas para cavaleiro e cavalo',
    description: 'Aprenda a encontrar a medida exata da sela (14", 15", 16") para o seu biotipo e o gullet (abertura de armação) correto para a cernelha do cavalo.',
    category: 'Selaria & Arreios',
    filterCat: 'ortopedia',
    badge: 'Guia de Medição',
    date: '12 Set 2026',
    readTime: '5 min',
    author: 'Mestres Selreiros Indiana Ranch',
    image: '/images/blog/como-medir-tamanho-sela-western-polegadas.avif',
    bullets: [
      'Medição do assento em polegadas (da base do pito ao cantilho)',
      'Tabela de equivalência de peso e altura do cavaleiro',
      'Como checar a abertura de armação (Gullet / FQHB vs SQHB)'
    ],
    faq: [
      {
        question: 'Como medir as polegadas do assento da sela?',
        answer: 'Com uma fita métrica rígida, meça em linha reta desde a base traseira do pito (horn) até a parte interna superior do cantilho (cantle). O valor em centímetros dividido por 2,54 dará o tamanho exato em polegadas.'
      },
      {
        question: 'O que significa FQHB e SQHB na armação da sela?',
        answer: 'FQHB (Full Quarter Horse Bars) possui abertura de 7 polegadas, indicada para cavalos Quarto de Milha com dorso largo e cernelha musculosa. SQHB (Semi Quarter Horse Bars) possui abertura de 6.5 a 6.75 polegadas, indicada para cavalos com cernelha mais alta e dorso mais estreito.'
      }
    ],
    content: {
      intro: 'Comprar uma sela no tamanho incorreto é um dos erros mais comuns e caros no meio equestre. Uma sela pequena aperta a bacia do cavaleiro e projeta o peso sobre a lombar do cavalo; uma sela grande faz o cavaleiro escorregar durante as arrancadas e manobras rápidas.',
      sections: [
        {
          heading: '1. Tabela de Polegadas do Assento para o Cavaleiro',
          text: [
            '• 14 polegadas: Indicada para jovens, crianças e adultos com biotipo magro (até 55 kg).',
            '• 14.5 a 15 polegadas: O tamanho padrão mais versátil para a maioria das amazonas e cavaleiros entre 55 kg e 75 kg.',
            '• 15.5 a 16 polegadas: Ideal para cavaleiros entre 75 kg e 95 kg que buscam conforto em provas de Laço ou longas cavalgadas.',
            '• 16.5 a 17 polegadas: Para cavaleiros acima de 95 kg ou de estatura elevada que necessitam de maior área livre no assento.'
          ],
          tip: 'Regra de ouro: Sentado na sela na posição de montaria, deve sobrar espaço equivalente a dois ou três dedos entre sua coxa e o pito dianteiro da sela.'
        },
        {
          heading: '2. O Encaixe no Lombo do Cavalo (Gullet & Bars)',
          text: [
            'A armação (árvore da sela) deve acompanhar a inclinação dos ombros do cavalo sem pinçar a cartilagem da escápula. Quando posicionada corretamente sobre o dorso sem a manta, a sela deve ter espaço livre de pelo menos 3 dedos entre o arco dianteiro e a cernelha.'
          ]
        }
      ],
      conclusion: 'Na Indiana Ranch, auxiliamos você a escolher a sela sob medida para o seu corpo e para a raça do seu animal com garantia total de conforto.'
    },
    relatedCategory: {
      title: 'Selas Profissionais Western',
      desc: 'Modelos para Tambor, Laço em Dupla, Ranch Sorting e Passeio com armação de alta resistência.',
      href: '/categorias#selaria'
    }
  },
  {
    slug: 'guia-freios-embocaduras-western',
    title: 'Manutenção preventiva de freios e bridões em inox e cobre',
    description: 'Guia completo para lavagem de bocais articulados, inspeção de queixeiras e preservação de rolletes de cobre doce para estimular salivação e contato suave.',
    category: 'Freios & Embocaduras',
    filterCat: 'embocaduras',
    badge: 'Freios & Embocaduras',
    date: '10 Set 2026',
    readTime: '4 min',
    author: 'Equipe Técnica Indiana Ranch',
    image: '/images/blog/guia-freios-embocaduras-western.avif',
    bullets: [
      'Remoção de depósitos de saliva e suplementos',
      'Como verificar rebarbas que machucam a boca',
      'Alinhamento correto da barbela e queixeira'
    ],
    faq: [
      {
        question: 'Qual a vantagem do cobre doce (sweet iron) no bocal do freio?',
        answer: 'O cobre doce oxida de forma natural em contato com o ar e a saliva equina, liberando um sabor adocicado que estimula a salivação profunda e o relaxamento da mandíbula, tornando a comunicação das rédeas muito mais sutil.'
      },
      {
        question: 'Com que frequência devo inspecionar o bocal e as articulações?',
        answer: 'A cada uso deve ser feita uma lavagem rápida com água corrente. Uma inspeção tátil minuciosa deve ser feita semanalmente procurando rebarbas, folgas anormais nos rolletes ou desgastes que possam machucar a comissura labial.'
      }
    ],
    content: {
      intro: 'A embocadura é o canal de comunicação mais direto entre a mão do cavaleiro e a boca do animal. Um freio mal ajustado ou com rebarbas microscópicas na junção metálica gera desconforto severo, cabeceio involuntário e recusa de comandos nas pistas.',
      sections: [
        {
          heading: '1. A Função do Cobre Doce e Rolletes Centrais',
          text: [
            'Nas provas de Ranch Sorting, Rédeas e Team Roping, a suavidade de comandos é indispensável. O ferro doce (sweet iron) combinado com rolletes e incrustações de cobre estimula a mastigação ativa.',
            'Quando o cavalo saliva adequadamente, as barras da boca e a língua permanecem hidratadas, reduzindo a fricção do metal e proporcionando comandos leves sem necessidade de força nas rédeas.'
          ],
          tip: 'Dica Prática: A ferrugem marrom-avermelhada que se forma no ferro doce é esperada e desejada. Não remova com palha de aço abrasiva, apenas lave a saliva após o treino.'
        },
        {
          heading: '2. Ajuste Milimétrico da Barbela / Queixeira',
          text: [
            'Uma queixeira muito apertada transforma um freio suave em um instrumento severo, acionando a alavanca antes que o cavaleiro sequer tensionar a rédea. Já uma queixeira frouxa demais faz a perna do freio girar além do ângulo de 45 graus, perdendo a eficácia do comando.',
            'A regra clássica: ajuste a barbela para permitir a passagem livre de dois dedos entre a fita/corrente e o queixo do cavalo quando o bocal estiver em repouso.'
          ]
        }
      ],
      conclusion: 'Cuidar da embocadura é respeitar o animal e assegurar que toda a técnica de treino seja transmitida com máxima fidelidade nas pistas de prova.'
    },
    relatedCategory: {
      title: 'Freios, Bridões & Embocaduras Profissionais',
      desc: 'Veja nossa linha em aço inoxidável cirúrgico, ferro doce e cobre legítimo importado.',
      href: '/categorias#freios'
    }
  },
  {
    slug: 'cordas-e-lacos-team-roping-cabecoteiro-pezeiro',
    title: 'Classificação de cordas e laços para Team Roping (Cabeçoteiro vs Pezeiro)',
    description: 'Diferenciação precisa entre diâmetro, comprimento e dureza (XXS, XS, S, MS, M, HM) para cada função no brete.',
    category: 'Cordas & Laços',
    filterCat: 'lacos',
    badge: 'Cordas & Laços',
    date: '05 Set 2026',
    readTime: '6 min',
    author: 'Equipe Técnica Indiana Ranch',
    image: '/images/blog/cordas-e-lacos-team-roping-cabecoteiro-pezeiro.avif',
    bullets: [
      'Header: laços mais curtos (30-32 pés) e maleáveis',
      'Heeler: cordas longas (35-37 pés) com corpo rígido',
      'Armazenamento correto em bolsa térmica'
    ],
    faq: [
      {
        question: 'Qual a diferença entre laço de cabeçoteiro e de pezeiro?',
        answer: 'O laço de cabeçoteiro (Header) é mais curto (geralmente entre 30 a 32 pés), mais macio e flexível para facilitar o arremesso rápido na cabeça e chifres. O laço de pezeiro (Heeler) é mais longo (35 a 37 pés), mais pesado e encorpado para se manter aberto no chão até a entrada das patas traseiras.'
      },
      {
        question: 'O que significa a sigla de dureza das cordas?',
        answer: 'XXS (Extra Extra Soft), XS (Extra Soft), S (Soft), MS (Medium Soft), M (Medium), HM (Hard Medium). Quanto mais à direita da escala, mais rígida é a corda e maior a habilidade exigida para controlá-la no ar.'
      }
    ],
    content: {
      intro: 'No Team Roping, a fração de segundo entre a saída do brete e a laçada do boi depende quase que inteiramente do equilíbrio da corda. Uma corda descalibrada ou com dureza incompatível com o estilo do laçador fecha o laço antes da hora ou perde a rotação ideal no giro.',
      sections: [
        {
          heading: '1. O Laço de Cabeçoteiro (Header Ropes)',
          text: [
            'O cabeçoteiro precisa de agilidade imediata. Cordas classificadas como Extra Soft (XS) e Soft (S) de 30 a 31 pés são as mais utilizadas no Brasil.',
            'Elas permitem uma armada rápida, boa empunhadura para o dally no pito da sela e resposta instantânea ao puxar o boi para a curva da esquerda.'
          ]
        },
        {
          heading: '2. O Laço de Pezeiro (Heeler Ropes)',
          text: [
            'Já o pezeiro precisa posicionar a armada no solo milésimos de segundo após o boi saltar no giro. Por isso, utilizam-se cordas Medium Soft (MS) e Medium (M) com 35 a 36 pés de comprimento.',
            'A rigidez superior garante que o laço fique aberto rente à terra sem desmoronar com a poeira da pista até o momento da passada de patas.'
          ],
          tip: 'Armazenamento: Guarde suas cordas sempre esticadas ou em bolsas térmicas com divisórias individuais. O calor excessivo no porta-malas altera a resina e a tensão interna dos fios de nylon e poliéster.'
        }
      ],
      conclusion: 'Na Indiana Ranch você encontra marcas consagradas mundialmente como Willard Rope Co., Fast Back e nossa linha própria calibrada com precisão artesanal.'
    },
    relatedCategory: {
      title: 'Cordas & Laços Profissionais',
      desc: 'Explore nosso estoque com pronta entrega de laços para cabeçoteiro e pezeiro.',
      href: '/categorias#cordas'
    }
  },
  {
    slug: 'passo-a-passo-comprar-selaria-atacado-distribuidora',
    title: 'Como comprar selaria no atacado direto da distribuidora com CNPJ: guia para lojistas',
    description: 'Tudo o que lojistas e donos de casas agropecuárias precisam saber para se cadastrar, acessar preços de fábrica e receber mercadoria com nota fiscal.',
    category: 'Atacado & B2B',
    filterCat: 'b2b',
    badge: 'Guia do Lojista',
    date: '24 Ago 2026',
    readTime: '6 min',
    author: 'Departamento Comercial Indiana Ranch',
    image: '/images/blog/passo-a-passo-comprar-selaria-atacado-distribuidora.avif',
    bullets: [
      'Documentos necessários para cadastro B2B ágil',
      'Condições de pedido mínimo e faturamento fracionado',
      'Logística expressa e rastreamento para todo o Brasil'
    ],
    faq: [
      {
        question: 'Qual o valor do pedido mínimo para comprar no atacado?',
        answer: 'O pedido mínimo para abertura de cadastro no atacado B2B é de R$ 5.000,00 fracionado, permitindo que a sua loja física monte uma grade completa e diversificada com as marcas líderes. Consulte a tabela atualizada no WhatsApp comercial (18) 99665-2244.'
      },
      {
        question: 'A Indiana Ranch atende lojas em outros estados?',
        answer: 'Sim, despachamos diariamente via transportadoras parceiras e frete rodoviário expresso para todas as regiões do Brasil com seguro total de carga.'
      }
    ],
    content: {
      intro: 'Para lojistas do segmento agropecuário, pet shop e selarias, o segredo de uma operação lucrativa está em comprar direto da fonte. Comprar de revendedores intermediários encolhe a margem de lucro e gera atrasos constantes na reposição de produtos mais vendidos.',
      sections: [
        {
          heading: '1. O que é necessário para abrir cadastro B2B',
          text: [
            'O processo é 100% digital e desburocratizado: basta fornecer o Cartão CNPJ ativo no ramo de comércio varejista agropecuário, selaria ou artigos esportivos, juntamente com os dados de contato do comprador responsável.',
            'Nossa equipe analisa e libera o acesso à tabela de preços de atacado em menos de 2 horas úteis.'
          ]
        },
        {
          heading: '2. Suporte Comercial e Treinamento de Vendas',
          text: [
            'Além de fornecer produtos de alta procura, auxiliamos o lojista a montar o mix ideal de acordo com a vocação da sua região (se há maior concentração de laçadores, criadores de cavalos de trabalho ou praticantes de cavalgada).'
          ],
          tip: 'Dica Comercial: Lojas que expõem arreios e mantas em suportes de madeira perto da entrada registram 35% mais vendas por impulso.'
        }
      ],
      conclusion: 'Torne-se um revendedor oficial Indiana Ranch e ofereça aos clientes da sua cidade a melhor marca country do mercado.'
    },
    relatedCategory: {
      title: 'Atacado para Lojistas',
      desc: 'Cadastre sua loja agropecuária e receba nosso catálogo de atacado com margens competitivas.',
      href: '/contato'
    }
  },
  {
    slug: 'gestao-estoque-selaria-lojas-agropecuarias',
    title: 'Gestão de estoque de selaria para lojas agropecuárias e revendas country',
    description: 'Estratégias comprovadas para montar um mix de produtos western de alto giro e margem sólida no atacado.',
    category: 'Atacado & B2B',
    filterCat: 'b2b',
    badge: 'Atacado & B2B',
    date: '20 Ago 2026',
    readTime: '7 min',
    author: 'Departamento Comercial Indiana Ranch',
    image: '/images/blog/gestao-estoque-selaria-lojas-agropecuarias.avif',
    bullets: [
      'Itens de giro contínuo (cabeçadas, rédeas e mantas)',
      'Margens saudáveis sem intermediários',
      'Condições de faturamento direto no CNPJ'
    ],
    faq: [
      {
        question: 'Como se cadastrar como lojista revendedor da Indiana Ranch?',
        answer: 'Basta ter CNPJ ativo no ramo de agropecuária, pet shop, selaria ou vestuário country e solicitar a tabela atacado diretamente pelo nosso WhatsApp B2B oficial (18) 99665-2244.'
      }
    ],
    content: {
      intro: 'Lojas físicas agropecuárias e selarias que inserem um setor de moda country e artigos de montaria de alta qualidade conseguem elevar o ticket médio de compra em mais de 40%, atraindo grande movimento para o balcão e fortalecendo as vendas da loja física.',
      sections: [
        {
          heading: '1. Produtos de Curva A: Giro Contínuo',
          text: [
            'Itens de desgaste natural e reposição frequente como cabeçadas, rédeas de couro, barrigueiras de neoprene e escovas de crina garantem fluxo de caixa constante para o revendedor.',
            'A Indiana Ranch disponibiliza pedidos fracionados no atacado, permitindo que a sua loja mantenha o estoque variado sem imobilizar capital excessivo.'
          ]
        },
        {
          heading: '2. Margens Saudáveis e Procedência',
          text: [
            'Comprar de intermediários encarece o produto final e diminui a rentabilidade da sua loja. Como importadora direta e fabricante desde 1994, entregamos faturamento com nota fiscal integral e margens comerciais competitivas para o revendedor.'
          ]
        }
      ],
      conclusion: 'Abasteça sua loja com a marca que é sinônimo de tradição e confiança há três décadas no Brasil.'
    },
    relatedCategory: {
      title: 'Seja um Revendedor Credenciado',
      desc: 'Solicite a tabela B2B de atacado com condições exclusivas para lojistas e revendas agropecuárias.',
      href: '/contato'
    }
  },
  {
    slug: 'como-cuidar-limpar-arreios-selas-couro-legitimo',
    title: 'Cuidados essenciais com arreios e selas de couro legítimo',
    description: 'Protocolo de hidratação profunda, remoção de sal e suor, e conservação de costuras de sola de búfalo para atravessar décadas.',
    category: 'Conservação de Couro',
    filterCat: 'couro',
    badge: 'Conservação de Couro',
    date: '15 Ago 2026',
    readTime: '4 min',
    author: 'Mestres Selreiros Indiana Ranch',
    image: '/images/blog/como-cuidar-limpar-arreios-selas-couro-legitimo.avif',
    bullets: [
      'Remoção imediata do sal do suor do animal',
      'Hidratação com óleo de mocotó e graxas neutras',
      'Armazenamento em local seco e ventilado'
    ],
    faq: [
      {
        question: 'Pode usar sabão comum para lavar a sela de couro?',
        answer: 'Nunca use detergentes de louça ou sabão alcalino comum, pois eles retiram os óleos naturais do curtimento, ressecando a fibra e provocando trincas irreversíveis. Utilize sabão neutro glicerinado para selaria.'
      }
    ],
    content: {
      intro: 'O couro vegetal e a sola legítima de búfalo utilizados nos arreios da Indiana Ranch são materiais vivos. Quando bem conservados, eles não apenas duram décadas, como ganham uma tonalidade envelhecida única (pátina natural) altamente valorizada.',
      sections: [
        {
          heading: '1. O Inimigo Nº 1: Sal do Suor Equino',
          text: [
            'Após o treino, o sal presente no suor do cavalo se deposita nos loros e estribos. Se não for removido com um pano úmido, os cristais de sal desidratam o couro e enfraquecem as costuras de náilon encerado.'
          ]
        },
        {
          heading: '2. Hidratação Periódica com Óleo Especial',
          text: [
            'A cada 30 a 60 dias, aplique uma fina camada de óleo de mocotó puro ou pasta hidratante para selaria com uma esponja macia, deixando o produto penetrar na sombra por 24 horas antes do próximo uso.'
          ]
        }
      ],
      conclusion: 'Tradição se constrói com cuidado. Um arreamento bem tratado atravessa gerações na lida e nas pistas.'
    },
    relatedCategory: {
      title: 'Equipamentos de Estábulo & Manutenção',
      desc: 'Veja nossa linha de cuidados diários, escovões e acessórios de conservação.',
      href: '/categorias#estabulo'
    }
  }
];
