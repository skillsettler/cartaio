insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'conversions',
  'conversions',
  false,
  524288000,
  array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg','image/png','image/tiff','image/webp']
);

create policy "Auth users can upload" on storage.objects for insert
  to authenticated with check (bucket_id = 'conversions' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Auth users can read own files" on storage.objects for select
  to authenticated using (bucket_id = 'conversions' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Service role full access" on storage.objects for all
  to service_role using (bucket_id = 'conversions');
