'use strict'

const AAA = use('App/Models/Aaa')
const Factory = use('Factory')

const { test, trait } = use('Test/Suite')('Aaa')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')

test('login/logout de uma Atlética', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/Aaa').create()

  const attr = {
    name: 'aaa test',
    institution: 'instituiton test',
    email: user.email,
    password: user.password,
  }

  const response = await client.post('aaa/login').send(attr).end()

  // console.log(response)

  response.assertStatus(200)

  const response2 = await client.post('aaa/logout').loginVia(user).end()

  // console.log(response2)

  response2.assertStatus(204)
})

test('listar atlética', async({ assert, client }) => {
  const user = await Factory.model('App/Models/Aaa').create()

  const user2 = await Factory.model('App/Models/User').create()

  const response = await client.get('aaa/profile').loginVia(user).end()

  // console.log(response)
  response.assertStatus(200)
})

test('cadastro de atlética', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/Aaa').create()

  const attr = {
    name: 'aaa test',
    institution: 'instituiton test',
    email: 'email@email.com',
    password: '1212123',
  }

  const response = await client.post('aaa/create').send(attr).end()

  // console.log(response)

  response.assertStatus(200)

  assert.equal(await AAA.getCount(), 2)
})

test('atualizar perfil da atlética', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/Aaa').create()

  const attr = {
    name: 'aaa test',
    institution: 'instituiton test',
    email: 'email@email.com',
    password: '1212123',
  }

  const response = await client.patch(`/aaa/profile/${user.id}`).loginVia(user).send(attr).end()

  // console.log(response)
  response.assertStatus(200)
})