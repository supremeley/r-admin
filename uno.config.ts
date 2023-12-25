import presetIcons from '@unocss/preset-icons';
import { defineConfig, presetUno, UserConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      prefix: 'r-',
      //   'vertical-align': 'middle',
    }),
  ],
}) as UserConfig<never>;
