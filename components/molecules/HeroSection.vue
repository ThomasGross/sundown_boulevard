<template>
  <div class="container">
    <div class="row hero">
      <div class="title-wrapper col-lg-7 col-md-7">
        <h1 class="title"><span class="color">Sun</span>down Boulevard</h1>
        <div class="sub-title">
          You pick the food and driks <br />
          We provide the place!
        </div>
        <div class="button-wrapper">
          <Button :text="'order'" :link="'order/meals'" />
        </div>
      </div>
      <div class="logo-wrapper col-lg-5 col-md-5">
        <Logo />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/atoms/svg/logo";
import Button from "@/components/atoms/ButtonComp";

export default {
  components: {
    Logo,
    Button,
  },
};
</script>

<style scoped lang="scss">
.hero {
  padding-top: 70px;

  .title-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      .color {
        color: #d84314;
      }
    }

    .sub-title {
      margin-top: 15px;
      font-size: 30px;
      font-weight: 300;
    }
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: auto;
    }
  }

  .button-wrapper {
    margin-top: 30px;
  }
}
</style>