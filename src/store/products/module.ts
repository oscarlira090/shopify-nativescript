import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

const ProductModule = {
  namespaced: true,
  state: {
    product: {
      id: '',
      name: '',
    },
    products: [],
  },
  mutations,
  actions,
  getters,
  strict: true,
}

export default ProductModule;