<template>
  <div id="app">
    <div class="mobile-top my-0"></div>

    <div class="container-fluid bg-gray">
      <div class="row mh-100">
        <!-- Sidebar menu -->
        <aside class="col-12 col-sm-12 col-md-12 col-lg-2 p-0 bg-dark-blue">
          <app-header></app-header>
        </aside>
        <!-- App Content -->
        <main class="col col-lg-10 mt-3 main-full-height">
          <router-view></router-view>
        </main>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    appHeader: Header
  }
};
</script>

<style>
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.bg-dark-blue {
  background: #081b29;
}

.main-full-height {
  min-height: calc(100vh);
}

.mobile-top {
  display: none;
  height: 75px;
  background: #081b29;
}

.bg-gray {
  background: #e8e8e8;
}

.red-text {
  color: #be0003;
}

.green-text {
  color: #52a00e !important;
}

.section-outline {
  background: #fbfbfb !important;
  padding: 15px 50px 30px 50px;
  border: 2px solid #cecece;
  border-radius: 0%;
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
  box-shadow: none;
}

@media only screen and (max-width: 64.063em) {
  .edmundston-logo {
    display: none;
  }

  .mobile-top {
    display: block;
  }
}

/* Project Tasks global styles */
.task-row:hover {
  cursor: pointer;
  background: #eeeeee;
  border: 1px solid #cccccc;
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal1 {
  background: #f9f9f9;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 2%;
}

.modal-header1,
.modal-header2,
.modal-footer1 {
  padding: 15px;
  display: flex;
}

.modal-header1 {
  border-bottom: 1px solid #eeeeee;
  font-size: 20px;
  justify-content: space-between;
}

.modal-header2 {
  border-bottom: none;
  font-size: 20px;
  justify-content: space-between;
}

.modal-footer1 {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-footer2 {
  border-top: 1px solid #eeeeee;
}

.modal-body1 {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

/* Animation / Transition */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

/* Regular fade used for alerts */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-section-enter-active,
.fade-section-leave-active {
  transition: opacity 0.6s;
}
.fade-section-enter,
.fade-section-leave-to {
  opacity: 0;
}

.slide-enter-active {
  -moz-transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s;
  -o-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.slide-leave-active {
  -moz-transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s;
  -o-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 05, 1);
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

/* Nice slide and fade animation */
.slide-fade-enter-active {
  transition: all 0.4s ease !important;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1) !important;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px) !important;
  opacity: 0 !important;
}

.required-field {
  color: #be0003;
}

/* Bootstrap styles override */
/* Primary */
.btn-primary {
  background-color: #0a5892 !important;
  border: 1px solid #0a5892 !important;
}

.btn-primary:hover {
  background-color: #083670 !important;
  border: 1px solid #083670 !important;
}

.btn-outline-primary {
  border: 1px solid #0a5892 !important;
}

.btn-outline-primary:hover {
  background-color: #0a5892 !important;
}

.btn-outline-primary:disabled {
  background-color: transparent !important;
}

/* Success */
.btn-success {
  background-color: #52a00e !important;
  border: 1px solid #52a00e !important;
}

.btn-success:hover {
  background-color: #30800c !important;
  border: 1px solid #30800c !important;
}

.btn-outline-success {
  border: 1px solid #52a00e !important;
}

.btn-outline-success:hover {
  background-color: #52a00e !important;
}

.btn-outline-success:disabled {
  background-color: transparent !important;
}

/* Secondary */
.btn-secondary {
  background-color: #52606d !important;
  border: 1px solid #52606d !important;
}

.btn-secondary:hover {
  background-color: #30404b !important;
  border: 1px solid #30404b !important;
}

.btn-outline-secondary {
  border: 1px solid #52606d !important;
}

.btn-outline-secondary:hover {
  background-color: #52606d !important;
}

.btn-outline-secondary:disabled {
  background-color: transparent !important;
}

/* Danger */
.btn-danger {
  background-color: #be0003 !important;
  border: 1px solid #be0003 !important;
}

.btn-danger:hover {
  background-color: #9c0001 !important;
  border: 1px solid #9c0001 !important;
}

.btn-outline-danger {
  border: 1px solid #be0003 !important;
}

.btn-outline-danger:hover {
  background-color: #be0003 !important;
}

.btn-outline-danger:disabled {
  background-color: transparent !important;
}

/* Warning */
.btn-warning {
  background-color: #f0b429 !important;
  border: 1px solid #f0b429 !important;
}

.btn-warning:hover {
  background-color: #d09207 !important;
  border: 1px solid #d09207 !important;
}

.btn-outline-warning {
  border: 1px solid #f0b429 !important;
}

.btn-outline-warning:hover {
  background-color: #f0b429 !important;
}

.btn-outline-warning:disabled {
  background-color: transparent !important;
}

/* Checkboxes */
input[type="checkbox"],
input[type="radio"] {
  width: 18px;
  height: 18px;
}

.v-select .vs__search::placeholder,
.v-select .vs__dropdown-toggle,
.v-select .vs__dropdown-menu {
  background: #ffffff;
  color: #6c757d;
  min-height: calc(2.25rem + 2px);
}
</style>
