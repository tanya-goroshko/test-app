import ReactDOM from "react-dom";
import TaskInfo from "./TaskInfo";
import React from "react";
import {mount} from 'enzyme';
import {jest, expect} from 'jest';
import data from '../../task.json';

it('renders without crashing TaskInfo component', () => {
    const div = document.createElement('div');
    for (let i = 0; i < data.length; i++)
    {
        ReactDOM.render(<TaskInfo data={data[i]}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    }
});

it('calls onClick event when clicked name of task', () => {

    const onClick = jest.fn();
    let res = [], item, row = [];

    for(let iter = 0; iter < data; iter++){
        for (let prop in data[iter])
        {
            item = [];
            if (prop === 'name')
            {
                item.push(<td
                            key={prop}>
                            {prop}
                        </td>);
                item.push(<td
                                className={prop}
                                onClick={onClick}
                                style={{cursor: 'pointer'}}
                                key={data[iter][prop]}>
                            <input
                                type="text"
                                onBlur={this.onBlur.bind(this)}
                                defaultValue={data[iter][prop]}
                                autoFocus/>
                            </td>)

            }
            else
                continue;

            row.push(<tr key={prop}>{item}</tr>);

        }

        res.push(row);
        let wrapper = mount(
            <table>
                <tbody>
                    {res}
                </tbody>
            </table>);
        wrapper.find('td.name').first().simulate('click');
        wrapper.update();
        expect(onClick).toBeCalled();
    }
});
