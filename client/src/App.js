import React from 'react';
import './App.css';
import Map from './Components/Map';
import Header from './Components/Header';
import Footer from './Components/Footer';



class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      autoplay:true,
      textDirection:true,
    }
  }

  settingHandler={
    changeAutoplay:(value)=>{
      this.setState({autoplay:!value});
    },

    changeTextDirection:(value)=>{
      this.setState({textDirection:!value});
    }
  }
  render(){
    return (
      <div className="App">
        
        <Header settingHandler={this.settingHandler} value={this.state.autoplay}/>
        <Map autoplay={this.state.autoplay} textDirection={this.state.textDirection}/>
        <Footer/>
        
      </div>
    );

    }

  
}
export default App;
