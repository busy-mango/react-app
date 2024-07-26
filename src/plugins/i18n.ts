import type { BackendModule } from 'i18next';

import { i18nAsync } from '@/utils';

export const i18nResourcesLoad: BackendModule = {
  type: 'backend' as const,
  init: () => {
    /* use services and options */
  },
  read: i18nAsync,
  // // only used in backends acting as cache layer
  // save: function(language, namespace, data) {
  //   // store the translations
  // },
  // create: function(languages, namespace, key, fallbackValue) {
  //   /* save the missing translation */
  // }
};
