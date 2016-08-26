import Fleet from './../model/model';
import Vehicle from './../../vehicle/model/model';
import ServiceFleet from './../service/service';

class Controller {
    constructor($scope){
        this.$scope = $scope;
        this.$scope.vehicle = new Vehicle();
        this.service = new ServiceFleet();
        this.initialize();
    }

    initialize() {
        this.$scope.fleet = this.service.get();
        this.$scope.currentPage = 0;
        this.initMock();
        this.buildPagination();
        this.showVehicle(0);
    }

    addVehicle() {
        this.$scope.fleet.vehicles.push(this.$scope.vehicle);
        this.service.save(this.$scope.fleet);
        this.$scope.vehicle = new Vehicle();
        this.buildPagination();
        return vehicle;
    }

    deleteVehicle(indexVehicle) {
        this.$scope.fleet.vehicles.slice(indexVehicle, 1);
        this.service.save(this.$scope.fleet);
        return vehicle;
    }

    markVehicle(vehicle) {
        vehicle.selected = (!vehicle.selected && this.$scope.selectAll? false: !vehicle.selected );
        this.$scope.selectAll = (!vehicle.selected? false:this.$scope.selectAll);
    }

    markAllVehicle() {
        this.$scope.selectAll = !this.$scope.selectAll;
        this.$scope.fleet.vehicles.forEach((vehicle) => {
            vehicle.selected = this.$scope.selectAll;
        });
    }

    filterVehicle() {
        var filtered = [];
        var query = this.$scope.query;
        if(!query){
            this.$scope.vehicles = this.$scope.fleet.vehicles;
            return;
        }

        this.$scope.fleet.vehicles.forEach((vehicle) => {
            var foundByBrand = vehicle.brand.toLowerCase().indexOf(query.toLowerCase()) != -1;
            var foundByFuel = vehicle.fuel.toLowerCase().indexOf(query.toLowerCase()) != -1;
            if(foundByBrand || foundByFuel)
            filtered.push(vehicle)
        });

        this.$scope.vehicles = filtered;
        this.buildPagination();
    }

    showVehicle(index) {
        var containFilter = this.$scope.query;
        var startFrom = index * 5;
        var endOn = startFrom + 5;

        this.$scope.vehicles = (containFilter?
            this.$scope.vehicles.slice(startFrom, endOn):
            this.$scope.fleet.vehicles.slice(startFrom, endOn)
        );
        this.$scope.currentPage = index;
    }

    prevPage() {
        var containFilter = this.$scope.query;
        var index = this.$scope.currentPage -1;
        var startFrom = index * 5;
        var endOn = startFrom + 5;

        this.$scope.vehicles = (containFilter?
            this.$scope.vehicles.slice(startFrom, endOn):
            this.$scope.fleet.vehicles.slice(startFrom, endOn)
        );
    }

    nextPage() {
        var containFilter = this.$scope.query;
        var index = this.$scope.currentPage + 1;
        var startFrom = index * 5;
        var endOn = startFrom + 5;

        this.$scope.vehicles = (containFilter?
            this.$scope.vehicles.slice(startFrom, endOn):
            this.$scope.fleet.vehicles.slice(startFrom, endOn)
        );
    }

    buildPagination() {
        var containFilter = this.$scope.query;
        var numPages = containFilter? this.$scope.vehicles.length / 5: (this.$scope.fleet.vehicles.length / 5);
        this.$scope.numPages = Math.floor(numPages) + 1;
    }

    getNumPages() {
        var numPages = this.$scope.numPages;
        var arr = new Array();

        for(var i=0; i < numPages; i++)
            arr.push(i);

        return arr;
    }

    initMock() {
        this.$scope.fleet.vehicles.push(new Vehicle("1-FFF­5498", "Volkswagem", "Gol", "flex", "20000", null));
        this.$scope.fleet.vehicles.push(new Vehicle("1-FOX­4125", "Volkswagem", "Fox", "gasolina", "20000", null));
        this.$scope.fleet.vehicles.push(new Vehicle("1-PAI­4121", "Volkswagen", "Fusca", "alcool", "20000", "https://lh4.googleusercontent.com/­_AhcQKHf7rM/AAAAAAAAAAI/AAAAAAAAAAA/QM­pqL4N YaE/s48­c­k­no/photo.jpg"));
        this.service.save(this.$scope.fleet);
    }
}

export default Controller;
