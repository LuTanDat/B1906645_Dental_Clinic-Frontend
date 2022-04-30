import { createWebHistory, createRouter } from "vue-router";
import Doctor from "@/views/Doctor.vue";

const routes = [
    {
        path: "/",
        name: "doctor",
        component: Doctor,
    },
    {
        path: "/doctors/",
        name: "doctor.add",
        component: () => import("@/views/DoctorAdd.vue"),
    },
    {
        path: "/doctors/:id",
        name: "doctor.edit",
        component: () => import("@/views/DoctorEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/doctors/registration/:id",
        name: "doctor.registration",
        component: () => import("@/views/DoctorRegistration.vue"),
        props: true 
    },
    {
        path: "/doctors/feedback",
        name: "doctor.feedback",
        component: () => import("@/views/Feedback.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;