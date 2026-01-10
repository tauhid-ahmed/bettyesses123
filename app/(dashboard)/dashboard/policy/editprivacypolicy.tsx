"use client";

import { Plus, Trash } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PolicyType } from "../privacy-and-policy/policy";
import { createLegalPage } from "@/features/admin/legal/actions/create-legal-page";
import { updateLegalPage } from "@/features/admin/legal/actions/update-legal-page";
import { deleteLegalPage } from "@/features/admin/legal/actions/delete-legal-page";
import { createLegalPageSchema, CreateLegalPageSchema } from "@/features/admin/legal/schemas";
import { LegalPage } from "@/features/admin/legal/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EditPrivacyPolicyProps {
  type: PolicyType;
  initialPolicies: LegalPage[];
}

const EditPrivacyPolicy = ({ type, initialPolicies }: EditPrivacyPolicyProps) => {
  const pageTitle = type === "privacy" ? "Privacy Policy" : "Terms & Conditions";
  const apiType = type === "privacy" ? "PRIVACY_POLICY" : "TERMS_AND_CONDITIONS";
  
  const [policies, setPolicies] = useState<LegalPage[]>(initialPolicies);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateLegalPageSchema>({
    resolver: zodResolver(createLegalPageSchema),
    defaultValues: {
      title: type === "privacy" ? "New Security Standards" : "New Feature unlocked",
      policyNumber: 1,
      features: type === "privacy" 
        ? ["End-to-end encryption for all data", "Multi-factor authentication support"]
        : ["New Feature unlocked", "New Feature unlocked"],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features" as any, 
  });

  // Sync policies if initialPolicies changes (e.g., revalidation)
  useEffect(() => {
    setPolicies(initialPolicies);
  }, [initialPolicies]);

  const onSubmit = (data: CreateLegalPageSchema) => {
    startTransition(async () => {
      // Optimistic update could go here

      if (editingId) {
        const payload = {
            title: data.title,
            policyNumber: data.policyNumber,
            features: data.features,
            isActive: true, // Preserve or set default
        };
        const result = await updateLegalPage(editingId, payload);
         if (result.success && result.data) {
            toast.success(result.message);
            setPolicies((prev) => prev.map(p => p.id === editingId ? result.data! : p));
            handleCancel();
          } else {
            toast.error(result.message);
          }
      } else {
        // Create new
        const payload = {
            type: apiType,
            title: data.title,
            policyNumber: data.policyNumber,
            features: data.features,
        };
        const result = await createLegalPage(payload);
        if (result.success && result.data) {
            toast.success(result.message);
            setPolicies((prev) => [...prev, result.data!]); 
             form.reset({
                title: type === "privacy" ? "New Security Standards" : "New Feature unlocked",
                policyNumber: (result.data?.policyNumber || 0) + 1,
                features: ["New Feature unlocked"],
             });
          } else {
            toast.error(result.message);
          }
      }
    });
  };

  const handleEdit = (policy: LegalPage) => {
    setEditingId(policy.id);
    form.reset({
      title: policy.title,
      policyNumber: policy.policyNumber,
      features: policy.features,
    });
    // Scroll to form if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    // Optimistic delete
    const previousPolicies = [...policies];
    setPolicies((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);

    const result = await deleteLegalPage(deleteId);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
      // Revert if failed
      setPolicies(previousPolicies);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
        title: type === "privacy" ? "New Security Standards" : "New Feature unlocked",
        policyNumber: 1,
         features: type === "privacy" 
        ? ["End-to-end encryption for all data", "Multi-factor authentication support"]
        : ["New Feature unlocked", "New Feature unlocked"],
    });
  };

  return (
    <div>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">{editingId ? `Edit ${pageTitle}` : `Create ${pageTitle}`}</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {pageTitle} Title
              </label>
              <input
                {...form.register("title")}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter title"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Give a policy number
              </label>
              <input
                {...form.register("policyNumber")}
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                 placeholder="Enter policy number"
              />
               {form.formState.errors.policyNumber && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.policyNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                 {pageTitle} Features
              </label>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <input
                      {...form.register(`features.${index}` as const)}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-10"
                      placeholder="Enter feature"
                    />
                    
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                      >
                        <Trash size={18} />
                      </button>
                    )}
                     {form.formState.errors.features?.[index] && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.features[index]?.message}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => append("")}
                  className="mt-6 flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                >
                  <div className="bg-blue-500 rounded-full p-1">
                    <Plus size={16} className="text-white" />
                  </div>
                  Add new feature
                </button>
              </div>
              {form.formState.errors.features && !Array.isArray(form.formState.errors.features) && (
                  <p className="text-red-500 text-sm mt-1">{(form.formState.errors.features as any).message}</p>
              )}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="px-12 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 hover:border hover:border-black transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="px-12 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
              >
                {isPending ? "Saving..." : editingId ? "Save Changes" : "Save"}
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <h2 className="text-4xl font-semibold mb-6">{pageTitle}</h2>
          {policies.length === 0 ? (
               <p className="text-gray-500">No policies found.</p>
          ) : (
            policies.map((policy) => (
                <div key={policy.id} className="pt-6">
                <div className="bg-gray-50 rounded-lg p-2 lg:p-0 md:p-2 ">
                    <h3 className="text-lg font-semibold mb-4">
                    {pageTitle} {policy.policyNo}
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
                        Last Updated: {new Date(policy.updatedAt).toLocaleDateString()}
                    </p>

                    <div className="flex gap-3">
                        <button
                        onClick={() => handleEdit(policy)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                        Make Changes
                        </button>

                        <button
                        onClick={() => setDeleteId(policy.id)}
                        className="px-6 py-3 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            ))
          )}
        </div>
      </div>
      
       <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this policy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditPrivacyPolicy;
