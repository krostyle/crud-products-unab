import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extender de las configuraciones base de Next.js
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Añadir reglas personalizadas para desactivar las advertencias de 'any'
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Desactivar la regla que prohíbe el uso de 'any'
      '@typescript-eslint/no-explicit-any': 'off',

      // Desactivar otras reglas relacionadas con 'any'
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
];

export default eslintConfig;
