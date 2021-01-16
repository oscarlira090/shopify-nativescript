import * as types from './mutation-types'

const mutations = {
    [types.ADD](state, item) {
        state.products.push(item)
    },
    [types.UPDATE](state, item) {
        let itemToUpdate = state.products.find(i => i.id == item.id)
        Object.assign(itemToUpdate,item)
    },
    [types.DELETE](state, item) {
        state.products.splice(state.products.findIndex(i => i.id == item.id), 1)
      },
}

export default mutations;