import React from 'react';
import pic from '../images/gtlogo.png';
import '../styles/PopupWindow.css';
import '../styles/Audio.scss';
import H5AudioPlayer from 'react-h5-audio-player';
import Modal from 'react-responsive-modal';
import CC from './CC';
import ImageGallery from './ImageGallery';

class PopupWindow extends React.Component{

    constructor(props) {
        super(props);
        this.mapHandler = this.props.mapHandler;
        this.state = {
            openCC:false,
            openGallery:false,
            imageList:[]
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

    formatDesc = (desc) => {
        let bullets = desc.split("\n")
        let output = []
        bullets.forEach((bullet, i) => {
            bullet = bullet.trim()
            if (bullet.length > 0) {
                output.push(<li key={i} className='desc'>{bullet}</li>)
            }
        });

        return (<ul className='desc'>{output}</ul>)
    };


    listItems = this.props.site.description.split("•");
    bulletPoints=this.listItems.splice(1, this.listItems.length).map((number, i) =>
        <p key={i}>{"•"+number}</p>
    );


    render(){
        return(
            <div className="popupwindow">
                <h4>{this.props.site.name}</h4>
                <ImageGallery
                    cover={pic}
                    site={this.props.site}
                    open={this.state.openGallery}
                    handleOpenRequest={this.onOpenModalGallery}
                    handleCloseRequest={this.onCloseModalGallery}
                />
                <div className="buttons">
                    <button className="smallBtn" onClick={this.onMakeNextStop}>Add To My Route</button>

                </div>
                <div className="descriptions">
                    {this.formatDesc(this.props.site.description)}
                </div>
                <button className="smallBtn" onClick={this.onOpenModalGallery}>View Image Gallery</button>

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
                    src={`/audio/${this.props.site.id}.mp3`}
                    volume={1}
                    volumeJumpStep={0.1}
                    />
                </div>

                <button className="smallBtn" onClick={this.onOpenModalCC}>View Transcript</button>
                <Modal open={this.state.openCC} onClose={this.onCloseModalCC} >
                    <CC transcript={this.props.site.transcript}/>
                    <button className="lightBtn" onClick={this.onCloseModalCC}>Back</button>
                </Modal>
            </div>
        );
    }
}

export default PopupWindow;