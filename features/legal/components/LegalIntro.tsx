import PageIntro from "@/components/PageIntro";

interface LegalIntroProps {
    title: string;
    description: string;
}

export default function LegalIntro({ title, description }: LegalIntroProps) {
    return (
        <PageIntro
            title={title}
            description={description}
            image="/pens.webp"
        />
    );
}
