'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ESport extends Model {
    users() {
        return this
            .belongsToMany('App/Models/User')
            .pivotTable('user_e_sports')
    }
}

module.exports = ESport
