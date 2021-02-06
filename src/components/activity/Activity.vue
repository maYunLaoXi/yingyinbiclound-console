<template>
  <div class="yin">
    <div class="box" v-for="item of data" :key="item._id">
       <div class="avatar">
        <span class="ivu-avatar"><img :src="item.userInfo.avatarUrl" alt=""></span>
        <span class="user-name">{{item.userInfo.nickName}}</span>
      </div>
      <h4 class="title">{{ item.title }}</h4>
      <p class="article">{{item.article}}</p>
      <div>
        是否同意展示(show): <i-switch :value="item.show" disabled />&nbsp;&nbsp;&nbsp;
        check: <i-switch :value="item.check" @on-change="changeShow('check', item, $event)" />&nbsp;&nbsp;&nbsp;
        pass: <i-switch :value="item.pass" @on-change="changeShow('pass', item, $event)" />&nbsp;&nbsp;&nbsp;
        <span v-if="!!item.subcrible">
          subscrible: <i-switch :disabled="item.sendMessage" :value="item.sendMessage" @on-change="sendMessage(item)" />&nbsp;&nbsp;&nbsp;
        </span>
      </div>
      <img
        class="img"
        v-for="(srcObj, srcObjIndex) in item.photo"
        :src="srcObj.url" :key="srcObj.width + srcObjIndex"
        @click="goShow(srcObj.url, item.photo)"
      >
      <br />
      <Button type="info" @click="dowloadImg(item)">dowload</Button>
    </div>
    <Page :total="total" show-elevator @on-change="changePage" />
    <image-show :url.sync="showUrl" />
  </div>
</template>
<script>
import { updateDb, invokeCloudFunction } from '@/api/wx'
import ImageShow from '_c/image-show'
import JsZip from 'jszip'
import { dowloadImage, readableTime } from 'f-com'

export default {
  name: 'activity',
  components: { ImageShow },
  props: {
    isReceive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collection: 'activity-data',
      data: [],
      total: 0,
      page: 1,
      totalPage: 1,
      showUrl: ''
    }
  },
  created () {
    this.collection = this.isReceive ? 'activity-receive' : 'activity-data'
    this.getData()
  },
  methods: {
    async getData (page = 1) {
      const res = await invokeCloudFunction({
        name: 'activity-get',
        data: {
          collection: this.collection,
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
    changeShow (name, item, value) {
      let query = `db.collection("${this.collection}").doc("${(item._id)}").update({data :{${name}:${value}}})`
      updateDb(query).then(res => {
        if (res.data.errcode === 0) this.$Message.success(`已将${name}状态改为${value}`)
        else this.$Message.error('err')
      }).catch(_err => {
        this.$Message.error('err')
      })
    },
    goShow (url, list) {
      this.showUrl = url
    },
    changePage (page) {
      this.getData(page)
    },
    dowloadImg (item) {
      let src = []
      item.photo.forEach(item => src.push(item.url))
      dowloadImage({
        src,
        zip: true,
        zipAnothers: {
          name: 'yingyingbi.txt',
          content: this.mapObj2Txt(item)
        },
        JsZip
      })
    },
    async sendMessage (item) {
      const { subcrible: templateId, _openid } = item
      const res = await invokeCloudFunction({
        name: 'serverapi',
        data: {
          action: 'sendSubscribeMessage',
          templateId,
          _openid
        }
      })
      if (res.data.errmsg === 'ok') {
        this.changeShow('sendMessage', item, true)
      }
    },
    mapObj2Txt (obj) {
      let str = ''
      for (let index in obj) {
        if (index === 'address' && obj[index]) {
          let add = ''
          for (let i in obj[index]) {
            add = add + `\n   ${i}: ${obj[index][i]}`
          }
          str = str + '\n address: ' + add + '\n'
        } else {
          const content = typeof obj[index] === 'string' ? obj[index] : index
          str = str + `${index}: ${content}\n`
        }
      }
      return str
    }
  }
}
</script>
<style lang="less" scoped>
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
