<template>

  <van-skeleton title avatar :row="3" :loading="loading" v-for="user in userList">
    <van-card
        :desc="user.profile"
        :title="`${user.username}（${user.planetCode}）`"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>

</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {onMounted, watchEffect} from "vue";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
  num:number;
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});
watchEffect(()=> {
  // 可以在这里执行其他操作，比如数据初始化等
})
</script>

<style scoped>

</style>
