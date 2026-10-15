"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CustomerFormData {
  gender: string;
  SeniorCitizen: number;
  Partner: string;
  Dependents: string;
  tenure: number;
  PhoneService: string;
  MultipleLines: string;
  InternetService: string;
  OnlineSecurity: string;
  OnlineBackup: string;
  DeviceProtection: string;
  TechSupport: string;
  StreamingTV: string;
  StreamingMovies: string;
  Contract: string;
  PaperlessBilling: string;
  PaymentMethod: string;
  MonthlyCharges: number;
  TotalCharges: number;
}

export default function CustomerForm() {
  const router = useRouter(); // 2. Initialize router hook

  const [formData, setFormData] = useState<CustomerFormData>({
    gender: "Male",
    SeniorCitizen: 0,
    Partner: "No",
    Dependents: "No",
    tenure: 2,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "DSL",
    OnlineSecurity: "Yes",
    OnlineBackup: "Yes",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Mailed check",
    MonthlyCharges: 53.85,
    TotalCharges: 108.15,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    let parsedValue: string | number = value;
    if (type === "number") {
      parsedValue =
        value === ""
          ? ("" as unknown as number)
          : name === "tenure" || name === "SeniorCitizen"
            ? parseInt(value, 10)
            : parseFloat(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonPayload = JSON.stringify(formData, null, 2);
    console.log("Sending JSON to backend:", jsonPayload);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonPayload,
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      console.log("Success:", result);

      // 3. Extract your backend response values.
      // (Adjust `result.prediction` or `result.churn` based on how your FastAPI backend structures its JSON return format)
      const predictionValue = result.churn_prediction ?? result.churn_prediction ?? "Yes"; 
      const probabilityValue = result.churn_probability ?? "";

      // 4. Redirect to the result page with query parameters
      router.push(`/result?prediction=${encodeURIComponent(predictionValue)}&probability=${encodeURIComponent(probabilityValue)}`);
      
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert("Failed to connect to the prediction backend.");
    }
  };

  const formFields = [
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: [
        { val: "Female", label: "Female" },
        { val: "Male", label: "Male" },
      ],
    },
    {
      label: "Senior Citizen",
      name: "SeniorCitizen",
      type: "select",
      options: [
        { val: 0, label: "0 (No)" },
        { val: 1, label: "1 (Yes)" },
      ],
    },
    {
      label: "Partner",
      name: "Partner",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
      ],
    },
    {
      label: "Dependents",
      name: "Dependents",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
      ],
    },
    { label: "Tenure (Months)", name: "tenure", type: "number", min: "0" },
    {
      label: "Phone Service",
      name: "PhoneService",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
      ],
    },
    {
      label: "Multiple Lines",
      name: "MultipleLines",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
        { val: "No phone service", label: "No phone service" },
      ],
    },
    {
      label: "Internet Service",
      name: "InternetService",
      type: "select",
      options: [
        { val: "DSL", label: "DSL" },
        { val: "Fiber optic", label: "Fiber optic" },
        { val: "No", label: "No" },
      ],
    },
    {
      label: "Online Security",
      name: "OnlineSecurity",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
        { val: "No internet service", label: "No internet service" },
      ],
    },
    {
      label: "Online Backup",
      name: "OnlineBackup",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
        { val: "No internet service", label: "No internet service" },
      ],
    },
    {
      label: "Device Protection",
      name: "DeviceProtection",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
        { val: "No internet service", label: "No internet service" },
      ],
    },
    {
      label: "Tech Support",
      name: "TechSupport",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
        { val: "No internet service", label: "No internet service" },
      ],
    },
    {
      label: "Streaming TV",
      name: "StreamingTV",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
        { val: "No internet service", label: "No internet service" },
      ],
    },
    {
      label: "Streaming Movies",
      name: "StreamingMovies",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
        { val: "No internet service", label: "No internet service" },
      ],
    },
    {
      label: "Contract",
      name: "Contract",
      type: "select",
      options: [
        { val: "Month-to-month", label: "Month-to-month" },
        { val: "One year", label: "One year" },
        { val: "Two year", label: "Two year" },
      ],
    },
    {
      label: "Paperless Billing",
      name: "PaperlessBilling",
      type: "select",
      options: [
        { val: "Yes", label: "Yes" },
        { val: "No", label: "No" },
      ],
    },
    {
      label: "Payment Method",
      name: "PaymentMethod",
      type: "select",
      options: [
        { val: "Electronic check", label: "Electronic check" },
        { val: "Mailed check", label: "Mailed check" },
        {
          val: "Bank transfer (automatic)",
          label: "Bank transfer (automatic)",
        },
        { val: "Credit card (automatic)", label: "Credit card (automatic)" },
      ],
    },
    {
      label: "Monthly Charges ($)",
      name: "MonthlyCharges",
      type: "number",
      step: "0.01",
    },
    {
      label: "Total Charges ($)",
      name: "TotalCharges",
      type: "number",
      step: "0.01",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto my-8 p-8 md:p-10 bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col gap-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Customer Data Form
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please fill in the customer details below to check whether he/she will
          churn
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name as keyof CustomerFormData]}
                onChange={handleChange}
                className="p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              >
                {field.options?.map((opt) => (
                  <option key={opt.val} value={opt.val}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                step={field.step}
                min={field.min}
                name={field.name}
                value={formData[field.name as keyof CustomerFormData]}
                onChange={handleChange}
                className="p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            )}
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200 cursor-pointer shadow-lg text-base tracking-wide"
        >
          Submit & Predict Churn
        </button>
      </div>
    </form>
  );
}