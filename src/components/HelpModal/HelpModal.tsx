interface HelpModalProps {
  setIsOpen: (isOpen: boolean) => () => void;
  text?: string;
  article: string;
  header: string;
}

const HelpModal = ({ setIsOpen, text, header, article }: HelpModalProps) => {

  return (
    <div onClick={setIsOpen(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
        <p>{header}</p>
        <div>{article}</div>
        (text && <div>{text}</div>)
      </div>
    </div>
  );
};

export default HelpModal;
