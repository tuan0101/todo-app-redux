import React, { Component } from 'react';

class TaskItem extends Component {

    state = {
        title: '',
        isHighlight: false
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onChange = (event) => {
        let { target: { name, value } } = event;

        this.setState({
            [name]: value
        });
    }

        

    onEnterKey= (event) => {
        if (event.keyCode === 13) {
            event.target.blur(); // remove focus after press enter
            this.props.onEdit(this.props.task.id, this.state);
        }
    }

    onSave = () => {
        console.log('title: ' + this.state.title);


    }

    onHighlight = () => {
        this.setState({
            isHighlight: !this.state.isHighlight
        });
        this.props.onHighlight(this.props.task.id);
        
    }

    // get highlight status and title updated when refreshing the page
    componentDidMount(){
        this.setState({
            title: this.props.task.title,           
            isHighlight: this.props.task.isHighlight
        });
    }

    // update after setting all-Highlight
    static getDerivedStateFromProps(props, state) {
        return {isHighlight: props.task.isHighlight};
    }


    render() {
        const { task, index } = this.props;

        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td>
                    <input 
                        type="text"
                        name="title"
                        className={'input-cell ' + (this.state.isHighlight === true ? "glow" : "")}
                        style={ inputStyle }
                        value={this.state.title}
                        onChange={this.onChange}
                        onKeyUp={ this.onEnterKey }                       
                    />


                </td>
                <td className="text-center">
                    <span
                        style={{ cursor: 'pointer' }}
                        className={task.status === true ?
                            'label label-success' : 'label label-danger'}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? 'Done' : 'Pending'}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ this.onHighlight }
                    >
                        <span className="fa fa-pencil mr-5" >
                        </span>Highlight

                    </button>
                        &nbsp;
                        <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Delete
                        </button>
                </td>
            </tr>
        );
    }
}
const inputStyle = {
    fontSize: "17px",
    border: "none",
    background: "transparent",
    width: "100%",
    height: "inherit",
    opacity: "100"
}

export default TaskItem;