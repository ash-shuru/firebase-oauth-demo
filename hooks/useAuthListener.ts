// useAuth.ts
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import * as AuthSession from "expo-auth-session";
import {useEffect, useState} from "react";

const _backendUrl = "https://mf.com/auth/exchange"; // TODO:
const _auth0endPoint = 'https://api.example.com/auth/login';// TODO: Auth0 endpoint

export const useAuthListener = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const redirectUri = AuthSession.makeRedirectUri({
    path: "auth", // ===> firebaseoauthdemo://auth (configured in app.json)
  });
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "", // TODO:
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      scopes: ["openid", "profile", "email"],
    },
    {
      authorizationEndpoint: _auth0endPoint,
    }
  );

  useEffect(() => {
    const handleAuth = async () => {
      console.log('RESPONESE', response);
      /**
       * TODO: Either we'll get the token itself or a code to be exchanged
       * for a token. If the token is received here,
       * no need for the API call to the backend.
       */
      if (response?.type === "success" && response.params?.code) {
        try {
          const code = response.params.code;
          // Exchange code for Firebase custom token
          const res = await fetch(_backendUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({code, redirectUri}),
          });
          const {firebaseToken} = await res.json();

          // Sign in with Firebase
          await auth().signInWithCustomToken(firebaseToken);
          /**
           * TODO: 'signInWithCredential' is most likely for built-in auth
           * providers (google, apple...). Since we're not using those,
           * 'signInWithCustomToken' should work here.
           */
        } catch (err) {
          console.error("OAuth flow failed:", err);
        }
      }
    };
    handleAuth();
  }, [redirectUri, response]);

  // Auth state listener.
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return {
    user, federatedSignIn: async () => {
      if (request) {
        await promptAsync();
      };
    }
  };
}
