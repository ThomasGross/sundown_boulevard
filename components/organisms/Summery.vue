<template>
  <div class="summery">
    <div class="card">
      <div class="summery__title">Order</div>
      <hr />
      <div class="summery__list">
        <div class="summery__list__title">Food:</div>
        <div class="summery__list__item">
          1x {{ currentOrder.meal.strMeal }}
        </div>
      </div>
      <div class="summery__list" v-if="step > 0">
        <div class="summery__list__title">Drinks:</div>
        <div
          v-if="currentOrder.drinks.length === 0"
          class="summery__list__item"
        >
          None
          <template v-if="error">
            <span>-</span>
            <span class="error-label"> Please pick a drink</span>
          </template>
        </div>
        <div
          v-else
          v-for="drink in currentOrder.drinks"
          :key="drink.id"
          class="summery__list__item"
        >
          {{ drink.amount }} x {{ drink.name }}
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Boolean, default: false },
    step: { type: Number, default: 0 },
    currentOrder: {},
  },
};
</script>

<style lang="scss" scoped>
.summery {
  position: sticky;
  height: 100%;
  top: 30px;

  &__title {
    font-size: 32px;
  }

  &__list {
    margin-top: 15px;

    &__title {
      font-weight: 400;
    }

    &__item {
      margin-top: 15px;
    }
  }
}
</style>