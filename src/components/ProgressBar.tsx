type ProgressBarProps = {
  progressState: [number, React.Dispatch<React.SetStateAction<number>>];
  steps: number;
  max: number;
  toFixed: number;
  title: string;
};

export default function ProgressBar({ progressState, steps, max, toFixed, title }: ProgressBarProps) {
  const [progress, setProgress] = progressState;
  return (
    <div className="flex flex-col gap-3">
      <p className="flex justify-center text-sm font-light tracking-wider">
        {title}
      </p>
      <div className="flex w-full items-center justify-center gap-2">
        <div className="min-w-9 text-center">{progress.toFixed(toFixed)}</div>
        <input
          type="range"
          min={0}
          max={max}
          step={max / steps}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
}
