<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<template>
    <div class="text-center row p-3">
        <div class="col-9">
            <label for="textInput" class="h4"> Tìm kiếm </label>
            <input id="textInput" placeholder="Tìm Bác Sĩ, Chuyên Khoa Điều Trị, Triệu Chứng Bệnh..." class="inputSearchTravel"

                type="text"
                :value="modelValue"
                @input="updateModelValue"
                @keyup.enter="submit"
            >   
        </div>
        <div class="col">
            <button
                class="btn btn-outline-success my-2 my-sm-0 input"
                type="button"
                @click="submit"
            >
                <i class="fas fa-search"></i> Tìm kiếm 
            </button>
        </div>  
    </div>
</template>