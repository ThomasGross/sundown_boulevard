<template>
  <div class="wrapper">
    <swiper class="carrousel" ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        class="carrousel__slide"
        v-for="(img, index) in imgs"
        :key="index"
      >
        <div class="img-container">
          <img :src="img" alt="" />
        </div>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
    <div class="navigation">
      <div @click="navPrev" class="control">
        <NextIcon class="reverse" />
      </div>
      <div @click="navNext" class="control">
        <NextIcon />
      </div>
    </div>
  </div>
</template>

<script>
import NextIcon from "@/components/atoms/svg/next-icon";

export default {
  name: "carrousel",
  data() {
    return {
      imgs: [
        "https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_42/v1561680872/shape/mentalfloss/81478-gettyimages-1068362304.jpg?itok=4LTxYwX-",
        "https://miro.medium.com/max/1080/1*fCWCAdS1TbDy6wuG_uWvww.jpeg",
        "https://www.thespruceeats.com/thmb/8SzwOOJ6dGT1pcuoAw9e_e_tWtQ=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-480379752-588cb5de3df78caebc869bcf.jpg",
      ],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
    };
  },
  components: {
    NextIcon,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    navPrev() {
      this.swiper.slidePrev();
    },
    navNext() {
      this.swiper.slideNext();
    },
  },
};
</script> 

<style scoped lang="scss">
.navigation {
  display: flex;
  justify-content: flex-end;

  .reverse {
    transform: rotate(180deg);
  }

  .control {
    margin: 15px;
    cursor: pointer;
  }

  svg {
    width: 25px;
    height: 25px;
    fill: $color-black;
  }
}

.wrapper {
  padding: 0 15px;
}

.carrousel {
  width: 100%;
  height: 500px;

  &__slide {
    width: 100%;

    .img-container {
      width: 100%;
      max-height: 500px;
      height: 100%;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;

        object-position: center center;
      }
    }
  }
}
</style>