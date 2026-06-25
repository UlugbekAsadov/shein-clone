"use client";

import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { useAccountForm } from "@/features/profile/pages/account/hooks/use-account-form";
import type { IAccountProfile } from "@/features/profile/pages/account/utils/account.interface";
import { AccountAvatar } from "./account-avatar";
import { AccountTextField } from "./account-text-field";
import { AccountDobField } from "./account-dob-field";
import { AccountGenderField } from "./account-gender-field";

interface IProps {
  dict: IDictionary;
  profile: IAccountProfile;
}

export function AccountForm({ dict, profile }: IProps) {
  const t = dict.profile.account;
  const form = useAccountForm(profile);

  return (
    <div className="max-w-2xl">
      <AccountAvatar
        avatar={form.avatar}
        uploadLabel={t.uploadPhoto}
        deleteLabel={t.deletePhoto}
        isUploading={form.isUploading}
        onUpload={form.uploadImage}
        onDelete={form.removeImage}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AccountTextField
          label={t.fields.name}
          value={form.name}
          onChange={form.setName}
        />
        <AccountTextField
          label={t.fields.surname}
          value={form.surname}
          onChange={form.setSurname}
        />
      </div>

      <div className="mt-5">
        <AccountDobField
          label={t.fields.dateOfBirth}
          value={form.dateOfBirth}
          onChange={form.setDateOfBirth}
          placeholder={t.dobPlaceholder}
        />
      </div>

      <div className="mt-5">
        <AccountGenderField
          label={t.fields.gender}
          value={form.gender}
          onChange={form.setGender}
          maleLabel={t.gender.male}
          femaleLabel={t.gender.female}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          size="lg"
          onClick={form.submit}
          disabled={!form.canSubmit || !form.isDirty}
          className="h-12.5 rounded-sm px-8 text-base font-semibold"
        >
          {t.apply}
        </Button>
      </div>
    </div>
  );
}
