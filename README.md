# Frete Express — apresentação comercial

Site estático em português para apresentar a aquisição integral do projeto Frete Express. Inclui a seção de venda integral, o vídeo fornecido de 83 segundos, apresentação detalhada por escrito, diferenciais e canais de contato. O novo vídeo está em `public/assets/frete-express-venda.mp4`, com reprodução vertical, controles nativos e carregamento inicial apenas dos metadados. As legendas e o vídeo anteriores permanecem como arquivos históricos e não são vinculados ao novo vídeo.

O símbolo da marca em `public/assets/brand.svg` segue a referência fornecida pelo responsável: círculo azul com traço central e seta laranja, sem fundo, aplicado no cabeçalho, no rodapé e no ícone da aba.

A abertura mantém o texto à esquerda e as telas animadas à direita no computador, com empilhamento no celular. Os textos do funcionamento, dos diferenciais e do pacote de aquisição continuam reunidos em um bloco de leitura, com espaçamento reduzido entre seções. A apresentação detalhada de `apresentacao.html` usa coluna única, com índice recolhível acima do texto. A interface preserva o vídeo, a abertura tipográfica animada, o movimento suave das telas, a revelação ao rolar e a galeria com ampliação, navegação por teclado e diálogo nativo. Os efeitos respeitam a preferência de redução de movimento. O WhatsApp comercial funciona também sem JavaScript; o e-mail só é exibido quando informado.

## Estrutura

- `public/index.html`: página principal.
- `public/apresentacao.html`: apresentação completa por escrito.
- `public/styles.css`: estilos responsivos e fontes locais.
- `public/app.js`: navegação, vídeo, diferenciais e contatos.
- `public/assets/`: vídeo, legendas, telas originais e fontes com licença.
- `public/site-data.json`: dados de contato comercial.
- `vercel.json`: publicação estática do diretório `public`, sem dependências ou etapa de build.

## Contatos

Preencher `whatsapp` com o número comercial incluindo país e DDD (somente dígitos) e `email` com o e-mail aprovado para divulgação. Os campos vazios exibem uma indicação honesta de contato em atualização. Nenhum contato pessoal é inferido automaticamente.

O WhatsApp abre uma conversa com mensagem pronta. O e-mail abre o aplicativo de correio com assunto preenchido. Os mesmos dados são usados nas duas páginas.

## Conteúdo

O vídeo e as telas são os materiais existentes do projeto. As telas vêm do design no Figma e contêm dados ilustrativos. O texto identifica o pré-lançamento, as atualizações necessárias a cargo do comprador e as condições de aquisição a negociar. Não são apresentados indicadores de operação ou promessa de faturamento.

## Publicação

Conectar este repositório à Vercel, usar o preset Other e a saída `public`. A configuração está em `vercel.json`; a publicação não exige variáveis de ambiente. Alterações na branch de produção devem gerar novas publicações pela integração Git.

## Seção de venda

A âncora `/#venda` abre a proposta de aquisição; `/#apresentacao` continua levando ao vídeo e `/#aquisicao` reúne a descrição detalhada do pacote. O texto inclui Android/iOS, front-end, back-end, servidor, painel, fluxograma, Figma, landing page e CNPJ. Valor e condições permanecem sob negociação. O WhatsApp comercial é +55 (53) 98102-8334, conforme o vídeo fornecido.
