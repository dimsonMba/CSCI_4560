import React, { useState, useEffect } from 'react';
import { useNavigate }               from 'react-router-dom';
import { useForm }                    from 'react-hook-form';
import { zodResolver }                from '@hookform/resolvers/zod';
import { z }                          from 'zod';
import { Button }                     from '../ui/button';
import { Loader2 }                    from 'lucide-react';
import { Form }                       from '../ui/form';
import RegisterForm                   from './RegisterForm';
import api                            from '../../api';

// Schema now includes Username & Password
const formSchema = z.object({
  "First name": z.string().min(3, { message: 'First name must be at least 3 characters' }),
  "Last name": z.string().min(3, { message: 'Last name must be at least 3 characters' }),
  "Personal Email": z.string().email({ message: 'Invalid email format' }),
  "MTSU Email": z.string().email({ message: 'Invalid email format' }),
  "MTSU Number": z.string().min(6, { message: 'M Number must be at least 6 characters' }),
  "Phone Number": z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  "Graduation Year": z.string().length(4, { message: 'Enter a valid 4-digit year' }),
  "Major": z.string().min(3, { message: 'Choose your major' }),
  "Username":        z.string().min(3, { message: 'Username must be at least 3 characters' }),
  "Password": z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function AuthRegister({ initialData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'First name':      '',
      'Last name':       '',
      'Personal Email':  '',
      'MTSU Email':      '',
      'MTSU Number':     '',
      'Phone Number':    '',
      'Graduation Year': '',
      'Major':           '',
      'Username':        '',
      'Password':        '',
    },
  });

  // Pre‑fill verified fields
  useEffect(() => {
    if (initialData) {
      form.reset({
        'First name':      initialData.first_name,
        'Last name':       initialData.last_name,
        'Personal Email':  initialData.personal_email || '',
        'MTSU Email':      initialData.mtsu_email,
        'MTSU Number':     String(initialData.student_id),
        'Phone Number':    initialData.phone_number || '',
        'Graduation Year': String(initialData.graduation_year),
        'Major':           initialData.major,
        'Username':        '',
        'Password':        '',
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      student_id:      parseInt(data['MTSU Number'], 10),
      first_name:      data['First name'],
      last_name:       data['Last name'],
      personal_email:  data['Personal Email'],
      mtsu_email:      data['MTSU Email'],
      phone_number:    data['Phone Number'],
      graduation_year: parseInt(data['Graduation Year'], 10),
      major:           data['Major'],
      username:        data['Username'],
      password:        data['Password'],
    };

    try {
      const res = await api.post('register/', payload);
      if (res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/chatpage');
      } else {
        setError(res.data.error || 'Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto justify-items-center">
      <h3 className="text-black text-2xl font-bold mb-1">Get Started Now</h3>
      <p className="text-black text-center pt-1 pr-4 pl-4 pb-5">
        Connect with classmates in your major effortlessly.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[30rem]">
          {/* two‑column rows */}
          <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="First name" placeholder="Enter your first name" />
            <RegisterForm register={form.register} name="Last name"  placeholder="Enter your last name"  />
          </div>
          <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="MTSU Number"     placeholder="Enter your MTSU ID" />
            <RegisterForm register={form.register} name="Graduation Year" placeholder="Ex: 2026"         />
          </div>
          <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="Personal Email" placeholder="you@example.com" />
            <RegisterForm register={form.register} name="MTSU Email"     placeholder="you@mtmail.mtsu.edu" />
          </div>
          <div className="flex gap-4 [&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="Username" placeholder="Choose a username" />
            <RegisterForm register={form.register} name="Password" placeholder="Create a password" />
          </div>

          {/* full‑width rows */}
          <div className="[&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="Major"         placeholder="Ex: Computer Science" />
          </div>
          <div className="[&_input]:w-full [&_input]:p-3 [&_input]:border [&_input]:rounded-xl">
            <RegisterForm register={form.register} name="Phone Number" placeholder="123‑456‑7890"       />
          </div>

          {/* terms checkbox */}
          <div className='flex items-center gap-4'>
            <input id="SaveInfo" type='checkbox' className="h-5 w-5 text-blue-600 bg-white border border-black rounded-sm focus:ring-2 focus:ring-blue-500 hover:bg-white hover:border-blue-500 data-[state=unchecked]:bg-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
            <label for="SaveInfo" className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-100">I agree with the <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">terms & policy</a></label>
          </div>

          <Button type="submit" className="w-full p-2 rounded-xl text-white text-2xl bg-[#38B6FF] hover:bg-blue-500" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Register'}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Form>
    </section>
  );
}