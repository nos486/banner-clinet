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

    connect(address = '127.0.0.1',id=0, port = 1337) {

        this._socket = new net.Socket()
        this._socket.connect(port, address, () => {
            this._isConnected = true
            this.sendToServer("connect", {width: window.innerWidth,id:id})
        });

        this._socket.on('data', (data) => {
            let list = data.toString().split("/n")
            for (let data of list){
                if (data.length > 0) this.dataReceived(data)
            }
        });

        this._socket.on('close', () => {
            this._isConnected = false
            console.log('Connection closed', this._socket);
        });
    }

    disConnect() {
        if(this._socket !== null){
            this._socket.close()
            this._socket.destroy()
            console.log("client disconnected")
        }
    }

    sendToServer(method, param) {
        if(this.isConnected){
            this._socket.write(JSON.stringify({method, param}));
        }else {
            alert("client not connected")
        }
    }

    get isConnected() {
        return this._isConnected
    }

    get data() {
        return this._date
    }

    dataReceived(data){
        console.log(data.toString())
        data = JSON.parse(data)
        console.log('Received: ' + data);


        if (data.code === 200){
            switch (data.method){
                case "setData" :
                    this._date = data.result
            }
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
