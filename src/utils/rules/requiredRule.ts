import i18n from '@/i18n';

export default function requiredRule(value: string): boolean | string {
  return !!value || i18n.t('errors.requiredRule') as string;
}
