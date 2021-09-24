import React from 'react';

import Styles from './styles.module.css';
import HuffmanImage from './images/HuffmanImage.png';

function AboutHuffman() {
    return (
        <div>
            <div className={Styles.title}>
                About
            </div>
            <div className={Styles.infoCont}>
                <div>
                    <img className={Styles.huffmanTreeImage} src={ HuffmanImage } alt="" />
                </div>
                <div className={Styles.text}>
                    Huffman coding is a lossless data compression algorithm.
                    The idea is to assign variable-length codes to input characters,
                    lengths of the assigned codes are based on the frequencies of corresponding characters.
                    The most frequent character gets the smallest code and the least frequent character gets the largest code.
                    <br/>
                    <a href={ "https://en.wikipedia.org/wiki/Huffman_coding" }>On wikipedia.</a>
                </div>
            </div>
        </div>
        
    );
}

export default AboutHuffman;