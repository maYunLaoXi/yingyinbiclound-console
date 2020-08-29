<template>
  <div>
    <div class="box" v-for="item of data" :key="item._id">
      <div class="avatar">
        <span class="ivu-avatar"><img :src="item.userInfo.avatarUrl" alt=""></span>
        <span class="user-name">{{item.userInfo.nickName}}</span>
        <Tag class="class" :color="item.check ? 'green' : 'red'">{{item.class}}</Tag>
      </div>
      <h4 class="title">{{ item.title }}</h4>
      <p class="article">{{item.article}}</p>
      <div >
        check: <i-switch :value="item.check" @on-change="changeSwitch('check', item, $event)" />&nbsp;&nbsp;&nbsp;
        pass: <i-switch :value="item.pass" @on-change="changeSwitch('pass', item, $event)" />&nbsp;&nbsp;&nbsp;
        参加活动：<i-switch :value="item.activity.isJoinDevelop" disabled />
      </div>
      <img
        class="img"
        v-for="srcObj in item.photo"
        :src="srcObj.url" :key="srcObj.url"
        @click="goShow(srcObj.url, item.photo)"
      >
      <div class="readableTime">
        <span>{{item.readableTime}}</span>
      </div>
    </div>
    <Page :total="total" show-elevator @on-change="changePage" />
    <image-show :url.sync="showUrl" />
  </div>
</template>
<script>
import { updateDb, invokeCloudFunction } from '@/api/wx'
import ImageShow from '_c/image-show'
import { readableTime } from 'f-com/utils'

export default {
  name: 'photographyClass',
  components: { ImageShow },
  data () {
    return {
      total: 0,
      page: 1,
      totalPage: 1,
      data: [],
      showUrl: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    init () {},
    async getData (page = 1) {
      if (page > this.totalPage) return
      const res = await invokeCloudFunction({ name: 'get-image-index',
        data: {
          page,
          pageSize: 10,
          where: {}
        }
      })
      const { page: resPage, totalPage, totalSize, data } = JSON.parse(res.data.resp_data)
      data.forEach(item => {
        const { createTime } = item
        item.readableTime = readableTime(createTime)
      })
      this.total = totalSize
      this.page = resPage
      this.totalPage = totalPage
      this.data = []
      setTimeout(() => { this.data = data }, 20)
    },
    async changeSwitch (name, item, value) {
      const res = await updateDb(`db.collection("photography-class").doc("${(item._id)}").update({data:{${name}:${value}}})`)
      if (res.data.errcode === 0) this.$Message.success(`已将状态改为${value}`)
      else this.$Message.error('err')
    },
    goShow (url, list) {
      this.showUrl = url
    },
    changePage (page) {
      this.getData(page)
    }
  }
}
</script>
<style lang="less" scoped>
.class{
  float: right;
}
.img{
  width: 150px;
  height: 126px;
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
