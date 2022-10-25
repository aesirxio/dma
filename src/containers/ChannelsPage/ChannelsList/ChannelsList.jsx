/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withChannelsViewModel } from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import Spinner from '../../../components/Spinner';
import { Tab, Tabs } from 'react-bootstrap';
import ChannelType from './ChannelType';
import ChannelCallbackNotify from '../../../websocket/ChannelCallbackNotify';
import './index.scss';
import Upgrade from '../../../components/Upgrade';
import { withTranslation } from 'react-i18next';
const ModalComponent = lazy(() => import('../../../components/Modal'));

const ChannelsList = observer(
  class ChannelsList extends Component {
    channelsListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;

      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;
      ({ socket: this.socket } = ChannelCallbackNotify.__init(this.channelsListViewModel));
    }

    componentDidMount() {
      this.channelsListViewModel.init();
    }

    componentWillUnmount() {
      this.channelsListViewModel.reset();
      if (this.socket.connected) {
        this.socket.disconnect();
      }
      this.socket.close();
    }

    render() {
      const { tableStatus, channelsData } = this.channelsListViewModel;
      const { t } = this.props;
      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <div className="py-4 px-3">
          <h2 className="text-blue-0 mb-4 text-blue-0">{t('txt_connect_a_channel')}</h2>
          <div className="wrapper_tabs">
            <Tabs defaultActiveKey="0" id="connectContent-tab" className="bg-white border-0">
              {channelsData.map((channelCategory, index) => (
                <Tab key={index} eventKey={index} title={channelCategory.name}>
                  <ChannelType channelCategory={channelCategory} channelTypeIndex={index} />
                </Tab>
              ))}
            </Tabs>
          </div>
          <ModalComponent
            show={this.channelsListViewModel.showUpgrade}
            onHide={this.channelsListViewModel.closeModalUpgrade}
            header={t('txt_please_upgrade_account')}
            body={<Upgrade></Upgrade>}
            key={Math.random(40, 200)}
          />
        </div>
      );
    }
  }
);

export default withTranslation('common')(withChannelsViewModel(ChannelsList));
