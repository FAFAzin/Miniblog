
import {db} from '../firebase/config'; 

import {
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    signOut
} from 'firebase/auth';

import {useState, useEffect} from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak 
    const [cancelled, setCancelled] = useState();

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    const createUser =  async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        //tratando erros
        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth, 
                data.email,
                data.password
            )
            await updateProfile(user, {displayName: data.displayName
            })

            setLoading(false)

            return user
        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessenger

            if (error.message.includes('Password')) {
                systemErrorMessenger = 'A senha precisa conter pelo menos 6 dígitos.'

            } else if (error.message.includes('email-already')) {
                systemErrorMessenger = 'email já cadastrado.'
            } else {
                systemErrorMessenger = 'ocoreu um erro inesperado, tente novamente mais tarde.'

            }
            setLoading(false)

            setError(systemErrorMessenger)
        }

    };

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth, 
        createUser, 
        error, 
        loading
    }
};