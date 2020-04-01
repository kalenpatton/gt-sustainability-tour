import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import APIHandler from './APIHandler';

const images = [
  '//placekitten.com/1500/500',
  '//placekitten.com/4000/3000',
  '//placekitten.com/800/1200',
  '//placekitten.com/1500/1500',
];

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      imageList: []
    };

    APIHandler.getImageList(this.props.site, (response)=>{
      this.setState({imageList: response})
    });
  }

  updateImageList = () => {
    APIHandler.getImageList(this.props.site, (response)=>{
      this.setState({imageList: response})
    });
  };

  getURL(photoIndex) {
    return `/images/${this.props.site.id}/${this.state.imageList[photoIndex].id}.jpg`;
  }

  getCaption(photoIndex) {
    return this.state.imageList[photoIndex].caption;
  }

  handleOpenRequest = () => {
    if (this.state.imageList.length) {
      this.setState({isOpen: true});
    }
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <img src={this.state.imageList.length ? this.getURL(0) : this.props.cover}
            id="pic"
            className="cover-image"
            onClick={this.handleOpenRequest}/>

        {isOpen && (
          <Lightbox
            animationDuration={200}
            mainSrc={this.getURL(photoIndex)}
            nextSrc={this.getURL((photoIndex + 1) % this.state.imageList.length)}
            prevSrc={this.getURL((photoIndex + this.state.imageList.length - 1) % this.state.imageList.length)}
            imageCaption={this.getCaption(photoIndex)}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.state.imageList.length - 1) % this.state.imageList.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.state.imageList.length,
              })
            }
          />
        )}
      </div>
    );
  }
}