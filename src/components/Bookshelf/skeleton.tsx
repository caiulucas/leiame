import { SkeletonBookImage } from '@components/BookImage/skeleton';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SkeletonBookshelf: React.FC = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item marginHorizontal={RFValue(24)}>
        <SkeletonPlaceholder.Item
          height={RFValue(18)}
          width={RFValue(80)}
          borderRadius={RFValue(9)}
          marginVertical={RFValue(16)}
        />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        marginHorizontal={RFValue(24)}
        flexDirection="row"
      >
        {[1, 2, 3, 4].map(key => (
          <SkeletonPlaceholder.Item key={key} marginRight={RFValue(16)}>
            <SkeletonBookImage />
            <SkeletonPlaceholder.Item
              width={RFValue(96)}
              height={13}
              borderRadius={RFValue(7)}
              marginTop={RFValue(8)}
            />
            <SkeletonPlaceholder.Item
              width={RFValue(96)}
              height={13}
              borderRadius={RFValue(7)}
              marginTop={RFValue(4)}
              marginBottom={RFValue(16)}
            />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
