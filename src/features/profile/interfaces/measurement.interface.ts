export interface IMeasurementOption {
  value: string;
  label: string;
}

export interface IMeasurementField {
  id: string;
  label: string;
  options: IMeasurementOption[];
}
