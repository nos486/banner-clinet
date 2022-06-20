import net from "net";

class Socket {
    constructor(vue) {
        this._vue = vue
        this._socket = null
        this._isConnected = false
        this._date = {}

        //singleton class
        let inst = !!Socket.instance;
        if (inst) {
            return Socket.instance;
        }
        Socket.instance = this;
        return this;
    }

    connect(address = '127.0.0.1', port = 1337) {

        this._socket = new net.Socket()
        this._socket.connect(port, address, () => {
            this._isConnected = true
            this.sendToServer("connect", {width: window.innerWidth})
        });

        this._socket.on('data', (data) => {
            this.dataReceived(data)
        });

        this._socket.on('close', () => {
            this._isConnected = false
            console.log('Connection closed', this._socket);
        });

        console.log(this._socket)
    }

    disConnect() {
        this._socket.close()
        this._socket.destroy()
        console.log("client disconnected")
    }

    sendToServer(method, param) {
        this._socket.write(JSON.stringify({method, param}));
    }

    get isConnected() {
        return this._isConnected
    }

    get data() {
        return this._date
    }

    dataReceived(data){
        data = JSON.parse(data)
        console.log('Received: ' + data);
        this._date = data

        if (data.code === 200){
            console.log(data.message)
        }

        if (data.code === 400){
            alert(data.message)
        }
    }
}

export default {
    mounted() {

    }, data() {
        return {
            socket: new Socket(this)
        };
    }, methods: {}
}
