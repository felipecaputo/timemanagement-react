import * as Flux from 'flux';

class TMDispatcher extends Flux.Dispatcher {
    constructor(){
        super();
    }
}

let dispatcher = new TMDispatcher();

export default dispatcher;