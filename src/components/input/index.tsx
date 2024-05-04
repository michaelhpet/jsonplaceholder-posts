import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="px-3 py-1 bg-black/5 dark:bg-white/5 border rounded-lg focus:outline-blue-700"
    />
  );
}