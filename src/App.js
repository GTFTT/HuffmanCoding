//vedor
import React, { Component } from 'react';

import { AboutHuffman, HuffmanCoding } from 'components';
import { Header, Footer } from 'common';

import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className={ "contentCont" }>
                    <AboutHuffman />
                    {/* <HuffmanCoding /> */}
                </div>
                <Footer />
            </div>
        );
    }
}

