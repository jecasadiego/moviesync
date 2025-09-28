import { ENotificationTemplateSlug, ENameTableTemplateNotificationsResourses, EEmailTemplateTitle, ESubjectEmail } from '@app/utils/constants/enums';
import { TNullableNumber } from "@app/utils/constants/types";

export interface IAuthData {
  token: string;
  refreshToken: string;
  tokenFirstSession?: string;
}

export interface IPayload {
  aud: string;
  sub: string;
  name: string;
  idUser: TNullableNumber;
  iat?: number;
}

export interface IDataReplace {
  key: string;
  value: string;
}


export interface IEmailData {
  title: string;
  date: string;
  location?: string;
  description: string;
  status?: string;
  correspondingResource?: string;
  url: string;
}

export interface BaseData {
  url: string;
  correspondingResource?: string;
  status?: string;
}

export interface INotificationConfig {
  notificationType: 'create_resource' | 'update_resource' | 'validation_resource';
  notificationTemplate: ENotificationTemplateSlug;
  notificationResource: ENameTableTemplateNotificationsResourses;
  notificationComments: string;
  emailTemplate: EEmailTemplateTitle;
  processUrl: string;
  status: string;
  title: string;
  subject: ESubjectEmail;
  correspondingResource?: string;
}