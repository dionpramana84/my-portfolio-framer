import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useToast } from "../use-toast";
import Project from "@/models/Project";
import GenericOmittedFields from "@/models/GenericOmittedFields";
import { format, formatISO } from "date-fns";
import { ROLE_TYPE } from "@/components/constant";

export type ProjectSubmission = Omit<Project, GenericOmittedFields>;
const fetchProjects = async (role_type?: ROLE_TYPE): Promise<Project[]> => {
  let q;

  if (role_type) {
    q = query(
      collection(db, "projects"),
      orderBy("start_date", "desc"),
      where("role_type", "==", role_type)
    );
  } else {
    q = query(collection(db, "projects"), orderBy("start_date"));
  }

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
    start_date: data.start_date ? data.start_date : null,
    end_date: data.end_date ? data.end_date : null,
  } as Project;
};

const createProject = async (submission: ProjectSubmission) => {
  const timestamp = formatISO(new Date());
  await addDoc(collection(db, "projects"), {
    ...submission,
    start_date: submission.start_date
      ? format(submission.start_date, "yyyy-MM-dd'T'HH:mm:ssXXX")
      : null,
    end_date: submission.end_date
      ? format(submission.end_date, "yyyy-MM-dd'T'HH:mm:ssXXX")
      : null,
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
      ? format(updatedData.start_date, "yyyy-MM-dd'T'HH:mm:ssXXX")
      : null,
    end_date: updatedData.end_date
      ? format(updatedData.end_date, "yyyy-MM-dd'T'HH:mm:ssXXX")
      : null,
    updated_at: timestamp,
  });
};

const deleteProject = async (id: string) => {
  await deleteDoc(doc(db, "projects", id));
};

const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Image upload failed");

  return {
    url: data.url,
    public_id: data.public_id,
  };
};

const deleteImageFromCloudinary = async (public_id: string | null) => {
  if (!public_id) return;
  await fetch("/api/delete-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id }),
  });
};

const processImages = async (
  newImages: ProjectSubmission["images"],
  prevImages: ProjectSubmission["images"] = []
) => {
  const uploadTasks = newImages?.map(async (image, index) => {
    const prev = prevImages?.[index];

    if (image?.url?.startsWith("data:image/")) {
      const blob = await fetch(image.url).then((res) => res.blob());
      const file = new File([blob], `image-${index}.jpg`, { type: blob.type });

      if (prev?.public_id) await deleteImageFromCloudinary(prev.public_id);

      const uploaded = await uploadImageToCloudinary(file);

      return {
        url: uploaded.url,
        public_id: uploaded.public_id,
        is_thumbnail: image.is_thumbnail || false,
      };
    }

    return {
      url: image?.url || null,
      public_id: image?.public_id || null,
      is_thumbnail: image?.is_thumbnail || false,
    };
  });

  const uploadedImages = uploadTasks ? await Promise.all(uploadTasks) : [];

  const removedImages = prevImages?.filter(
    (prev) => !newImages?.find((img) => img?.public_id === prev.public_id)
  );

  if (removedImages) {
    await Promise.all(
      removedImages.map((img) =>
        deleteImageFromCloudinary(img.public_id ?? null)
      )
    );
  }
  return uploadedImages;
};

export default function useProjects(params: { role_type?: ROLE_TYPE }) {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutate, setMutate] = useState(true);

  const roleType = params.role_type;

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProjects(roleType);
      setProjects(data);
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
  }, [roleType, toast]);

  useEffect(() => {
    if (mutate) getProjects();
  }, [getProjects, mutate]);

  const onCreate = useCallback(
    async (submission: ProjectSubmission) => {
      setLoading(true);
      try {
        const images = await processImages(submission.images || []);

        const formattedSubmission: Omit<
          Project,
          "id" | "created_at" | "updated_at"
        > = {
          ...submission,
          images,
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
    },
    [toast]
  );

  const onDelete = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const projectToDelete = await fetchProjectById(id);

        if (projectToDelete?.images?.length) {
          await Promise.all(
            projectToDelete.images.map(async (image) => {
              if (image.public_id) {
                await fetch("/api/delete-image", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ public_id: image.public_id }),
                });
              }
            })
          );
        }

        await deleteProject(id);
        setMutate((prev) => !prev);
        toast({
          title: "Project deleted successfully!",
        });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error deleting project!",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  return useMemo(
    () => ({
      projects,
      loading,
      onCreate,
      onDelete,
    }),
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
  }, [id, toast]);

  useEffect(() => {
    if (mutate || id) getProject();
  }, [getProject, mutate, id]);

  const onUpdate = useCallback(
    async (
      id: string,
      submission: ProjectSubmission,
      prevImages: ProjectSubmission["images"] = []
    ) => {
      setLoading(true);
      try {
        const images = await processImages(submission.images || [], prevImages);
        const formattedSubmission = {
          ...submission,
          start_date: submission.start_date ? submission.start_date : null,
          end_date: submission.end_date ? submission.end_date : null,
          images,
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
    [toast]
  );

  return useMemo(
    () => ({ project, loading, getProject, onUpdate }),
    [project, loading, getProject, onUpdate]
  );
}
