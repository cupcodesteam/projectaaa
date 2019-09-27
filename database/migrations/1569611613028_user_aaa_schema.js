'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAaaSchema extends Schema {
  up () {
    this.create('user_aaas', (table) => {
      table.primary(['id', 'user_id', 'aaa_id'])
      table.integer('id').notNullable().unsigned()
      table.integer('user_id').notNullable().unsigned()
      table.integer('aaa_id').notNullable().unsigned()
      this.raw('ALTER TABLE `user_aaas` CHANGE `id` `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;')
    })
  }

  down () {
    this.drop('user_aaas')
  }
}

module.exports = UserAaaSchema
