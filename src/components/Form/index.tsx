import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "@/components/PdfDocument";

type FormData = {
  name: string;
  email: string;
  oferta: string;
  date: string;
  image?: File | string | null;
  profili: string;
  ngjyraProfilit: string;
  xhami: string;
  mekanizmat: string;
  dorzat: string;
  roletet: string;
  ngjyraeRoleteve: string;
  fletezateRoleteve: string;
  sasia: number;
};

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    oferta: "",
    date: new Date().toISOString().split("T")[0],
    image: null,
    profili: "",
    ngjyraProfilit: "",
    dorzat: "",
    fletezateRoleteve: "",
    mekanizmat: "",
    ngjyraeRoleteve: "",
    roletet: "",
    sasia: 0,
    xhami: "",
  });

  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-96 p-4 border rounded-lg shadow-md"
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
          <label htmlFor="oferta" className="block text-sm font-medium">
            Oferta Nr
          </label>
          <input
            type="string"
            id="oferta"
            name="oferta"
            value={formData.oferta}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium">
            Data e ofertes
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {isClient && (
          <PDFDownloadLink
            document={
              <PDFDocument
                name={formData.name}
                email={formData.email}
                oferta={formData.oferta}
                date={formData.date}
                img={formData.image}
                profili={formData.profili}
                dorzat={formData.dorzat}
                fletezateRoleteve={formData.fletezateRoleteve}
                mekanizmat={formData.mekanizmat}
                ngjyraProfilit={formData.ngjyraProfilit}
                ngjyraeRoleteve={formData.ngjyraProfilit}
                roletet={formData.roletet}
                sasia={formData.sasia}
                xhami={formData.xhami}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg w-80">
            <h2 className="text-lg font-medium mb-4">Image Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="profili" className="block text-sm font-medium">
                  Profili
                </label>
                <input
                  type="string"
                  id="profili"
                  name="profili"
                  value={formData.profili}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ngjyraProfilit"
                  className="block text-sm font-medium"
                >
                  Ngjyra e Profilit
                </label>
                <input
                  type="string"
                  id="ngjyraProfilit"
                  name="ngjyraProfilit"
                  value={formData.ngjyraProfilit}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="xhami" className="block text-sm font-medium">
                  Xhami
                </label>
                <input
                  type="string"
                  id="xhami"
                  name="xhami"
                  value={formData.xhami}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mekanizmat"
                  className="block text-sm font-medium"
                >
                  Mekanizmat
                </label>
                <input
                  type="string"
                  id="mekanizmat"
                  name="mekanizmat"
                  value={formData.mekanizmat}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dorzat" className="block text-sm font-medium">
                  Dorzat
                </label>
                <input
                  type="string"
                  id="dorzat"
                  name="dorzat"
                  value={formData.dorzat}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="roletet" className="block text-sm font-medium">
                  Roletet
                </label>
                <input
                  type="string"
                  id="roletet"
                  name="roletet"
                  value={formData.roletet}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ngjyraeRoleteve"
                  className="block text-sm font-medium"
                >
                  Ngjyra e roleteve
                </label>
                <input
                  type="string"
                  id="rolengjyraeRoletevetet"
                  name="ngjyraeRoleteve"
                  value={formData.ngjyraeRoleteve}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fletezateRoleteve"
                  className="block text-sm font-medium"
                >
                  Fletezat e roleteve
                </label>
                <input
                  type="string"
                  id="fletezateRoleteve"
                  name="fletezateRoleteve"
                  value={formData.fletezateRoleteve}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fletezateRoleteve"
                  className="block text-sm font-medium"
                >
                  Sasia
                </label>
                <input
                  type="number"
                  id="sasia"
                  name="sasia"
                  value={formData.sasia}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
