import React from 'react';

import Styles from './styles.module.css';

function Header() {
    return (<div className={Styles.mainCont}>
        <div className={Styles.title}>
            Huffman coding
        </div>
    </div>);
}

export default Header;