import React, { Component } from 'react';
import './TableTasks.css';
import TaskInfo from '../taskInfo/TaskInfo';
import data from '../../task.json';
import dateFormat from 'dateformat';

class TableTasks extends Component
{
  constructor()
  {
      super();
      this.dateFormat();
      this.state =
          {
              data: data,
              showTask: false,
              ind: null,
              current: {}
        };
  }

  dateFormat()
  {
      for (let i = 0; i < data.length; i++)
      {
          data[i].due_date = dateFormat(data[i].due_date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
          data[i].creation_date = dateFormat(data[i].creation_date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
          data[i].start_date = dateFormat(data[i].start_date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      }
  }

  onChangeTableMode()
  {
      this.setState({
          showTask: false
      });
  }

  onChangeName(name)
  {
      // eslint-disable-next-line
      this.state.current.name = name;
      this.setState({current: this.state.current});
  }

  onClick(ind, e)
  {
      e.preventDefault();

      this.setState({
          ind: ind,
          current: this.state.data[ind],
          showTask: true
      });
  }

  render()
  {
    let thead_cell = [];
        thead_cell.push(<th className="name" key="name">Task name</th>);
        thead_cell.push(<th className="tag" key="tag">Tags</th>);
        thead_cell.push(<th className="actual_effort" key="actual_effort">Actual effort</th>);
        thead_cell.push(<th className="estimated_effort" key="estimated_effort">Estimated effort</th>);
        thead_cell.push(<th className="due_date" key="due_date">Due date</th>);
    let rows = [];
    for (let i = 0; i < this.state.data.length; i++)
    {
        let cell = [];
        if(this.state.data[i].obj_status === 'active')
        {
            if(this.state.data[i].is_high_priority)
                cell.push(<td
                            onClick={this.onClick.bind(this, i)}
                            style={{fontWeight: 'bold', cursor: 'pointer'}}
                            className="name"
                            key={this.state.data[i].name}
                            id={this.state.data[i].name}>
                                {this.state.data[i].name}
                          </td>);
            else
                cell.push(<td
                            onClick={this.onClick.bind(this, i)}
                            style={{cursor: 'pointer'}}
                            className="name"
                            key={this.state.data[i].name}
                            id={this.state.data[i].name}>
                                {this.state.data[i].name}
                          </td>);

            if(this.state.data[i].tags)
                cell.push(<td
                            key="tags">
                                {this.state.data[i].tags.join(', ')}
                          </td>);
            else
                cell.push(<td
                            key="tags">
                          </td>);

            if(this.state.data[i].actual_effort)
                cell.push(<td
                            key="actual_effort">
                                {this.state.data[i].actual_effort}
                          </td>);
            else
                cell.push(<td
                            key="actual_effort">
                          </td>);

            if(this.state.data[i].estimated_effort)
                cell.push(<td
                            key="estimated_effort">
                                {this.state.data[i].estimated_effort}
                          </td>);
            else
                cell.push(<td
                            key="estimated_effort">
                          </td>);

            if(this.state.data[i].due_date)
                cell.push(<td
                            key="due_date">
                                {this.state.data[i].due_date}
                          </td>);
            else
                cell.push(<td
                            key="due_date">
                          </td>);

        }else
          continue;

        rows.push(<tr key={this.state.data[i].id} id={this.state.data[i].id}>{cell}</tr>);
    }
    return (
        <div>
            {!this.state.showTask ?
                <div id="simple-board">
                    <table>
                        <thead>
                        <tr>
                            {thead_cell}
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
                : null}
            {this.state.showTask && <TaskInfo
                                        data={this.state.data[this.state.ind]}
                                        changeName={this.onChangeName.bind(this)}
                                        showTable={this.onChangeTableMode.bind(this)}/>}
        </div>);
  }
}

export default TableTasks;
