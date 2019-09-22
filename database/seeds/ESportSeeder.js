'use strict'

/*
|--------------------------------------------------------------------------
| ESportSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// const ESport = use('App/Models/ESport')

class ESportSeeder {
  async run () {
    const cs = await Factory.model('App/Models/ESport').make()
    cs.name = 'Counter Strike'
    cs.save()
    const lol = await Factory.model('App/Models/ESport').make()
    lol.name = 'League Of Legends'
    lol.save()
    const fifa = await Factory.model('App/Models/ESport').make()
    fifa.name = 'FIFA'
    fifa.save()
  }
}

module.exports = ESportSeeder
