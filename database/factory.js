'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    cellphone: '86999999999',
    password: faker.password(),
  }
})

Factory.blueprint('App/Models/Shirt', (faker) => {
    return {
        size: 'tamanho'
    }
})

Factory.blueprint('App/Models/Sport', (faker) => {
    return {
        name: 'esporte'
    }
})

Factory.blueprint('App/Models/ESport', (faker) => {
    return {
        name: 'e-esport'
    }
})
