import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';
import RegisterForm from './RegisterForm';
import api from '../../api'

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
      "First name": '',
      "Last name": '',
      "Personal Email": '',
      "MTSU Email": '',
      "MTSU Number": '',
      "Phone Number": '',
      "Graduation Year": '',
      "Major": '',
      "Password": '',
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    // Log form data and errors for debugging
    console.log('Form data:', data);
    console.log('Form errors:', form.formState.errors);

    try {
      // Simulate a successful submission
      setUser(data);
      console.log('Form submitted successfully:', data);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Log form state for debugging
  // console.log('Form state:', form.formState);

  return (
      <section className="max-w-md mx-auto p-6 justify-items-center">
        <h3 className="text-black text-2xl font-bold">
          Get Started Now
      </h3>
      <p className="font text-black text-center pt-2 pr-4 pl-4 pb-10">
            <p>Connect with classmates in your majore efortlessly.</p>
            <p>Join real-time group chats, build friendships, and enhance your university experience</p>
      </p>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[30rem]">
          {/* Render the "First name" and "Last name" fields */}
          <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm
              register={form.register}
              name="First name"
              placeholder="Enter your first name"
            />

            <RegisterForm
              register={form.register}
              name="Last name"
              placeholder="Enter your last name"
            />
          </div>

          {/* Render the "MTSU Number" and "Graduation Year" fields */}
          <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm
              register={form.register}
              name="MTSU Number"
              placeholder="Enter your MTSU ID"
            />

            <RegisterForm
              register={form.register}
              name="Graduation Year"
              placeholder="Ex: 2027"
            />
          </div>

          {/* Render the "Personal Email" and "MTSU Email" fields */}
          <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm
              register={form.register}
              name="Personal Email"
              placeholder="Ex: jhn@gmail.com"
            />

            <RegisterForm
              register={form.register}
              name="MTSU Email"
              placeholder="Ex: jhn@mtmail.mtsu.edu"
            />
          </div>

          {/* Render the "Major" field */}
          <div className="[&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm
              register={form.register}
              name="Major"
              placeholder="Ex: Computer Science"
            />
          </div>

          {/* Render the "Phone Number" field */}
          <div className="[&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm
              register={form.register}
              name="Phone Number"
              placeholder="Ex: 1111111111"
            />
          </div>

          <div className='flex items-center gap-4'>
            <input id="SaveInfo" type='checkbox' className="h-5 w-5 text-blue-600 bg-white border border-black rounded-sm focus:ring-2 focus:ring-blue-500 hover:bg-white hover:border-blue-500 data-[state=unchecked]:bg-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
            <label for="SaveInfo" className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-100">I agree with the <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">terms & policy</a></label>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full p-2 rounded-xl text-white text-2xl bg-[#38B6FF] hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Register'}
          </Button>

          {/* Display error message */}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Form>
    </section>
  );
};

export default AuthRegister;