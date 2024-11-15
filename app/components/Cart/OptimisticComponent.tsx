"use client";
import React, { useOptimistic } from "react";
import CartSummary from "./CartSummary";
import CartGrid from "./CartGrid";

function OptimisticComponent({ cartItems }: { cartItems: CartItem[] }) {
  
  const [optimisticCartItems, addOptimisticCartItems] = useOptimistic(
    cartItems,
    (state: CartItem[], action: { type: string; payload?: CartItem }) => {
      switch (action.type) {
        case "remove":
          return state.filter(
            (item) => item.product_id !== action.payload?.product_id
          );
        case "clear":
          return [];
        case "updateQuantity":
          if (action.payload) {
            return state.map((item) =>
              item.product_id === action.payload?.product_id
                ? { ...item, quantity: action.payload?.quantity }
                : item
            );
          }
          break;
        default:
          return state;
      }
      return state;
    }
  );


  if (optimisticCartItems.length > 0) {
      return (
        <div className="flex gap-[64px]">
          <div className="w-[60%]">
            <CartGrid
              cartItems={optimisticCartItems}
              addOptimisticCartItems={addOptimisticCartItems}
            />
          </div>
          <CartSummary cartItems={optimisticCartItems} />
        </div>
      );
  } else {
    return <h2 className="text-center">Your Cart Is Empty</h2>
  }
}

export default OptimisticComponent;
