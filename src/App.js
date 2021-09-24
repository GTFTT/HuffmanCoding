//vedor
import React, { Component } from 'react';

import { HuffmanCoding } from 'pages';
import { Header } from 'common';


export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <HuffmanCoding />
            </div>
        );
    }
}

