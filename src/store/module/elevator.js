const state = {
    currentStage: 1,
    waitingList: [],
    destination: 0,
    mode: "up"
};

const getters = {}

const actions = {
    addDestination(context, dest) {
        context.commit('addDestination', dest)
    }
};

const mutations = {
    addDestination(state, dest) {
        state.waitingList.push(dest)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}