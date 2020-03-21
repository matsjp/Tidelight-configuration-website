export const brightnessSuccess = (component, value) => {
    console.log(value);
    let read = value.getUint8(0);
    component.setState({read: read});
}