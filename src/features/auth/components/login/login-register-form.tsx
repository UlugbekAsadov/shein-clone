"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DOB_DIGIT_COUNT } from "@/features/auth/constants/login.constants";
import type { IGender } from "@/features/auth/interfaces/register.interface";
import { LoginDateInput } from "./login-date-input";
import { LoginGenderToggle } from "./login-gender-toggle";
import { cn } from "@/lib/utils";

interface IProps {
  labels: {
    title: string;
    subtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    dobLabel: string;
    dobPlaceholder: string;
    genderLabel: string;
    genderMale: string;
    genderFemale: string;
    continue: string;
  };
  isPending?: boolean;
  onSubmit: (values: {
    name: string;
    birthday: string;
    gender: IGender;
  }) => void;
}

export function LoginRegisterForm({
  labels,
  isPending = false,
  onSubmit,
}: IProps) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState<IGender | null>(null);

  const isComplete =
    name.trim().length > 0 &&
    birthday.length === DOB_DIGIT_COUNT &&
    gender !== null;

  const handleSubmit = () => {
    if (!isComplete || !gender) return;
    onSubmit({ name: name.trim(), birthday, gender });
  };

  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 flex-col gap-6",
        "md:max-w-md",
        "lg:h-auto lg:flex-none lg:gap-8",
      )}
    >
      <div className="flex flex-col gap-2 text-left lg:text-center">
        <h1 className="text-3xl font-bold text-foreground">{labels.title}</h1>
        <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="register-name"
          className="text-sm font-medium text-foreground"
        >
          {labels.fullNameLabel}
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={labels.fullNamePlaceholder}
          className="h-12.5 w-full rounded-sm bg-secondary px-4 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="register-dob"
          className="text-sm font-medium text-foreground"
        >
          {labels.dobLabel}
        </label>
        <LoginDateInput
          value={birthday}
          onChange={setBirthday}
          placeholder={labels.dobPlaceholder}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">
          {labels.genderLabel}
        </span>
        <LoginGenderToggle
          value={gender}
          onChange={setGender}
          labels={{ male: labels.genderMale, female: labels.genderFemale }}
        />
      </div>

      <div className="flex-1 lg:hidden" />

      <Button
        type="button"
        size="lg"
        onClick={handleSubmit}
        disabled={!isComplete || isPending}
        className="h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
      >
        {labels.continue}
      </Button>
    </div>
  );
}
