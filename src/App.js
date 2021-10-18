//vedor
import React, { Component, useState } from 'react';

import { AboutHuffman, HuffmanCoding, Test } from 'components';
import { Header, Footer } from 'common';
import messages from './messages.js';
import {IntlProvider} from 'react-intl';


import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state= {
            lang: "uk",
        }
    }
    
    render() {
        return (
            <div>
                <IntlProvider messages={this.state.lang==="uk"? messages.uk: messages.en} locale={this.state.lang} defaultLocale="uk">
                    <div>
                        <input
                            defaultChecked={true}
                            type="checkbox"
                            onChange={e => this.setState({lang: e.target.checked? "uk": "en"})}
                        />
                    </div>
                    <Header />
                    <div className={ "contentCont" }>
                        {/* <Test /> */}
                        <AboutHuffman />
                        <HuffmanCoding codesGenerated={console.log}/>
                    </div>
                    <Footer />
                </IntlProvider>
            </div>
        );
    }
}

