import FleetController from './../../components/fleet/controller/controller';
import FileUploadDirective from './../../components/file-upload/directive/directive';
import RegisterUtil from './../utils/register-util';
import Style from './../assets/scss/style.scss';

class App {
    static init() {
        RegisterUtil
            .init('FleetApp', ['ui.utils.masks'])
            .directive('fileUploadDirective', FileUploadDirective)
            .controller('FleetController', FleetController)
    }
}

App.init();
