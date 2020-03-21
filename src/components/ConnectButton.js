import React from 'react';

class ConnectButton extends React.Component{

    constructor(){
        super();
    }

    handleClick = (event) => {
        console.log('Click')
        if (this.props.connected){
            this.props.disconnect(this.props.device)
        }
        else {
            this.props.connect();
        }
    }

    render(){
        return <button id="connectButton"  onClick={this.handleClick}>
            {this.props.connected ? 'Disconnect' : 'Connect'}
        </button>
    }
}

export default ConnectButton