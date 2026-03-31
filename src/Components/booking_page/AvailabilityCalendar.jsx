import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, eachDayOfInterval } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import api from "../../services/api";

export default function AvailabilityCalendar({ roomId, onSelect }) {
  const [bookedRanges, setBookedRanges] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/availability/${roomId}`);
        const ranges = res.data;
        setBookedRanges(ranges);

        // Convert booked ranges into disabled dates
        const allDisabledDates = ranges.flatMap((range) =>
          // ----------------------------------------------      this is disable the same date booking on checkOut date              ----------------------------------------------------------------
          // eachDayOfInterval({
          //   start: new Date(range.checkIn),
          //   end: new Date(range.checkOut),
          // })
          // ----------------------------------------------      this is allow the same date booking on checkOut date            ----------------------------------------------------------------
          eachDayOfInterval({
            start: new Date(range.checkIn),
            end: addDays(new Date(range.checkOut), -1),
          }),
        );

        setDisabledDates(allDisabledDates);
      } catch (error) {
        console.error("Availability fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (roomId) fetchAvailability();
  }, [roomId]);

  const handleSelect = (ranges) => {
    const selected = ranges.selection;
    setSelectionRange(selected);
    if (onSelect) {
      onSelect({
        startDate: selected.startDate,
        endDate: selected.endDate,
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        Loading availability...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
        disabledDates={disabledDates}
        retainEndDateOnFirstSelection={true}
        moveRangeOnFirstSelection={false}
        rangeColors={["#907B60"]}
      />
    </div>
  );
}
