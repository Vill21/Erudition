import React, { useEffect } from 'react'
import "../SApp.css";

//компонент для отрисовки угадываемого слова
export const Line = (props) => {
    //ответ (верное слово)
    const word = props.word || "";
    //массив открытых букв
    const openedInds = props.indArr;
    //флаг конца отгадывания
    const show = props.show;

    return (
        <span className="container">
            {   
                word.split("").map((item, index) => {
                    var isIn = openedInds.find((element, ind, array) => {
                        return (element - 1) === index;
                    });
                    if (isIn || show) {
                        return (
                            <label className="word" key={index}>{item}</label>
                        );
                    } else {
                        return (
                            <label className="word" key={index}>{}</label>
                        );
                    }
                }) 
            }
        </span>
    );
} 