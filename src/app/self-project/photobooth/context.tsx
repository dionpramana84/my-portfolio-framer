"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type PhotoBoothContextType = {
  email: string;
  // eslint-disable-next-line no-unused-vars
  setEmail: (email: string) => void;
  grid: number;
  // eslint-disable-next-line no-unused-vars
  setGrid: (grid: number) => void;
  gridType: string;
  // eslint-disable-next-line no-unused-vars
  setGridType: (gridType: string) => void;
  step: number;
  // eslint-disable-next-line no-unused-vars
  setStep: (step: number) => void;
  photos: string[];
  // eslint-disable-next-line no-unused-vars
  setPhotos: (photos: string[]) => void;
};

const PhotoBoothContext = createContext<PhotoBoothContextType | undefined>(
  undefined
);

export const PhotoBoothProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");
  const [grid, setGrid] = useState<number>(0);
  const [gridType, setGridType] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [photos, setPhotos] = useState<string[]>([]);

  return (
    <PhotoBoothContext.Provider
      value={{
        email,
        setEmail,
        grid,
        setGrid,
        gridType,
        setGridType,
        step,
        setStep,
        photos,
        setPhotos,
      }}
    >
      {children}
    </PhotoBoothContext.Provider>
  );
};

export const usePhotoBooth = () => {
  const context = useContext(PhotoBoothContext);
  if (!context) {
    throw new Error("usePhotoBooth must be used within a PhotoBoothProvider");
  }
  return context;
};
