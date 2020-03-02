import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.min.css";
import update from "immutability-helper";

import Data from "./data";
import Table from "./Table";
import Popup from "./Popup";

const App = () => {
  const [data, loadingData] = useState(null);
  const [item, selectItem] = useState(null);
  const [modalOpenFlage, setOpenFlage] = useState("close");

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = data[dragIndex];
      loadingData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [data]
  );

  if (data === null) {
    setTimeout(() => {
      loadingData((Data));
    }, 2000);
  }

  const selectedItem = item => {
    selectItem(item);
    let modalFlag = modalOpenFlage === "close" ? "open" : "close";
    setOpenFlage(modalFlag);
  };

  return (
    <div className="container table-container">
      <DndProvider backend={Backend}>
        <Table
          data={data}
          selectedItem={selectedItem}
          moveCard={moveCard}
        />
        <Popup item={item} modalOpenFlage={modalOpenFlage} />
      </DndProvider>
    </div>
  );
};

export default App;
