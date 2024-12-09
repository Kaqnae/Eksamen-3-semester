import React from "react";


type ListProps<T> = {
  items: T[];
  onItemClick?: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
};

const List = <T,>({ items, onItemClick, renderItem }: ListProps<T>) => {
  return (
    <ul className="machineList">
      {items.map((item, index) => (
        <li
          className="machineListItem"
          key={(item as any).id}
          onClick={() => onItemClick?.(item)}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default List;
