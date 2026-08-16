import { write } from 'rc9';

// Isso vai criar (ou atualizar) um arquivo chamado .apprc na pasta atual
write(
    {
        ...(typeof config === 'object' ? config : {}),
        theme: 'light',
        api: {
            url: 'https://exemplo.com',
            timeout: 5000,
        },
        db: {
            username: 'username',
            password: 'multi word password',
            enabled: true,
        },
    },
    '.apprc'
);
