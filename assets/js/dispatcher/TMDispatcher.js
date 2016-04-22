import * as Flux from 'flux';

class TMDispatcher extends Flux.Dispatcher {
    constructor(){
        super();
    }
    handleRequestAction(type, data) {
        let payload = {
            origin: 'REQUEST',
            type: type,
            data: data
        };
        
        this.dispatch(payload);
    }
    handleClientAction(type, data) {
        let payload = {
            origin: 'CLIENT',
            type: type,
            data: data
        };
        
        this.dispatch(payload);
    }
}

let dispatcher = new TMDispatcher();

export default dispatcher;