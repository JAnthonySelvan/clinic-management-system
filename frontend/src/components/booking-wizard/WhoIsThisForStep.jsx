import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchFamilyProfiles } from "../../features/patientProfile/patientProfileSlice";
import { FaUser, FaUsers, FaArrowRight, FaChild, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const RELATIONSHIPS = [
  { id: "father", label: "Father", icon: FaUsers },
  { id: "mother", label: "Mother", icon: FaHeart },
  { id: "wife", label: "Wife", icon: FaHeart },
  { id: "child", label: "Child", icon: FaChild },
];

const WhoIsThisForStep = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const { familyProfiles, loading } = useAppSelector((state) => state.patientProfile);

  const [bookingFor, setBookingFor] = useState("self"); // "self" | "family"
  const [selectedRelationship, setSelectedRelationship] = useState("father");

  useEffect(() => {
    dispatch(fetchFamilyProfiles());
  }, [dispatch]);

  const handleContinue = () => {
    if (bookingFor === "self") {
      const selfProfile = familyProfiles?.self || null;
      onNext({ relationship: "self", profile: selfProfile, hasChildren: false });
    } else {
      if (selectedRelationship === "child") {
        const children = familyProfiles?.children || [];
        onNext({
          relationship: "child",
          profile: null,
          childrenList: children,
          hasChildren: children.length > 0,
        });
      } else {
        const profile = familyProfiles?.[selectedRelationship] || null;
        onNext({
          relationship: selectedRelationship,
          profile,
          hasChildren: false,
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E0FBFC] mb-4 shadow-lg">
          <FaUsers className="text-2xl text-[#C2DFE3]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E0FBFC] tracking-tight">
          Who is this Appointment For?
        </h2>
        <p className="mt-2 text-sm text-[#9DB4C0]">
          Select whether this consultation is for yourself or a family member.
        </p>
      </div>

      <div className="space-y-6 bg-transparent p-0 border-0 shadow-none">
        {/* Choice Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setBookingFor("self")}
            className={`p-6 rounded-2xl border transition duration-200 text-left flex flex-col items-center justify-center space-y-3 ${
              bookingFor === "self"
                ? "bg-[#253237]/80 border-[#C2DFE3] text-[#E0FBFC] shadow-lg ring-1 ring-[#C2DFE3]"
                : "bg-black/40 border-white/20 text-[#9DB4C0] hover:bg-black/60"
            }`}
          >
            <div className={`p-3.5 rounded-full ${bookingFor === "self" ? "bg-white/20 text-[#E0FBFC]" : "bg-black/30 text-[#5C6B73]"}`}>
              <FaUser className="text-xl" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-base">For Myself</div>
              <div className="text-xs opacity-75 mt-0.5">Book using my details</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setBookingFor("family")}
            className={`p-6 rounded-2xl border transition duration-200 text-left flex flex-col items-center justify-center space-y-3 ${
              bookingFor === "family"
                ? "bg-[#253237]/80 border-[#C2DFE3] text-[#E0FBFC] shadow-lg ring-1 ring-[#C2DFE3]"
                : "bg-black/40 border-white/20 text-[#9DB4C0] hover:bg-black/60"
            }`}
          >
            <div className={`p-3.5 rounded-full ${bookingFor === "family" ? "bg-white/20 text-[#E0FBFC]" : "bg-black/30 text-[#5C6B73]"}`}>
              <FaUsers className="text-xl" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-base">Family Member</div>
              <div className="text-xs opacity-75 mt-0.5">Father, Mother, Wife, Child</div>
            </div>
          </button>
        </div>

        {/* Relationship Selector if Family Member */}
        {bookingFor === "family" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="pt-4 border-t border-[#253237] space-y-4"
          >
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider">
              Select Family Relationship
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {RELATIONSHIPS.map((rel) => {
                const IconComponent = rel.icon;
                const isSelected = selectedRelationship === rel.id;
                return (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setSelectedRelationship(rel.id)}
                    className={`py-3 px-3 rounded-xl border text-sm font-medium transition flex flex-col items-center space-y-2 ${
                      isSelected
                        ? "bg-[#253237] border-[#C2DFE3] text-[#E0FBFC] shadow"
                        : "bg-[#16222a] border-[#253237] text-[#9DB4C0] hover:border-[#5C6B73]"
                    }`}
                  >
                    <IconComponent className={isSelected ? "text-[#C2DFE3]" : "text-[#5C6B73]"} />
                    <span>{rel.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#2c3d44] hover:to-[#2c3d44] text-[#E0FBFC] font-semibold rounded-2xl shadow-lg border border-[#C2DFE3]/30 transition duration-300 flex items-center justify-center space-x-2 text-base disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <span className="w-5 h-5 border-2 border-[#E0FBFC] border-t-transparent rounded-full animate-spin"></span>
              <span>Loading profiles...</span>
            </span>
          ) : (
            <>
              <span>Continue</span>
              <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default WhoIsThisForStep;
