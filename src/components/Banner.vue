<template>
  <div class="d-flex flex-column" dir="rtl" style='width: 100%'>
    <div ref="text" class="text-no-wrap overflow-hidden banner"
         :style="{'font-size': `${size}px`,'lineHeight':`${size}px`}" style="font-family: Vazirmatn;">
      {{ text }}
    </div>
    <div class="red" style="z-index: 100">
    </div>
  </div>

</template>

<script>
export default {
  name: "Banner",
  props: {

  },
  data: () => {
    return {
      isMounted: false,
      time : 1,
      text : "test",
      shift: 0,
      transform : 0,
      size: window.innerHeight,
      windowsWidth: 0,
      updateTimeout: null
    }
  },
  created() {
    window.addEventListener("resize", this.windowsResize);

  },
  destroyed() {
    window.removeEventListener("resize", this.windowsResize);
    this.stop()
  },
  computed: {
    data : function () {
      return this.socket.data
    }
  },
  watch: {
    shift: {
      handler: function () {
        this.$refs.text.style.right = `${this.shift}px`
      },
    },
    data: {
      deep: true,
      handler: function () {
        this.text = this.data.text
        this.time = this.data.time
        this.transform = this.data.transform
        this.shift = this.data.shift
        this.reset()
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isMounted = true;
    })


    this.$refs.text.style.right = `${this.shift}px`
    this.$mousetrap.bind("r", () => {
      this.reset()
    }, 'keyup')

    this.$mousetrap.bind("e", () => {
      this.start()
    }, 'keyup')

    this.$mousetrap.bind("s", () => {
      this.stop()
    }, 'keyup')

  },

  methods: {
    test() {
      if (this.$refs.text !== undefined) {
        let p = this.$refs.text.getBoundingClientRect()
        console.log(this.windowsWidth - (p.x + p.width))

        return (this.windowsWidth - (p.x + p.width))
      } else {
        return this.windowsWidth
      }
    },
    start() {
      clearTimeout(this.timeout)
      this.$refs.text.style.transitionDuration = `${this.time}s`
      this.$refs.text.style.transitionProperty = `transform`
      let t = this.$refs.text.getBoundingClientRect().width
      this.$refs.text.style.transform = `translateX(${this.transform + t}px)`

      this.timeout = setTimeout(()=>{
        this.reset()
      },this.time*1000)

    },
    reset() {
      clearTimeout(this.timeout)

      this.$refs.text.style.transitionDuration = `0s`
      this.$refs.text.style.transitionProperty = `transform`
      this.$refs.text.style.transform = `translateX(${0}px)`

      this.timeout = setTimeout(()=>{
        this.start()
      },100 )
    },
    stop(){
      this.$refs.text.style.transitionDuration = `0s`
      this.$refs.text.style.transitionProperty = `transform`
      this.$refs.text.style.transform = `translateX(${0}px)`
      clearTimeout(this.timeout)
    },
    windowsResize() {
      clearTimeout(this.updateTimeout)
      this.updateTimeout = setTimeout(() => {
        this.socket.sendToServer("changeWidth", {width: window.innerWidth})
      }, 1000)

      this.size = window.innerHeight
      this.windowsWidth = window.innerWidth
    },
  }
}
</script>

<style scoped>
.banner {
  position: absolute;
  transition-timing-function: linear;
}

@font-face {
  font-family: Vazirmatn;
  src: url('../assets/fonts/webfonts/Vazirmatn[wght].woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

</style>
