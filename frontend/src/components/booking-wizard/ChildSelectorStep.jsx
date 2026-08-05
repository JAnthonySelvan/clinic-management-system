import { FaChild, FaPlus, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ChildSelectorStep = ({ childrenList, onSelectChild, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E0FBFC] mb-4 shadow-lg">
          <FaChild className="text-2xl text-[#C2DFE3]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E0FBFC] tracking-tight">
          Select Child Profile
        </h2>
        <p className="mt-2 text-sm text-[#9DB4C0]">
          Choose an existing child profile or add details for another child.
        </p>
      </div>

      <div className="space-y-4 bg-transparent p-0 border-0 shadow-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {childrenList.map((child) => (
            <button
              key={child._id}
              type="button"
              onClick={() => onSelectChild(child)}
              className="p-5 rounded-2xl bg-[#16222a] border border-[#253237] hover:border-[#C2DFE3] text-left transition group relative overflow-hidden flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-full bg-[#253237] border border-[#5C6B73] text-[#E0FBFC] flex items-center justify-center font-bold">
                  <FaChild className="text-base text-[#C2DFE3]" />
                </div>
                <span className="text-[11px] font-semibold bg-[#253237] text-[#C2DFE3] px-2.5 py-1 rounded-full border border-[#5C6B73]/50">
                  {child.childLabel || "Child"}
                </span>
              </div>

              <div>
                <h4 className="text-base font-semibold text-[#E0FBFC] group-hover:text-white transition">
                  {child.fullName}
                </h4>
                <p className="text-xs text-[#9DB4C0] mt-1">
                  Age: {child.age} • Gender: {child.gender}
                </p>
                {child.phone && (
                  <p className="text-xs text-[#5C6B73] mt-0.5">Phone: {child.phone}</p>
                )}
              </div>
            </button>
          ))}

          {/* Add New Child Card */}
          <button
            type="button"
            onClick={() => onSelectChild(null)}
            className="p-5 rounded-2xl border-2 border-dashed border-[#253237] hover:border-[#C2DFE3] bg-[#16222a]/50 text-left transition flex flex-col items-center justify-center space-y-3 min-h-[130px] group"
          >
            <div className="w-10 h-10 rounded-full bg-[#253237] text-[#C2DFE3] group-hover:bg-[#C2DFE3] group-hover:text-[#253237] flex items-center justify-center transition duration-200">
              <FaPlus />
            </div>
            <span className="text-sm font-semibold text-[#E0FBFC] group-hover:text-white">
              Add New Child
            </span>
          </button>
        </div>

        <div className="pt-4 border-t border-[#253237]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 text-xs text-[#C2DFE3] hover:underline"
          >
            <FaArrowLeft />
            <span>Back to Relationship Selection</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChildSelectorStep;
