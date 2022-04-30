<template>
    <div v-if="doctor" class="page">
        <h3>Thêm Bác Sĩ</h3>
        <DoctorForm
            :doctor="doctor"
            @submit:doctor="createDoctor"
        />
        <h5 class="p-3 yellow">{{message}}</h5>
    </div>
</template>

<script>
import DoctorForm from "@/components/DoctorForm.vue";
import DoctorService from "@/services/doctor.service";

export default {
    components: {
        DoctorForm,
    },
    data() {
        return {
            doctor: {
                name: "",
                slug: "",
                image: "",
                position: "",
                educationLevel: "",
                experience: "",
                numberOfSeatsAvailable: 0,
            },
            message: "",
        };
    },
    methods: {
        async createDoctor(data) {
            try {
                await DoctorService.create(data);
                this.message = "Thêm mới Bác Sĩ thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>