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
                  :class="isUserUpdatingOrder ? 'Order' : 'Update order'"
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

        <div class="col-md-4 sticky">
          <Summery :currentOrder="currentOrder" :step="step" />
          <div class="button-wrapper button-wrapper--align-right">
            <Button
              :text="isUserUpdatingOrder ? 'Update order' : 'Order'"
              @buttonclick="validateForm()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/atoms/ButtonComp";
import Summery from "@/components/organisms/Summery";

import { mapGetters, mapState } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import cloneDeep from "lodash/cloneDeep";

export default {
  components: {
    Button,
    VueTimepicker,
    Summery,
  },
  computed: {
    ...mapGetters({
      isUserUpdatingOrder: "isUserUpdating",
      currentOrder: "getCurrentOrder",
      step: "getCurrentStep",
    }),
  },
  data: () => {
    return {
      booking_info: {},
      disabledDates: {
        to: new Date(),
        days: [6, 0],
      },
    };
  },
  created() {
    this.booking_info = cloneDeep(this.currentOrder.booking_info);
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
        this.$store.commit("stateToLocalStorage", this.booking_info);

        this.$store.commit("incrementStep");
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
      if (this.booking_info.people !== 10) {
        this.booking_info.people = this.booking_info.people + 1;
      }
    },
    removePerson() {
      if (this.booking_info.people !== 1) {
        this.booking_info.people = this.booking_info.people - 1;
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