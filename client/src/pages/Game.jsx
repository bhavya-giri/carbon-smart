import { useEffect, useContext } from "react";
import DustbinSetup from "../components/Game/DustbinSetup";
import { UserContext } from "../context/UserProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useQuery } from "react-query";
import { newGame } from "../services/game";

const title = "Game";

const Game = () => {
  const user = useContext(UserContext);
  const { data, isLoading } = useQuery('newGame', newGame);

  useEffect(() => {
    document.title = title;
  }, []);

  useEffect(() => {
    if (data) {
      window.sessionStorage.setItem("gameData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <DndProvider backend={HTML5Backend}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-screen bg-black">
          <DustbinSetup user={user} />
        </div>
      )}
    </DndProvider>
  );
};

export default Game;
