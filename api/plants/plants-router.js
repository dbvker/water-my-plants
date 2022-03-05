const router = require('express').Router();
const Plant = require('./plants-model');
const { restricted } = require('../users/users-middleware');
const { verifyInputs } = require('./plants-middleware');

// Get all plants
router.get('/', (req, res, next) => {
    Plant.getAllPlants()
        .then((plants) => res.json(plants))
        .catch(next);
});

// Get plant by ID
router.get('/:plant_id', (req, res, next) => {
    const { plant_id } = req.params;
    Plant.getPlantById(plant_id)
        .then((plant) => res.json(plant))
        .catch(next);
});


// Insert new plant
router.post('/', verifyInputs, (req, res, next) => {
    Plant.insertPlant(req.body, { user_id: 1 })
        .then(plant => res.json(plant))
        .catch(next({ status: 600 }));
});

// Update a plant
router.put('/:id', (req, res, next) => {
    const { id } = req.params; 

    Plant.updatePlant(id, req.body)
        .then(plant => {
            res.json(plant);
        }).catch(next);
});

// Delete a plant by ID
router.delete('/:plant_id', (req, res, next) => {
    try {
        const { plant_id } = req.params;
        Plant.deletePlantById(plant_id)
            .then((deletedPlant) => {
                res.json(deletedPlant);
            })
            .catch(next);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
