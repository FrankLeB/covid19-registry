<template>
  <div class="section-outline">
    <div v-if="user" class="row">
      <!-- Avatar -->
      <div class="col-12 col-md-4">
        <img
          v-if="user.image"
          :src="`http://${serverAPI}/images/${user.image}`"
          alt="Photo employé"
          class="photo-display my-2"
        />
      </div>

      <!-- Info -->
      <div class="col-12 col-md-4 my-auto text-center">
        <h3 class="mb-3">{{ user.name }}</h3>
        <h3 class="mt-3">{{ user.phoneNo }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  props: {
    userId: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      user: null,

      serverAPI: process.env.VUE_APP_SERVER_API
    };
  },

  created() {
    this.fetchUserInfo();
  },

  methods: {
    async fetchUserInfo() {
      try {
        const res = await axios.get(
          `/user/fetchById/${this.userId}`
        );
        this.user = res.data.user;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.photo-display {
  width: 200px;
  height: 200px;
  border: 2px solid grey;
}
</style>
