<template>
  <van-form @submit="onSubmit">
<!--    <van-field-->
<!--        v-model="editUser.currentValue"-->
<!--        :name="editUser.editKey"-->
<!--        :label="editUser.editName"-->
<!--        :placeholder="`请输入${editUser.editName}`"-->
<!--    />-->
    <van-dropdown-menu>
      <van-dropdown-item v-model="editValue" :options="option" />
    </van-dropdown-menu>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";






const route = useRoute();
const router = useRouter();
const option = [
  { text: '男', value: '0' },
  { text: '女', value: '1' },
];

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})



const editValue = ref(editUser.value.currentValue);
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  console.log("准备更新数据为",editValue ,typeof editValue)
  if (!currentUser) {
    Toast.fail('用户未登录');
    return;
  }


  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    [editUser.value.editKey as string]: editValue.value,
  })
  console.log(res, '更新请求');
  if (res.code === 0 && res.data > 0) {
    Toast.success('修改成功');
    router.back();
  } else {
    Toast.fail('修改错误');
  }





};

</script>

<style scoped>

</style>
