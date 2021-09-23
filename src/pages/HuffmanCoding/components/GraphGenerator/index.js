/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Styles from './styles.module.css';

/**
 * Recursively generate columns
 * "aaaoobbeencrteiv" - for testing
 */
function generateCols(obj) {
	const {a, b, count, character} = obj || {};
	if(!obj || !count) return null;

	return (
		<li>
			<span>{ String(count) }</span>
			<ul>
				{
					!(a && b)
						? <span>{ String(character || "") }</span>
						: null
				}
				{generateCols(a)}
				{generateCols(b)}
			</ul>
		</li>
	);
}

export default (props) => {
    const {
        generationArray,
    } = props;

    // console.log("generationArray: ", generationArray);

    return (
		<div className={Styles.mainCont}>
			<div className={Styles.tree}>
				<ul>
					{generateCols(generationArray[0])}
				</ul>
			</div>
		</div>
    );
}