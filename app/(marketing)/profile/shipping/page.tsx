import { getShippingAddresses } from "@/features/profile/actions/get-shipping-addresses";
import ShippingForm from "../component/ShippingForm";


export default async function ShippingPage() {
  // Server-side fetch
  const response = await getShippingAddresses();
  const addresses = response.success ? response.data : [];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">My Shipping Addresses</h1>
      {addresses.length ? (
        <ShippingForm addresses={addresses} />
      ) : (
        <p className="text-gray-500">No shipping addresses found.</p>
      )}
    </div>
  );
}
