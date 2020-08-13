import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

class TaskList extends Component {
    state = {
        filterName: '',
        filterStatus: 0, // all 0, Done: 1, Pending: -1
    }

    onChange = (event) => {

        let { target: { name, value } } = event;

        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );
        this.setState({
            [name]: value
        });
    }

    onClick = (e) => {
        e.preventDefault();
        console.log("sort by: ");
        console.log("sort value: ");

    }

    onDeleteAll = () => {
        this.props.onDeleteAll();
    }

    onHighlightAll = () => {
        this.props.onHighlightAll();
    }

    render() {
        const { tasks } = this.props; //const tasks = this.props.tasks
        const { filterName, filterStatus } = this.state;
        const taskElement = tasks.map((task, index) => {
            return <TaskItem
                key={task.id} index={index} task={task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onEdit={this.props.onEdit}
                onHighlight={this.props.onHighlight}
            />
        });


        return (

            
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="">
                        <th className="text-center c1">No.</th>
                        <th className="text-center c2">Tasks</th>
                        <th className="text-center c3">Status</th>
                        <th className="text-center c4">Manipulation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={filterName}
                                onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onChange}
                            >
                                <option value="0">All</option>
                                <option value="-1">Pending</option>
                                <option value="1">Done</option>
                                <option value="2">Highlighting</option>
                            </select>
                        </td>
                        <td className="text-center">
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={this.onHighlightAll}
                            >
                                <span className="fa fa-pencil mr-5" >
                                </span>H-Light All

                            </button>
                            &nbsp;
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={this.onDeleteAll}
                            >
                                <span className="fa fa-trash mr-5"></span>Del All
                            </button>
                        </td>
                    </tr>
                    {taskElement}
                </tbody>
            </table>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks // from index.js(reducer)
    }
}


export default connect(mapStateToProps, null) (TaskList);