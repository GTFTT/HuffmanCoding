/**
 * Generate new Map with characters codes using recursion
 * @param {*} params.generationArray - Huffman tree object
 * @returns new Map object with generated codes for each character
 */
export const generateHuffmanCodes = (root) => {
        const charsMap = new Map();

        function recursiveCodeBuilder(prevCode="", generationNode) {
            if(!generationNode) {
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