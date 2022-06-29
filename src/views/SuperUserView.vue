<template>
  <NavBar></NavBar>
  <div class="grid grid-cols-6">
    <div><SideBar></SideBar></div>
    <div class="col-span-5"> <router-view></router-view> </div>
  </div>


</template>

<script>
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
// import DashBoard from "@/components/DashBoard"
export default {
  name: "SuperUserView.vue",
  components: { NavBar, SideBar}

}
</script>

<style scoped>

</style>