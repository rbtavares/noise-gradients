import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { codeCSS, codeTailwind } from "@/lib/code";
import { codeBlockStyle } from "@/lib/styles";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { CompactPicker } from 'react-color';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
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
  const [codeType, setCodeType] = useState<string>('tailwind');
  const [noiseSize, setNoiseSize] = useState<number>(128);
  const [svgSize, setSvgSize] = useState<number>(128);
  const [frequency, setFrequency] = useState<number>(1);
  const [octaves, setOctaves] = useState<number>(1);

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
      <div className="flex-1 px-5 py-4 flex flex-col gap-6 w-0">

        {/* Header */}
        <div className="flex flex-col gap-2">

          <h1 className="text-4xl font-medium">rbtavares/noise-gradients</h1>
          <p className="text-muted-foreground">A simple tool to preview noise gradients and get started with them in your projects. Includes ready-to-use code snippets and setup instructions.</p>

        </div>

        <Separator />

        {/* Gradient Parameters */}
        <div className="flex flex-col gap-2">

          <h2 className="text-2xl">Gradient</h2>
          <div className="grid grid-cols-3 gap-5 w-full">

            <div className="flex flex-col gap-2 items-start">
              <h3>Start Color</h3>
              <CompactPicker color={gradientStart} onChangeComplete={(color) => setGradientStart(color.hex)} />
            </div>

            <div className="flex flex-col gap-2 items-start">
              <h3>End Color</h3>
              <CompactPicker color={gradientEnd} onChangeComplete={(color) => setGradientEnd(color.hex)} />
            </div>

            <div className="flex flex-col gap-2 items-start">
              <h3>Direction</h3>
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
              <div className="flex items-center justify-center w-full h-full">
                {gradientDirection === 'to top' && <ArrowUp size={32} weight="bold" />}
                {gradientDirection === 'to top right' && <ArrowUpRight size={32} weight="bold" />}
                {gradientDirection === 'to right' && <ArrowRight size={32} weight="bold" />}
                {gradientDirection === 'to bottom right' && <ArrowDownRight size={32} weight="bold" />}
                {gradientDirection === 'to bottom' && <ArrowDown size={32} weight="bold" />}
                {gradientDirection === 'to bottom left' && <ArrowDownLeft size={32} weight="bold" />}
                {gradientDirection === 'to left' && <ArrowLeft size={32} weight="bold" />}
                {gradientDirection === 'to top left' && <ArrowUpLeft size={32} weight="bold" />}
              </div>
            </div>

          </div>

        </div>

        <Separator />

        {/* Noise */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Noise</h2>
            <a href="/noise-gradients/noise.webp" download="noise.webp" className="flex items-center gap-1 text-muted-foreground text-sm hover:underline">
              <DownloadSimple size={16} weight="bold" />
              Download Image
            </a>
          </div>
          <div className="grid grid-cols-4 gap-5 w-full">

            {/* BG Size */}
            <div className="flex flex-col gap-2 items-start">
              <div className="flex items-end justify-between w-full">
                <h3>BG Size</h3>
                <span className="text-muted-foreground text-xs tabular-nums">{noiseSize} px</span>
              </div>
              <Slider
                value={[noiseSize]}
                onValueChange={(value) => setNoiseSize(value[0])}
                min={64}
                max={512}
                step={16}
              />
            </div>

            {/* BG Size */}
            <div className="flex flex-col gap-2 items-start">
              <div className="flex items-end justify-between w-full">
                <h3>SVG Size</h3>
                <span className="text-muted-foreground text-xs tabular-nums">{svgSize} px</span>
              </div>
              <Slider
                value={[svgSize]}
                onValueChange={(value) => setSvgSize(value[0])}
                min={64}
                max={512}
                step={16}
              />
            </div>

            {/* BG Size */}
            <div className="flex flex-col gap-2 items-start">
              <div className="flex items-end justify-between w-full">
                <h3>Frequency</h3>
                <span className="text-muted-foreground text-xs tabular-nums">{frequency.toFixed(2)}</span>
              </div>
              <Slider
                value={[frequency]}
                onValueChange={(value) => setFrequency(value[0])}
                min={0}
                max={5}
                step={0.05}
              />
            </div>

            {/* BG Size */}
            <div className="flex flex-col gap-2 items-start">
              <div className="flex items-end justify-between w-full">
                <h3>Octaves</h3>
                <span className="text-muted-foreground text-xs tabular-nums">{octaves}</span>
              </div>
              <Slider
                value={[octaves]}
                onValueChange={(value) => setOctaves(value[0])}
                min={1}
                max={10}
                step={1}
              />
            </div>

          </div>
        </div>

        <Separator />

        {/* Code */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Code</h2>
            <RadioGroup value={codeType} onValueChange={(value) => setCodeType(value)} className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="css-vanilla" id="r1" />
                <Label htmlFor="r1">CSS Vanilla</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tailwind" id="r2" />
                <Label htmlFor="r2">Tailwind</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="w-full bg-muted rounded-sm text-sm overflow-auto font-mono tracking-tight">
            <SyntaxHighlighter language="tsx" style={codeBlockStyle}>
              {codeType === 'css-vanilla' ?
                codeCSS.replace('{{gradientStart}}', gradientStart)
                  .replace('{{gradientEnd}}', gradientEnd)
                  .replace('{{gradientDirection}}', gradientDirection.replace(' ', '-'))
                  .replace('{{noiseSize}}', noiseSize.toString())
                :
                codeTailwind.replace('{{gradientStart}}', gradientStart)
                  .replace('{{gradientEnd}}', gradientEnd)
                  .replace('{{gradientDirection}}', gradientDirection.split(' ').join('-'))
                  .replace('{{noiseSize}}', noiseSize.toString())
              }
            </SyntaxHighlighter>
          </div>
          <p className="text-xs text-muted-foreground">
            Note: For optimal results, 'other content' should be placed with a z-index of &ge; 1.
          </p>
        </div>

      </div>

    </div>
  )
}

export default App;
