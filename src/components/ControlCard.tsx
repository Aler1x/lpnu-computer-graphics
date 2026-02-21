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
      className={`rounded-xl p-2 w-64 flex items-center justify-center bg-[#2c3639] text-white ${divProps.className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default ControlCard;
