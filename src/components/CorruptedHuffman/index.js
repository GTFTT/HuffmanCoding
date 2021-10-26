import React from 'react';

import { insertControllingBits, recalculateControllingBits } from "utils";

function index({binCode}) {
    return (
        <div>
            <h2>Code corrupting</h2>
            {binCode}
            <br />
            {insertControllingBits(binCode)}
            <br />
            {recalculateControllingBits(insertControllingBits(binCode))}
        </div>
    );
}

export default index;