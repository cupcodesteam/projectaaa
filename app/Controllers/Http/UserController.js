'use strict'

const User = use('App/Models/User')
const UserSport = use('App/Models/UserSport')
const UserESport = use('App/Models/UserESport')

class UserController {
    // login
    async login({ auth, request, response, view }) {
        const { email, password } = request.all()
        try {
            const user = await User.findBy('email', email, 'password', password)

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
    // listar usuario da sessao
    async index({ auth, request, response, view }) {
        try {
            return await auth.getUser()
        } catch (error) {
            return response.status(401).send('Autenticação inválida. Favor verificar e-mail e senha.')
        }
    }
    // listar por id do usuário
    async getById({ params, request, response, view }) {
        const user = await User.findOrFail(params.id)
        user.password = "" // limpando campo da senha por segurança
        return response.json({ user })
    }
    // listar esportes do usuário
    async getAllSports({ auth, request, response, view }) {
        try {
            const user = await auth.getUser()
            return user.user_sports().fetch()
        } catch (error) {
            return response.status(401).send('Autenticação inválida. Favor verificar e-mail e senha.')
        }
    }
    // listar e-sports do usuário
    async getAllESports({ auth, request, response, view }) {
        try {
            const user = await auth.getUser()
            return user.user_e_sports().fetch()
        } catch (error) {
            return response.status(401).send('Autenticação inválida. Favor verificar e-mail e senha.')
        }
    }
    // cadastrar usuário
    async store({ request, response, view }) {
        const user = await User.create(request.only(['shirt_id', 'username', 'email', 'cellphone', 'password']))
        return response.json({ user })
    }
    // vincular usuário a um esporte (REFATORAR - TA MUITO FEIO E CONFUSO)
    async storeSport({ auth, request, response, view }) {
        const user = await User.find(await auth.user.id)

        try{
            const user_sport = await UserSport.findByOrFail(request.only(['user_id', 'sport_id']))

            return response.status(204).send("Não é possível vincular o mesmo esporte. Já existe vínculo com o mesmo.")
        }catch(error){
            const user_sport = await UserSport.create(request.only(['user_id', 'sport_id']))
            return response.json({ user_sport })
        }
    }
    // vincular usuário a um e-sport (REFATORAR - TA MUITO FEIO E CONFUSO)
    async storeESport({ auth, request, response, view }) {
        const user = await User.find(await auth.user.id)

        try{
            const user_e_sport = await UserESport.findByOrFail(request.only(['user_id', 'e_sport_id']))

            return response.status(204).send("Não é possível vincular o mesmo e-sport. Já existe vínculo com o mesmo.")
        }catch(error){
            const user_e_sport = await UserESport.create(request.only(['user_id', 'e_sport_id']))
            return response.json({ user_e_sport })
        }
    }
    // atualizar usuário por id
    async update({ auth, params, request, response, view }) {
        if (await auth.user.id == params.id) {
            const user = await User.findOrFail(params.id)
            const data = request.only(['shirt_id', 'username', 'email', 'cellphone', 'password'])

            user.merge(data)
            await user.save()

            return response.json({ user })
        }
        return 'Acesso negado.'
    }
    // remover usuário por id (tomar cuidado pois se o usuario se remover deve ser removido o vinculo com as AAA que ele pertence)
    // async destroy({ params, view }) {
    //     const user = await User.findOrFail(params.id)
    //     return await user.delete()
    // }
    // remover vinculo do usuário com um esporte
    async destroySport({ auth, params, request, response, view }) {
        try {
            const user_sport = await UserSport.findBy('user_id', await auth.user.id, 'sport_id', params.id)
            return await user_sport.delete()
        } catch (error) {
            return response.status(401).send('Autenticação inválida. Favor verificar e-mail e senha.')
        }
    }
    // remover vinculo do usuário com um e-sport
    async destroyESport({ auth, params, request, response, view }) {
        try {
            const user_e_sport = await UserESport.findBy('user_id', await auth.user.id, 'e_sport_id', params.id)
            return await user_e_sport.delete()
        } catch (error) {
            return response.status(401).send('Autenticação inválida. Favor verificar e-mail e senha.')
        }
    }

}

module.exports = UserController
