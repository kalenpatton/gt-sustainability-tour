import React from 'react';
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';

export default class ImageEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.onChange = this.props.onChange;

    };

    onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        let newList = reorder(this.props.imageList, previousIndex, nextIndex);
        this.onChange(event, newList);
    };

    handleAddImage = (event) => {
        event.preventDefault();
        // Open model for adding image?
    };

    removeImage = (event, id) => {
        event.stopPropagation();
        let newList = this.props.imageList.filter((a) => (a != id));
        this.onChange(event, newList);
    }

    render() {
        return (
            <div className='left-text'>
                <Reorder
                    reorderId='image-list'
                    onReorder={this.onReorder.bind(this)}
                    className='image-list'
                    >
                        {
                            this.props.imageList.map((id) => (
                                <div key={id} className='image-list-item'>
                                    {id}
                                    <span
                                        className='close'
                                        onClick={(e)=>(this.removeImage(e, id))}>
                                        x
                                    </span>
                                </div>
                            ))
                        }
                </Reorder>
                <div>
                    <button onClick={this.handleAddImage}>Add Image</button>
                </div>
            </div>
        );
    }
}