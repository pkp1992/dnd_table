import React, { useRef } from "react";
import moment from "moment";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "../Types/ItemTypes";
const style = {
  backgroundColor: "#fff",
  cursor: "pointer"
};

export default ({ item, selectedItem, index, moveCard }) => {
  const { taskName, create, manager, id } = item;
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },

    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.1 : 1;

  drag(drop(ref));

  return (
    <tr
      onDoubleClick={() => selectedItem(id)}
      ref={ref}
      style={{ ...style, opacity }}
    >
      <th>{id}</th>
      <td>{taskName}</td>
      <td>{moment(create).format("Do MMMM YYYY HH:MM")}</td>
      <td>{manager}</td>
      <td>{index + 1}</td>
    </tr>
  );
};
