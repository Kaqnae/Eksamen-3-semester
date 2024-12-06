import React from "react";

type Machine = {
  id: string;
  name: string;
};

type Booking = {
  id: string;
  name: string;
};

type ListProps<T> = {
  items: T[];
  onItemClick: (id: string) => void;
  renderItem: (item: T) => React.ReactNode;
};

const List = <T,>({ items, onItemClick, renderItem }: ListProps<T>) => {
  return (
    <ul className="machineList">
      {items.map((item) => (
        <li
          className="machineListItem"
          key={(item as any).resourceId}
          onClick={() => onItemClick((item as any).resourceId)}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default List;
