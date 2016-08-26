import '../assets/scss/style.scss';

class Directive {

    constructor() {
        this.template =
            '<div class="form-control upload-box">' +
                '<label class="name-file">{{fileread}}</label>' +
                '<img class="icon-box" alt="Selecione um arquivo" ng-click="ctrl.selectImage()"/>' +
                '<input class="text-upload" type="file" accept="image/*" name="files[]" multiple=""/>' +
            '</div>';
        this.restrict = 'E';
        this.scope = {
            fileread: "="
        }
    }

    link(scope, element, attributes) {

        element = document.querySelector('file-upload-directive');
        element.querySelector("div").addEventListener('click', () => {
            element.querySelector('[type="file"]').click();
        });

        element.querySelector('[type="file"]').addEventListener('change', function (changeEvent) {
            var reader = new FileReader();
            reader.onload = (loadEvent) => {
                scope.$apply(() => {
                    scope.fileread = element.querySelector('[name="files[]"]').value;
                });
            }
            reader.readAsDataURL(changeEvent.target.files[0]);
        });
    }
}

export default Directive;
