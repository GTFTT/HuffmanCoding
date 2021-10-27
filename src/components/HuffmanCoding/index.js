/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import Styles from './styles.module.css';

import GraphGenerator from './components/GraphGenerator';


/** Sort in descending order based on count */
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

/**
 * Convert string into initial array: [{character: '...', count: ...}, ...]
 * @param {*} text - text to proceed
 */
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

/**
 * Get generation object required to build graph
 * Generation object is a tree which contains information about what are child nodes and additional variables
 * @param {*} initialHuffmanArray - Array of objects{character: '...', count: '...'}
 */
function getGenerationArray(initialHuffmanArray) {
    const buffer = initialHuffmanArray.map(val => val); //Create copy to prevent array from overwriting

    while (buffer.length > 1) {
        buffer.sort(comparatorObj);

        //Replace last two with a new one
        const last = buffer.pop();
        const prevLast = buffer.pop();
        //paste a new one
        buffer.push({
            a: {
                ...prevLast,
                binCode: "1"
            },
            b: {
                ...last,
                binCode: "0"
            },
            count: prevLast.count + last.count,
        });
    }

    return buffer;
}

/**
 * Fully featured component to work with Huffman algorithm
 * 
 * @callback huffmanTreeGenerated(huffmanTree) - called when Huffman tree is generated from text
 * @callback onTextEntered(text) - called when new text entered
 */
export default ({ huffmanTreeGenerated, onTextEntered }) => {
    const [text, setText] = useState("");
    const [generationArray, setGenerationArray] = useState([]);

    useEffect(() => {
        const initHuffmanArr = getInitialHuffmanArray(text);
        const generationTreeObject = getGenerationArray(initHuffmanArr);
        console.log();
        setGenerationArray(generationTreeObject);
        onTextEntered && onTextEntered(text);
    }, [text, onTextEntered]);

    // Call callback to pass huffman tree value to parent component
    useEffect(() => {
        const root = generationArray[0];
        huffmanTreeGenerated && huffmanTreeGenerated(root);
    }, [generationArray, huffmanTreeGenerated]);

    return (
        <div>
            <div className={Styles.title}>
                <FormattedMessage id="tryIt"/>
            </div>
            <div className={ Styles.inputCont }>
                <input
                    type="text"
                    value={ text }
                    className={Styles.input}
                    onChange={(e) => {
                        //Check pattern manually
                        let newText = String(e.target.value || "");
                        newText.toLowerCase();
                        const res = newText.replace(/[^А-Яа-яA-Za-z0-9[]()"'!@#\$%_ ]/gi, '');
                        setText(res);
                    }}
                />
            </div>
            <div className={ Styles.graphCont }>
                <GraphGenerator generationArray={ generationArray } />
            </div>
        </div>
    );
}