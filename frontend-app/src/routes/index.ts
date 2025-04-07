import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import ProductModulePage from "../pages/ProductModule/ProductModulePage.vue";
import CategoriesModulePage from "../pages/CatregoriesModule/CategoriesModulePage.vue";
import NotFoundModulePage from "../pages/NotFoundModule/NotFoundModulePage.vue";
import UserModulePage from "../pages/UsersModule/UserModulePage.vue";
import LoginModulePage from "../pages/LoginModule/LoginModulePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "ProductsModule",
        component: ProductModulePage,
      },
      {
        path: "users-module",
        name: "UsersModule",
        component: UserModulePage,
      },
      {
        path: "categories-module",
        name: "CatergoriesModule",
        component: CategoriesModulePage,
      },
    ],
  },
  {
    path: "/login",
    name: "LoginModule",
    component: LoginModulePage,
    meta: { requiresAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundModulePage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next({ name: "LoginModule" });
  }

  next();
});

export default router;
