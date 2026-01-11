'use client';

import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { Loader2 } from "lucide-react";
import ProfileForm from "./component/ProfileForm";
import ShippingForm from "./component/ShippingForm";
import PromoCodeList from "./component/PromoCodeList";
import { toast } from "sonner";
import { UserProfile } from "@/features/profile/types";
import { ShippingAddress } from "@/features/profile/types";
import { PromoCode } from "@/features/admin/promo-codes/types";
import { getProfile } from "@/features/profile/actions/get-profile";
import { getUserPromoCodes } from "@/features/profile/actions/get-user-promo-codes";
import { getShippingAddresses } from "@/features/profile/actions/get-shipping-addresses";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, shippingRes, promoRes] = await Promise.all([
          getProfile(),
          getShippingAddresses(),
          getUserPromoCodes(),
        ]);

        if (profileRes?.success) setProfile(profileRes.data);
        if (shippingRes?.success) setShippingAddresses(shippingRes.data || []);
        if (promoRes?.success) setPromoCodes(promoRes.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !profile) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  return (
    <Section padding="sm">
      <Container>
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">Update profile, password, and personal details.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <ProfileForm profile={profile} setProfile={setProfile} />
          <ShippingForm addresses={shippingAddresses} />
        </div>
        <div className="mt-12">
          <PromoCodeList codes={promoCodes} />
        </div>
      </Container>
    </Section>
  );
}

