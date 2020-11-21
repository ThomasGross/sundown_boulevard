<template>
  <div class="container">
    <div class="drinks">
      <h1 class="title">What do you drink?</h1>
      <div class="content row">
        <div class="drinks-selector col-md-7">
          <div class="card" v-for="drink in drinks" :key="drink.id">
            <div class="img">
              <img :src="drink.image_url" alt="" />
            </div>
            <div class="description">
              <div class="description__title">{{ drink.name }}</div>
              <div class="description__tagline">{{ drink.tagline }}</div>
              <div class="description__body">{{ drink.description }}</div>
              <!-- <div class="description__body-label">Works well with:</div>
              <div class="description__food_pairing">
                {{ drink.food_pairing }}
              </div> -->
              <div class="description__tags">
                <div class="tags">
                  <div class="tags__item">abv: {{ drink.abv }}%</div>
                </div>
              </div>

              <hr />
              <div class="cta-section">
                <button class="button-remove" v-on:click="removeDrink(drink)">
                  -
                </button>
                <div class="amount">{{ getAmount(drink.id) }}</div>
                <button class="button-add" v-on:click="addDrink(drink)">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="summery col-md-4">
          <div class="card">
            <div class="summery__title">Order</div>
            <hr />
            <div class="summery__list">
              <div class="summery__list__title">Food:</div>
              <div class="summery__list__item">
                1x {{ currentOrder.meal.strMeal }}
              </div>
            </div>
            <div class="summery__list">
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
          <div class="button-wrapper">
            <Button :text="'next'" @buttonclick="validateForm()" />
          </div>
        </div>
      </div>
      <!-- <pre>{{ JSON.stringify(drinks, null, "\t") }}</pre> -->
    </div>
  </div>
</template>

<script>
import Button from "@/components/atoms/ButtonComp";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    Button,
  },
  computed: {
    ...mapGetters({
      currentOrder: "getCurrentOrder",
    }),
  },
  data: () => {
    return {
      loading: false,
      drinks: [],
      error: false,
    };
  },
  async fetch() {
    const drinksToReturn = [];

    const drinks = await fetch("https://api.punkapi.com/v2/beers").then((res) =>
      res.json()
    );

    drinks.forEach((drink) => {
      drinksToReturn.push({ ...drink, amount: 0 });
    });

    this.drinks = drinksToReturn;
  },
  methods: {
    validateForm() {
      if (this.currentOrder.drinks.length === 0) {
        console.log(this.currentOrder.drinks);

        this.error = true;
        return;
      }

      this.$router.push({
        path: "/order/booking",
      });
    },
    getAmount(id) {
      const drink = this.currentOrder.drinks.find((x) => x.id === id);

      if (drink !== undefined) {
        console.log(drink.amount);

        return drink.amount;
      } else {
        return 0;
      }
    },
    addDrink(drink) {
      this.$store.commit("addDrink", { ...drink });
    },
    removeDrink(drink) {
      this.$store.commit("removeDrink", { ...drink });
    },
  },
};
</script>

<style lang="scss" scoped>
.drinks {
  padding-top: 70px;

  .title {
    text-align: center;
  }

  .content {
    position: relative;
    display: flex;
    margin-top: 50px;
    height: 100%;

    .drinks-selector {
      .card {
        display: flex;
        margin-bottom: 30px;
      }

      .description {
        margin-left: 30px;
        width: 50%;

        &__tags {
          margin-top: 15px;
        }

        &__title {
          font-weight: 200;
          color: $color-black;
          font-size: 54px;
          word-break: break-word;
          hyphens: auto;
        }

        &__tagline {
          margin-top: 10px;
          font-size: 20px;
          font-weight: 400;
        }

        &__body-label {
          margin-top: 15px;
          font-weight: 300;
        }

        &__body {
          margin-top: 20px;
          font-weight: 400;
        }

        &__abv {
          margin-top: 10px;
        }

        &__food_pairing {
          margin-top: 10px;
        }

        .cta-section {
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: center;

          .button-remove {
            margin: 0 10px;
            font-size: 23px;
          }

          .amount {
            font-size: 30px;
          }

          .button-add {
            margin: 0 10px;
            font-size: 23px;
          }
        }
      }

      .img {
        display: flex;
        overflow: hidden;
        width: 50%;
        margin: auto;

        img {
          object-fit: contain;
          height: 100%;
          width: 100%;
          max-height: 300px;
          object-position: center center;
        }
      }

      .button-wrapper {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        div {
          margin-right: 32px;
          font-size: 23px;
          color: $color-black;
          font-family: "HelveticaNeue-CondensedBlack";
        }
      }
    }

    .summery {
      position: sticky;
      height: 100%;
      top: 30px;

      .button-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        margin-left: auto;
      }

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
  }
}
</style>