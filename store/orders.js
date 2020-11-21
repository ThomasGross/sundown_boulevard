export const state = () => ({
  orders: [],
  currentOrder: {},
});

export const mutations = {
  setApplicationSelection(state, data) {
    state.store.currency = data.currency;
    state.store.application_selection = data;
  },
}

export const getters = {
  getCurrentOrder(state) {
    return state.currentOrder;
  },
}