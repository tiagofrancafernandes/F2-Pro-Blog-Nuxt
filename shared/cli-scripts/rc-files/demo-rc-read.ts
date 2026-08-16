import { read } from 'rc9';

// Lê o arquivo .apprc
const config = read('.apprc');

console.log(config); // object
console.log(config.theme); // Saída: 'dark'
console.log(config.api.url); // Saída: 'https://exemplo.com'
