import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter,
  RefreshCw,
  UserPlus,
  Crown,
  Ruler,
  TrendingUp,
  BarChart3,
  Download,
  Upload,
  SortAsc,
  SortDesc,
  MoreVertical,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userRole] = useState("Admin");

  const location = useLocation();

  useEffect(() => {
    if (location.state?.autoOpen) {
      alert("Add new customer");
    }
  }, [location.state]);

  // Mock customer data (replace with real API call)
  const mockCustomers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      address: "Connaught Place, New Delhi",
      joinDate: "2024-01-15",
      totalMeasurements: 5,
      lastMeasurement: "2024-08-10",
      status: "Active",
      notes: "Regular customer, prefers formal wear",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      address: "Karol Bagh, New Delhi",
      joinDate: "2024-02-20",
      totalMeasurements: 3,
      lastMeasurement: "2024-08-15",
      status: "Active",
      notes: "Frequent alterations needed",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@email.com",
      phone: "+91 76543 21098",
      address: "Lajpat Nagar, New Delhi",
      joinDate: "2024-03-10",
      totalMeasurements: 8,
      lastMeasurement: "2024-08-18",
      status: "Active",
      notes: "VIP customer, bulk orders",
    },
    {
      id: 4,
      name: "Sunita Verma",
      email: "sunita.verma@email.com",
      phone: "+91 65432 10987",
      address: "Janakpuri, New Delhi",
      joinDate: "2024-01-25",
      totalMeasurements: 2,
      lastMeasurement: "2024-07-30",
      status: "Inactive",
      notes: "Seasonal customer",
    },
    {
      id: 5,
      name: "Vikram Gupta",
      email: "vikram.gupta@email.com",
      phone: "+91 54321 09876",
      address: "Dwarka, New Delhi",
      joinDate: "2024-04-05",
      totalMeasurements: 6,
      lastMeasurement: "2024-08-19",
      status: "Active",
      notes: "Wedding preparations ongoing",
    },
    {
      id: 6,
      name: "Meera Patel",
      email: "meera.patel@email.com",
      phone: "+91 43210 98765",
      address: "Rohini, New Delhi",
      joinDate: "2024-05-12",
      totalMeasurements: 4,
      lastMeasurement: "2024-08-17",
      status: "Active",
      notes: "Corporate client",
    },
  ];

  // Initialize customers data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setLoading(false);
    }, 1000);
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        customer.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "joinDate" || sortField === "lastMeasurement") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortField === "totalMeasurements") {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCustomers(filtered);
  }, [searchTerm, customers, statusFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setLoading(false);
    }, 500);
  };

  const handleViewCustomer = (customer) => {
    alert(
      `View Details:\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nTotal Measurements: ${customer.totalMeasurements}\nNotes: ${customer.notes}`
    );
  };

  const handleEditCustomer = (id) => {
    alert(`Edit customer with ID: ${id}`);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== id
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    }
  };

  const handleExportData = () => {
    alert("Export customer data to CSV");
  };

  const handleImportData = () => {
    alert("Import customer data from CSV");
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "text-green-600 bg-green-100"
      : "text-red-600 bg-red-100";
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <SortAsc className="h-4 w-4 text-gray-400" />;
    return sortDirection === "asc" ? (
      <SortAsc className="h-4 w-4 text-blue-600" />
    ) : (
      <SortDesc className="h-4 w-4 text-blue-600" />
    );
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const totalMeasurements = customers.reduce(
    (sum, c) => sum + c.totalMeasurements,
    0
  );
  const avgMeasurements =
    totalCustomers > 0 ? (totalMeasurements / totalCustomers).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                Customer Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all your customers efficiently
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Crown className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600">
                  Role: {userRole}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleImportData}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                <Upload className="h-4 w-4" />
                <span>Import</span>
              </button>
              <button
                onClick={handleExportData}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => alert("Add new customer")}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Customer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Customers
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {totalCustomers}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Active Customers
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {activeCustomers}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Measurements
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  {totalMeasurements}
                </p>
              </div>
              <Ruler className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Avg per Customer
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  {avgMeasurements}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name, email, phone, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Customer List ({filteredCustomers.length} of {totalCustomers})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading customers...</span>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No customers found
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Add your first customer to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        <SortIcon field="name" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("totalMeasurements")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Measurements</span>
                        <SortIcon field="totalMeasurements" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <SortIcon field="status" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Joined: {customer.joinDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="truncate max-w-xs">
                              {customer.email}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="truncate max-w-xs">
                              {customer.address}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.totalMeasurements} total
                          </div>
                          <div className="text-xs text-gray-500">
                            Last: {customer.lastMeasurement}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            customer.status
                          )}`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewCustomer(customer)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditCustomer(customer.id)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                            title="Edit Customer"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Delete Customer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
