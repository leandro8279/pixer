import { UploadIcon } from '@/components/icons/upload-icon';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Attachment } from '@/types';
import { CloseIcon } from '@/components/icons/close-icon';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { useUploadMutation } from '@/data/upload';
import { zipPlaceholder } from '@/utils/placeholders';
import { ACCEPTED_FILE_TYPES } from '@/utils/constants';
import classNames from 'classnames';
import cn from 'classnames';
import RenderComponent from '@/components/common/render-component';

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }];
  }
  return images;
};

export function Uploader({
  onChange,
  value,
  multiple,
  acceptFile,
  helperText,
  maxSize,
  maxFiles,
  disabled,
}: any) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value));
  const { mutate: upload, isLoading: loading } = useUploadMutation();
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile
      ? {
          accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
          },
        }
      : { ...ACCEPTED_FILE_TYPES }),
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        upload(
          acceptedFiles,
          {
            onSuccess: (data: any) => {
              data &&
                data?.map((file: any, idx: any) => {
                  const splitArray = file?.original?.split('/');
                  let fileSplitName =
                    splitArray[splitArray?.length - 1]?.split('.');
                  const fileType = fileSplitName?.pop();
                  const filename = fileSplitName?.join('.');
                  data[idx]['file_name'] = filename + '.' + fileType;
                });

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
          },
        );
      }
    },
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
    const imgTypes = [
      'tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'webp', 'gif', 'png', 'eps', 'raw',
    ];

    if (file && file.id) {
      const splitArray = file?.file_name
        ? file?.file_name.split('.')
        : file?.thumbnail?.split('.');
      const fileType = splitArray?.pop();
      const filename = splitArray?.join('.');
      const isImage = file?.thumbnail && imgTypes.includes(fileType);

      return (
        <div
          className={cn(
            'relative mt-2 inline-flex flex-col overflow-hidden rounded me-2',
            isImage ? 'border border-border-200' : '',
            disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : '',
          )}
          key={idx}
        >
          <RenderComponent conditional={!!isImage}>
            <figure className="relative flex items-center justify-center h-16 w-28 aspect-square">
              <img
                src={file.thumbnail}
                alt={filename}
                className="object-cover w-full h-full"
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
                  className="inline-block max-w-[64px] overflow-hidden overflow-ellipsis whitespace-nowrap"
                  title={`${filename}.${fileType}`}
                >
                  {filename}
                </span>
                .{fileType}
              </p>
            </div>
          </RenderComponent>

          <RenderComponent conditional={!!multiple}>
            <button
              className="absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-light shadow-xl outline-none end-1"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          </RenderComponent>

          <RenderComponent conditional={!disabled}>
            <button
              className="absolute flex items-center justify-center w-4 h-4 text-xs bg-red-600 rounded-full shadow-xl outline-none top-1 text-light end-1"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          </RenderComponent>
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      setError(null);
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files],
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className: classNames(
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none relative',
            disabled
              ? 'pointer-events-none select-none opacity-80 bg-[#EEF1F4]'
              : 'cursor-pointer',
          ),
        })}
      >
        <RenderComponent conditional={!disabled}>
          <input {...getInputProps()} />
        </RenderComponent>
        <UploadIcon className="text-muted-light" />
        <p className="mt-4 text-sm text-center text-body">
          <RenderComponent conditional={!!helperText}>
            <span className="font-semibold text-gray-500">{helperText}</span>
          </RenderComponent>
          <RenderComponent conditional={!helperText}>
            <>
              <span className="font-semibold text-accent">
                {t('text-upload-highlight')}
              </span>{' '}
              {t('text-upload-message')} <br />
              <span className="text-xs text-body">{t('text-img-format')}</span>
            </>
          </RenderComponent>
        </p>
        <RenderComponent conditional={!!error}>
          <p className="mt-4 text-sm text-center text-red-600">{error}</p>
        </RenderComponent>
      </div>

      <RenderComponent conditional={!!thumbs.length || !!loading}>
        <aside className="flex flex-wrap mt-2">
          <RenderComponent conditional={!!thumbs.length}>
            <>{thumbs}</>
          </RenderComponent>
          <RenderComponent conditional={!!loading}>
            <div className="flex items-center h-16 mt-2 ms-2">
              <Loader simple={true} className="w-6 h-6" />
            </div>
          </RenderComponent>
        </aside>
      </RenderComponent>
    </section>
  );
}

export default Uploader;
