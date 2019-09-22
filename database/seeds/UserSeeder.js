'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const users = await Factory.model('App/Models/User').create()
    console.log(User.getCount())
  }
}

module.exports = UserSeeder
