import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type SkeletonBookImage = {
  type?: 'primary' | 'secondary';
};

export const SkeletonBookImage: React.FC<SkeletonBookImage> = ({
  type = 'primary',
}) => {
  return (
    <SkeletonPlaceholder.Item
      width={type === 'primary' ? RFValue(96) : RFValue(144)}
      height={type === 'primary' ? RFValue(144) : RFValue(216)}
      borderRadius={type === 'primary' ? RFValue(8) : 0}
    />
  );
};
