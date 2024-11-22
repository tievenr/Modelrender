import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';

export const createFileUploader = (
  setError,
  setUploading,
  setUploadProgress,
  setLatestModel
) => {
  return async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gltf,.fbx,.glb';

    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!['gltf', 'fbx', 'glb'].includes(fileExtension)) {
        setError('Please select a GLTF, GLB, or FBX file');
        return;
      }

      try {
        setError(null);
        setUploading(true);

        const fileName = `${uuidv4()}.${fileExtension}`;
        const { data, error } = await supabase.storage
          .from('ModelDump')
          .upload(fileName, file, {
            cacheControl: '3600',
            onUploadProgress: (progress) => {
              const percentage = (progress.loaded / progress.total) * 100;
              setUploadProgress(Math.round(percentage));
            },
          });

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from('ModelDump')
          .getPublicUrl(fileName);

        setLatestModel({ name: file.name, url: publicUrlData.publicUrl });
      } catch (error) {
        setError(error.message);
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    };

    input.click();
  };
};
