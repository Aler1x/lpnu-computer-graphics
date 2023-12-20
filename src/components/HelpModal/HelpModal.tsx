import React, { useEffect, useState } from "react";
import { useHelpModalContext } from "../Sidebar/Sidebar";

interface HelpModalProps {
  setIsOpen: () => void;
  customPage?: string;
}

const HelpModal = ({ setIsOpen, customPage = "Main" }: HelpModalProps) => {
  const currentPage = useHelpModalContext();

  const pageToTexts = [
    {
      pageName: "Main",
      header: "Ваш інтерактивний портал у світ комп'ютерної графіки",
      text: "Запрошуємо вас дослідити архітектуру математичної краси з нашим фрактальним конструктором. Побудуйте фрактал Вічека, маніпулюючи кількістю ітерацій для розкриття його складної структури. Дослідіть різноманітність фрактала Ньютона, змінюючи константу cc, вибираючи кольорові схеми та експериментуючи з масштабами. Відтворіть дивовижні візуальні ефекти, що поєднують мистецтво та науку. Працюйте з кольоровими моделями CMYK та HSL, налаштовуючи світлість та насиченість, щоб персоналізувати кольори на вашому зображенні. Також реалізуйте рух паралелограма, керуючи його відображенням через дзеркальну пряму з рівнянням y=ax+by=ax+b, коефіцієнти якого задаєте самі. Все це доступно в одному інтерактивному додатку, який перетворить ваші взаємодії з фракталами на незабутнє візуальне свято."
    },
    {
      pageName: "Fractals",
      header: "Фрактали Вічека та Ньютона",
      text: "Зануртесь у світ фрактальних малюнків з нашим інструментом візуалізації. Ви можете генерувати фрактал Вічека та фрактал Ньютона, керуючи кількістю ітерацій, значенням константи с, кольоровими схемами та масштабуванням. Фрактал Вічека малюється з використанням Canvas API, а для фрактала Ньютона застосовується WebGL, щоб забезпечити гладку та детальну візуалізацію. Виберіть параметри та спостерігайте, як змінюється краса математики на ваших очах.\n\nЗмініть параметри щоб побачити як зміниться фрактал."
    },
    {
      pageName: "Colors",
      header: "Експерименти з кольорами",
      text: "Ви зараз працюєте з інструментом, що дозволяє здійснювати точну модифікацію кольорів зображення, використовуючи HSL (Відтінок, Насиченість, Світлість) модель. На панелі управління ви можете змінити світлість та насиченість жовтого кольору, який є домінуючим на вашому зображенні. Показники CMYK відображають, як поточний колір буде виглядати при друці та слугують виключно для демонстрації. Всі зміни відбуваються в реальному часі, тож ви можете відразу бачити результат на дзеркальному зображенні поряд. Запрошуємо вас експериментувати з кольоровими параметрами, щоб отримати бажаний відтінок.\n\nЗмініть параметри щоб побачити як зміниться жовтий колір на вашому зображенні."
    },
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
