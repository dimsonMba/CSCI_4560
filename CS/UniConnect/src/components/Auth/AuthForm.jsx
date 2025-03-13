import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RegisterForm from './RegisterForm';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';
import { Link } from 'react-router-dom';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

// Define schema dynamically
const RegisterSchema = (type) => {
  const baseSchema = {
    "First name": z.string().min(3, { message: 'At least 3 characters' }),
    "Last name": z.string().min(3, { message: 'At least 3 characters' }),
    "MTSU Email": z.string().email({ message: 'Invalid email format' }),
    "MTSU Number": z.string().min(6, { message: 'At least 6 characters' }),
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
          <div className="flex items-center space-x-2">
            <Checkbox id="terms"/>
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Remember for 30 days</Label>
          </div>
        </>
      );
    } else if (type === 'sign-up') {
      return (
        <>
          <div className="flex gap-4">
            <RegisterForm
              register={form.register}
              name="First name"
              placeholder="Ex: John"
            />

            <RegisterForm
              register={form.register}
              name="Last name"
              placeholder="Ex: James"
            />

            <RegisterForm
              register={form.register}
              name="MTSU Number"
              placeholder="Ex: 012345"
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
      <p className="font-bold text-gray-600 text-center pt-2 pr-4 pl-4 pb-4">
        {user ? 'Link your account to get started' : type === 'sign-in' ?
          <>
            <p>Enter your credentials to access your account</p>
          </>
          :
          <>
            <p>Connect with classmates in your majore efortlessly.</p>
            <p>Join real-time group chats, build friendships, and enhance your university experience</p>
          </>
        }
      
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[25rem]">
          {renderFormFields()}

          <Button
            type="submit"
            className="w-full p-2 rounded bg-blue-500 text-white text-2xl text-black bg-[#38B6FF]"
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
          <div className="grid gap-0 justify-items-center">
            <section className='pt-[2rem] pb-[1rem]'>
              <img src='Frame 61.jpg'/>
            </section>

            <section className='flex pb-[1rem]'>
              <Button className="bg-white hover:focus:ring-4">
                <img src='Frame 60.jpg'/>
              </Button>
              <Button className="bg-white">
                <img src='Frame 62.jpg'/>
              </Button>
            </section>

            <section className='flex gap-2'>
              <h1 className="text-sm">Do you already have an account?</h1>
              <a>
                <Link to="/log_in">Sign In</Link>
              </a>
            </section>
            
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
};

export default AuthForm;