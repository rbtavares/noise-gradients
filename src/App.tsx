import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codeCSS, codeTailwind } from "@/lib/code";
import { codeBlockStyle } from "@/lib/styles";
import { useState } from "react";
import { CompactPicker, SketchPicker } from 'react-color';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Separator } from "./components/ui/separator";

const directionOptions = [
  "to top",
  "to top right",
  "to right",
  "to bottom right",
  "to bottom",
  "to bottom left",
  "to left",
  "to top left"
];

const App = () => {

  const [gradientStart, setGradientStart] = useState<string>('#009CE0');
  const [gradientEnd, setGradientEnd] = useState<string>('#F44E3B');
  const [gradientDirection, setGradientDirection] = useState<string>(directionOptions[0]);
  const [noiseSize, setNoiseSize] = useState<number>(128);

  return (
    <div className='min-h-screen w-full bg-background flex'>

      {/* Left */}
      <div className="h-screen w-2/5 sticky top-0 left-0 border-r border-border">
        <div
          className='w-full h-full shadow-lg relative overflow-hidden'
          style={{ backgroundImage: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('/noise.webp')] mix-blend-soft-light" style={{ backgroundSize: `${noiseSize}px` }} />
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 px-5 py-4 flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col gap-2">

          <h1 className="text-4xl font-medium">rbtavares/noise-gradients</h1>
          <p className="text-muted-foreground">A simple tool to preview noise gradients and get started with them in your projects. Includes ready-to-use code snippets and setup instructions.</p>

        </div>

        <Separator />

        {/* Gradient Parameters */}
        <div className="flex flex-col gap-2">

          <h2 className="text-2xl">Gradient</h2>

          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="flex flex-col gap-2 items-start">
              <p className="text-sm font-medium">Start</p>
              <CompactPicker color={gradientStart} onChangeComplete={(color) => setGradientStart(color.hex)} />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-sm font-medium">End</p>
              <CompactPicker color={gradientEnd} onChangeComplete={(color) => setGradientEnd(color.hex)} />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-sm font-medium">Direction</p>
              <Select value={gradientDirection} onValueChange={(value) => setGradientDirection(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Direction</SelectLabel>
                    {directionOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium">Download Noise Image</h2>
        </div>
      </div>
    </div>
  )
}

export default App;
