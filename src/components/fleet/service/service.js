import Fleet from './../model/model';

class Service {
    constructor() {
        this.fleet = new Fleet();
    }

    save(fleet) {
        this.fleet = fleet;
    }

    get() {
        return this.fleet;
    }
}

export default Service;
