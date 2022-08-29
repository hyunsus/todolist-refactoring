<template>
  <section>
    <transition-group name="list" tag="ul">
      <!-- v-for을 이용하여 리스트 띄우기 -->
      <li
        v-for="({ key, value, date }, index) in getTodoItem"
        :key="key"
        class="shadow"
      >
        <div>
          <input
            type="radio"
            name="aa"
            v-model ="valueIndex"
            :value ="index"
          />{{ value }}&nbsp;&nbsp;
        </div>
        <span class="text-muted"> {{ date }}</span>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['getTodoItem', 'getEditItem', 'getIdx']),
    // index setter
    valueIndex: {
      get() {
        return this.getIdx;
      },
      set(val) {
        this.actionSetIdx(val);
      },
    },
  },
  methods: {
    ...mapActions(['actionRemoveTodo', 'actionEditTodo', 'actionCheckArr', 'actionSetIdx']),
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0px;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.check-btn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.edit-btn,
.fixBtn {
  margin-left: auto;
  color: forestgreen;
  cursor: pointer;
}
.remove-btn {
  margin-left: 10px;
  color: #de4343;
  cursor: pointer;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-move {
  transition: transform 1s;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.text-muted {
  color: gray;
  font-size: 0.6em;
}
.radioBtn{
  width: 20px;
}
</style>
