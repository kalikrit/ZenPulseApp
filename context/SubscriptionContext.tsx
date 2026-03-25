import React, { createContext, useContext, useMemo, useState } from 'react';

type SubscriptionContextValue = {
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
};

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const value = useMemo(
    () => ({
      isSubscribed,
      setSubscribed: setIsSubscribed,
    }),
    [isSubscribed]
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return ctx;
}

