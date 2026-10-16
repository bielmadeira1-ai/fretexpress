# Frete Express — apresentação comercial

Site estático em português para apresentar a aquisição integral do projeto Frete Express. Inclui vídeo completo de 94 segundos, capítulos navegáveis, legendas, apresentação por escrito, diferenciais e canais de contato.

A página principal tem um único resumo, vídeo, telas originais e contato. A explicação completa fica em `apresentacao.html`. A interface preserva a abertura tipográfica animada, o movimento suave das telas, a revelação ao rolar e a galeria com ampliação, navegação por teclado e diálogo nativo. Os efeitos respeitam a preferência de redução de movimento. O WhatsApp comercial funciona também sem JavaScript; o e-mail só é exibido quando informado.

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
