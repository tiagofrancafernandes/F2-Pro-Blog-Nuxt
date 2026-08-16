import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
// import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    theme: { extend: {} },
    content: {
        files: [
            // all directories and extensions will correspond to your Nuxt config
            '{srcDir}/app/components/**/*.{vue,js,jsx,mjs,ts,tsx}',
            '{srcDir}/app/layouts/**/*.{vue,js,jsx,mjs,ts,tsx}',
            '{srcDir}/app/pages/**/*.{vue,js,jsx,mjs,ts,tsx}',
            '{srcDir}/app/plugins/**/*.{js,ts,mjs}',
            '{srcDir}/app/composables/**/*.{js,ts,mjs}',
            '{srcDir}/app/utils/**/*.{js,ts,mjs}',
            '{srcDir}/utils/**/*.{js,ts,mjs}',
            '{srcDir}/shared/**/*.{js,ts,mjs}',
            '{srcDir}/{A,a}pp.{vue,js,jsx,mjs,ts,tsx}',
            '{srcDir}/{E,e}rror.{vue,js,jsx,mjs,ts,tsx}',
            '{srcDir}/app.config.{js,ts,mjs}',
            '{srcDir}/app/spa-loading-template.html',
        ],
    },
    plugins: [
        typography,
        forms,
    ],
};
