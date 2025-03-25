import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { codeCSS, codeTailwind } from "@/lib/code";
import { codeBlockStyle } from "@/lib/styles";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { useState, useMemo } from "react";
import { SliderPicker } from 'react-color';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Separator } from "./components/ui/separator";
import { Switch } from "./components/ui/switch";

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

  const [gradientStart, setGradientStart] = useState<string>('#006DE0');
  const [gradientEnd, setGradientEnd] = useState<string>('#f43B3B');
  const [gradientDirection, setGradientDirection] = useState<string>(directionOptions[0]);
  const [codeType, setCodeType] = useState<string>('tailwind');
  const [noiseSize, setNoiseSize] = useState<number>(128);
  const [svgSize, setSvgSize] = useState<number>(256);
  const [frequency, setFrequency] = useState<number>(0.75);
  const [brightness, setBrightness] = useState<number>(0.1);
  const [isCustomSVG, setIsCustomSVG] = useState<boolean>(false);

  const noiseSvg = useMemo(() => {
    const svg = `<svg viewBox='0 0 ${svgSize} ${svgSize}' xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='${frequency}' 
          numOctaves='1' 
          stitchTiles='stitch'/>
        <feComponentTransfer>
          <feFuncR type="linear" slope="${brightness}"/>
          <feFuncG type="linear" slope="${brightness}"/>
          <feFuncB type="linear" slope="${brightness}"/>
        </feComponentTransfer>
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, [svgSize, frequency, brightness]);

  return (
    <div className='min-h-screen w-full bg-background flex flex-col sm:flex-row'>

      {/* Left */}
      <div className="h-36 w-full sm:h-screen sm:w-2/5 sticky top-0 left-0 sm:border-r border-b border-muted z-50">
        <div
          className='w-full h-full shadow-lg relative overflow-hidden'
          style={{ backgroundImage: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})` }}
        >
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              backgroundImage: `url("${isCustomSVG ? noiseSvg : '/noise-gradients/noise.webp'}")`,
              backgroundSize: `${noiseSize}px`
            }}
          />
        </div>
      </div>

      {/* Right */}
      <div className="max-sm:w-full flex-1 px-5 py-4 flex flex-col gap-6 w-0">

        {/* Header */}
        <div className="flex flex-col gap-2">

          <h1 className="text-4xl font-medium">
            <span className="hidden md:inline">{'rbtavares/'}</span>
            noise-gradients
          </h1>
          <p className="text-muted-foreground">A simple tool to preview noise gradients and get started with them in your projects. Includes ready-to-use code snippets and setup instructions.</p>

        </div>

        <Separator />

        {/* Gradient Parameters */}
        <div className="flex flex-col gap-5 md:gap-3">

          <h2 className="text-2xl">Gradient</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10 w-full">

            <div className="flex flex-col gap-5 items-start">
              <h3>Start Color</h3>
              <SliderPicker color={gradientStart} onChange={(color) => setGradientStart(color.hex)} className="w-full" />
            </div>

            <div className="flex flex-col gap-5 items-start">
              <h3>End Color</h3>
              <SliderPicker color={gradientEnd} onChange={(color) => setGradientEnd(color.hex)} className="w-full" />
            </div>

            <div className="flex flex-col gap-5 items-start col-span-1 md:col-span-2 xl:col-span-1">
              <h3>Direction</h3>

              <div className="flex gap-2 flex-1 items-center w-full">
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
                <div className="aspect-square">
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

        </div>

        <Separator />

        {/* Noise */}
        <div className="flex flex-col gap-5 md:gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Noise</h2>

            <a
              href={isCustomSVG ? noiseSvg : '/noise-gradients/noise.webp'}
              download={isCustomSVG ? 'noise.svg' : 'noise.webp'}
              className="items-center gap-1 text-muted-foreground text-sm hover:underline hidden md:flex"
            >
              <DownloadSimple size={16} weight="bold" />
              Download {isCustomSVG ? 'Custom SVG' : 'Noise'}
            </a>

            <div className="flex items-center space-x-2">
              <Switch id="custom-noise" checked={isCustomSVG} onCheckedChange={() => setIsCustomSVG(!isCustomSVG)} />
              <Label htmlFor="custom-noise">Custom SVG</Label>
            </div>
          </div>
          <div className={`w-full ${isCustomSVG ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-10' : ''}`}>

            {/* BG Size */}
            <div className="flex flex-col gap-3 items-start">
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

            {/* SVG Size */}
            {isCustomSVG && <div className="flex flex-col gap-3 items-start">
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
            </div>}

            {/* Frequency */}
            {isCustomSVG && <div className="flex flex-col gap-3 items-start">
              <div className="flex items-end justify-between w-full">
                <h3>Frequency</h3>
                <span className="text-muted-foreground text-xs tabular-nums">{frequency.toFixed(3)}</span>
              </div>
              <Slider
                value={[frequency]}
                onValueChange={(value) => setFrequency(value[0])}
                min={0.05}
                max={1}
                step={0.005}
              />
            </div>}

            {/* Brightness */}
            {isCustomSVG && <div className="flex flex-col gap-3 items-start">
              <div className="flex items-end justify-between w-full">
                <h3>Brightness</h3>
                <span className="text-muted-foreground text-xs tabular-nums">{brightness.toFixed(2)}</span>
              </div>
              <Slider
                value={[brightness]}
                onValueChange={(value) => setBrightness(value[0])}
                min={0}
                max={1}
                step={0.01}
              />
            </div>}

          </div>
        </div>

        <Separator />

        {/* Code */}
        <div className="flex flex-col gap-5 md:gap-3 w-full">
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
          <div className="w-full bg-muted rounded-sm text-sm overflow-auto font-mono">
            <SyntaxHighlighter language="tsx" style={codeBlockStyle}>
              {codeType === 'css-vanilla' ?
                codeCSS.replace('{{gradientStart}}', gradientStart)
                  .replace('{{gradientEnd}}', gradientEnd)
                  .replace('{{gradientDirection}}', gradientDirection.replace(' ', '-'))
                  .replace('{{noiseSize}}', noiseSize.toString())
                  .replace('{{svgSize}}', svgSize.toString())
                  .replace('{{frequency}}', frequency.toString())
                  .replace('{{brightness}}', brightness.toString())
                  .replace('{{file}}', isCustomSVG ? 'noise.svg' : 'noise.webp')
                :
                codeTailwind.replace('{{gradientStart}}', gradientStart)
                  .replace('{{gradientEnd}}', gradientEnd)
                  .replace('{{gradientDirection}}', gradientDirection.split(' ').join('-'))
                  .replace('{{noiseSize}}', noiseSize.toString())
                  .replace('{{svgSize}}', svgSize.toString())
                  .replace('{{frequency}}', frequency.toString())
                  .replace('{{brightness}}', brightness.toString())
                  .replace('{{file}}', isCustomSVG ? 'noise.svg' : 'noise.webp')
              }
            </SyntaxHighlighter>
          </div>
          <p className="text-xs text-muted-foreground">
            Note: For optimal results, 'other content' should be placed with a z-index of &ge; 1.
          </p>
        </div>

        <p className="text-xs text-muted-foreground mt-auto text-center w-full">&copy; 2025 <a href="https://rbtavares.com/" className="text-foreground">rbtavares.com</a> &mdash; Inspired by <a href="https://grainy-gradients.vercel.app/" target="_blank" className="text-foreground">Grainy Gradient playground</a> &mdash; <a href="https://github.com/rbtavares/noise-gradients/blob/main/LICENSE" target="_blank" className="text-foreground">License</a> &mdash; <a href="https://github.com/rbtavares/noise-gradients" target="_blank" className="text-foreground">Source Code</a></p>
      </div>

    </div>
  )
}

export default App;
