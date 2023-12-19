interface HelpModalProps {
  setIsOpen: () => void;
  text: string;
  header: string;
}

const HelpModal = ({ setIsOpen, header, text }: HelpModalProps) => {
  return (
    <div onClick={setIsOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center bg-[#2c3639] text-[#dcd7c9] p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">{header}</h2>
            <p className="mb-4">{text}</p>
            <button className="mt-auto p-4 rounded text-[#2c3639] bg-[#dcd7c9]" onClick={setIsOpen}>
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
