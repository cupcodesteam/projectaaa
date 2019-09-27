'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserESportSchema extends Schema {
  up () {
    this.create('user_e_sports', (table) => {
      table.primary(['id', 'user_id', 'e_sport_id'])
      table.integer('id').notNullable().unsigned()
      table.integer('user_id').notNullable().unsigned()
      table.integer('e_sport_id').notNullable().unsigned()
      this.raw('ALTER TABLE `user_e_sports` CHANGE `id` `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;')
    })
  }

  down () {
    this.drop('user_e_sports')
  }
}

module.exports = UserESportSchema
