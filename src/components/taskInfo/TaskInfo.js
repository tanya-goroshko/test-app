import React, { Component } from 'react';
import './TaskInfo.css';

class TaskInfo extends Component
{
    state =
        {
            name: this.props.data.name,
            editingMode: false
        };

    handleClick()
    {
        this.props.showTable();
    }

    onClick(e)
    {
        e.preventDefault();
        this.setState({
            editingMode: true
        });
    }

    updateTask()
    {
        return fetch('http://localhost:3000/test/public/req.php', {
            method: "PUT",
            body: JSON.stringify(
                {
                    id: this.props.data.id,
                    data: this.state.data
                })
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    onBlur(e)
    {
        e.preventDefault();
        this.setState({
            editingMode: false,
            name: e.target.value
        });

        this.props.changeName(e.target.value);
        this.updateTask(this.props.data.id, this.state.data);
    }

    render()
    {
        let res = [], item, row = [];

        for (let prop in this.props.data)
        {
            item = [];
            if (prop === 'name')
            {
                if(this.state.editingMode)
                {
                    item.push(<td
                                key={prop}>
                                    {prop}
                              </td>);
                    item.push(<td
                                  key={this.props.data[prop]}>
                                    <input
                                        className="edit-name"
                                        type="text"
                                        onBlur={this.onBlur.bind(this)}
                                        defaultValue={this.props.data[prop]}
                                        autoFocus/>
                              </td>)
                }else{
                    item.push(<td
                                key={prop}>
                                    {prop}
                              </td>);
                    item.push(<td
                                className='task-name'
                                key={this.props.data[prop]}
                                onClick={this.onClick.bind(this)}
                                style={{cursor: 'pointer'}}>
                                    {this.props.data[prop]}
                              </td>)
                }
            }
            else
                if(prop === 'description' ||
                    prop === 'creation_date' ||
                    prop === 'physical_progress' ||
                    prop === 'project_id' ||
                    prop === 'start_date' ||
                    prop === 'id'){
                item.push(<td key={prop}>{prop}</td>);
                item.push(<td key={this.props.data[prop]}>{this.props.data[prop]}</td>);
            }
            else
                continue;

            row.push(<tr key={prop}>{item}</tr>);

        }

        res.push(row);

        return(
            <div id="simple-task">
                <table className="striped">
                    <tbody>
                        {res}
                    </tbody>
                </table>
            <button className="btn" onClick={this.handleClick.bind(this)}>Back</button>
            </div>
        )
    }
}

export default TaskInfo;