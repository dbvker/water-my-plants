const db = require('../data/db-config');

const getAllPlants = () => {
    return db('plants');
};

const getPlantById = (plant_id) => {
    return db('plants')
        .where({ plant_id });
};

const insertPlant = async (plant) => {
    const [newPlant] = await db('plants')
        .insert(plant);
    return newPlant
};

const updatePlant = (plant_id, plant) => {
    return db("plants")
    .where("plant_id", plant_id)
    .update(plant)
}

const deletePlantById = async (plant_id) => {
    const [{deletedPlant}] = await db('plants')
        .where('plant_id', plant_id)
        .del([ 'plant_id', 'nickname', 'species', 'h2oFrequency'])
    return deletedPlant;
}; // works but needs fixed. Will delete the user but won't show the user or a correct message


module.exports = {
    getAllPlants,
    getPlantById,
    insertPlant,
    updatePlant,
    deletePlantById
}