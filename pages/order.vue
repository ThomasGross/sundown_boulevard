<template>
  <div>
    <template v-if="step === 0">
      <Meals />
    </template>
    <template v-if="step === 1">
      <Drinks />
    </template>
    <template v-if="step === 2">
      <Booking />
    </template>
    <template v-if="step === 3">
      <Receipt />
    </template>
  </div>
</template>

<script>
import Meals from "~/components/organisms/Meals";
import Drinks from "~/components/organisms/Drinks";
import Booking from "~/components/organisms/Booking";
import Receipt from "~/components/organisms/Receipt";

import { mapGetters, mapState } from "vuex";

export default {
  components: {
    Meals,
    Drinks,
    Booking,
    Receipt,
  },
  computed: {
    ...mapGetters({
      step: "getCurrentStep",
    }),
  },
};
</script>

<style>
</style>