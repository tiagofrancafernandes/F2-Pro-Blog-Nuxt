# 🚀 Deployment Guide

Guia para deployar Tiago França Blog em diferentes plataformas.

## 📋 Pre-Deployment Checklist

- [ ] `pnpm build` passa sem erros
- [ ] Todos os links funcionam
- [ ] Dark mode funciona
- [ ] Responsividade testada (mobile/tablet/desktop)
- [ ] SEO meta tags presentes
- [ ] Environment variables configuradas
- [ ] .env.local não commitado (está em .gitignore)

## 🔧 Build

Todos os deployments usam:

```bash
pnpm install
pnpm build
```

Isso gera `/.output/public` — pasta estática pronta para servir.

---

## ☁️ Vercel (Recomendado)

**Melhor para:** Nuxt, performance, CI/CD automático, preview URLs.

### 1. Conectar Repositório

```bash
# Login
vercel login

# Link projeto
vercel link
```

Ou via [vercel.com/new](https://vercel.com/new) — conectar GitHub repo.

### 2. Configurar Environment Variables

**Vercel Console → Settings → Environment Variables:**

```env
NUXT_PUBLIC_SITE_URL=https://seu-dominio.com
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=Explore artigos sobre desenvolvimento...
NUXT_PUBLIC_TWITTER_HANDLE=@seu_twitter (optional)
NUXT_PUBLIC_GITHUB_URL=https://github.com/seu-usuario (optional)
```

### 3. Deploy

**Automático:**
- Toda vez que fazer push em `main`, redeploy automático

**Manual:**
```bash
vercel --prod
```

**Result:**
- URL automática: `seu-projeto.vercel.app`
- Custom domain: Configurar em Vercel Console

---

## 🌐 Netlify

**Melhor para:** JAM Stack, forms, serverless functions.

### 1. Conectar Repositório

Via [app.netlify.com](https://app.netlify.com/) → "New site from Git"

Selecionar GitHub repo, autorizar Netlify.

### 2. Configurar Build

**Build settings:**
- Build command: `pnpm build`
- Publish directory: `.output/public`
- Node version: 18

### 3. Environment Variables

**Netlify Console → Site settings → Build & deploy → Environment:**

```env
NUXT_PUBLIC_SITE_URL=https://seu-dominio.com
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=...
```

### 4. Deploy

Automático ao fazer push em `main`.

Manual:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.output/public
```

---

## 🐙 GitHub Pages

**Melhor para:** Projetos open source, sem custo.

### 1. Configurar Repository

**Settings → Pages:**
- Source: Deploy from branch
- Branch: `main` (ou sua branch)
- Folder: `/root`

### 2. Build & Deploy

Adicionar workflow `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm build

      - uses: actions/upload-pages-artifact@v2
        with:
          path: '.output/public'

      - uses: actions/deploy-pages@v1
```

**Actions → Deploy to GitHub Pages → Enable**

### 3. Custom Domain (Opcional)

**Settings → Pages → Custom domain:**
- Adicionar seu domínio
- Configurar DNS (CNAME → seu-repo.github.io)

---

## 🏠 Self-Hosted (VPS/Servidor Próprio)

**Melhor para:** Controle total, servidor existente.

### 1. Preparar Servidor

```bash
# SSH no servidor
ssh user@seu-servidor.com

# Instalar Node 18+
curl https://nodejs.org/dist/v18.0.0/node-v18.0.0-linux-x64.tar.xz | tar xJ -C /usr/local

# Instalar pnpm
npm install -g pnpm
```

### 2. Deploy via Git

```bash
# Clonar repo
git clone https://seu-repo.git
cd vue-blog-system--rapid-developers-inspired

# Setup
pnpm install
cp .env.production .env.local  # Configurar env

# Build
pnpm build
```

### 3. Servir com PM2

```bash
# Instalar PM2
npm install -g pm2

# Start
pm2 start ".output/server/index.mjs" --name "blog"

# Salvar
pm2 startup
pm2 save
```

### 4. Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/blog
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable
ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 5. SSL (Let's Encrypt)

```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com
```

---

## 📦 Docker

**Melhor para:** Containerização, orquestração (Kubernetes).

### 1. Criar Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.output .output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### 2. Build & Run

```bash
# Build
docker build -t blog:latest .

# Run local
docker run -p 3000:3000 \
  -e NUXT_PUBLIC_SITE_URL=https://seu-dominio.com \
  -e NUXT_PUBLIC_BLOG_TITLE="Tiago França" \
  blog:latest

# Push to registry
docker tag blog:latest seu-username/blog:latest
docker push seu-username/blog:latest
```

---

## 🔒 Environment Variables por Ambiente

### Local Development
```env
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=...
```

### Staging
```env
NUXT_PUBLIC_SITE_URL=https://staging.seu-dominio.com
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=...
```

### Production
```env
NUXT_PUBLIC_SITE_URL=https://seu-dominio.com
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=...
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

---

## 🚨 Troubleshooting

### Build falha com "pnpm store error"
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Páginas 404 após deploy
- Verificar se `/.output/public` foi publicado
- Vercel/Netlify: Conferir "Publish directory"
- GitHub Pages: Workflow rodou com sucesso?

### Dark mode não funciona
- Verificar `.env`: `NUXT_PUBLIC_` vars carregadas?
- Console: Erros de JavaScript?
- Clear cache do navegador

### Imagens não carregam
- picsum.photos funciona? Testar URL direto
- CORS? (picsum.photos permite, deve estar OK)

---

## 📊 Performance Tips

```bash
# Verificar tamanho
du -sh .output/public
# Expected: ~1-2 MB

# Listar arquivos grandes
ls -lhS .output/public/**/*
```

**Otimizações:**
- ✅ TailwindCSS v4 tree-shaking (automático)
- ✅ Nuxt SSG pre-rendering
- ✅ Gzip compression (Vercel/Netlify automático)
- ✅ Cache headers (CDN)

---

## 🎯 Checklist Final

Antes de considerar "live":

- [ ] Build sucesso: `pnpm build`
- [ ] Site acessível no domínio
- [ ] Home page carrega
- [ ] Posts renderizam
- [ ] Dark mode togla
- [ ] Links internos funcionam
- [ ] SEO meta tags presentes (inspecionar HTML)
- [ ] Mobile responsivo
- [ ] Sem console errors
- [ ] Lighthouse score > 85

---

## 📞 Suporte

- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify:** [docs.netlify.com](https://docs.netlify.com)
- **Nuxt:** [nuxt.com/docs](https://nuxt.com/docs)
- **Issues:** devtiagofranca@gmail.com

---

**Pronto para deploy! 🚀**
