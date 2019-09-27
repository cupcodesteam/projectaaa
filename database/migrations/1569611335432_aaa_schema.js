'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AaaSchema extends Schema {
  up () {
    this.create('aaas', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('institution', 100).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('aaas')
  }
}

module.exports = AaaSchema
