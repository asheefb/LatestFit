import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Calendar,
  User,
  Ruler,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const MeasurementsComponent = () => {
  const [measurements, setMeasurements] = useState([
    {
      id: 1,
      customerId: 1,
      customerName: "John Smith",
      date: "2024-01-15",
      type: "Suit",
      measurements: {
        chest: 40,
        waist: 34,
        hips: 38,
        shoulders: 18,
        sleeves: 25,
        neck: 16,
        inseam: 32,
        outseam: 42,
      },
      notes: "Standard business suit, prefers slim fit",
    },
    {
      id: 2,
      customerId: 2,
      customerName: "Sarah Johnson",
      date: "2024-01-10",
      type: "Dress",
      measurements: {
        bust: 36,
        waist: 28,
        hips: 38,
        shoulders: 16,
        sleeves: 23,
        length: 45,
        armhole: 18,
      },
      notes: "Evening dress, requires alterations",
    },
    {
      id: 3,
      customerId: 1,
      customerName: "John Smith",
      date: "2024-01-08",
      type: "Pants",
      measurements: {
        waist: 34,
        hips: 38,
        inseam: 32,
        outseam: 42,
        thigh: 22,
        knee: 16,
        cuff: 14,
      },
      notes: "Casual pants, regular fit",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.autoOpen) {
      handleAddMeasurement();
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    type: "Suit",
    measurements: {},
    notes: "",
  });

  // Sample customers for the form
  const customers = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Davis" },
    { id: 4, name: "Emily Brown" },
  ];

  const measurementTypes = [
    "Suit",
    "Dress",
    "Shirt",
    "Pants",
    "Jacket",
    "Skirt",
  ];

  const measurementFields = {
    Suit: [
      "chest",
      "waist",
      "hips",
      "shoulders",
      "sleeves",
      "neck",
      "inseam",
      "outseam",
    ],
    Dress: [
      "bust",
      "waist",
      "hips",
      "shoulders",
      "sleeves",
      "length",
      "armhole",
    ],
    Shirt: ["chest", "waist", "shoulders", "sleeves", "neck", "length"],
    Pants: ["waist", "hips", "inseam", "outseam", "thigh", "knee", "cuff"],
    Jacket: ["chest", "waist", "shoulders", "sleeves", "length"],
    Skirt: ["waist", "hips", "length"],
  };

  const filteredMeasurements = measurements.filter((measurement) => {
    const matchesSearch =
      measurement.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      measurement.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      measurement.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || measurement.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddMeasurement = () => {
    setShowForm(true);
    setEditingMeasurement(null);
    setFormData({
      customerId: "",
      customerName: "",
      type: "Suit",
      measurements: {},
      notes: "",
    });
  };

  const handleEditMeasurement = (measurement) => {
    setShowForm(true);
    setEditingMeasurement(measurement.id);
    setFormData({
      customerId: measurement.customerId,
      customerName: measurement.customerName,
      type: measurement.type,
      measurements: { ...measurement.measurements },
      notes: measurement.notes,
    });
  };

  const handleDeleteMeasurement = (id) => {
    setMeasurements(measurements.filter((m) => m.id !== id));
  };

  const handleCustomerChange = (customerId) => {
    const customer = customers.find((c) => c.id === parseInt(customerId));
    setFormData((prev) => ({
      ...prev,
      customerId: parseInt(customerId),
      customerName: customer ? customer.name : "",
    }));
  };

  const handleMeasurementChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: parseFloat(value) || 0,
      },
    }));
  };

  const handleSubmit = () => {
    if (!formData.customerId || !formData.customerName) return;

    if (editingMeasurement) {
      setMeasurements(
        measurements.map((m) =>
          m.id === editingMeasurement
            ? {
                ...m,
                ...formData,
                date: new Date().toISOString().split("T")[0],
              }
            : m
        )
      );
    } else {
      const newMeasurement = {
        id: Math.max(...measurements.map((m) => m.id)) + 1,
        ...formData,
        date: new Date().toISOString().split("T")[0],
      };
      setMeasurements([newMeasurement, ...measurements]);
    }

    setShowForm(false);
    setEditingMeasurement(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMeasurement(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Measurements</h1>
          <p className="text-gray-600 mt-1">
            Manage customer measurements and sizing data
          </p>
        </div>
        <button
          onClick={handleAddMeasurement}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Measurement
        </button>
      </div>

      {/* Measurement Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingMeasurement ? "Edit Measurement" : "New Measurement"}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer
                  </label>
                  <select
                    value={formData.customerId}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Measurement Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value,
                        measurements: {},
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {measurementTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Measurements Grid */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Measurements (inches)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {measurementFields[formData.type]?.map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                        {field}
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={formData.measurements[field] || ""}
                        onChange={(e) =>
                          handleMeasurementChange(field, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional notes or special requirements..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {editingMeasurement ? "Update" : "Save"} Measurement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer, type, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            {measurementTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Measurements List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {filteredMeasurements.length === 0 ? (
          <div className="p-12 text-center">
            <Ruler className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No measurements found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedType !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first measurement record"}
            </p>
            {!searchTerm && selectedType === "all" && (
              <button
                onClick={handleAddMeasurement}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add First Measurement
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredMeasurements.map((measurement) => (
              <div
                key={measurement.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {measurement.customerName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {measurement.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(measurement.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Measurements Display */}
                    <div className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {Object.entries(measurement.measurements).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="bg-gray-50 p-2 rounded text-center"
                            >
                              <div className="text-xs text-gray-600 capitalize">
                                {key}
                              </div>
                              <div className="font-medium">{value}"</div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    {measurement.notes && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-gray-700">
                          {measurement.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditMeasurement(measurement)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMeasurement(measurement.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {filteredMeasurements.length}
            </div>
            <div className="text-sm text-gray-600">Total Measurements</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {new Set(filteredMeasurements.map((m) => m.customerId)).size}
            </div>
            <div className="text-sm text-gray-600">Unique Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(filteredMeasurements.map((m) => m.type)).size}
            </div>
            <div className="text-sm text-gray-600">Different Types</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsComponent;
