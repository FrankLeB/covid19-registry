<template>
  <div class="header-side">
    <nav
      class="sidebar navbar navbar-expand-lg navbar-dark flex-lg-column flex-row align-items-justify py-2"
      :class="{ showNav: showNavbar }"
    >
      <!-- Button to toggle navigation on mobile, this still needs to be adjusted -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarHeader"
        aria-controls="navbarHeader"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="showNavbar = !showNavbar"
      >
        <span class="fas fa-bars" style="font-size: 36px; color: gray;"></span>
      </button>

      <!-- User Avatar -->
      <i class="fas fa-thermometer-half avatar-display my-2"></i>

      <!-- Software name -->
      <h4 class="text-header">Covid-19 Registry</h4>

      <!-- Navigation Links -->
      <div
        id="navbarHeader"
        class="collapse navbar-collapse"
        :class="{ show: showNavbar }"
      >
        <ul
          class="flex-column flex-row navbar-nav w-100 align-items-start justify-content-start"
        >
          <!-- Home -->
          <router-link
            tag="li"
            to="/"
            class="nav-item"
            @click.native="closeMobileMenu"
          >
            <a class="nav-link pl-0">
              <i class="fas fa-home"></i>
              <span class="d-xs-inline ml-2">Home</span>
            </a>
          </router-link>

          <!-- Manual entries -->
          <router-link
            tag="li"
            to="/manual-entries"
            class="nav-item"
            @click.native="closeMobileMenu"
          >
            <a class="nav-link pl-0">
              <i class="fas fa-plus"></i>
              <span class="d-xs-inline ml-2">Manual entries</span>
            </a>
          </router-link>

          <!-- Show admin options -->
          <li
            class="nav-item"
            @click="showAdminMenu = !showAdminMenu"
          >
            <a class="nav-link pl-0">
              <i v-if="!showAdminMenu" class="fas fa-caret-right"></i>
              <i v-else class="fas fa-caret-down"></i>
              <span class="d-xs-inline ml-2">Administration</span>
            </a>
          </li>

          <transition name="slide">
            <ul
              v-if="showAdminMenu"
              class="flex-column flex-row navbar-nav w-100 align-items-start"
            >
              <!-- Users -->
              <router-link
                tag="li"
                to="/users"
                class="nav-item"
                @click.native="closeMobileMenu"
              >
                <a class="nav-link">
                  <i class="fas fa-hard-hat"></i>
                  <span class="d-xs-inline ml-2">Users</span>
                </a>
              </router-link>

              <!-- Questions -->
              <router-link
                tag="li"
                to="/questions"
                class="nav-item"
                @click.native="closeMobileMenu"
              >
                <a class="nav-link">
                  <i class="fas fa-question"></i>
                  <span class="d-xs-inline ml-2">Questions</span>
                </a>
              </router-link>
            </ul>
          </transition>

          <!-- Show report options -->
          <li
            class="nav-item"
            @click="showReportMenu = !showReportMenu"
          >
            <a class="nav-link pl-0">
              <i v-if="!showReportMenu" class="fas fa-caret-right"></i>
              <i v-else class="fas fa-caret-down"></i>
              <span class="d-xs-inline ml-2">Reports</span>
            </a>
          </li>

          <transition name="slide">
            <ul
              v-if="showReportMenu"
              class="flex-column flex-row navbar-nav w-100 align-items-start"
            >
              <!-- All entries -->
              <router-link
                tag="li"
                to="/all-entries-report"
                class="nav-item"
                @click.native="closeMobileMenu"
              >
                <a class="nav-link">
                  <i class="fas fa-file-invoice"></i>
                  <span class="d-xs-inline ml-2">All Entries</span>
                </a>
              </router-link>

              <!-- Sum per day entries -->
              <router-link
                tag="li"
                to="/sum-entries-report"
                class="nav-item"
                @click.native="closeMobileMenu"
              >
                <a class="nav-link">
                  <i class="fas fa-file-invoice"></i>
                  <span class="d-xs-inline ml-2">Sum by days</span>
                </a>
              </router-link>
            </ul>
          </transition>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false,
      showAdminMenu: false,
      showReportMenu: false
    };
  },

  methods: {
    closeMobileMenu() {
      this.showNavbar = false;
    }
  }
};
</script>

<style scoped>
.text-header {
  color: #e9e9e9;
}

.nav-link:hover {
  cursor: pointer;
}

.avatar-display {
  border-radius: 50%;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: white;
  color: #081b29;
  font-size: 9vw;
  align-self: center;
  align-content: center;
}

.header-side {
  min-height: calc(100vh - 50px);
}

@media only screen and (max-width: 64.063em) {
  .header-side {
    min-height: 0px;
  }

  .avatar-display {
    display: none;
  }

  .text-header {
    display: none;
  }

  .navbar-toggler {
    margin-top: -65px;
    margin-left: -10px;
  }
}
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
