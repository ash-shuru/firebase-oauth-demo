// Firebase auth helper

// import * as SecureStore from 'expo-secure-store';
import {getApps, initializeApp} from 'firebase/app';
import {getAuth, OAuthProvider, signInWithCustomToken, signInWithRedirect} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MSG_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export async function getFirebaseToken(username: string, password: string) {
    const response = await fetch('https://dev-id.rnpn.gob.sv/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });
    const {firebaseToken} = await response.json();
    return firebaseToken as string;
}

export async function loginWithCustomToken(token: string) {
    const result = await signInWithCustomToken(auth, token);
    //    //Set token in secure storage
    //    await SecureStore.setItemAsync('firebaseToken', token);
    return result.user;
}

export async function federatedSignIn() {
    const provider = new OAuthProvider('dev-id.rnpn.gob.sv'); // TODO: Get actual dui provider id
    provider.setCustomParameters({
        // we can pass extra data here
    });
    return signInWithRedirect(getAuth(), provider);
} 
