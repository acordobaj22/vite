import {CONNECT,SEND,RECEIVED, receivedws} from './actions'

const initialState = {
    data: null
}

const wsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONNECT:
            // const access_token = 'vn4HigAAAA11czEubG9yaW90LmlvGXEL1IAdq4R1ZW94I1fl8g=='
            // const url= `wss://us1.loriot.io/app?token=${access_token}`;
            // const ws = new WebSocket(url);
            // const dataRequest = {
            //     cmd: 'cq',
            //     filter: {
            //     from: '1684628776696',
            //     EUI: '4768C40A00260021',
            //     }
            // };
            // ws.onopen = () => {
            //     // console.log('WebSocket connection established');
            //     setTimeout(() => {
            //     ws.send(JSON.stringify(dataRequest));
            //     }, 500);
            // };
            // ws.onmessage = (event) => {
            //     const message = JSON.parse(event.data);
            //     content= message
            // }    
            return{
                ...state,
                data: action.payload
            }
        case SEND:
            state.ws.send(JSON.stringify(action.payload))
            return state;
        case RECEIVED:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;    

    }
}
export default wsReducer