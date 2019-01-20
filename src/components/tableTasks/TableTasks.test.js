import React from 'react';
import ReactDOM from 'react-dom';
import TableTasks from './TableTasks';

it('renders without crashing TableTasks component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableTasks />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('check for onClick event on name of task', () => {

});