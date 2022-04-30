<template>
    <nav class="navbar navbar-expand navbar-white bg-white">
        <a href="/"><img src="/images/logo.jpg"></a>
        <div class="navbar-nav">
            <router-link :to="{name: 'doctor'}" 
                class="nav-item nav-link font">Trang chủ</router-link>
        </div>
        <div class="navbar-nav">
            <router-link :to="{name: 'doctor.feedback'}" 
                class="nav-item nav-link font">Liên hệ</router-link>
        </div>
    </nav>
</template>
