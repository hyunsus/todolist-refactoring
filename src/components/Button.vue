<template>
  <div class="ac">
    <button
      class="allfix-btn"
      id="btn1"
      @click="toggleBtn()"
    >
      편집
    </button>
    <div class="aa" id="ac">
      <button
        class="btn"
        id="btn2"
      >
        등록
      </button>
      <button class="btn2" @click='checkArr()'>수정</button>
      <button class="btn3" @click='removeArr()'>삭제</button>
    </div>

    <modal v-if="editModal" @close="editModal = false">
      <h3 slot="header">수정하기</h3>
      <span slot="footer">
        수정할 내용을 작성해주세요
        <input
          type="text"
          v-model="getEditItem.value"
          onfocus="this.select()"
          @keypress.enter="editTodoAction()"
        />&nbsp;
        <span
          class="fixBtn"
          type="button"
          @click="editTodoAction()"
        >
          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <i
          class="close-modal-btn fa fa-times"
          aria-hidden="true"
          @click="editModal = false"
        ></i>
      </span>
    </modal>
  </div>
</template>

<script>

export default {
  components: {
    Modal,
  },
  methods: {
    toggleBtn() {
      const btn1 = document.getElementById('ac');
      if (btn1.style.visibility !== 'hidden') {
        btn1.style.visibility = 'hidden';
      } else {
        btn1.style.visibility = 'visible';
      }
    },
  },
};
</script>

<style scoped>
.ac{
  float:right;
}
.aa{
  float:right;
}

</style>
