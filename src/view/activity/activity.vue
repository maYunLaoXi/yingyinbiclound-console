<template>
  <div class="yin">
    <div v-for="(item, index) of data" :key="item._id">
      <h4>第{{index + 1}}: {{ item.title }}</h4>
      <p>{{item.article}}</p>
      <div>是否展示<Switch :value="item.show" /></div>
      <img v-for="src in item.photo" :src="src" :key="src" alt="" style="width: 25%">
    </div>
  </div>
</template>
<script>
import { databaseQuery } from '@/api/wx'

export default {
  name: 'Activity',
  data () {
    return {
      data: []
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
    }
  }
}
</script>
