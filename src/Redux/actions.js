export const CONNECT = 'CONNECT';
export const SEND = 'SEND';
export const RECEIVED = 'RECEIVED';

let websocketInstance = null;

export const connectws = () => {
    return (dispatch) => {
        if (websocketInstance) {
            console.log(websocketInstance)
            // Si ya hay una instancia del WebSocket, no se realiza una nueva conexión
            return;
          }
        const access_token = 'vn4HigAAAA11czEubG9yaW90LmlvGXEL1IAdq4R1ZW94I1fl8g=='
        const url= `wss://us1.loriot.io/app?token=${access_token}`;
        const ws = new WebSocket(url);
        const dataRequest = {
            cmd: 'cq',
            filter: {
            from: '1684628776696',
            EUI: '4768C40A00260021',
            }
        };
        ws.onopen = () => {
            console.log('WebSocket connection established');
            setTimeout(ws.send(JSON.stringify(dataRequest)),500) 
            ws.onmessage = (event) => {dispatch({type: 'CONNECT', payload: JSON.parse(event.data)})}
            ws.onclose = () => {
                console.log('WebSocket connection closed');
                websocketInstance = null; // Reiniciar la variable de la instancia del WebSocket
            };
        }
        
        
        
    }
}
                
             

export const sendws = (data) =>
({
    type: SEND,
    payload: data
})
export const receivedws = (data) => ({
    type: RECEIVED,
    payload: data
})