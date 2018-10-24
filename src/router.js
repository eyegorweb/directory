import Vue from "vue";
import Router from "vue-router";

// import Home from "./views/Home.vue";
const Home = () => import("./views/Home.vue");
const ContactDetail = () => import("./views/ContactDetail.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/contacts/:id",
      name: "ContactDetail",
      component: ContactDetail,
      props: true
    }
  ]
});
