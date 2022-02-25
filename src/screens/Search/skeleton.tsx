import { SkeletonBookImage } from '@components/BookImage/skeleton';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SkeletonSearch: React.FC = () => {
  return (
    <SkeletonPlaceholder>
      {[1, 2, 3, 4, 5].map(key => (
        <SkeletonPlaceholder.Item
          key={key}
          flexDirection="row"
          marginBottom={RFValue(32)}
        >
          <SkeletonBookImage />
          <SkeletonPlaceholder.Item
            width="100%"
            marginLeft={RFValue(16)}
            paddingTop={RFValue(16)}
          >
            <SkeletonPlaceholder.Item
              height={RFValue(48)}
              width="60%"
              borderRadius={RFValue(16)}
              marginBottom={RFValue(16)}
            />
            <SkeletonPlaceholder.Item
              height={RFValue(15)}
              width={RFValue(104)}
              borderRadius={RFValue(7.5)}
            />
            <SkeletonPlaceholder.Item
              height={RFValue(15)}
              width={RFValue(136)}
              borderRadius={RFValue(7.5)}
              marginTop={RFValue(4)}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      ))}
    </SkeletonPlaceholder>
  );
};
