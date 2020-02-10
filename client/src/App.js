import React from 'react';
import './App.css';
import Map from './Components/Map';
import Header from './Components/Header';
import Footer from './Components/Footer';



class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      autoplay:false,
    }
  }

  settingHandler={
    changeAutoplay:(value)=>{
      this.setState({autoplay:value});

    }
  }
  render(){
    return (
      <div className="App">
        
        <Header settingHandler={this.settingHandler} value={this.state.autoplay}/>
        <Map autoplay={this.state.autoplay}/>
        <Footer/>
        
      </div>
    );

    }

  
}
export default App;
