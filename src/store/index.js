import Vue from 'vue'
import Vuex from 'vuex'

import stages from './module/stages'
import elevator from './module/elevator'

Vue.use(Vuex);

export const store =  new Vuex.Store({
    modules: {
        stages,
        elevator
    }
})
