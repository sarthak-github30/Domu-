import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();

      sessionStorage.setItem("fb_token", token);
      setMessage("✅ Logged in successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();

      sessionStorage.setItem("fb_token", token);
      setMessage("✅ Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Orbs */}
      <motion.div 
        className="absolute top-20 left-16 w-32 h-32 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 100%)',
          filter: 'blur(40px)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute top-1/2 right-20 w-40 h-40 rounded-full"
        style={{
          background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)',
          filter: 'blur(50px)'
        }}
        animate={{ 
          scale: [1.1, 1, 1.1],
          x: [-10, 10, -10],
          y: [10, -10, 10]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full"
        style={{
          background: 'linear-gradient(225deg, rgba(16, 185, 129, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)',
          filter: 'blur(35px)'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center w-full">
          <motion.div 
            className="text-center space-y-8 px-12 max-w-lg"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Logo/Brand */}
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl shadow-blue-500/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">DOMU</span>
              </h1>
              <p className="text-xl text-blue-200 leading-relaxed">
                A PG Management App for streamlined hostel operations, tenant management, and seamless property administration.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-4 text-left max-w-md mx-auto">
              {[
                { icon: "🏠", text: "Complete PG management solution" },
                { icon: "👥", text: "Tenant registration and tracking" },
                { icon: "💰", text: "Automated rent and payment management" },
                { icon: "📊", text: "Real-time occupancy and analytics" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center space-x-3 text-blue-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center space-x-2 mt-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 relative">
        {/* Form Container */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
          <motion.div 
            className="w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile Logo (shown only on small screens) */}
            <motion.div 
              className="lg:hidden text-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">DOMU</span>
              </h1>
            </motion.div>

            {/* Login Card */}
            <Card className="bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/20">
              <CardHeader className="text-center space-y-4 pb-8">
                <motion.div 
                  className="hidden lg:inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {isSignUp ? "Join our PG management platform today" : "Sign in to your account"}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-5">
                  {/* Email Field */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 rounded-lg"
                        placeholder="Enter your email"
                      />
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 rounded-lg"
                        placeholder="Enter your password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </motion.div>

                  {/* Confirm Password Field - Only for Sign Up */}
                  {isSignUp && (
                    <motion.div 
                      variants={itemVariants} 
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="h-11 pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 rounded-lg"
                          placeholder="Confirm your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Remember Me - Only for Login */}
                  {!isSignUp && (
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm">
                        Forgot password?
                      </Button>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {isSignUp ? "Creating Account..." : "Signing In..."}
                        </div>
                      ) : (
                        isSignUp ? "Create Account" : "Sign In"
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Message Display */}
                {message && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-lg text-sm ${
                      message.includes("✅") || message.includes("successfully")
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {message}
                  </motion.div>
                )}

                {/* Social Login Options */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-gray-500">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="h-10 border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="h-10 border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="#1877f2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </motion.div>

                {/* Toggle Sign Up */}
                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-sm text-gray-600">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <Button 
                      type="button"
                      variant="link" 
                      className="p-0 ml-1 text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setMessage("");
                        setConfirmPassword("");
                      }}
                    >
                      {isSignUp ? "Sign in" : "Sign up"}
                    </Button>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
