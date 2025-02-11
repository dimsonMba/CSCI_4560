import * as z from 'zod';

const RegisterSchema = (type) => {
  const baseSchema = {
    firstName: z.string().min(3, { message: "First name must be at least 3 characters" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 characters" }),
    personalEmail: z.string().email({ message: "Invalid email format" }),
    mtsuEmail: z.string().email({ message: "Invalid email format" }),
    mNumber: z.string().min(6, { message: "M Number must be at least 6 characters" }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  };

  if (type === "sign-up") {
    return z.object(baseSchema);
  } else if (type === "sign-in") {
    return z.object({
      username: z.string().min(3, { message: "Enter your MTSU username" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    });
  } else if (type === "register") {
    return z.object({
      ...baseSchema,
      graduationYear: z.string().length(4, { message: "Enter a valid 4-digit year" }),
      major: z.string().min(3, { message: "Choose your major" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    });
  } else {
    throw new Error(`Unknown form type: ${type}`);
  }
};

export { RegisterSchema };
