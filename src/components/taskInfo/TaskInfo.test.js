import ReactDOM from "react-dom";
import TaskInfo from "./TaskInfo";
import React from "react";
import {mount} from 'enzyme';
import data from '../../task.json';
import Enzyme from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing TaskInfo component', () => {
    const div = document.createElement('div');
    for (let i = 0; i < data.length; i++)
    {
        ReactDOM.render(<TaskInfo data={data[i]}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    }
});

describe('taskInfo container testing', () => {

    const props = {
        editingMode: false,
        name: data[0].name,
        changeName: () => {}
    };
    describe('check if table cells render correctly', () => {

        for (let i = 0; i < data.length; i++)
        {
            const taskInfo = mount(<TaskInfo data={data[i]} {...props}/>);
            const rows = taskInfo.find('tbody .tableRow');
            expect(rows.length).toEqual(Object.keys(data[i]).length);
            const cells = taskInfo.find('tbody .tableRow td');
            expect(cells.length).toEqual(Object.keys(data[i]).length * 2);
        }
    });

    describe('check rendering button BACK', () => {

        for(let i = 0; i < data.length; i++)
        {
            const taskInfo = mount(<TaskInfo data={data[i]} {...props}/>);
            expect(taskInfo.find('button').type()).toEqual('button');
            // taskInfo.find('button').at(0).simulate('click');
        }
    });

    describe('check if appears td when editing mode is disabled', () => {

        for(let i = 0; i < data.length; i++)
        {
            const taskInfo = mount(<TaskInfo data={data[i]} {...props}/>);
            expect(taskInfo.find('td.task-name').type()).toEqual('td');
        }

    });

    describe('check if editing mode is changing on click event', () => {

        for(let i = 0; i < data.length; i++)
        {
            const taskInfo = mount(<TaskInfo data={data[i]} {...props}/>);
            taskInfo.find('td.task-name').at(0).simulate('click');
            expect(taskInfo.state().editingMode).toEqual(true);
        }
    });

    describe('check if input field appears on changing editing mode', () => {

        for(let i = 0; i < data.length; i++)
        {
            const taskInfo = mount(<TaskInfo data={data[i]} {...props}/>);
            taskInfo.setState({editingMode: true});
            expect(taskInfo.find('td input').type()).toEqual('input');
        }
    });

    describe('check onBlur event input field', () => {

        for(let i = 0; i < data.length; i++)
        {
            const taskInfo = mount(<TaskInfo data={data[i]} {...props}/>);
            taskInfo.setState({editingMode: true});
            taskInfo.find('td input').at(0).simulate('blur');
            expect(taskInfo.find('td.task-name').type()).toEqual('td');
        }
    });
});