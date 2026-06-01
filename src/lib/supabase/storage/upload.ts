import { createClient } from '../client';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'ghf_media';

export async function uploadMedia(file: File, path: string = ''): Promise<string | null> {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : fileName;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
}
