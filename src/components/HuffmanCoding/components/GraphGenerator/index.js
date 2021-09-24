/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Styles from './styles.module.css';

/**
 * Recursively generate columns
 * "aaaoobbeencrteiv" - for testing
 */
function generateCols(obj) {
	const {a, b, count, character, binCode} = obj || {};
	if(!obj || !count) return null;

	return (
		<li>
			<span>
				{ String(count) }
				{
					binCode
					? <h1 className={Styles.binCode}>{binCode}</h1>
					: null
				}
			</span>
			<ul>
				{
					!(a && b)
						? <span className={Styles.characterCont}>{ String(character || "") }</span>
						: null
				}
				{generateCols(a)}
				{generateCols(b)}
			</ul>
		</li>
	);
}

/**
 * This component generates graph based on supplied generationArray objects(it has tree structure and generation information)
 * @param props.generationArray - specially structured generation array
 */
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