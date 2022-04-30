<template>
    <div v-if="doctor" class="page">
        <h4>Hiệu chỉnh thông tin</h4>
        <DoctorForm
            :doctor="doctor"
            @submit:doctor="updateDoctor"
            @delete:doctor="deleteDoctor"
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            doctor: null,
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

        async updateDoctor(data) {
            try {
                await DoctorService.update(this.doctor.id, data);
                this.message = "Cập nhật thành công thông tin bác sĩ.";
            } catch (error) {
                console.log(error);
            }
        },

        async deleteDoctor() {
            if (confirm("Bạn có chắc chắn muốn xóa?")) {
                try {
                    await DoctorService.delete(this.doctor.id);
                    this.$router.push({ name: "doctor" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getDoctor(this.id);
        this.message = "";
    },
};
</script>