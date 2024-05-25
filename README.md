# 匹配系统

## vue3 ref响应式对象导致一直重复触发 **watchEffect**自动追踪

当我们在某些场景下对 ref对象进行了修改操作的同时又会调用watchEfect钩子函数 该函数又会进行ref赋值操作 又会导致watchEffect的监听 从而导致无限循环

```js
const counter = ref(0);
const userList2 = ref([{name: 'Alice'}, {name: 'wangwu'}]);
const logCounter = async () => {
  userList2.value[0].name = 'Bob';
  let data;
  data = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
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
  console.log(data)
  userList2.value = data;
};
```



该函数在watchEfect中调用 现在有个问题就是我一但在请求之前对userList2进行修改操作 都会一直重复触发watchEffect 钩子函数 注意: 在请求之后不会 重复的手动进行修改也不会



## 自定义标签功能

首先利用`onMounted`钩子函数完成对当前用户的标签进行获取,获取后需将字符串转为数组后将其通过vantUI组件进行v-for数据解析并对其进行close时间绑定

```js
const doClose = (tag) => {
  tags.value = tags.value.filter(item => {
    return item !== tag;
  })
}
```

每当关闭一个标签时会触发自身标签的鬼泣绿将遍历出的标签进行比较 不相等则进行 重新返回赋值  这样即可完成对标签数组的更新