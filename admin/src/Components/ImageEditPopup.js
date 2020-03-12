import React from 'react';

export default class PopupWindow extends React.Component{

    constructor(props) {
        super(props);
        this.isNew = this.props.imageId < 0;
        this.imageRef = React.createRef();
        this.state = {
            id: -1,
            image: null,
            caption: '',
            changed: false
        };
        if (!this.isNew) {
            this.state.id = this.props.imageId;
            // call backend to get file
            // call backend to get caption
        }
        this.save = this.props.onSave;
        console.log(this.isNew)
    }

    onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.changed) {
            // TODO: Add call to backend to post changes.

            // console.log(this.imageRef.current.files[0]);
            let data = new FormData();
            data.append('id', this.state.id);
            data.append('image', this.imageRef.current.files[0]);
            data.append('caption', this.state.caption);

            console.log(data);
            // Send image to database here
            fetch('/images/upload', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            });

            this.save(event, this.state.id, this.isNew);
        }
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
            changed: true
        });
    };

    handleFileChange = (event) => {
        const image = event.target.files[0];
        this.setState({
            image: URL.createObjectURL(image),
            changed: true
        });
    }

    render(){
        return(
            <div className="popupwindow">
                <h2>{this.isNew ? "Add Image" : "Edit Image"}</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='left-text'>
                        <div>
                            {'File: '}
                            <div>
                                <input
                                    className="form-file-upload"
                                    type="file"
                                    ref={this.imageRef}
                                    name="image"
                                    accept="image/*"
                                    onChange={this.handleFileChange}
                                    required={this.isNew}
                                />
                            </div>
                        </div>
                        <img
                            src={this.state.image}
                            />
                        <div>
                            {'Caption: '}
                            <textarea
                                className='form-desc-in'
                                name='caption'
                                value={this.state.caption}
                                onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        );
    }
}