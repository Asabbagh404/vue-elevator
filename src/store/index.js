import Vue from 'vue'
import Vuex from 'vuex'

import floors from './module/floors'
import elevator from './module/elevator'

Vue.use(Vuex);

export const store =  new Vuex.Store({
    modules: {
        floors,
        elevator
    }
})
