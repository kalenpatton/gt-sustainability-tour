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
      nextStop:"N/A"
    }
  }

  settingHandler={
    changeAutoplay:(value)=>{
      this.setState({autoplay:!value});
    },

    changeTextDirection:(value)=>{
      this.setState({textDirection:!value});
    },

    showNextStop:(value)=>{
      this.setState({nextStop:value});
    }
  }
  render(){
    return (
      <div className="App">
        
        <Header 
          settingHandler={this.settingHandler} 
          autoplay={this.state.autoplay} 
          textDirection={this.state.textDirection}
          nextStop={this.state.nextStop}
        />
        <Map autoplay={this.state.autoplay} textDirection={this.state.textDirection} settingHandler={this.settingHandler}/>
        <Footer/>
        
      </div>
    );

    }

  
}
export default App;
