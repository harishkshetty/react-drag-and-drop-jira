import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [
        { id: 1, name: "UI Layout Creation",category:'To Do' },
        { id: 101, name: "MainHub",category:'To Do'},
        { id: 108, name: "Goomo Logo Design",category:'progress' },
        { id: 43, name: " Performance optimization", category:'progress' },
        { id: 109, name: "Circles Image Build",category:'completed'},
        { id: 5, name: "Carousel ",category:'completed'},
        { id: 221, name: "Project structure",category:'completed'}
      ]
    };
  }

 
  onDrop = (e,type) => {
    const {task}=this.state;
    let itemId=e.dataTransfer.getData("task");
    let newtask=task.map((item)=>{
      if(item.id==itemId){
        item.category=type;
      }
      return item;
    })
    this.setState({task:newtask})
  };

  onDragStart = e => {
    e.dataTransfer.setData("task", e.target.id);
    e.currentTarget.style.backgroundColor = "#245272";
  };

  onDragOver = e => {
    e.preventDefault();
  };
 
  onDragEnd=(e)=>{
    e.currentTarget.style.backgroundColor = "#42427c";

  }

  render() {
    const { task} = this.state;
    const gromming=task.filter(({category})=>category=='To Do')
    const progress=task.filter(({category})=>category=='progress')
    const completed=task.filter(({category})=>category=='completed')

    return (
      <div>
        <div className="projectTitle">Kanban Board</div>
        <div className="App">
        <div
          className="major"
          onDrop={(e)=>this.onDrop(e,'To Do')}
          onDragOver={this.onDragOver}
        >
          <div className="title">In Grooming</div>
          {gromming.map(item => (
            <div
              className="task"
              key={item.name}
              id={item.id}
              list={item}
              onDragStart={event => this.onDragStart(event, item)}
              onDragEnd={this.onDragEnd}
              draggable="true"
            >
              <span className="listData">{item.name}</span>
            </div>
          ))}
        </div>
        <div
          className="major"
          onDrop={(e)=>this.onDrop(e,'progress')}
          onDragOver={this.onDragOver}
        >
          <div className="title">In Progress</div>
          {progress.map(task => (
            <div
              className="task"
              id={task.id}
              key={task.name}
              list={task}
              draggable="true"
              onDragEnd={this.onDragEnd}
              onDragStart={event => this.onDragStart(event, task)}
            >
              <span className="listData">{task.name}</span>
            </div>
          ))}
        </div>
        <div
          className="major"
          onDrop={(e)=>this.onDrop(e,'completed')}
          onDragOver={this.onDragOver}
        >
          <div className="title">Completed</div>
          {completed.map(task => (
            <div
              className="task"
              id={task.id}
              key={task.name}
              list={task}
              draggable="true"
              onDragEnd={this.onDragEnd}
              onDragStart={event => this.onDragStart(event, task)}
            >
              <span className="listData">{task.name}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }
}
export default App;
