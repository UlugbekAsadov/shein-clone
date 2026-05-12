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
import { MeasurementField } from "./measurement-field";
import { MeasurementsConsent } from "./measurements-consent";

interface IProps {
  dict: IDictionary;
}

export function MeasurementsForm({ dict }: IProps) {
  const t = dict.profile.measurements;
  const placeholder = t.placeholder;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold">{t.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t.sizeGuide}</p>
        </div>

        <div className="space-y-4">
          <MeasurementField
            label={t.fields.height}
            placeholder={placeholder}
            options={heightOptions}
          />
          <MeasurementField
            label={t.fields.weight}
            placeholder={placeholder}
            options={weightOptions}
          />
          <MeasurementField
            label={t.fields.bust}
            placeholder={placeholder}
            options={bustOptions}
          />
          <MeasurementField
            label={t.fields.braSize}
            placeholder={placeholder}
            options={braSizeOptions}
          />
          <MeasurementField
            label={t.fields.waist}
            placeholder={placeholder}
            options={waistOptions}
          />
          <MeasurementField
            label={t.fields.hips}
            placeholder={placeholder}
            options={hipsOptions}
          />
          <MeasurementField
            label={t.fields.preference}
            placeholder={placeholder}
            options={preferenceOptions}
          />
          <MeasurementField
            label={t.fields.footwear}
            placeholder={placeholder}
            options={footwearOptions}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-sm font-medium leading-relaxed">{t.intro}</p>
        <MeasurementsConsent
          body={t.consent.body}
          privacyPolicyLabel={t.consent.privacyPolicy}
          privacyPolicyHref="#"
        />
        <div className="mt-auto flex items-center justify-end gap-3">
          <Button variant="outline" size="lg" className="rounded-sm px-6">
            {t.cancel}
          </Button>
          <Button size="lg" className="rounded-sm px-8">
            {t.update}
          </Button>
        </div>
      </div>
    </div>
  );
}
