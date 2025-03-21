import { useState } from "react";
import { SketchPicker } from 'react-color';
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const App = () => {

  const [gradientStart, setGradientStart] = useState<string>('#ffee11');
  const [gradientEnd, setGradientEnd] = useState<string>('#1177ff');
  const [gradientAngle, setGradientAngle] = useState<number>(0);
  const [noiseSize, setNoiseSize] = useState<number>(128);

  return (
    <div className='h-screen w-full bg-neutral-900 flex p-5 gap-5'>

      {/* Preview */}
      <div className='flex items-center justify-center w-1/3'>
        <div
          className='max-h-5/6 max-w-5/6 min-w-20 min-h-20 w-full h-full bg-black resize shadow-lg rounded-xs relative overflow-hidden'
          style={{ resize: 'both', backgroundImage: `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('/noise.webp')] mix-blend-soft-light" style={{ backgroundSize: `${noiseSize}px` }} />
        </div>
      </div>

      <div className='flex flex-col gap-5 flex-1'>

        <div className="h-1/2 flex">
          <div className="grid grid-cols-4 gap-5 flex-1">

            {/* Colors */}
            <div className="flex flex-col gap-3 items-center col-span-2">
              <h2 className="text-3xl">Colors</h2>

              <div className="flex items-center gap-5 flex-1">
                <SketchPicker className="text-background" color={gradientStart} onChangeComplete={(color) => setGradientStart(color.hex)} disableAlpha />
                <SketchPicker className="text-background" color={gradientEnd} onChangeComplete={(color) => setGradientEnd(color.hex)} disableAlpha />
              </div>
            </div>

            {/* Gradient */}
            <div className="flex flex-col gap-3 items-center">
              <h2 className="text-3xl">Gradient</h2>

              <div className="flex flex-col justify-center gap-2 flex-1 w-5/6">
                <div className="flex items-center justify-between gap-3">
                  <p>Angle</p>
                  <p className="text-xs text-muted-foreground">{gradientAngle}°</p>
                </div>
                <Slider
                  value={[gradientAngle]}
                  onValueChange={(value) => setGradientAngle(value[0])}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Noise */}
            <div className="flex flex-col gap-3 items-center">
              <h2 className="text-3xl">Noise</h2>

              <div className="flex flex-col justify-center gap-2 flex-1 w-5/6">
                <div className="flex items-center justify-between gap-3">
                  <p>Size</p>
                  <p className="text-xs text-muted-foreground">{noiseSize}px</p>
                </div>
                <Slider
                  value={[noiseSize]}
                  onValueChange={(value) => setNoiseSize(value[0])}
                  min={64}
                  max={512}
                  step={16}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Code */}
        <div className="h-1/2 p-2 flex flex-col gap-3 items-center justify-center">
          <Tabs defaultValue="tailwind" className="flex flex-col items-center h-full w-full">

            <div className="w-full flex justify-between gap-3 items-center">
              <h2 className="text-3xl">Code</h2>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="tailwind">TailwindCSS</TabsTrigger>
                <TabsTrigger value="css">CSS Only</TabsTrigger>
              </TabsList>
            </div>

            <div className="bg-muted w-full h-full p-3 rounded-md">
              <TabsContent value="tailwind" className="w-full h-full">
                TAILWIND CODE
              </TabsContent>
              <TabsContent value="css" className="w-full h-full">
                CSS CODE
              </TabsContent>
            </div>

          </Tabs>
        </div>

      </div>

    </div>
  )
}

export default App;
