<template>
  <div class="container">
    <div class="card">
      <div class="content-box">
        <img
          src="https://mk0madklubben208sy3o.kinstacdn.com/wp-content/uploads/2020/07/restaurant_hero_FCKbh.jpg"
          alt=""
        />
      </div>
      <div class="find-order">
        <h2>Find order</h2>
        <ValidationObserver class="form-row row" tag="div" ref="observer">
          <ValidationProvider
            class="input-group col-8"
            :rules="{ required: true, email: true }"
            name="Email"
            v-slot="{ errors }"
          >
            <label for="">Enter email</label>
            <input placeholder="example@mail.com" v-model="email" type="text" />
            <span class="error-label">{{ errors[0] }}</span>
          </ValidationProvider>
        </ValidationObserver>
        <div class="button-section">
          <Button :text="'Find'" @buttonclick="validateFields" />
        </div>

        {{ currentOrder }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Button from "@/components/atoms/ButtonComp";

export default {
  computed: {
    ...mapGetters({
      currentOrder: "getCurrentOrder",
    }),
  },
  components: {
    Button,
  },
  data: () => {
    return {
      email: "",
    };
  },
  methods: {
    validateFields() {
      this.$refs.observer.validate().then((success) => {
        if (!success) {
          return;
        }

        this.$store.commit("localStorageToState", this.email);

        this.$router.push({
          path: "/order",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;

  .find-order {
    width: calc(50% - 15px);

    .button-section {
      margin-top: 30px;
      display: flex;
      align-items: flex-end;
    }
  }

  .content-box {
    width: calc(50% - 15px);
    margin-right: 30px;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      object-position: center center;
    }
  }
}
</style>