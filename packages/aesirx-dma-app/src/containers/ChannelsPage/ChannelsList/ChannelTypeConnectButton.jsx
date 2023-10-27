/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext, useState } from 'react';

import { observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';

const ChannelTypeConnectButton = observer(({ channelCategory, channelType }) => {
  const context = useContext(ChannelsViewModelContext);
  const channelsListViewModel = context.getChannelsListViewModel();

  const [connecting, setConnecting] = useState(false);
  const { t } = useTranslation();
  const handleOnClick = async () => {
    if (
      channelCategory.id === 'cms' ||
      channelType.id === 'medium' ||
      channelType.id === 'telegram' ||
      channelType.id === 'writefreely'
    ) {
      context.getChannelsListLoginViewModel().openModal(channelType);
    } else {
      setConnecting(true);
      await channelsListViewModel.connectChannel(channelType.id);
    }
    setConnecting(false);
  };

  if (connecting) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <button
      className="btn btn-success d-flex justify-content-center align-items-center p-2 w-110px"
      onClick={handleOnClick}
    >
      <i className="fs-5 me-2">
        <FontAwesomeIcon icon={faPlus} />
      </i>
      {connecting ? t('txt_connecting') : t('txt_connect')}
    </button>
  );
});

export default withTranslation()(ChannelTypeConnectButton);
