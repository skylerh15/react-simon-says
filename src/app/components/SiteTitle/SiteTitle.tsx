import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

const SiteTitle: FC = () => {
    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'default.document.title' });

    return <Helmet title={title} />;
};

export default SiteTitle;
