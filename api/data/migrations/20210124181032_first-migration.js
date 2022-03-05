exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username').notNullable().unique()
      users.string('phoneNumber').notNullable().unique()
      users.string('password').notNullable()
      users.timestamps(false, true)
    })
    .createTable('plants', (plant) => {
      plant.increments('plant_id')
      plant.string('nickname').notNullable()
      plant.string('species').notNullable()
      plant.string('h2oFrequency').notNullable()
      plant.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
}
