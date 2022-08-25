<template>
  <div class="hello">
    <button v-on:click="clickBtn">HelloWorld</button>
    <button v-on:click="changeComponent">Change Component</button>
    <ByWorld v-if="isComponent"></ByWorld>
  </div>
</template>

<script>
import EventBus from './EventBus';

export default {
  name: 'HelloWorld',
  components: {
  },
  data() {
    return {
      isComponent: true,
    };
  },
  methods: {
    clickBtn() {
      EventBus.$emit('push-msg', '안녕');
    },
    changeComponent() {
      this.isComponent = !this.isComponent;
    },
  },
};
</script>
