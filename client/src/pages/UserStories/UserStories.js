import React from 'react';
import AppTable from '../../components/UserStories/AppTable.js';
import Typography from '@material-ui/core/Typography';
import './UserStories.scss';
import Paper from '@material-ui/core/Paper';

export class UserStories extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <body>
                <Typography color='textSecondary'>User Stories</Typography>
                <AppTable />
            </body>
        )
    }
}