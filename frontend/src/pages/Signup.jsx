import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';
import { Codesandbox } from 'lucide-react';
import { Link } from 'react-router';

const signupSchema = z.object({
  firstname: z.string().min(3, "Minimum character should be 3"),
  lastname: z.string().min(3, "Minimum character should be 3"),
  email: z.string().email("Invalid Email"),
  password: z
  .string()
  .min(8)
  .refine(
    (val) =>
      /[a-z]/.test(val) &&
      /[A-Z]/.test(val) &&
      /[0-9]/.test(val) &&
      /[^A-Za-z0-9]/.test(val),
    {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }
  )

});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth); // Removed error as it wasn't used

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    console.log("Form Data Submitted:", data); // Debug log to verify form data
  };

  return (
    <div>
       <div className="navbar px-10 sticky top-0 bg-gray-600/50 backdrop-blur-md border-b border-base-300/30 relative z-10">
              <div className="flex-1 text-xl font-bold flex items-center gap-2">
                <Codesandbox size={38} color="#bea60e" /> Coding Zone
              </div>
      
              <div className="flex gap-3">
                <Link to="/about" className="btn btn-ghost btn-sm">
                  About
                </Link>
      
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
      
                <Link
                  to="/signup"
                  className="btn bg-yellow-600/90 text-black border-none btn-sm shadow-lg hover:scale-105 transition"
                >
                  Sign Up
                </Link>
              </div>
            </div>

    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200"> {/* Added a light bg for contrast */}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl mb-6 text-yellow-600/90">Coding Zone</h2> {/* Added mb-6 for spacing */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className={`input input-bordered w-full ${errors.firstname ? 'input-error' : ''}`} 
                {...register('firstname')}
              />
              {errors.firstname && (
                <span className="text-error text-sm mt-1">{errors.firstname.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Doe"
                className={`input input-bordered w-full ${errors.lastname ? 'input-error' : ''}`} 
                {...register('lastname')}
              />
              {errors.lastname && (
                <span className="text-error text-sm mt-1">{errors.lastname.message}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} // Ensure w-full for consistency
                {...register('email')}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field with Toggle */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  // Added pr-10 (padding-right) to make space for the button
                  className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-sm mt-1">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8 flex justify-center"> 
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          {/* Login Redirect */}
          <div className="text-center mt-6"> {/* Increased mt for spacing */}
            <span className="text-sm">
              Already have an account?{' '}
              <NavLink to="/login" className="link link-primary">
                Login
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;