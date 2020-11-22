<template>
  <div class="container">
    <div class="section">
      <HeroSection />
    </div>
    <div class="section">
      <SliderSection />
    </div>
    <div class="section">
      <FindOrderSection />
    </div>
  </div>
</template>

<script>
import HeroSection from "~/components/molecules/HeroSection";
import FindOrderSection from "~/components/molecules/FindOrderSection";
import SliderSection from "~/components/molecules/SliderSection";

export default {
  components: {
    HeroSection,
    FindOrderSection,
    SliderSection,
  },
};
</script>

<style scoped lang="scss">
.section {
  margin-bottom: 100px;
}
</style>
