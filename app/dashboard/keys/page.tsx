"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";

type APIKey = {
  id: string;
  name: string;
  key: string;
  createdAt: string;
};

export default function Component() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "Production API Key",
      key: "pk_live_123456789",
      createdAt: "2023-06-01",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "pk_test_987654321",
      createdAt: "2023-06-15",
    },
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<APIKey | null>(null);
  const [newKeyName, setNewKeyName] = useState("");

  const handleCreateNewKey = () => {
    const newKey: APIKey = {
      id: (apiKeys.length + 1).toString(),
      name: `New API Key ${apiKeys.length + 1}`,
      key: `pk_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleEditKey = (key: APIKey) => {
    setEditingKey(key);
    setNewKeyName(key.name);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingKey) {
      setApiKeys(
        apiKeys.map((key) =>
          key.id === editingKey.id ? { ...key, name: newKeyName } : key
        )
      );
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">API Keys</h2>
        <Button onClick={handleCreateNewKey}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New API Key
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell>{apiKey.name}</TableCell>
              <TableCell>{apiKey.key}</TableCell>
              <TableCell>{apiKey.createdAt}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditKey(apiKey)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteKey(apiKey.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit API Key</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
