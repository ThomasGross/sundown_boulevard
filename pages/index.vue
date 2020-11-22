<template>
  <div class="container">
    <div class="section">
      <HeroSection />
    </div>
    <div class="section">
      <FindOrderSection />
    </div>
  </div>
</template>

<script>
import HeroSection from "~/components/molecules/HeroSection";
import FindOrderSection from "~/components/molecules/FindOrderSection";

export default {
  components: {
    HeroSection,
    FindOrderSection,
  },
};
</script>

<style scoped lang="scss">
.section {
  margin-bottom: 100px;
}
</style>
