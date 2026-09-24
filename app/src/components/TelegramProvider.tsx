"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface TelegramContextType {
  isTMA: boolean;
  tgUser: { id?: number; first_name?: string; username?: string } | null;
}

const TelegramContext = createContext<TelegramContextType>({
  isTMA: false,
  tgUser: null,
});

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTMA, setIsTMA] = useState(false);
  const [tgUser, setTgUser] = useState<TelegramContextType["tgUser"]>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const tg = (window as unknown as { Telegram?: { WebApp?: { initDataUnsafe?: { user?: { id: number; first_name: string; username?: string } }; ready: () => void; expand: () => void } } }).Telegram?.WebApp;
        if (tg) {
          tg.ready();
          tg.expand();
          setIsTMA(true);
          if (tg.initDataUnsafe?.user) {
            setTgUser(tg.initDataUnsafe.user);
          }
        }
      }
    } catch {
      // Running in standard browser
      setIsTMA(false);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ isTMA, tgUser }}>
      {children}
    </TelegramContext.Provider>
  );
};
