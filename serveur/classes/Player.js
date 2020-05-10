module.exports = class Player {

    constructor(name, role, socketId) {
        this.name = name;
        this.role = role;
        this.socketId = socketId;
        this.alive = true;
    }
}