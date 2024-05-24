<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍"  is-link to="/user/team/join" />
    <van-button type="primary" block @click="logout">退出用户</van-button>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

// const user = {
//   id: 1,
//   username: '鱼皮',
//   userAccount: 'dogYupi',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: '男',
//   phone: '123112312',
//   email: '12345@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const user = ref();

const router = useRouter();

onMounted(async () => {
  user.value = await getCurrentUser();
  console.log(user.value)
  console.log(123123)
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
const logout = async () => {
  const res = await myAxios.post("/user/logout", {
  });
  if (res?.code === 0) {
    Toast.success('用户已退出');
    router.push({
      path: '/user/login',
    })
  } else {
    Toast.fail('加载队伍失败，请刷新重试');
  }
}
</script>

<style scoped>

</style>
