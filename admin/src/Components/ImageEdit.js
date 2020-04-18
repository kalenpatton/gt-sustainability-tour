import React from 'react';
import Reorder, { reorder } from 'react-reorder';
import ImageEditPopup from './ImageEditPopup';
import Modal from 'react-responsive-modal';

export default class ImageEdit extends React.Component {
    // Required props:
    // siteId : the id of the site for this image edit
    // imageList : list of images for the site
    // onChange : method for updating the imageList
    constructor(props) {
        super(props);
        this.state = {
            disableReorder: false,
            isModalOpen: false,
            focusedImage: -1,
        };
        this.onChange = this.props.onChange;
    };
    openModal = (image) => {
        this.setState({
            focusedImage: image,
            isModalOpen: true
        });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        let newList = reorder(this.props.imageList, previousIndex, nextIndex);
        // let newUrlList = reorder(this.state.imageUrlList, previousIndex, nextIndex);

        this.onChange(event, newList);
        // this.setState({
        //     imageUrlList: newUrlList;
        // });
    };

    handleAddImage = (event) => {
        event.preventDefault();
        this.openModal(-1);
    };

    // Run after add image popup closes
    onSaveImage = (event, image, imageUrl, isNew) => {
        event.preventDefault();
        this.closeModal();

        let newList = this.props.imageList.slice();
        // let newUrlList = this.state.imageUrlList.slice();
        newList.push(image);
        // newUrlList.add(imageUrl);

        this.onChange(event, newList);
        // this.setState({
        //     imageUrlList: newUrlList;
        // });
    };

    // Remove image by index
    removeImage = (event, i) => {
        let newList = this.props.imageList.slice();
        // let newUrlList = this.state.imageUrlList.slice();
        newList.splice(i,1);
        // newUrlList.splice(i,1);

        this.onChange(event, newList);
        // this.setState({
        //     imageUrlList: newUrlList;
        // });
    }

    getImageUrl = (image) => {
        if (Number.isInteger(image)) {
            return `/images/${this.props.siteId}/thumb_${image}.jpg`;
        } else {
            return URL.createObjectURL(image);
        }
    }

    render() {
        return (
            <div className='left-text'>
                <Reorder
                    reorderId='image-list'
                    onReorder={this.onReorder.bind(this)}
                    disabled={this.state.disableReorder}
                    draggedClassName="image-list-dragged"
                    className='image-list'
                    >
                        {
                            this.props.imageList.map((img, i) => (
                                <div key={i}
                                    className='image-list-item'
                                    style={{backgroundImage: `url(${this.getImageUrl(img)})`}}>

                                    <span
                                        className='close'
                                        onClick={(e)=>this.removeImage(e, i)}>
                                        &times;
                                    </span>
                                </div>
                            ))
                        }
                </Reorder>
                <div>
                    <button onClick={this.handleAddImage}>Add Image</button>
                </div>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                    className="centered">
                    <ImageEditPopup
                        imageId={this.state.focusedImage}
                        onSave={this.onSaveImage}/>
                </Modal>
            </div>
        );
    }
}