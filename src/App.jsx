import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableList from "./components/TableList";
import GridArea from "./components/GridArea";
import "./styles/styles.css";

const App = () => {
  const [droppedTables, setDroppedTables] = useState([]);

  const handleDrop = (tableName) => {
    setDroppedTables((prevTables) => [
      ...prevTables,
      { name: tableName, id: Date.now(), position: { x: 0, y: 0 } },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <TableList />
        <GridArea tables={droppedTables} setTables={setDroppedTables} />
      </div>
    </DndProvider>
  );
};

export default App;