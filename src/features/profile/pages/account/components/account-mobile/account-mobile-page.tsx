"use client";

import { useMemo, useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { accountProfile } from "@/features/profile/pages/account/mocks/account.mocks";
import { AccountMobileHeader } from "./account-mobile-header";
import { AccountMobileAvatar } from "./account-mobile-avatar";
import { AccountMobileTextField } from "./account-mobile-text-field";
import { AccountMobileDobField } from "./account-mobile-dob-field";
import { AccountMobileGenderField } from "./account-mobile-gender-field";
import { AccountMobileDobDrawer } from "./account-mobile-dob-drawer";
import { AccountMobileConfirmDrawer } from "./account-mobile-confirm-drawer";

interface IProps {
  dict: IDictionary;
}

function formatDob(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}.${month}.${year}`;
}

export function AccountMobilePage({ dict }: IProps) {
  const t = dict.profile.account;

  const [fullName, setFullName] = useState(accountProfile.fullName);
  const [dob, setDob] = useState(accountProfile.dateOfBirth);
  const [gender, setGender] = useState<"male" | "female">(
    accountProfile.gender,
  );
  const [avatar, setAvatar] = useState<string | null>(accountProfile.avatar);

  const [dobOpen, setDobOpen] = useState(false);
  const [deleteProfileOpen, setDeleteProfileOpen] = useState(false);
  const [deletePhotoOpen, setDeletePhotoOpen] = useState(false);

  const displayDob = useMemo(() => formatDob(dob), [dob]);

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const handleDeletePhoto = () => {
    if (avatar?.startsWith("blob:")) URL.revokeObjectURL(avatar);
    setAvatar(null);
  };

  const handleDeleteProfile = () => {
    setFullName("");
    setDob("");
    setGender("male");
    if (avatar?.startsWith("blob:")) URL.revokeObjectURL(avatar);
    setAvatar(null);
  };

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <AccountMobileHeader
        title={t.title}
        onDeleteProfile={() => setDeleteProfileOpen(true)}
      />

      <AccountMobileAvatar
        avatar={avatar}
        uploadLabel={t.uploadPhoto}
        deleteLabel={t.deletePhoto}
        onUpload={handleUpload}
        onDeleteRequest={() => setDeletePhotoOpen(true)}
      />

      <div className="flex flex-col gap-5 px-4">
        <AccountMobileTextField
          label={t.fields.fullName}
          value={fullName}
          onChange={setFullName}
        />

        <AccountMobileDobField
          label={t.fields.dateOfBirth}
          displayValue={displayDob}
          onClick={() => setDobOpen(true)}
        />

        <AccountMobileGenderField
          label={t.fields.gender}
          value={gender}
          onChange={setGender}
          maleLabel={t.gender.male}
          femaleLabel={t.gender.female}
        />
      </div>

      <AccountMobileDobDrawer
        open={dobOpen}
        onOpenChange={setDobOpen}
        title={t.dobDrawer.title}
        saveLabel={t.save}
        value={dob}
        months={t.months}
        onSave={setDob}
      />

      <AccountMobileConfirmDrawer
        open={deleteProfileOpen}
        onOpenChange={setDeleteProfileOpen}
        title={t.deleteProfile.title}
        description={t.deleteProfile.description}
        confirmLabel={t.deleteProfile.confirm}
        cancelLabel={t.deleteProfile.cancel}
        onConfirm={handleDeleteProfile}
      />

      <AccountMobileConfirmDrawer
        open={deletePhotoOpen}
        onOpenChange={setDeletePhotoOpen}
        title={t.deletePhotoDrawer.title}
        description={t.deletePhotoDrawer.description}
        confirmLabel={t.deletePhotoDrawer.confirm}
        cancelLabel={t.deletePhotoDrawer.cancel}
        onConfirm={handleDeletePhoto}
      />
    </div>
  );
}
