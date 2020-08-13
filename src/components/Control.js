import React, { Component } from 'react';
import Sort from './Sort';


class Control extends Component {
    state = {}
    render() {
        return (
            <div className="row mt-15">
                <Sort />
            </div>
        );
    }
}

export default Control;