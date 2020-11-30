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
            {{ editUser.id == -1 ? "Add user" : "Edit user" }}
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
                  <!-- Name -->
                  <div class="form-group">
                    <label> <span class="required-field">*</span> Name </label>
                    <input
                      ref="nameInput"
                      v-model="editUser.name"
                      type="text"
                      class="form-control"
                      :class="{
                        'is-invalid': $v.editUser.name.$error
                      }"
                      @blur="$v.editUser.name.$touch()"
                    />
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-12">
                  <!-- Phone No -->
                  <div class="form-group">
                    <label>
                      <span class="required-field">*</span> Phone number
                    </label>
                    <input
                      v-model="editUser.phoneNo"
                      type="text"
                      class="form-control"
                      :class="{
                        'is-invalid': $v.editUser.phoneNo.$error
                      }"
                      @blur="$v.editUser.phoneNo.$touch()"
                    />
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-12">
                  <div class="custom-file">
                    <input
                      id="imageInput"
                      ref="imageInput"
                      type="file"
                      class="custom-file-input"
                      @change="imageUploaded"
                    />
                    <label for="imageInput" class="custom-file-label">
                      {{ imageFilePlaceholder }}
                    </label>
                    <a
                      v-if="editUser.image"
                      :href="`http://${serverAPI}/images/${editUser.image}`"
                      rel="noopener noreferrer"
                      target="_blank"
                      >Filename: {{ editUser.image }}</a
                    >
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
import FormData from "form-data";

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
      },
      phoneNo: {
        type: String,
        default: ""
      },
      image: {
        type: String,
        default: ""
      }
    }
  },

  data() {
    return {
      editUser: null,

      imageFilePlaceholder: "Upload an image ...",
      imageFile: "",

      serverAPI: process.env.VUE_APP_SERVER_API
    };
  },

  created() {
    this.editUser = JSON.parse(JSON.stringify(this.user));

    this.$nextTick(() => {
      this.$refs.nameInput.focus();
    });
  },

  methods: {
    async save() {
      let formData = new FormData();

      if (this.imageFile) {
        formData.append("userImage", this.imageFile[0]);
      }

      for (let key in this.editUser) {
        formData.append(key, this.editUser[key]);
      }

      try {
        if (this.editUser.id === -1) {
          await axios.post("/user/", formData);
        } else {
          await axios.put("/user/", formData);
        }
        this.$emit("success");
      } catch (err) {
        console.log(err);
        this.$emit("failed");
      }
    },

    imageUploaded() {
      this.imageFile = this.$refs.imageInput.files;
      this.imageFilePlaceholder = this.imageFile[0].name;
    },

    close() {
      this.$emit("close");
    }
  },

  validations: {
    editUser: {
      name: {
        minLength: minLength(1),
        maxLength: maxLength(60),
        required
      },
      phoneNo: {
        minLength: minLength(1),
        maxLength: maxLength(15),
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
