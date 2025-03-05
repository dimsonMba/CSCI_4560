import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RegisterForm from './RegisterForm';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';
import { Link } from 'react-router-dom';

// Define schema dynamically
const RegisterSchema = (type) => {
  const baseSchema = {
    "First name": z.string().min(3, { message: 'At least 3 characters' }),
    "Last name": z.string().min(3, { message: 'At least 3 characters' }),
    "Personal Email": z.string().email({ message: 'Invalid email format' }),
    "MTSU Email": z.string().email({ message: 'Invalid email format' }),
    "MTSU Number": z.string().min(6, { message: 'At least 6 characters' }),
    "Phone Number": z.string().min(10, { message: 'At least 10 digits' }),
  };

  if (type === 'sign-up') {
    return z.object(baseSchema);
  } else if (type === 'sign-in') {
    return z.object({
      "username": z.string().min(3, { message: 'Enter your MTSU username' }),
      "password": z.string().min(6, { message: 'Password must be at least 6 characters' }),
    });
  } else {
    throw new Error(`Unknown form type: ${type}`);
  }
};

// Define form schemas object
const formSchemas = {
  'sign-up': RegisterSchema('sign-up'),
  'sign-in': RegisterSchema('sign-in'),
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
      console.log(data);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = () => {
    if (type === 'sign-in') {
      return (
        <>
          <RegisterForm
            register={form.register}
            name="username"
            placeholder="Enter your MTSU Username"
          />

          <RegisterForm
            register={form.register}
            name="password"
            placeholder="Enter your password"
          />
        </>
      );
    } else if (type === 'sign-up') {
      return (
        <>
          <div className="flex gap-4">
            <RegisterForm
              register={form.register}
              name="First name"
              placeholder="Enter your First name"
            />

            <RegisterForm
              register={form.register}
              name="Last name"
              placeholder="Enter your Last name"
            />
          </div>

          <div className="flex gap-4">
            <RegisterForm
              register={form.register}
              name="MTSU Number"
              placeholder="Your M-number"
            />

            <RegisterForm
              register={form.register}
              name="Phone Number"
              placeholder="Ex: 1111111111"
            />
          </div>

          <div>
            <RegisterForm
              register={form.register}
              name="Personal Email"
              placeholder="Enter your personal email"
            />
          </div>

          <div>
            <RegisterForm
              register={form.register}
              name="MTSU Email"
              placeholder="Enter your MTSU email"
            />
          </div>
        </>
      );
    }
  };

  const buttonText = type === 'sign-in' ? 'Sign In' : 'Sign Up';

  return (
    <section className="max-w-md mx-auto p-6 justify-items-center">
      <h3 className="text-black text-2xl font-bold">
        {user ? 'Link Account' : type === 'sign-in' ? 
          "Welcome back!"
          : 
          "Get Started Now"
        }
      </h3>
      <p className="text-gray-600">
        {user ? 'Link your account to get started' : type === 'sign-in' ?
          <>
            <p>Connect with classmates in your majore eefortlessly</p>
          </>
          :
          <>
            <p>Connect with classmates in your majore eefortlessly</p>
            <p>Join real-time group chats, build friendships, and enhance your university experience</p>
          </>
        }
      
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[25rem]">
          {renderFormFields()}

          <Button
            type="submit"
            className="w-full p-2 rounded bg-blue-500 text-white text-2xl text-black"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : buttonText}
          </Button>
        </form>
      </Form>

      <div className="text-black flex">
        {type === 'sign-in' ? (
          <div className="flex flex-1">
            <h1 className="text-sm mt-[1rem] flex-1 w-[17.5rem]">Don't have an account? </h1>
            <a className="flex-1 mt-[1rem]">
              <Link to="/sign_up">Sign up</Link>
            </a>
          </div>
        ) : (
          <div className="flex gap-0">
            <h1 className="text-sm mt-[1rem] flex w-[15rem]">Do you already have an account?</h1>
            <a className="flex mt-[1rem]">
              <Link to="/log_in">Log in</Link>
            </a>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
};

export default AuthForm;