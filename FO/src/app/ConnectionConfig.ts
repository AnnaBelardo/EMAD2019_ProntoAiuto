export class ConnectionConfig {
    static ip = '192.168.42.1';
    static port = '8080';
    static getBaseUrl() {
        return 'http://' + this.ip + ':' + this.port;
    }
}
