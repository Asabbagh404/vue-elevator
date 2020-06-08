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
    // addPickupPoint : Ajout d'un point de retrait
    addPickupPoint(context, data) {
        context.commit('addPickupPoint', data)
    },
    // addDropoutPoint : Ajout d'un point de dépot
    addDropoutPoint(context, dest) {
        context.commit('addDropoutPoint', dest)
    },

    // checkAction : Verifie si une action ( depot ou retrait ) est à faire dans l'étage courant
    checkAction(context) {
        let sameFloorToPickup = state.pickupList.find(floor => floor.from === state.currentFloor.key);
        let sameFloorToDropout = state.dropoutList.find(floor => floor === state.currentFloor.key);

        if (sameFloorToPickup !== undefined) {
            context.commit("setDoors", 'open');
            context.commit('addDropoutPoint', sameFloorToPickup.to);
            context.commit('removePickupPoint', sameFloorToPickup)
        }

        if (sameFloorToDropout !== undefined) {
            context.commit("setDoors", 'open');
            context.commit("removeDropoutPoint", sameFloorToDropout);
        }
    },

    // checkEndDirection : verifie si il reste des personnes à récupérer en haut / en bas et adapte sa direction en fonction
    checkEndDirection(context) {
        let stillDropoutUp = state.dropoutList.filter(path => path > state.currentFloor.key).length > 0;
        let stillPickupUp = state.pickupList.filter(path => path.from > state.currentFloor.key).length > 0;

        let stillDropoutDown = state.dropoutList.filter(path => path < state.currentFloor.key).length > 0;
        let stillPickupDown = state.pickupList.filter(path => path.from < state.currentFloor.key).length > 0;

        if (state.direction === 'up') {
            if (!stillDropoutUp && !stillPickupUp) {
                context.commit('setDirection', 'down')
            }
        }

        if (state.direction === 'down') {
            if (!stillPickupDown && !stillDropoutDown) {
                context.commit('setDirection', 'up')
            }
        }

        if (state.pickupList.length === 0 && state.dropoutList.length === 0) {
            context.dispatch('resetElevator');
        }
    },
    
    // Fct. d'envoie vers rez de chaussée, se lance lorsque plus aucune tâche n'est à faire
    resetElevator(context) {
        if (state.currentFloor.key > 0) {
            context.commit('setDirection', 'down')
        } else if (state.currentFloor.key < 0) {
            context.commit('setDirection', 'up')
        } else {
            context.commit('setDirection', '')
        }
    },

    // elevatorMove : Se lance tout les X secondes et détermine l'ordre de lancement des fonctions et le mouvement
    // en haut ou en bas

    elevatorMove(context) {
        if (state.direction === "") {
            if (state.pickupList.length > 0) {
                if (state.currentFloor.key > state.pickupList[0].from) {
                    context.commit('setDirection', 'down')
                } else if (state.currentFloor.key < state.pickupList[0].from) {
                    context.commit('setDirection', 'up')
                }
            }
        }
        context.commit("setDoors", 'close');
        context.dispatch('checkEndDirection');

        if (state.pickupList.filter(floor => floor.from === state.currentFloor.key).length > 0 || state.dropoutList.filter(floor => floor === state.currentFloor.key).length > 0) {
            context.dispatch('checkAction');
        } else if (state.direction === 'up') {
            context.commit('moveUp');
        } else if (state.direction === 'down') {
            context.commit('moveDown');
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

    removeDropoutPoint(state, floor) {
        state.dropoutList.splice(state.dropoutList.indexOf(floor), 1);
    },
    removePickupPoint(state, floor) {
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