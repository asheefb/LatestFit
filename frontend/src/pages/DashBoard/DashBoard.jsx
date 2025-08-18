import { useState } from "react";
import { saveMeasurement } from "../../services/measurementService";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    chest: "",
    waist: "",
    length: "",
    sleeve: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveMeasurement(formData);
      alert("Measurement Saved!");
      setFormData({
        customerName: "",
        phone: "",
        chest: "",
        waist: "",
        length: "",
        sleeve: "",
      });
    } catch (error) {
      alert("Error saving measurement");
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">Add Measurement</h2>
        {["customerName", "phone", "chest", "waist", "length", "sleeve"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="w-full border p-2 mb-3"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
        ))}
        <button className="bg-indigo-600 text-white w-full py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
