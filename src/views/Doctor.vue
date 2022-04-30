<template>
    <div class="row">
        <div class="col-md-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h3>
                Danh Sách Bác Sĩ
                <i class="fa-solid fa-user-doctor "></i>
            </h3>
            <DoctorList
                v-if="filteredDoctorsCount > 0"
                :doctors="filteredDoctors"
                :isAdmin="isAdmin"
            />
            <p v-else>Không có Bác sĩ nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary p-2" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button v-if="isAdmin" class="btn btn-sm btn-success" @click="goToAddDoctor">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button v-if="isAdmin"
                    class="btn btn-sm btn-danger"
                    @click="removeAllDoctors"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
                
                <a href="http://localhost:8081#detailsUser">
                    <button v-if="isAdmin" class="btn btn-sm btn-primary" @click="showListUserRegs">
                        <i class="fa-solid fa-clipboard-list"></i> DS bệnh nhân đặt lịch khám
                    </button>
                </a>

                <a href="http://localhost:8081#loginAdmin">
                    <button @click="setLogin" v-if="!isAdmin" class="btn btn-sm btn-success p-2">
                            <i class="fa-solid fa-lock"></i> Đăng Nhập
                    </button>
                </a>
                

                <button @click="setLogout" v-if="isAdmin" class="btn btn-sm btn-danger p-2">
                    <i class="fa-solid fa-right-from-bracket"></i> Đăng Xuất
                </button>
                
            </div>
        </div>
        

        <!-- DE HIEN THI DANH SACH NGUOI DUNG DA DAT LICH KHÁM -->
        <div class="mt-3 border" id="detailsUser">
            <div v-if="isShowListUser" class="boder p-3">
                <h4 class="text-center m-4">
                    DANH SÁCH BỆNH NHÂN ĐẶT LỊCH KHÁM
                </h4>

                <div>
                    <div
                        class="col-3 mt-3 mb-3 floatLeft"
                        v-for="regUserInfo in regUserInfos"
                        :key="regUserInfo.name"
                    >
                            <div class="regUserListItem p-2">
                                <h5 class="text-center">BN: {{ regUserInfo.nameUser }}</h5>
                                <h5 class="text-center">SĐT: {{ regUserInfo.phoneUser }}</h5>
                                <h5 class="text-center">TGĐK: {{ regUserInfo.timeUserReg }}</h5>
                                <hr>
                                <h5 class="text-center">{{ regUserInfo.name }}</h5>
                                <h5 class="text-center">{{ regUserInfo.position }}</h5>
                                <h5 class="text-center">Trình độ: {{ regUserInfo.educationLevel }}</h5>
                                <h5 class="text-center">Kinh nghiệm: {{ regUserInfo.experience }}</h5>
                            </div>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>

        <!-- FORM NHAP THONG TIN DANG NHAP (Chi ADMIN) -->
        <form id="loginAdmin" v-if="isLogin" class="login mt-3" @submit.prevent="accountVerification">
            <h2 class="p-3">Đăng nhập</h2>
            <div class="container">
                <div class="row log">
                    <div class="col">
                        <i class="fa-solid fa-user-tie fa-2xl"></i>
                        <label for="name" class="mw h6 m-3">Tài Khoản:</label>
                    </div>
                    <div class="col-8">
                        <input type="text" id="name" v-model="nameAdmin">
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-key fa-2xl"></i>
                        <label for="name" class="mw h6 m-3">Mật Khẩu:</label>
                    </div>
                    <div class="col-8">
                        <input type="password" id="pw" v-model="pwAdmin">
                    </div>
                </div>
            </div>
            <button type="submit" class="m-3 btn btn-sm btn-success">Đăng nhập</button><br />
            <h5 class="p-3 yellow">{{message}}</h5>
	    </form>

    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import DoctorList from "@/components/DoctorList.vue";
import DoctorService from "@/services/doctor.service";

export default {
    components: {
        InputSearch,
        DoctorList,
    },

    data() {
        return {
            doctors: [],
            regUserInfos: [],
            searchText: "",
            
            isShowListUser: false,

            isCheck: false, // bien tam de luu trang thai dang nhap hay chưa
            isLogin: false, // bat su kien click nut dang nhap
            isAdmin: false, // nguoi dung chua dang nhap
            message: "Đăng nhập thất bại",
            nameAdmin: "",
			pwAdmin: "",
			accountAdmin:{
				name: "admin",
				pw: "admin",
			},
        };
    },

    computed: {
        // Chuyển các đối tượng doctor thành chuỗi để tiện cho tìm kiếm.
        doctorStrings() {
            return this.doctors.map((doctor) => {
                const { name, email, address, phone } = doctor;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các doctor có chứa thông tin cần tìm kiếm.
        filteredDoctors() {
            if (!this.searchText) return this.doctors;
            return this.doctors.filter((doctor, index) =>
                this.doctorStrings[index].includes(this.searchText)
            );
        },
 
        filteredDoctorsCount() {
            return this.filteredDoctors.length;
        },

        accountVerification(){
			if(this.accountAdmin.name === this.nameAdmin && this.accountAdmin.pw === this.pwAdmin){
				this.isAdmin = true;
				this.message = "";
                this.isLogin = false;
                this.$router.push({ name: "doctor" });
			}
			else {
				this.isAdmin = false;
				this.message = "Đăng nhập thất bại";
				this.nameAdmin = "";
				this.pwAdmin = "";
			}
		}
    },
    methods: {
        async retrieveDoctors() {
            try {
                this.doctors = await DoctorService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveRegUserInfos() {
            try {
                this.regUserInfos = await DoctorService.getAllUser();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveDoctors();
        },

        showListUserRegs() {
            this.retrieveRegUserInfos();
            this.isShowListUser = true;
        },

        setLogin(){
            this.isLogin = true;
        },

        async removeAllDoctors() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await DoctorService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddDoctor() {
            this.$router.push({ name: "doctor.add" });
        },

        setLogout() {
            this.isAdmin = false;
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
