import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RegisterForm from './RegisterForm';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';

// Define schema dynamically
const RegisterSchema = (type) => {
  const baseSchema = {
    "First name": z.string().min(3, { message: 'First name must be at least 3 characters' }),
    "Last name": z.string().min(3, { message: 'Last name must be at least 3 characters' }),
    "Personal Email": z.string().email({ message: 'Invalid email format' }),
    "MTSU Email": z.string().email({ message: 'Invalid email format' }),
    "MTSU Number": z.string().min(6, { message: 'M Number must be at least 6 characters' }),
    "Phone Number": z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  };

  if (type === 'sign-up') {
    return z.object(baseSchema);
  } else if (type === 'sign-in') {
    return z.object({
      "username": z.string().min(3, { message: 'Enter your MTSU username' }),
      "password": z.string().min(6, { message: 'Password must be at least 6 characters' }),
    });
  } else if (type === 'register') {
    return z.object({
      ...baseSchema,
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
  'sign-up': RegisterSchema('sign-up'),
  'sign-in': RegisterSchema('sign-in'),
  'register': RegisterSchema('register'),
};

// Function to generate default values based on the schema
const generateDefaultValues = (schema) => {
  const defaultValues = {};
  const shape = schema.shape; // Extract the shape of the schema

  // Iterate over the schema's shape and set default values
  Object.keys(shape).forEach((key) => {
    defaultValues[key] = ''; // Set default value as an empty string
  });

  return defaultValues;
};

const AuthForm = ({ type }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSchema = formSchemas[type];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: generateDefaultValues(formSchema), // Generate default values dynamically
  });

  // Reset the form when the `type` changes
  useEffect(() => {
    form.reset(generateDefaultValues(formSchema));
  }, [type, form, formSchema]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate a successful submission
      setUser(data);
      console.log(data)
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900">
        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
      </h1>
      <p className="text-gray-600">{user ? 'Link your account to get started' : 'Please enter your details'}</p>

      {user ? (
        <div className="mt-4">{/* Account linking UI can go here */}</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-[20rem]">
            <RegisterForm control={form.control} type={type} />

            <Button
              type="submit"
              className="w-full p-2 rounded bg-blue-500 text-white text-2xl text-black"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>

            <div className='text-black text-1xl items-center overline'>
              {type === 'sign-in' ? 
                (<div>
                  <h1>Hello World</h1>
                </div>
              ) : (
                <div>
                  <h1>Food</h1>
                </div>)}
            </div>
          </form>
        </Form>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
};

export default AuthForm;