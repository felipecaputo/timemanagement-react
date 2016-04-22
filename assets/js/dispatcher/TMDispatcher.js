import * as Flux from 'flux';

class TMDispatcher extends Flux.Dispatcher {
    constructor(){
        super();
    }
    handleRequestAction(payload) {
        payload.origin = 'REQUEST';
        this.dispatch(payload);
    }
    handleClientAction(payload) {
        payload.origin = 'CLIENT';
        this.dispatch(payload);
    }
}

let dispatcher = new TMDispatcher();

export default dispatcher;