import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { IoDocumentText } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import tables from "../tables.json";

const TableItem = ({ name, columns }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TABLE",
    item: { name, columns },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="table-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <IoDocumentText className="table-icon" /> {name}
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="tree-node">
      <div className="node-header">
        {node.children?.length > 0 && (
          <button className="toggle-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? <FaMinus /> : <FaPlus />}
          </button>
        )}
        <TableItem name={node.name} columns={node.columns} />
      </div>
      {expanded && (
        <div className="node-children">
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const TableList = () => {
  const [filter, setFilter] = useState("");
  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="table-list">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by Table Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
        <button className="filter-button">🔍</button>
      </div>
      <div className="table-list-content">
        {filteredTables.map((table) => (
          <TreeNode key={table.name} node={table} />
        ))}
      </div>
      <div className="browse-workbooks">Browse Workbooks</div>
    </div>
  );
};

export default TableList;
