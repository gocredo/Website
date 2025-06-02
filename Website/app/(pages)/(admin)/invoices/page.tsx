"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {

  Badge,
} from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Checkbox,} from "../../../../components/ui/checkbox";
import {  Input,
  } from "../../../../components/ui/input";
import { Card,
  } from "../../../../components/ui/card";
import { Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter, } from "../../../../components/ui/drawer";
import {  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,} from "../../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import { Plus, Download, Edit, Trash, Send, CreditCard, FileText, MoreHorizontal } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";
import html2pdf from "html2pdf.js";

// Types
type SortKey = "id" | "businessId" | "amount" | "status" | "createdAt" | "dueDate";
type InvoiceTemplateKey = "modern" | "classic" | "minimal";

interface Client {
  id: string;
  name: string;
  businessId: string;
}

interface Invoice {
  id: string;
  businessId: string;
  clientId: string;
  amount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
  createdAt: string;
  dueDate: string;
  template: InvoiceTemplateKey;
  items: { description: string; quantity: number; price: number }[];
  tax: number;
  discount: number;
  paymentMethod: string | null;
  paymentDate: string | null;
  comments: { user: string; text: string; date: string }[];
}

// Mock Data
const data: { clients: Client[]; invoices: Invoice[] } = {
  clients: [
    { id: "c1", name: "TechCorp", businessId: "1" },
    { id: "c2", name: "StyleBoutique", businessId: "2" },
  ],
  invoices: [
    {
      id: "1",
      businessId: "1",
      clientId: "c1",
      amount: 5000,
      status: "PAID",
      createdAt: "2024-06-01",
      dueDate: "2024-06-15",
      template: "modern",
      items: [{ description: "SEO Services", quantity: 1, price: 5000 }],
      tax: 18,
      discount: 0,
      paymentMethod: "UPI",
      paymentDate: "2024-06-05",
      comments: [{ user: "Vishal", text: "Payment confirmed", date: "2024-06-05" }],
    },
    {
      id: "2",
      businessId: "2",
      clientId: "c2",
      amount: 3000,
      status: "PENDING",
      createdAt: "2024-06-02",
      dueDate: "2024-06-16",
      template: "classic",
      items: [{ description: "Social Media Campaign", quantity: 1, price: 3000 }],
      tax: 18,
      discount: 0,
      paymentMethod: null,
      paymentDate: null,
      comments: [],
    },
    ...Array.from({ length: 18 }, (_, i) => ({
      id: `${i + 3}`,
      businessId: `${(i % 2) + 1}`,
      clientId: `c${(i % 2) + 1}`,
      amount: 2000 + i * 1000,
      status: ["PAID", "PENDING", "OVERDUE"][i % 3] as "PAID" | "PENDING" | "OVERDUE",
      createdAt: `2024-05-${30 - (i % 10)}`,
      dueDate: `2024-06-${10 + (i % 10)}`,
      template: ["modern", "classic", "minimal"][i % 3] as InvoiceTemplateKey,
      items: [{ description: `Service ${i + 3}`, quantity: 1, price: 2000 + i * 1000 }],
      tax: 18,
      discount: 0,
      paymentMethod: i % 2 === 0 ? "Stripe" : null,
      paymentDate: i % 2 === 0 ? `2024-06-0${i % 5 + 1}` : null,
      comments: [],
    })),
  ],
};

// Invoice Templates
const invoiceTemplates: Record<InvoiceTemplateKey, { name: string; logo: string; color: string; terms: string }> = {
  modern: { name: "Modern", logo: "https://via.placeholder.com/150", color: "#A855F7", terms: "Payment due within 15 days." },
  classic: { name: "Classic", logo: "https://via.placeholder.com/150", color: "#3B82F6", terms: "Net 30 days." },
  minimal: { name: "Minimal", logo: "https://via.placeholder.com/150", color: "#10B981", terms: "Due on receipt." },
};

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" }>({ key: "createdAt", direction: "desc" });
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting
  const requestSort = useCallback((key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const sortedInvoices = useMemo(() => {
    const sortableItems = [...data.invoices];
    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortableItems;
  }, [sortConfig]);

  // Filtering
  const filteredInvoices = useMemo(() => {
    const [startDate, endDate] = dateRange;
    return sortedInvoices.filter(
      (i) =>
        (i.id.includes(searchTerm) || data.clients.find((c) => c.id === i.clientId)?.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || i.status === statusFilter) &&
        (businessFilter === "all" || i.businessId === businessFilter) &&
        (!startDate || new Date(i.createdAt) >= startDate) &&
        (!endDate || new Date(i.createdAt) <= endDate)
    );
  }, [searchTerm, statusFilter, businessFilter, dateRange, sortedInvoices]);

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleBulkAction = useCallback((action: "delete" | "sendReminders") => {
    if (action === "delete") {
      alert(`Deleting ${selectedInvoices.length} invoices`);
    } else {
      alert(`Sending reminders for ${selectedInvoices.length} invoices`);
    }
    setSelectedInvoices([]);
  }, [selectedInvoices]);

  const handleExport = useCallback(() => {
    const csvData = filteredInvoices.map((i) => ({
      ID: i.id,
      Client: data.clients.find((c) => c.id === i.clientId)?.name,
      BusinessID: i.businessId,
      Amount: `₹${i.amount}`,
      Status: i.status,
      CreatedAt: i.createdAt,
      DueDate: i.dueDate,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoices.csv";
    link.click();
    document.body.removeChild(link);
  }, [filteredInvoices]);

  const generateInvoicePDF = useCallback((invoice: Invoice) => {
    const template = invoiceTemplates[invoice.template];
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="font-family: Arial; padding: 20px; background: #fff; color: #000;">
        <img src="${template.logo}" style="max-width: 150px;" />
        <h2 style="color: ${template.color};">Invoice #${invoice.id}</h2>
        <p><strong>Client:</strong> ${data.clients.find((c) => c.id === invoice.clientId)?.name}</p>
        <p><strong>Date:</strong> ${invoice.createdAt}</p>
        <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: ${template.color}; color: white;">
              <th style="padding: 8px;">Description</th>
              <th style="padding: 8px;">Qty</th>
              <th style="padding: 8px;">Price</th>
              <th style="padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map((item) => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.description}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">₹${item.price}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">₹${item.quantity * item.price}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <p><strong>Subtotal:</strong> ₹${invoice.amount}</p>
        <p><strong>Tax (18%):</strong> ₹${(invoice.amount * invoice.tax / 100).toFixed(2)}</p>
        <p><strong>Total:</strong> ₹${(invoice.amount * (1 + invoice.tax / 100)).toFixed(2)}</p>
        <p>${template.terms}</p>
      </div>
    `;
    html2pdf().from(element).save(`invoice_${invoice.id}.pdf`);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Invoices
      </motion.h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Input
            placeholder="Search invoices or clients..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="max-w-md bg-gray-900 border-gray-700 text-white"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={businessFilter} onValueChange={setBusinessFilter}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Business" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="all">All Businesses</SelectItem>
              {[...new Set(data.invoices.map((i) => i.businessId))].map((id) => (
                <SelectItem key={id} value={id}>
                  {data.clients.find((c) => c.businessId === id)?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DatePicker
            selectsRange
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={setDateRange}
            placeholderText="Select Date Range"
            className="bg-gray-800 border-gray-700 text-white p-2 rounded-md w-[200px]"
          />
        </div>
        <div className="flex items-center gap-2">
          {selectedInvoices.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-700 bg-gray-800 text-white">
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                <DropdownMenuItem onClick={() => handleBulkAction("delete")}>Delete</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("sendReminders")}>Send Reminders</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="outline" className="border-gray-700 bg-gray-800 text-white" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Plus className="mr-2 h-4 w-4" /> Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <h2 className="text-lg font-semibold">Create New Invoice</h2>
              <form className="space-y-4">
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Client" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {data.clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Template" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {Object.entries(invoiceTemplates).map(([key, { name }]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Amount (₹)" type="number" className="bg-gray-800 border-gray-700 text-white" />
                <Input placeholder="Description" className="bg-gray-800 border-gray-700 text-white" />
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                  Create
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                  onCheckedChange={(checked: boolean) =>
                    setSelectedInvoices(checked ? filteredInvoices.map((i) => i.id) : [])
                  }
                />
              </TableHead>
              <TableHead className="text-gray-300 cursor-pointer" onClick={() => requestSort("id")}>
                Invoice #{sortConfig.key === "id" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300">Client</TableHead>
              <TableHead className="text-gray-300 cursor-pointer" onClick={() => requestSort("businessId")}>
                Business{sortConfig.key === "businessId" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300 cursor-pointer" onClick={() => requestSort("amount")}>
                Amount{sortConfig.key === "amount" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300 cursor-pointer" onClick={() => requestSort("status")}>
                Status{sortConfig.key === "status" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300 cursor-pointer" onClick={() => requestSort("createdAt")}>
                Created{sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300 cursor-pointer" onClick={() => requestSort("dueDate")}>
                Due Date{sortConfig.key === "dueDate" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice, index) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onCheckedChange={(checked: boolean) =>
                      setSelectedInvoices((prev) =>
                        checked ? [...prev, invoice.id] : prev.filter((id) => id !== invoice.id)
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-white">{invoice.id}</TableCell>
                <TableCell className="text-white">
                  {data.clients.find((c) => c.id === invoice.clientId)?.name}
                </TableCell>
                <TableCell className="text-gray-400">{invoice.businessId}</TableCell>
                <TableCell className="text-white">₹{invoice.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      invoice.status === "PAID"
                        ? "bg-green-500"
                        : invoice.status === "PENDING"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-400">{invoice.createdAt}</TableCell>
                <TableCell className="text-gray-400">{invoice.dueDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                      <DropdownMenuItem onClick={() => generateInvoicePDF(invoice)}>
                        <FileText className="mr-2 h-4 w-4" /> View PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Editing invoice ${invoice.id}`)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Deleting invoice #${invoice.id}`)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Sending reminder for #${invoice.id}`)}>
                        <Send className="mr-2 h-4 w-4" /> Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Processing payment for #${invoice.id}`)}>
                        <CreditCard className="mr-2 h-4 w-4" /> Record Payment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-gray-700 bg-gray-800 text-white"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline"
          className="border-gray-700 bg-gray-800 text-white"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}