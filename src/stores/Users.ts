import { defineStore } from 'pinia'
import {db,functions} from "@/Firebase/config";
import {
    collection,
    getDocs,
    onSnapshot
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import {IUsers} from "@/Structure/struct";


export const  UserStore = defineStore('users', {
    state: ()=>({
        users : null,
        makeAdmin:false,
        userSelected:null,
        searchedUser:null,
        foundSearchedUser:null,
        deleteMultipleUsers : []
    }),
    getters: {
        getUsers(state:any){
            if(state.foundSearchedUser){
                return state.foundSearchedUser
            }
                return state.users

        },
        getNumberOfUsers(state:any){
            console.log(typeof (state.users))
            if (state.users.length == 0 ){
                return null
            }
            else{
                return state.users.length
            }


        },
        getMakeAdmin(state:any){
            return state.makeAdmin
        },
        getUserSelected(state:any){
            return state.userSelected
        }
    },
    actions: {
        showAllUsers(){
              onSnapshot(collection(db,'users'),(snapshot)=>{
                // this.users =[]
                // snapshot.docs.map((doc)=>{
                //             this.users.push({...doc.data(),id:doc.id})
                // })
                  this.users = snapshot.docs.map((doc)=>{
                   return  {...doc.data()}
                  })
                console.log(this.users)
            })
        },
        showMakeAdmin(payload:string){
            this.userSelected = payload
            this.makeAdmin = !this.makeAdmin
            if(this.makeAdmin == false){
                this.userSelected = null
            }

        },
        makeUserAdmin(payload:any){
            console.log(payload)
            const addAdminRole = httpsCallable(functions,'addAdminRole')
            addAdminRole({
                email : payload
            })
                .then((result)=>{

                    console.log(result.data)
                })
                .catch((error) => {
                    // Getting the Error details.
                    const code = error.code;
                    const message = error.message;
                    const details = error.details;
                    console.log(code)
                    console.log(message)
                    console.log(details)


        })

    },
        makeSuperUser(payload:any){
            console.log(payload)
            const addSuperRole = httpsCallable(functions,'addSuperRole')
            addSuperRole({
                email : payload
            })
                .then((result)=>{

                    console.log(result.data)
                })
                .catch((error) => {
                    // Getting the Error details.
                    const code = error.code;
                    const message = error.message;
                    const details = error.details;
                    console.log(code)
                    console.log(message)
                    console.log(details)


                })

        },
        deleteThisUser(payload:string){
            console.log(payload)
            const deleteUser = httpsCallable(functions,'deleteUser')
            deleteUser({
                uid : payload
            })
                .then((result)=>{

                    console.log(result.data)
                })
                .catch((error) => {
                    // Getting the Error details.
                    const code = error.code;
                    const message = error.message;
                    const details = error.details;
                    console.log(code)
                    console.log(message)
                    console.log(details)


                })

        },
        searchUser(){
           if(this.searchedUser != null ){
               this.foundSearchedUser = this.users.filter((user:any) => user.fullName.toLowerCase().includes(this.searchedUser.toLowerCase())
               );
               console.log(this.foundSearchedUser)
               console.log(this.searchedUser)
           }
           },
        deleteMultipleUser(payload:[]){
            console.log(payload)
            console.log(payload.length)
            if(payload.length > 0 ){
                const deleteMultipleUsers = httpsCallable(functions,'deleteMultipleUsers')
                deleteMultipleUsers({
                    users : payload
                })
                    .then((result)=>{
                       this.deleteMultipleUsers = []
                        console.log(result.data)
                    })
                    .catch((error) => {
                        // Getting the Error details.
                        const code = error.code;
                        const message = error.message;
                        const details = error.details;
                        console.log(code)
                        console.log(message)
                        console.log(details)


                    })
            }


        },
    }

})