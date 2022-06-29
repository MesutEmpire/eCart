import {auth, db, functions} from "@/Firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'
import { UserSignUp} from "@/Structure/struct";
import { defineStore } from 'pinia'
import {
    onSnapshot,
    doc,
    setDoc,
    updateDoc,query,where,collection
} from "firebase/firestore";
import router from "@/router";
import {httpsCallable} from "firebase/functions";
export const  UserAuthStore = defineStore('userAuth', {
    state: () => ({
        user: null,
        authIsReady: false,
        authError: null,
        signInForm: {
            firstname: "",
            lastname: "",
            phoneNumber: null,
            email: "",
            password: "",
            confirmPassword: "",
            photoUrl:'http://www.example.com/12345678/photo.png'
        } as UserSignUp,
        userAdmin : false,
        userSuper:false,
        currentUser:null,
    }),
    getters: {
        getUser(state: any) {
            return state.user
        },
        getUserAdmin(state: any) {
            return state.userAdmin
        },
        getUserSuper(state: any) {
            return state.userSuper
        },
        getAuthIsReady(state: any) {
            return state.authIsReady
        },
        getCurrentUser(state: any) {
            return state.currentUser

        },
        getAuthError(state: any) {
            return state.authError
        },

    },
    actions: {
        signUp() {
            const signUp = httpsCallable(functions,'signUp')
            signUp(this.signInForm)
                .then((result)=>{
                    const detailsLogin :any = result.data
                    // console.log(result.data.email)
                    // console.log(result.data.password)
                    this.logIn(detailsLogin.email,detailsLogin.password)
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
            // createUserWithEmailAndPassword(auth,this.signInForm.email, this.signInForm.password)
            //     .then(res => {
            //         this.user = res.user
            //         try {
            //             if (auth.currentUser) {
            //                 updateProfile(auth.currentUser, {
            //                     displayName: `${this.signInForm.firstname} ${this.signInForm.lastname}`,
            //                     // photoURL: "https://example.com/jane-q-user/profile.jpg"
            //                 }).then(() => {
            //                     console.log("Profile Updated")
            //                 }).catch((error) => {
            //                     console.log(error.message)
            //                 });
            //             }
            //             // setDoc(doc(db, "users", res.user.uid), {
            //             //     firstname: this.signInForm.firstname,
            //             //     lastname: this.signInForm.lastname,
            //             //     phoneNumber: this.signInForm.phoneNumber,
            //             //     email: this.signInForm.email,
            //             //     password: this.signInForm.password,
            //             //     created : res.user.metadata.creationTime,
            //             //     level:"user",
            //             // });
            //             router.push('/')
            //         } catch (err) {
            //             this.authError = err
            //         }
            //
            //     })
            //
            //
            //     .catch((err) => this.authError = err.message)

        },
        logIn(email?:any,password?:any) {

            signInWithEmailAndPassword(auth, this.signInForm.email, this.signInForm.password)
                .then((res) => {
                    router.push('/SuperUser/')
                    router.beforeEach((to, from, next) => {
                        if (to.name == 'SuperUser' && this.userAdmin == false  && this.userSuper == false) next({ name: 'home' })
                        else next()

                    })

                    this.user = res.user
                    console.log(res.user)

                })
                .then(()=>{
                    const currentUserQuery = query(collection(db,'users'),where('uid','==',this.user.uid))
                    onSnapshot(currentUserQuery,(snapshot)=> {
                        snapshot.docs.forEach((doc)=>{
                            console.log(doc.data())
                            this.currentUser =    doc.data()
                        })
                        console.log( this.currentUser )
                    })
                    console.log( this.currentUser )
                })
                .catch(err => {
                    this.authError = err.message
                })


            console.log( this.currentUser )

        },
        logOut() {
            signOut(auth)
                .then(res => {
                        this.user = null
                         this.userAdmin = false
                        router.push('/')
                    }
                )
                .catch(err => this.authError = err.message)
        },
        authState() {
            onAuthStateChanged(auth,(user:any) => {
                user?.getIdTokenResult()
                    .then((idTokenResult:any) =>{
                        this.userAdmin = false
                        this.userSuper = false

                        if(idTokenResult.claims.superuser == true){
                           this.userSuper = true
                        }
                        else if(idTokenResult.claims.admin == true){
                            this.userAdmin = true
                        }

                    })
                    .then(()=>{
                        console.log(this.userAdmin,this.userSuper )
                    })
                this.authIsReady = true
                this.user = user

            })


        },
   }
})
