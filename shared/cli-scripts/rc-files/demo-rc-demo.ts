import { read, write, update } from 'rc9';

import fs from 'node:fs';
import path from 'node:path';

console.log('Lê o arquivo .apprc');

if (!fs.existsSync(path.join(process.cwd(), '.apprc'))) {
    write({}, path.join(process.cwd(), '.apprc'));
}

const config = read('.apprc') || {};

console.log(`-------------------\n     Values\n-------------------`);
console.log(JSON.stringify(config, null, 4));

let newConfig = {
    ...(typeof config === 'object' ? config : {}),
    theme: 'light',
    api: {
        url: 'https://exemplo.com',
        timeout: 5000,
    },
};

// Isso vai criar (ou atualizar) um arquivo chamado .apprc na pasta atual
write(newConfig, '.apprc');

console.log(`-------------------\n    New Values\n-------------------`);
console.log(JSON.stringify(config, null, 4));

// Isso vai criar (ou atualizar) um arquivo chamado .apprc na pasta atual
update({ theme: 'dark' }, '.apprc');
update({ 'obj1.obj2': '' }, '.apprc');

// Algo inexistente
update({ obj1: { obj2: { key: 'ok' } } }, '.apprc');
console.log(`-------------------\n    New Values\n-------------------`);
console.log(JSON.stringify(config, null, 4));

// ---------------------------------------------

// Caminho personalizado
const customFilePath = path.join(process.cwd(), `shared/cli-scripts/rc-files/.my-demo-rc-file`);

if (!fs.existsSync(customFilePath)) {
    write({}, customFilePath);
}

write(newConfig, customFilePath);
