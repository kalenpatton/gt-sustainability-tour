import React from 'react';
import pic from '../images/gtlogo.png';
import '../styles/PopupWindow.css';
import '../styles/Audio.scss';
import H5AudioPlayer from 'react-h5-audio-player';


class PopupWindow extends React.Component{

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        console.log("click");
    }
    

    render(){
        return(
            <div className="popupwindow">
                <h3>name of the stop</h3>
                <img src={pic} id="pic"/>
                <div className="buttons">
                    <button onClick={this.onClick}>Prev</button>
                    <button onClick={this.onClick}>Make Next Stop</button>
                    <button onClick={this.onClick}>Next</button>
                </div>
                <div className="descriptions">
                    <ul>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                        <li>blablabla</li>
                    </ul>
                </div>
                <button onClick={this.onClick}>View Image Gallery</button>

                {/* https://www.npmjs.com/package/react-h5-audio-player */}
               

                <div className = "audio" style={{ width: '90%' }}>
                    <H5AudioPlayer
                    autoPlay={true}
                    className=""
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

                <button onClick={this.onClick}>CC</button>
            </div>
        );
    }
}

export default PopupWindow;