import { memo } from 'react';
import Header from '../theme/header/index.jsx';

const HomePage = () => {
    return (
        <>
            <Header />
            <h2>HomePage</h2>
            <h2>Footer</h2>
        </>
    );
};
export default memo(HomePage);