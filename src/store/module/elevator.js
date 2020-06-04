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
    },
    elevatorMove(context) {
        context.commit('elevatorMove')
    }
};

const mutations = {
    addDestination(state, dest) {
        state.waitingList.push(dest)
    },

    elevatorMove(state) {
        if (state.waitingList.length !== 0) {
            if (state.waitingList[0] > state.currentStage) {
                state.currentStage++
            } else if (state.waitingList[0] < state.currentStage) {
                state.currentStage--
            } else {
                state.waitingList.shift()
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}