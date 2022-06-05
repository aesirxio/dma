/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction } from 'mobx';

import { notify } from '../../../components/Toast';

export default class InvesterContactStore {
  async investerContactSave(callbackOnSuccess) {
    let response = null;
    runInAction(() => {
      callbackOnSuccess(response);
    });
    setTimeout(function () {
      notify('Thank you! Your information has been submitted successfully');
    }, 1000);
  }
}
