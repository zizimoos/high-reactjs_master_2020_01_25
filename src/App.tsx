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
    const { destination, source, draggableId } = args;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      const boardCopy = [...toDos[source.droppableId]];
      const [removed] = boardCopy.splice(source.index, 1);
      boardCopy.splice(destination.index, 0, removed);
      const newToDos = { ...toDos, [source.droppableId]: boardCopy };
      setToDos(newToDos);
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
