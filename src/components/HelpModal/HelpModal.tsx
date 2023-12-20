import React, { useEffect, useState } from "react";
import { useHelpModalContext } from "../Sidebar/Sidebar";

interface HelpModalProps {
  setIsOpen: () => void;
  customPage?: string;
}

const HelpModal = ({ setIsOpen, customPage = "Main" }: HelpModalProps) => {
  const currentPage = useHelpModalContext();

  const pageToTexts = [
    { pageName: "Main", header: "Привіт!", text: "Це головна сторінка." },
    { pageName: "Fractals", header: "Фрактали", text: "Про фрактали." },
    { pageName: "Colors", header: "Кольори", text: "Про кольори." },
    {
      pageName: "Shapes",
      header: "Афінні трансформації для руху паралелограма",
      text: "Для того, щоби надати динаміку паралелограму, заданого трьома його вершинами, ми використовуємо афінні перетворення. Це дозволяє нам ефективно реалізувати його рух за допомогою дзеркального відображення відносно обраної прямої, рівняння якої має вигляд у=ах+b.\n\nВведіть коефіцієнти а і b, щоб побачити, як паралелограм віддзеркалюється та переміщується в просторі.",
    },
    {
      pageName: "Parallelogram instructions",
      header: "Як взаємодіяти із паралелограмом?",
      text: "Для цього введи три точки паралелограма: A, B і C. Не хвилюйся: точку D ми знайдемо за тебе 😊\n\nПісля цього, вкажи параметри A та B для прямохї y = A * x + B. Відносно цієї прямої ми переміщатимемо паралелограм!",
    },
  ];

  const [currentHeader, setCurrentHeader] = useState("");
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const pageValues =
      pageToTexts.find((p) =>
        currentPage.toLocaleLowerCase().includes(p.pageName.toLocaleLowerCase())
      ) ||
      pageToTexts.find((p) =>
        customPage.toLocaleLowerCase().includes(p.pageName.toLocaleLowerCase())
      ) ||
      pageToTexts[0];
    if (!pageValues) return;
    pageValues.header && setCurrentHeader(pageValues.header);
    pageValues.text && setCurrentText(pageValues.text);
  }, [currentPage]);

  return (
    <div onClick={setIsOpen}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fox">
          <img
            src="https://i.imgur.com/JEYjMzj.png"
            alt="hi-fox"
            draggable={false}
          />
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col w-1/2 items-center bg-[#2c3639] text-[#dcd7c9] p-8 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 leading-10">
              {currentHeader}
            </h2>
            <p>
              {currentText.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <button
              className="p-4 rounded text-[#2c3639] bg-[#dcd7c9] mt-4"
              onClick={setIsOpen}
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
