import React, { Component } from 'react';
import './css/App.css';
import './components/TaskForm';
import TaskForm from './components/TaskForm';
import Sort from './components/Sort';
import TaskList from './components/TaskList';
import AddItem from './components/AddItem';


class App extends Component {
    state = {
        tasks: [],
        isDisplayForm: false,       // uss in case adding multiple field, such as user management.
        filter: {
            name: '',
            status: 0
        },
        sort: {
            by: 'name',
            value: 1
        }
    }

    // this function is called once after refresh the page
    // to paste the data in localStorage to setState
    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            //convert strings to object
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onSubmit = (data) => {
        const { tasks } = this.state;
        data.id = this.generateID(); //add ID attribution to data (tasks)
        tasks.push(data);
        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks);
    }

    onUpdateStatus = (id) => {
        let tempTask = this.state.tasks.map((task) => {
            if (task.id === id) {
                task.status = !task.status;
            }
            return task;

        });

        this.setState({
            tasks: tempTask
        });
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    onDelete = (id) => {
        let tempTask = this.state.tasks.filter(task =>
            task.id !== id);
        this.setState({
            tasks: tempTask
        });

        localStorage.setItem('tasks', JSON.stringify(tempTask));
        // this doesn't work because this.setState may not update fast enough
        //localStorage.setItem('tasks', JSON.stringify(this.state.tasks));       
    }

    onEdit = (id, data) => {
        const { tasks } = this.state;

        if (id === '') {
            // add a new task
            data.id = this.generateID();
            tasks.push(data);
        } else {
            // edit current task
            let tempTask = this.state.tasks.map((task) => {
                if (task.id === id) {
                    task.title = data.title;
                }
                return task;
            });

            this.setState({
                tasks: tempTask
            });

        }

        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        });
    }

    onHighlight = (highlightID) => {

        let tempTask = this.state.tasks.map((task) => {
            if (task.id === highlightID) {
                task.isHighlight = !task.isHighlight;
            }
            return task;
        });

        this.setState({
            tasks: tempTask
        });
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));

    }

    onDeleteAll = () => {
        
        let tempTask = [];
        this.setState({
            tasks: []
        },()=>{
            localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); 
        });
        // this sometimes doesn't work because setState() is async.
        // need to use call back function as above
        // localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); 
    }

    onHighlightAll = () => {
        let {tasks} = this.state;
        let count = 0;
        let tempTask;
        console.log('begin1: ', tasks)
        tasks.map((task)=>{
            if(task.isHighlight === true){
                count++;
            }
        });
        console.log('count: ', count)

        console.log('begin: ', tasks, 'temptask: ', tempTask)

        if(count === tasks.length){
            tempTask = tasks.map((task)=>{
                task.isHighlight = false;
                return task;
            });
        } else{
            tempTask = tasks.map((task)=>{
                task.isHighlight = true;
                return task;
            });
        }

        this.setState({
            tasks: tempTask
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    render() {
        let { tasks, isDisplayForm, filter, sort } = this.state;

        const taskFormElement = isDisplayForm ?
            <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} /> : '';

        // search
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.title.toLowerCase().indexOf(filter.name) !== -1;
                });
            }

            tasks = tasks.filter((task) => {
                if (filter.status === 0) {
                    return task;
                } else if (filter.status === 2) {
                    return task.isHighlight === true;
                }
                else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            });

        }

        // sort
        if (sort.by === 'status' && sort.value === 2) {
            tasks = tasks;
        }
        if (sort.by === 'name') {

            tasks.sort((a, b) => {
                if (a.title > b.title) return sort.value;
                else if (a.title < b.title) return -sort.value;
                else return 0;
            });

        }
        else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0;
            });
        }


        return (
            <div className="container">
                <div className="text-center">
                    <h1>To-do List</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'width-30' : ''}>
                        {/* form */}
                        {taskFormElement}
                    </div>
                    <div className={isDisplayForm ? 'width-60' : 'width-100'}>

                        {/* Open task form */}
                        {/* <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Add a task
                        </button> */}
                        <div className="main-bar">
                            <AddItem onSubmit={this.onSubmit} />
                            {/* Sort */}
                            <Sort
                                onSort={this.onSort}
                            />
                        </div>

                        {/* List */}
                        <div className="row">
                            <div className="width-100 mt-15">
                                <TaskList
                                    tasks={tasks}
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDelete={this.onDelete}
                                    onEdit={this.onEdit}
                                    onSubmit={this.onSubmit}
                                    onFilter={this.onFilter}
                                    onHighlight= {this.onHighlight}
                                    onDeleteAll= {this.onDeleteAll}
                                    onHighlightAll={this.onHighlightAll}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

