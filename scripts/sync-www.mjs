// Copia o index.html (fonte, usado também pelo GitHub Pages) para www/,
// que é a pasta que o Capacitor empacota dentro da app Android.
// Corre `npm run sync:web` depois de editares o index.html.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
mkdirSync(join(root, 'www'), { recursive: true });
copyFileSync(join(root, 'index.html'), join(root, 'www', 'index.html'));
console.log('OK: index.html -> www/index.html');
