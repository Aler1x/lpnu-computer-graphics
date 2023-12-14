import { ParallelogramContainer } from "../../components/ParallelogramContainer/ParallelogramContainer";
import ShapeParametersInput from "../../components/ShapeParametersInput/ShapeParametersInput";
import TabHeader from "../../components/TabHeader/TabHeader";
import { Geometry } from "../../icons/Geometry";
import "./ShapePage.css";

const ShapePage = () => {
  return (
    <div className="p-8">
      <TabHeader title="Взаємодія з паралелограмом 🔷" />
      <div className="flex flex-row gap-28">
        <ParallelogramContainer
        />
        <div className="flex flex-col gap-4">
        <ShapeParametersInput />
        <button className="button">
          <Geometry />
          Почати
        </button>
        </div>
      </div>
    </div>
  );
};

export default ShapePage;
