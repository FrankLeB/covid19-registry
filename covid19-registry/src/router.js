import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Questions from "./views/Questions.vue";
import Users from "./views/Users.vue";
import ManualEntries from "./views/ManualEntries.vue";

import AllEntriesReport from "./views/reports/AllEntries.vue";
import SumEntriesReport from "./views/reports/SumEntries.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/questions",
      name: "questions",
      component: Questions
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/manual-entries",
      name: "manual-entries",
      component: ManualEntries
    },
    {
      path: "/all-entries-report",
      name: "all-entries-report",
      component: AllEntriesReport
    },
    {
      path: "/sum-entries-report",
      name: "sum-entries-report",
      component: SumEntriesReport
    }
  ]
});

export default router;
