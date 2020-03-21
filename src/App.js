import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConnectButton from './components/ConnectButton'
import ReadWriteCharacteristic from './components/ReadWriteCharacteristic'
import {brightnessSuccess} from './ReadWriteCallbacks'
import Dashboard from './Dashboard'

const App = () => {
  return (
    <div className="App">
      <Dashboard />

            {/*<ConnectButton device={this.state.bluetoothDevice} disconnect={this.disconnect} connect={this.connect} connected={this.state.connected}/>
            <ReadWriteCharacteristic device={this.state.bluetoothDevice} connected={this.state.connected} 
  serviceUUID={0xec00} characteristicUUID={0xec0f} readValue={this.readValue} writeValue={this.writeValue} readSuccessCallback={brightnessSuccess}*/}
          </div>
  )
}

/*class App extends React.Component {

  constructor(){
    super()
    this.state = {
      connected: false,
      bluetoothDevice: null
    }
  }

  render(){
    return <div className="App">
      <Dashboard />

            {/*<ConnectButton device={this.state.bluetoothDevice} disconnect={this.disconnect} connect={this.connect} connected={this.state.connected}/>
            <ReadWriteCharacteristic device={this.state.bluetoothDevice} connected={this.state.connected} 
  serviceUUID={0xec00} characteristicUUID={0xec0f} readValue={this.readValue} writeValue={this.writeValue} readSuccessCallback={brightnessSuccess}*//*}
          </div>
  }

  connect = () => {
    let options = {};
      options.acceptAllDevices = true;
      options.optionalServices = [0x13333333333333333333333333333337, 0xec00];
    navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.setState({bluetoothDevice: device});
      console.log('> Name:             ' + this.state.bluetoothDevice.name);
      console.log('> Id:               ' + this.state.bluetoothDevice.id);
      console.log('> Connected:        ' + this.state.bluetoothDevice.gatt.connected);
      this.state.bluetoothDevice.addEventListener('gattserverdisconnected', this.onDeviceDisconnected);
      return this.state.bluetoothDevice.gatt.connect()
        .then(()=>{
          this.isConnected();
        });
    })
  }
  
  isConnected = () => {
    console.log('Connected');
    this.setState({connected: true})
  }
  
  disconnect = (device) => {
    if (!this.state.bluetoothDevice){
      return;
    }
    if (this.state.bluetoothDevice.gatt.connected){
      this.state.bluetoothDevice.gatt.disconnect();
    }
    else {
      console.log('Already disconnected')
    }
  }
  
  onDeviceDisconnected = (event)=>{
    console.log('Disconnected')
    this.setState({connected: false})
  }

  readValue = (serviceUUID, characteristicUUID, successCallback, failureCallback) => {
    if (!this.state.bluetoothDevice){
      console.log('No bluetoothdevice')
      failureCallback();
    }
    if (this.state.connected){
      this.state.bluetoothDevice.gatt.getPrimaryService(serviceUUID)
      .then(service => {
        return service.getCharacteristic(characteristicUUID)
        .then(characteristic => {
          return characteristic.readValue()
          .then(value => {
            console.log(value)
            successCallback(value)
          })
        })
      })
    }
    else {
      console.log('Readfailure not connected')
      failureCallback();
    }
  }

  writeValue = (serviceUUID, characteristicUUID, successCallback, failureCallback, value) => {
    if (!this.state.bluetoothDevice){
      console.log('No bluetoothdevice')
      failureCallback();
    }
    if (this.state.connected){
      this.state.bluetoothDevice.gatt.getPrimaryService(serviceUUID)
      .then(service => {
        return service.getCharacteristic(characteristicUUID)
        .then(characteristic => {
          return characteristic.writeValue(value)
          .then(value => {
            return characteristic.readValue()
            .then(value => {
              console.log(value)
              successCallback(value)
            })
          })
        })
      })
    }
    else {
      console.log('Readfailure not connected')
      failureCallback();
    }
  }
}*/
export default App;
