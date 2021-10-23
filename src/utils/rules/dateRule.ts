import i18n from '@/i18n';

export default function dateRule(value: string): boolean | string {
  const dateRegexp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  return dateRegexp.test(value) || i18n.t('errors.dateRule') as string;
}
