import React from 'react';
import {FormattedMessage} from 'react-intl';


import Styles from './styles.module.css';
import HuffmanImage from './images/HuffmanImage.png';

/**
 * Host information about Huffman algorithm
 */
function AboutHuffman() {
    return (
        <div>
            <div className={Styles.title}>
                <FormattedMessage id="huffmanCodeTitle"/>
            </div>
            <div className={Styles.infoCont}>
                <div>
                    <img className={Styles.huffmanTreeImage} src={ HuffmanImage } alt="" />
                </div>
                <div className={Styles.text}>
                    <FormattedMessage id="huffmanCodeIntro"/>
                    <br/>
                    <a href={ "https://en.wikipedia.org/wiki/Huffman_coding" }>On wikipedia.</a>
                </div>
            </div>
        </div>
        
    );
}

export default AboutHuffman;