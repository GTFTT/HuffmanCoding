import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';

const HuffmanDecoding = ({ generatedCodes }) => {
  const [fullBinCode, setFullBinCode] = useState("");

  useEffect(() => {
    let newBinCode = "";
    for(let [ , binCode] of generatedCodes) {
      newBinCode += binCode;
    }
    setFullBinCode(newBinCode);
  }, [ generatedCodes ]);

  return (
    <div className={Styles.HuffmanDecoding}>
      <h2>Decoded value</h2>
      <h3>{fullBinCode}</h3>
    </div>
  )
};

export default HuffmanDecoding;
