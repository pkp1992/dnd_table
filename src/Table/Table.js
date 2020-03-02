import React from "react";
import Row from "../Row";
import Spinner from "../Spinner";
import "./table.css";

export default ({ data, selectedItem, moveCard }) => {
  const renderRow = (item, index) => {
    return (
      <Row
        key={index}
        index={index}
        item={item}
        selectedItem={() => selectedItem(item)}
        moveCard={moveCard}
      />
    );
  };

  return (
    <table className="table table-responsive-md">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Task name</th>
          <th>Create</th>
          <th>Manager</th>
          <th>Priority</th>
        </tr>
      </thead>
      {!data ? (
        <Spinner />
      ) : (
        <tbody>{data.map((el, index) => renderRow(el, index))}</tbody>
      )}
    </table>
  );
};
