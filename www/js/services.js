angular.module('jeece-mission-app.services', ['ionic', 'ngResource'])

.factory('API', function($resource){

	

})

.service('passFromController', function () {
        var property = 'First';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
});