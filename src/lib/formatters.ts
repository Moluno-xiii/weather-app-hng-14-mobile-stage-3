const formatTemp = (value: number): string => `${Math.round(value)}°`;

const formatTempPair = (min: number, max: number): string =>
  `${Math.round(min)}° / ${Math.round(max)}°`;

const formatWind = (mps: number): string => `${(mps * 3.6).toFixed(1)} km/h`;

const formatHumidity = (value: number): string => `${Math.round(value)}%`;

const formatPressure = (hpa: number): string => `${Math.round(hpa)} hPa`;

export {
  formatTemp,
  formatTempPair,
  formatWind,
  formatHumidity,
  formatPressure,
};
