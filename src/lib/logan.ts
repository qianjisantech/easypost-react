import Logan from 'logan-web';
import { get, set, del, keys } from 'idb-keyval';

// 初始化Logan并配置持久化
export const initLogService = async (appId: string) => {
    if (typeof window === 'undefined') return;

    // 初始化Logan
    await Logan.report({
        reportUrl: 'https://log.logan.sogou.com/upload',
        deviceId: 'easypost',
        fromDayString: '2023-07-01',
        toDayString: '2025-07-01',
    })

    // 检查IndexedDB中是否有未上报的日志
    await checkStoredLogs();
};

// 记录日志到IndexedDB
export const logToIndexedDB = async (content: string, logType?: number) => {
    if (typeof window === 'undefined') return;

    // 使用Logan记录日志
    if (logType != null) {
        Logan.log(content, logType);
    }

    // 获取当前日期作为存储键
    const today = new Date().toISOString().split('T')[0];

    // 将日志保存到IndexedDB
    try {
        const existingLogs = (await get(today)) || [];
        await set(today, [...existingLogs, { content, logType, timestamp: new Date().toISOString() }]);
    } catch (error) {
        console.error('Failed to store log in IndexedDB:', error);
    }
};

// 从IndexedDB获取日志
export const getLogsFromIndexedDB = async (dayString: string) => {
    if (typeof window === 'undefined') return [];
    return (await get(dayString)) || [];
};

// 从IndexedDB删除日志
export const deleteLogsFromIndexedDB = async (dayString: string) => {
    if (typeof window === 'undefined') return;
    await del(dayString);
};

// 获取所有有日志的日期
export const getLoggedDays = async () => {
    if (typeof window === 'undefined') return [];
    return (await keys()) as string[];
};

// 检查并处理存储的日志
const checkStoredLogs = async () => {
    const loggedDays = await getLoggedDays();
    console.log('Stored log days:', loggedDays);

    // 这里可以添加自动上报逻辑
    // 例如: await reportStoredLogs();
};

// 上报存储的日志
export const reportStoredLogs = async (reportUrl: string) => {
    if (typeof window === 'undefined') return {};

    const result: Record<string, any> = {};
    const loggedDays = await getLoggedDays();

    for (const dayString of loggedDays) {
        try {
            const logs = await getLogsFromIndexedDB(dayString);

            // 使用Logan上报
            const reportResult = await Logan.report({
                fromDayString: dayString,
                toDayString: dayString,
                xhrOptsFormatter: () => ({
                    reportUrl,
                    data: JSON.stringify(logs),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            });

            // 上报成功后删除
            if (reportResult[dayString]?.msg === 'Report succ') {
                await deleteLogsFromIndexedDB(dayString);
            }

            result[dayString] = reportResult[dayString];
        } catch (error) {
            result[dayString] = {
                msg: 'Report fail',
                desc: error.message
            };
        }
    }

    return result;
};