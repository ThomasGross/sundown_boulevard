<template>
  <div class="container">
    <div class="meals">
      <h1 class="title">What will you eat?</h1>
      <div class="content row">
        <div class="meal-selector col-md-7">
          <div class="card">
            <div class="img">
              <img :src="currentOrder.meal.strMealThumb" alt="" />
            </div>
            <div class="description">
              <div class="description__title">
                {{ currentOrder.meal.strMeal }}
              </div>
              <div class="description__tags">
                <div class="tags">
                  <div
                    v-for="(tag, index) in currentOrder.meal.tags"
                    :key="tag + index"
                    class="tags__item"
                  >
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
        <div class="col-md-4 sticky">
          <Summery
            :currentOrder="currentOrder"
            :isUserUpdating="isUserUpdating"
          />
          <div class="button-wrapper button-wrapper--align-right">
            <Button
              :text="'next'"
              @buttonclick="$store.commit('incrementStep')"
            />
          </div>
        </div>
      </div>
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
      isUserUpdating: "isUserUpdating",
    }),
  },
  data: () => {
    return {
      loading: false,
      meal: "",
    };
  },
  mounted() {
    if (this.isUserUpdating) {
      this.loadMealFormstate();
    } else {
      this.fetchMeal();
    }
  },
  methods: {
    loadMealFormstate() {
      this.meal = this.currentOrder.meal;
    },
    refreshMeal() {
      this.tags = [];
      this.fetchMeal();
    },
    async fetchMeal() {
      const res = await this.$axios.$get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      const meal = res?.meals?.[0];

      let tags = this.generateTags(meal.strArea);
      tags = tags.concat(this.generateTags(meal.strCategory));
      tags = tags.concat(this.generateTags(meal.strTags));

      this.$store.commit("setMeal", { ...meal, tags });
    },
    generateTags(tagsString) {
      if (tagsString) {
        return tagsString.split(",");
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
  }
}
</style>