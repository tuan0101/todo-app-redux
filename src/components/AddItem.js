import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class AddItem extends Component {
    state = {
        title: '',
        status: false,
        isHighlight: false
    }

    onChange = (event) => {
        // const target = event.target;
        // const field = target.name;
        // let value = target.value;
        let { target: { name, value } } = event;

        this.setState({
            [name]: value
        });
        console.log('onChange: ' + this.state.title);
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.title){   // prevent adding an empty string
            // this.props.onSubmit(this.state);
            this.props.onAddItem(this.state);
            this.setState({
                title: '',
                status: false
            });
        }

    }


    render() {
        return (
            <div className="width-50 ">
                <form onSubmit={this.onSubmit} className="input-group">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Add a task..."
                        value={this.state.title}
                        onChange={this.onChange}
                    />

                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-primary">
                            <span className="fa fa-plus mr-5"></span>Add
                        </button>
                    </span>
                </form>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItem: (item) => {
            dispatch(actions.addItem(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddItem);