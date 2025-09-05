import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Divider from '../Components/Divider';
import GoogleButton from '../Components/GoogleButton';
import { auth, db } from '../Config/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const ClientLogin = () => {
  const [activeForm, setActiveForm] = useState('signup');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', { uid: user.uid, email: user.email, displayName: user.displayName });
        navigate('/chat', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const signUp = async () => {
    setIsLoading(true);
    try {
      console.log('Attempting client sign-up with:', { email: formData.email });
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log('Client created:', { uid: user.uid, email: user.email });
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      await updateProfile(user, { displayName });
      console.log('Profile updated with displayName:', displayName);
      await setDoc(doc(db, 'client', user.uid), {
        displayName,
        email: formData.email,
        uid: user.uid,
        photoURL: user.photoURL || '',
      });
      console.log('Client data saved to Firestore');
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setErrors({});
      setSubmitted(false);
    } catch (error) {
      console.error('Firebase sign-up error:', error.code, error.message);
      setErrors({ form: `Sign-up failed: ${error.message}` });
      setIsLoading(false);
    }
  };

  const signInUser = async () => {
    setIsLoading(true);
    try {
      console.log('Attempting client sign-in with:', { email: formData.email });
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Client signed in:', { uid: userCredential.user.uid, email: userCredential.user.email });
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setErrors({});
      setSubmitted(false);
    } catch (error) {
      console.error('Firebase sign-in error:', error.code, error.message);
      setErrors({ form: `Sign-in failed: ${error.message}` });
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setSubmitted(true);
    const googleErrors = {
      firstName: validate.firstName(formData.firstName),
      lastName: validate.lastName(formData.lastName),
    };
    if (googleErrors.firstName || googleErrors.lastName) {
      setErrors(googleErrors);
      setIsLoading(false);
      return;
    }
    try {
      console.log('Attempting Google sign-in');
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log('Google user:', { uid: user.uid, email: user.email, displayName: user.displayName });
      const displayName = formData.firstName && formData.lastName 
        ? `${formData.firstName} ${formData.lastName}`.trim() 
        : user.displayName || 'Client';
      await updateProfile(user, { displayName });
      console.log('Profile updated with displayName:', displayName);
      await setDoc(doc(db, 'client', user.uid), {
        displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL || '',
      }, { merge: true });
      console.log('Client data saved to Firestore');
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setErrors({});
      setSubmitted(false);
    } catch (error) {
      console.error('Google sign-in error:', error.code, error.message);
      setErrors({ form: `Google sign-in failed: ${error.message}` });
      setIsLoading(false);
    }
  };

  // Validation rules
  const validate = {
    firstName: (value) => {
      if (activeForm === 'signup' && !value.trim()) return 'First name is required';
      if (value && value.length < 2) return 'Name too short';
      if (value && value.length > 30) return 'Name too long';
      return '';
    },
    lastName: (value) => {
      if (activeForm === 'signup' && !value.trim()) return 'Last name is required';
      if (value && value.length < 2) return 'Name too short';
      if (value && value.length > 30) return 'Name too long';
      return '';
    },
    email: (value) => {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
      return '';
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/[A-Z]/.test(value)) return 'Must contain at least one uppercase letter';
      if (!/[a-z]/.test(value)) return 'Must contain at least one lowercase letter';
      if (!/[0-9]/.test(value)) return 'Must contain at least one number';
      return '';
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, form: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (activeForm === 'signup') {
      newErrors.firstName = validate.firstName(formData.firstName);
      newErrors.lastName = validate.lastName(formData.lastName);
    }
    newErrors.email = validate.email(formData.email);
    newErrors.password = validate.password(formData.password);

    for (const field in newErrors) {
      if (newErrors[field]) isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      console.log('Form submitted:', formData);
      try {
        if (activeForm === 'signup') {
          await signUp();
        } else {
          await signInUser();
        }
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  const shouldShowError = (field) => submitted && errors[field];

  const buttonVariants = {
    active: { color: '#000000' },
    inactive: { color: '#ffffff' },
  };

  const formVariants = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  const toggleVariants = {
    active: { x: activeForm === 'signup' ? 0 : '100%' },
  };

  return (
    <section className="nunito container mx-auto md:py-20 md:px-15 bg-gradient-to-r from-purple-600 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-lg shadow-glass rounded-lg p-5 max-w-md mx-auto min-h-[80vh]"
      >
        {errors.form && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mb-4 text-center"
          >
            {errors.form}
          </motion.p>
        )}
        <div className="relative h-12 w-48 rounded-full bg-white/15 mb-8 mx-auto overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-full"
            variants={toggleVariants}
            animate="active"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          <button
            onClick={() => {
              setActiveForm('signup');
              setSubmitted(false);
              setFormData({ firstName: '', lastName: '', email: '', password: '' });
              setErrors({});
            }}
            className="absolute top-0 left-0 w-1/2 h-full z-10 flex items-center justify-center"
          >
            <motion.span
              className="text-xs font-bold"
              initial={false}
              animate={activeForm === 'signup' ? 'active' : 'inactive'}
              variants={buttonVariants}
              transition={{ duration: 0.3 }}
            >
              Sign Up
            </motion.span>
          </button>
          <button
            onClick={() => {
              setActiveForm('signin');
              setSubmitted(false);
              setFormData({ firstName: '', lastName: '', email: '', password: '' });
              setErrors({});
            }}
            className="absolute top-0 right-0 w-1/2 h-full z-10 flex items-center justify-center"
          >
            <motion.span
              className="text-xs font-bold"
              initial={false}
              animate={activeForm === 'signin' ? 'active' : 'inactive'}
              variants={buttonVariants}
              transition={{ duration: 0.3 }}
            >
              Sign In
            </motion.span>
          </button>
        </div>
        <AnimatePresence mode="wait">
          {activeForm === 'signup' ? (
            <motion.form
              key="signup"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleSubmit}
              className="space-y-4"
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl font-extrabold">Create an account</h1>
              </motion.div>
              <motion.div
                className="grid md:grid-cols-2 grid-cols-1 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`placeholder-black p-3 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-lg shadow-glass focus:ring-2 focus:ring-white/50 focus:outline-none transition-all w-full ${
                      shouldShowError('firstName') ? 'border-red-500 border' : ''
                    }`}
                    placeholder="First name"
                  />
                  {shouldShowError('firstName') && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`placeholder-black p-3 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-lg shadow-glass focus:ring-2 focus:ring-white/50 focus:outline-none transition-all w-full ${
                      shouldShowError('lastName') ? 'border-red-500 border' : ''
                    }`}
                    placeholder="Last name"
                  />
                  {shouldShowError('lastName') && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`placeholder-black p-3 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-lg shadow-glass focus:ring-2 focus:ring-white/50 focus:outline-none transition-all w-full ${
                    shouldShowError('email') ? 'border-red-500 border' : ''
                  }`}
                  placeholder="Email"
                />
                {shouldShowError('email') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`placeholder-black p-3 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-lg shadow-glass focus:ring-2 focus:ring-white/50 focus:outline-none transition-all w-full ${
                    shouldShowError('password') ? 'border-red-500 border' : ''
                  }`}
                  placeholder="Password"
                />
                {shouldShowError('password') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 text-xs font-bold rounded-lg bg-white text-purple-600 shadow-glass hover:shadow-glass-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create account'}
                </motion.button>
              </motion.div>
              <Divider delay={0.6} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <GoogleButton icon="Google" delay={0.7} onClick={signInWithGoogle} disabled={isLoading} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="md:text-center"
              >
                <p className="text-[0.70rem] font-medium">
                  By creating an account, you agree to our Terms and Services.
                </p>
              </motion.div>
            </motion.form>
          ) : (
            <motion.form
              key="signin"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleSubmit}
              className="space-y-4"
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl font-extrabold">Welcome back</h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`placeholder-black p-3 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-lg shadow-glass focus:ring-2 focus:ring-white/50 focus:outline-none transition-all w-full ${
                    shouldShowError('email') ? 'border-red-500 border' : ''
                  }`}
                  placeholder="Email"
                />
                {shouldShowError('email') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`placeholder-black p-3 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-lg shadow-glass focus:ring-2 focus:ring-white/50 focus:outline-none transition-all w-full ${
                    shouldShowError('password') ? 'border-red-500 border' : ''
                  }`}
                  placeholder="Password"
                />
                {shouldShowError('password') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 text-xs font-bold rounded-lg bg-white text-purple-600 shadow-glass hover:shadow-glass-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </motion.button>
              </motion.div>
              <Divider delay={0.5} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <GoogleButton icon="Google" delay={0.6} onClick={signInWithGoogle} disabled={isLoading} />
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ClientLogin;