import { Messages } from 'types/i18n';

import en from './messages.en';
import es from './messages.es';
import fr from './messages.fr';

export const AppMessages: { [languageCode: string]: Messages } = {
    en,
    es,
    fr
};
export default AppMessages;
