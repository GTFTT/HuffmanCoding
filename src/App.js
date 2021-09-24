//vedor
import React, { Component } from 'react';

import { HuffmanCoding } from 'pages';
import { Header } from 'common';

import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className={ "contentCont" }>
                    <HuffmanCoding />
                </div>
            </div>
        );
    }
}

