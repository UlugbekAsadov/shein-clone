"use client";

import { useMemo, useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { useAccountForm } from "@/features/profile/pages/account/hooks/use-account-form";
import type { IAccountProfile } from "@/features/profile/pages/account/utils/account.interface";
import { AccountMobileHeader } from "./account-mobile-header";
import { AccountMobileAvatar } from "./account-mobile-avatar";
import { AccountMobileTextField } from "./account-mobile-text-field";
import { AccountMobileDobField } from "./account-mobile-dob-field";
import { AccountMobileGenderField } from "./account-mobile-gender-field";
import { AccountMobileDobDrawer } from "./account-mobile-dob-drawer";
import { AccountMobileConfirmDrawer } from "./account-mobile-confirm-drawer";
import { AccountMobileSaveBar } from "./account-mobile-save-bar";

interface IProps {
  dict: IDictionary;
  profile: IAccountProfile;
}

function formatDob(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}.${month}.${year}`;
}

export function AccountMobilePage({ dict, profile }: IProps) {
  const t = dict.profile.account;
  const form = useAccountForm(profile);

  const [dobOpen, setDobOpen] = useState(false);
  const [deleteProfileOpen, setDeleteProfileOpen] = useState(false);
  const [deletePhotoOpen, setDeletePhotoOpen] = useState(false);

  const displayDob = useMemo(() => formatDob(form.dateOfBirth), [form.dateOfBirth]);

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <AccountMobileHeader
        title={t.title}
        onDeleteProfile={() => setDeleteProfileOpen(true)}
      />

      <AccountMobileAvatar
        avatar={form.avatar}
        uploadLabel={t.uploadPhoto}
        deleteLabel={t.deletePhoto}
        onUpload={form.uploadImage}
        onDeleteRequest={() => setDeletePhotoOpen(true)}
      />

      <div className="flex flex-col gap-5 px-4">
        <AccountMobileTextField
          label={t.fields.name}
          value={form.name}
          onChange={form.setName}
        />

        <AccountMobileTextField
          label={t.fields.surname}
          value={form.surname}
          onChange={form.setSurname}
        />

        <AccountMobileDobField
          label={t.fields.dateOfBirth}
          displayValue={displayDob}
          onClick={() => setDobOpen(true)}
        />

        <AccountMobileGenderField
          label={t.fields.gender}
          value={form.gender}
          onChange={form.setGender}
          maleLabel={t.gender.male}
          femaleLabel={t.gender.female}
        />
      </div>

      <AccountMobileSaveBar
        label={t.save}
        disabled={!form.canSubmit || !form.isDirty}
        onClick={form.submit}
      />

      <AccountMobileDobDrawer
        open={dobOpen}
        onOpenChange={setDobOpen}
        title={t.dobDrawer.title}
        saveLabel={t.save}
        value={form.dateOfBirth}
        months={t.months}
        onSave={form.setDateOfBirth}
      />

      <AccountMobileConfirmDrawer
        open={deleteProfileOpen}
        onOpenChange={setDeleteProfileOpen}
        title={t.deleteProfile.title}
        description={t.deleteProfile.description}
        confirmLabel={t.deleteProfile.confirm}
        cancelLabel={t.deleteProfile.cancel}
        onConfirm={form.reset}
      />

      <AccountMobileConfirmDrawer
        open={deletePhotoOpen}
        onOpenChange={setDeletePhotoOpen}
        title={t.deletePhotoDrawer.title}
        description={t.deletePhotoDrawer.description}
        confirmLabel={t.deletePhotoDrawer.confirm}
        cancelLabel={t.deletePhotoDrawer.cancel}
        onConfirm={form.removeImage}
      />
    </div>
  );
}
