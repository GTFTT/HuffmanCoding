import React from 'react';
import {FormattedMessage} from 'react-intl';


import Styles from './styles.module.css';
import HuffmanImage from './images/HuffmanImage.png';

/**
 * Host information about Huffman algorithm
 */
function AboutHuffman() {
    return (
        <div>
            <div className={Styles.title}>
                <FormattedMessage id="huffmanCodeTitle"/>
            </div>
            <div className={Styles.infoCont}>
                <div>
                    <img className={Styles.huffmanTreeImage} src={ HuffmanImage } alt="" />
                </div>
                <div className={Styles.text}>
                    <FormattedMessage id="huffmanCodeIntro"/>
                    <br/>
                    <a href={ "https://en.wikipedia.org/wiki/Huffman_coding" }>On wikipedia.</a>
                </div>
            </div>
            <div>
                <h3>Example text</h3>
                A robot is a machine especially one programmable by a computer capable of carrying out a complex series of actions automatically. A robot can be guided by an external control device, or the control may be embedded within. Robots may be constructed to evoke human form, but most robots are task-performing machines, designed with an emphasis on stark functionality, rather than expressive aesthetics. Robots can be autonomous or semi-autonomous and range from humanoids such as Honda's Advanced Step in Innovative Mobility (ASIMO) and TOSY's TOSY Ping Pong Playing Robot to industrial robots, medical operating robots, patient assist robots, dog therapy robots, collectively programmed swarm robots, UAV drones such as General Atomics MQ-1 Predator, and even microscopic nano robots. By mimicking a lifelike appearance or automating movements, a robot may convey a sense of intelligence or thought of its own. Autonomous things are expected to proliferate in the future, with home robotics and the autonomous car as some of the main drivers. The branch of technology that deals with the design, construction, operation, and application of robots, as well as computer systems for their control, sensory feedback, and information processing is robotics. These technologies deal with automated machines that can take the place of humans in dangerous environments or manufacturing processes, or resemble humans in appearance, behavior, or cognition. Many of today's robots are inspired by nature contributing to the field of bio-inspired robotics. These robots have also created a newer branch of robotics soft robotics.From the time of ancient civilization, there have been many accounts of user-configurable automated devices and even automata resembling humans and other animals, designed primarily as entertainment. As mechanical techniques developed through the Industrial age, there appeared more practical applications such as automated machines, remote-control and wireless remote-control.
            </div>
        </div>
        
    );
}

export default AboutHuffman;