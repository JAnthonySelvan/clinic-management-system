import { useState, useEffect } from "react";
import {
  FaTimes,
  FaFileDownload,
  FaExternalLinkAlt,
  FaStethoscope,
  FaCalendarCheck,
  FaUserMd,
  FaPills,
  FaNotesMedical,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/axios";

const PrescriptionViewerModal = ({ appointmentId, isOpen, onClose }) => {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && appointmentId) {
      fetchPrescription();
    }
  }, [isOpen, appointmentId]);

  const fetchPrescription = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/prescriptions/appointment/${appointmentId}`);

      if (!res.data?.success || !res.data?.prescription) {
        throw new Error(res.data?.message || "Prescription not found.");
      }

      setPrescription(res.data.prescription);
    } catch (err) {
      console.error("Error fetching prescription:", err);
      const msg = err.response?.data?.message || err.message || "Failed to load prescription.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 my-8"
        >
          {/* Header */}
          <div className="bg-[#253237] px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0077B6] text-white shadow-sm">
                <FaNotesMedical className="text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Digital Prescription & Medical Summary
                </h2>
                <p className="text-xs text-[#9DB4C0]">
                  Official Verified Clinical Document | Saviours Clinic
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

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {loading ? (
              <div className="py-16 text-center text-[#5C6B73]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#253237] border-t-transparent mx-auto mb-3" />
                <p className="text-xs font-semibold">Loading official prescription document...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center text-rose-600 space-y-3">
                <FaExclamationCircle className="text-3xl mx-auto text-rose-500" />
                <p className="text-sm font-medium">{error}</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 rounded-xl hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            ) : (
              prescription && (
                <>
                  {/* Top Doctor & Consultation Info Banner */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-[#F8FBFC] p-4 border border-gray-200/80">
                    <div>
                      <span className="text-[10px] font-bold text-[#0077B6] uppercase tracking-wider block">
                        Attending Specialist
                      </span>
                      <h3 className="text-sm font-bold text-[#253237] flex items-center gap-1.5 mt-0.5">
                        <FaUserMd className="text-xs text-[#0077B6]" />
                        Dr. {prescription.doctor?.name || "Medical Officer"}
                      </h3>
                      <p className="text-xs text-[#5C6B73]">
                        {prescription.doctor?.specialization || "General Medicine"}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-[10px] font-bold text-[#5C6B73] uppercase tracking-wider block">
                        Issued Date
                      </span>
                      <p className="text-xs font-medium text-[#253237]">
                        {new Date(prescription.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* 1. Diagnosis */}
                  <div className="rounded-2xl bg-[#F0F7F9] p-4 border border-[#C2DFE3]/50">
                    <span className="text-[11px] font-bold text-[#253237] uppercase tracking-wider block mb-1">
                      Diagnosis / Clinical Observation
                    </span>
                    <p className="text-xs font-semibold text-[#1E293B] leading-relaxed">
                      {prescription.diagnosis}
                    </p>
                  </div>

                  {/* 2. Prescribed Medicines */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#253237] uppercase tracking-wider flex items-center gap-1.5">
                      <FaPills className="text-xs text-[#0077B6]" />
                      <span>Prescribed Medicines ({prescription.medicines?.length || 0})</span>
                    </h4>

                    {prescription.medicines && prescription.medicines.length > 0 ? (
                      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#F8FBFC] text-[#253237] font-bold uppercase tracking-wider border-b border-gray-200 text-[10px]">
                            <tr>
                              <th className="px-4 py-2.5">#</th>
                              <th className="px-4 py-2.5">Medicine</th>
                              <th className="px-4 py-2.5">Dosage</th>
                              <th className="px-4 py-2.5">Frequency</th>
                              <th className="px-4 py-2.5">Duration</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-medium">
                            {prescription.medicines.map((med, i) => (
                              <tr key={i} className="hover:bg-gray-50/50">
                                <td className="px-4 py-3 text-gray-400 font-mono text-[11px]">{i + 1}</td>
                                <td className="px-4 py-3 font-bold text-[#253237]">
                                  {med.name}
                                  {med.instructions && (
                                    <div className="text-[10px] font-normal text-[#5C6B73] mt-0.5">
                                      Note: {med.instructions}
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-[#5C6B73]">{med.dosage || "-"}</td>
                                <td className="px-4 py-3 text-[#0077B6] font-semibold">{med.frequency || "-"}</td>
                                <td className="px-4 py-3 text-[#5C6B73]">{med.duration || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">No specific medicines prescribed.</p>
                    )}
                  </div>

                  {/* 3. Medical Advice & Follow up */}
                  {(prescription.medicalAdvice || prescription.followUpDate || prescription.additionalNotes) && (
                    <div className="rounded-2xl border border-gray-200 bg-[#F8FBFC] p-4 space-y-3">
                      {prescription.medicalAdvice && (
                        <div>
                          <span className="text-[10px] font-bold text-[#5C6B73] uppercase tracking-wider block">
                            Doctor Advice & Instructions
                          </span>
                          <p className="text-xs text-[#253237] mt-0.5">{prescription.medicalAdvice}</p>
                        </div>
                      )}

                      {prescription.followUpDate && (
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0077B6] pt-2 border-t border-gray-200/60">
                          <FaCalendarCheck />
                          <span>
                            Recommended Follow-up Visit:{" "}
                            {new Date(prescription.followUpDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Download PDF Actions Footer */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-[#5C6B73]">
                      Official Cloudinary Storage URL ready
                    </span>

                    <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                      <a
                        href={prescription.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-[#253237] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#1b262b] cursor-pointer"
                      >
                        <FaExternalLinkAlt className="text-xs text-[#C2DFE3]" />
                        <span>View / Open PDF</span>
                      </a>

                      <a
                        href={prescription.pdfUrl}
                        download={`Prescription_${prescription._id}.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-[#0077B6] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#005f92] cursor-pointer"
                      >
                        <FaFileDownload className="text-xs" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PrescriptionViewerModal;
