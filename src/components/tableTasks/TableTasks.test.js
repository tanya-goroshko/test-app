import React from 'react';
import ReactDOM from 'react-dom';
import TableTasks from './TableTasks';
import {mount, shallow, render} from 'enzyme';
import data from '../../task.json';
import Enzyme from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing TableTasks component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableTasks />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('testing TableTasks container', () => {

    const props = {
        data: data,
        showTask: false,
        ind: null,
        current: {}
    };

    describe('check correct rendering table', () => {

        const tableTasks = mount(<TableTasks {...props}/>);
        const rows = tableTasks.find('tbody tr');
        let count = 0;
        for (let i = 0; i < props.data.length; i++)
            if (props.data[i].obj_status === 'active')
                count = count + 1;

        expect(rows.length).toEqual(count);
        // const cells = tableTasks.find('tbody tr td');
        // expect(cells.length).toEqual(Object.keys(data[i]).length * 2);
    });

    describe('check for onClick on tasks name', () => {

        const tableTasks = mount(<TableTasks {...props}/>);
        console.log(tableTasks.render());
        // tableTasks.find('td .name').at(0).simulate('click');
        // expect(tableTasks.state().showTask).toEqual(true);

    });
});