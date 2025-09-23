import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Clock, AlertTriangle, CheckCircle, Filter, TrendingUp } from "lucide-react";

interface Payment {
  id: string;
  tenantName: string;
  roomNo: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  paidDate?: string;
}

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payments, setPayments] = useState<Payment[]>([
    { id: "1", tenantName: "John Doe", roomNo: "101", amount: 15000, status: "Paid", dueDate: "2024-01-01", paidDate: "2024-01-01" },
    { id: "2", tenantName: "Jane Smith", roomNo: "102", amount: 12000, status: "Pending", dueDate: "2024-01-05" },
    { id: "3", tenantName: "Mike Johnson", roomNo: "103", amount: 18000, status: "Overdue", dueDate: "2023-12-25" },
    { id: "4", tenantName: "Sarah Wilson", roomNo: "201", amount: 16000, status: "Paid", dueDate: "2024-01-01", paidDate: "2024-01-01" },
    { id: "5", tenantName: "David Brown", roomNo: "202", amount: 14000, status: "Pending", dueDate: "2024-01-10" },
    { id: "6", tenantName: "Lisa Davis", roomNo: "203", amount: 17000, status: "Paid", dueDate: "2024-01-01", paidDate: "2024-01-01" },
  ]);

  const markAsPaid = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: "Paid" as const, paidDate: new Date().toISOString().split('T')[0] }
        : payment
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" />Paid</Badge>;
      case "Pending":
        return <Badge variant="warning" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "Overdue":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredPayments = payments.filter(payment => 
    statusFilter === "all" || payment.status === statusFilter
  );

  const totalRevenue = payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0);
  const totalExpected = payments.reduce((sum, p) => sum + p.amount, 0);

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
      <Layout activePage="payments">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                <p className="text-muted-foreground">
                  Track rent payments and manage collections
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Payment Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle className="text-sm font-medium text-emerald-800">Total Revenue</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-md">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    ₹{totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-sm text-emerald-600 font-medium">
                    Collected this month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-yellow-50">
                  <CardTitle className="text-sm font-medium text-amber-800">Pending</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 shadow-md">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    ₹{pendingAmount.toLocaleString()}
                  </div>
                  <p className="text-sm text-amber-600 font-medium">
                    Awaiting payment
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-red-50 to-rose-50">
                  <CardTitle className="text-sm font-medium text-red-800">Overdue</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-100 to-red-200 shadow-md">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    ₹{overdueAmount.toLocaleString()}
                  </div>
                  <p className="text-sm text-red-600 font-medium">
                    Needs attention
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-sm font-medium text-blue-800">Collection Rate</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-md">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {Math.round((totalRevenue / totalExpected) * 100)}%
                  </div>
                  <p className="text-sm text-blue-600 font-medium">
                    Success rate
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Payments Table */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  View and manage all rent payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredPayments.map((payment, index) => (
                        <motion.tr
                          key={payment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            {payment.tenantName}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Room {payment.roomNo}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            ₹{payment.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(payment.status)}
                          </TableCell>
                          <TableCell>
                            {payment.paidDate ? (
                              <span className="text-sm text-muted-foreground">
                                {new Date(payment.paidDate).toLocaleDateString()}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {payment.status !== "Paid" ? (
                              <Button
                                onClick={() => markAsPaid(payment.id)}
                                size="sm"
                                className="gap-2"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Mark as Paid
                              </Button>
                            ) : (
                              <Badge variant="success" className="gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Paid
                              </Badge>
                            )}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
                {filteredPayments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No payments found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>
                  Overview of this month's collections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Collected</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">₹{(pendingAmount + overdueAmount).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Pending</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{Math.round((totalRevenue / totalExpected) * 100)}%</div>
                    <div className="text-sm text-muted-foreground">Collection Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
