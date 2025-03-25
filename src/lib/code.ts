export const codeCSS =
  `<div
  style={{
    position: 'relative',
    backgroundImage: 'linear-gradient({{gradientDirection}}, {{gradientStart}}, {{gradientEnd}})',
    backgroundSize: '{{noiseSize}}px'
  }}
>
  <div
    style={{
      pointerEvents: 'none',
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url("/{{file}}")',
      mixBlendMode: 'soft-light'
    }}
  />
  // other content goes here
</div>`

export const codeTailwind =
  `<div
  className='relative bg-gradient-{{gradientDirection}} from-[{{gradientStart}}] to-[{{gradientEnd}}]'
  style={{ backgroundSize: '{{noiseSize}}px'}}
>
  <div className="pointer-events-none absolute inset-0 bg-[url('/{{file}}')] mix-blend-soft-light" />
  // other content goes here
</div>`