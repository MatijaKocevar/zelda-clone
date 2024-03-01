import { useState, useEffect } from 'react';

export const useFullScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    useEffect(() => {
        const updateFullScreenStatus = () =>
            setIsFullScreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', updateFullScreenStatus);
        return () =>
            document.removeEventListener(
                'fullscreenchange',
                updateFullScreenStatus
            );
    }, []);

    const toggleFullScreen = (): void => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(console.error);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return { isFullScreen, toggleFullScreen };
};
