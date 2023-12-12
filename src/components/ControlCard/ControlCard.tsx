import "./ControlCard.css";
import classNames from "classnames";

type OwnProps = {
  children: React.ReactNode;
};

const ControlCard = ({
  children,
  ...divProps
}: OwnProps &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) => {
  return (
    <div
      {...divProps}
      className={classNames(
        `control-card`,
        divProps.className && divProps.className
      )}
    >
      {children}
    </div>
  );
};

export default ControlCard;
