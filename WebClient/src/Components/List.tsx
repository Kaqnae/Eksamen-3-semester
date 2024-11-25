import React from "react";

type ListProps = {
  items: string[];
};

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="machineList">
      {items.map((item, index) => (
        <li className="machineListItem" key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
