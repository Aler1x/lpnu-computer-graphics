import './ControlCard.css';

type OwnProps = {
  children: React.ReactNode;
}

const ControlCard = (
  { children, ...divProps }: OwnProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  return (
    <div  {...divProps} className={`control-card  ${divProps.className}`}>
      {children}
    </div>
  );
};

export default ControlCard;
