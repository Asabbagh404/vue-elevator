const state = {
    floors: [
        {key : 0, name : -1, pending: []},
        {key : 1, name : 0, pending: []},
        {key : 2, name : 1, pending: []},
        {key : 3, name : 2, pending: []},
        {key : 4, name : 3, pending: []},
    ],
};

const getters = {
    getReversedFloors : state => {
        return state.floors.slice().reverse()
    }
}

const actions = {
    addPending(context, floorKey, val){

    }
};

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}