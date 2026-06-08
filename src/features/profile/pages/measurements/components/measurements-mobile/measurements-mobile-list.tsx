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
import type {
  IMeasurementOption,
  IMeasurements,
} from "@/features/profile/pages/measurements/utils/measurement.interface";
import { saveMeasurementsAction } from "@/features/profile/pages/measurements/services/measurement.actions";
import { MeasurementMobileRow } from "./measurement-mobile-row";
import { MeasurementMobileDrawer } from "./measurement-mobile-drawer";

interface IField {
  id: keyof IDictionary["profile"]["measurements"]["fields"] &
    keyof IDictionary["profile"]["measurements"]["fieldUnits"];
  apiKey: keyof IMeasurements;
  options: IMeasurementOption[];
}

const fields: IField[] = [
  { id: "height", apiKey: "height", options: heightOptions },
  { id: "weight", apiKey: "weight", options: weightOptions },
  { id: "bust", apiKey: "chest", options: bustOptions },
  { id: "braSize", apiKey: "bra_size", options: braSizeOptions },
  { id: "waist", apiKey: "waist", options: waistOptions },
  { id: "hips", apiKey: "hips", options: hipsOptions },
  { id: "preference", apiKey: "preferred_fit", options: preferenceOptions },
];

function toInitialValues(measurements: IMeasurements | null): Record<string, string | null> {
  if (!measurements) return {};
  return {
    height: measurements.height || null,
    weight: measurements.weight || null,
    bust: measurements.chest || null,
    braSize: measurements.bra_size || null,
    waist: measurements.waist || null,
    hips: measurements.hips || null,
    preference: measurements.preferred_fit || null,
  };
}

interface IProps {
  dict: IDictionary;
  measurements: IMeasurements | null;
}

export function MeasurementsMobileList({ dict, measurements }: IProps) {
  const t = dict.profile.measurements;

  const [values, setValues] = useState<Record<string, string | null>>(
    () => toInitialValues(measurements),
  );
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

  const handleApply = async (fieldId: IField["id"], value: string) => {
    const updated = { ...values, [fieldId]: value };
    setValues(updated);

    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;

    const payload: IMeasurements = {
      height: updated.height ?? measurements?.height ?? "",
      weight: updated.weight ?? measurements?.weight ?? "",
      chest: updated.bust ?? measurements?.chest ?? "",
      bra_size: updated.braSize ?? measurements?.bra_size ?? "",
      waist: updated.waist ?? measurements?.waist ?? "",
      hips: updated.hips ?? measurements?.hips ?? "",
      preferred_fit: updated.preference ?? measurements?.preferred_fit ?? "",
      shoe_size: measurements?.shoe_size ?? "",
    };

    await saveMeasurementsAction(payload);
  };

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
            handleApply(activeField.id, value);
          }
        }}
        applyLabel={t.apply}
      />
    </>
  );
}
