/** @type {import(\'tailwindcss\').Config} */
export default {
  darkMode: [\'class\'],
  content: [
    \'./pages/**/*.{js,jsx}\',
    \'./components/**/*.{js,jsx}\',
    \'./app/**/*.{js,jsx}\',
    \'./src/**/*.{js,jsx}\',
  ],
  prefix: \'\',
  theme: {
    container: {
      center: true,
      padding: \'2rem\',
      screens: {
        \'2xl\': \'1400px\',
      },
    },
    extend: {
      colors: {
        border: \'hsl(var(--border))\',
        input: \'hsl(var(--input))\',
        ring: \'hsl(var(--ring))\',
        background: \'hsl(var(--background))\',
        foreground: \'hsl(var(--foreground))\',
        primary: {
          DEFAULT: \'hsl(var(--primary))\',
          foreground: \'hsl(var(--primary-foreground))\',
        },
        secondary: {
          DEFAULT: \'hsl(var(--secondary))\',
          foreground: \'hsl(var(--secondary-foreground))\',
        },
        destructive: {
          DEFAULT: \'hsl(var(--destructive))\',
          foreground: \'hsl(var(--destructive-foreground))\',
        },
        muted: {
          DEFAULT: \'hsl(var(--muted))\',
          foreground: \'hsl(var(--muted-foreground))\',
        },
        accent: {
          DEFAULT: \'hsl(var(--accent))\',
          foreground: \'hsl(var(--accent-foreground))\',
        },
        popover: {
          DEFAULT: \'hsl(var(--popover))\',
          foreground: \'hsl(var(--popover-foreground))\',
        },
        card: {
          DEFAULT: \'hsl(var(--card))\',
          foreground: \'hsl(var(--card-foreground))\',
        },
        // Custom colors based on design analysis
        \'tea-primary\': \'#4CAF50\', // Vert olive/forêt pour les éléments clés
        \'tea-accent-violet\': \'#8A2BE2\', // Violet pour le bandeau d\'annonce et le logo
        \'tea-cta-green\': \'#66BB6A\', // Vert frais pour les CTA
        \'tea-background-light\': \'#F5F5DC\', // Blanc cassé/crème pour le fond
        \'tea-gray-light\': \'#D3D3D3\', // Gris clair pour les bordures et ombres
      },
      borderRadius: {
        lg: \'var(--radius)\',
        md: \'calc(var(--radius) - 2px)\',
        sm: \'calc(var(--radius) - 4px)\',
      },
      keyframes: {
        \'accordion-down\': {
          from: { height: \'0\' },
          to: { height: \'var(--radix-accordion-content-height)\' },
        },
        \'accordion-up\': {
          from: { height: \'var(--radix-accordion-content-height)\' },
          to: { height: \'0\' },
        },
      },
      animation: {
        \'accordion-down\': \'accordion-down 0.2s ease-out\',
        \'accordion-up\': \'accordion-up 0.2s ease-out\',
      },
    },
  },
  plugins: [require(\'tailwindcss-animate\')],
}


