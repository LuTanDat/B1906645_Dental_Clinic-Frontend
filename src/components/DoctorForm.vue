<template>
    <Form
        @submit="$emit('submit:doctor', doctorLocal)"
        :validation-schema="doctorFormSchema"
        class="border"
    >
        <div class="form-group">
            <label for="name">Tên Bác Sĩ</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="doctorLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Slug</label>
            <Field
                name="slug"
                type="text"
                class="form-control"
                v-model="doctorLocal.slug"
            />
            <ErrorMessage name="slug" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Hình ảnh</label>
            <Field
                name="image"
                type="text"
                class="form-control"
                v-model="doctorLocal.image"
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Chức Vụ</label>
            <Field
                name="position"
                type="text"
                class="form-control"
                v-model="doctorLocal.position"
            />
            <ErrorMessage name="position" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Trình độ</label>
            <Field
                name="educationLevel"
                type="text"
                class="form-control"
                v-model="doctorLocal.educationLevel"
            />
            <ErrorMessage name="educationLevel" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Kinh nghiệm làm việc</label>
            <Field
                name="experience"
                type="text"
                class="form-control"
                v-model="doctorLocal.experience"
            />
            <ErrorMessage name="experience" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Số chỗ còn lại</label>
            <Field
                name="numberOfSeatsAvailable"
                type="Number"
                class="form-control"
                v-model="doctorLocal.numberOfSeatsAvailable"
            />
            <ErrorMessage name="numberOfSeatsAvailable" class="error-feedback" />
        </div>
       

        <div class="form-group">
            <button class="btn btn-primary m-3">Lưu</button>
            
            <button
                v-if="doctorLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('delete:doctor', doctorLocal.id)"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:doctor", "delete:doctor"],
    props: {
        doctor: { type: Object, required: true }
    },
    data() {
        const doctorFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(500, "Tên có nhiều nhất 65 ký tự."),
            slug: yup
                .string()
                .required("Slug phải có giá trị."),
            image: yup
                .string()
                .required("Hình ảnh phải có giá trị."),  
            position: yup
                .string()
                .required("Chức Vụ phải có giá trị."),
            educationLevel: yup
                .string()
                .required("Trình độ phải có giá trị."),
            experience: yup
                .string()
                .required("Kinh nghiệm phải có giá trị."),
            numberOfSeatsAvailable: yup
                .number()
                .required("Số chỗ còn trống phải có giá trị."),
        });
        return {
            doctorLocal: this.doctor,
            doctorFormSchema,
        };
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>