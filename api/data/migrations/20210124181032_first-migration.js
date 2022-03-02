exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('phoneNumber', 15).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('plants', (plant) => {
      plant.increments('plant_id')
      plant.string('nickname').notNullable()
      plant.string('species').notNullable()
      plant.string('h2oFrequency').notNullable()
      plant.string('image')
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
}
