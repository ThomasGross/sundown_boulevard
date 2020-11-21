<template>
  <div v-if="!link" :class="['button']" v-on:click="$emit('buttonclick')">
    <div class="button__text" v-if="text">{{ text }}</div>
  </div>
  <div v-else :class="['button']" v-on:click="navigate">
    <div class="button__text" v-if="text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    text: { type: String, default: "" },
    link: { type: String, default: null },
  },
  methods: {
    navigate() {
      this.$router.push({
        path: this.link,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-flex;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  min-width: 200px;
  cursor: pointer;
  border-radius: 3px;
  background-color: $color-primary;

  &__text {
    pointer-events: none;
    font-size: 23px;
    color: $color-white;
    font-family: "HelveticaNeue-CondensedBlack";
  }
}
</style>