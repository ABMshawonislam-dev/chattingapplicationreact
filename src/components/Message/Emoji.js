import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


class Emoji extends Component {
    render() {
        return (
            <div>
                <Picker set='apple' />
            </div>
        );
    }
}

export default Emoji;
