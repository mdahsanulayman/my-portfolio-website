create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  email text not null check (char_length(email) between 3 and 254),
  selected_service text check (
    selected_service is null or char_length(selected_service) between 1 and 100
  ),
  subject text not null check (char_length(btrim(subject)) between 3 and 200),
  message text not null check (char_length(btrim(message)) between 10 and 5000),
  submitted_at timestamptz not null default now(),
  rate_limit_hash text not null check (rate_limit_hash ~ '^[a-f0-9]{64}$')
);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon, authenticated;
grant select, insert on table public.contact_messages to service_role;

create index if not exists contact_messages_rate_limit_idx
  on public.contact_messages (rate_limit_hash, submitted_at desc);

create or replace function public.submit_contact_message(
  p_name text,
  p_email text,
  p_selected_service text,
  p_subject text,
  p_message text,
  p_rate_limit_hash text
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_recent_count bigint;
  v_message_id uuid;
begin
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_rate_limit_hash, 0)
  );

  select count(*)
    into v_recent_count
    from public.contact_messages
    where rate_limit_hash = p_rate_limit_hash
      and submitted_at >= pg_catalog.now() - interval '15 minutes';

  if v_recent_count >= 5 then
    raise exception 'Rate limit exceeded' using errcode = 'P0001';
  end if;

  insert into public.contact_messages (
    name,
    email,
    selected_service,
    subject,
    message,
    rate_limit_hash
  )
  values (
    p_name,
    p_email,
    p_selected_service,
    p_subject,
    p_message,
    p_rate_limit_hash
  )
  returning id into v_message_id;

  return v_message_id;
end;
$function$;

revoke all on function public.submit_contact_message(text, text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.submit_contact_message(text, text, text, text, text, text)
  to service_role;
