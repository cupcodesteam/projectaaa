'use strict'

const User = use('App/Models/User')
const AAA = use('App/Models/Aaa')
const Sport = use('App/Models/Sport')
const ESport = use('App/Models/ESport')
const UserSport = use('App/Models/UserSport')
const UserESport = use('App/Models/UserESport')
const UserAaa = use('App/Models/UserAaa')
const Factory = use('Factory')

const { test, trait } = use('Test/Suite')('User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')

/**
 * CONTROLLER: USER
 */
test('login/logout de usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const attr = {
    username: 'Filipe Alves Sampaio',
    email: user.email,
    cellphone: '86999999999',
    password: user.password,
  }

  const response = await client.post('user/login').send(attr).end()

  // console.log(response)

  response.assertStatus(200)

  const response2 = await client.post('user/logout').loginVia(user).end()

  // console.log(response2)

  response2.assertStatus(204)
})

test('listar perfil de usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client.get('user/profile').loginVia(user).end()

  // console.log(response)
  response.assertStatus(200)
})

test('listar perfil de usuário por id', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client.get(`user/profile/${user.id}`).loginVia(user).end()

  // console.log(response)
  response.assertStatus(200)
})

test('cadastro de usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const attr = {
    username: 'Filipe Alves Sampaio',
    email: 'email@email.com',
    cellphone: '86999999999',
    password: '1212123',
  }

  const response = await client.post('user/create').send(attr).end()

  // console.log(response)

  response.assertStatus(200)

  assert.equal(await User.getCount(), 2)
})

test('atualizar perfil de usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const attr = {
    username: 'Filipe Alves Sampaio',
    email: 'email@email.com',
    cellphone: '86999999999',
    password: '12',
  }

  const response = await client.patch(`/user/profile/${user.id}`).loginVia(user).send(attr).end()

  // console.log(response)
  response.assertStatus(200)
})

test('editando esportes de usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const futsal = await Factory.model('App/Models/Sport').make()
  futsal.name = "Futsal Masculino"
  await futsal.save()
  const volei = await Factory.model('App/Models/Sport').make()
  volei.name = "Vôlei Masculino"
  await volei.save()
  const basquete = await Factory.model('App/Models/Sport').make()
  basquete.name = "Basquete Masculino 3x3"
  await basquete.save()

  await user.user_sports().save(futsal)
  await user.user_sports().save(volei)
  await user.user_sports().save(basquete)

  assert.equal(await Sport.getCount(), 3)
  assert.equal(await UserSport.getCount(), 3)
})

test('editando e-sports de usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const cs = await Factory.model('App/Models/ESport').make()
  cs.name = 'Counter Strike'
  await cs.save()
  const lol = await Factory.model('App/Models/ESport').make()
  lol.name = 'League Of Legends'
  await lol.save()
  const fifa = await Factory.model('App/Models/ESport').make()
  fifa.name = 'FIFA'
  await fifa.save()

  await user.user_e_sports().save(cs)
  await user.user_e_sports().save(lol)
  await user.user_e_sports().save(fifa)

  assert.equal(await ESport.getCount(), 3)
  assert.equal(await UserESport.getCount(), 3)
})

test('listando todos os esportes do usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const futsal = await Factory.model('App/Models/Sport').make()
  futsal.name = "Futsal Masculino"
  await futsal.save()
  const volei = await Factory.model('App/Models/Sport').make()
  volei.name = "Vôlei Masculino"
  await volei.save()
  const basquete = await Factory.model('App/Models/Sport').make()
  basquete.name = "Basquete Masculino 3x3"
  await basquete.save()

  await user.user_sports().save(futsal)
  await user.user_sports().save(volei)
  // await user.user_sports().save(basquete)

  const response = await client.get('user/sports').loginVia(user).end()

  // console.log(response)
  response.assertStatus(200)
})

test('listando todos os e-sports do usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const cs = await Factory.model('App/Models/ESport').make()
  cs.name = 'Counter Strike'
  await cs.save()
  const lol = await Factory.model('App/Models/ESport').make()
  lol.name = 'League Of Legends'
  await lol.save()
  const fifa = await Factory.model('App/Models/ESport').make()
  fifa.name = 'FIFA'
  await fifa.save()

  await user.user_e_sports().save(cs)
  // await user.user_e_sports().save(lol)
  await user.user_e_sports().save(fifa)

  const response = await client.get('user/e-sports').loginVia(user).end()

  // console.log(response)
  response.assertStatus(200)
})

test('removendo um esporte do usuário pelo id do esporte', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const futsal = await Factory.model('App/Models/Sport').make()
  futsal.name = "Futsal Masculino"
  await futsal.save()
  const volei = await Factory.model('App/Models/Sport').make()
  volei.name = "Vôlei Masculino"
  await volei.save()
  const basquete = await Factory.model('App/Models/Sport').make()
  basquete.name = "Basquete Masculino 3x3"
  await basquete.save()

  await user.user_sports().save(futsal)
  await user.user_sports().save(volei)
  await user.user_sports().save(basquete)

  const response = await client.delete(`user/sports/${futsal.id}`).loginVia(user).end()

  // console.log(response)
  response.assertStatus(200)

  assert.equal(await UserSport.getCount(), 2)
})

test('removendo um e-sport do usuário pelo id do esporte', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const cs = await Factory.model('App/Models/ESport').make()
  cs.name = 'Counter Strike'
  await cs.save()
  const lol = await Factory.model('App/Models/ESport').make()
  lol.name = 'League Of Legends'
  await lol.save()
  const fifa = await Factory.model('App/Models/ESport').make()
  fifa.name = 'FIFA'
  await fifa.save()

  await user.user_e_sports().save(cs)
  await user.user_e_sports().save(lol)
  await user.user_e_sports().save(fifa)

  const response = await client.delete(`user/e-sports/${cs.id}`).loginVia(user).end()

  // console.log(response)
  response.assertStatus(200)

  assert.equal(await UserESport.getCount(), 2)
})

test('vunculando esporte a um usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const futsal = await Factory.model('App/Models/Sport').make()
  futsal.name = "Futsal Masculino"
  await futsal.save()
  const volei = await Factory.model('App/Models/Sport').make()
  volei.name = "Vôlei Masculino"
  await volei.save()
  const basquete = await Factory.model('App/Models/Sport').make()
  basquete.name = "Basquete Masculino 3x3"
  await basquete.save()

  // await user.user_sports().save(futsal)
  await user.user_sports().save(volei)

  const attr = {
    'user_id': user.id,
    'sport_id': futsal.id
  }

  const response = await client.post('user/vinc-sport').loginVia(user).send(attr).end()

  // console.log(response)

  response.assertStatus(200)

  // const response2 = await client.post('user/vinc-sport').loginVia(user).send(attr).end()

  // console.log(response2)

  // response2.assertStatus(200)

  // console.log(await UserSport.query().where('user_id', user.id).fetch())
  assert.equal(await UserSport.getCount(), 2)
})

test('vunculando e-sport a um usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const cs = await Factory.model('App/Models/ESport').make()
  cs.name = 'Counter Strike'
  await cs.save()
  const lol = await Factory.model('App/Models/ESport').make()
  lol.name = 'League Of Legends'
  await lol.save()
  const fifa = await Factory.model('App/Models/ESport').make()
  fifa.name = 'FIFA'
  await fifa.save()

  // await user.user_e_sports().save(cs)
  await user.user_e_sports().save(lol)

  const attr = {
    'user_id': user.id,
    'e_sport_id': cs.id
  }

  const response = await client.post('user/vinc-e-sport').loginVia(user).send(attr).end()

  // console.log(response)

  response.assertStatus(200)

  // const response2 = await client.post('user/vinc-sport').loginVia(user).send(attr).end()

  // console.log(response2)

  // response2.assertStatus(200)

  // console.log(await UserSport.query().where('user_id', user.id).fetch())
  assert.equal(await UserESport.getCount(), 2)
})

test('vunculando e-sport a um usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const aaa = await Factory.model('App/Models/Aaa').create()

  // console.log(aaa)
  const attr = {
    'user_id': user.id,
    'aaa_id': aaa.id
  }

  const response = await client.post('user/vinc-aaa').loginVia(user).send(attr).end()

  // console.log(response)

  response.assertStatus(200)

  // const response2 = await client.post('user/vinc-sport').loginVia(user).send(attr).end()

  // console.log(response2)

  // response2.assertStatus(200)

  // console.log(await UserSport.query().where('user_id', user.id).fetch())
  assert.equal(await UserAaa.getCount(), 1)
})