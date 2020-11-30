<template>
  <transition name="modal-fade">
    <div ref="modal" class="modal-backdrop" tabindex="-1" @keyup.esc="close">
      <div
        class="modal1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header1">
          <slot name="header">
            Confirmation
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
            <p>
              Do you really want to delete the user:
              <span style="font-size: 18px; font-weight: bold;"
                >{{ user.name }}
              </span>
              ? The user will be deleted forever.
            </p>
          </slot>
        </section>

        <footer class="modal-footer1">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-danger"
              aria-label="Close modal"
              @click="save"
            >
              Delete
            </button>
            <button
              type="button"
              class="btn btn-success ml-2"
              aria-label="Close modal"
              @click="close"
            >
              Cancel
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "../../axios-auth";

export default {
  props: {
    user: {
      required: true,
      type: Object,
      id: {
        required: true,
        type: Number
      },
      name: {
        type: String,
        default: ""
      }
    }
  },

  created() {
    this.$nextTick(() => {
      this.$refs.modal.focus();
    });
  },

  methods: {
    close() {
      this.$emit("close");
    },

    async save() {
      try {
        await axios.delete(`/user/${this.user.id}`);
        this.$emit("success");
      } catch (err) {
        console.log(err);
        this.$emit("failed");
      }
    }
  }
};
</script>

<style scoped></style>
