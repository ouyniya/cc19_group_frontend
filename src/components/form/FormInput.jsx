import React from "react";

function FormInput({ register, name, type = "text", errors }) {
  return (
    <>
      <input
        placeholder={name}
        type={type}
        {...register(name)}
        className="bg-white border-4 border-[#086BAF] rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50 pl-3"
      />
      {errors[name] && (
        <pre className="text-xs text-red-600">
          {errors[name].message}
        </pre>
      )}
    </>
  );
}

export default FormInput;
