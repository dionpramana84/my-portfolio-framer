import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useToast } from "../use-toast";
import { useRouter } from "next/navigation";

export interface UserSignInWithEmailAndPassword {
  email: string;
  password: string;
}

export default function useUserSession() {
  const { toast } = useToast();
  const router = useRouter();

  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);
  const [mutate, setMutate] = useState(true);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    if (mutate) return () => unsubscribe();
  }, [mutate]);

  const onSignIn = useCallback(
    async (submission: UserSignInWithEmailAndPassword) => {
      setLoading(true);
      try {
        const { email, password } = submission;

        const response = await signInWithEmailAndPassword(email, password);
        if (!response?.user.email) {
          throw new Error("Invalid user");
        }
        localStorage.setItem("user", JSON.stringify(response.user.uid));
        setMutate((prev) => !prev);
        toast({
          title: "Login success!",
          description: `Welcome, ${response.user.email}`,
        });
        router.push("/dashboard");
      } catch (error) {
        setLoading(false);
        toast({
          title: "Login failed!",
          description: `${error}`,
          variant: "destructive",
        });
      }
    },
    [signInWithEmailAndPassword, toast, router]
  );

  const onLogOut = useCallback(async () => {
    setLoading(true);
    try {
      await signOut(auth);

      setMutate((prev) => !prev);
      toast({
        title: "Logout success!",
      });
      router.push("/auth");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Logout failed!",
        description: `${error}`,
        variant: "destructive",
      });
    }
  }, [toast, router]);

  return { user, onSignIn, onLogOut, loading };
}
