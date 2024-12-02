import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "@/components/PdfDocument";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Klienti
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          rows={4}
          required
        />
      </div>

      {isClient && (
        <PDFDownloadLink
          document={
            <PDFDocument
              name={formData.name}
              email={formData.email}
              message={formData.message}
            />
          }
          fileName="form-data.pdf"
        >
          <span className="w-full px-2 bg-blue-500 text-white py-2 rounded-md mb-4">
            Download PDF
          </span>
        </PDFDownloadLink>
      )}
    </form>
  );
};

export default Form;
