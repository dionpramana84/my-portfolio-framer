import { db } from "@/lib/firebase/config";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  query,
} from "firebase/firestore";
import { useEffect, useState, useCallback, useMemo } from "react";
import UserProfile from "@/models/UserProfile";
import { useToast } from "../use-toast";

const fetchUserProfile = async (): Promise<UserProfile | null> => {
  const q = query(collection(db, "user-profile"));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as UserProfile;
};

const createUserProfile = async (profile: UserProfile) => {
  const timestamp = new Date().toISOString();
  await addDoc(collection(db, "user-profile"), {
    ...profile,
    created_at: timestamp,
    updated_at: timestamp,
  });
};

const updateUserProfile = async (id: string, submission: UserProfile) => {
  const docRef = doc(db, "user-profile", id);
  await updateDoc(docRef, {
    ...submission,
    updated_at: new Date().toISOString(),
  });
};

const deleteUserProfile = async (id: string) => {
  await deleteDoc(doc(db, "user-profile", id));
};

export default function useUserProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutate, setMutate] = useState(true);

  const getUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUserProfile();

      setProfile(data);
    } catch (error) {
      toast({
        title: "Error fetching profile",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setMutate(false);
    }
  }, [toast]);

  useEffect(() => {
    if (mutate) getUserProfile();
  }, [getUserProfile, mutate]);

  const onCreate = useCallback(
    async (profile: UserProfile) => {
      setLoading(true);
      try {
        await createUserProfile(profile);
        setMutate((prev) => !prev);
        toast({
          title: "Profile created successfully!",
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error creating profile",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const onUpdate = useCallback(
    async (id: string, submission: UserProfile) => {
      setLoading(true);
      try {
        await updateUserProfile(id, submission);
        setMutate((prev) => !prev);
        toast({
          title: "Profile updated successfully!",
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error updating profile",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const onDelete = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await deleteUserProfile(id);
        setMutate((prev) => !prev);
        toast({
          title: "Profile deleted successfully!",
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error deleting profile",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  return useMemo(
    () => ({ profile, loading, onCreate, onUpdate, onDelete }),
    [profile, loading, onCreate, onUpdate, onDelete]
  );
}
