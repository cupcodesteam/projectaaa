'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SportSchema extends Schema {
  up () {
    this.create('sports', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sports')
  }
}

module.exports = SportSchema
