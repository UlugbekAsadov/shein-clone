"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateProfileAction,
  uploadProfileImageAction,
} from "@/features/profile/pages/account/services/account.actions";
import type { IAccountProfile } from "@/features/profile/pages/account/utils/account.interface";

export function useAccountForm(initial: IAccountProfile) {
  const router = useRouter();
  const initialImage = initial.avatar ?? "";

  const [name, setName] = useState(initial.name);
  const [surname, setSurname] = useState(initial.surname);
  const [dateOfBirth, setDateOfBirth] = useState(initial.dateOfBirth);
  const [gender, setGender] = useState<"male" | "female">(initial.gender);
  const [avatar, setAvatar] = useState<string | null>(initial.avatar);
  const [image, setImage] = useState(initialImage);

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, startSaving] = useTransition();

  const isDirty =
    name !== initial.name ||
    surname !== initial.surname ||
    dateOfBirth !== initial.dateOfBirth ||
    gender !== initial.gender ||
    image !== initialImage;

  const canSubmit =
    name.trim() !== "" && surname.trim() !== "" && !isUploading && !isSaving;

  const uploadImage = async (file: File) => {
    const preview = URL.createObjectURL(file);
    setAvatar(preview);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadProfileImageAction(formData);

    URL.revokeObjectURL(preview);
    setIsUploading(false);

    if (result.ok && result.data) {
      setAvatar(result.data);
      setImage(result.data);
    } else {
      setAvatar(initial.avatar);
      toast.error(result.message);
    }
  };

  const removeImage = () => {
    if (avatar?.startsWith("blob:")) URL.revokeObjectURL(avatar);
    setAvatar(null);
    setImage("");
  };

  const reset = () => {
    setName("");
    setSurname("");
    setDateOfBirth("");
    setGender("male");
    removeImage();
  };

  const submit = () => {
    if (!canSubmit) return;
    startSaving(async () => {
      const result = await updateProfileAction({
        name,
        surname,
        birth_date: dateOfBirth,
        gender,
        image: image !== initialImage ? image : undefined,
      });

      if (result.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return {
    name,
    setName,
    surname,
    setSurname,
    dateOfBirth,
    setDateOfBirth,
    gender,
    setGender,
    avatar,
    uploadImage,
    removeImage,
    reset,
    isUploading,
    isSaving,
    isDirty,
    canSubmit,
    submit,
  };
}
