import React, { useState, useEffect } from 'react';
import { useNavigate, Link }          from 'react-router-dom';
import { useForm }                    from 'react-hook-form';
import { zodResolver }                from '@hookform/resolvers/zod';
import { z }                          from 'zod';
import RegisterForm                   from './RegisterForm';
import { Button }                     from '../ui/button';
import { Loader2 }                    from 'lucide-react';
import { Form }                       from '../ui/form';
import api                            from '../../api';

// Define schema dynamically
const RegisterSchema = (type) => {
  const base = {
    "First name":  z.string().min(3),
    "Last name":   z.string().min(3),
    "MTSU Email":  z.string().email(),
    "MTSU Number": z.string().min(1),
  };

  return type === 'sign-up'
    ? z.object(base)
    : z.object({
        "username": z.string().min(3),
        "password": z.string().min(6),
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
  const [error,     setError]     = useState(null);

  const formSchema = formSchemas[type];
  const form = useForm({
    resolver:     zodResolver(formSchema),
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
        if (res.data.message === "Login successful") {
          navigate('/chatpage');
          return;
        }
        setError(res.data.error || 'Login failed.');
      } else {
        // verification step
        const res = await api.post('verification/', {
          "First name":  data["First name"],
          "Last name":   data["Last name"],
          "MTSU Number": data["MTSU Number"],
          "MTSU Email":  data["MTSU Email"],
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
            <input id="SaveInfo" type="checkbox" className="h-5 w-5" />
            <label htmlFor="SaveInfo" className="text-sm">Remember for 30 days</label>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
          <RegisterForm register={form.register} name="First name" placeholder="Ex: John" />
          <RegisterForm register={form.register} name="Last name"  placeholder="Ex: James" />
        </div>
        <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
          <RegisterForm register={form.register} name="MTSU Number"     placeholder="Ex: 012345" />
          <RegisterForm register={form.register} name="Graduation Year" placeholder="Ex: 2026"   />
        </div>
        <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
          <RegisterForm register={form.register} name="Personal Email" placeholder="you@example.com" />
          <RegisterForm register={form.register} name="MTSU Email"     placeholder="you@mtmail.mtsu.edu" />
        </div>
      </>
    );
  };

  return (
    <section className="max-w-md mx-auto p-6">
      <h3 className="text-2xl font-bold mb-2">
        {type === 'sign-in' ? 'Welcome back!' : 'Get Started Now'}
      </h3>
      <p className="text-center mb-6 text-gray-600">
        {type === 'sign-in'
          ? 'Enter your credentials to access your account'
          : 'Verify your enrollment to continue'}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[25rem]">
          {renderFields()}
          <Button
            type="submit"
            className="w-full p-2 rounded-xl text-white bg-[#38B6FF]"
            disabled={isLoading}
          >
            {isLoading
              ? <Loader2 className="animate-spin" />
              : (type === 'sign-in' ? 'Sign In' : 'Verify')}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        {type === 'sign-in' ? (
          <>
            <span>Don't have an account? </span>
            <Link to="/sign_up" className="text-blue-600 hover:underline">Sign up</Link>
          </>
        ) : (
          <>
            <span>Already verified? </span>
            <Link to="/log_in" className="text-blue-600 hover:underline">Sign In</Link>
          </>
        )}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
  );
}