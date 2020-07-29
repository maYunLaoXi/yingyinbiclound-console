<template>
  <div class="img-box" v-show="src" @click="close">
    <Icon type="md-close" size="30" color="#ffff" @click="close" />
    <img :src="src" alt="">
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    src () {
      const { url } = this.$props
      return url
    }
  },
  methods: {
    close () {
      this.$emit('update:url', '')
    }
  }
}
</script>
<style lang="less" scoped>
.img-box{
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;

  img{
    width: 80%;
    max-height: 90vh;
    margin: auto;
    object-fit: scale-down;
  }
}
</style>
