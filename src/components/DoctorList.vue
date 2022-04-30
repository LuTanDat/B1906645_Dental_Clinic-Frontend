<script>
export default {
    props: {
        doctors: { type: Array, default: [] },
        isAdmin: { type: Boolean },
    },
};
</script>

<template>
    <div>
        <div
            class="col-3 mt-3 mb-3 floatLeft"
            v-for="doctor in doctors"
            :key="doctor.name"
        >
            <router-link
                :to="{
                    name: 'doctor.registration',
                    params: { id: doctor.id },
                }"
            >
                <div class="doctorListItem">
                    <img :src="`/images/${doctor.image}`" :alt="doctor.name" class="img"/>
                    <h5 class="text-center">{{ doctor.name }}</h5>
                    <h5 class="text-center">{{ doctor.position }}</h5>
                    <h5 class="text-center">Trình độ: {{ doctor.educationLevel }}</h5>
                    <h5 class="text-center">Kinh nghiệm: {{ doctor.experience }}</h5>
                    <h5 class="text-center red">Chỗ trống: {{ doctor. numberOfSeatsAvailable }}</h5>
                </div>
            </router-link>
            <router-link
                    :to="{
                        name: 'doctor.edit',
                        params: { id: doctor.id },
                    }"
                >
                    <span v-if="isAdmin" class="mt-2 badge badge-warning mr-3">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>
        </div>
        <div style="clear: both;"></div>
    </div>
</template>