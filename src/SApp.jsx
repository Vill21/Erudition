import React, {useState, useRef, useEffect} from "react";
import useStateRef from "react-usestateref";
import swal from 'sweetalert';

import {
  createSmartappDebugger,
  createAssistant,
  AssistantSmartAppCommand
} from "@sberdevices/assistant-client";
import { TextBox, Button } from '@sberdevices/plasma-ui';

import "./SApp.css";
import {Line} from './components/Line'

import axios from "axios";
import { IconHeart } from "@sberdevices/plasma-icons";
import { setRef } from "@sberdevices/plasma-core/utils";
const API_URL = "https://shielded-escarpment-91826.herokuapp.com/words/";

async function getWords() {
  const {data: words} = await axios.get(API_URL);
  return words;
}

async function updateWords(id, payload) {
  const {data: newWord} = await axios.put(`${API_URL}${id}`, payload);
  return newWord;
}

const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};

export const App = () => {
  //флаг конца отгадывания
  const [words, setWords, wordsRef] = useStateRef([]);
  const [index, setIndex, indexRef] = useStateRef(0);
  const [points, setPoints, pointsRef] = useStateRef(0);
  const [indArr, setArr, indArrRef] = useStateRef([]);
  const assistant = useRef(undefined);
  const [lives, setLives, livesRef] = useStateRef(0);
  
  //инициализирует голосовой ассистент
  useEffect(() => {
    assistant.current = initializeAssistant(() => getStateForAssistant());
    //Осуществляет подписку на событие готовности ассистента к работе.
    assistant.current.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });
    //Осуществляет подписку на событие получения данных с бэкенда. 
    //Получает команды из appInitialData, если при запуске смартапа не была вызвана команда getInitialData().
    assistant.current.on("data", (event) => {
      console.log(`assistant.on(data)`, event);
      const { action } = event;
      dispatchAssistantAction(action);
    });
  }, [])

  useEffect(() => {
    const fetchAndSetWords = async () => {
      const _words = await getWords();
      _words.sort(() => Math.random() - 0.5);
      console.log(_words);
      setWords(_words);
    }
    fetchAndSetWords();
  }, [])

  const getStateForAssistant = () => {
    console.log('getStateForAssistant: this.state:', pointsRef?.current)
    const state = {
      item_selector: {
        //Список соответствий между голосовыми командами и действиями в приложении.
        items: {
            word: wordsRef?.current?.[indexRef?.current]?.["word"],
            question: wordsRef?.current?.[indexRef?.current]?.["question"],
            future: wordsRef?.current?.[indexRef?.current + 1]?.["question"],
            point: pointsRef?.current,
            lives: livesRef?.current,
            arr: indArrRef?.current
          },
      },
    };
    console.log('getStateForAssistant: state:', state)
    return state;
  }

  //распознает запросы для голосового ассистента
  const dispatchAssistantAction = (action) => {
    console.log('dispatchAssistantAction', action);
      if (action) {
      switch (action.type) {
        case 'guess_word':
          //вызывает функцию в ответ на распознанное действие
          return guess_word(action);
        case 'add_life':
          return add_life();
        case 'open_letter':
          return open_letter(action);  
        case 'init':
          return init();      
        default:
          throw new Error();
      }
    }
  }

  const handleOnClick = (action_id, asked) => {
    console.log("START")
    // Отправка сообщения ассистенту с фронтенд.
    // Структура может меняться на усмотрение разработчика, в зависимости от бэкенд
    assistant?.current?.sendData({ 
      action: 
        { 
          action_id: action_id, 
          payload: {
            asked: asked
          } 
        }
      });
  };

  const init = () => {
    handleOnClick('say_question', 'Огласи вопрос')
  }

  //функция обработчик введенного слова
  const guess_word = (action) => {
    const guessed = action.isRight;
    
    if (guessed === true) {
      swal("Верно!", `Слово: ${wordsRef?.current?.[indexRef?.current]?.["word"]}`, "success");
      const newIndex = indexRef?.current + 1;
      setIndex(newIndex);
      const point = pointsRef?.current + 1;
      setArr([]);
      setPoints(point);
      handleOnClick('say_question', 'Огласи вопрос');
    } else if (livesRef?.current > 0) {
      let life = livesRef?.current - 1;
      setLives(life);
      swal(`У вас осталось ${livesRef?.current} попыток`, "", "error");
    }else {
      swal("Попробуйте снова :(", "", "error");
      setPoints(0);
    }
  }

  const add_life = () => {
      let life = livesRef?.current + 1;
      setLives(life);
      const point = pointsRef?.current - 2;
      setPoints(point);
  }

  const open_letter = (action) => {
    const id = action.id;
    const arr = indArrRef?.current;
    arr.push(id);
    setArr(arr);
    const point = pointsRef?.current - 1;
    setPoints(point);
  }

  return (
    <div className="content">
      <div>
      <label style={
          {fontSize: "24pt"}
        }
      >Угаданные подряд: {points}</label>
      <button onClick={() => {handleOnClick('add_life', 'Купить жизнь')}} className="shine-button"><IconHeart color="#FF0000" /><label style={{fontSize: "24pt"}}>: {lives}</label></button>
      </div>
      <Line word={wordsRef?.current?.[indexRef?.current]?.["word"]} indArr={indArr}/>
      <TextBox 
        title="Загадка:" 
        size="l" 
        subTitle={wordsRef?.current?.[indexRef?.current]?.["question"]} 
        style={
          {margin: "5% 0 0 0",
          fontSize: "24pt"}
        }/>
    </div>
  );
}
