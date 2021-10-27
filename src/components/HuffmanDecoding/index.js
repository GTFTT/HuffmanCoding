import React, { useEffect, useState } from 'react';

import { generateHuffmanCodes, decodeBinCode, generateBinCode, invertBitAt } from 'utils';

import Styles from './styles.module.css';

const HuffmanDecoding = ({ huffmanTree, text }) => {
  const [fullBinCode, setFullBinCode] = useState("");

  useEffect(() => {
    let newBinCode = "";
    const generatedCodes = generateHuffmanCodes(huffmanTree);
    newBinCode = generateBinCode(generatedCodes, text);
    setFullBinCode(newBinCode);
  }, [ huffmanTree, text ]);

  return (
    <div className={Styles.HuffmanDecoding}>
      <h2>Binary code</h2>
      <h3>Decoded value</h3>
      {decodeBinCode(fullBinCode, huffmanTree)}
      <h3>Corrupted decoded value(bin at position 0)</h3>
      {decodeBinCode(invertBitAt(fullBinCode, 0), huffmanTree)}
    </div>
  )
};

export default HuffmanDecoding;
