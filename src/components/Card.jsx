import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";

export const Card = ({ id, text, index, moveCard }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

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
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      style={{ opacity }}
      ref={ref}
      data-handler-id={handlerId}
      className="md:grid md:grid-cols-4 gap-4 mt-4 border border-gray-600 py-2 px-4 rounded-2xl"
    >
      <div className="col-span-2 flex gap-2 items-center">
        <p>{text?.id}</p>
        <div className="w-24 bg-gray-600 rounded-md">
          <img className="w-24 rounded-md" src={text?.photo} alt="" />
        </div>
        <h3 className="text-xl">{text?.title}</h3>
      </div>
      <h4 className="text-lg">{text?.username}</h4>
      <h4 className="text-lg ">{text?.like}</h4>
    </div>
  );
};
