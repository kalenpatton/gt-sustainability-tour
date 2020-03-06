import React from 'react';
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';
import ImageEditPopup from './ImageEditPopup';
import Modal from 'react-responsive-modal';

export default class ImageEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disableReorder: false,
            isModalOpen: false,
            focusedImage: -1
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
        this.onChange(event, newList);
    };

    handleAddImage = (event) => {
        event.preventDefault();
        this.openModal(-1);
    };

    onSaveImage = (event, imageId, isNew) => {
        event.preventDefault();
        this.closeModal();
    };

    removeImage = (event, id) => {
        let newList = this.props.imageList.filter((a) => (a != id));
        this.onChange(event, newList);
    }

    render() {
        return (
            <div className='left-text'>
                <Reorder
                    reorderId='image-list'
                    onReorder={this.onReorder.bind(this)}
                    disabled={this.state.disableReorder}
                    className='image-list'
                    >
                        {
                            this.props.imageList.map((id) => (
                                <div key={id} className='image-list-item'>
                                    {id}
                                    <span
                                        className='close'
                                        onClick={(e)=>this.removeImage(e, id)}
                                        onMouseOver={()=>this.setState({disableReorder: true})} //Prevents image dragging when deleting image
                                        onMouseOut={()=>this.setState({disableReorder: false})}>
                                        x
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