import {auth} from "@/Firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {UserSignUp} from "@/Structure/struct";
import store from "@/store/index";

export const  UserAuth = {
    namespaced : true,
    state: {
        user:null,
        authIsReady : false,
    },
    getters: {
        getUser(state:any){
            return state.user
        },
        getAuthIsReady(state:any){
            return state.authIsReady
        }
    },
    mutations: {
        setUser(state:any,payload:any){
            state.user = payload
            console.log('user state changed:',state.user)
        },
        setAuthIsReady(state:any,payload:any){
            state.authIsReady = payload
        }
    },
    actions: {
        signUp(context: any, payload: UserSignUp) {
            createUserWithEmailAndPassword(auth, payload.email, payload.password)
                .then((res) => {
                    console.log(res)
                    context.commit("setUser", res.user)
                })
                .catch((err) => console.log(err))

        },
        logIn(context: any, payload: any) {
            console.log(payload.email)
            console.log(payload.password)
            signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then((res) => {
                    console.log(res)
                    context.commit("setUser", res.user)
                })
                .catch(err => {
                    throw new Error(err)
                })

        },
        logOut(context: any) {
            signOut(auth)
                .then(res => context.commit('setUser', null))
                .catch(err => console.log(err))
        },



    },


    modules: {}

}
const unsub = onAuthStateChanged(auth,(user) => {
    console.log("true")
    console.log(user)
    store.commit('UserAuth/setAuthIsReady',true)
    store.commit('UserAuth/setUser',user)
    unsub()
})