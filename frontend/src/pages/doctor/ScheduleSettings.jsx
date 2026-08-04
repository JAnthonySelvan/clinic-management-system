import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  FaClock,
  FaCalendarAlt,
  FaCalendarTimes,
  FaTimes,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

import {
  fetchMySchedule,
  updateAvailability,
  createBlockedDate,
  deleteBlockedDate,
  clearScheduleError,
  clearScheduleSuccess,
} from "../../features/schedule/scheduleSlice";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ScheduleSettings = () => {
  const dispatch = useDispatch();

  const { schedule, loading, saving, error, successMessage } = useSelector(
    (state) => state.schedule,
  );

  const [mounted, setMounted] = useState(false);

  // Local state for weekly availability form
  const [weeklyState, setWeeklyState] = useState({
    Monday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
    Tuesday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
    Wednesday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
    Thursday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
    Friday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
    Saturday: { isAvailable: true, startTime: "09:00", endTime: "18:00" },
    Sunday: { isAvailable: false, startTime: "09:00", endTime: "18:00" },
  });

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [leaveReason, setLeaveReason] = useState("");

  useEffect(() => {
    dispatch(fetchMySchedule());
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (schedule?.weeklyAvailability) {
      setWeeklyState((prev) => ({
        ...prev,
        ...schedule.weeklyAvailability,
      }));
    }
  }, [schedule]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearScheduleSuccess());
    }
    if (error) {
      toast.error(error);
      dispatch(clearScheduleError());
    }
  }, [successMessage, error, dispatch]);

  // Handle toggle day switch
  const handleToggleDay = (day) => {
    setWeeklyState((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
      },
    }));
  };

  // Handle time input changes
  const handleTimeChange = (day, field, value) => {
    setWeeklyState((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  // Submit Weekly Availability
  const handleSaveWeeklyAvailability = async () => {
    await dispatch(updateAvailability(weeklyState));
    dispatch(fetchMySchedule());
  };

  // Block Date submission
  const handleBlockSelectedDate = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error("Please select a date on the calendar first");
      return;
    }
    if (!leaveReason.trim()) {
      toast.error("Please enter a reason for blocking this date");
      return;
    }

    const isoDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      ),
    ).toISOString();

    const res = await dispatch(
      createBlockedDate({
        date: isoDate,
        reason: leaveReason.trim(),
      }),
    );
    if (!res.error) {
      setLeaveReason("");
      setSelectedDate(null);
      dispatch(fetchMySchedule());
    }
  };

  // Unblock date
  const handleRemoveBlocked = async (dateId) => {
    await dispatch(deleteBlockedDate(dateId));
    dispatch(fetchMySchedule());
  };

  // Calculations for summary banner
  const activeWorkingDaysCount = Object.values(weeklyState).filter(
    (d) => d.isAvailable,
  ).length;

  const todayStr = new Date().toISOString().split("T")[0];

  const upcomingLeaves = (schedule?.blockedDates || []).filter(
    (b) => new Date(b.date).toISOString().split("T")[0] >= todayStr,
  );

  // Calendar calculation helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isBlockedDate = (dayNum) => {
    if (!schedule?.blockedDates) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      dayNum,
    ).padStart(2, "0")}`;

    return schedule.blockedDates.some(
      (b) => new Date(b.date).toISOString().split("T")[0] === dateStr,
    );
  };

  const isToday = (dayNum) => {
    const today = new Date();
    return (
      today.getDate() === dayNum &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (dayNum) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === dayNum &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  if (loading && !schedule) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg font-medium text-[#5C6B73]">
          Loading schedule settings...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`space-y-10 transition-all duration-700 ease-out ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#253237]">
          Schedule & Leave Management
        </h1>
        <p className="mt-2 text-[#5C6B73]">
          Manage your recurring weekly working hours and schedule upcoming leave
          days.
        </p>
      </div>

      {/* Live Summary Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#F8FBFC] p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#253237] text-white">
            <FaInfoCircle className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#253237]">
              Current Schedule Overview
            </h3>
            <p className="text-sm text-[#5C6B73]">
              At-a-glance summary of your clinic availability and leaves
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="rounded-xl bg-white px-5 py-3 shadow-sm border border-gray-100 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
              Working Days
            </p>
            <p className="text-xl font-bold text-[#253237]">
              {activeWorkingDaysCount} days / week
            </p>
          </div>

          <div className="rounded-xl bg-white px-5 py-3 shadow-sm border border-gray-100 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
              Upcoming Leaves
            </p>
            <p className="text-xl font-bold text-[#253237]">
              {upcomingLeaves.length} scheduled
            </p>
          </div>
        </div>
      </div>

      {/* PANEL 1: Weekly Availability */}
      <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#253237] text-white">
              <FaClock className="text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#253237]">
                Weekly Working Hours
              </h2>
              <p className="text-xs text-[#5C6B73]">
                Set default clinic hours for each day of the week
              </p>
            </div>
          </div>
        </div>

        {/* 7-Row Day List */}
        <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
          {DAYS_OF_WEEK.map((day) => {
            const dayData = weeklyState[day] || {
              isAvailable: false,
              startTime: "09:00",
              endTime: "18:00",
            };

            return (
              <div
                key={day}
                className="flex flex-wrap items-center justify-between gap-4 p-5 transition duration-200 hover:bg-[#F8FBFC]"
              >
                {/* Day Name + Custom Pill Switch */}
                <div className="flex items-center gap-6 min-w-56">
                  {/* Custom Animated Pill Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleDay(day)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      dayData.isAvailable ? "bg-[#253237]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                        dayData.isAvailable ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>

                  <div>
                    <span className="text-base font-bold text-[#253237]">
                      {day}
                    </span>
                    <p className="text-xs text-[#5C6B73]">
                      {dayData.isAvailable ? "Working Day" : "Off Day"}
                    </p>
                  </div>
                </div>

                {/* Time Selector Inputs */}
                <div
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    dayData.isAvailable
                      ? "opacity-100"
                      : "opacity-40 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-[#5C6B73]">
                      Start:
                    </span>
                    <input
                      type="time"
                      value={dayData.startTime || "09:00"}
                      onChange={(e) =>
                        handleTimeChange(day, "startTime", e.target.value)
                      }
                      disabled={!dayData.isAvailable}
                      className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-[#253237] outline-none transition focus:border-[#253237] focus:ring-1 focus:ring-[#253237]"
                    />
                  </div>

                  <span className="text-gray-400 font-bold">–</span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-[#5C6B73]">
                      End:
                    </span>
                    <input
                      type="time"
                      value={dayData.endTime || "18:00"}
                      onChange={(e) =>
                        handleTimeChange(day, "endTime", e.target.value)
                      }
                      disabled={!dayData.isAvailable}
                      className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-[#253237] outline-none transition focus:border-[#253237] focus:ring-1 focus:ring-[#253237]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleSaveWeeklyAvailability}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#253237] px-8 py-3.5 text-base font-semibold text-white transition duration-300 hover:bg-[#5C6B73] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FaCheck />
            {saving ? "Saving..." : "Save Weekly Schedule"}
          </button>
        </div>
      </div>

      {/* PANEL 2: Blocked Dates / Leave Calendar */}
      <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#253237] text-white">
              <FaCalendarTimes className="text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#253237]">
                Leave Calendar & Blocked Dates
              </h2>
              <p className="text-xs text-[#5C6B73]">
                Select dates on the calendar to schedule leaves or block appointments
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Custom Month-Grid Calendar (7 Columns) */}
          <div className="lg:col-span-7 rounded-2xl border border-gray-100 bg-[#F8FBFC] p-6 shadow-sm">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#253237] shadow-sm hover:bg-gray-100 transition"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <h3 className="text-lg font-bold text-[#253237]">
                {monthNames[month]} {year}
              </h3>

              <button
                type="button"
                onClick={nextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#253237] shadow-sm hover:bg-gray-100 transition"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>

            {/* Weekday Header */}
            <div className="grid grid-cols-7 text-center mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <span
                  key={d}
                  className="text-xs font-bold uppercase tracking-wider text-[#5C6B73]"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {/* Empty padding slots before 1st of month */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`pad-${i}`} className="h-10 w-full" />
              ))}

              {/* Day Number Slots */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const blocked = isBlockedDate(dayNum);
                const today = isToday(dayNum);
                const selected = isSelected(dayNum);

                let btnClasses =
                  "h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-semibold transition duration-200 cursor-pointer ";

                if (blocked) {
                  btnClasses += "bg-[#253237] text-white font-bold shadow-md ";
                } else if (selected) {
                  btnClasses +=
                    "bg-[#5C6B73] text-white ring-4 ring-[#5C6B73]/20 ";
                } else if (today) {
                  btnClasses +=
                    "border-2 border-[#9DB4C0] text-[#253237] font-bold bg-white ";
                } else {
                  btnClasses +=
                    "bg-white text-[#253237] hover:bg-[#C2DFE3]/40 ";
                }

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => {
                      setSelectedDate(new Date(year, month, dayNum));
                    }}
                    className={btnClasses}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5C6B73]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#253237]" />
                <span>Blocked / Leave</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-[#9DB4C0] bg-white" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#5C6B73]" />
                <span>Selected</span>
              </div>
            </div>
          </div>

          {/* Inline Add Leave Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-[#253237] flex items-center gap-2">
                <FaPlus className="text-xs text-[#253237]" />
                Block Selected Date
              </h3>

              <p className="mt-1 text-xs text-[#5C6B73]">
                {selectedDate ? (
                  <span className="font-semibold text-[#253237]">
                    Selected Date: {selectedDate.toDateString()}
                  </span>
                ) : (
                  "Click any date on the calendar to select it"
                )}
              </p>

              <form
                onSubmit={handleBlockSelectedDate}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B73] mb-1">
                    Reason for Leave *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Personal Leave, Medical Conference"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    disabled={!selectedDate}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#253237] placeholder-gray-400 outline-none transition focus:border-[#253237] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedDate || saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#253237] py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaCalendarTimes />
                  {saving ? "Blocking..." : "Block This Date"}
                </button>
              </form>
            </div>

            <div className="mt-6 rounded-xl bg-[#F8FBFC] p-4 text-xs text-[#5C6B73]">
              <p className="font-medium text-[#253237]">📌 Note:</p>
              <p className="mt-1 leading-relaxed">
                Blocked dates automatically grey out availability in the online
                appointment booking system for patients.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable List of Blocked Dates Chips */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-bold text-[#253237] mb-4">
            Scheduled Leaves & Blocked Dates ({schedule?.blockedDates?.length || 0})
          </h3>

          {schedule?.blockedDates && schedule.blockedDates.length > 0 ? (
            <div className="flex flex-wrap gap-3 max-h-60 overflow-y-auto pr-2">
              {schedule.blockedDates.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center gap-3 rounded-full bg-[#C2DFE3] px-4 py-2.5 text-sm font-semibold text-[#253237] shadow-sm transition hover:shadow-md"
                >
                  <FaCalendarAlt className="text-xs text-[#253237]" />
                  <span>
                    {new Date(b.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-xs font-normal text-[#5C6B73]">
                    ({b.reason})
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      b.status === "Approved"
                        ? "bg-green-600 text-white"
                        : b.status === "Rejected"
                        ? "bg-red-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {b.status || "Pending"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlocked(b._id)}
                    title="Unblock date"
                    className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#253237] text-white hover:bg-red-600 transition duration-200"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-gray-200 bg-[#F8FBFC] p-8 text-center">
              <FaExclamationCircle className="mx-auto text-3xl text-gray-400" />
              <p className="mt-3 text-base font-bold text-[#253237]">
                No upcoming leaves scheduled
              </p>
              <p className="mt-1 text-xs text-[#5C6B73]">
                Your schedule is fully open during your configured weekly working hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSettings;
