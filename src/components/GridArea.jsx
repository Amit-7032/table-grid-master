import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import TableCard from "./TableCard";

const mergeRefs =
  (...refs) =>
  (element) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && typeof ref === "object") {
        ref.current = element;
      }
    });
  };

const GridArea = ({ tables, setTables }) => {
  const gridRef = useRef(null);
  const [highlightedTable, setHighlightedTable] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TABLE",
    drop: (item, monitor) => {
      if (!gridRef.current) return;
      const gridRect = gridRef.current.getBoundingClientRect();
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const x = offset.x - gridRect.left;
      const y = offset.y - gridRect.top;

      const existingTable = tables.find((table) => table.name === item.name);
      if (existingTable) {
        setHighlightedTable(existingTable.id);
        setTimeout(() => setHighlightedTable(null), 1000);
        return;
      }

      setTables((prevTables) => [
        ...prevTables,
        {
          id: Date.now(),
          name: item.name,
          position: { x, y },
          size: { width: 200, height: 100 },
          columns: item.columns || [], // Ensure columns are passed
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const updatePosition = (id, newPosition) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, position: newPosition } : table
      )
    );
  };

  const updateSize = (id, newSize) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, size: newSize } : table
      )
    );
  };

  const removeTable = (id) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== id));
  };

  return (
    <div
      ref={mergeRefs(gridRef, drop)}
      className={`grid-area ${isOver ? "highlight" : ""}`}
    >
      {tables.map((table) => (
        <TableCard
          key={table.id}
          id={table.id}
          name={table.name}
          columns={table.columns} // Pass columns
          position={table.position}
          size={table.size}
          updatePosition={updatePosition}
          updateSize={updateSize}
          removeTable={removeTable} // Pass removeTable function
          isHighlighted={highlightedTable === table.id}
        />
      ))}
    </div>
  );
};

export default GridArea;
