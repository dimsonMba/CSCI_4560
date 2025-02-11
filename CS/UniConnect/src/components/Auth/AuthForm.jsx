import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import RegisterForm from './RegisterForm';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';

// Define schema dynamically
const formSchemas = {
  "sign-up": z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
  "sign-in": z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
};

const AuthForm = ({ type }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSchema = formSchemas[type];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: type === "sign-up" ? { firstName: "", lastName: "", email: "", password: "" } : { email: "", password: "" },
  });

  useEffect(() => {
    form.reset(type === "sign-up" ? { firstName: "", lastName: "", email: "", password: "" } : { email: "", password: "" });
  }, [type]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      setUser(data);
    } catch (error) {
      setError('Submission failed. Please try again.');
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
        <div className="mt-4"> {/* Account linking UI can go here */} </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RegisterForm control={form.control} type={type} />

            <Button type="submit" className="w-full p-2 rounded bg-blue-500 text-white" disabled={isLoading}>
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : type === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
};

export default AuthForm;
