import React from "react";
import PropTypes from "prop-types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";

const RegisterForm = ({ control }) => {
  return (
    <>
      {Object.keys(control._defaultValues).map((fieldName) => (
        <FormField
          key={fieldName}
          control={control}
          name={fieldName}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-gray-900 font-medium">{fieldName}</FormLabel>
              <FormControl>
                <Input
                  placeholder={`Enter ${fieldName}`}
                  className="w-full p-3 border rounded text-black"
                  type={fieldName === "password" ? "password" : fieldName === "email" ? "email" : "text"}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

RegisterForm.propTypes = {
  control: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["sign-up", "sign-in"]).isRequired,
};

export default RegisterForm;
