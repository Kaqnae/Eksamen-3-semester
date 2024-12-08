import React from "react";

type ListProps<T extends { id: string }> = {
  items: T[]; 
  onItemClick: (item: T) => void; 
  renderItem: (item: T) => React.ReactNode; 
};

const List = <T extends { id: string }>({ items, onItemClick, renderItem }: ListProps<T>) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <li
          className="list-item"
          key={item.id} // 
          onClick={() => onItemClick(item)} 
        >
          {renderItem(item)} {}
        </li>
      ))}
    </ul>
  );
};

export default List;