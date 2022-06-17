<template>

  <div class="lg:max-w-2xl mx-auto bg-white md:max-w-xl sm:max-w-lg p-7 lg:p-16">

    <div class="p-4   rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
      <div class="flex justify-center "><img src="../assets/logo.png" class="mr-3 h-16 lg:h-24 object-fill "
                                             alt="Food Palace Logo"></div>
      <div class="flex justify-center text-2xl lg:text-4xl  my-7 mb-14 font-bold ">
        Create Account
      </div>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-6 lg:grid-cols-2 ">

          <div class="relative ">
            <input type="text" id="first_name" v-model="form.firstname"
                   class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required />
            <label for="first_name"
                   class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              First Name</label>
          </div>


          <div class="relative ">
            <input type="text" id="last_name" v-model="form.lastname"
                   class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required />
            <label for="last_name"
                   class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Last Name</label>
          </div>

          <div class="relative mb-6">
            <input type="tel" id="phone" v-model="form.phoneNumber"
                   class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required />
            <label for="phone"
                   class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Phone Number</label>
          </div>

        </div>

        <div class="relative mb-6">
          <input type="email" id="email" v-model="form.email"
                 class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label for="email"
                 class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Email Address</label>
        </div>
        <div class="relative mb-6">
          <input type="password" id="password" v-model="form.password"
                 class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label for="password"
                 class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            New Password</label>
        </div>
        <div class="relative mb-6">
          <input type="password" id="confirm_password" v-model="form.confirmPassword"

                 class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label for="confirm_password"

                 class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm
            Password</label>
        </div>
<!--        <div v-if="hasError.displayError"-->
<!--             class="p-4 mb-4 text-sm lg:text-base text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"-->
<!--             role="alert">-->
<!--          <span class="font-medium">Incorrect! Password </span> Try Again-->
<!--        </div>-->

<!--        <div v-if="correctPass.displaySuccess"-->
<!--             class="p-4 mb-4 text-sm lg:text-base text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"-->
<!--             role="alert">-->
<!--          <span class="font-medium">Success </span> Account Created-->
<!--        </div>-->


        <button type="submit" @click="submitData"
                class="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-500 font-medium rounded-lg text-sm lg:text-base w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
      </form>
    </div>
  </div>
  <div v-if="error">
    {{error}}
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {useStore} from "vuex";
import {UserSignUp} from "@/Structure/struct";
import router from "@/router";


export default defineComponent({
  name: "SignUp",
  setup(){
    const form : UserSignUp = reactive({
      firstname: "",
      lastname: "",
      phoneNumber: 0,
      email: "",
      password: "",
      confirmPassword: "",
    })
    const error = ref(null)

    const store = useStore()

    const submitData = async ()=>{
      try{
        await store.dispatch('UserAuth/signUp',form)
        // router.push('/')
      }
      catch(err:any){
        error.value = err.message
        console.log(err.message)
      }
    }


    return{
      form,
      submitData,
      store,
      error
    }
  }
})
</script>

<style scoped>

</style>