import Vue from "vue";
import Router from "vue-router";
import Clients from "@/views/Clients";
import CovidHistory from "@/views/CovidHistory";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/", name: "clients", component: Clients },
        { path: "/covid-history", name: "covid-history", component: CovidHistory },
    ]
});