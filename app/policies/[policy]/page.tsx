import { notFound } from "next/navigation";
import { documents } from "@/lib/policies";
import { translate } from "@/lib/i18n";
import PolicyContent from "@/components/policy-content";
import "./policies.css";

export function generateStaticParams() {
  return Object.keys(documents).map((policy) => ({ policy }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>;
}) {
  const { policy } = await params;
  return { title: translate(documents[policy]?.title ?? "Information", "az") };
}
export default async function PolicyPage({
  params,
}: {
  params: Promise<{ policy: string }>;
}) {
  const { policy } = await params,
    document = documents[policy];
  if (!document) notFound();
  return <PolicyContent policy={policy} document={document} />;
}
