'use strict'

/*
|--------------------------------------------------------------------------
| SportSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class SportSeeder {
  async run () {
    const futsal = await Factory.model('App/Models/Sport').make()
    futsal.name = "Futsal Masculino"
    futsal.save()
    const volei = await Factory.model('App/Models/Sport').make()
    volei.name = "Vôlei Masculino"
    volei.save()
    const basquete = await Factory.model('App/Models/Sport').make()
    basquete.name = "Basquete Masculino 3x3"
    basquete.save()
  }
}

module.exports = SportSeeder
