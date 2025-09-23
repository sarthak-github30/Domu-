import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Building2, Clock, DollarSign, TrendingUp, Activity, AlertTriangle, CheckCircle, XCircle, Home, User as UserIcon, FileText } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Sample data for charts
  const monthlyData = [
    { month: "Feb", amount: 135000, tenants: 9 },
    { month: "Mar", amount: 128000, tenants: 8 },
    { month: "Apr", amount: 142000, tenants: 10 },
    { month: "May", amount: 138000, tenants: 9 },
    { month: "Jun", amount: 155000, tenants: 12 },
  ];

  const stats = [
    {
      title: "Total Tenants",
      value: "12",
      change: "+2 from last month",
      icon: Users,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Available Rooms",
      value: "5",
      change: "3 occupied",
      icon: Building2,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Pending Payments",
      value: "3",
      change: "₹45,000 pending",
      icon: Clock,
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      title: "Total Revenue",
      value: "₹1,25,000",
      change: "+12% from last month",
      icon: DollarSign,
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
    {
      title: "Total Complaints",
      value: "2",
      change: "1 resolved",
      icon: AlertTriangle,
      bgColor: "bg-blue-600",
      textColor: "text-white",
    },
    {
      title: "Monthly Income",
      value: "₹30,000",
      change: "This month",
      icon: TrendingUp,
      bgColor: "bg-green-600",
      textColor: "text-white",
    },
    {
      title: "Total Tasks",
      value: "8",
      change: "3 completed",
      icon: CheckCircle,
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      title: "Maintenance",
      value: "5",
      change: "2 pending",
      icon: FileText,
      bgColor: "bg-red-600",
      textColor: "text-white",
    },
    {
      title: "Expenses",
      value: "₹4,050",
      change: "This month",
      icon: DollarSign,
      bgColor: "bg-green-700",
      textColor: "text-white",
    },
    {
      title: "Total Rooms",
      value: "10",
      change: "All floors",
      icon: Home,
      bgColor: "bg-orange-600",
      textColor: "text-white",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "tenant",
      message: "New tenant John Doe moved into Room 101",
      time: "2 hours ago",
      icon: Users,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "payment",
      message: "Payment received from Jane Smith (₹12,000)",
      time: "4 hours ago",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "maintenance",
      message: "Maintenance request submitted for Room 203",
      time: "1 day ago",
      icon: Activity,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "room",
      message: "Room 205 is now available",
      time: "2 days ago",
      icon: Building2,
      color: "text-purple-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <ProtectedRoute>
      <Layout activePage="dashboard">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 bg-gray-100 min-h-screen p-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-lg text-gray-600 mt-1">Control panel</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-right"
              >
                <div className="text-sm text-gray-500">
                  Welcome back, {user?.email}
                </div>
                <div className="text-xs text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
              >
                <div className={`${stat.bgColor} rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${stat.textColor}`}>
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <div className={`${stat.textColor} font-semibold text-sm mb-2`}>
                    {stat.title}
                  </div>
                  <div className={`${stat.textColor} text-xs opacity-80`}>
                    {stat.change}
                  </div>
                  <div className="mt-3">
                    <a href="#" className={`${stat.textColor} text-xs underline opacity-80 hover:opacity-100 transition-opacity`}>
                      More info
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Section Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Fully Booked Rooms */}
            <motion.div variants={itemVariants}>
              <div className="bg-purple-600 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">Fully Booked Room</h3>
                    <p className="text-purple-100 text-sm">All rooms occupied</p>
                  </div>
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div className="text-white text-3xl font-bold mb-2">8</div>
                <div className="text-purple-100 text-sm">Out of 10 rooms</div>
                <div className="mt-4">
                  <a href="#" className="text-white text-sm underline opacity-80 hover:opacity-100 transition-opacity">
                    View Details
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Pending Payment */}
            <motion.div variants={itemVariants}>
              <div className="bg-red-600 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">Pending Payment</h3>
                    <p className="text-red-100 text-sm">Awaiting collection</p>
                  </div>
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="text-white text-3xl font-bold mb-2">₹45,000</div>
                <div className="text-red-100 text-sm">From 3 tenants</div>
                <div className="mt-4">
                  <a href="#" className="text-white text-sm underline opacity-80 hover:opacity-100 transition-opacity">
                    View Details
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="mt-8">
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${activity.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
