class StopServer{
    constructor(){
        this.stop();
    }
    stop(){
        process.exit(0);
    }
}

let server = new StopServer();