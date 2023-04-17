import React from "react";

interface Props {
  label: string;
  id: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values?: string;
  onBlur?: (e: any) => void;
  isRequired: boolean;
}

const InputField: React.FC<Props> = ({
  label,
  id,
  placeholder,
  type = "text",
  onChange,
  values = undefined,
  onBlur = undefined,
  isRequired
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-2 focus:border-blue-500 block w-full p-2.5 outline-none"
        placeholder={placeholder}
        required={isRequired}
        onChange={onChange}
        value={(values !== undefined) ? values : undefined}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
