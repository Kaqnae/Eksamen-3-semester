import React from "react";

type ListProps = {
  items: string[];
};

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li className="machineList" key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
