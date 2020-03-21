import React from 'react';

class ReadWriteCharacteristic extends React.Component{
    hasUpdated = false;

    constructor(){
        super();
        this.state = {
            read: 'NaN',
            writeInput: ''
        }
    }

    handleClick = (event) => {
        if (event.target.className === 'readButton'){
            if (this.props.connected){
                let serviceUUID = this.props.serviceUUID;
                let characteristicUUID = this.props.characteristicUUID;
                this.props.readValue(serviceUUID, characteristicUUID, this.readSuccessCallback, this.readFailureCallback);
            }
            else {
                console.log('Not connected');
            }
        }
        else if (event.target.className === 'writeButton'){
            if (this.props.connected){
                let value = parseInt(this.state.writeInput);
                value = Uint8Array.of(value);
                let serviceUUID = this.props.serviceUUID;
                let characteristicUUID = this.props.characteristicUUID;
                this.props.writeValue(serviceUUID, characteristicUUID, this.readSuccessCallback, this.readFailureCallback, value);
            }
            else {
                console.log('Not connected');
            }
        }
    }

    handleChange = (event) => {
        this.setState({writeInput: event.target.value})
      }

    render(){
        return <div className="redWriteDiv">
            <button className="readButton" onClick={this.handleClick}>Read</button>
            <p>Read: {this.state.read}</p>
            <button className="writeButton" onClick={this.handleClick}>Write</button>
            <input className="writeInput" value={this.state.writeInput} onChange={this.handleChange}></input>
        </div>
    }

    readSuccessCallback = value => {
        console.log(value)
        this.props.readSuccessCallback(this, value);
    }

    readFailureCallback = value => {
        console.log('ReadFailure');
    }

    componentDidUpdate = () => {
        console.log("Update");
        if (this.props.connected && !this.hasUpdated){
            this.hasUpdated = true;
            let serviceUUID = this.props.serviceUUID;
            let characteristicUUID = this.props.characteristicUUID;
            this.props.readValue(serviceUUID, characteristicUUID, this.readSuccessCallback, this.readFailureCallback);
        }
    }
}

export default ReadWriteCharacteristic