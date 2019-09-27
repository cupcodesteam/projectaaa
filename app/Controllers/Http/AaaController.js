'use strict'

const AAA = use('App/Models/Aaa')

class AaaController {
    // login
    async login({ auth, request, response, view }) {
        const { email, password } = request.all()
        try {
            const user = await AAA.findBy('email', email, 'password', password)

            await auth.login(user)

            return (await auth.getUser() ? 'deu' : 'so nada')
        } catch (error) {
            return response.status(401).send('Autenticação inválida. Favor verificar e-mail e senha.')
        }
    }
    // logout
    async logout({ auth, response, view }) {
        await auth.logout()
    }
    // listar Atlética
    async index({ auth, request, response, view }) {
        try {
            return await auth.getUser()
        } catch (error) {
            return response.status(401).send('Autenticação inválida. Favor verificar e-mail e senha.')
        }
    }
    // listar usuários vinculados a atlética
    // cadastrar Atlética
    async store({ request, response, view }) {
        const user = await AAA.create(request.only(['name', 'institution', 'email', 'password']))
        return response.json({ user })
    }
    // editar Atlética
    async update({ auth, params, request, response, view }) {
        if (await auth.user.id == params.id) {
            const user = await AAA.findOrFail(params.id)
            const data = request.only(['name', 'institution', 'email', 'password'])

            user.merge(data)
            await user.save()

            return response.json({ user })
        }
        return response.status(401).send('Acesso negado.')
    }
    // remover Atlética
}

module.exports = AaaController
