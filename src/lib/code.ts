export const codeCSS =
  `<div
  className='max-h-5/6 max-w-5/6 min-w-20 min-h-20 w-full h-full bg-black resize shadow-lg rounded-xs relative overflow-hidden'
  style={{
    resize: 'both',
    backgroundImage: \`linear-gradient({{gradientDirection}}, {{gradientStart}}, {{gradientEnd}})\`,
    backgroundSize: \`{{noiseSize}}px\`
  }}
>
  <div className="pointer-events-none absolute inset-0 bg-[url('/noise.webp')] mix-blend-soft-light" />
  // content goes here
</div>`

export const codeTailwind =
  `<div
  className='relative bg-gradient-{{gradientDirection}} from-[{{gradientStart}}] to-[{{gradientEnd}}]'
  style={{ backgroundSize: \`{{noiseSize}}px\`}}
>
  <div className="pointer-events-none absolute inset-0 bg-[url('/noise.webp')] mix-blend-soft-light" />
  // content goes here
</div>`