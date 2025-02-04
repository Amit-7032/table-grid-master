import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { IoClose } from "react-icons/io5";
import { BsTextareaResize } from "react-icons/bs";

const TableCard = ({
  id,
  name,
  columns,
  position,
  size,
  updatePosition,
  updateSize,
  removeTable,
  isHighlighted,
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleDrag = (e, data) => {
    // Prevent dragging when resizing is active
    if (!isResizing) {
      updatePosition(id, { x: data.x, y: data.y });
    }
  };

  const handleResize = (event, { size }) => {
    updateSize(id, size);
  };

  const handleResizeStart = () => {
    setIsResizing(true); // Disable dragging when resizing starts
  };

  const handleResizeStop = () => {
    setIsResizing(false); // Re-enable dragging when resizing ends
  };

  return (
    <Draggable
      position={position}
      onStop={handleDrag}
      disabled={isResizing} // Ensure dragging is disabled during resize
    >
      <ResizableBox
        width={size.width}
        height={size.height}
        minConstraints={[220, 150]}
        maxConstraints={[400, 300]}
        onResizeStart={handleResizeStart} // Start resizing
        onResizeStop={handleResizeStop} // Stop resizing
        onResize={handleResize}
        className={`table-card ${isHighlighted ? "highlighted" : ""}`}
      >
        <div className="table-card-header">
          <span className="table-icon">📄</span>
          <strong>{name}</strong>
          <button className="remove-btn" onClick={() => removeTable(id)}>
            <IoClose size={16} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked readOnly /> Column
              </th>
              <th>Data Type</th>
            </tr>
          </thead>
          <tbody>
            {columns && columns.length > 0 ? (
              columns.map((col) => (
                <tr key={col.column_id}>
                  <td>
                    <input type="checkbox" checked readOnly /> {col.name}
                  </td>
                  <td>{col.column_data_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="table-card-footer">Scroll to see more columns</div>
        <div className="react-resizable-handle">
          <BsTextareaResize />
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default TableCard;
