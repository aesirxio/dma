/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';

import ListChannelComponent from '../../../../components/ChannelComponent/list';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';

const ContentFormPublishChannel = observer(() => {
  const context = useContext(ContentViewModelContext);
  const viewModel = context.getFormViewModel();

  const channelsData = viewModel.channelMasterData;

  const data = ChannelUtils.getChannelByFilter(channelsData, 'removed', 'not');

  if (data && data.length === 0) {
    return null;
  }

  return <ListChannelComponent channelsData={data} />;
});

export default ContentFormPublishChannel;
