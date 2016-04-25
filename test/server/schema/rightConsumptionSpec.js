'use strict';

let helpers = require('./mockDatabase');
let api = {
    user: require('../../../api/User.api'),
    request: require('../../../api/Request.api'),
    right: require('../../../api/Right.api')
};

describe('Right consumption', function() {

    let app;

    let monday = new Date(2016,3,11,0,0,0,0);
    let sunday = new Date(2016,3,10,0,0,0,0);
    let friday = new Date(2016,3,15,0,0,0,0);

    beforeEach(function(done) {
        helpers.mockDatabase('rightConsumptionSpec', function(mockapp) {
            app = mockapp;

            done();
        });
    });


    it('verify default consuption type', function(done) {
        api.user.createRandomAccountRequest(app, {
            name: 'default consuption'
        }, {
            name: 'default consuption'
        },
        monday
        ).then(elem => {
            expect(elem.quantity).toEqual(1);
            expect(elem.consumedQuantity).toEqual(elem.quantity);
            done();
        }).catch(done);
    });


    it('verify proportion consuption type with 100% attendance on a monday', function(done) {
        api.user.createProportionConsRequest(app, 100, monday).then(elem => {
            expect(elem.quantity).toEqual(1);
            expect(elem.consumedQuantity).toEqual(1);
            done();
        }).catch(done);
    });

    it('verify proportion consuption type with 100% attendance on a sunday', function(done) {
        api.user.createProportionConsRequest(app, 100, sunday).then(elem => {
            expect(elem.quantity).toEqual(1);
            expect(elem.consumedQuantity).toEqual(1); // working period are not taken into account for this consuption type
            done();
        }).catch(done);
    });


    it('verify proportion consuption type with 50% attendance on a monday', function(done) {
        api.user.createProportionConsRequest(app, 50, monday).then(elem => {
            expect(elem.quantity).toEqual(1);
            expect(elem.consumedQuantity).toEqual(2);
            done();
        }).catch(done);
    });

    it('verify proportion consuption type with 50% attendance on a monday and thusday', function(done) {
        api.user.createProportionConsRequest(app, 50, monday, 2).then(elem => {
            expect(elem.quantity).toEqual(2);
            expect(elem.consumedQuantity).toEqual(4);
            done();
        }).catch(done);
    });


    it('verify proportion consuption type with 75% attendance on a monday', function(done) {
        api.user.createProportionConsRequest(app, 75, monday).then(elem => {
            expect(elem.quantity).toEqual(1);
            expect(elem.consumedQuantity).toBeCloseTo(1.333);
            done();
        }).catch(done);
    });


    it('verify businessDays consuption type on a monday', function(done) {
        api.user.createBusinessDaysConsRequest(app, monday, 1).then(elem => {
            expect(elem.quantity).toEqual(1);
            expect(elem.consumedQuantity).toEqual(1);
            done();
        }).catch(err => {
            done(err);
            console.log(err.stack);
            console.log(err.errors);
        });
    });


    it('verify businessDays consuption type on a friday', function(done) {
        api.user.createBusinessDaysConsRequest(app, friday, 1).then(elem => {
            expect(elem.quantity).toEqual(1);
            expect(elem.consumedQuantity).toEqual(2);
            done();
        }).catch(done);
    });


    it("should disconnect from the database", function(done) {
        app.disconnect(function() {
            // and delete the test db
            helpers.dropDb('rightConsumptionSpec', done);
        });
	});


});