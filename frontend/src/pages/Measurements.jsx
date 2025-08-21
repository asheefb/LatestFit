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
  Loader,
  AlertCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import MeasurementService from "../services/measurementService";
import CustomerService from "../services/CustomerService";

const MeasurementsComponent = () => {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  // Initialize form data with proper structure matching your backend
  const [formData, setFormData] = useState({
    customerId: "",
    type: "Suit",
    status: "Pending",
    // Pants measurements
    pantLength: "",
    pantTrunk: "",
    pantHip: "",
    pantLegs: "",
    pantKnee: "",
    pantBottom: "",
    // Shirt measurements
    shirtLength: "",
    shirtChest: "",
    shirtWaist: "",
    shirtShoulder: "",
    shirtSleeves: "",
    shirtCoupLength: "",
    shirtCollar: "",
    additionalComments: "",
  });

  // Sample customers - you might want to fetch this from an API too
  const customers = [
    { id: 101, name: "John Smith" },
    { id: 102, name: "Sarah Johnson" },
    { id: 3, name: "Mike Davis" },
    { id: 4, name: "Emily Brown" },
  ];

  const measurementTypes = [
    "Suit",
    "Dress",
    "Shirt",
    "Pant",
    "Jacket",
    "Skirt",
  ];

  const status = ["Pending", "Completed", "In Progress"];

  // Updated measurement fields to match your form structure
  const measurementFields = {
    Pant: [
      { key: "pantLength", label: "Length" },
      { key: "pantTrunk", label: "Trunk" },
      { key: "pantHip", label: "Hip" },
      { key: "pantLegs", label: "Legs" },
      { key: "pantKnee", label: "Knee" },
      { key: "pantBottom", label: "Bottom" },
    ],
    Shirt: [
      { key: "shirtLength", label: "Length" },
      { key: "shirtChest", label: "Chest" },
      { key: "shirtWaist", label: "Waist" },
      { key: "shirtShoulder", label: "Shoulder" },
      { key: "shirtSleeves", label: "Sleeves" },
      { key: "shirtCoupLength", label: "Coup Length" },
      { key: "shirtCollar", label: "Collar" },
    ],
    Suit: [
      { key: "shirtLength", label: "Length" },
      { key: "shirtChest", label: "Chest" },
      { key: "shirtWaist", label: "Waist" },
      { key: "shirtShoulder", label: "Shoulder" },
      { key: "shirtSleeves", label: "Sleeves" },
      { key: "pantLength", label: "Pant Length" },
      { key: "pantTrunk", label: "Trunk" },
      { key: "pantHip", label: "Hip" },
    ],
    Dress: [
      { key: "shirtLength", label: "Length" },
      { key: "shirtChest", label: "Bust" },
      { key: "shirtWaist", label: "Waist" },
      { key: "shirtShoulder", label: "Shoulder" },
      { key: "shirtSleeves", label: "Sleeves" },
    ],
    Jacket: [
      { key: "shirtChest", label: "Chest" },
      { key: "shirtWaist", label: "Waist" },
      { key: "shirtShoulder", label: "Shoulder" },
      { key: "shirtSleeves", label: "Sleeves" },
      { key: "shirtLength", label: "Length" },
    ],
    Skirt: [
      { key: "shirtWaist", label: "Waist" },
      { key: "pantHip", label: "Hip" },
      { key: "shirtLength", label: "Length" },
    ],
  };

  // Load measurements on component mount
  // useEffect(() => {
  //   loadMeasurements();
  // }, []);

  useEffect(() => {
    if (location.state?.autoOpen) {
      handleAddMeasurement();
    }
  }, [location.state]);

  const loadMeasurements = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = 1; // Replace with actual user ID from auth context
      const response = await new MeasurementService().dashboardItems(userId);

      setMeasurements(response.data || response || []);
    } catch (err) {
      console.error("Error loading measurements:", err);
      setError("Failed to load measurements. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMeasurements = measurements.filter((measurement) => {
    const searchFields = [
      measurement.customerName,
      measurement.type,
      measurement.additionalComments || measurement.notes,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || measurement.type === selectedType;
    return matchesSearch && matchesType;
  });

  const resetForm = () => {
    setFormData({
      customerId: "",
      type: "Suit",
      status: "Pending",
      pantLength: "",
      pantTrunk: "",
      pantHip: "",
      pantLegs: "",
      pantKnee: "",
      pantBottom: "",
      shirtLength: "",
      shirtChest: "",
      shirtWaist: "",
      shirtShoulder: "",
      shirtSleeves: "",
      shirtCoupLength: "",
      shirtCollar: "",
      additionalComments: "",
    });
  };

  const handleAddMeasurement = () => {
    setShowForm(true);
    setEditingMeasurement(null);
    resetForm();
  };

  const handleEditMeasurement = (measurement) => {
    setShowForm(true);
    setEditingMeasurement(measurement.id);
    setFormData({
      customerId: measurement.customerId,
      customerName: measurement.customerName,
      type: measurement.type,
      pantLength: measurement.pantLength || "",
      pantTrunk: measurement.pantTrunk || "",
      pantHip: measurement.pantHip || "",
      pantLegs: measurement.pantLegs || "",
      pantKnee: measurement.pantKnee || "",
      pantBottom: measurement.pantBottom || "",
      shirtLength: measurement.shirtLength || "",
      shirtChest: measurement.shirtChest || "",
      shirtWaist: measurement.shirtWaist || "",
      shirtShoulder: measurement.shirtShoulder || "",
      shirtSleeves: measurement.shirtSleeves || "",
      shirtCoupLength: measurement.shirtCoupLength || "",
      shirtCollar: measurement.shirtCollar || "",
      additionalComments:
        measurement.additionalComments || measurement.notes || "",
    });
  };

  const handleDeleteMeasurement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this measurement?")) {
      return;
    }

    try {
      // Note: You'll need to implement a delete method in MeasurementService
      // await new MeasurementService().deleteMeasurement(id);

      // For now, just remove from state
      setMeasurements(measurements.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting measurement:", err);
      alert("Failed to delete measurement. Please try again.");
    }
  };

  const handleCustomerChange = (customerId) => {
    const customer = customers.find((c) => c.id === parseInt(customerId));
    setFormData((prev) => ({
      ...prev,
      customerId: parseInt(customerId),
      customerName: customer ? customer.name : "",
    }));

    // const customer = CustomerService.viewAllCustomersBySearch(customerId);
    setFormData((prev) => ({
      ...prev,
      customerId: customerId,
      customerName: customer ? customer.name : "",
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.customerId || !formData.customerName) {
      alert("Please select a customer");
      return;
    }

    try {
      setSubmitting(true);
      const measurementService = new MeasurementService();

      if (editingMeasurement) {
        const response = await measurementService.updateMeasurement(
          editingMeasurement,
          formData
        );

        // Update the measurement in state
        setMeasurements(
          measurements.map((m) =>
            m.id === editingMeasurement
              ? { ...response, id: editingMeasurement }
              : m
          )
        );
      } else {
        const response = await measurementService.addMeasurement(formData);

        // Add new measurement to state
        setMeasurements([response, ...measurements]);
      }

      setShowForm(false);
      setEditingMeasurement(null);
      resetForm();
    } catch (err) {
      console.error("Error saving measurement:", err);
      alert("Failed to save measurement. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMeasurement(null);
    resetForm();
  };

  // // Loading state
  // if (loading) {
  //   return (
  //     <div className="max-w-7xl mx-auto p-6">
  //       <div className="flex items-center justify-center h-64">
  //         <Loader className="h-8 w-8 animate-spin text-blue-600" />
  //         <span className="ml-2 text-gray-600">Loading measurements...</span>
  //       </div>
  //     </div>
  //   );
  // }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadMeasurements}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                disabled={submitting}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer *
                  </label>
                  <select
                    value={formData.customerId}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={submitting}
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
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleFieldChange("type", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={submitting}
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
              {measurementFields[formData.type] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Measurements (inches)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {measurementFields[formData.type].map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          value={formData[field.key] || ""}
                          onChange={(e) =>
                            handleFieldChange(field.key, e.target.value)
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          disabled={submitting}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={formData.additionalComments}
                  onChange={(e) =>
                    handleFieldChange("additionalComments", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional notes or special requirements..."
                  disabled={submitting}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {submitting
                    ? "Saving..."
                    : editingMeasurement
                    ? "Update"
                    : "Save"}{" "}
                  Measurement
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

          {/* Refresh Button */}
          <button
            onClick={loadMeasurements}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Refresh
          </button>
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
                          {measurement.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(measurement.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Measurements Display */}
                    <div className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {measurementFields[measurement.type]?.map((field) => {
                          const value = measurement[field.key];
                          if (!value) return null;

                          return (
                            <div
                              key={field.key}
                              className="bg-gray-50 p-2 rounded text-center"
                            >
                              <div className="text-xs text-gray-600">
                                {field.label}
                              </div>
                              <div className="font-medium">{value}"</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Additional Comments */}
                    {(measurement.additionalComments || measurement.notes) && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-gray-700">
                          {measurement.additionalComments || measurement.notes}
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
