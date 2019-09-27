'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSportSchema extends Schema {
  up () {
    this.create('user_sports', (table) => {
      table.primary(['id', 'user_id', 'sport_id'])
      table.integer('id').notNullable().unsigned()
      table.integer('user_id').notNullable().unsigned()
      table.integer('sport_id').notNullable().unsigned()
      this.raw('ALTER TABLE `user_sports` CHANGE `id` `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;')
    })
  }

  down () {
    this.drop('user_sports')
  }
}

module.exports = UserSportSchema
