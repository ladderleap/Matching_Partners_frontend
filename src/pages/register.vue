

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="loginUser.userAccount"
          name="userAccount"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填账号' }]"
      />
      <van-field
          v-model="loginUser.userPassword"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="loginUser.checkPassword"
          type="password"
          name="密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ validator, message: '请填写确认密码' }]"
      />
      <van-field
          v-model="loginUser.userName"
          name="userName"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填用户名' }]"
      />
      <van-field name="radio" label="性别">
        <template #input>
      <van-radio-group v-model="loginUser.gender" direction="horizontal">
        <van-radio name="0">男</van-radio>
        <van-radio name="1">女</van-radio>
      </van-radio-group>
        </template>
      </van-field>

      <van-field
          v-model="loginUser.phone"
          name="phone"
          label="手机"
          placeholder="手机号"
          :rules="[{ pattern:phone, message: '以13、15、17、18、19开头，总长度为11位' }]"
      />
      <van-field
          v-model="loginUser.email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ pattern:email, message: '邮箱格式不合法' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>



<script setup lang="ts">

import {ref, toRaw} from 'vue';
import {Toast} from "vant";
import myAxios from "../plugins/myAxios";
const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
const phone = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
const showPopover = ref(false);
const loginUser = ref({
  userName:"",
  userAccount: "",
  userPassword: "",
  checkPassword:"",
  gender:"0",
  phone:"",
  email:"",
});
const onSubmit = async () => {
  const registerRes =  await myAxios.post('/user/register', toRaw(loginUser.value))
  if (registerRes.code === 0 && registerRes) {
    Toast.success('注册成功');
  } else {
    Toast.fail('注册失败');
  }
};
const validator = (val) => {
  if (val !== loginUser.value.userPassword) {
    console.log("两次密码不一致");
    Toast.fail("两次密码不一致");
    return false
  }
  return true
};
</script>





<style scoped>

</style>