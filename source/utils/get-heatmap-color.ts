export const getHeatmapColor = (value: number): number => {
  if (!value) return 0;
  if (value <= 200) {
    return 200;
  } else if (value <= 300) {
    return 300;
  } else if (value <= 400) {
    return 400;
  } else if (value <= 500) {
    return 500;
  } else if (value <= 600) {
    return 600;
  } else if (value <= 700) {
    return 700;
  } else if (value <= 800) {
    return 800;
  } else {
    return 900;
  }
};
