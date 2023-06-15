/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Lives from "./Lives";
import Score from "./Score";
import { useQuery, useMutation } from 'react-query';
import { getQuestions } from "../../services/game";
import { rectIntersection, useDroppable } from "@dnd-kit/core";
import Item from "./Item";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { binData } from "../../assets/bin/index";
import { shuffle } from "../../utils/shuffleArray";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const correctAns = () =>
  toast.success(<Correct />, {
    duration: 1000,
    position: "top-center",
    icon: "🎉",
  });
const wrongAns = () =>
  toast.error(<Wrong />, {
    duration: 1000,
    position: "top-center",
    icon: "❌",
  });
const gameOver = () => {
  toast.error(<Over />, {
    duration: 2000,
    icon: "☹️",
  });
};
const Dustbins = ({ user }) => {

  const [isDropped, setIsDropped] = useState(true);
  const [bins, setBins] = useState([]);
  const [trash, setTrash] = useState(null);
  const [correctBin, setCorrectBin] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const { data, isError, error } = useQuery('questions', getQuestions,{
    onSuccess: (data) => {
    setBins(shuffle([data.correctBinId, ...data.wrongBinIds]));
    setTrash(data.imageUrl);
    setCorrectBin(data.correctBinId);
  },
 });
 console.log(bins, trash)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragEnd(event) {
    const gameData = JSON.parse(window.sessionStorage.getItem('gameData'));
    if (event.over && event.over.id !== null) {
      if (event.over.id === correctBin) {
        correctAns();
        const updatedScore = gameData?.score + 10 || 0;
        window.sessionStorage.setItem('gameData', JSON.stringify({ ...gameData, score: updatedScore }));
        setScore(updatedScore);
      } else {
        wrongAns();
        const updatedLives = gameData?.livesLeft - 1 || 0;
        window.sessionStorage.setItem('gameData', JSON.stringify({ ...gameData, livesLeft: updatedLives }));
        setLives(updatedLives);
      }
      setIsDropped(true);
    }
  }

const { mutate: fetchQuestions, isLoading } = useMutation(getQuestions,{
    onSuccess: (data) => {
    setBins(shuffle([data.correctBinId, ...data.wrongBinIds]));
    setTrash(data.imageUrl);
    setCorrectBin(data.correctBinId);
  },
});

  useEffect(() => {
    const gameData = JSON.parse(window.sessionStorage.getItem('gameData'));
    setScore(gameData?.score ?? 0);
    setLives(gameData?.livesLeft ?? 3);

    if (isDropped && gameData?.livesLeft !== 0) {
      fetchQuestions();
      setIsDropped(false);
    }
  }, [isDropped,fetchQuestions]);

  useEffect(() => {
    if (lives === 0) {
      gameOver();
    }
  }, [lives]);
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={rectIntersection}
    >
    {isLoading?<>Loading</>:<>
        <Item src={trash} />
      {bins.map((bin, idx) => {
        return (
          <Droppable key={idx} id={bin} style={idx}>
            <img src={binData[bin]["image"]} className="z-10 h-[20vh]" />
          </Droppable>
        );
      })}
      <Score score={score} />
      <Lives lives={lives} />
      </>
    }
      
    </DndContext>
  );
};

export default Dustbins;
const STYLES = {
  0: "absolute top-[15vh] left-[10vw] z-10 h-[20vh]",
  1: "absolute top-[15vh] right-[10vw] z-10 h-[20vh]",
  2: "absolute bottom-[16vh] right-[10vw] z-10 h-[20vh]",
  3: "absolute bottom-[16vh] left-[10vw] z-10 h-[20vh]",
};
function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  return (
    <div ref={setNodeRef} className={`${STYLES[props.style]}`}>
      {props.children}
    </div>
  );
}

const Correct = () => {
  return (
    <div className="px-2 py-1 text-center font-semibold text-black">
      Correct Answer
    </div>
  );
};

const Wrong = () => {
  return (
    <div className="px-2 py-1 text-center font-semibold text-black">
      Wrong Answer
    </div>
  );
};

const Over = () => {
  return (
    <div className="px-4 py-2 text-center ">
      <p className="font-bold text-red-700">Game Over</p>
    </div>
  );
};



