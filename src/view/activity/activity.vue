<template>
  <div class="yin">
    <div class="box" v-for="(item, index) of data" :key="item._id">
      <h4 class="title">第{{index + 1}}: {{ item.title }}</h4>
      <p class="article">{{item.article}}</p>
      <div>是否展示<i-switch :value="item.show" @on-change="changeShow($event, item)" /></div>
      <img
        class="img"
        v-for="(srcObj, srcObjIndex) in item.photo"
        :src="srcObj.url" :key="srcObj.width + srcObjIndex"
        @click="goShow(srcObj.url, item.photo)"
      >
    </div>
    <image-show :url.sync="showUrl" />
  </div>
</template>
<script>
import { databaseQuery, updateDb } from '@/api/wx'
import ImageShow from '_c/image-show'

export default {
  name: 'Activity',
  components: { ImageShow },
  data () {
    return {
      data: [],
      showUrl: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      databaseQuery('db.collection("activity-data").get()').then(res => {
        if (res.data.errcode !== 0) return
        let data = []
        res.data.data.forEach(item => {
          data.push(JSON.parse(item))
        })
        this.data = data
      })
    },
    changeShow (e, item) {
      console.log(`_id为${item._id}的数据将show改为${e}`)
      updateDb(`db.collection("activity-data").doc("${(item._id)}").update({data:{show:${e}}})`).then(res => {
        if (res.data.errcode === 0) this.$Message.success(`已将状态改为${e}`)
        else this.$Message.error('err')
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$Message.error('err')
      })
    },
    goShow (url, list) {
      this.showUrl = url
    }
  }
}
</script>
<style lang="less" scoped>
.img{
  width: 360px;
  height: 270px;
  object-fit: cover;
  margin: 2px 3px;
}
.box{
  background-color: #f9f9f9;
      box-shadow: 2px 3px 5px rgba(0, 0, 0, .3);
  border: 1px solid palegoldenrod;
  margin: 5px 0;
  padding: 5px;
  font-size: 15px;
  .title{
    font-size: 17px;
  }
}
</style>
