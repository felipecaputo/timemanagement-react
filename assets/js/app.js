'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ActivityList from './components/activity/ActivityList.jsx';

var list = [
    {
        id: 1,
        title: 'Titulo 1',
        category: 'Categoria 1',
        project: 'Project 1'
    },
    {
        id:2,
        title: 'Titulo 2',
        category: 'Categoria 2',
        project: 'Project 2'
    },
    {
        id: 3,
        title: 'Titulo 2',
        category: 'Categoria 2',
        project: 'Project 2'
    }
];

ReactDOM.render(<ActivityList activityList= { list }/>,
    document.getElementById('main'));