const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr');
module.exports = db

const Gardener = db.define('gardener', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    }
})

const Plot = db.define('plot', {
    size: {
        type: Sequelize.STRING
    },
    shaded: {
        type: Sequelize.BOOLEAN
    }
})

const Vegetable = db.define('vegetable', {
    name: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    },
    planted_on: {
        type: Sequelize.DATE
    }
})

Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});

Vegetable.bulkCreate([
    {name: 'carrot', color: 'orange', planted_on: '2018-09-24 12:00:00'},
    {name: 'tomato', color: 'red', planted_on: '2018-09-24 12:00:00'},
    {name: 'pepper', color: 'green', planted_on: '2018-09-24 12:00:00'}
]);