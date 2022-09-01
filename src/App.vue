<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <Button></Button>
    <TodoFooter></TodoFooter>
    <Chart></Chart>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import Button from './components/Button.vue';
import Chart from './components/Chart.vue';

export default {
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
    Button,
    Chart,
  },
  created() {
    this.actionDataInit();
  },
  methods: {
    ...mapActions(['actionDataInit']),
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
