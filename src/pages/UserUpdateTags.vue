<template>
<div class="container">
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in tags">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-cell-group inset>
    <van-field
        v-model="tag"
        center
        clearable
        label="标签"
        placeholder="请输入想要添加的标签"
    >
<!--      <template #button>-->
<!--        <van-button size="small" type="primary" @click="addTag" style="margin-right: 20px">添加标签</van-button>-->
<!--        <van-button size="small" type="primary" @click="saveTags">保存标签</van-button>-->
<!--      </template>-->
    </van-field>
  </van-cell-group>
  <div class="button">
    <van-button size="small" type="primary" @click="addTag" style="margin-right: 20px">添加标签</van-button>
    <van-button size="small" type="primary" @click="saveTags">保存标签</van-button>
  </div>
</div>
</template>
<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import '@vant/touch-emulator';


const tag = ref('');
const tags = ref<string[]>([]);
const sms = ref("");
const value2 = ref('123');
const getTagList = async () => {
  const res = await myAxios.get("/user/tags", {});
  console.log(res)
  if (res?.code === 0) {
    tags.value = JSON.parse(res.data);
    Toast.success('获取标签成功');
  } else {
    Toast.fail('获取标签失败');
  }
}


const doClose = (tag) => {
  tags.value = tags.value.filter(item => {
    return item !== tag;
  })
}
const addTag = ()=> {
  if (tag.value.trim()) {
    tags.value.push(tag.value.trim());
    Toast.success('标签添加成功');
    console.log(tags.value)
    tag.value = ''; // 清空输入框
  } else {
    Toast.fail('标签内容不能为空');
  }
}

const saveTags = async ()=> {
  if (tag.value.trim()) {
    Toast.fail('输入栏中还有未处理的标签');
    return;
  }
  const res = await myAxios.post("/user/update/tags", {
    tags: JSON.stringify(tags.value)
  });
  console.log(res)
  if (res?.code === 0) {
    tags.value = JSON.parse(res.data);
    Toast.success('保存标签成功');
    getTagList();
  } else {
    Toast.fail('保存标签失败');
  }
}
onMounted(() => {
  getTagList();
})
watchEffect(()=>{
  console.log(tags.value)
})
</script>
<style scoped>
.container {
  max-width: 1200px; /* 版心的最大宽度 */
  margin: 0 auto; /* 居中对齐 */
  padding: 16px; /* 内边距，可以根据需要调整 */
}
.button{
  display: flex;
  flex-direction: row; /* 水平排列子元素 */
  justify-content: space-evenly; /* 子元素之间的间距平均分布 */
  align-items: center; /* 垂直方向居中对齐 */
}
</style>