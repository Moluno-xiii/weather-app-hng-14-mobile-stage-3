export const formatTemp = (value: number): string => `${Math.round(value)}°`;

export const formatTempPair = (min: number, max: number): string =>
  `${Math.round(min)}° / ${Math.round(max)}°`;

export const formatWind = (mps: number): string =>
  `${(mps * 3.6).toFixed(1)} km/h`;

export const formatHumidity = (value: number): string => `${Math.round(value)}%`;

export const formatPressure = (hpa: number): string => `${Math.round(hpa)} hPa`;
