import React from "react";

type Machine = {
  id: string;
  name: string;
};

type ListProps = {
  items: Machine[];
  onItemClick?: (id: string) => void;
};

const List: React.FC<ListProps> = ({ items, onItemClick }) => {
  return (
    <ul className="machineList">
      {items.map((item) => (
        <li
          className="machineListItem"
          key={item.id}
          onClick={() => onItemClick && onItemClick(item.id)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
