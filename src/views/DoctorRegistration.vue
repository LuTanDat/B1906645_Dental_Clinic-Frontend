<template>
    <div v-if="doctor" class="page">
        <h4>Đăng ký lịch khám</h4>
        <RegUserInfoForm
            :doctor="Object.assign(doctor, doctorUser)" 
            @submit:doctor="RegistrationDoctor"
        />     
        <h5 class="p-3 yellow">{{message}}</h5>
    </div>
</template>

<script>
import RegUserInfoForm from "@/components/RegUserInfoForm.vue";
import DoctorService from "@/services/doctor.service";

export default {
    components: {
        RegUserInfoForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            doctor: null,
            doctorUser: {
                nameUser: "",
                phoneUser: "",
                timeUserReg: "",
            },
            message: "",
        };
    },
    methods: {
        async getDoctor(id) {
            try {
                this.doctor = await DoctorService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async RegistrationDoctor(data) {
            try {
                await DoctorService.createUser(data);
                this.message = "Đăng ký lịch khám thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getDoctor(this.id);
        this.message = "";
    },
};
</script>