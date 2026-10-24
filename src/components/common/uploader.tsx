import cn from 'classnames';
import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { CloseIcon } from '@/components/icons/close-icon';
import { UploadIcon } from '@/components/icons/upload-icon copy';
import { Loader } from '@/components/ui/loader/loader';
import { useRootStore } from '@/contexts/root';
import { Attachment } from '@/types';
import { ACCEPTED_FILE_TYPES } from '@/utils/constants';
import { zipPlaceholder } from '@/utils/placeholders';

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }];
  }
  return images;
};

interface Props {
  onChange: (value: any) => void;
  value: File;
  multiple?: boolean;
  acceptFile?: boolean;
  helperText?: string;
  maxSize?: number;
  maxFiles?: boolean;
  disabled?: boolean;
}

export function Uploader(props: Props) {
  const { t } = useTranslation();
  const { onChange, value, multiple, acceptFile, helperText, maxSize, disabled } = props;
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value));
  const upload = useRootStore('upload');
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile ? { accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] } } : { ...ACCEPTED_FILE_TYPES }),
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        upload.upload.mutate(acceptedFiles, {
          onSuccess: (data: any) => {
            if (data) {
              data.map((file: any, idx: any) => {
                const splitArray = file?.original?.split('/');
                let fileSplitName = splitArray[splitArray?.length - 1]?.split('.');
                const fileType = fileSplitName?.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
                const filename = fileSplitName?.join('.'); // it will join the array with dot, which restore the original filename
                data[idx]['file_name'] = filename + '.' + fileType;
              });
            }

            let mergedData;
            if (multiple) {
              mergedData = files.concat(data);
              setFiles(files.concat(data));
            } else {
              mergedData = data[0];
              setFiles(data);
            }
            if (onChange) {
              onChange(mergedData);
            }
          },
        });
      }
    },
    // maxFiles: 2,
    maxSize: maxSize,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file?.errors?.forEach((error) => {
          if (error?.code === 'file-too-large') {
            setError(t('error-file-too-large'));
          } else if (error?.code === 'file-invalid-type') {
            setError(t('error-invalid-file-type'));
          }
        });
      });
    },
  });

  const handleDelete = (image: string) => {
    const images = files.filter((file) => file.thumbnail !== image);
    setFiles(images);
    if (onChange) {
      onChange(images);
    }
  };

  const thumbs = files?.map((file: any, idx) => {
    const imgTypes = ['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'webp', 'gif', 'png', 'eps', 'raw'];
    // let filename, fileType, isImage;
    if (file && file.id) {
      // const processedFile = processFileWithName(file);
      const splitArray = file?.file_name ? file?.file_name.split('.') : file?.thumbnail?.split('.');
      const fileType = splitArray?.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
      const filename = splitArray?.join('.'); // it will join the array with dot, which restore the original filename
      const isImage = file?.thumbnail && imgTypes.includes(fileType); // check if the original filename has the img ext

      return (
        <div
          className={cn(
            'relative mt-2 inline-flex flex-col overflow-hidden rounded me-2',
            isImage ? 'border border-border-200' : '',
            disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : '',
          )}
          key={idx}
        >
          <RenderComponent conditional={isImage}>
            <figure className="relative flex items-center justify-center h-16 w-28 aspect-square">
              <img
                src={file.thumbnail}
                alt={filename}
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
              />
            </figure>
          </RenderComponent>

          <RenderComponent conditional={!isImage}>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center min-w-0 overflow-hidden h-14 w-14">
                <img
                  src={zipPlaceholder}
                  width={56}
                  height={56}
                  alt="upload placeholder"
                />
              </div>
              <p className="flex items-baseline p-1 text-xs cursor-default text-body">
                <span
                  className="inline-block max-w-16 overflow-hidden text-ellipsis whitespace-nowrap"
                  title={`${filename}.${fileType}`}
                >
                  {filename}
                </span>
                .{fileType}
              </p>
            </div>
          </RenderComponent>

          {/* // TODO : this uploader component needs to be checked in pixer */}

          <RenderComponent conditional={multiple}>
            <button
              className="absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-light shadow-xl outline-none inset-e-1"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon
                width={10}
                height={10}
              />
            </button>
          </RenderComponent>

          <RenderComponent conditional={!disabled}>
            <button
              className="absolute flex items-center justify-center w-4 h-4 text-xs bg-red-600 rounded-full shadow-xl outline-none top-1 text-light inset-e-1"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon
                width={10}
                height={10}
              />
            </button>
          </RenderComponent>
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Reset error after upload new file
      setError(null);

      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files],
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className: cn(
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none relative',
            disabled ? 'pointer-events-none select-none opacity-80 bg-[#EEF1F4]' : 'cursor-pointer',
          ),
        })}
      >
        <RenderComponent conditional={!disabled}>
          <input {...getInputProps()} />
        </RenderComponent>
        <UploadIcon className="text-muted-light" />
        <p className="mt-4 text-sm text-center text-body">
          <RenderComponent conditional={helperText}>
            <span className="font-semibold text-gray-500">{helperText}</span>
          </RenderComponent>

          <RenderComponent conditional={!helperText}>
            <span className="font-semibold text-accent">{t('text-upload-highlight')}</span> {t('text-upload-message')} <br />
            <span className="text-xs text-body">{t('text-img-format')}</span>
          </RenderComponent>
        </p>

        <RenderComponent conditional={error}>
          <p className="mt-4 text-sm text-center text-red-600">{error}</p>
        </RenderComponent>
      </div>

      <Observer>
        {() => (
          <RenderComponent conditional={!!thumbs.length || upload.upload.isLoading}>
            <aside className="flex flex-wrap mt-2">
              <div className="flex items-center h-16 mt-2 ms-2">
                <Loader
                  simple={true}
                  className="w-6 h-6"
                />
              </div>
            </aside>
          </RenderComponent>
        )}
      </Observer>
    </section>
  );
}
