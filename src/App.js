//vedor
import React, { useEffect, useState } from 'react';
import {IntlProvider} from 'react-intl';

import {
    AboutHuffman,
    HuffmanCoding,
    HuffmanTable,
    HuffmanDecoding,
    CorruptedHuffman,
} from 'components';
import { Header, Footer } from 'common';
import { generateHuffmanCodes, generateBinCode } from 'utils';
import messages from './messages.js';


import './App.css';

export default function App() {
    const [lang, setLang] = useState('uk');
    const [text, setText] = useState("");
    const [fullBinCode, setFullBinCode] = useState("");
    const [generatedCodes, setGeneratedCodes] = useState(new Map());
    const [huffmanTree, setHuffmanTree] = useState({});

    useEffect(() => {
        const newCodes = generateHuffmanCodes(huffmanTree);
        setGeneratedCodes(newCodes);
    }, [huffmanTree]);

    useEffect(() => {
        const newBinCode = generateBinCode(generatedCodes, text);
        setFullBinCode(newBinCode);
    }, [generatedCodes, text]);

    return (
        <div>
            <IntlProvider messages={lang==="uk"? messages.uk: messages.en} locale={lang} defaultLocale="uk">
                <div>
                    <input
                        defaultChecked={true}
                        type="checkbox"
                        onChange={e => setLang( e.target.checked? "uk": "en")}
                    />
                </div>
                <Header />
                <div className={ "contentCont" }>
                    <AboutHuffman />
                    {/* <HuffmanCoding codesGenerated={val => console.log(val)}/> */} {/*In this case event loop isn.t caused as there isn't setState or something*/}
                    <HuffmanCoding huffmanTreeGenerated={ setHuffmanTree } onTextEntered={ setText } /> {/* Important!!! Do not pass arrow function here, it will cause infinite rendering */}
                    <HuffmanTable generatedCodes={ generatedCodes }/>
                    <HuffmanDecoding huffmanTree={ huffmanTree } text={text}/>
                    <CorruptedHuffman binCode={ fullBinCode }/>
                </div>
                <Footer />
            </IntlProvider>
        </div>
    );
}