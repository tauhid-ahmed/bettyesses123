import { getPromoCodeById } from "@/features/admin/promo-codes/actions/get-promo-code-by-id";
import EditPromoCodeForm from "@/features/admin/promo-codes/components/EditPromoCodeForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditPromoCodePage({ params }: PageProps) {
  const { id } = await params;
  const result = await getPromoCodeById(id);

  if (!result.success || !result.data) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Failed to load promo code.</p>
        <p className="text-sm text-gray-500">{result.message}</p>
      </div>
    );
  }

  return <EditPromoCodeForm initialData={result.data} />;
}
