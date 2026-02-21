interface TabHeaderProps {
  title: string;
  subtitle?: string;
}

const TabHeader = ({ title, subtitle }: TabHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold leading-10">{title}</h1>
      {subtitle && <h2 className="text-xl font-medium leading-10">{subtitle}</h2>}
    </>
  );
};

export default TabHeader;
