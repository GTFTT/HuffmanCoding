import React, { useEffect, useState } from 'react';

import { generateHuffmanCodes } from 'utils';

import Styles from './styles.module.css';

const HuffmanDecoding = ({ huffmanTree }) => {
  const [fullBinCode, setFullBinCode] = useState("");

  useEffect(() => {
    let newBinCode = "";
    const generatedCodes = generateHuffmanCodes(huffmanTree);
    for(let [ , binCode] of generatedCodes) {
      newBinCode += binCode;
    }
    setFullBinCode(newBinCode);
  }, [ huffmanTree ]);

  return (
    <div className={Styles.HuffmanDecoding}>
      <h2>Decoded value</h2>
      <h3>{fullBinCode}</h3>
    </div>
  )
};

export default HuffmanDecoding;
