'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ESportSchema extends Schema {
  up () {
    this.create('e_sports', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('e_sports')
  }
}

module.exports = ESportSchema
