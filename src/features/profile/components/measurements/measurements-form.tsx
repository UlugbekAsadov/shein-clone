"use client";

import { useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import {
  bustOptions,
  braSizeOptions,
  footwearOptions,
  heightOptions,
  hipsOptions,
  preferenceOptions,
  waistOptions,
  weightOptions,
} from "@/features/profile/mocks/measurement.mocks";
import type { IMeasurementOption } from "@/features/profile/interfaces/measurement.interface";
import { MeasurementField } from "./measurement-field";

interface IProps {
  dict: IDictionary;
}

type FieldKey =
  | "height"
  | "weight"
  | "bust"
  | "braSize"
  | "waist"
  | "hips"
  | "preference"
  | "footwear";

interface IFieldConfig {
  key: FieldKey;
  options: IMeasurementOption[];
}

const FIELDS: IFieldConfig[] = [
  { key: "height", options: heightOptions },
  { key: "weight", options: weightOptions },
  { key: "bust", options: bustOptions },
  { key: "braSize", options: braSizeOptions },
  { key: "waist", options: waistOptions },
  { key: "hips", options: hipsOptions },
  { key: "preference", options: preferenceOptions },
  { key: "footwear", options: footwearOptions },
];

const initialValues: Record<FieldKey, string> = {
  height: "",
  weight: "",
  bust: "",
  braSize: "",
  waist: "",
  hips: "",
  preference: "",
  footwear: "",
};

export function MeasurementsForm({ dict }: IProps) {
  const t = dict.profile.measurements;

  const [values, setValues] = useState<Record<FieldKey, string>>(initialValues);

  const isDirty = (Object.keys(values) as FieldKey[]).some(
    (key) => values[key] !== initialValues[key],
  );

  const setValue = (key: FieldKey) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => setValues(initialValues);

  const handleApply = () => {
    // demo: nothing to persist yet
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
      <div className="my-5 border-t border-border" />

      <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
        {FIELDS.map((field) => (
          <MeasurementField
            key={field.key}
            label={t.fields[field.key]}
            placeholder={t.placeholder}
            options={field.options}
            value={values[field.key]}
            onChange={setValue(field.key)}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        {isDirty && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleCancel}
            className="rounded-sm px-6 h-12.5 text-lg"
          >
            {t.cancel}
          </Button>
        )}
        <Button
          type="button"
          size="lg"
          onClick={handleApply}
          className="rounded-sm px-8 h-12.5 text-lg"
        >
          {t.apply}
        </Button>
      </div>
    </div>
  );
}
