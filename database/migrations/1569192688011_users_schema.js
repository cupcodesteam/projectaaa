'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('shirt_id').nullable().unsigned().references('id').inTable('shirts')
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('cellphone', 11).notNullable()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
