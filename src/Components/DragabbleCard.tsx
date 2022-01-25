import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  margin: 10px;
  padding: 10px 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#ff887a" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 0px 10px #ff887a" : "none"};
  transition: background-color 0.3s ease-in-out;
`;

interface IDraggableCardProps {
  todoId: number;
  todoText: string;
  index: number;
}

export const DragabbleCard = ({
  todoId,
  index,
  todoText,
}: IDraggableCardProps) => {
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
