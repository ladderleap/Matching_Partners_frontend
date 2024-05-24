<template>
  <van-cell center title="心动模式">
    <template #right-icon>
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

let skeletonItems :any[]= [];

const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchMod.value) {
    skeletonItems.length = 2;
    userList.value = [...skeletonItems];
    console.log("match执行了")
    userListData =  await myAxios.get('/user/match', {
      params: {
        num: 20
      }
    })
        .then(function (response) {
          console.log('/user/search/tags succeed', response);
          skeletonItems.length = 8;
          userList.value = [...skeletonItems];
          Toast.success('请求成功');
          console.log("userdataRunning")
          return response.data;
        })
        .catch(function (error) {
          console.error('/user/search/tags error', error);
          Toast.fail('请求失败');
        })
  } else {
    console.log("recommend执行了")
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 200,
        pageNum: 1
      }
    })
        .then(function (response) {
          console.log('/user/search/tags succeed', response);
          Toast.success('请求成功');
          return response.data.records;
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
