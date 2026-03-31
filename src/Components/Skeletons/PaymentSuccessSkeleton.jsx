export default function PaymentSuccessSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#faf7f2]">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 space-y-6 relative overflow-hidden">
        {/* Circle icon */}
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto" />

        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />

        {/* Booking ID */}
        <div className="h-10 bg-gray-200 rounded-xl w-3/4 mx-auto" />

        {/* Cards */}
        <div className="space-y-4">
          <div className="h-16 bg-gray-200 rounded-xl" />
          <div className="h-16 bg-gray-200 rounded-xl" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-gray-200 rounded-xl" />
          <div className="h-16 bg-gray-200 rounded-xl" />
        </div>

        {/* Email */}
        <div className="h-12 bg-gray-200 rounded-xl" />

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>

        {/* Footer text */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}
