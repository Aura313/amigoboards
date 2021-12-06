import React from 'react';
import './UserStories.scss'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export class DeleteUserStory extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteTodo(c) {
        this.props.deleteHandler(c);
    }

    render() {
        const todoElements = this.props.todos
            // const todoItem = this.props
            .map((c, i) => <li key={i}>{c.title}--{c.completionStatus ? 'Completed!' : 'Not Completed!'}
                <br></br>
                <button onClick={this.deleteTodo.bind(this, c)}>Delete</button>
            </li>);
        return (
            <body><div className="wrapper"> 
            <header>List Items</header>
            <div className="todos-container">
                <div><ul className="items">{todoElements}</ul>
            </div></div></div>
            </body>
        )
    }
}

