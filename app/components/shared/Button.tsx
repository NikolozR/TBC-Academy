'use client'
import { Inter } from "next/font/google"

const inter = Inter({
    weight: '500',
    subsets: ['latin'],
})
function Button({ children, type, fontSize, padding, leading, className, disabled = false, handleClick }: childrenProps<ButtonProps>) {
  return (
    <button 
      disabled={disabled} 
      className={`w-fit bg-[#141718] text-white rounded-[8px] ${padding} leading-[${leading}] ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} ${inter.className}`} 
      type={type}
      onClick={() => {
        if (handleClick) handleClick();
      }}
      style={{
        fontSize: `${fontSize}`,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
