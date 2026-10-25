import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { CheckedIcon } from '@/components/icons/checked';
import { DislikeIcon } from '@/components/icons/dislike-icon';
import { LikeIcon } from '@/components/icons/like-icon';
import { Review } from '@/types';

interface Props {
  className?: any;
  review: Review;
}

export function ReviewCard(props: Props) {
  const { t } = useTranslation();
  const { review } = props;
  const { comment, photos, positive_feedbacks_count, negative_feedbacks_count, user } = review;

  function handleImageClick() {
    // openModal('REVIEW_IMAGE_POPOVER', {
    //   images: photos,
    // });
  }

  return (
    <div className="block">
      <div className="mb-3 flex items-center text-xs text-gray-500">
        {t('text-by')} <span className="font-semibold capitalize text-heading ltr:ml-1 rtl:mr-1">{user?.name ? user?.name : t('text-guest')}</span>
        {user?.is_active && <CheckedIcon className="h-3.25 w-3.25 text-gray-700 ltr:ml-1 rtl:mr-1" />}
      </div>
      <p className="text-sm leading-6 text-heading">{comment}</p>
      <RenderComponent conditional={photos && photos.length > 0}>
        <div className="flex items-start pt-3 space-s-2">
          {photos?.map((photo: any, idx: any) => (
            <div
              className="mb-1"
              key={idx}
            >
              <img
                src={photo?.original ?? '/product-placeholder-borderless.svg'}
                width={32}
                height={32}
                className="inline-flex rounded-md bg-gray-200"
                alt={review?.product?.name}
              />
            </div>
          ))}

          <button
            className="my-1.5 font-semibold text-heading underline transition-colors hover:text-accent"
            onClick={handleImageClick}
          >
            {t('text-view-images')}
          </button>
        </div>
      </RenderComponent>
      <div className="mt-3 flex items-center space-x-4">
        <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
          <LikeIcon className="h-4 w-4 me-1.5" />
          {positive_feedbacks_count}
        </span>
        <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
          <DislikeIcon className="h-4 w-4 me-1.5" />
          {negative_feedbacks_count}
        </span>
      </div>
    </div>
  );
}
