<template>
  <transition name="modal-fade">
    <div
      class="modal-backdrop"
      tabindex="-1"
      @keyup.esc="close"
      @keydown.ctrl.83.prevent.stop="$v.$invalid ? null : save()"
    >
      <div
        class="modal1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header1">
          <slot name="header">
            {{
              editQuestion.id == -1
                ? "Add question"
                : "Edit question"
            }}
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
            <form class="my-2">
              <div class="row">
                <div class="col-12">
                  <!-- Question -->
                  <div class="form-group">
                    <label for="questionInput">
                      <span class="required-field">*</span> Question
                    </label>
                    <textarea
                      id="questionInput"
                      ref="questionInput"
                      v-model="editQuestion.question"
                      cols="30"
                      rows="5"
                      class="form-control"
                      :class="{ 'is-invalid': $v.editQuestion.question.$error }"
                      @blur="$v.editQuestion.question.$touch()"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </slot>
        </section>

        <footer class="modal-footer1">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-success"
              aria-label="Close modal"
              :disabled="$v.$invalid"
              @click="save"
            >
              Save
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "../../axios-auth";
import { minLength, maxLength, required } from "vuelidate/lib/validators";

export default {
  props: {
    question: {
      required: true,
      type: Object,
      id: {
        required: true,
        type: Number
      },
      question: {
        type: String,
        default: ""
      }
    }
  },

  data() {
    return {
      editQuestion: null
    };
  },

  created() {
    this.editQuestion = JSON.parse(JSON.stringify(this.question));

    this.$nextTick(() => {
      this.$refs.questionInput.focus();
    });
  },

  methods: {
    async save() {
      try {
        if (this.editQuestion.id === -1) {
          await axios.post("/question/", this.editQuestion);
        } else {
          await axios.put("/question/", this.editQuestion);
        }
        this.$emit("success");
      } catch (err) {
        console.log(err);
        this.$emit("failed");
      }
    },

    close() {
      this.$emit("close");
    }
  },

  validations: {
    editQuestion: {
      question: {
        minLength: minLength(1),
        maxLength: maxLength(65535),
        required
      }
    }
  }
};
</script>

<style scoped>
.modal1 {
  width: 400px;
}
</style>
