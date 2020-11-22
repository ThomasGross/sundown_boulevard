const getDefaultState = () => {
  return {
    userUpdatingOrder: false,
    step: 0,
    currentOrder: {
      meal: {},
      drinks: [],
      booking_info: {
        selected_date: '',
        selected_time: '',
        people: 1,
        email: ''
      }
    },
  }
}

export const state = getDefaultState();

export const actions = {
  resetState({ commit }) {
    commit('resetState');
  },
}

export const mutations = {
  stateToLocalStorage(state, data) {
    localStorage.setItem(state.currentOrder.booking_info.email, JSON.stringify(state.currentOrder));
    state.userUpdatingOrder = false;
  },

  localStorageToState(state, email) {
    let order = JSON.parse(localStorage.getItem(email));
    state.currentOrder = order;
    state.userUpdatingOrder = true;
  },

  setMeal(state, data) {
    state.currentOrder.meal = data;
  },
  addDrink(state, data) {
    if (state.currentOrder.drinks.length === 0) {
      state.currentOrder.drinks.push({ ...data, amount: 1 });
    } else {
      let found = false;

      state.currentOrder.drinks.forEach(drink => {
        if (drink.id === data.id) {
          drink.amount = drink.amount + 1;
          found = true;
        }
      });

      if (!found) {
        state.currentOrder.drinks.push({ ...data, amount: 1 });
      }
    }
  },
  removeDrink(state, data) {
    if (state.currentOrder.drinks.length !== 0) {
      state.currentOrder.drinks.forEach(drink => {
        if (drink.id === data.id) {
          drink.amount = drink.amount - 1;

          if (drink.amount < 1) {
            state.currentOrder.drinks = state.currentOrder.drinks.filter((drink) => {
              return drink.id !== data.id;
            });
          }
        }
      });
    }
  },
  setBookingInfo(state, data) {
    state.currentOrder.booking_info = data;
  },
  resetState(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState())
  }
}

export const getters = {
  getCurrentOrder(state) {
    return state.currentOrder;
  },
  getStep(state) {
    return state.step;
  },
  isUserUpdating(state) {
    return state.userUpdatingOrder;
  }
}