import { useEffect, useRef } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function BookingForm({
  room,
  guest,
  handleChange,
  handleFileChange,
  uploadProgress,
  idProof,
  setIdProof,
  docType,
  setDocType,
  customDocName,
  setCustomDocName,
  setDates,
}) {
  const fileInputRef = useRef();

  // ✅ Reset file when document type changes
  useEffect(() => {
    setIdProof(null);
  }, [docType]);

  // ✅ Handle file selection
  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only Image (JPG, PNG) or PDF allowed");
      return;
    }

    handleFileChange({ target: { files: [file] } });
  };

  // ✅ Drag & Drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="bg-theme-card p-4 rounded-2xl shadow-soft animate-slideUp">
          <h3 className="font-semibold text-theme-primary mb-3 text-xl">
            Select Your Stay
          </h3>
        </div>
        <AvailabilityCalendar roomId={room._id} onSelect={setDates} />
      </div>

      {/* Guest Details */}
      <div className="bg-theme-card p-6 rounded-2xl shadow-soft space-y-3 animate-slideUp">
        <h3 className="font-semibold">Guest Details</h3>

        <input
          name="fullName"
          value={guest.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded-lg p-3"
        />

        {/* Phone */}
        <div className="w-full">
          <PhoneInput
            country={"gb"}
            value={guest.phone}
            onChange={(phone) =>
              handleChange({ target: { name: "phone", value: phone } })
            }
            inputClass="!w-full !border !rounded-lg !p-3 !pl-14 !text-sm"
            containerClass="w-full"
            buttonClass="!border-none !bg-transparent"
            dropdownClass="!text-black"
          />
        </div>

        <input
          name="email"
          value={guest.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="age"
          value={guest.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border rounded-lg p-3"
        />

        {/* Document Type */}
        <select
          value={docType}
          onChange={(e) => {
            setDocType(e.target.value);
            setCustomDocName("");
          }}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select document</option>
          <option>Passport</option>
          <option>Driving Licence</option>
          <option>National ID</option>
          <option>Residence Permit</option>
          <option>Student ID</option>
          <option>Other</option>
        </select>

        {/* Custom Doc */}
        {docType === "Other" && (
          <input
            value={customDocName}
            onChange={(e) => setCustomDocName(e.target.value)}
            placeholder="Document name"
            className="w-full border rounded-lg p-3"
          />
        )}

        {/* ✅ Upload Section */}
        {docType && (docType !== "Other" || customDocName) && (
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Upload {docType === "Other" ? customDocName : docType}
            </label>

            {/* Drag & Drop Box */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="text-gray-500">
                Drag & Drop file here or click to upload
              </p>
              <p className="text-xs text-gray-400">
                (Only JPG, PNG, PDF allowed)
              </p>
            </div>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {/* Upload Progress */}
            {uploadProgress > 0 && (
              <div className="bg-gray-200 h-2 rounded">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            {/* Preview */}
            {idProof && (
              <div className="border rounded-lg p-3 space-y-2 bg-white">
                {/* Image Preview */}
                {idProof.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(idProof)}
                    alt="preview"
                    className="w-full h-40 object-cover rounded"
                  />
                )}

                {/* PDF Preview */}
                {idProof.type === "application/pdf" && (
                  <p className="text-sm text-blue-600">
                    📄 PDF Uploaded: {idProof.name}
                  </p>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => setIdProof(null)}
                  className="text-red-500 text-sm"
                >
                  ❌ Remove file
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
