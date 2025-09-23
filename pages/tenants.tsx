import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Filter } from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  roomNo: string;
  rentStatus: "Paid" | "Pending" | "Overdue";
  rent: number;
  joinDate: string;
  phone: string;
  email: string;
}

export default function TenantsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tenants, setTenants] = useState<Tenant[]>([
    { id: "1", name: "John Doe", roomNo: "101", rentStatus: "Paid", rent: 15000, joinDate: "2024-01-15", phone: "+91 98765 43210", email: "john@example.com" },
    { id: "2", name: "Jane Smith", roomNo: "102", rentStatus: "Pending", rent: 12000, joinDate: "2024-01-20", phone: "+91 98765 43211", email: "jane@example.com" },
    { id: "3", name: "Mike Johnson", roomNo: "103", rentStatus: "Overdue", rent: 18000, joinDate: "2024-01-10", phone: "+91 98765 43212", email: "mike@example.com" },
    { id: "4", name: "Sarah Wilson", roomNo: "201", rentStatus: "Paid", rent: 16000, joinDate: "2024-01-25", phone: "+91 98765 43213", email: "sarah@example.com" },
    { id: "5", name: "David Brown", roomNo: "202", rentStatus: "Pending", rent: 14000, joinDate: "2024-01-30", phone: "+91 98765 43214", email: "david@example.com" },
    { id: "6", name: "Lisa Davis", roomNo: "203", rentStatus: "Paid", rent: 17000, joinDate: "2024-02-01", phone: "+91 98765 43215", email: "lisa@example.com" },
  ]);

  const [newTenant, setNewTenant] = useState({
    name: "",
    roomNo: "",
    rent: "",
    phone: "",
    email: "",
  });

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTenant.name && newTenant.roomNo && newTenant.rent) {
      const tenant: Tenant = {
        id: Date.now().toString(),
        name: newTenant.name,
        roomNo: newTenant.roomNo,
        rentStatus: "Pending",
        rent: parseInt(newTenant.rent),
        joinDate: new Date().toISOString().split('T')[0],
        phone: newTenant.phone,
        email: newTenant.email,
      };
      setTenants([...tenants, tenant]);
      setNewTenant({ name: "", roomNo: "", rent: "", phone: "", email: "" });
      setIsModalOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge variant="success">Paid</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.roomNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tenant.rentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      <Layout activePage="tenants">
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
                <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
                <p className="text-muted-foreground">
                  Manage your PG tenants and their information
                </p>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Tenant
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Tenant</DialogTitle>
                    <DialogDescription>
                      Enter the tenant's information to add them to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddTenant} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newTenant.name}
                        onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                        placeholder="Enter tenant's full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roomNo">Room Number</Label>
                      <Input
                        id="roomNo"
                        value={newTenant.roomNo}
                        onChange={(e) => setNewTenant({ ...newTenant, roomNo: e.target.value })}
                        placeholder="e.g., 101, 102"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rent">Rent Amount</Label>
                      <Input
                        id="rent"
                        type="number"
                        value={newTenant.rent}
                        onChange={(e) => setNewTenant({ ...newTenant, rent: e.target.value })}
                        placeholder="Enter monthly rent"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newTenant.phone}
                        onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newTenant.email}
                        onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                        placeholder="tenant@example.com"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Tenant</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-sm font-medium text-blue-800">Total Tenants</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-md">
                    <Search className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {tenants.length}
                  </div>
                  <p className="text-sm text-blue-600 font-medium">
                    {filteredTenants.length} shown
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle className="text-sm font-medium text-emerald-800">Paid</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-md">
                    <div className="h-5 w-5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {tenants.filter(t => t.rentStatus === "Paid").length}
                  </div>
                  <p className="text-sm text-emerald-600 font-medium">
                    Up to date
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-yellow-50">
                  <CardTitle className="text-sm font-medium text-amber-800">Pending</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 shadow-md">
                    <div className="h-5 w-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {tenants.filter(t => t.rentStatus === "Pending").length}
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
                    <div className="h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    {tenants.filter(t => t.rentStatus === "Overdue").length}
                  </div>
                  <p className="text-sm text-red-600 font-medium">
                    Needs attention
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Tenant Management</CardTitle>
                <CardDescription>
                  Search and filter your tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tenants by name or room..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="all">All Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tenants Table */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Tenant List</CardTitle>
                <CardDescription>
                  View and manage all tenant information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Rent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredTenants.map((tenant, index) => (
                        <motion.tr
                          key={tenant.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            <div>
                              <div className="font-semibold">{tenant.name}</div>
                              <div className="text-sm text-muted-foreground">{tenant.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Room {tenant.roomNo}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            ₹{tenant.rent.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(tenant.rentStatus)}
                          </TableCell>
                          <TableCell>
                            {new Date(tenant.joinDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{tenant.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
                {filteredTenants.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No tenants found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
