import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sunrise,
  Sun,
  Sunset,
  Lock,
  CalendarDays,
  Clock,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import api from "../services/axios";

/**
 * Daily Shift Configurations
 */
const SHIFTS = [
  {
    id: "morning",
    name: "Morning Shift",
    timeRange: "09:00 AM – 12:30 PM",
    icon: Sunrise,
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    iconColor: "text-amber-500",
    slots: [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
    ],
  },
  {
    id: "afternoon",
    name: "Afternoon Shift",
    timeRange: "01:30 PM – 05:00 PM",
    icon: Sun,
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    iconColor: "text-orange-500",
    slots: [
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
    ],
  },
  {
    id: "evening",
    name: "Evening Shift",
    timeRange: "05:30 PM – 08:00 PM",
    icon: Sunset,
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconColor: "text-indigo-500",
    slots: [
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
    ],
  },
];

/**
 * SlotPicker Component
 *
 * @param {string} doctorId - Selected doctor ID (optional if specialization provided)
 * @param {string} specialization - Selected medical specialization / department
 * @param {string} selectedDate - Selected date string (YYYY-MM-DD)
 * @param {string} selectedSlot - Currently selected time slot string (e.g. "09:30 AM")
 * @param {function} onSelectSlot - Callback function when slot is picked
 */
const SlotPicker = ({
  doctorId,
  specialization,
  selectedDate,
  selectedSlot,
  onSelectSlot,
}) => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch booked slots whenever doctorId, specialization, or selectedDate changes
  useEffect(() => {
    if ((!doctorId && !specialization) || !selectedDate) {
      setBookedSlots([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const fetchBookedSlots = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/appointments/booked-slots", {
          params: { doctorId, specialization, date: selectedDate },
        });

        if (isMounted) {
          if (response.data && response.data.success) {
            setBookedSlots(response.data.data || []);
          } else {
            setBookedSlots([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching booked slots:", err);
          setError(
            err.response?.data?.message || "Unable to fetch booked slots."
          );
          setBookedSlots([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBookedSlots();

    return () => {
      isMounted = false;
    };
  }, [doctorId, specialization, selectedDate]);

  // Helper check if a slot is already taken
  const isBooked = (slot) => {
    return bookedSlots.some(
      (b) => b.trim().toUpperCase() === slot.trim().toUpperCase()
    );
  };

  // EMPTY STATE: No Doctor/Specialization or Date selected
  if ((!doctorId && !specialization) || !selectedDate) {
    return (
      <div className="w-full rounded-2xl border border-slate-200/80 bg-linear-to-b from-slate-50/50 to-white p-8 text-center shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-8 ring-teal-50/50">
          <CalendarDays className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-800">
          Select Specialization & Date
        </h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500 leading-relaxed">
          Please select a medical department and your preferred appointment date above to view available time slots.
        </p>
      </div>
    );
  }


  // LOADING STATE: Pulse Skeleton
  if (loading) {
    return (
      <div className="w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        {/* Skeleton Legend */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="h-5 w-36 rounded-md bg-slate-200 animate-pulse" />
          <div className="flex items-center space-x-4">
            <div className="h-4 w-16 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-4 w-16 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-4 w-16 rounded-full bg-slate-200 animate-pulse" />
          </div>
        </div>

        {/* Skeleton Shifts */}
        {[1, 2, 3].map((shiftIndex) => (
          <div key={shiftIndex} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
              <div className="h-4 w-28 rounded-md bg-slate-200 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[1, 2, 3, 4].map((chipIndex) => (
                <div
                  key={chipIndex}
                  className="h-11 w-full rounded-xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
      {/* Header & Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-teal-600" />
          <h3 className="text-base font-semibold text-slate-800">
            Available Time Slots
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs font-medium text-slate-600">
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-slate-300 bg-white shadow-2xs" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-600 ring-2 ring-teal-600/30" />
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Error Notice if fetch failed */}
      {error && (
        <div className="mt-4 flex items-center space-x-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-700 border border-amber-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error} Showing standard slot grid.</span>
        </div>
      )}

      {/* Shift Containers */}
      <div className="mt-5 space-y-6">
        {SHIFTS.map((shift) => {
          const IconComponent = shift.icon;
          return (
            <div key={shift.id} className="space-y-3">
              {/* Shift Title & Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${shift.badgeBg}`}
                  >
                    <IconComponent className={`h-4 w-4 ${shift.iconColor}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {shift.name}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {shift.timeRange}
                </span>
              </div>

              {/* Slot Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {shift.slots.map((slot) => {
                  const booked = isBooked(slot);
                  const selected = selectedSlot === slot;

                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      disabled={booked}
                      onClick={() => !booked && onSelectSlot(slot)}
                      whileHover={booked ? {} : { scale: 1.03 }}
                      whileTap={booked ? {} : { scale: 0.97 }}
                      animate={selected ? { scale: 1.03 } : { scale: 1 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={`relative flex items-center justify-center rounded-xl px-3 py-3 text-xs font-semibold transition-all duration-200 select-none ${
                        booked
                          ? "cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200/80 line-through opacity-75 group"
                          : selected
                          ? "bg-teal-600 text-white border border-teal-600 shadow-md shadow-teal-600/25 ring-2 ring-teal-600/20"
                          : "bg-white text-slate-700 border border-slate-200 shadow-2xs hover:border-teal-500 hover:text-teal-700 hover:shadow-sm"
                      }`}
                    >
                      {/* Left icon for selected / booked */}
                      {selected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="mr-1.5 inline-flex items-center"
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </motion.span>
                      )}

                      {booked && (
                        <span className="mr-1.5 inline-flex items-center text-slate-400">
                          <Lock className="h-3 w-3" />
                        </span>
                      )}

                      <span>{slot}</span>

                      {/* Tooltip on Hover for Booked Slots */}
                      {booked && (
                        <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20">
                          <div className="flex items-center space-x-1 rounded-md bg-slate-800 px-2 py-1 text-[10px] font-medium text-white shadow-md whitespace-nowrap">
                            <Lock className="h-2.5 w-2.5 text-amber-400" />
                            <span>Already Booked</span>
                          </div>
                          {/* Caret */}
                          <div className="mx-auto h-1 w-2 border-x-4 border-t-4 border-x-transparent border-t-slate-800" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Slot Summary Footer */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-6 flex items-center justify-between rounded-xl bg-teal-50/80 border border-teal-100 px-4 py-3 text-xs"
          >
            <div className="flex items-center space-x-2 text-teal-900">
              <Sparkles className="h-4 w-4 text-teal-600" />
              <span>
                Selected Slot: <strong className="font-semibold">{selectedSlot}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectSlot("")}
              className="text-teal-700 hover:text-teal-900 font-medium underline underline-offset-2"
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlotPicker;
