<template>
  <div class="search-user">
    <div class="row">
      <div class="col-12">
        <h2>Search for a user</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <input
          ref="searchBarInput"
          v-model="searchBar"
          type="text"
          placeholder="id - Name"
          class="form-control"
          @keyup="userSearch"
          @keyup.enter="
            userList.length > 0 ? userSelected(userList[0].id) : null
          "
        />

        <transition-group name="fade" tag="ul">
          <li
            v-for="user in userList"
            :key="user.id"
            class="list-group-item"
            @click="userSelected(user.id)"
          >
            {{ user.name }} - {{ user.id }}
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  data() {
    return {
      searchBar: "",
      userList: []
    };
  },

  created() {
    this.$nextTick(() => {
      this.$refs.searchBarInput.focus();
    });
  },

  methods: {
    async userSearch() {
      if (!this.searchBar) {
        this.userList = [];
        return;
      }

      try {
        const res = await axios.get(`/user/findByNameAndId/${this.searchBar}`);
        this.userList = res.data.users;
      } catch (err) {
        console.log(err);
      }
    },

    userSelected(id) {
      this.$emit("userSelected", id);
    }
  }
};
</script>

<style scoped>
.search-user {
  min-height: 250px;
  max-height: 250px;
  z-index: 10;
}
.list-group-item:hover {
  background: #cccccc;
  cursor: pointer;
}
.list-group-item {
  z-index: 20;
}
</style>
