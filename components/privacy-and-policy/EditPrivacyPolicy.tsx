"use client";


import PolicyActionButton from "@/components/privacy-and-policy/PolicyActionButton";
import PolicySaveCancelButton from "@/components/privacy-and-policy/PolicySaveCancelButton";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

const EditPrivacyPolicy = () => {
      const [features, setFeatures] = useState([
        "New Feature unlocked",
        "New Feature unlocked",
      ]);
    
      const addFeature = () => {
        setFeatures([...features, "New Feature unlocked"]);
      };
    
      const removeFeature = (index: unknown) => {
        setFeatures(features.filter((_, i) => i !== index));
      };
    return (
        <div>
              <div className=" space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Privacy Policy Title
              </label>
              <input
                type="text"
                defaultValue="New Feature unlocked"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Give a policy number
              </label>
              <input
                type="text"
                defaultValue="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Privacy Policy Features
              </label>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      defaultValue={feature}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-10"
                    />
                    {features.length > 1 && (
                      <button
                        onClick={() => removeFeature(index)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                      >
                        <Trash size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={addFeature}
                  className="mt-6 flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium  cursor-pointer"
                >
                  <div className="bg-blue-500 rounded-full p-1">
                    <Plus size={16} className="text-white" />
                  </div>
                  Add new feature
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <PolicySaveCancelButton />
          </div>
        </div>

        <div className=" p-8">
          <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Policy No 1</h3>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Emma Wilson</h4>

              <ul className="space-y-2 mb-4">
                <li className="text-sm text-gray-600 flex">
                  <span className="mr-2">•</span>
                  <span>
                    Sarah was absolutely amazing! She listened to exactly what I
                    wanted and gave me the perfect advice for my hair color
                    change. Very professional and knowledgeable.
                  </span>
                </li>
                <li className="text-sm text-gray-600 flex">
                  <span className="mr-2">•</span>
                  <span>
                    Sarah was absolutely amazing! She listened to exactly what I
                    wanted and gave me the perfect advice for my hair color
                    change. Very professional and knowledgeable.
                  </span>
                </li>
                <li className="text-sm text-gray-600 flex">
                  <span className="mr-2">•</span>
                  <span>
                    Sarah was absolutely amazing! She listened to exactly what I
                    wanted and gave me the perfect advice for my hair color
                    change. Very professional and knowledgeable.
                  </span>
                </li>
              </ul>

              <p className="text-xs text-gray-500 mb-4">
                Last Updated: 2024-12-15
              </p>

              {/* Action button */}
              <PolicyActionButton />
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default EditPrivacyPolicy;