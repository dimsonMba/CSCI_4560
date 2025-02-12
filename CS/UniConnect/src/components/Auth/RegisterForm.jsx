import React from "react";
import PropTypes from "prop-types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";

const RegisterForm = ({ register, name, placeholder }) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-gray-900 font-medium">{name}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className="w-full p-3 border rounded text-black"
              type={
                name.toLowerCase().includes("password")
                  ? "password"
                  : name.toLowerCase().includes("email")
                  ? "email"
                  : "text"
              }
              {...register(name)}
            />
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired, // The form.register method
  name: PropTypes.string.isRequired, // The name of the field
  placeholder: PropTypes.string.isRequired, // The placeholder text
};

export default RegisterForm;