export const FRACTAL_COLORS = ["yellow", "green", "blue", "purple", "red"] as const;

export type FractalColor = (typeof FRACTAL_COLORS)[number];

export const FRACTAL_COLOR_LABELS: Record<FractalColor, string> = {
  yellow: "Жовтий",
  green: "Зелений",
  blue: "Синій",
  purple: "Фіолетовий",
  red: "Червоний",
};

type FractalBase = {
  id: string;
  name: string;
  short: string;
  hint: string;
  steps: number;
  max: number;
  defaultIterations: number;
};

export type ShaderFractalDefinition = FractalBase & {
  render: "shader";
  shader: string;
  mode: number;
  zoom: number;
  zoomMin: number;
  zoomMax: number;
  center: [number, number];
  param: [number, number];
  pointer: "pan" | "julia";
};

export type FractalDefinition =
  | (FractalBase & { render: "newton" | "vicsek" })
  | ShaderFractalDefinition;

const cameraHint =
  "Тягніть мишею, щоб рухати візерунок. Колесо наближає точку під курсором. Подвійний клік повертає початковий вигляд.";

export const FRACTALS = [
  {
    id: "newton",
    name: "Фрактал Ньютона",
    short: "Ньютон",
    hint: "Рух миші змінює параметр. Колір — зсув відтінку.",
    steps: 20,
    max: 100,
    defaultIterations: 50,
    render: "newton",
  },
  {
    id: "vicsek",
    name: "Фрактал Вічека",
    short: "Вічек",
    hint: cameraHint,
    steps: 10,
    max: 10,
    defaultIterations: 5,
    render: "vicsek",
  },
  {
    id: "mandelbrot",
    name: "Множина Мандельброта",
    short: "Мандельброт",
    hint: cameraHint,
    steps: 20,
    max: 200,
    defaultIterations: 80,
    render: "shader",
    shader: "/fractals/escape.frag",
    mode: 0,
    zoom: 0.62,
    zoomMin: 0.2,
    zoomMax: 80,
    center: [-0.75, 0],
    param: [0, 0],
    pointer: "pan",
  },
  {
    id: "julia",
    name: "Множина Жюліа",
    short: "Жюліа",
    hint: "Рух миші змінює константу c. Тягніть, щоб зсунути площину, колесо наближає, подвійний клік скидає вигляд.",
    steps: 20,
    max: 200,
    defaultIterations: 80,
    render: "shader",
    shader: "/fractals/escape.frag",
    mode: 1,
    zoom: 0.55,
    zoomMin: 0.2,
    zoomMax: 40,
    center: [0, 0],
    param: [-0.8, 0.156],
    pointer: "julia",
  },
  {
    id: "burning-ship",
    name: "Палаючий корабель",
    short: "Корабель",
    hint: cameraHint,
    steps: 20,
    max: 200,
    defaultIterations: 80,
    render: "shader",
    shader: "/fractals/escape.frag",
    mode: 2,
    zoom: 0.48,
    zoomMin: 0.15,
    zoomMax: 80,
    center: [-0.4, -0.55],
    param: [0, 0],
    pointer: "pan",
  },
  {
    id: "carpet",
    name: "Килим Серпінського",
    short: "Килим",
    hint: cameraHint,
    steps: 6,
    max: 6,
    defaultIterations: 4,
    render: "shader",
    shader: "/fractals/carpet.frag",
    mode: 0,
    zoom: 0.9,
    zoomMin: 0.45,
    zoomMax: 20,
    center: [0, 0],
    param: [0, 0],
    pointer: "pan",
  },
  {
    id: "koch",
    name: "Сніжинка Коха",
    short: "Кох",
    hint: "Ітерації додають злами на кожній стороні. Тягніть і крутіть колесо, щоб розглянути криву.",
    steps: 6,
    max: 6,
    defaultIterations: 4,
    render: "shader",
    shader: "/fractals/koch.frag",
    mode: 0,
    zoom: 0.85,
    zoomMin: 0.4,
    zoomMax: 16,
    center: [0, 0],
    param: [0, 0],
    pointer: "pan",
  },
] as const satisfies readonly FractalDefinition[];

export type FractalId = (typeof FRACTALS)[number]["id"];

export function fractalById(id: FractalId): FractalDefinition {
  const fractal = FRACTALS.find((item) => item.id === id);
  if (!fractal) {
    throw new Error(`Unknown fractal: ${id}`);
  }
  return fractal;
}
