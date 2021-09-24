import React from 'react';

import Styles from './styles.module.css';
import Facebook from './images/Facebook.png';
import Instagram from './images/Instagram.png';
import Twitter from './images/Twitter.png';

function Footer() {
    return (<div className={Styles.mainCont}>
        <div>
            <a href={"https://www.facebook.com/"}>
                <img className={Styles.icon} src={Facebook} alt=""/>
            </a>
            <a href={"https://www.instagram.com/"}>
                <img className={Styles.icon} src={Instagram} alt=""/>
            </a>
            <a href={"https://twitter.com/?lang=en"}>
                <img className={Styles.icon} src={Twitter} alt=""/>
            </a>
        </div>
        <div>SuperSupport@gmail.com</div>
        <div><a href='tel:(257) 462-7501'>(257) 462-7501</a></div>
        <div className={Styles.copyright}>© 2021 WebTechSuperTeck Inc.</div>
    </div>);
}

export default Footer;