import {onAuthStateChanged, User} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {auth} from '../lib/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return unsubscribe;
  }, []);

  return user;
}