<template>
  <div class="container">
    <div class="receipt">
      <h1 class="title">Here’s your receipt</h1>
      <div class="summery col-md-8 offset-2">
        <div class="card">
          <div class="summery__title">Receipt</div>
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
          <div class="summery__list">
            <div class="summery__list__title">Booking info:</div>
            <div class="summery__list__item">
              {{ currentOrder.booking_info.people | formatPeople }}
            </div>
            <div class="summery__list__item">
              {{
                $moment(currentOrder.booking_info.selected_date).format(
                  "MMMM Do YYYY"
                )
              }}
              -
              {{ currentOrder.booking_info.selected_time }}
            </div>
            <div class="summery__list__item">
              {{ currentOrder.booking_info.email }}
            </div>
          </div>
        </div>
        <div class="button-wrapper">
          <Button :text="'back to home'" :link="'/'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/atoms/ButtonComp";
import { mapGetters, mapState } from "vuex";

export default {
  filters: {
    formatPeople: function (number) {
      if (number > 1) {
        return number + " persons";
      } else {
        return number + " person";
      }
    },
    formatDate: function (date) {
      if (!date) {
        return date;
      }

      // let sting = Date.parse(date);

      // console.log(string);

      // const options = { year: "numeric", month: "long", day: "numeric" };
      // return sting.toLocaleDateString(undefined, options);
    },
  },
  components: {
    Button,
  },
  computed: {
    ...mapGetters({
      currentOrder: "getCurrentOrder",
    }),
  },
};
</script>

<style lang="scss" scoped>
.receipt {
  margin-top: 70px;

  .title {
    text-align: center;
  }

  .summery {
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
</style>