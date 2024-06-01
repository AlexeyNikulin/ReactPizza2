import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="122" cy="122" r="122" />
        <circle cx="146" cy="179" r="14" />
        <circle cx="91" cy="132" r="8" />
        <rect x="0" y="266" rx="0" ry="0" width="280" height="28" />
        <rect x="0" y="315" rx="0" ry="0" width="280" height="88" />
        <rect x="4" y="426" rx="0" ry="0" width="90" height="35" />
        <rect x="124" y="425" rx="15" ry="15" width="150" height="36" />
    </ContentLoader>
);

export default Skeleton;
