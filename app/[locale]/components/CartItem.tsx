"use client";
import Image from "next/image";
import IncrementProductButton from "./checkOutButtons/IncrementProductButton";
import DecrementProductButton from "./checkOutButtons/DecrementProductButton";
import DeleteIcon from "./checkOutButtons/DeleteIcon";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
  userId: number;
  productId: number;
  initialQuantity: number;
}

export default function CartItem({
  product,
  initialQuantity,
  userId,
  productId,
}: Props) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, []);

  return (
    <div
      key={product.id}
      className="border-light w-full flex justify-between  items-center mb-[15px] p-[15px] dark:border-[#ffffff] "
    >
      <div className="overflow-hidden">
        <Image
          className=" rounded-md mb-[25px] cursor-pointer hover"
          width={150}
          height={150}
          src={product.thumbnail}
          alt="prodcut"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-[200px]">
        <h2 className=" text-[#004e89] text-[18px] mb-[5px] font-bold dark:text-[#ffffff]">
          {product.title}
        </h2>
        <p className="text-[#004e89] mb-[5px] font-bold dark:text-[#ffffff]">
          Price:$
          {product.price}
        </p>
        <p className="text-[#004e89] mb-[5px] font-bold dark:text-[#ffffff]">
          Quantity:
          {quantity}
        </p>
      </div>
      <div className="w-[200px]">
        <p className="text-[#004e89] mb-[5px] font-bold dark:text-[#ffffff]">
          {" "}
          Total Price: ${product.price * quantity}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <IncrementProductButton
          userId={userId}
          productId={productId}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <DecrementProductButton
          userId={userId}
          productId={productId}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <DeleteIcon productId={productId} quantity={quantity} />
      </div>
    </div>
  );
}
