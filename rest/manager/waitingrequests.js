'use strict';

var ctrlFactory = require('restitute').controller;



function listController() {
    ctrlFactory.list.call(this, '/rest/manager/waitingrequests');

    this.controllerAction = function() {
        this.jsonService(this.service('manager/waitingrequests/list', { user: this.req.user._id }));
    };
}
listController.prototype = new ctrlFactory.list();


function getController() {
    ctrlFactory.get.call(this, '/rest/manager/waitingrequests/:id');

    this.controllerAction = function() {
        this.jsonService(this.service('manager/waitingrequests/get', { user: this.req.user._id }));
    };
}
getController.prototype = new ctrlFactory.get();



function updateController() {
    ctrlFactory.update.call(this, '/rest/manager/waitingrequests/:id');

    var controller = this;
    this.controllerAction = function() {

        // since service is query independant, we have to give
        // the additional parameter

        controller.jsonService(
            controller.service('manager/waitingrequests/save', {
                user: this.req.user._id
            })
        );
    };
}
updateController.prototype = new ctrlFactory.update();



exports = module.exports = {
    list: listController,
    get: getController,
    update: updateController
};