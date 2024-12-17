import React from "react";

// Type definition for the props of the List component
type ListProps<T> = {
  items: T[]; // Array of items to display in the list
  onItemClick?: (item: T) => void; // Optional click handler for list items
  renderItem: (item: T) => React.ReactNode; // Function to render each item
  listClassName?: string; // Optional additional class names for styling the list
};

// List component definition
const List = <T,>({
  items,
  onItemClick,
  renderItem,
  listClassName,
}: ListProps<T>) => {
  return (
    <ul className={`machineList ${listClassName || ""}`}>
      {" "}
      {/* Main list element */}
      {items.map((item) => (
        <li
          className="machineListItem" // Class for individual list items
          key={(item as any).id} // Unique key based on the item's id
          onClick={() => onItemClick?.(item)} // Trigger onItemClick if defined
        >
          {renderItem(item)}{" "}
          {/* Render the item using the renderItem function */}
        </li>
      ))}
    </ul>
  );
};

export default List;
