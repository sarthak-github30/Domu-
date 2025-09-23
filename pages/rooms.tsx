import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Plus, Users, CheckCircle, XCircle, Home, User } from "lucide-react";

interface Room {
  id: string;
  roomNo: string;
  capacity: number;
  status: "Available" | "Occupied";
  currentTenant?: string;
  rent: number;
  floor: string;
}

export default function RoomsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", roomNo: "101", capacity: 2, status: "Occupied", currentTenant: "John Doe", rent: 15000, floor: "1st" },
    { id: "2", roomNo: "102", capacity: 1, status: "Available", rent: 12000, floor: "1st" },
    { id: "3", roomNo: "103", capacity: 2, status: "Occupied", currentTenant: "Mike Johnson", rent: 18000, floor: "1st" },
    { id: "4", roomNo: "201", capacity: 1, status: "Available", rent: 16000, floor: "2nd" },
    { id: "5", roomNo: "202", capacity: 2, status: "Occupied", currentTenant: "David Brown", rent: 14000, floor: "2nd" },
    { id: "6", roomNo: "203", capacity: 1, status: "Available", rent: 17000, floor: "2nd" },
    { id: "7", roomNo: "301", capacity: 2, status: "Occupied", currentTenant: "Sarah Wilson", rent: 19000, floor: "3rd" },
    { id: "8", roomNo: "302", capacity: 1, status: "Available", rent: 15000, floor: "3rd" },
  ]);

  const [newRoom, setNewRoom] = useState({
    roomNo: "",
    capacity: "",
    rent: "",
    floor: "",
  });

  const toggleRoomStatus = (roomId: string) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          status: room.status === "Available" ? "Occupied" : "Available",
          currentTenant: room.status === "Available" ? "New Tenant" : undefined
        };
      }
      return room;
    }));
  };

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoom.roomNo && newRoom.capacity && newRoom.rent) {
      const room: Room = {
        id: Date.now().toString(),
        roomNo: newRoom.roomNo,
        capacity: parseInt(newRoom.capacity),
        status: "Available",
        rent: parseInt(newRoom.rent),
        floor: newRoom.floor,
      };
      setRooms([...rooms, room]);
      setNewRoom({ roomNo: "", capacity: "", rent: "", floor: "" });
      setIsModalOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Available" 
      ? <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" />Available</Badge>
      : <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Occupied</Badge>;
  };

  const availableRooms = rooms.filter(room => room.status === "Available").length;
  const occupiedRooms = rooms.filter(room => room.status === "Occupied").length;
  const occupancyRate = Math.round((occupiedRooms / rooms.length) * 100);

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
      <Layout activePage="rooms">
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
                <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
                <p className="text-muted-foreground">
                  Manage your PG rooms and occupancy status
                </p>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Room
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Room</DialogTitle>
                    <DialogDescription>
                      Enter the room details to add it to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddRoom} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomNo">Room Number</Label>
                      <Input
                        id="roomNo"
                        value={newRoom.roomNo}
                        onChange={(e) => setNewRoom({ ...newRoom, roomNo: e.target.value })}
                        placeholder="e.g., 101, 102"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor">Floor</Label>
                      <Input
                        id="floor"
                        value={newRoom.floor}
                        onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
                        placeholder="e.g., 1st, 2nd, 3rd"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        placeholder="Number of people"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rent">Rent Amount</Label>
                      <Input
                        id="rent"
                        type="number"
                        value={newRoom.rent}
                        onChange={(e) => setNewRoom({ ...newRoom, rent: e.target.value })}
                        placeholder="Monthly rent"
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Room</Button>
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
                  <CardTitle className="text-sm font-medium text-blue-800">Total Rooms</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-md">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {rooms.length}
                  </div>
                  <p className="text-sm text-blue-600 font-medium">
                    Across all floors
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardTitle className="text-sm font-medium text-emerald-800">Available</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-md">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {availableRooms}
                  </div>
                  <p className="text-sm text-emerald-600 font-medium">
                    Ready for tenants
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-red-50 to-rose-50">
                  <CardTitle className="text-sm font-medium text-red-800">Occupied</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-100 to-red-200 shadow-md">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    {occupiedRooms}
                  </div>
                  <p className="text-sm text-red-600 font-medium">
                    Currently occupied
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="border-2 border-violet-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-violet-50 to-purple-50">
                  <CardTitle className="text-sm font-medium text-violet-800">Occupancy Rate</CardTitle>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 shadow-md">
                    <Users className="h-5 w-5 text-violet-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    {occupancyRate}%
                  </div>
                  <p className="text-sm text-violet-600 font-medium">
                    Current utilization
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Rooms Grid */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Room Details</CardTitle>
                <CardDescription>
                  View and manage all rooms in your PG
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {rooms.map((room, index) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-semibold">Room {room.roomNo}</h4>
                            <p className="text-sm text-muted-foreground">{room.floor} Floor</p>
                          </div>
                          {getStatusBadge(room.status)}
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Capacity:</span>
                            <span className="font-medium flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rent:</span>
                            <span className="font-medium">₹{room.rent.toLocaleString()}</span>
                          </div>
                          
                          {room.currentTenant && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Tenant:</span>
                              <span className="font-medium flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {room.currentTenant}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          onClick={() => toggleRoomStatus(room.id)}
                          variant={room.status === "Available" ? "destructive" : "default"}
                          size="sm"
                          className="w-full"
                        >
                          {room.status === "Available" ? "Mark as Occupied" : "Mark as Available"}
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
}
