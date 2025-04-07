import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import ProductModulePage from "../pages/ProductModule/ProductModulePage.vue";
import CategoriesModulePage from "../pages/CatregoriesModule/CategoriesModulePage.vue";
import NotFoundModulePage from "../pages/NotFoundModule/NotFoundModulePage.vue";
import UserModulePage from "../pages/UsersModule/UserModulePage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'ProductsModule',
                component: ProductModulePage,
            },
            {
                path: 'users-module',
                name: 'UsersModule',
                component: UserModulePage,
            },
            {
                path: 'categories-module',
                name: 'CatergoriesModule',
                component: CategoriesModulePage,
            }
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundModulePage,
        meta: { requiresAuth: false },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = true;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
