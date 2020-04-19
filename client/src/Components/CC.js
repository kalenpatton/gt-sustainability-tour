import React from 'react';
import '../styles/CC.css';




export default class CC extends React.Component {
    constructor(props) {
        super(props);
    }

    formatTranscript = (desc) => {
        let bullets = desc.split("\n");
        let output = [];
        bullets.forEach((bullet, i) => {
            bullet = bullet.trim();
            if (bullet.length > 0) {
                output.push(<p key={i}>{bullet}</p>);
            }
        });

        return output;
    };

    render() {
        return(
            <div className="CC">
                <h3>Transcript</h3>
                {this.formatTranscript(this.props.transcript)}
            </div>
        );
    }
}