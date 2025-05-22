document.addEventListener('DOMContentLoaded', () => {
    const makeRequestButton = document.getElementById('makeRequest');
    const resultDiv = document.getElementById('result');
    
    // 添加请求按钮点击事件
    makeRequestButton.addEventListener('click', async () => {
        // 显示加载状态
        resultDiv.innerHTML = '<p>正在发送请求...</p>';
        
        try {
            // 记录开始时间
            const startTime = performance.now();
            
            // 发送请求
            const response = await fetch('/api/info', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            // 计算请求时间
            const endTime = performance.now();
            const duration = (endTime - startTime).toFixed(2);
            
            if (response.ok) {
                // 尝试解析JSON响应
                try {
                    const data = await response.json();
                    displayResult(data, duration, true);
                } catch (e) {
                    // 如果不是JSON，显示文本
                    const text = await response.text();
                    displayResult({ message: text }, duration, true);
                }
            } else {
                displayResult({ 
                    error: `请求失败: ${response.status} ${response.statusText}` 
                }, duration, false);
            }
        } catch (error) {
            // 显示错误信息
            displayResult({ 
                error: `请求错误: ${error.message}`,
                note: '注意: 由于我们的API端点尚未实现，这个错误是预期的。在实际应用中，你需要在服务器上实现相应的API端点。'
            }, 0, false);
        }
    });
    
    // 显示结果函数
    function displayResult(data, duration, success) {
        let html = '';
        
        if (success) {
            html += `<p class="success">请求成功! (耗时: ${duration}ms)</p>`;
        } else {
            html += `<p class="error">${data.error}</p>`;
            if (data.note) {
                html += `<p><em>${data.note}</em></p>`;
            }
        }
        
        html += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        
        resultDiv.innerHTML = html;
    }
    
    // 显示HTTP/2连接信息
    if (window.performance && window.performance.getEntriesByType) {
        const pageEntry = performance.getEntriesByType('navigation')[0];
        if (pageEntry && pageEntry.nextHopProtocol) {
            const protocolInfo = document.createElement('div');
            protocolInfo.className = 'protocol-info';
            protocolInfo.innerHTML = `<p>当前连接协议: <strong>${pageEntry.nextHopProtocol}</strong></p>`;
            
            // 在页面顶部插入协议信息
            const container = document.querySelector('.container');
            container.insertBefore(protocolInfo, container.firstChild);
        }
    }
});