<template>
  <div class="wrap">
    <Input v-model="searchKey" search @on-search="onSearch" placeholder="搜索key" style="width: auto" />
      <Card v-if="searchRes.key" dis-hover style="margin: 32px 0">
        <div class="img">
          <img :src="'http://img.yingyinbi.com/' + searchRes.key" alt="">
          <div class="info">
            <div><span>fsize: </span>{{ searchRes.fsize }}</div>
            <div><span>hash: </span>{{ searchRes.hash }}</div>
            <div><span>key: </span>{{ searchRes.key }}</div>
            <div><span>mimeType: </span>{{ searchRes.mimeType }}</div>
            <div><span>putTime: </span>{{ new Date(Math.floor(searchRes.putTime / 10000)).toLocaleString() }}</div>
            <Button type="warning" @click="deleteItem(searchRes.key)">delete</Button>
          </div>
        </div>
      </Card>
    <Scroll :on-reach-bottom="handleReachBottom" height="500">
      <div class="img-list">
        <div class="img" v-for="item in items" :key="item.key">
          <img :src="'http://img.yingyinbi.com/' + item.key" alt="">
          <div class="info">
            <div><span>fsize: </span>{{ item.fsize }}</div>
            <div><span>hash: </span>{{ item.hash }}</div>
            <div><span>key: </span>{{ item.key }}</div>
            <div><span>mimeType: </span>{{ item.mimeType }}</div>
            <div><span>putTime: </span>{{ new Date(Math.floor(item.putTime / 10000)).toLocaleString() }}</div>
            <Button type="warning" @click="deleteItem(item.key)">delete</Button>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
import { getListPrefix, qiniuDelete, qiniuStat } from '@/api/qiniu'

export default {
  name: 'QiniuPhoto',
  data () {
    return {
      bucket: 'yinyingbi',
      marker: '',
      items: [],
      searchKey: '',
      searchRes: {}
    }
  },
  created () {
    this.doGetList()
  },
  methods: {
    handleReachBottom () {
      this.doGetList()
    },
    async doGetList () {
      if (this.marker === null) {
        alert('没有了')
        return
      }
      const { data } = await getListPrefix({
        marker: this.marker
      })
      const { items, marker } = data
      // debugger
      this.marker = marker || null
      this.items = [...this.items, ...items]
    },
    deleteItem (key) {
      qiniuDelete(key).then(res => {
        res.status === 200 && this.$Message.success('delete success' + res.data)
      })
    },
    onSearch () {
      qiniuStat(this.searchKey).then(res => {
        const { data } = res
        this.searchRes = { key: this.searchKey, ...data }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
  height: 100%;
}
.img-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.img{
  display: flex;
  flex-direction: row;
  margin: 5px;
  background: #FFF;

  img{
    width: 100px;
    object-fit: contain;
  }
  .info{
    margin-left: 20px;
  }
  span{
    font-weight: 600;
    padding-right: 10px;
  }
}
</style>
