/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';

// import Styles from './styles.module.css';

import GraphGenerator from './components/GraphGenerator';


//Sort in descending order based on count
const comparatorObj = (a, b) => {
    if(a.count === b.count) return 0;
    if(a.count > b.count) return -1;
    return 1;
}

const comparator = (a, b, stats) => {
    if(stats[a].count === stats[b].count) return 0;
    if(stats[a].count > stats[b].count) return -1;
    return 1;
}

const getInitialHuffmanArray = (text) => {
    if(!text || text === "") return [];
    const mapOfFrequency = {};

    for (var i = 0; i < text.length; i++) {
        const char = text.charAt(i);

        if(mapOfFrequency[char]) {
            mapOfFrequency[char].count++;
        } else {
            mapOfFrequency[char] = { count: 1 };
        }
    }

    const initialHuffmanArray = Object.keys(mapOfFrequency)
        .sort((a, b) => comparator(a, b, mapOfFrequency))
        .map(key => {
            return {count: mapOfFrequency[key].count, character: key}
        });

    return initialHuffmanArray;
}

function getGenerationArray(initialHuffmanArray) {
    const buffer = initialHuffmanArray.map(val => val); //Create copy to prevent array from overwriting
    const maxIter = 100; //Prevent infinity loop
    let iterCount = 0;

    while (buffer.length > 1 && iterCount < maxIter) {
        iterCount++;

        //sort in desc order
        buffer.sort(comparatorObj);

        //Replace last two with a new one
        const last = buffer.pop();
        const prevLast = buffer.pop();
        const newObj = {
            a: prevLast,
            b: last,
            count: prevLast.count + last.count,
        };

        //paste a new one
        buffer.push(newObj);
    }

    return buffer;
}

export default () => {
    const [text, setText] = useState("");
    const [generationArray, setGenerationArray] = useState([]);

    useEffect(() => {
        const initHuffmanArr = getInitialHuffmanArray(text);
        const generationTreeObject = getGenerationArray(initHuffmanArr);
        setGenerationArray(generationTreeObject);
    }, [text]);

    return (
        <div>
            <input
                type="text"
                value={ text }
                onChange={(e) => {
                    //Check pattern manually
                    const newText = String(e.target.value || "");
                    const res = newText.replace(/[^A-Za-z0-9 ]/gi, '');;
                    setText(res);
                }}
            />
            <hr />
            <GraphGenerator generationArray={ generationArray } />
        </div>
    );
}