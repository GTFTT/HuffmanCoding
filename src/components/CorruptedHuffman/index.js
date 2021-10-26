import React from 'react';
import _ from 'lodash';

import Styles from './styles.module.css';

import {
    insertControllingBits,
    recalculateControllingBits,
    corruptBinCode,
    calculateCorruptedPosition,
} from "utils";

function generateBinCode(binCode) {
    return <div>
        {_.map(binCode, (ch) => {
            return <span className={Styles.binCharacter}>{ch}</span>
        })}
    </div>
}

function index({binCode}) {

    const binCodeWithControllingBits = insertControllingBits(binCode);
    const binCodeWithCalculatedControllingBits = recalculateControllingBits(binCodeWithControllingBits);
    const corruptedBinCode = corruptBinCode(binCodeWithCalculatedControllingBits, 5);

    //

    return (
        <div className={Styles.mainCont}>
            <h2>Code corrupting</h2>
            {generateBinCode(binCode)}
            {generateBinCode(binCodeWithControllingBits)}
            {generateBinCode(binCodeWithCalculatedControllingBits)}
            {generateBinCode(corruptedBinCode)}
            <br />
            {/* {calculateCorruptedPosition(binCodeWithCalculatedControllingBits)} */}
            {/* {calculateCorruptedPosition(corruptedBinCode)} */}
        </div>
    );
}

export default index;