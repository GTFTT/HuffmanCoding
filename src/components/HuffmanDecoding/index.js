import React, { useEffect, useState } from 'react';

import { generateHuffmanCodes, decodeBinCode, generateBinCode } from 'utils';

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
      <h3>{fullBinCode}</h3>
      <h2>Decoded value</h2>
      {decodeBinCode(fullBinCode, huffmanTree)}
    </div>
  )
};

export default HuffmanDecoding;
