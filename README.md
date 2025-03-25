# Noise Gradients

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/rbtavares/noise-gradients/deploy.yml?label=deploy)](https://rbtavares.com/noise-gradients/)
[![GitHub License](https://img.shields.io/github/license/rbtavares/noise-gradients)](LICENSE)
![GitHub Repo stars](https://img.shields.io/github/stars/rbtavares/noise-gradients)


An interactive tool for creating and customizing noise gradients for your web projects.\
Preview gradients in real-time and get ready-to-use code snippets in both vanilla CSS and Tailwind CSS.

![Noise Gradients Preview](/preview.png)

## Features

- 🎨 Interactive gradient customization with colors and direction control
- 🌫️ Pre-made/custom noise overlay tweaking options
- 💻 Real-time code generation for ready-to-use CSS & Tailwind implementations

## Project Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn
- Phosphor Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/rbtavares/noise-gradients.git
cd noise-gradients
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:5173/noise-gradients](http://localhost:5173/noise-gradients) in your browser.

## Usage

1. **Customize Gradient**
   - Select start and end colors using the color pickers
   - Choose gradient direction from the dropdown

2. **Noise Options**
   - Toggle between pre-made noise or custom SVG
   - Adjust background size
   - When using custom SVG:
     - Adjust SVG size
     - Control noise frequency
     - Fine-tune brightness

3. **Get the Code**
   - Choose between Vanilla CSS or Tailwind format
   - Copy the generated code

## Implementation Notes

- The noise overlay uses `mix-blend-mode: soft-light` for a subtle effect
- Place content with `z-index >= 1` to ensure proper layering
- Custom SVG noise is generated using `feTurbulence` filter
- Background size is adjustable for different noise granularity/size

---

Inspired by [@jimmmy](https://x.com/jimmmy)'s [Grainy Gradients Playground](https://grainy-gradients.vercel.app/)
