import { useEffect } from 'react';
import { initLogan, reportLogs } from '@/lib/logan';

export const useLogan = (appId: string) => {
    useEffect(() => {
        initLogan(appId);
    }, [appId]);

    const report = async (params: {
        fromDayString: string;
        toDayString: string;
        reportUrl: string;
    }) => {
        return await reportLogs(params);
    };

    return { report };
};