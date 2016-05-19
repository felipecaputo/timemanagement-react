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
        let d= new Date();
        console.log(type, 'Started on', d);
        let payload = {
            origin: 'CLIENT',
            type: type,
            data: data
        };
        
        this.dispatch(payload);
        console.log(type, 'finished on', new Date(), 'total', new Date() - d);
    }
}

let dispatcher = new TMDispatcher();

export default dispatcher;