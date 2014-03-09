/**
 * App models, in load order
 */
var models = [
    'auth',
    'user'
];

module.exports = function (modelsPath) {
    models.forEach(function (model) {
        require(modelsPath + model);
    });
};
