import { Messages } from 'types/i18n';
import { Locales } from 'enums';

import en from './messages.en';
import es from './messages.es';
import fr from './messages.fr';

export const AppMessages: { [languageCode in Locales]: Messages } = { en, es, fr };
export default AppMessages;
