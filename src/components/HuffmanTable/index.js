import React from 'react';
import _ from 'lodash';

import Styles from './styles.module.css';

const HuffmanTable = ({ generatedCodes }) => {
  return (
    <div className={Styles.HuffmanTable}>
      <h2>Table of codes</h2>
      <table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {
            _.map(Array.from(generatedCodes.keys()), (val) => {
              return <tr>
                <td>{val}</td>
                <td>{generatedCodes.get(val)}</td>
              </tr>
            })
          }
        </tbody>
      </table>
      
    </div>
  )
};


export default HuffmanTable;
