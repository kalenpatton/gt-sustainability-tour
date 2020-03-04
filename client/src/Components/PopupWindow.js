import React from 'react';
import pic from '../images/gtlogo.png';
import '../styles/PopupWindow.css';
import '../styles/Audio.scss';
import H5AudioPlayer from 'react-h5-audio-player';
import Modal from 'react-responsive-modal';
import CC from './CC';
import Gallery from './Gallery';

class PopupWindow extends React.Component{

    constructor(props) {
        super(props);
        this.mapHandler = this.props.mapHandler;
        this.state = {
            openCC:false,
            openGallery:false
          };
        
    }

   

    onOpenModalCC = () => {
        this.setState({ openCC: true });
    };

    onCloseModalCC = () => {
        this.setState({ openCC: false });
    };

    onOpenModalGallery = () => {
        this.setState({ openGallery: true });
    };

    onCloseModalGallery = () => {
        this.setState({ openGallery: false });
    };


    onMakeNextStop = () => {
        this.mapHandler.addToRoute(this.props.site);
    };


    render(){
        return(
            <div className="popupwindow">
                <h2>{this.props.site.name}</h2>
                <img src={pic} id="pic" className="cover-image"/>
                <div className="buttons">
                  
                    <button onClick={this.onMakeNextStop}>Add To My Route</button>
                   
                </div>
                <div className="descriptions">
                    <p>{this.props.site.description}</p>
                </div>
                <button onClick={this.onOpenModalGallery}>View Image Gallery</button>
                <Modal open={this.state.openGallery} onClose={this.onCloseModalGallery} >
                    <Gallery/>
                    <button onClick={this.onCloseModalGallery}>Back</button>
                </Modal>

                {/* https://www.npmjs.com/package/react-h5-audio-player */}


                <div className = "audio">
                    <H5AudioPlayer className = "audio-player"
                    autoPlay={this.props.autoplay}
                    listenInterval={1000}
                    loop={false}
                    muted={false}
                    onClickNext={null}
                    onClickPrevious={null}
                    onPlayError={null}
                    preload="auto"
                    progressJumpStep={5000}
                    progressUpdateInterval={20}
                    showJumpControls
                    showLoopControl
                    showSkipControls={false}
                    showVolumeControl
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    volume={1}
                    volumeJumpStep={0.1}
                    />
                </div>

                <button onClick={this.onOpenModalCC}>View Transcript</button>
                <Modal open={this.state.openCC} onClose={this.onCloseModalCC} >
                    <CC transcript={this.props.site.transcript}/>
                    <button onClick={this.onCloseModalCC}>Back</button>
                </Modal>
            </div>
        );
    }
}

export default PopupWindow;