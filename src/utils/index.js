import _ from 'lodash';

/**
 * Generate new Map with characters codes using recursion
 * @param {*} params.generationArray - Huffman tree object
 * @returns new Map object with generated codes for each character
 */
export const generateHuffmanCodes = (root) => {
        const charsMap = new Map();
        
        function recursiveCodeBuilder(prevCode="", generationNode) {
            if(!generationNode || _.isEmpty(generationNode)) {
                //Do nothing if no object provided
                return;
            }

            if(generationNode.character) {
                //We finished
                charsMap.set(generationNode.character, prevCode)
                // console.log(generationNode.character, " - ", prevCode);
            } else {
                recursiveCodeBuilder(prevCode + generationNode.a.binCode, generationNode.a);
                recursiveCodeBuilder(prevCode + generationNode.b.binCode, generationNode.b);
            }
        }

        recursiveCodeBuilder("", root);
        return charsMap;

};

export const decodeBinCode = (fullBinCode, huffmanTree) => {
    if(!fullBinCode || !huffmanTree || _.isEmpty(huffmanTree)) {
        return "NOTHING";
    }
    
    let text = "";
    let binCodeCopy = "" + fullBinCode;
    const maxIterations = 200;
    let counter = 0;

    function getFirstCharacter(index, treeNode) {
        if(treeNode.character) {
            text += treeNode.character;
            // Remove used part of bin code
            binCodeCopy = binCodeCopy.slice(index, binCodeCopy.length)
        } else {
            binCodeCopy[index] === "1"
                ? getFirstCharacter(index+1, treeNode.a)
                : getFirstCharacter(index+1, treeNode.b);
        }
    }

    while(binCodeCopy.length > 0 && counter++ <= maxIterations) {
        // console.log("Bin: ", binCodeCopy);
        getFirstCharacter(0, huffmanTree);
    }

    if(counter > maxIterations) {
        console.log("Infinite loop interrupted!");
    }
    
    return text;

};