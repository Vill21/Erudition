import React, {useState, useRef, useEffect} from "react";
import useStateRef from "react-usestateref";
import swal from 'sweetalert2';

import {
  createSmartappDebugger,
  createAssistant,
  AssistantSmartAppCommand
} from "@sberdevices/assistant-client";
import { TextBox, Spinner, TextSkeleton, RectSkeleton } from '@sberdevices/plasma-ui';

import "./SApp.css";
import {Line} from './components/Line'

import axios from "axios";
import { IconInfo } from "@sberdevices/plasma-icons";
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
  const [words, setWords, wordsRef] = useStateRef([]); // массив всех слов в игре
  const [index, setIndex, indexRef] = useStateRef(0); // индекс текущего слова
  const [points, setPoints, pointsRef] = useStateRef(0); // очки игрока
  const [indArr, setArr, indArrRef] = useStateRef([]); // массив открытых букв
  const assistant = useRef(undefined); // сберовский ассистент
  const assistantType = useRef("formal"); // unnecessary
  const [show, setShow] = useState(false); // флаг (показать слово целиком / нет)
  const tries = useRef(0); // число, ушедшее на разгадывание текущего слова
  const [lives, setLives, livesRef] = useStateRef(0); // доп жизни игрока
  
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
      if (event.type == "character") {
        assistantType.current = event.character.id;
      }
      if(event.assistant){
        if(event.assistant == "official"){
          assistantType.current = "formal"
        }
        else {
          assistantType.current = "informal"
        }
      }
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
            arr: indArrRef?.current,
            speech: assistantType?.current, 
            possibility: pointsRef?.current,
            try: tries?.current,
            length: wordsRef?.current?.[indexRef?.current]?.["word"].length
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
        case 'ease':
          return ease(action); 
        case 'help':
          return help();
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

  const ease = (action) => {
    const flag = action.body;
    if (flag === true) {
      setShow(true);
      setTimeout(() => { 
        const newIndex = indexRef?.current + 1;
        tries.current = 0;
        setIndex(newIndex);
        setArr([]);
        handleOnClick('say_question', 'Огласи вопрос');
        setShow(false);
       }, 4500);
    } else if (flag === false) {
      tries.current = 0;
    } else if (flag === 'skip') {
      setShow(true);
      tries.current = 0;
      if (livesRef?.current > 0) {
        let life = livesRef?.current - 1;
        setLives(life);
      } else {
        setPoints(0);
      }
      setTimeout(() => { 
        const newIndex = indexRef?.current + 1;
        setIndex(newIndex);
        setArr([]);
        handleOnClick('say_question', 'Огласи вопрос');
        setShow(false);
       }, 4500);
    }
  }

  const txt_help = `<div style="text-align:left;">⦁ За каждое угаданное слово счетчик комбо увеличивается на 1.<br>

    ⦁ За неправильно угаданное слово счетчик комбо сбрасывается до нуля.<br>

    ⦁ За 2 очка счетчика комбо можно купить допонительную жизнь. Дополнительная жизнь (отображается рядом с иконкой сердца) предотвращает сброс счетчика комбо в случае неправильного ответа (команда: дай дополнительную жизнь).<br>

    ⦁ За 1 очко счетчика комбо можно открыть любую букву слова (команда, например: открой букву на позиции один).<br>

    ⦁ Можно попросить ассистента прочитать загадку (команда: прочитай загадку).<br>
    
    ⦁ Можно пропустить слово, если не получается его отгадать (команда: пропусти). Это стоит 1 жизнь или сбрасывает счетчик комбо (если жизней нет).<br></div>`;
  
  const help = () => {
    swal.fire({html: txt_help, title: "Справка", showConfirmButton: false, showCloseButton: true});
  }

  //функция обработчик введенного слова
  const guess_word = (action) => {
    const guessed = action.isRight;
    
    if (guessed === true) {
      swal.fire({title: "Верно!", text :`Слово: ${wordsRef?.current?.[indexRef?.current]?.["word"]}`, icon: "success", timer: 3000});
      const newIndex = indexRef?.current + 1;
      setIndex(newIndex);
      const point = pointsRef?.current + 1;
      setArr([]);
      setPoints(point);
      tries.current = 0;
    } else if (livesRef?.current > 0) {
      let life = livesRef?.current - 1;
      setLives(life);
    }else {
      swal.fire({text: "Попробуйте снова :(", icon: "error", timer: 3000});
      setPoints(0);
      tries.current += 1;
      if (tries.current >= 8) handleOnClick('ask', 'помощь');
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
  
  if(wordsRef?.current?.[indexRef?.current]?.["word"]){
  return (
    <div className="content">
      <span className="contentDiv">
        <div style = {{ "display": "flex", "justifyContent": "space-between"}}>
          <label className="string" />
          <label className="texts text1">Угаданные подряд: {points} 💰</label>
          <button className="info" view="clear" onClick={help}><label>?</label></button>
        </div>
      </span>
      <div className="mainbox">
      <label className="shine-button">
          <label className="texts">{lives}</label>
          <svg class="heart" viewBox="0 0 32 29.6">
            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
          </svg>
        </label>
      <TextBox 
        title="Загадка:" 
        size="l" 
        subTitle={wordsRef?.current?.[indexRef?.current]?.["question"]} 
        className="texts text2"
        style={{margin: "2% 0 0 0"}}
        />
      </div>
        <div className="resolut"><Line word={wordsRef?.current?.[indexRef?.current]?.["word"]} indArr={indArr} show={show}/></div>
    </div>
  );
  }
  else{
    return(
      <div className="content">
      <div>
      <TextSkeleton size="headline1" width="20"/>
      </div>
      <div className="resolut"><span><RectSkeleton className="rectsk"/><RectSkeleton className="rectsk"/><RectSkeleton className="rectsk"/><RectSkeleton className="rectsk"/><RectSkeleton className="rectsk"/></span></div>
      <TextSkeleton size="headline1" width="20" lines={2} style={{"marginTop": "4%"}}/>
    </div>
    );
  };
}
