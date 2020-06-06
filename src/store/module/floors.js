const state = {
    floors: [
        {key : -1, name : -1},
        {key : 0, name : 0},
        {key : 1, name : 1},
        {key : 2, name : 2},
        {key : 3, name : 3},
    ],
};

const getters = {
    getReversedFloors : state => {
        return state.floors.slice().reverse()
    }
}

const actions = {

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