import { useState } from "react";
import { SketchPicker } from 'react-color';
const App = () => {

  const [gradientStart, setGradientStart] = useState<string>('#111111');
  const [gradientEnd, setGradientEnd] = useState<string>('#1177ff');
  const [gradientAngle, setGradientAngle] = useState<number>(0);
  const [noiseSize, setNoiseSize] = useState<number>(128);

  return (
    <div className='h-screen w-full bg-neutral-900 flex p-5 gap-5'>

      <div className='flex items-center justify-center w-1/3'>
        <div
          className='max-h-5/6 max-w-5/6 min-w-20 min-h-20 w-96 aspect-[9/16] bg-black resize shadow-lg rounded-xs relative overflow-hidden'
          style={{ resize: 'both', backgroundImage: `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('/noise.webp')] mix-blend-soft-light" style={{ backgroundSize: `${noiseSize}px` }} />
        </div>
      </div>

      <div className='flex flex-col gap-5 flex-1'>

        <div className="h-1/2 flex">
          <div className="grid grid-cols-3 gap-3 flex-1">

            <div className="flex items-center justify-center">
              <SketchPicker color={gradientStart} onChangeComplete={(color) => setGradientStart(color.hex)} disableAlpha />
            </div>

            <div className="flex items-center justify-center">
              <SketchPicker color={gradientEnd} onChangeComplete={(color) => setGradientEnd(color.hex)} disableAlpha />
            </div>

            <div className="gap-10 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center w-48 px-4 ">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradientAngle}
                  className="w-full"
                  onChange={(e) => setGradientAngle(Number(e.target.value))}
                />
                <span className="text-white">Gradient Angle: {gradientAngle}°</span>
              </div>
              <div className="flex flex-col items-center w-48 px-4">
                <input
                  type="range"
                  min="64"
                  max="512"
                  step="16"
                  value={noiseSize}
                  className="w-full"
                  onChange={(e) => setNoiseSize(Number(e.target.value))}
                />
                <span className="text-white">Noise Size: {noiseSize}px</span>
              </div>
            </div>

          </div>
        </div>

        <div className="h-1/2 p-2 text-white flex items-center justify-center">
          <pre className="text-sm bg-neutral-800 p-4 rounded-md">
            {`<div className="relative" style={{ backgroundImage: \`linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})\` }}>
  <div
    className="pointer-events-none absolute inset-0 bg-[url('/noise.webp')] mix-blend-soft-light"
    style={{ backgroundSize: \`${noiseSize}px\` }}
  />
  {children}
</div>`}
          </pre>
        </div>

      </div>

    </div>
  )
}

export default App;
