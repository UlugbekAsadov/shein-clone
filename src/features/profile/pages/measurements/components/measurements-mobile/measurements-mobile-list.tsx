"use client";

import { useMemo, useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import {
  braSizeOptions,
  bustOptions,
  heightOptions,
  hipsOptions,
  preferenceOptions,
  waistOptions,
  weightOptions,
} from "@/features/profile/pages/measurements/mocks/measurement.mocks";
import type { IMeasurementOption } from "@/features/profile/pages/measurements/utils/measurement.interface";
import { MeasurementMobileRow } from "./measurement-mobile-row";
import { MeasurementMobileDrawer } from "./measurement-mobile-drawer";

interface IField {
  id: keyof IDictionary["profile"]["measurements"]["fields"] &
    keyof IDictionary["profile"]["measurements"]["fieldUnits"];
  options: IMeasurementOption[];
}

const fields: IField[] = [
  { id: "height", options: heightOptions },
  { id: "weight", options: weightOptions },
  { id: "bust", options: bustOptions },
  { id: "braSize", options: braSizeOptions },
  { id: "waist", options: waistOptions },
  { id: "hips", options: hipsOptions },
  { id: "preference", options: preferenceOptions },
];

interface IProps {
  dict: IDictionary;
}

export function MeasurementsMobileList({ dict }: IProps) {
  const t = dict.profile.measurements;

  const [values, setValues] = useState<Record<string, string | null>>({});
  const [activeId, setActiveId] = useState<IField["id"] | null>(null);

  const activeField = useMemo(
    () => fields.find((field) => field.id === activeId) ?? null,
    [activeId],
  );

  const activeOptions = activeField?.options ?? [];
  const activeSelectedLabel = activeField
    ? (activeOptions.find((option) => option.value === values[activeField.id])
        ?.label ?? null)
    : null;

  return (
    <>
      <div className="flex flex-col gap-3 px-4">
        {fields.map((field) => {
          const selectedValue = values[field.id];
          const selectedOption = field.options.find(
            (option) => option.value === selectedValue,
          );
          const subLabel = selectedOption
            ? selectedOption.label
            : t.fieldUnits[field.id];

          return (
            <MeasurementMobileRow
              key={field.id}
              label={t.fields[field.id]}
              subLabel={subLabel}
              onClick={() => setActiveId(field.id)}
            />
          );
        })}
      </div>

      <MeasurementMobileDrawer
        open={activeField !== null}
        onOpenChange={(open) => {
          if (!open) setActiveId(null);
        }}
        title={activeField ? t.fields[activeField.id] : ""}
        options={activeOptions}
        selectedValue={
          activeField
            ? (values[activeField.id] ??
              (activeSelectedLabel ? null : null))
            : null
        }
        onApply={(value) => {
          if (activeField) {
            setValues((prev) => ({ ...prev, [activeField.id]: value }));
          }
        }}
        applyLabel={t.apply}
      />
    </>
  );
}
