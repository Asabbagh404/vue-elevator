const state = {
    floors: [
        {key : -1, name : 'Sous-sol'},
        {key : 0, name : 'RDC'},
        {key : 1, name : 'Etage 1'},
        {key : 2, name : 'Etage 2'},
        {key : 3, name : 'Etage 3'},
    ],
};

const getters = {
    // Renvoie la liste des étage en inversé de maniere à avoir un affichage cohérent
    getReversedFloors : state => {
        return state.floors.slice().reverse()
    }
}

const actions = {
    addFloor(context) {
        context.commit('addFloor')
    },
    removeFloor(context) {
        context.commit('removeFloor')
    }
};

const mutations = {
    // clef = La clef du dernier element du tableau floor +1, name = 'Etage ' + (clef + 1)
    addFloor(state){
        state.floors.push({key: state.floors[state.floors.length - 1].key + 1, name:'Etage ' +  (parseInt(state.floors[state.floors.length - 1].key)+1).toString()})
    },
    removeFloor(state){
        state.floors.pop()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}