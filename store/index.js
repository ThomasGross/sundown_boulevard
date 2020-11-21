export const state = () => ({
  orders: [],
  currentOrder: {
    meal: {},
    drinks: [],
    booking_info: {}
  },
});

export const mutations = {
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
    state.currentOrder.booking_info = data.booking_info;
  },
}

export const getters = {
  getCurrentOrder(state) {
    return state.currentOrder;
  },
}