"use client";

import NextTopLoader from "nextjs-toploader";
import { SolarProvider } from "@solar-icons/react";
import { Toaster } from "@/shared/components/ui/sonner";
import { UserProvider } from "@/features/auth/providers/user-provider";
import { AuthDialogProvider } from "@/features/auth/providers/auth-dialog-provider";
import { CartProvider } from "@/features/cart/providers/cart-provider";
import { LoginDialog } from "@/features/auth/login/components/login-dialog";
import type { IAuthUser } from "@/features/auth/utils/auth.interface";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import Scroll from "@/shared/components/scroll";
import { CurrencyProvider } from "@/shared/providers/currency-provider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

interface IProps {
  user: IAuthUser | null;
  dict: IDictionary;
  children: React.ReactNode;
}

export function Providers({ user, dict, children }: IProps) {
  return (
    <>
      <Scroll />
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      <SolarProvider>
        <TooltipProvider>
          <CurrencyProvider>
            <UserProvider user={user}>
              <CartProvider>
                <AuthDialogProvider>
                  {children}
                  <LoginDialog dict={dict} />
                </AuthDialogProvider>
              </CartProvider>
            </UserProvider>
          </CurrencyProvider>
        </TooltipProvider>
      </SolarProvider>
      <Toaster />
    </>
  );
}
