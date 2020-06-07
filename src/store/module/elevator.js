const state = {
    currentFloor: {
        key: 0, name: 0
    },
    doors: "close",
    direction: "",

    pickupList: [],
    dropoutList: [],
};

const getters = {};

const actions = {
    checkUpperFloor(context) {
        context.commit('toggleDirection')
    },

    addPickupPoint(context, data) {
        context.commit('addPickupPoint', data)
    },
    addDropoutPoint(context, dest) {
        context.commit('addDropoutPoint', dest)
    },
    checkAction(context) {
        let sameFloorToPickup = state.pickupList.find(floor => floor.from === state.currentFloor.key);
        let sameFloorToDropout = state.dropoutList.find(floor => floor === state.currentFloor.key);

        if (sameFloorToPickup) {
            context.commit("setDoors", 'open');
            context.commit('addDropoutPoint', sameFloorToPickup.to);
            context.commit('pickup', sameFloorToPickup)
        }

        if (sameFloorToDropout) {
            context.commit("setDoors", 'open');
            context.commit("dropout", sameFloorToDropout);
        }
    },

    checkEndDirection(context) {
        let stillDropoutUp = state.dropoutList.filter(path => path > state.currentFloor.key).length > 0;
        let stillPickupUp = state.pickupList.filter(path => path.from > state.currentFloor.key).length > 0;

        let stillDropoutDown = state.dropoutList.filter(path => path < state.currentFloor.key).length > 0;
        let stillPickupDown = state.pickupList.filter(path => path.from < state.currentFloor.key).length > 0;

        if (stillDropoutUp) {
            context.commit('setDirection', 'up')
        } else if (state.dropoutList.filter(path => path <= state.currentFloor.key).length > 0) {
            context.commit('setDirection', 'down')
        } else if (state.pickupList.filter(path => path.from >= state.currentFloor.key).length > 0) {
            context.commit('setDirection', 'up')
        } else if (state.pickupList.filter(path => path.from <= state.currentFloor.key).length > 0) {
            context.commit('setDirection', 'down')
        } else if (state.pickupList.length === 0 && state.dropoutList.length === 0) {
            if (state.currentFloor.key > 0) {
                context.commit('setDirection', 'down')
            } else if (state.currentFloor.key < 0) {
                context.commit('setDirection', 'up')
            } else {
                context.commit('setDirection', '')
            }
        }
    },
    elevatorMove(context) {
        if (state.direction === "") {
            if (state.pickupList.length > 0) {
                if (state.currentFloor.key > state.pickupList[0].from) {
                    context.commit('setDirection', 'down')
                } else if (state.currentFloor.key < state.pickupList[0].from) {
                    context.commit('setDirection', 'up')
                }
            }
        } else {
            context.commit("setDoors", 'close');
            context.dispatch('checkEndDirection');

           console.log(state.currentFloor.key)
            if(state.pickupList.find(floor => floor.from === state.currentFloor.key) || state.dropoutList.find(floor => floor === state.currentFloor.key)){
                context.dispatch('checkAction');
            }
            else if (state.direction === 'up') {
                context.commit('moveUp');
            } else if (state.direction === 'down') {
                context.commit('moveDown');
            }
        }
    }
};

const mutations = {
    addDropoutPoint(state, dest) {
        state.dropoutList.push(dest)
    },
    addPickupPoint(state, data) {
        state.pickupList.push(data)
    },

    dropout(state, floor) {
        state.dropoutList.splice(state.dropoutList.indexOf(floor), 1);
    },
    pickup(state, floor) {
        state.pickupList.splice(state.pickupList.indexOf(floor), 1);
    },

    setDirection(state, dir) {
        state.direction = dir;
    },

    moveUp() {
        state.currentFloor.key++
    },
    moveDown() {
        state.currentFloor.key--
    },

    setDoors(state, position) {
        state.doors = position;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}