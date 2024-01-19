import presetIcons from '@unocss/preset-icons';
import { defineConfig, presetUno, UserConfig } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsl(var(--hue, 217) 78% 51%)', //class="bg-brand-primary"
      },
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      prefix: 'r-',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  shortcuts: {
    'flex-center': 'flex flex-justify-center flex-items-center',
  },
  safelist: ['r-ph-anchor-simple-thin'],
}) as UserConfig<never>;
