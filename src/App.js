import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={input:'',data:[]};
  }

  submitForm=(event)=>
  {
    const inputText=this.state.input;
    console.log(inputText);
    event.preventDefault();
    this.setState({input:''});

    fetch(`https://api.github.com/search/repositories?q=${inputText}`)
    .then(response=>response.json())
    .then(responseData=>{this.setState({data:responseData.items})})
    .catch(error=>console.log(error))
  }

  changed=(event)=>{
    this.setState({input:event.target.value})
  }

  render(){
    const col=[{
      Header:'Name',
      accessor:'full_name',
    },{
      Header:'URL',
      accessor:'html_url',
    },{
      Header:'Owner',
      accessor:'owner.login',
    }];

    return (
      <div className="App">
        <form onSubmit={this.submitForm}>
          <input onChange={this.changed} value={this.state.input} type='text' placeholder='input search content'/>
          <input type="submit" value="search" />
        </form>
        <ReactTable data={this.state.data} columns={col} filterable={true} defaultPageSize={10}/>
      </div>
    );
  }

}

export default App;
