import './TextMenu.css';

interface Item {
  title: string;
  subtitle: string;
}

interface TextMenuProps {
  rows: Item[][];
}

export const TextMenu = ({ rows }: TextMenuProps) => {
  return (
    <div className="row-section">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((item, index) => (
            <div key={index} className="item">
              <h5>{item.title}</h5>
              <p>{item.subtitle}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
