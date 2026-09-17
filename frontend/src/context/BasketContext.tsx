import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type BasketItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type BasketContextType = {
  basket: BasketItem[];
  addToBasket: (item: Omit<BasketItem, "quantity">) => void;
  removeFromBasket: (id: number) => void;
  clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const addToBasket = (item: Omit<BasketItem, "quantity">) => {
    setBasket((currentBasket) => {
      const existingItem = currentBasket.find(
        (basketItem) => basketItem.id === item.id,
      );

      if (existingItem) {
        return currentBasket.map((basketItem) =>
          basketItem.id === item.id
            ? { ...basketItem, quantity: basketItem.quantity + 1 }
            : basketItem,
        );
      }

      return [...currentBasket, { ...item, quantity: 1 }];
    });
  };

  const removeFromBasket = (id: number) => {
    setBasket((currentBasket) =>
      currentBasket
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);

  if (!context) {
    throw new Error("useBasket must be used inside BasketProvider");
  }

  return context;
}
