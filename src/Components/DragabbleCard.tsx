import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  margin: 10px;
  padding: 10px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
  todo: string;
  index: number;
}

export const DragabbleCard = ({ todo, index }: IDraggableCardProps) => {
  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
