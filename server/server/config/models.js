
/**
 * App models, in load order
 */
var models = [
  'user'
];

module.exports = function (modelsPath) {
  models.forEach(function (model) {
    require(modelsPath + model);
  });
};
