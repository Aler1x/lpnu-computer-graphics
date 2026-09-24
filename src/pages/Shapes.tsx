import { useRef } from "react";
import { ParallelogramContainer } from "@/components/figures/ParallelogramContainer";
import { ShapeControls } from "@/components/figures/shape-controls";
import { PageHeader } from "@/components/layout/page-header";
import { useParallelogram } from "@/hooks/use-parallelogram";

export default function ShapesPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shape = useParallelogram();

  return (
    <section>
      <PageHeader
        title="Взаємодія з паралелограмом"
        description="Три вершини задають фігуру, пряма — вісь дзеркала. Рух виконує те саме афінне перетворення, що й раніше."
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <ParallelogramContainer
          parallelogram={shape.parallelogram}
          line={shape.line}
          canvasRef={canvasRef}
        />
        <ShapeControls
          parallelogram={shape.parallelogram}
          line={shape.line}
          onParallelogramChange={shape.onParallelogramChange}
          onLineChange={shape.onLineChange}
          onDraw={shape.draw}
          onStartMotion={shape.startMotion}
        />
      </div>
    </section>
  );
}
