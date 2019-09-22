'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShirtSchema extends Schema {
  up () {
    this.create('shirts', (table) => {
      table.increments()
      table.string('size', 15).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('shirts')
  }
}

module.exports = ShirtSchema
