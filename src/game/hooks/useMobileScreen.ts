import { useState, useEffect } from 'react';

export const useMobileScreen = (isFullScreen: boolean) => {
    const [showFullScreenButton, setShowFullScreenButton] = useState<boolean>(false);

    useEffect(() => {
        const checkMobileDevice = (): void => {
            const screenWidth = window.innerWidth;
            setShowFullScreenButton(screenWidth <= 991 && !isFullScreen);
        };

        window.addEventListener('resize', checkMobileDevice);
        checkMobileDevice();

        return () => window.removeEventListener('resize', checkMobileDevice);
    }, [isFullScreen]);

    return showFullScreenButton;
};
