import "./TabHeader.css";

interface TabHeaderProps {
  title: string;
  subtitle?: string;
}

export const TabHeader = ({ title, subtitle }: TabHeaderProps) => {
  return (
    <>
      <h1>{title}</h1>
      { subtitle && <h2>{subtitle}</h2> }
    </>
  );
};
