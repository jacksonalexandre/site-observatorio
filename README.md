# OPGP — Observatório Procopense de Gestão Pública

Site institucional do **Observatório Procopense de Gestão Pública (OPGP)**, organização da sociedade civil, apartidária e independente, que acompanha a gestão municipal de Cornélio Procópio (PR) e ajuda a tornar a informação pública mais fácil de encontrar e compreender.

**Site no ar:** https://observatorioprocopense.com.br/

> O OPGP não é um órgão da Prefeitura e não substitui os canais oficiais do município (site, Portal da Transparência, e-SIC e Ouvidoria).

## Estrutura

Site estático de página única, sem build, sem dependências e sem framework.

```
├── index.html          Página única com todas as seções e metatags de SEO
├── styles.css          Estilos (tokens de cor e tipografia em :root)
├── script.js           Menu, acessibilidade, diretório de temas e validação dos formulários
├── site.webmanifest    Manifesto (nome, cores e ícones)
├── sitemap.xml         Sitemap para mecanismos de busca
├── robots.txt          Regras para robôs de busca
└── assets/
    ├── og-image.png             Miniatura de compartilhamento (1200×630)
    ├── favicon.png              Favicon (128×128)
    ├── apple-touch-icon.png     Ícone iOS (180×180)
    ├── icon-192.png / icon-512.png   Ícones do manifesto
    ├── logo-claro*.png          Logos para fundo claro
    └── logo-escuro*.png         Logos para fundo escuro
```

### Seções da página

| Menu | Âncoras |
| --- | --- |
| Início | `#inicio` |
| O OPGP | `#opgp`, `#o-que-fazemos`, `#planos` |
| Atuação | `#nosso-trabalho`, `#publicacoes`, `#noticias` |
| Transparência | `#transparencia` |
| Controle social | `#onde-encontrar`, `#biblioteca`, `#referencias` |
| Participe | `#participacao`, `#contato` |

## Como rodar localmente

Basta abrir o `index.html` no navegador. Para servir via HTTP (recomendado, para testar o manifesto e caminhos relativos):

```bash
python -m http.server 8000
# acesse http://localhost:8000
```

## Publicação

O site é servido pela **Cloudflare** no domínio [observatorioprocopense.com.br](https://observatorioprocopense.com.br/). O GitHub Pages não é mais usado.

## Funcionalidades

- **Acessibilidade:** link "Ir para o conteúdo", atalhos de teclado (`accesskey` 1, 2 e 3), ajuste do tamanho do texto, modo de alto contraste (preferências salvas no `localStorage`), menu navegável por teclado e marcação ARIA.
- **Diretório "Onde encontrar":** 20 temas baseados nos critérios do Programa Nacional de Transparência Pública (PNTP), com busca que ignora acentos. Os temas ficam no array `temas` em `script.js`.
- **Formulários de voluntariado e contato:** validação acessível no navegador. **O envio ainda não está ativo** — falta integrar um serviço de recebimento.
- **Privacidade:** o site não usa rastreamento publicitário nem analytics.

## SEO e compartilhamento

- Metatags `title`, `description`, `canonical`, `hreflang` e `robots` (indexação liberada).
- Open Graph e Twitter Card com `assets/og-image.png`, para miniatura no WhatsApp, Facebook, LinkedIn, Telegram e X.
- Dados estruturados JSON-LD (`NGO`, `WebSite`, `WebPage` e `FAQPage`) no `<head>`.
- `sitemap.xml`, `robots.txt`, `site.webmanifest` e `theme-color`.

**Ao trocar de endereço**, atualize a URL absoluta (`https://observatorioprocopense.com.br/`) em:

- `index.html` — `canonical`, `hreflang`, `og:*`, `twitter:*` e JSON-LD
- `sitemap.xml`
- `robots.txt`

**Ao alterar o conteúdo:**

- Mudou uma pergunta frequente? Atualize também o bloco `FAQPage` no JSON-LD.
- Mudou a página? Atualize o `<lastmod>` do `sitemap.xml`.
- Trocou a miniatura? Mantenha 1200×630 e menos de 300 KB (limite do WhatsApp). Depois, force a atualização no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) e no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

**Validação:** [Teste de pesquisa aprimorada do Google](https://search.google.com/test/rich-results) e [Google Search Console](https://search.google.com/search-console) (envie o `sitemap.xml`).

## Identidade visual

- Cores principais: azul-marinho `#011331` e âmbar `#f2a900` (todas as cores estão em `:root`, no `styles.css`).
- Fontes: [Lexend](https://fonts.google.com/specimen/Lexend) nos títulos e [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) no texto, via Google Fonts.

## Pendências

- Endereços do Instagram e do Facebook (hoje `#`).
- Integração de envio dos formulários.
- Textos finais de missão, visão e valores, história, governança e documentos institucionais.
- Órgão responsável e link oficial de cada tema do diretório.
- Páginas de Acessibilidade, Privacidade, Política editorial e Direito de resposta.
