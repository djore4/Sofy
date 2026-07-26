# Publicar na Google Play (app Android com Capacitor)

A app é um único `index.html` autónomo. Com o Capacitor, esse ficheiro é **empacotado
dentro** da app e funciona 100% offline. Este guia leva-te do zero ao `.aab` pronto a
enviar para a Play Console.

> O código já tem a estrutura pronta: `capacitor.config.json`, `package.json`,
> `scripts/sync-www.mjs`, a pasta `www/` (cópia do jogo) e `resources/` (ícone + splash).

## Pré-requisitos (no teu computador)
- **Node.js 18+** — https://nodejs.org
- **Android Studio** (inclui o SDK e o Java/JDK) — https://developer.android.com/studio
- **Conta de programador Google Play** — 25 USD, pagamento único — https://play.google.com/console

## 1. Instalar dependências
```bash
npm install
```

## 2. Preparar o conteúdo web e criar o projeto Android
```bash
npm run sync:web          # copia index.html -> www/
npx cap add android       # cria a pasta android/ (só na 1ª vez)
npx cap sync android
```

## 3. Gerar ícone e splash (a partir de resources/icon.png e resources/splash.png)
```bash
npm run assets
```

## 4. Abrir no Android Studio
```bash
npx cap open android
```
No Android Studio: **Build > Generate Signed App Bundle / APK > Android App Bundle**.
- Cria uma **keystore** nova e **guarda-a em segurança** (perdê-la impede futuras
  atualizações). Não a metas no Git (já está no `.gitignore`).
- No fim ficas com um ficheiro **`app-release.aab`** — é este que envias para a Play Console.

## 5. Sempre que mudares o jogo
Editas o `index.html` (na raiz) e depois:
```bash
npm run sync              # copia para www/ e faz cap sync
```
Sobe também a `versionCode`/`versionName` em `android/app/build.gradle` antes de cada
nova versão publicada.

---

# Checklist da Play Console (app para crianças)

- [ ] **Nome, descrição, capturas de ecrã** e um **ícone 512×512** (podes exportar de `resources/icon.png`).
- [ ] **Política de privacidade (URL)** — obrigatória. Já existe `privacy.html`; depois de
      publicares o site (GitHub Pages), o URL será
      `https://djore4.github.io/Sofy/privacy.html`.
- [ ] **Público-alvo e conteúdo**: indica a faixa etária **"5 anos ou menos"**. Isto ativa o
      programa **"Concebido para famílias"** e a **Política de Famílias** da Google.
- [ ] **Classificação de conteúdo (IARC)**: responde ao questionário (sem violência, sem
      dados, sem anúncios → classificação para todas as idades).
- [ ] **Formulário "Segurança dos dados"**: declara **"Não são recolhidos dados"** (é o caso).
- [ ] **Anúncios**: declara **"Não contém anúncios"**.
- [ ] Confirma que o **API level de destino** cumpre o mínimo atual da Google (o Android
      Studio avisa; usa uma versão recente do Capacitor/Gradle).

## Notas
- **appId** atual: `com.sofy.aprenderabrincar` (em `capacitor.config.json`). Podes mudá-lo,
  mas **só antes da 1ª publicação** — depois fica fixo para sempre.
- A **voz** usa o motor text-to-speech do dispositivo. Em telemóveis sem voz "Português
  (Portugal)" instalada, convém sugerir ao utilizador instalá-la nas definições do sistema.
- O mesmo `index.html` continua a servir o site em GitHub Pages **e** a app — mantêm-se
  sincronizados com `npm run sync:web`.
