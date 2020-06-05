const state = {
    currentFloor: 1,
    waitingList: [],
    destination: 0,
    mode: "close",
    direction: "up",
};

const getters = {
}

const actions = {
    addDestination(context, dest) {
        context.commit('addDestination', dest)
    },
    elevatorMove(context) {
        context.commit("setMode", 'close');
        if (state.waitingList.length !== 0) {
            if (state.waitingList[0] > state.currentFloor) {
                context.commit('elevatorMove', +1)
            } else if (state.waitingList[0] < state.currentFloor) {
                context.commit('elevatorMove', -1)
            } else {
                context.commit("setMode", 'open');
                context.commit('removeToTheList')
            }
        }
    }
};

const mutations = {
    addDestination(state, dest) {
        state.waitingList.push(dest)
    },

    elevatorMove(state, direction) {
        state.currentFloor  += direction
    },
    removeToTheList(state) {
        state.waitingList.shift()
    },

    setMode(state, mode){
        state.mode = mode;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}