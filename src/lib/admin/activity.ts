import { createClient } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";
import type { StaffProfile } from "@/lib/admin/auth";

export async function logActivity(input: {
  actor: StaffProfile | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  summary: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = await createClient();
  await supabase.from(MS_TABLES.activityLog).insert({
    actor_id: input.actor?.id ?? null,
    actor_email: input.actor?.email ?? null,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    summary: input.summary,
    metadata: input.metadata ?? {},
  });
}
