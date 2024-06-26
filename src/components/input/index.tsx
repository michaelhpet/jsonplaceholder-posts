import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rootClassName?: string;
}

export default function Input(props: Props) {
  const { label = null, error, rootClassName = "", ...domProps } = props;

  return (
    <label
      htmlFor={domProps.id}
      className={`flex flex-col text-sm ${rootClassName}`}
    >
      {label ? <span className="pb-1 font-semibold">{label}</span> : null}
      <input
        {...domProps}
        className={`min-w-[210px] min-h-[33.6px] px-3 py-1 bg-black/5 dark:bg-white/5 border rounded-lg focus:outline-blue-700 ${
          error ? "border-red-500 focus:outline-red-500" : ""
        }`}
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </label>
  );
}
