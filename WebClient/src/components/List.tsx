import React from "react";


type ListProps<T> = {
  items: T[];
  onItemClick?: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  listClassName?: string;
};

const List = <T,>({ items, onItemClick, renderItem, listClassName }: ListProps<T>) => {
  return (
    <ul className={`machineList ${listClassName || ""}`}>
      {items.map((item) => (
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
