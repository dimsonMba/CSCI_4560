import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RegisterForm from './RegisterForm';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '../ui/form';
import api from '../../api';

const RegisterSchema = (type) => {
  const base = {
    "First name": z.string().min(3, { message: 'First name must be at least 3 characters' }),
    "Last name": z.string().min(3, { message: 'Last name must be at least 3 characters' }),
    "MTSU Email": z.string().email({ message: 'Invalid email format' }),
    "MTSU Number": z.string().min(6, { message: 'M Number must be at least 6 characters' }),
  };

  return type === 'sign-up'
    ? z.object(base)
    : z.object({
        "username": z.string().min(3, { message: 'Username must be at least 3 characters' }),
        "password": z.string().min(6, { message: 'Password must be at least 6 characters' }),
      });
};

const formSchemas = {
  'sign-up': RegisterSchema('sign-up'),
  'sign-in': RegisterSchema('sign-in'),
};

const generateDefaultValues = (schema) =>
  Object.keys(schema.shape).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});

export default function AuthForm({ type }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSchema = formSchemas[type];
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: generateDefaultValues(formSchema),
  });

  useEffect(() => {
    form.reset(generateDefaultValues(formSchema));
  }, [type, form, formSchema]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      if (type === "sign-in") {
        const res = await api.post('login/', {
          username: data.username,
          password: data.password,
        });

        if (res.data.access) {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          // save the user object too
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/chatpage');
          return;
        }

        setError(res.data.error || 'Login failed.');
      } else {
        const res = await api.post('verification/', {
          "First name": data["First name"],
          "Last name": data["Last name"],
          "MTSU Number": data["MTSU Number"],
          "MTSU Email": data["MTSU Email"],
        });

        if (res.data.success) {
          navigate('/register_page', { state: { initialData: res.data.user } });
          return;
        }

        setError(res.data.message || 'Verification failed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFields = () => {
    if (type === 'sign-in') {
      return (
        <>
          <div className="[&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="username" placeholder="Ex: jg2x" />
          </div>
          <div className="[&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="password" placeholder="Enter your password" />
          </div>
          <div className="flex items-center gap-4">
            <input id="SaveInfo" type="checkbox" className="h-5 w-5 text-blue-600 bg-white border border-black rounded-sm focus:ring-2 focus:ring-blue-500 hover:bg-white hover:border-blue-500 data-[state=unchecked]:bg-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            <label htmlFor="SaveInfo" className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-100">Remember for 30 days</label>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
          <RegisterForm register={form.register} name="First name" placeholder="Ex: John" />
          <RegisterForm register={form.register} name="Last name" placeholder="Ex: James" />
        </div>
        <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
          <RegisterForm register={form.register} name="MTSU Number" placeholder="Ex: 012345" />
          <RegisterForm register={form.register} name="Graduation Year" placeholder="Ex: 2026" />
        </div>
        <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
          <RegisterForm register={form.register} name="Personal Email" placeholder="you@example.com" />
          <RegisterForm register={form.register} name="MTSU Email" placeholder="you@mtmail.mtsu.edu" />
        </div>
      </>
    );
  };

  return (
    <section className="max-w-md mx-auto p-6 justify-items-center">
      <h3 className="text-black text-2xl font-bold">
        {type === 'sign-in' ? 'Welcome back!' : 'Get Started Now'}
      </h3>
      <p className="font-bold text-black text-center pt-2 pr-4 pl-4 pb-10">
        {type === 'sign-in'
          ? 'Log in to your account by entering your credentials below.'
          : 'Effortlessly connect with classmates in your major. Join real-time group chats, foster friendships, and enrich your university journey with Uniconnect.'}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[25rem]">
          {renderFields()}
          <Button
            type="submit"
            className="w-full p-2 rounded-xl text-white text-2xl bg-[#38B6FF] hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading
              ? <Loader2 className="animate-spin" />
              : (type === 'sign-in' ? 'Sign In' : 'Verify')}
          </Button>
        </form>
      </Form>

      <div className="text-black flex">
        
        {type === 'sign-in' ? (
          <>
          <div className="grid gap-0 justify-items-center">
            <section className='pt-[2rem] pb-[1rem]'>
              <img src='Frame 61.jpg'/>
            </section>

            <section className='flex gap-1'>
              <h1 className="text-sm">Don't have an account? </h1>
              
              <Link to="/sign_up" className="text-blue-600 hover:underline">Sign up</Link>
              
            </section>
          </div>
          </>
        ) : (
          <>
            <div className="grid gap-0 justify-items-center">
              <section className='pt-[2rem] pb-[1rem]'>
                <img src='Frame 61.jpg'/>
              </section>

              <section className='flex pb-4 gap-2'> {/* Added gap between buttons */}
                <Button className="bg-white hover:ring-4 focus:ring-4 p-2 shadow-sm rounded-lg">
                  <img src='Frame 60.jpg' alt='Icon for Action 1' className='w-full h-auto' />
                </Button>

                <Button className="bg-white hover:ring-4 focus:ring-4 p-2 shadow-sm rounded-lg">
                  <img src='Frame 62.jpg' alt='Icon for Action 2' className='w-full h-auto' />
                </Button>
              </section>

              <section className='flex gap-2'>
                <h1 className="text-sm">Do you already have an account?</h1>
                
                <Link to="/log_in" className="text-blue-600 hover:underline">Sign In</Link>
                
              </section>
              
            </div>
          </>
        )}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
  );
}
