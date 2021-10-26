import React from 'react';

import {
    insertControllingBits,
    recalculateControllingBits,
    corruptBinCode,
    calculateCorruptedPosition,
} from "utils";

function index({binCode}) {

    const binCodeWithControllingBits = insertControllingBits(binCode);
    const binCodeWithCalculatedControllingBits = recalculateControllingBits(binCodeWithControllingBits);
    const corruptedBinCode = corruptBinCode(binCodeWithCalculatedControllingBits, 5);

    //

    return (
        <div>
            <h2>Code corrupting</h2>
            {binCode}
            <br />
            {binCodeWithControllingBits}
            <br />
            {binCodeWithCalculatedControllingBits}
            <br />
            {corruptedBinCode}
            <br />
            {/* {calculateCorruptedPosition(binCodeWithCalculatedControllingBits)} */}
            {/* {calculateCorruptedPosition(corruptedBinCode)} */}
        </div>
    );
}

export default index;