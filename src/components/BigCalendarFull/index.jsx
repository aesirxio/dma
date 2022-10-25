/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CONTENT_FIELD_KEY } from '../../constants/ContentModule';
import ContentUtils from '../../containers/ContentPage/ContentUtils/ContentUtils';
import './index.scss';
import FilterCalendar from '../FilterCalendar';
import CustomToolbar from './CustomToolbar';
import { CSSTransition } from 'react-transition-group';
import history from '../../routes/history';
import { withTranslation } from 'react-i18next';

import 'moment/locale/vi';
import 'moment/locale/es';
import 'moment/locale/uk';
import 'moment/locale/de';
import 'moment/locale/th';

const localizer = momentLocalizer(moment);

class BigCalendarFull extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textBtnGroup: 'Month',
      textDayGroup: 'Today',
      isFilterCalendar: false,
    };
  }

  eventPropGetter = (event) => {
    return {
      style: { backgroundColor: event.background },
    };
  };

  handleNavigate = (date, view) => {
    let first_day = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DD');
    let last_day = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format(
      'YYYY-MM-DD'
    );
    if (view == 'agenda') {
      first_day = moment(date).format('YYYY-MM-DD');
      last_day = moment(date).add(30, 'd').format('YYYY-MM-DD');
    }
    this.props.onFilter(
      {
        [CONTENT_FIELD_KEY.START_DATE]: first_day,
        [CONTENT_FIELD_KEY.END_DATE]: last_day,
      },
      0,
      0
    );
  };

  Event = ({ event }) => {
    let divClass = 'wrapper_des_event d-inline-block w-100 shadow label-rounded ';
    let spanClass = 'fw-semibold wrapper_des_event_title text-wrap opacity-75 ';
    const channelName = event.channel.length > 0 ? event?.channel[0]?.alias : 'facebook';
    divClass += channelName + '_calendar_background ';
    spanClass += channelName + '_calendar_text';

    const navigateEditPost = () => {
      history.push(`content-edit/${event.id}`);
    };
    moment.locale('en');
    const time = moment(event.start).format('h:mm A');

    return (
      <div
        title={time + ' | ' + event.title}
        onClick={event.type === 'planing' ? '' : navigateEditPost}
      >
        <div className={divClass}>
          <span
            style={{ cursor: 'pointer' }}
            className={spanClass + ' w-100 text-decoration-none d-inline-block'}
          >
            <span className="wrapper_des_event_time">{time} | </span>
            <span>{event.title}</span>
          </span>
        </div>
      </div>
    );
  };

  handleFilterCalendar = () => {
    this.setState({
      isFilterCalendar: true,
    });
  };

  handleCloseFilterCalendar = () => {
    this.setState({
      isFilterCalendar: false,
    });
  };

  render() {
    const { t, i18n } = this.props;
    let events = this.props?.events
      ? this.props?.events.map((content) => {
          const date = moment(content[CONTENT_FIELD_KEY.DATE], 'DD/MM/YYYY HH:mm');

          return {
            id: content[CONTENT_FIELD_KEY.ID],
            title: content[CONTENT_FIELD_KEY.NAME],
            allDay: false,
            start: date.toDate(),
            end: date.toDate(),
            CHANNEL_TYPE: 'channel_type',
            channel: ContentUtils.getPageDetail(
              content[CONTENT_FIELD_KEY.CHANNELS],
              this.props?.listViewModel?.channelMasterData
            ),
          };
        })
      : [];
    events = events.concat(this.props.listViewModel.plaining);

    return (
      <div className="wr_calendar h-100 ">
        <div className="wr_calendar--left">
          <Calendar
            culture={i18n.language || 'en'}
            popup
            localizer={localizer}
            events={events}
            defaultDate={this.props.showDate}
            defaultView={this.props.showView}
            showMultiDayTimes
            components={{
              toolbar: CustomToolbar(this.handleFilterCalendar, t),
              event: this.Event,
            }}
            eventPropGetter={this.eventPropGetter}
            onNavigate={this.handleNavigate}
            messages={{
              noEventsInRange: t('txt_nopost_agenda'),
              showMore: function (e) {
                return `+${e}  ${t('txt_more')}`;
              },
            }}
          />
        </div>
        <CSSTransition in={this.state.isFilterCalendar} timeout={300} classNames="filter_calendar">
          <FilterCalendar
            show={this.state.isFilterCalendar}
            handleCloseFilterCalendar={this.handleCloseFilterCalendar}
            {...this.props}
          />
        </CSSTransition>
      </div>
    );
  }
}

export default withTranslation('common')(BigCalendarFull);
