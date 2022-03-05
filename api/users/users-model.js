const db = require('../data/db-config');

const getAllUsers = () => {
    return db('users')
        .select('users.user_id', 'users.username', 'users.phoneNumber');
};

const getUserBy = (filter) => {
    return db('users').where(filter);
};

const getUserById = (user_id) => {
    return db('users').where('user_id', user_id);
};

const insertUser = async (user) => {
  const [newUser] = await db('users').insert(user, ['username', 'phoneNumber', 'password']);
  return newUser
};

const updateUser = async (user, user_id) => {
    const [updatedUser] = await db('users')
        .where('user_id', user_id)
        .update(user, ['user_id', 'username', 'phoneNumber', 'password']);
    return updatedUser;
};

const deleteUserById = async (user_id) => {
    const [deletedUser] = await db('users')
        .where('user_id', user_id)
        .del(['user_id', 'username', 'phoneNumber', 'password'])
    return deletedUser;
}; // works but needs fixed. Will delete the user but won't show the user or a correct message

module.exports = {
    getAllUsers,
    getUserBy,
    getUserById,
    insertUser,
    updateUser,
    deleteUserById
}