'use strict'

/*
|--------------------------------------------------------------------------
| ShirtSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Shirt = use('App/Models/Shirt')

class ShirtSeeder {
  async run () {
    const pp = await Factory.model('App/Models/Shirt').make()
    pp.size = 'pp'
    pp.save()
    const p = await Factory.model('App/Models/Shirt').make()
    p.size = 'p'
    p.save()
    const m = await Factory.model('App/Models/Shirt').make()
    m.size = 'm'
    m.save()
    const g = await Factory.model('App/Models/Shirt').make()
    g.size = 'g'
    g.save()
    const gg = await Factory.model('App/Models/Shirt').make()
    gg.size = 'gg'
    gg.save()
  }
}

module.exports = ShirtSeeder
