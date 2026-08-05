import { useState, useEffect } from "react";
import {
  FaTimes,
  FaPlus,
  FaTrash,
  FaFilePdf,
  FaStethoscope,
  FaCheck,
  FaCalendarAlt,
  FaUser,
  FaNotesMedical,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/axios";

const FREQUENCY_OPTIONS = [
  "1-0-1 (Morning & Night after food)",
  "1-1-1 (Thrice daily after food)",
  "1-0-0 (Morning only)",
  "0-0-1 (Night only before bed)",
  "0-1-0 (Afternoon only)",
  "As needed (SOS)",
];

const PrescriptionModal = ({ appointment, isOpen, onClose, onSuccess }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "1-0-1 (Morning & Night after food)", duration: "5 days", instructions: "Take after meals" },
  ]);
  const [medicalAdvice, setMedicalAdvice] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetchingExisting, setFetchingExisting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load existing prescription if already created
  useEffect(() => {
    if (isOpen && appointment?._id) {
      fetchExistingPrescription();
    } else {
      resetForm();
    }
  }, [isOpen, appointment]);

  const resetForm = () => {
    setDiagnosis("");
    setMedicines([
      { name: "", dosage: "", frequency: "1-0-1 (Morning & Night after food)", duration: "5 days", instructions: "Take after meals" },
    ]);
    setMedicalAdvice("");
    setFollowUpDate("");
    setAdditionalNotes("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const fetchExistingPrescription = async () => {
    try {
      setFetchingExisting(true);
      const res = await api.get(`/prescriptions/appointment/${appointment._id}`);

      if (res.data?.success && res.data?.prescription) {
        const p = res.data.prescription;
        setDiagnosis(p.diagnosis || "");
        setMedicines(
          p.medicines && p.medicines.length > 0
            ? p.medicines
            : [{ name: "", dosage: "", frequency: "1-0-1 (Morning & Night after food)", duration: "5 days", instructions: "" }]
        );
        setMedicalAdvice(p.medicalAdvice || "");
        setFollowUpDate(p.followUpDate ? p.followUpDate.split("T")[0] : "");
        setAdditionalNotes(p.additionalNotes || "");
      }
    } catch (err) {
      // If 404, it means no prescription has been issued yet, which is expected for fresh prescriptions
      if (err.response?.status !== 404) {
        console.error("Error fetching existing prescription:", err);
      }
    } finally {
      setFetchingExisting(false);
    }
  };

  const handleAddMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      { name: "", dosage: "", frequency: "1-0-1 (Morning & Night after food)", duration: "5 days", instructions: "" },
    ]);
  };

  const handleRemoveMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    setMedicines((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!diagnosis.trim()) {
      setErrorMessage("Please enter a valid diagnosis description.");
      return;
    }

    // Filter out completely empty medicine rows
    const cleanedMedicines = medicines.filter((m) => m.name && m.name.trim() !== "");

    try {
      setLoading(true);

      const response = await api.post("/prescriptions", {
        appointmentId: appointment._id,
        diagnosis: diagnosis.trim(),
        medicines: cleanedMedicines,
        medicalAdvice: medicalAdvice.trim(),
        followUpDate: followUpDate || null,
        additionalNotes: additionalNotes.trim(),
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to generate digital prescription.");
      }

      setSuccessMessage("Digital Prescription generated & email sent to patient successfully!");
      if (onSuccess) onSuccess(response.data.prescription);

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.error("Prescription generation error:", err);
      const apiMsg = err.response?.data?.message || err.message || "Something went wrong.";
      setErrorMessage(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !appointment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 my-8"
        >
          {/* Modal Header */}
          <div className="bg-[#253237] px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0077B6] text-white shadow-sm">
                <FaNotesMedical className="text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Issue Digital Prescription & Medical Notes
                </h2>
                <p className="text-xs text-[#9DB4C0]">
                  Auto-generates official PDF, uploads to Cloudinary & emails patient via Brevo
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          {fetchingExisting ? (
            <div className="p-12 text-center text-[#5C6B73]">
              <p className="text-sm font-medium animate-pulse">Loading prescription data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Patient Read-Only Context Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 rounded-2xl bg-[#F8FBFC] p-4 border border-gray-200/80 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-[#5C6B73] uppercase tracking-wider block">Patient</span>
                  <span className="font-bold text-[#253237] text-sm flex items-center gap-1.5 mt-0.5">
                    <FaUser className="text-xs text-[#0077B6]" />
                    {appointment.patientName}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#5C6B73] uppercase tracking-wider block">Age & Gender</span>
                  <span className="font-medium text-[#253237] mt-0.5 block">
                    {appointment.patientAge ? `${appointment.patientAge} Yrs` : "N/A"} / {appointment.gender || "Other"}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#5C6B73] uppercase tracking-wider block">Visit Date</span>
                  <span className="font-medium text-[#253237] mt-0.5 flex items-center gap-1">
                    <FaCalendarAlt className="text-xs text-[#5C6B73]" />
                    {new Date(appointment.appointmentDateTime).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#5C6B73] uppercase tracking-wider block">Chief Complaint</span>
                  <span className="font-medium text-[#253237] mt-0.5 block truncate" title={appointment.reason}>
                    {appointment.reason || "General Consultation"}
                  </span>
                </div>
              </div>

              {/* Status Alert Messages */}
              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3.5 text-xs text-rose-700 border border-rose-200">
                  <FaExclamationCircle className="text-sm shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3.5 text-xs text-emerald-700 border border-emerald-200">
                  <FaCheck className="text-sm shrink-0 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* 1. Diagnosis Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#253237] uppercase tracking-wider">
                  Diagnosis / Clinical Impression <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Acute Upper Respiratory Tract Infection, Mild Hypertension, Seasonal Allergies..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] p-3 text-xs text-[#253237] outline-none transition focus:bg-white focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/20"
                />
              </div>

              {/* 2. Dynamic Medicines List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#253237] uppercase tracking-wider">
                    Prescribed Medications (Rx)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="flex items-center gap-1.5 rounded-xl bg-[#253237] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1b262b] cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {medicines.map((med, index) => (
                    <div
                      key={index}
                      className="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs transition-all hover:border-[#0077B6]/50"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        {/* Medicine Name */}
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-semibold text-[#5C6B73] mb-1">
                            Medicine Name #{index + 1}
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Amoxicillin 500mg"
                            value={med.name}
                            onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] px-3 py-2 text-xs text-[#253237] outline-none focus:bg-white focus:border-[#253237]"
                          />
                        </div>

                        {/* Dosage */}
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-semibold text-[#5C6B73] mb-1">
                            Dosage
                          </label>
                          <input
                            type="text"
                            placeholder="1 Tablet / 5ml"
                            value={med.dosage}
                            onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] px-3 py-2 text-xs text-[#253237] outline-none focus:bg-white focus:border-[#253237]"
                          />
                        </div>

                        {/* Frequency */}
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-semibold text-[#5C6B73] mb-1">
                            Frequency
                          </label>
                          <select
                            value={med.frequency}
                            onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] px-2 py-2 text-xs text-[#253237] outline-none focus:bg-white focus:border-[#253237] cursor-pointer"
                          >
                            {FREQUENCY_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Duration */}
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-semibold text-[#5C6B73] mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            placeholder="5 Days"
                            value={med.duration}
                            onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] px-3 py-2 text-xs text-[#253237] outline-none focus:bg-white focus:border-[#253237]"
                          />
                        </div>

                        {/* Remove Action */}
                        <div className="sm:col-span-1 flex items-end justify-center pb-1">
                          {medicines.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMedicine(index)}
                              title="Remove Medicine"
                              className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <input
                          type="text"
                          placeholder="Special Instructions (e.g. Take with lukewarm water after meals)"
                          value={med.instructions}
                          onChange={(e) => handleMedicineChange(index, "instructions", e.target.value)}
                          className="w-full rounded-lg bg-gray-50 px-3 py-1.5 text-[11px] text-[#5C6B73] outline-none focus:bg-white focus:border-gray-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Medical Advice & Follow-Up Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#253237] uppercase tracking-wider">
                    Medical & Dietary Advice
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Rest adequately, drink 3L water daily, avoid fried/cold foods..."
                    value={medicalAdvice}
                    onChange={(e) => setMedicalAdvice(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] p-3 text-xs text-[#253237] outline-none transition focus:bg-white focus:border-[#253237]"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#253237] uppercase tracking-wider">
                      Recommended Follow-up Date
                    </label>
                    <input
                      type="date"
                      value={followUpDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] p-2.5 text-xs text-[#253237] outline-none focus:bg-white focus:border-[#253237] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#253237] uppercase tracking-wider">
                      Additional Clinical Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lab reports pending, follow up if fever persists"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] px-3 py-2 text-xs text-[#253237] outline-none focus:bg-white focus:border-[#253237]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-[#5C6B73] hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#253237] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#1b262b] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Generating PDF & Sending Email...</span>
                  ) : (
                    <>
                      <FaFilePdf className="text-sm text-[#C2DFE3]" />
                      <span>Issue Prescription PDF</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PrescriptionModal;
