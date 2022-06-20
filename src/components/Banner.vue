<template>
  <div class="d-flex" dir="rtl" style='width: 100%'>
    <div ref="banner" class="text-no-wrap overflow-hidden banner"
         :style="{'font-size': `${size}px`,'lineHeight':`${size}px` } ">
      {{ text }}
    </div>
  </div>

</template>

<script>
export default {
  name: "Banner",
  props: {
    text: String,
    shift: {
      default: 0
    },
    share: {
      default: 100
    },
    time: {
      default: 10
    },
    transform: {
      default: 1000
    }

  },
  data: () => {
    return {
      size: window.innerHeight,
      updateTimeout: null
    }
  },
  created() {
    window.addEventListener("resize", this.windowsResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowsResize);
  },
  watch: {
    shift: {
      handler: function () {
        this.$refs.banner.style.right = `${this.shift}px`
      },
    }
  },
  mounted() {
    this.$refs.banner.style.right = `${this.shift}px`
    this.$mousetrap.bind("r", () => {
      this.reset()
    }, 'keyup')

    this.$mousetrap.bind("e", () => {
      this.start()
    }, 'keyup')

  },

  methods: {
    start() {
      console.log(this.$refs.banner.clientWidth)
      this.$refs.banner.style.transitionDuration = `${this.share / 100 * this.time}s`
      this.$refs.banner.style.transitionProperty = `transform`
      this.$refs.banner.style.transform = `translateX(${this.transform}px)`
    },
    reset() {
      this.$refs.banner.style.transitionDuration = `0s`
      this.$refs.banner.style.transitionProperty = `transform`
      this.$refs.banner.style.transform = `translateX(${0}px)`
    },
    windowsResize() {
      clearTimeout(this.updateTimeout)
      this.updateTimeout = setTimeout(() => {
        this.socket.sendToServer({screen: window.innerWidth})
      }, 1000)

      this.size = window.innerHeight
    },
  }
}
</script>

<style scoped>
.banner {
  position: absolute;
  transition-timing-function: linear;
}
</style>
