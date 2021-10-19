//vedor
import React, { useEffect, useState } from 'react';
import {IntlProvider} from 'react-intl';

import { AboutHuffman, HuffmanCoding, HuffmanTable, HuffmanDecoding } from 'components';
import { Header, Footer } from 'common';
import { generateHuffmanCodes } from 'utils';
import messages from './messages.js';


import './App.css';

export default function App() {
    const [lang, setLang] = useState('uk');
    const [text, setText] = useState("");
    const [generatedCodes, setGeneratedCodes] = useState(new Map());
    const [huffmanTree, setHuffmanTree] = useState({});

    useEffect(() => {
        const newCodes = generateHuffmanCodes(huffmanTree);
        setGeneratedCodes(newCodes);
    }, [huffmanTree]);

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
                    <HuffmanTable generatedCodes={ generatedCodes }/> {/* Important!!! Do not pass arrow function here, it will cause infinite rendering */}
                    <HuffmanDecoding huffmanTree={ huffmanTree } text={text}/>
                </div>
                <Footer />
            </IntlProvider>
        </div>
    );
}

// export default class App extends Component {
//     constructor(props) {
//         super(props);
        
//         this.state= {
//             lang: "uk",
//             generatedCodes: new Map(),
//         }
//     }
    
//     render() {
//         return (
//             <div>
//                 <IntlProvider messages={this.state.lang==="uk"? messages.uk: messages.en} locale={this.state.lang} defaultLocale="uk">
//                     <div>
//                         <input
//                             defaultChecked={true}
//                             type="checkbox"
//                             onChange={e => this.setState({lang: e.target.checked? "uk": "en"})}
//                         />
//                     </div>
//                     <Header />
//                     <div className={ "contentCont" }>
//                         <AboutHuffman />
//                         {/* <HuffmanCoding codesGenerated={val => console.log(val)}/> */}
//                         {/* <HuffmanCoding codesGenerated={val => !_.isEqual(this.state.generatedC0des, val) && this.setState({generatedCodes: val})}/> */}
//                         {/* <HuffmanDecoding generatedCodes={this.state.generatedCodes}/> */}
//                     </div>
//                     <Footer />
//                 </IntlProvider>
//             </div>
//         );
//     }
// }

