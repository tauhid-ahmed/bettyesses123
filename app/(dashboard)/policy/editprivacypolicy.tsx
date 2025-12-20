"use client";

import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { PolicyType } from "../privacy-and-policy/policy";

type Policy = {
  id: string;
  title: string;
  policyNo: string;
  features: string[];
  updatedAt: string;
};

interface EditPrivacyPolicyProps {
  type: PolicyType;
}

const EditPrivacyPolicy = ({ type }: EditPrivacyPolicyProps) => {
  const [title, setTitle] = useState("New Feature unlocked");
  const [policyNo, setPolicyNo] = useState("1");
  const [features, setFeatures] = useState<string[]>([
    "New Feature unlocked",
    "New Feature unlocked",
  ]);

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addFeature = () => {
    setFeatures((prev) => [...prev, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleSave = () => {
    const policyData: Policy = {
      id: editingId ?? crypto.randomUUID(),
      title,
      policyNo,
      features,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setPolicies((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? policyData : item));
      }
      return [...prev, policyData];
    });

    // reset form edit mode
    setEditingId(null);
    setTitle("");
    setPolicyNo("");
    setFeatures([""]);
  };

  const handleEdit = (policy: Policy) => {
    setEditingId(policy.id);
    setTitle(policy.title);
    setPolicyNo(policy.policyNo);
    setFeatures(policy.features);
  };

  const handleDelete = (id: string) => {
    setPolicies((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setPolicyNo("");
    setFeatures([""]);
  };

  return (
    <div>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Privacy Policy Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Give a policy number
              </label>
              <input
                type="text"
                value={policyNo}
                onChange={(e) => setPolicyNo(e.target.value)}
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
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
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
                  className="mt-6 flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                >
                  <div className="bg-blue-500 rounded-full p-1">
                    <Plus size={16} className="text-white" />
                  </div>
                  Add new feature
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={handleCancel}
                className="px-12 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 hover:border hover:border-black transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-12 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-semibold">Privacy Policy</h2>
          {policies.map((policy) => (
            <div key={policy.id} className="pt-6">
              <div className="bg-gray-50 rounded-lg p-2 lg:p-0 md:p-2 ">
                <h3 className="text-lg font-semibold mb-4">
                  Policy No {policy.policyNo}
                </h3>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {policy.title}
                  </h4>

                  <ul className="space-y-2 mb-4">
                    {policy.features.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-500 mb-4">
                    Last Updated: {policy.updatedAt}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(policy)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Make Changes
                    </button>

                    <button
                      onClick={() => handleDelete(policy.id)}
                      className="px-6 py-3 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
