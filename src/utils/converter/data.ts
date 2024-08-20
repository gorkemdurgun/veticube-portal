import { speciesList } from "@/constants/species";

export const getSpecies = (species?: string): string => {
  if (!species) return "";
  return speciesList[species];
};
