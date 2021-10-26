import { SizeOnlySource } from "webpack-sources";

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
    return str.substring(0,index) + chr + str.substring(index+1);
}

/**
 * Corrupt provided bin code by inverting one bin code in each segment of provided length
 * @param {String} binCode - binary code
 * @param {*} offset -  Offset from start of a string to corrupt
 * @param {*} length - Lenght of a binCode block where bit will be corrupted
 */
export function corruptBinCode(binCode, offset, segmentLength=8+4) {

}

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

function getControllingBit(segment, n, startIndex) {
    function getSum(startIndex, endIndex) {
        let sum = 0;
        for(let i = startIndex; i < endIndex; i++) {
            if(segment[i] === "1") sum++;
        }
        return sum;
    }

    let segmentSum = 0;

    for(let j = startIndex; j < segment.length; j+=n) {
        segmentSum += getSum(j, j+n);
    }

    return segmentSum%2
}

export function recalculateControllingBits(binCode, segmentLength=8) {
    let newBinCode = "";

    console.log("Bin code: ", binCode);

    for (let i = 0; i < binCode.length; i+=segmentLength + 4) {
        let segment = "" + binCode.slice(i, i+segmentLength + 4);
        
        // console.log("Segment: ", segment, segment.length);
        // console.log("i, conBit: ", i, ", ", controllingBit);
        
        for(let j = 0; 2**j <= segment.length; j++) {
            // console.log("j: ", j, 2**j);
            let controllingBit = getControllingBit(segment, j+1, j); 
            console.log("Segment: ", segment);
            console.log("controllingBit: ", controllingBit);

            // segment[2**j-1] = controllingBit; //Doesn't work
            // segment.replaceAt(2**j-1, controllingBit); // That either
            segment = setCharAt(segment, 2**j-1, controllingBit);
            // console.log("Character: ", segment[2**j-1]);
        }
        newBinCode += segment;
    }
    
    return newBinCode;
}

export function calculateCorruptedPosition(corruptedBinCodeInitial, segmentLength=8+4) {
    //Recalculate controlling bit by formula
    //Find difference
    //Add positions
    //Return value
}