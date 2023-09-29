/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

export const CHANNEL_CMS_WORDPRESS = 'wordpress';
export const CHANNEL_CMS_DRUPAL = 'drupal';
export const CHANNEL_CMS_MEDIUM = 'medium';
export const CHANNEL_TELEGRAM = 'telegram';
export const CHANNEL_CMS_TWRITEFREELY = 'writefreely';
export const CHANNEL_CMS_JOOMLA = 'joomla';
export const CHANNEL_ADS_GOOGLE = 'google_ads';
export const CHANNEL_ADS_FACEBOOK = 'fbad';
export const CHANNEL_TYPE = {
  FACEBOOK: {
    NAME: 'facebook',
    TYPE: 'social_media',
  },
  FACEBOOK_PAGE: {
    NAME: 'facebook',
    TYPE: 'social_media',
  },
  YOUTUBE: {
    NAME: 'youtube',
    TYPE: 'social_media',
  },
  TWITTER: {
    NAME: 'twitter',
    TYPE: 'social_media',
  },
  INSTAGRAM: {
    NAME: 'instagram',
    TYPE: 'social_media',
  },
  LINKEDIN: {
    NAME: 'linkedin',
    TYPE: 'social_media',
  },
  TELEGRAM: {
    NAME: 'telegram',
    TYPE: 'social_media',
  },
  LINKEDIN_PAGE: {
    NAME: 'linkedin',
    TYPE: 'social_media',
  },
  TUMBLR: {
    NAME: 'tumblr',
    TYPE: 'social_media',
  },
  WRITEFREELY: {
    NAME: 'writefreely',
    TYPE: 'social_media',
  },
  MEDIUM: {
    NAME: 'medium',
    TYPE: 'social_media',
  },
  FACEBOOK_ADS: {
    NAME: 'fbad',
    TYPE: 'advertising',
    OTHERNAME: 'fb_instagram_ads',
  },
  GOOGLE_ADS: {
    NAME: 'google_ads',
    TYPE: 'advertising',
    OTHERNAME: 'gg_ads',
  },
  WORDPRESS: {
    NAME: 'wordpress',
    TYPE: 'cms',
  },
  DRUPAL: {
    NAME: 'drupal',
    TYPE: 'cms',
  },
  JOOMLA: {
    NAME: 'joomla',
    TYPE: 'cms',
  },
  MAILCHIMP: {
    NAME: 'mailchimp',
    TYPE: 'email_marketing',
  },
};

const CHANNEL_FIELD_KEY = {
  ID: 'id',
  NAME: 'name',
  AVATAR: 'avatar',
  TYPE: 'type',
  GROUP_TYPE: 'groupType',
  CONNECTED: 'connected',
  CHANNEL_TYPE: 'alias',
  EXPIRED_TOKEN_TIME: 'expired_token_time',
};

const CHANNEL_TYPE_FIELD_KEY = {
  ID: 'id',
  NAME: 'name',
  IMAGE: 'img',
  PAGES: 'pages',
  STATUS: 'published',
  REQUIREMENTS: 'requirements',
};

const CHANNEL_CATEGORY_FIELD_KEY = {
  ID: 'id',
  NAME: 'name',
  LIST: 'list',
};

const CHANNEL_CMS_FIELD_KEY = {
  ENDPOINT: 'endpoint_url',
  CHANNEL_TYPE: 'channelType',
  USERNAME: 'username',
  PASSWORD: 'password',
  TOKEN: 'token',
  BOT_USERNAME: 'bot_username',
  BOT_TOKEN: 'bot_token',
  CHAT_IDS: 'chat_ids',
  BLOG: 'blog',
};

const CHANNEL_REQUIREMENT_FIELD_KEY = {
  DESCRIPTION: 'description',
  DISABLE_HEADLINE: 'disable_headline',
  HASHTAG: 'hashtag',
  HEADLINE: 'headline',
  IMAGE: 'image',
  MEDIA: 'media',
  VIDEO: 'video',
};

export {
  CHANNEL_FIELD_KEY,
  CHANNEL_TYPE_FIELD_KEY,
  CHANNEL_CATEGORY_FIELD_KEY,
  CHANNEL_CMS_FIELD_KEY,
  CHANNEL_REQUIREMENT_FIELD_KEY,
};
