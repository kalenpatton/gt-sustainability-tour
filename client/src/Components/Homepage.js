import React from 'react';
import '../styles/Homepage.css';
import pic from '../images/gtlogo.png';
import history from '../history';

export default class Homepage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            info:this.loadData,

        }

    }

    componentDidMount(){
        fetch('/info', {
            accept: "application/json"
        })
            .then(response => response.json())
            .then(response => {
                console.log('sustainability info loaded')
                this.setState({info:response.information})
            })
    }

    redirect=()=>{
        history.push('/tour');
        window.location.reload();

    }

    render(){

            return (

                <div id="Homepage">
                    <p className='center' id='title'>Georgia Tech Campus Sustainability Tour</p>
                    <img src={pic} className='center' id='homepage-img' alt="gt tour logo"/>
                    <div id="home-description">
                        {/* <p style={{marginBottom:30}}>{this.state.info}</p> */}
                        <button  id='start'
                            className='bigButton'
                            onClick={this.redirect}>
                            <i className="fas fa-walking fa"></i> &nbsp;&nbsp;Start Tour
                        </button>
                    </div>



                </div>


          );







    }

}
