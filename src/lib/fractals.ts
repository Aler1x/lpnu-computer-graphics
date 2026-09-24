export const FRACTAL_COLORS = ["yellow", "green", "blue", "purple", "red"] as const;

export type FractalColor = (typeof FRACTAL_COLORS)[number];

export const FRACTAL_COLOR_LABELS: Record<FractalColor, string> = {
  yellow: "Жовтий",
  green: "Зелений",
  blue: "Синій",
  purple: "Фіолетовий",
  red: "Червоний",
};

export const FRACTALS = [
  {
    id: "newton",
    name: "Фрактал Ньютона",
    hint: "Рух миші змінює параметр. Колір — зсув відтінку.",
    steps: 20,
    max: 100,
    defaultIterations: 50,
  },
  {
    id: "vicsek",
    name: "Фрактал Вічека",
    hint: "Тягніть мишею, щоб рухати візерунок. Колесо наближає точку під курсором. Подвійний клік повертає початковий вигляд.",
    steps: 10,
    max: 10,
    defaultIterations: 5,
  },
] as const;

export type FractalId = (typeof FRACTALS)[number]["id"];
