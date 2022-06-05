/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { withCampaignsViewModel } from '../CampaignsViewModels/CampaignsViewModelContextProvider';
import { Button } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import PAGE_STATUS from '../../../constants/PageStatus';
import Spinner from '../../../components/Spinner';

const ModalComponent = lazy(() => import('../../../components/Modal'));
const CampaignsForm = lazy(() => import('./CampaignsForm'));

const CampaignsFormModal = observer(
  class CampaignsFormModal extends Component {
    CampaignsFormModalViewModal = null;
    constructor(props) {
      super(props);

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;
      this.CampaignsFormModalViewModal = viewModel ? viewModel.getFormModalViewModel() : null;
    }

    saveCampaignsHandler = () => {
      if (this.isFormValid()) {
        this.CampaignsFormModalViewModal.saveOnModal();
      }
    };

    isFormValid = () => {
      if (this.validator.allValid()) {
        return true;
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        return false;
      }
    };

    render() {
      const { show, editMode, formStatus } = this.CampaignsFormModalViewModal;

      if (!show) {
        return null;
      }

      if (formStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <ModalComponent
          show={show}
          onHide={this.CampaignsFormModalViewModal.closeModal}
          header={editMode === false || editMode == null ? 'Create Campaign' : 'Edit Campaign'}
          body={
            <CampaignsForm
              viewModel={this.CampaignsFormModalViewModal}
              validator={this.validator}
            />
          }
          footer={
            <Button onClick={this.saveCampaignsHandler} className="btn btn-success w-100">
              <span>
                {editMode === false || editMode == null ? 'Create Campaign' : 'Save Campaign'}
              </span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsFormModal);
