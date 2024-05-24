<template>
  <van-cell center title="心动模式" flo>
    <template #right-icon>
      <span style="margin-right: 100px;">当前数据库总用户总量:{{userCount}}</span>
      <van-switch v-model="isMatchMod"/>
    </template>

  </van-cell>

  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
const route = useRoute();
const {tags} = route.query;

const userList = ref<any[]>([]);
const isMatchMod = ref<boolean>(false);
const loading = ref(true);
const userCount = ref(0);
let skeletonItems :any[]= [];

const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchMod.value) {
    skeletonItems.length = 20;
    userList.value = [...skeletonItems];
    console.log("match执行了")
    userListData =  await myAxios.get('/user/match', {
      params: {
        num: skeletonItems.length
      }
    })
        .then(function (response) {
          console.log('/user/search/tags succeed', response);
          Toast.success('请求成功');
          console.log("userdataRunning")
          return response.data;
        })
        .catch(function (error) {
          console.error('/user/search/tags error', error);
          Toast.fail('请求失败');
        })
  } else {
    skeletonItems.length = 50;
    userList.value = [...skeletonItems];
    console.log("recommend执行了")
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: skeletonItems.length,
        pageNum: 1
      }
    })
        .then(function (response) {
          console.log('/user/search/tags succeed', response);
          Toast.success('请求成功');
          userCount.value = response.data.total;
          return response.data.pageResult.records;
        })
        .catch(function (error) {
          console.error('/user/search/tags error', error);
          Toast.fail('请求失败');
        })

  }

  if (userListData) {
    console.log("父组件遍历数据进行赋值操作")
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}


watchEffect(() => {
  console.log("watchEffect");
  loadData();
});

</script>

<style scoped>

</style>
