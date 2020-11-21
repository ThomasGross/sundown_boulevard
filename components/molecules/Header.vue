<template>
  <div class="container">
    <div class="header">
      <div class="header__inner">
        <div class="header__inner__item">
          <div class="header__inner__item__text">Resturants</div>
        </div>
        <div class="header__inner__item">
          <div class="header__inner__item__text">Products</div>
        </div>

        <div class="header__inner__item">
          <logo />
        </div>

        <div class="header__inner__item">
          <div class="header__inner__item__text">News</div>
        </div>
        <div class="header__inner__item">
          <div class="header__inner__item__text">Contact</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/components/atoms/svg/logo";

export default {
  components: {
    logo,
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    transform: translateX(-28px);

    &__item {
      display: flex;
      justify-content: center;
      margin: 0 30px;
      font-family: "HelveticaNeue-CondensedBold";
      font-weight: bold;
      text-transform: uppercase;
      color: $color-black;
      cursor: pointer;

      &__text {
        letter-spacing: 1px;
      }

      svg {
        display: flex;
        height: 50px;
        width: 50px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
