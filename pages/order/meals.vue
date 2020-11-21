<template>
  <div class="container">
    <div class="meals">
      <h1 class="title">What will you eat?</h1>
      <div class="content row">
        <div class="meal-selector col-md-7">
          <div class="card">
            <div class="img">
              <img :src="meal.strMealThumb" alt="" />
            </div>
            <div class="description">
              <div class="description__title">
                {{ meal.strMeal }}
              </div>
              <div class="description__tags">
                <div class="tags">
                  <div v-for="tag in tags" :key="tag" class="tags__item">
                    {{ tag }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="button-wrapper">
            <div>NOT YOUR TASE?</div>
            <Button :text="'Try another'" @buttonclick="refreshMeal" />
          </div>
        </div>

        <div class="summery col-md-4">
          <div class="card">
            <div class="summery__title">Order</div>
            <hr />
            <div class="summery__list">
              <div class="summery__list__title">Food:</div>
              <div class="summery__list__item">
                1 x {{ currentOrder.meal.strMeal }}
              </div>
            </div>

            <hr />
          </div>
          <div class="button-wrapper">
            <Button :text="'next'" :link="'drinks'" />
          </div>
        </div>
      </div>
      <!-- <pre>{{ JSON.stringify(meal, null, "\t") }}</pre> -->
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
      meal: "",
      tags: [],
    };
  },
  mounted() {
    this.fetchMeal();
  },
  methods: {
    refreshMeal() {
      this.tags = [];
      this.fetchMeal();
    },
    async fetchMeal() {
      const meals = await this.$axios.$get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      const mealsObj = JSON.parse(JSON.stringify(meals));
      this.meal = mealsObj.meals[0];

      this.generateTags(mealsObj.meals[0].strArea);
      this.generateTags(mealsObj.meals[0].strCategory);
      this.generateTags(mealsObj.meals[0].strTags);

      this.$store.commit("setMeal", this.meal);
    },
    generateTags(tagsString) {
      if (tagsString) {
        var newTags = tagsString.split(",");

        newTags.forEach((tag) => {
          this.tags.push(tag);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.meals {
  padding-top: 70px;

  .title {
    text-align: center;
  }

  .content {
    display: flex;
    margin-top: 50px;

    .meal-selector {
      .card {
        display: flex;
      }

      .description {
        margin-left: 30px;
        width: 50%;

        &__title {
          font-weight: 200;
          color: $color-black;
          font-size: 54px;
          word-break: break-word;
          hyphens: auto;
        }

        &__tags {
          margin-top: 10px;
        }
      }

      .img {
        overflow: hidden;
        width: 50%;

        img {
          object-fit: cover;
          height: 100%;
          width: 100%;
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