import React, {Component, createContext} from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.readTodo();
    }

    // create
    createTodo(event, todo) {
        event.preventDefault();
        axios.post('/api/todo/create', todo)
            .then(response => {
                console.log(response.data);
                let data = [...this.state.todos];
                data.push(response.data.todo);
                this.setState({
                    todos: data,
                })
            }).catch(error => {
            console.error(error);
        })
    }

    // read
    readTodo() {
        axios.get('/api/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data,
                })
            }).catch(error => {
            console.error(error);
        });
    }

    // update
    updateTodo(data) {
        axios.put('/api/todo/update', data)
            .then(response => {
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id
                })

                todo.name = data.name;
                this.setState({
                    todos: todos,
                });
            }).catch(error => {
            console.error(error);
        })

    }

    // delete
    deleteTodo(data) {
        // The signature of axios.delete is different and the data needs to be passed in another data object
        axios.delete('/api/todo/delete', {data: data})
            .then(response => {
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id;
                })

                todos.splice(todos.indexOf((todo)), 1);
                this.setState({
                    todos: todos,
                })
            }).catch(error => {
            console.error(error);
        })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;