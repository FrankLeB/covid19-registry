<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header1"
          :class="{
            'modal-header-success': isSuccess,
            'modal-header-failed': !isSuccess
          }"
        >
          <slot name="header">
            {{ isSuccess ? "Success!" : "Error!" }}
            <button
              type="button"
              class="btn-close"
              aria-label="Close modal"
              @click="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </slot>
        </header>

        <section class="modal-body1">
          <slot name="body">
            <p>{{ description }}</p>
            <i v-if="isSuccess" class="fas fa-check-circle success-icon"></i>
            <i v-else class="fas fa-exclamation-circle failed-icon"></i>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    description: {
      required: true,
      type: String
    },
    isSuccess: {
      required: true,
      type: Boolean
    }
  },

  created() {
    let timeOut = this.isSuccess ? 750 : 1500;

    setTimeout(() => {
      this.close();
    }, timeOut);
  },

  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-header-success {
  background: #52a00e;
  color: white;
}
.modal-header-failed {
  background: #be0003;
  color: white;
}
.fas {
  font-size: 50px;
}
.success-icon {
  color: #52a00e;
}
.failed-icon {
  color: #be0003;
}
</style>
