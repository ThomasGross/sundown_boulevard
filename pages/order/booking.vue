<template>
  <div class="container">
    <div class="booking">
      <h1 class="title">When will you be here?</h1>
      <div class="content row">
        <div class="booking-selector col-md-7">
          <ValidationObserver class="card" tag="div" ref="observer">
            <div class="form-row row">
              <ValidationProvider
                class="input-group col-6"
                name="Date"
                v-slot="{ errors }"
                :rules="{ required: true }"
              >
                <label for="">Choose a date</label>
                <client-only
                  ><date-picker
                    placeholder="DD/MM/YYYY"
                    format="dd/MM/yyyy"
                    v-model="booking_info.selected_date"
                    :minimumView="'day'"
                    :maximumView="'day'"
                    :disabled-dates="disabledDates"
                /></client-only>
                <span class="error-label">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Time"
                :rules="{ required: true, regex: '[0-9][0-9]:[0-9][0-9]' }"
                class="input-group col-6"
              >
                <label for="">Choose the time</label>
                <client-only>
                  <div>
                    <!-- <vue-timepicker format="HH:mm"></vue-timepicker> -->
                    <vue-timepicker
                      format="HH:mm"
                      :minute-interval="15"
                      :hour-range="[16, 17, 18, 19, 20, 21, 22, 23]"
                      hide-disabled-hours
                      :minute-range="[0, 15, 30, 45]"
                      v-model="booking_info.selected_time"
                    >
                    </vue-timepicker>
                  </div>
                </client-only>
                <span class="error-label">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-row row">
              <ValidationProvider
                class="input-group col-6"
                :rules="{ required: true, email: true }"
                name="Email"
                v-slot="{ errors }"
              >
                <label for="">Email</label>
                <input
                  placeholder="example@mail.com"
                  v-model="booking_info.email"
                  type="text"
                />
                <span class="error-label">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-row row">
              <div class="col-6">
                <label for="">Amount of people</label>
                <div class="cta-section">
                  <button class="button-remove" v-on:click="removePerson()">
                    -
                  </button>
                  <div class="amount">{{ booking_info.people }}</div>
                  <button class="button-add" v-on:click="addPerson()">+</button>
                </div>
              </div>
            </div>
          </ValidationObserver>
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
            <Button :text="'Order'" @buttonclick="validateForm()" />
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

import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    Button,
    VueTimepicker,
  },
  computed: {
    ...mapGetters({
      currentOrder: "getCurrentOrder",
    }),
  },
  data: () => {
    return {
      booking_info: {
        selected_date: "",
        selected_time: "",
        people: 1,
        email: "",
      },
      disabledDates: {
        to: new Date(),
        days: [6, 0],
      },
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
      this.$refs.observer.validate().then((success) => {
        if (!success) {
          return;
        }

        this.$store.commit("setBookingInfo", this.booking_info);

        this.$router.push({
          path: "/order/receipt",
        });
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
    addPerson() {
      if (this.people !== 10) {
        this.people = this.people + 1;
      }
    },
    removePerson() {
      if (this.people !== 1) {
        this.people = this.people - 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.booking {
  padding-top: 70px;

  .title {
    text-align: center;
  }

  .content {
    position: relative;
    display: flex;
    margin-top: 50px;
    height: 100%;

    .card {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
    }

    .cta-section {
      margin-top: 15px;
      display: flex;

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

  ::v-deep .vdp-datepicker__calendar {
    .cell.selected {
      background: $color-primary;
      color: #ffff;
    }
  }

  ::v-deep .vue__time-picker {
    display: block;
    position: relative;
    font-size: 1rem;
    width: 100%;
    font-family: sans-serif;

    .display-time {
      border: 1px solid #d2d2d2;
      width: 100%;
      height: 40px;
      font-size: 1rem;
      padding: 10px;
    }

    .controls {
      display: none;
      height: 40px;
    }

    .dropdown ul li:not([disabled]).active,
    .dropdown ul li:not([disabled]).active:focus,
    .dropdown ul li:not([disabled]).active:hover {
      background: $color-primary;
    }
  }
}
</style>