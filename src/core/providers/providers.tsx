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
import { DictionaryProvider } from "@/core/config/i18n/dictionary-provider";
import Scroll from "@/shared/components/scroll";
import { CurrencyProvider } from "@/shared/providers/currency-provider";
import { AdultDialogProvider } from "@/shared/providers/adult-dialog-provider";
import { AdultGateDialog } from "@/shared/components/product/adult-confirm/adult-gate-dialog";
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
        <DictionaryProvider dict={dict}>
          <TooltipProvider>
            <CurrencyProvider>
              <UserProvider user={user}>
                <CartProvider>
                  <AuthDialogProvider>
                    <AdultDialogProvider>
                      {children}
                      <LoginDialog dict={dict} />
                      <AdultGateDialog dict={dict.listing.adult} />
                    </AdultDialogProvider>
                  </AuthDialogProvider>
                </CartProvider>
              </UserProvider>
            </CurrencyProvider>
          </TooltipProvider>
        </DictionaryProvider>
      </SolarProvider>
      <Toaster />
    </>
  );
}
