import { Users, MessageCircle, Loader2, AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { useUsers, useStartChat } from "./services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ApiUser } from "@/types/app.type";

export function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: usersData, isLoading, error, refetch } = useUsers();
  const startChatMutation = useStartChat();

  const users = usersData?.data?.users || [];
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartChat = async (user: ApiUser) => {
    try {
      await startChatMutation.mutateAsync({ userId: user.id });
      // You could navigate to the chat here or show a success message
      console.log(`Started chat with ${user.name || user.email}`);
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-7 h-7 mr-3 text-indigo-600" />
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-600">Find and connect with other users</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-7 h-7 mr-3 text-indigo-600" />
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-600">Find and connect with other users</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load users</h3>
            <p className="text-gray-500 mb-4">There was an error loading the users list.</p>
            <Button onClick={() => refetch()} variant="outline">
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Users className="w-7 h-7 mr-3 text-indigo-600" />
          Users
        </h1>
        <p className="mt-2 text-sm text-gray-600">Find and connect with other users</p>
      </div>

      {/* Search and Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-gray-500">
            {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No users found" : "No users available"}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "There are no users to display at the moment"}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-white">
                          {(user.name || user.email).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name || "Anonymous"}</p>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{user.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-500">{formatDate(user.createdAt)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleStartChat(user)}
                      disabled={startChatMutation.isPending}
                      size="sm"
                      className="inline-flex items-center"
                    >
                      {startChatMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <MessageCircle className="w-4 h-4 mr-2" />
                      )}
                      Start Chat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
