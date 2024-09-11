export const calculateBMI = (
  weightInKG: string | undefined | null,
  heightInCM: string | undefined | null
): number => {
  if (!heightInCM || !weightInKG) {
    return 0;
  }
  const height = parseFloat(heightInCM) / 100;
  return parseFloat(weightInKG) / (height * height);
};
