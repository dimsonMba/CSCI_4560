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

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md justify-items-center">
      <h1 className="text-2xl font-semibold text-gray-900">
        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
      </h1>
      <p className="text-gray-600">{user ? 'Link your account to get started' : 'Please enter your details'}</p>

      {type === "sign-in" ? (
        <div className="mt-4">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-[20rem]">
            {/* Render fields dynamically based on the schema */}
            <RegisterForm
              register={form.register}
              name="Username"
              placeholder="Enter your MTSU Username"
            />
            {form.formState.errors["username"] && (
              <p className="text-red-500">{form.formState.errors["username"].message}</p>
            )}

            <RegisterForm
              register={form.register}
              name="Password"
              placeholder="Enter your password"
            />
            {form.formState.errors["password"] && (
              <p className="text-red-500">{form.formState.errors["password"].message}</p>
            )}

            <Button
              type="submit"
              className="w-full p-2 rounded bg-blue-500 text-white text-2xl text-black"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Form>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-[20rem]">
            {/* Render fields dynamically based on the schema */}
            <div>
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
            

            <RegisterForm
              register={form.register}
              name="Personal Email"
              placeholder="Enter your personal email"
            />
            {form.formState.errors["Personal Email"] && (
              <p className="text-red-500">{form.formState.errors["Personal Email"].message}</p>
            )}

            <Button
              type="submit"
              className="w-full p-2 rounded bg-blue-500 text-white text-2xl text-black"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      )}

      <div className='text-black flex'>
        {type === 'sign-in' ? (
          <div className='flex flex-1'>
            <h1 className='text-sm mt-[1rem] flex-1 w-[17.5rem]'>Don't have an account? </h1>
            <a className='flex-1 mt-[1rem]'>
              <Link to="/sign_up">Sign up</Link>
            </a>
          </div>
        ) : (
          <div className='flex'>
            <h1 className='text-sm mt-[1rem] flex-1 w-[25rem]'>Do you already have an account?</h1>
            <a className='flex-1 mt-[1rem]'>
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