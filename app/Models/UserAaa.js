'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserAaa extends Model {
    users() {
        return this.hasMany('App/Models/User')
    }

    aaas() {
        return this.hasMany('App/Models/Aaa')
    }

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }
}

module.exports = UserAaa
