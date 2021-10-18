import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Test.module.css';
import {IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl';

// Translated messages in French with matching IDs to what you declared
const messagesInFrench = {
  myMessage: "Aujourd'hui, c'est le {ts, date, ::yyyyMMdd}",
}

const messagesInEnglish = {
  myMessage: "Hello english",
}

const Test = () => {
  const [lang, setLang] = useState("french");
  return (
    <IntlProvider messages={lang==="french"? messagesInFrench: messagesInEnglish} locale={lang} defaultLocale="fr">
      <input defaultChecked={true} type="checkbox" onChange={e => setLang(e.target.checked? "french": "english")}/>
      <p>
        <FormattedMessage
          id="myMessage"
        />
        <br />
        <FormattedNumber value={19} style="currency" currency="EUR" />
      </p>
    </IntlProvider>
  )
};

Test.propTypes = {};

Test.defaultProps = {};

export default Test;