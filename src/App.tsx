import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoState);
  const onDragEnd = (args: DropResult) => {
    const { destination, source } = args;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      const boardCopyArray = [...toDos[source.droppableId]];
      const [removedElement] = boardCopyArray.splice(source.index, 1);
      boardCopyArray.splice(destination.index, 0, removedElement);
      const newToDosObject = { ...toDos, [source.droppableId]: boardCopyArray };
      setToDos(newToDosObject);
    }
    if (destination.droppableId !== source.droppableId) {
      const sourceArray = [...toDos[source.droppableId]];
      const removedElement = sourceArray.splice(source.index, 1)[0];
      // const draggedObject = sourceArray[source.index];
      const destinationArray = [...toDos[destination.droppableId]];
      destinationArray.splice(destination.index, 0, removedElement);
      const newToDosObject = {
        ...toDos,
        [source.droppableId]: sourceArray,
        [destination.droppableId]: destinationArray,
      };
      setToDos(newToDosObject);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
export default App;
