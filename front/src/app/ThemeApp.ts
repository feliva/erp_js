import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from "@primeng/themes/lara";
import Material from "@primeng/themes/material";

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
