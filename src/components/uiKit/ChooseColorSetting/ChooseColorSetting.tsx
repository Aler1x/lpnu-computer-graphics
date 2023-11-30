import { MouseEvent, useState } from "react";
// import { RightButton } from "../RightButton/RightButton"
import styles from "./ChooseColorSetting.module.css"
import { ControlCard } from "../ControlCard/ControlCard";

type ChooseColorControlProps = {
  colors: string[];
  colorIndex: number;
  setColorIndex: (color: number) => void;
}

const COLORS_PER_ROW = 5;

export const ColorTile = (
  { 
    color, selected, ...props 
  }: { color: string, selected: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  console.log(selected)

  let backgroundColor = color;

  if (color === "colorful") {
    backgroundColor = "linear-gradient(45deg, firebrick, goldenrod, seagreen, darkblue)";
  }

  return (
    <button {...props} 
      className={`w-[2rem] h-[2rem] rounded-[.5rem] border-none m-1 ${selected && "border-4 border-[#dcd7c9] border-solid"}`}
      style={{ background: backgroundColor, borderStyle: "solid" }}
    />
  )
}

const ChooseColorControl = ({ colors, setColorIndex, colorIndex }: ChooseColorControlProps) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const onClick = (e: MouseEvent, colorIndex: number) => {
    e.stopPropagation();
    if (colorIndex === -1) {
      setCurrentPosition(0);
    } else {
      setColorIndex(colorIndex);
      setCurrentPosition(0);
    }
  } 

  // const nextColors = (e: MouseEvent) => {
  //   e.stopPropagation();
  //   if (currentPosition === colors.length - 1) {
  //     setCurrentPosition(0);
  //   } else {
  //     console.log("new color", colors[currentPosition + 1]) 
  //     setCurrentPosition(currentPosition + 1);
  //   }
  // }

  return (
    <ControlCard >
        <div className={styles.container}>
          {colors.slice(currentPosition * COLORS_PER_ROW, currentPosition * COLORS_PER_ROW + COLORS_PER_ROW).map((color, i) => (
            <ColorTile color={color} onClick={(e) => onClick(e, currentPosition * COLORS_PER_ROW + i)} key={i} selected={
              currentPosition * COLORS_PER_ROW + i === colorIndex
            }/>
          ))}
          {//currentPosition < colors.length / COLORS_PER_ROW - 1 && <RightButton onClick={nextColors}/>
          }
        </div>
    </ControlCard>
  )
}

export default ChooseColorControl
