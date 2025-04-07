import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";



const initialFormData = {
  make: "",
  model: "",
  year: "",
  color: "",
  licensePlate: "",
  dailyRate: "",
};

const CarForm = () => {
  const [formData, setFormData] = useState<CarFormData>(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Car data submitted:", formData);
    toast.success("New car added successfully!");
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Add New Car</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="Toyota"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Camry"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            placeholder="2023"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Silver"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            placeholder="ABC-1234"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dailyRate">Daily Rate ($)</Label>
          <Input
            id="dailyRate"
            name="dailyRate"
            type="number"
            value={formData.dailyRate}
            onChange={handleChange}
            placeholder="50"
            required
          />
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full md:w-auto">
        Add Car
      </Button>
    </form>
  );
};

export default CarForm;
