import { ParallelogramContainer } from "../../components/ParallelogramContainer/ParallelogramContainer";
import TabHeader from "../../components/TabHeader/TabHeader";

const ShapePage = () => {
  return (
    <div className="p-8">
      <TabHeader title="Взаємодія з паралелограмом 🔷" />
      <ParallelogramContainer
        pointA={{ x: 0, y: 0 }}
        pointB={{ x: 25, y: 50 }}
        pointC={{ x: 75, y: 50 }}
      />
    </div>
  );
};

export default ShapePage;
