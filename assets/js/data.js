/* =============================================================================
   NEGA MODAS — DADOS DO SITE
   -----------------------------------------------------------------------------
   Este é o único arquivo que precisa ser editado para cadastrar o catálogo.

   COMO CADASTRAR UM PRODUTO (veja o modelo em MODELO_PRODUTO abaixo):
   1. Adicione um objeto dentro do array PRODUCTS.
   2. "id" deve ser único (pode usar o nome em minúsculas, sem espaços).
   3. "images" recebe os caminhos das fotos reais, ex.: "assets/img/vestido-01.jpg".
      Coloque as fotos dentro da pasta assets/img.
   4. Preço é opcional. Se não houver preço, escreva null — o site exibe
      "Preço sob consulta" e NÃO inventa valores.
   5. Enquanto PRODUCTS estiver vazio, o site usa automaticamente
      DEMO_PRODUCTS (dados apenas ilustrativos, sem preço), só para você
      visualizar o layout. Ao cadastrar produtos reais, o demonstrativo
      desaparece sozinho.

   REGRA DO PROJETO: não inventar preços, produtos, promoções ou fotos.
   ============================================================================= */

/* ---------------------------------------------------------------------------
   1) DADOS REAIS DA LOJA (conforme briefing)
   --------------------------------------------------------------------------- */
const SITE = {
  name: 'Nega Modas',
  tagline: 'Moda evangélica, social e casual — feminino e masculino',
  // WhatsApp em formato internacional (usado nos links wa.me)
  whatsapp: '5538999366026',
  whatsappDisplay: '(38) 99936-6026',
  instagram: 'negamodas__',
  instagramUrl: 'https://instagram.com/negamodas__',
  region: 'Monte Azul – MG e região',
  atendimento: 'Atendemos Monte Azul – MG e região, e também clientes de outras cidades pelo WhatsApp e redes sociais.',
  segmentos: [
    'Moda evangélica feminina e masculina',
    'Moda social',
    'Moda casual'
  ],
  valores: ['Elegância', 'Qualidade', 'Conforto', 'Bom custo-benefício', 'Variedade']
};

/* ---------------------------------------------------------------------------
   2) CATEGORIAS (conforme briefing)
   group: 'feminino' | 'masculino'
   highlight: true  -> aparece em destaque (ex.: Plus Size)
   featured: true   -> aparece na faixa de categorias da Home
   --------------------------------------------------------------------------- */
const CATEGORIES = [
  // ---------- Feminino ----------
  { slug: 'vestidos', name: 'Vestidos', group: 'feminino', featured: true },
  { slug: 'saias', name: 'Saias', group: 'feminino', featured: true },
  { slug: 'blusas-e-camisetes', name: 'Blusas e Camisetes', group: 'feminino', featured: true },
  { slug: 'calcas-femininas', name: 'Calças', group: 'feminino', featured: true },
  { slug: 'moda-evangelica-feminina', name: 'Moda Evangélica', group: 'feminino', featured: true },
  { slug: 'moda-social-feminina', name: 'Moda Social', group: 'feminino', featured: true },
  { slug: 'plus-size-feminino', name: 'Plus Size Feminino', group: 'feminino', featured: true, highlight: true },

  // ---------- Masculino ----------
  { slug: 'camisas-sociais', name: 'Camisas Sociais', group: 'masculino', featured: true },
  { slug: 'calcas-masculinas', name: 'Calças', group: 'masculino', featured: true },
  { slug: 'bermudas', name: 'Bermudas', group: 'masculino', featured: true },
  { slug: 'ternos', name: 'Ternos', group: 'masculino', featured: true },
  { slug: 'gravatas-e-acessorios', name: 'Gravatas e Acessórios', group: 'masculino', featured: true },
  { slug: 'moda-evangelica-masculina', name: 'Moda Evangélica', group: 'masculino', featured: true },
  { slug: 'moda-social-masculina', name: 'Moda Social', group: 'masculino', featured: true },
  { slug: 'plus-size-masculino', name: 'Plus Size Masculino', group: 'masculino', featured: true, highlight: true }
];

/* Coleções / vitrines comerciais. A estrutura já está pronta — basta marcar os
   produtos com a tag correspondente (ex.: isNew: true, onSale: true). */
const COLLECTIONS = [
  { slug: 'novidades', name: 'Novidades' },
  { slug: 'lancamentos', name: 'Lançamentos' },
  { slug: 'promocoes', name: 'Promoções' }
];

/* ---------------------------------------------------------------------------
   3) MODELO DE PRODUTO (referência para cadastro)
   --------------------------------------------------------------------------- */
const MODELO_PRODUTO = {
  id: 'nome-unico-do-produto',
  name: 'Nome do produto',
  category: 'vestidos',            // slug de uma categoria acima
  description: 'Descrição real do produto.',
  images: ['assets/img/foto-01.jpg', 'assets/img/foto-02.jpg'],
  price: null,                     // preço normal, ex.: 129.90  (null = sob consulta)
  salePrice: null,                 // preço promocional, ex.: 99.90 (null = sem promoção)
  sizes: ['P', 'M', 'G', 'GG'],    // [] se não houver
  colors: ['Preto', 'Vermelho'],   // [] se não houver
  stock: null,                      // número (estoque) ou null
  isNew: false,                     // lançamento
  onSale: false,                    // promoção
  featured: false,                  // destaque na Home
  bestSeller: false,                // mais vendido (só marque se realmente for)
  active: true                      // false = não aparece no site
};

/* ---------------------------------------------------------------------------
   4) PRODUTOS REAIS
   Cadastre aqui. Deixe vazio até ter os produtos e as fotos oficiais.
   --------------------------------------------------------------------------- */
const PRODUCTS = [];

/* ---------------------------------------------------------------------------
   5) DADOS DEMONSTRATIVOS (apenas layout — sem preço inventado)
   Usados SOMENTE enquanto PRODUCTS estiver vazio. Não contêm valores de preço
   nem fotos reais: utilizam placeholders neutros para você ver a estrutura.
   --------------------------------------------------------------------------- */
const DEMO_PRODUCTS = [
  { id: 'demo-vestido-01', name: 'Vestido — exemplo de cadastro', category: 'vestidos', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G', 'GG'], colors: ['Preto', 'Vermelho', 'Rosê'], stock: null, isNew: true, onSale: false, featured: true, active: true },
  { id: 'demo-vestido-02', name: 'Vestido longo — exemplo de cadastro', category: 'vestidos', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G'], colors: ['Preto', 'Vinho'], stock: null, isNew: true, onSale: false, featured: true, active: true },
  { id: 'demo-blusa-01', name: 'Blusa — exemplo de cadastro', category: 'blusas-e-camisetes', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G'], colors: ['Branco', 'Rosê'], stock: null, isNew: true, onSale: false, featured: true, active: true },
  { id: 'demo-saia-01', name: 'Saia — exemplo de cadastro', category: 'saias', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G'], colors: ['Preto', 'Rosê'], stock: null, isNew: true, onSale: false, featured: false, active: true },
  { id: 'demo-calca-fem-01', name: 'Calça feminina — exemplo de cadastro', category: 'calcas-femininas', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['38', '40', '42', '44'], colors: ['Preto', 'Azul'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-evangelica-fem-01', name: 'Peça evangélica feminina — exemplo', category: 'moda-evangelica-feminina', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G', 'GG'], colors: ['Preto', 'Nude'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-social-fem-01', name: 'Peça social feminina — exemplo', category: 'moda-social-feminina', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G'], colors: ['Preto', 'Dourado'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-plus-fem-01', name: 'Peça Plus Size Feminino — exemplo', category: 'plus-size-feminino', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['G', 'GG', 'XG'], colors: ['Preto', 'Vermelho'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-plus-fem-02', name: 'Vestido Plus Size — exemplo de cadastro', category: 'plus-size-feminino', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['G', 'GG', 'XG'], colors: ['Vinho', 'Rosê'], stock: null, isNew: true, onSale: false, featured: true, active: true },

  { id: 'demo-camisa-social-01', name: 'Camisa social — exemplo de cadastro', category: 'camisas-sociais', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G', 'GG'], colors: ['Branco', 'Preto'], stock: null, isNew: true, onSale: false, featured: true, active: true },
  { id: 'demo-calca-masc-01', name: 'Calça masculina — exemplo de cadastro', category: 'calcas-masculinas', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['38', '40', '42', '44'], colors: ['Preto', 'Azul-marinho'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-bermuda-01', name: 'Bermuda — exemplo de cadastro', category: 'bermudas', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['38', '40', '42'], colors: ['Preto', 'Cinza'], stock: null, isNew: false, onSale: false, featured: false, active: true },
  { id: 'demo-terno-01', name: 'Terno — exemplo de cadastro', category: 'ternos', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['48', '50', '52'], colors: ['Preto', 'Azul-marinho'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-gravata-01', name: 'Gravata e acessório — exemplo', category: 'gravatas-e-acessorios', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: [], colors: ['Vinho', 'Dourado', 'Preto'], stock: null, isNew: false, onSale: false, featured: false, active: true },
  { id: 'demo-evangelica-masc-01', name: 'Peça evangélica masculina — exemplo', category: 'moda-evangelica-masculina', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G', 'GG'], colors: ['Preto', 'Branco'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-social-masc-01', name: 'Peça social masculina — exemplo', category: 'moda-social-masculina', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['P', 'M', 'G'], colors: ['Preto', 'Grafite'], stock: null, isNew: false, onSale: false, featured: true, active: true },
  { id: 'demo-plus-masc-01', name: 'Peça Plus Size Masculino — exemplo', category: 'plus-size-masculino', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['G', 'GG', 'XG'], colors: ['Preto', 'Cinza'], stock: null, isNew: true, onSale: false, featured: true, active: true },
  { id: 'demo-plus-masc-02', name: 'Camisa Plus Size — exemplo de cadastro', category: 'plus-size-masculino', description: 'Espaço reservado para a descrição real da peça.', images: [], price: null, salePrice: null, sizes: ['G', 'GG', 'XG'], colors: ['Branco', 'Azul'], stock: null, isNew: false, onSale: false, featured: true, active: true }
];

/* ---------------------------------------------------------------------------
   Exportação global (o site lê daqui)
   --------------------------------------------------------------------------- */
window.NEGA = {
  SITE,
  CATEGORIES,
  COLLECTIONS,
  MODELO_PRODUTO,
  PRODUCTS,
  DEMO_PRODUCTS
};
