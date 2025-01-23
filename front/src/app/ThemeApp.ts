import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const ThemeApp = definePreset(Aura, {
        // prefix: 'm',
        // darkModeSelector: '.m-dark',
        // cssLayer: {
        // name: 'primeng',
        // order: 'tailwind-base, primeng, tailwind-utilities',
            components:{
                fieldset:{
                    colorScheme:{
                        light:{
                            legend:{
                                borderColor: '#e5e7eb'
                            }
                        }
                    }
                },
                //https://github.com/primefaces/primeng/blob/master/packages/themes/src/presets/aura/panel/index.ts
                panel:{
                    colorScheme: {
                        light: {
                            header: {
                                background: '#f8fafc',
                                padding: '.75rem',
                            }
                        }
                    },
                },
                panelmenu:{
                    colorScheme: {
                        light: {
                            root: {
                                gap: '0'
                            },
                            panel:{
                                borderRadius: '0',
                                first: {
                                    topBorderRadius: '0'
                                },
                                last: {
                                    bottomBorderRadius: '0'
                                }
                            },
                            item:{
                                gap:'.5rem',
                                padding:'0.25rem'

                            },
                            submenu: {
                                indent: '1.5rem'
                            },
                        },
                    }
                }
            // }
    }
});
