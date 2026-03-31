import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

export default function RoomPreview() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get(`/rooms/${id}`);
      setRoom(data);

      const all = await API.get("/rooms");
      setAllRooms(all.data.filter((r) => r._id !== id));
    };

    fetchData();
  }, [id]);

  if (!room) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const images =
    room.coverImages && room.coverImages.length > 0
      ? room.coverImages
      : ["https://picsum.photos/600/400"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-gray-600 hover:text-black flex items-center gap-2"
      >
        ← Back
      </button>
      {/* Image */}
      <img
        src={images[0]}
        alt={room.name}
        className="w-full h-[400px] object-cover rounded-2xl shadow"
      />
      {/* Gallery */}
      {room.galleryImages?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {room.galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="gallery"
              onClick={() => setSelectedImage(img)}
              className="h-24 w-full object-cover rounded-lg cursor-pointer hover:opacity-80"
            />
          ))}
        </div>
      )}
      {/* Content */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h1 className="text-3xl font-bold">{room.name}</h1>

        <p className="text-gray-600">{room.description}</p>

        <div className="flex gap-6">
          <p className="text-green-600 font-bold text-xl">
            £{room.price} / night
          </p>
          <p className="text-gray-500">Capacity: {room.capacity} guests</p>
        </div>
        {/* Amenities */}
        {room.amenities?.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Amenities</h3>

            <div className="flex flex-wrap gap-2">
              {room.amenities.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Button */}
        <Link
          to={`/room/${room._id}`}
          className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Book Now
        </Link>
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-h-[90%] max-w-[90%] rounded-lg"
          />
        </div>
      )}
      {/* Other Rooms */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Other Rooms</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {allRooms.slice(0, 3).map((r) => (
            <Link
              key={r._id}
              to={`/room-preview/${r._id}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={r.coverImages?.[0] || "https://picsum.photos/300/200"}
                className="h-40 w-full object-cover"
              />

              <div className="p-3">
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-gray-500">£{r.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
