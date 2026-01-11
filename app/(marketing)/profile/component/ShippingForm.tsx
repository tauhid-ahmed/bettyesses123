"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShippingAddress } from "@/features/profile/types";

interface ShippingFormProps {
  addresses: ShippingAddress[];
}

export default function ShippingForm({ addresses }: ShippingFormProps) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm({
    defaultValues: addresses[0] || {},
  });

  const onSubmit = (data: any) => {
    startTransition(() => {
      toast.info("Update shipping address is not implemented yet."
        
      );
      console.log("Shipping Data:", data);
    });
  };

  return (
    <div className="bg-primary-100 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
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

    

        <Button
          type="submit"
          disabled={isPending}
          className="bg-gradient-to-r from-blue-500 to-purple-500"
        >
          {isPending ? "Saving..." : "Update Address"}
        </Button>
      </form>
    </div>
  );
}