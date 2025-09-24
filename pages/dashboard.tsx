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

  // Realistic data for charts
  const monthlyData = [
    { month: "Jan", amount: 142000, tenants: 14 },
    { month: "Feb", amount: 135000, tenants: 13 },
    { month: "Mar", amount: 148000, tenants: 15 },
    { month: "Apr", amount: 139000, tenants: 14 },
    { month: "May", amount: 152000, tenants: 16 },
  ];

  const stats = [
    {
      title: "Total Tenants",
      value: "15",
      change: "+1 from last month",
      icon: Users,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Available Rooms",
      value: "3",
      change: "17 occupied",
      icon: Building2,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Pending Rent",
      value: "2",
      change: "₹24,000 overdue",
      icon: Clock,
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      title: "Monthly Revenue",
      value: "₹1,45,000",
      change: "+8% from last month",
      icon: DollarSign,
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
    {
      title: "Active Complaints",
      value: "1",
      change: "2 resolved this week",
      icon: AlertTriangle,
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      title: "Monthly Expenses",
      value: "₹18,500",
      change: "Maintenance & utilities",
      icon: TrendingUp,
      bgColor: "bg-indigo-500",
      textColor: "text-white",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "payment",
      message: "Rent payment received from Priya Sharma (Room 204) - ₹12,000",
      time: "45 minutes ago",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "tenant",
      message: "Rahul Kumar completed move-in process for Room 107",
      time: "2 hours ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "maintenance",
      message: "WiFi connectivity issue reported in Room 205 - Assigned to technician",
      time: "4 hours ago",
      icon: Activity,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "complaint",
      message: "Hot water complaint in Room 103 marked as resolved",
      time: "6 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 5,
      type: "room",
      message: "Room 301 lease renewal signed for 11 months",
      time: "1 day ago",
      icon: Building2,
      color: "text-purple-600",
    },
    {
      id: 6,
      type: "expense",
      message: "Monthly electricity bill paid - ₹8,200",
      time: "2 days ago",
      icon: FileText,
      color: "text-red-600",
    },
  ];

  const urgentItems = [
    {
      id: 1,
      title: "Overdue Rent Payment",
      description: "Amit Singh (Room 302) - 5 days overdue",
      amount: "₹12,000",
      priority: "high",
      type: "payment"
    },
    {
      id: 2,
      title: "AC Repair Required",
      description: "Room 205 - Cooling issue reported",
      priority: "medium",
      type: "maintenance"
    },
    {
      id: 3,
      title: "Contract Expiring Soon",
      description: "3 tenants&apos; contracts expire in 15 days",
      priority: "medium",
      type: "contract"
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
          className="space-y-6 bg-gray-50 min-h-screen p-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening at your PG.</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-xs text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-full`}>
                        <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts and Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Revenue Chart */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Monthly Revenue Trend</CardTitle>
                  <CardDescription>Revenue and tenant count over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          formatter={(value, name) => [
                            name === 'amount' ? `₹${value.toLocaleString()}` : value,
                            name === 'amount' ? 'Revenue' : 'Tenants'
                          ]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Urgent Actions */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                    Urgent Actions
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {urgentItems.map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-orange-400">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm text-gray-900">{item.title}</h4>
                        {item.amount && (
                          <span className="text-sm font-semibold text-red-600">{item.amount}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{item.description}</p>
                      <div className="mt-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.priority === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.priority} priority
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Stats Row */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Occupancy Rate */}
              <Card className="border-0 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Occupancy Rate</p>
                      <p className="text-3xl font-bold">85%</p>
                      <p className="text-blue-100 text-xs">17 of 20 rooms occupied</p>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-100" />
                  </div>
                </CardContent>
              </Card>

              {/* Collection Rate */}
              <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Collection Rate</p>
                      <p className="text-3xl font-bold">92%</p>
                      <p className="text-green-100 text-xs">13 of 15 tenants paid</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-100" />
                  </div>
                </CardContent>
              </Card>

              {/* Average Stay */}
              <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Average Stay</p>
                      <p className="text-3xl font-bold">8.5</p>
                      <p className="text-purple-100 text-xs">months per tenant</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-100" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <CardDescription>Latest updates from your PG management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${activity.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
