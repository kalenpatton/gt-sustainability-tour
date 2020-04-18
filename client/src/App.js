import React from 'react';
import './styles/GTStyles.css';
import './App.css';
import Map from './Components/Map';
import Header from './Components/Header';
import Footer from './Components/Footer';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './Reducer';
import Modal from 'react-responsive-modal';


const store = createStore(reducer);

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      autoplay:false,
      textDirection:false,
      nextStop:"N/A",
      map:null,
      defaultTourSettingOpen: true,
      defaultTour:true,
    }

    this.map = null;

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
    },

    filterStops:(choosedFilter)=>{
      //var newList=this.state.routeList.filter(e => e[filter]==choosedFilter );
      console.log(choosedFilter);
    }

  }
  saveMap=(currmap)=>{
    this.setState({map:currmap});
  }

  onCloseDefaultTour = () => {
    this.setState({ defaultTourSettingOpen:false});
  }

  render(){
    return (
      <Provider store={store}>
      <div className="App">

        <Header
          settingHandler={this.settingHandler}
          autoplay={this.state.autoplay}
          textDirection={this.state.textDirection}
          nextStop={this.state.nextStop}
          map={this.map}
          />
          
          <Modal open={this.state.defaultTourSettingOpen} onClose={this.onCloseDefaultTour} className="centered">
            <div style={{height:200}}>
              <h4 style={{paddingBottom:20}}>Do you want to use the default tour?</h4>
              <a className="smallBtn" onClick={this.onCloseDefaultTour}>Yes</a>
              <a className="smallBtn" onClick={() => this.setState({ defaultTour: false }),this.onCloseDefaultTour}>No,I will create my own tour</a>
            </div>
          </Modal>
          
          <Map autoplay={this.state.autoplay}
            textDirection={this.state.textDirection}
            settingHandler={this.settingHandler}
            saveMap={this.saveMap}
            setRef={ref => this.map = ref}
            defaultTour={this.state.defaultTour}
          />
        <Footer/>

      </div>
      </Provider>
    );

    }


}
export default App;
