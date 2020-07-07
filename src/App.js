import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

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
    const td=this.state.data.map((item,index)=><tr><td>{item.full_name}</td><td><a href={item.html_url}>{item.html_url}</a></td></tr>);

    return (
      <div className="App">
        <form onSubmit={this.submitForm}>
          <input onChange={this.changed} value={this.state.input} type='text' placeholder='input search content'/>
          <input type="submit" value="search" />
        </form>
        <table>{td}</table>
      </div>
    );
  }

}

export default App;
