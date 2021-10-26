import React from 'react';

import {
    insertControllingBits,
    recalculateControllingBits,
    corruptBinCode,
} from "utils";

function index({binCode}) {

    const binCodeWithControllingBits = insertControllingBits(binCode);
    const binCodeWithCalculatedControllingBits = recalculateControllingBits(binCodeWithControllingBits);
    const corruptedBinCode = corruptBinCode(binCodeWithCalculatedControllingBits);

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
        </div>
    );
}

export default index;