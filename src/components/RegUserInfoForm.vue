<template>
    <Form class="border"
        @submit="$emit('submit:doctor', doctorLocal)"
        :validation-schema="doctorFormSchema"
    >

        <div class="form-group">
            <label for="">Tên Bác Sĩ</label>
            <Field
                name="name" disabled
                type="text"
                class="form-control"
                v-model="doctorLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="">Chức Vụ</label>
            <Field
                name="position" disabled
                type="text"
                class="form-control"
                v-model="doctorLocal.position"
            />
            <ErrorMessage name="position" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="">Trình độ</label>
            <Field
                name="educationLevel" disabled
                type="text"
                class="form-control"
                v-model="doctorLocal.educationLevel"
            />
            <ErrorMessage name="educationLevel" class="error-feedback" />
        </div>
    
        <div class="form-group">
            <label for="">Kinh nghiệm</label>
            <Field
                name="experience" disabled
                type="text"
                class="form-control"
                v-model="doctorLocal.experience"
            />
            <ErrorMessage name="experience" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="">Tên Của Bạn</label>
            <Field
                name="nameUser"
                type="text"
                class="form-control"
                v-model="doctorLocal.nameUser"
            />
            <ErrorMessage name="nameUser" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="">Số điện thoại</label>
            <Field
                name="phoneUser"
                type="text"
                class="form-control"
                v-model="doctorLocal.phoneUser"
            />
            <ErrorMessage name="phoneUser" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="">Thời gian đặt hẹn</label>
            <Field
                name="timeUserReg"
                type="text"
                class="form-control"
                v-model="doctorLocal.timeUserReg"
                placeholder="Thời gian làm việc từ 9:00 đến 19:00, thời gian đặt hẹn là 1h, ví dụ bạn chọn: 10:00 đến 11:00"
            />
            <ErrorMessage name="timeUserReg" class="error-feedback" />
        </div>
        

        <div class="form-group">
            <button class="btn btn-primary m-3">Đăng ký</button>
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
    emits: ["submit:doctor"],
    props: {
        doctor: { type: Object, required: true }
    },
    data() {
        const doctorFormSchema = yup.object().shape({
            nameUser: yup
                .string()
                .required("Tên của bạn phải có giá trị."),
            phoneUser: yup
                .string()
                .required("Số điện thoại phải có giá trị."),
            timeUserReg: yup
                .string()
                .required("Thời gian phải có giá trị.")
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