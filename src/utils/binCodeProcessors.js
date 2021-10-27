/**
 * Check if value is power of two
 * @param {*} x value
 * @returns true or false
 */
function powerOfTwo(x) {
    return (Math.log(x)/Math.log(2)) % 1 === 0;
}

/**
 * @link https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
 * @param {*} str 
 * @param {*} index 
 * @param {*} chr 
 * @returns Newstring
 */
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    const result = str.substring(0,index) + chr + str.substring(index+1);
    return result;
}

export function invertBitAt(str, index) {
    let ch = str[index];
    if(ch === "1") return setCharAt(str, index, "0");
    if(ch === "0") return setCharAt(str, index, "1");
    console.log("Bit not inverted, not a bit!!!");
    return str;
}

/**
 * Corrupt provided bin code by inverting one bin code in each segment of provided length
 * @param {String} binCode - binary code
 * @param {*} offset -  Offset from start of a string to corrupt
 * @param {*} length - Lenght of a binCode block where bit will be corrupted
 */
export function corruptBinCode(binCode, offset=0, segmentLength=8+4) {
    const parsedOffset = parseInt(offset); // VERI IMPORTANT, other types can corrupt result
    let newBinCode = "";
    for(let i = 0; i < binCode.length; i+=segmentLength) {
        let segment = binCode.slice(i, i+segmentLength);
        if(segment[parsedOffset]) {
            segment = invertBitAt(segment, parsedOffset);
        }

        newBinCode += segment;
    }

    return newBinCode;
}

/**
 * Insert characters where controlling bits have to be
 * @param {*} binCode 
 * @param {*} segmentLength 
 * @returns 
 */
export function insertControllingBits(binCode, segmentLength=8) {
    let newBinCode = "";

    //Fill appropriate positions with zeros
    function getNewSegment(segment) {
        let newSegment = "";
        let setCount = 0; //Count of setted bits

        for(let i = 1; i <= segmentLength+setCount; i++) {
            if(powerOfTwo(i)) {
                newSegment += "_";
                setCount++;
                continue;
            }
            if(!segment[i-1-setCount]) break;
            newSegment += segment[i-1-setCount];
        }

        return newSegment;
    }
    
    for (let i = 0; i < binCode.length; i+=segmentLength) {
        newBinCode += getNewSegment(binCode.slice(i, i+segmentLength));
    }
    
    return newBinCode;
}

/**
 * Calculate controling bit for specific position
 * @param {*} segment - String of specific length to calculate bits 
 * @param {*} n bit position(1, 2, 4, 8, 16...)
 * @param {*} startIndex - offset for starting calculation
 * @returns 
 */
function getControllingBit(segment, position) { //n, startIndex
    //Calculate sum of bits(excluding controlling bits)
    function getSum(startIndex, endIndex) {
        let sum = 0;
        for(let i = startIndex; i < endIndex; i++) {
            if(segment[i] === "1" && !powerOfTwo(i+1)) sum++;
        }
        return sum;
    }

    let segmentSum = 0;

    for(let j = position-1; j < segment.length; j+=position*2) {
        segmentSum += getSum(j, j+position);
    }

    return segmentSum%2;
}

export function recalculateControllingBits(binCode, segmentLength=8+4) {
    let newBinCode = "";

    // console.log("\n\nBin code: ", binCode);

    for (let i = 0; i < binCode.length; i+=segmentLength) {
        let segment = "" + binCode.slice(i, i+segmentLength);
        
        // console.log("Segment: ", segment, segment.length);
        // console.log("i, conBit: ", i, ", ", controllingBit);
        
        for(let j = 0; 2**j <= segment.length; j++) {
            // console.log("j: ", j, 2**j);
            let controllingBit = getControllingBit(segment, 2**j); 
            // console.log("controllingBit: ", controllingBit);

            // segment[2**j-1] = controllingBit; //Doesn't work
            // segment.replaceAt(2**j-1, controllingBit); // That either
            segment = setCharAt(segment, 2**j-1, controllingBit);
            // console.log("Segment: ", segment);
            // console.log("Character: ", segment[2**j-1]);
        }
        newBinCode += segment;
    }
    
    return newBinCode;
}

/**
 * Calculate position of corrupted bit in one segment
 * @param {*} segment 
 * @param {*} segmentLength 
 * @returns position of corrupted bit (position is staring from 1, not 0 !!!)
 */
export function calculateCorruptedPosition(segment, segmentLength=8+4) {
    const recalculated = recalculateControllingBits(segment);
    let position = 0;
    // console.log("\n\nCor: ", corruptedBinCode);
    // console.log("Rec: ", recalculated);

    for(let i = 0; 2**i <= segment.length; i++) {
        if(recalculated[2**i-1] !== segment[2**i-1]) {
            position += 2**i;
        }
    }
    return position;
}

/**
 * Fix corrupted bit in each segment
 * @param {*} corruptedBinCode 
 * @param {*} [segmentLength = 8+4] 
 * @returns 
 */
export function fixCorruptedBinCode(corruptedBinCode, segmentLength=8+4) {
    let newBinCode = "";

    for(let i = 0; i <= corruptedBinCode.length; i+=segmentLength) {
        let segment = corruptedBinCode.slice(i, i+segmentLength);
        let position = calculateCorruptedPosition(segment);

        newBinCode += invertBitAt(segment, position-1);
    }

    return newBinCode;
}