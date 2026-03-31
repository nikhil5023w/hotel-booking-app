import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import RoomHeader from "../Components/booking_page/RoomHeader";
import BookingForm from "../Components/booking_page/BookingForm";
import ReservationSummary from "../Components/booking_page/ReservationSummary";
import BookingModal from "../Components/booking_page/BookingModal";

export default function BookingPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [dates, setDates] = useState(null);
  const [guest, setGuest] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
  });

  const [idProof, setIdProof] = useState(null);
  const [errors, setErrors] = useState({});
  const [docType, setDocType] = useState("");
  const [customDocName, setCustomDocName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/rooms/${id}`).then((res) => setRoom(res.data));
  }, [id]);

  useEffect(() => {
    setGuest((prev) => ({
      ...prev,
      fullName: user?.name || "",
      email: user?.email || "",
    }));
  }, [user]);

  const handleChange = (e) =>
    setGuest({ ...guest, [e.target.name]: e.target.value });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadProgress(10);

      if (file.type.startsWith("image/")) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        setIdProof(compressed);
      } else {
        setIdProof(file);
      }

      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1500);
    } catch {
      toast.error("File processing failed");
    }
  };

  const isFormValid =
    guest.fullName &&
    guest.phone &&
    guest.email &&
    guest.age &&
    idProof &&
    dates?.startDate &&
    dates?.endDate &&
    docType &&
    (docType !== "Other" || customDocName);

  const handlePayment = () => {
    if (!isFormValid) return toast.error("Fill all fields");
    setShowSummary(true);
  };

  const confirmPayment = async () => {
    if (!acceptedTerms) return toast.error("Accept terms");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("roomId", id);
      formData.append("checkInDate", dates.startDate);
      formData.append("checkOutDate", dates.endDate);
      formData.append("fullName", guest.fullName);
      formData.append("phone", guest.phone);
      formData.append("email", guest.email);
      formData.append("age", guest.age);
      formData.append("idProof", idProof);
      const finalDocType = docType === "Other" ? customDocName : docType;

      if (!finalDocType) {
        toast.error("Select document type");
        return;
      }

      formData.append("documentType", finalDocType);
      console.log("FILE SENDING:", idProof);
      const { data } = await API.post("/payments/checkout", formData);
      window.location.href = data.url;
    } catch {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!room) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-theme-bg pt-20 pb-10 animate-fadeIn">
      {" "}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 px-4">
        <div className="lg:col-span-2 space-y-8">
          <BookingForm
            room={room}
            guest={guest}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            uploadProgress={uploadProgress}
            idProof={idProof}
            setIdProof={setIdProof}
            docType={docType}
            setDocType={setDocType}
            customDocName={customDocName}
            setCustomDocName={setCustomDocName}
            setDates={setDates}
          />
        </div>
        <div>
          {" "}
          {/* <RoomHeader room={room} /> */}
          <ReservationSummary
            room={room}
            dates={dates}
            handlePayment={handlePayment}
            isFormValid={isFormValid}
          />
        </div>

        {showSummary && (
          <BookingModal
            room={room}
            dates={dates}
            guest={guest}
            docType={docType}
            customDocName={customDocName}
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
            setShowSummary={setShowSummary}
            confirmPayment={confirmPayment}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
