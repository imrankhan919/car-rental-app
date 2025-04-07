import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";



// Sample data
const userData = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john.smith@example.com",
    joinDate: "2023-01-15",
    status: "active",
    rentals: 3,
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    joinDate: "2023-02-20",
    status: "active",
    rentals: 2,
  },
  {
    id: "USR-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    joinDate: "2023-01-10",
    status: "inactive",
    rentals: 1,
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    joinDate: "2023-03-05",
    status: "active",
    rentals: 4,
  },
  {
    id: "USR-005",
    name: "James Wilson",
    email: "james.w@example.com",
    joinDate: "2023-02-28",
    status: "active",
    rentals: 2,
  },
];

const UsersTable = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">User Management</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total Rentals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{user.rentals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;