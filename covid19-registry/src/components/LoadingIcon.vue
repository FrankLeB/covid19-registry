<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <section class="modal-body1">
          <slot name="body">
            <app-circle></app-circle>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import Circle from "vue-loading-spinner/src/components/Circle.vue";
export default {
  components: {
    appCircle: Circle
  }
};
</script>

<style scoped>
.modal1 {
  background: transparent;
  box-shadow: 0 0 0 0;
}
</style>
