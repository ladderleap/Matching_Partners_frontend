<template>
  <van-cell center>
    <template #title style="position: absolute">
      <span style="margin-right: 40px">心动模式</span>
      <span class="prompt">鼠标悬停此处查看提示<van-icon name="fail" /></span>
      <span class="content">开启该模式会根据已绑定的标签进行最佳匹配</span>
    </template>
    <template #right-icon>
      <span style="margin-right: 50px">当前用户总数:{{userCount}}</span>
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
let skeletonItems: any[] = [];

const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchMod.value) {
    skeletonItems.length = 20;
    userList.value = [...skeletonItems];
    console.log("match执行了")
    userListData = await myAxios.get('/user/match', {
      params: {
        num: skeletonItems.length
      }
    })
        .then(function (response) {
          console.log('/user/search/tags succeed', response);
          console.log("response.data.code:",typeof response.code)
          if(response.code == 40000){
            Toast.success('无法匹配,您的标签为空');
            skeletonItems.length = 0;
            userList.value = [...skeletonItems];
          }else{
            Toast.success('请求成功');
            console.log("userdataRunning")
            return response.data;
          }
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
  console.log("userListData:",userListData)
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
  .prompt{
    color: red;
    cursor: pointer;
  }
  .prompt:hover + .content {
    opacity: 1; /* 鼠标悬停时设置为不透明 */
    visibility: visible; /* 鼠标悬停时设置为可见 */
  }
  .content {
    position: absolute;
    z-index: 9999;
    background-color: #fff;
    opacity: 0; /* 初始状态为完全透明 */
    visibility: hidden; /* 初始状态为不可见 */
    transition: opacity 0.3s ease, visibility 0.3s ease; /* 过渡效果 */
  }
</style>
