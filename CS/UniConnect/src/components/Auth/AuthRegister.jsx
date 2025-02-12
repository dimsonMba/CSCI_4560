import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';
import RegisterForm from './RegisterForm';

// Define the schema generator function
const RegisterSchema = (type) => {
  if (type === 'register') {
    return z.object({
      "First name": z.string().min(3, { message: 'First name must be at least 3 characters' }),
      "Last name": z.string().min(3, { message: 'Last name must be at least 3 characters' }),
      "Personal Email": z.string().email({ message: 'Invalid email format' }),
      "MTSU Email": z.string().email({ message: 'Invalid email format' }),
      "MTSU Number": z.string().min(6, { message: 'M Number must be at least 6 characters' }),
      "Phone Number": z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
      "Graduation Year": z.string().length(4, { message: 'Enter a valid 4-digit year' }),
      "Major": z.string().min(3, { message: 'Choose your major' }),
      "Password": z.string().min(6, { message: 'Password must be at least 6 characters' }),
    });
  } else {
    throw new Error(`Unknown form type: ${type}`);
  }
};

// Define form schemas object
const formSchemas = {
  'register': RegisterSchema('register'),
};

// AuthForm component
const AuthRegister = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchemas['register']),
    defaultValues: {
      "Last name": '',
      "Personal Email": '',
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate a successful submission
      setUser(data);
      console.log(data);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Render the "Last name" field */}
        <RegisterForm
          register={form.register}
          name="Last name"
          placeholder="Enter your last name"
        />
        {form.formState.errors["Last name"] && (
          <p className="text-red-500">{form.formState.errors["Last name"].message}</p>
        )}

        {/* Render the "Personal Email" field */}
        <RegisterForm
          register={form.register}
          name="Personal Email"
          placeholder="Enter your personal email"
        />
        {form.formState.errors["Personal Email"] && (
          <p className="text-red-500">{form.formState.errors["Personal Email"].message}</p>
        )}

        {/* Submit button */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>

        {/* Display error message */}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default AuthRegister;