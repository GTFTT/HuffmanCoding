import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Styles from './styles.module.css';

import {
    insertControllingBits,
    recalculateControllingBits,
    corruptBinCode,
    fixCorruptedBinCode,
} from "utils";

function generateBinCode(binCode) {
    return <div>
        {_.map(binCode, (ch, index) => {
            return <span key={index} className={Styles.binCharacter}>{ch}</span>
        })}
    </div>
}

function CorruptedHuffman({binCode}) {
    const [corruptingOffset, setCorruptingOffset] = useState(0);
    const [binCodeWithControllingBits, setBinCodeWithControllingBits] = useState("");
    const [binCodeWithCalculatedControllingBits, setBinCodeWithCalculatedControllingBits] = useState("");
    const [corruptedBinCode, setCorruptedBinCode] = useState("");
    const [fixedBinCode, setFixedBinCode] = useState("");

    useEffect(() => {
        const newBinCodeWithControllingBits = insertControllingBits(binCode);
        setBinCodeWithControllingBits(newBinCodeWithControllingBits);

    }, [ binCode ]);

    useEffect(() => {
        const newBinCodeWithCalculatedControllingBits = recalculateControllingBits(binCodeWithControllingBits);
        setBinCodeWithCalculatedControllingBits(newBinCodeWithCalculatedControllingBits);
    }, [ binCodeWithControllingBits ]);

    useEffect(() => {
        const newCorruptedBinCode = corruptBinCode(binCodeWithCalculatedControllingBits, corruptingOffset);
        const newFixedBinCode = fixCorruptedBinCode(newCorruptedBinCode);
        setCorruptedBinCode(newCorruptedBinCode);
        setFixedBinCode(newFixedBinCode);
    }, [ corruptingOffset, binCodeWithCalculatedControllingBits ]);
    
    

    return (
        <div className={Styles.mainCont}>
            <h2>Code corrupting</h2>
            <h3>Binary code</h3>
            {generateBinCode(binCode)}
            <h3>Where to insert controlling bits</h3>
            {generateBinCode(binCodeWithControllingBits)}

            <h3>Corrupting</h3>
            <input
                type="range"
                onChange={e => setCorruptingOffset(e.target.value)}
                value={corruptingOffset}
                min={0}
                max={7}
                step={1}
            />
            {generateBinCode(binCodeWithCalculatedControllingBits)}
            {generateBinCode(corruptedBinCode)}
            <br />
            <h3>Fixed bits</h3>
            {generateBinCode(fixedBinCode)}
            <br />
        </div>
    );
}

export default CorruptedHuffman;