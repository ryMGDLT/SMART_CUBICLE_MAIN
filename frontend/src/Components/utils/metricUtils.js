export const toggleMetric = (setSelectedMetrics, item) => {
  setSelectedMetrics((prevMetrics) =>
    prevMetrics.includes(item)
      ? prevMetrics.filter((metric) => metric !== item)
      : [...prevMetrics, item]
  );
};
