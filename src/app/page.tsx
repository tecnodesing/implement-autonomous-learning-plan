import { CURRICULUM } from "@/lib/curriculum";
import { PlatformClient } from "@/components/PlatformClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <PlatformClient curriculum={CURRICULUM} />;
}
