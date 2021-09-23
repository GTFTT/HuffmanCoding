/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';

// import Styles from './styles.module.css';

import GraphGenerator from './components/GraphGenerator';

const getStatistic = (text) => {
    if(!text || text === "") return {};
    const mapObj = {};

    for (var i = 0; i < text.length; i++) {
        const char = text.charAt(i);

        if(mapObj[char]) {
            mapObj[char].count++;
        } else {
            mapObj[char] = { count: 1 };
        }
    }
    return mapObj
}

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

function getGenerationArray(stats) {
    const firstLevel = Object.keys(stats).sort((a, b) => comparator(a, b, stats)).map(key => {
        // return <div>{key} - { stats[key].count }</div>
        return {count: stats[key].count, character: key}
    })

    const buffer = firstLevel.map(val => val);
    const maxIter = 1000;
    let iterCount = 0;

    while (buffer.length > 1 && iterCount < maxIter) {
        iterCount++;
        const last = buffer.pop();
        const prevLast = buffer.pop();
        const newObj = {
            a: prevLast,
            b: last,
            count: prevLast.count + last.count,
        };

        //paste a new one
        buffer.push(newObj);

        //sort
        buffer.sort(comparatorObj);
    }

    console.log(buffer);

    return buffer;
}

export default () => {
    const [text, setText] = useState("");
    const [stats, setStats] = useState({});
    const [generationArray, setGenerationArray] = useState([]);

    useEffect(() => {
        const statsRes = getStatistic(text);
        setStats(statsRes);
    }, [text]);

    useEffect(() => {
        const genArr = getGenerationArray(stats);
        setGenerationArray(genArr);
    }, [stats]);
    

    return (
        <div>
            <input
                type="text"
                value={ text }
                onChange={(e) => {
                    //Check pattern manually
                    const newText = String(e.target.value || "");
                    const res = newText.replace(/[^A-Za-z0-9]/gi, '');;
                    setText(res);
                }}
            ></input>
            <button>OK</button>
            <hr />
            <GraphGenerator generationArray={generationArray} />
        </div>
    );
}