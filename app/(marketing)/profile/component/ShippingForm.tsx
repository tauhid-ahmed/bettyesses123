"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
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
import { ShippingAddress } from "@/features/profile/types";
import { createShippingAddress } from "@/features/profile/actions/create-shipping-address";
import { updateShippingAddress } from "@/features/profile/actions/update-shipping-address";
import { deleteShippingAddress } from "@/features/profile/actions/delete-shipping-address";

interface ShippingFormProps {
  addresses: ShippingAddress[];
}

interface AddressFormData {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptBuilding: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  addressType: string;
}

const emptyAddress: AddressFormData = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  aptBuilding: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  phone: "",
  addressType: "HOME",
};

export default function ShippingForm({ addresses: initialAddresses }: ShippingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [addresses, setAddresses] = useState<ShippingAddress[]>(initialAddresses);
  const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async (data: AddressFormData, resetForm: () => void) => {
    startTransition(async () => {
      const result = await createShippingAddress(data);
      if (result.success && result.data.length > 0) {
        toast.success(result.message);
        setAddresses([...addresses, result.data[0]]);
        resetForm();
        router.refresh();
      } else {
        toast.error(result.message || "Failed to create address");
      }
    });
  };

  const handleUpdate = async (addressId: string, data: AddressFormData) => {
    startTransition(async () => {
      const result = await updateShippingAddress(addressId, data);
      if (result.success && result.data.length > 0) {
        toast.success(result.message);
        setAddresses(
          addresses.map((addr) => (addr.id === addressId ? result.data[0] : addr))
        );
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update address");
      }
    });
  };

  const confirmDelete = async () => {
    if (!deleteAddressId) return;

    setIsDeleting(true);
    startTransition(async () => {
      const result = await deleteShippingAddress(deleteAddressId);
      if (result.success) {
        toast.success(result.message);
        setAddresses(addresses.filter((addr) => addr.id !== deleteAddressId));
        setDeleteAddressId(null);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete address");
      }
      setIsDeleting(false);
    });
  };

  const AddressForm = ({
    address,
    isNew = false,
  }: {
    address: ShippingAddress | AddressFormData;
    isNew?: boolean;
  }) => {
    const { register, handleSubmit, reset } = useForm<AddressFormData>({
      defaultValues: address || emptyAddress,
    });

    const onSubmit = (data: AddressFormData) => {
      if (isNew) {
        handleCreate(data, reset);
      } else {
        handleUpdate((address as ShippingAddress).id, data);
      }
    };

    return (
      <div className="bg-primary-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">
          {isNew ? "New Shipping Address" : "Shipping Address"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label>Country / Region</Label>
            <select
              {...register("country")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a country</option>
              <option value="BD">Bangladesh</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="IN">India</option>
              <option value="PK">Pakistan</option>
              <option value="CN">China</option>
              <option value="JP">Japan</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="BR">Brazil</option>
              <option value="MX">Mexico</option>
              <option value="AE">United Arab Emirates</option>
              <option value="SG">Singapore</option>
              <option value="MY">Malaysia</option>
              <option value="TH">Thailand</option>
              <option value="SA">Saudi Arabia</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label>First Name</Label>
              <Input {...register("firstName")} />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input {...register("lastName")} />
            </div>
          </div>

          <div className="mb-4">
            <Label>Phone</Label>
            <Input {...register("phone")} />
          </div>

          <div className="mb-4">
            <Label>Street Address</Label>
            <Input {...register("streetAddress")} />
          </div>

          <div className="mb-4">
            <Label>Apt / Building</Label>
            <Input {...register("aptBuilding")} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <Input {...register("city")} placeholder="City" />
            <Input {...register("state")} placeholder="State" />
            <Input {...register("zipCode")} placeholder="Zip" />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
            >
              {isPending ? "Saving..." : isNew ? "Create Address" : "Update Address"}
            </Button>
            {!isNew && (
              <Button
                type="button"
                disabled={isPending}
                variant="destructive"
                className="flex-1"
                onClick={() => setDeleteAddressId((address as ShippingAddress).id)}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {/* New Address Form - Always shown at top */}
      <AddressForm address={emptyAddress} isNew={true} />

      {/* Existing Addresses */}
      {addresses.map((address) => (
        <AddressForm key={address.id} address={address} isNew={false} />
      ))}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteAddressId !== null} onOpenChange={(open) => !open && setDeleteAddressId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this shipping address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}