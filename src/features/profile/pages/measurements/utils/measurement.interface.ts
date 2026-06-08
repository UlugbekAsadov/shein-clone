export interface IMeasurementOption {
  value: string;
  label: string;
}

export interface IMeasurementField {
  id: string;
  label: string;
  options: IMeasurementOption[];
}

export interface IMeasurements {
  height: string;
  weight: string;
  chest: string;
  bra_size: string;
  waist: string;
  hips: string;
  preferred_fit: string;
  shoe_size: string;
}
