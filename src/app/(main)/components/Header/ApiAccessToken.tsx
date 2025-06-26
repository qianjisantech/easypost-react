import React from 'react';

interface ApiAccessTokenProps {
}

export const ApiAccessToken: React.FC<ApiAccessTokenProps> = () => {
    return (
        <div>
            <div >
                <h2>API访问令牌</h2>
                <span>生成个人API访问令牌(access token)可用来调用EasyPost开放API。个人API访问令牌可对当前账下可访问数据进行匹配授权的操看详细说明</span>
            </div>
        </div>
    );
};