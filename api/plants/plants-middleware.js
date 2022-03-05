const verifyInputs = async (req, res, next) => {
    const { nickname, species, h2oFrequency, user_id } = req.body;

    if (!nickname || !species || !h2oFrequency) {
        next({ message: 'Please enter required information' });
    } else {
        next();
    }
}

module.exports = {
    verifyInputs
}; 