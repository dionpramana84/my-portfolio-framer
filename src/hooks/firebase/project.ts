import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useToast } from "../use-toast";
import Project from "@/models/Project";
import GenericOmittedFields from "@/models/GenericOmittedFields";
import { formatISO, parseISO } from "date-fns";

export type ProjectSubmission = Omit<Project, GenericOmittedFields>;

const fetchProjects = async (): Promise<Project[]> => {
  const q = query(collection(db, "projects"));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return [];
  }
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
};

const fetchProjectById = async (id: string): Promise<Project | null> => {
  const projectRef = doc(db, "projects", id);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return null;
  }

  const data = projectSnap.data();
  return {
    id: projectSnap.id,
    ...data,
    start_date: data.start_date ? parseISO(data.start_date) : null,
    end_date: data.end_date ? parseISO(data.end_date) : null,
  } as Project;
};

const createProject = async (submission: ProjectSubmission) => {
  const timestamp = formatISO(new Date());
  await addDoc(collection(db, "projects"), {
    ...submission,
    start_date: submission.start_date ? formatISO(submission.start_date) : null,
    end_date: submission.end_date ? formatISO(submission.end_date) : null,
    created_at: timestamp,
    updated_at: timestamp,
  });
};

const updateProject = async (
  projectId: string,
  updatedData: Partial<ProjectSubmission>
) => {
  const timestamp = formatISO(new Date());
  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, {
    ...updatedData,
    start_date: updatedData.start_date
      ? formatISO(updatedData.start_date)
      : null,
    end_date: updatedData.end_date ? formatISO(updatedData.end_date) : null,
    updated_at: timestamp,
  });
};

const deleteProject = async (id: string) => {
  await deleteDoc(doc(db, "projects", id));
};

export default function useProjects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutate, setMutate] = useState(true);

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      toast({
        title: "Error fetching rpoject",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setMutate(false);
    }
  }, []);

  useEffect(() => {
    if (mutate) getProjects();
  }, [getProjects, mutate]);

  const onCreate = useCallback(async (submission: ProjectSubmission) => {
    setLoading(true);
    try {
      const formattedSubmission: Omit<
        Project,
        "id" | "created_at" | "updated_at"
      > = {
        ...submission,
        start_date: submission.start_date
          ? new Date(submission.start_date)
          : null,
        end_date: submission.end_date ? submission.end_date : null,
      };

      await createProject(formattedSubmission);
      setMutate((prev) => !prev);
      toast({
        title: "Project created successfully!",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error creating project",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }, []);

  const onDelete = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await deleteProject(id);
      setMutate((prev) => !prev);
      toast({
        title: "Project deleted successfully!",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error delete project!",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }, []);

  return useMemo(
    () => ({ projects, loading, onCreate, onDelete }),
    [projects, loading, onCreate, onDelete]
  );
}

export function useProject({ id }: { id: string }) {
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutate, setMutate] = useState(true);

  const getProject = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchProjectById(id);
      setProject(data);
    } catch (error) {
      toast({
        title: "Error fetching project",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setMutate(false);
    }
  }, [id]);

  useEffect(() => {
    if (mutate || id) getProject();
  }, [getProject, mutate, id]);

  const onUpdate = useCallback(
    async (id: string, submission: ProjectSubmission) => {
      setLoading(true);
      try {
        const formattedSubmission = {
          ...submission,
          start_date: submission.start_date ? submission.start_date : null,
          end_date: submission.end_date ? submission.end_date : null,
        };
        await updateProject(id, formattedSubmission);
        setMutate((prev) => !prev);
        toast({
          title: "Project updated successfully!",
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error updating project",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    []
  );

  return useMemo(
    () => ({ project, loading, getProject, onUpdate }),
    [project, loading, getProject, onUpdate]
  );
}
