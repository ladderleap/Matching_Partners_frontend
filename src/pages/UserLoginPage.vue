<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;" class="button-container">
      <van-button round type="primary" native-type="submit">
        提交
      </van-button>
      <van-button round type="primary" is-link to="/user/register">
        注册
      </van-button>
    </div>
    <div style="text-align: center">演示账号:admin 密码:adminadmin</div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res, '用户登录');
  if (res.code === 0 && res) {
    Toast.success('登录成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {

    Toast.fail('登录失败,账号或密码不正确');
  }
};

</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px;
  gap: 48px;
}
.button-container > * {
  width: 140px;
}
</style>
