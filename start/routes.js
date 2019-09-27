'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// rotas públicas do usuário
Route.post('user/create', 'UserController.store')
Route.post('user/login', 'UserController.login')

// rotas públicas da AAA
Route.post('aaa/create', 'AaaController.store')
Route.post('aaa/login', 'AaaController.login')

Route.group(() => {
    // rotas do perfil do usuário
    Route.resource('profile', 'UserController').only(['index', 'update'])
    Route.get('profile/:id', 'UserController.getById')
    Route.get('sports', 'UserController.getAllSports')
    Route.get('e-sports', 'UserController.getAllESports')
    Route.post('vinc-sport', 'UserController.storeSport')
    Route.post('vinc-e-sport', 'UserController.storeESport')
    Route.post('vinc-aaa', 'UserController.storeAAA')
    Route.delete('sports/:id', 'UserController.destroySport')
    Route.delete('e-sports/:id', 'UserController.destroyESport')
    // logout
    Route.post('logout', 'UserController.logout')
}).prefix('user').middleware('auth:session')

Route.group(() => {
    // Rotas do perfil da atlética
    Route.resource('profile', 'AaaController').only(['index', 'update'])
    // logout
    Route.post('logout', 'AaaController.logout')
}).prefix('aaa').middleware('auth:aaa')