// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[now.getDay()];
    
    const currentTimeElement = document.getElementById('current-time');
    currentTimeElement.textContent = `${year}年${month}月${day}日 ${weekday} ${hours}:${minutes}:${seconds}`;
}

// 计算倒计时和进度
function updateCountdowns() {
    const now = new Date();
    
    // 目标日期
    const targets = [
        { date: new Date('2026-01-30T20:00:00'), id: 1 },
        { date: new Date('2026-02-14T20:00:00'), id: 2 },
        { date: new Date('2026-03-01T00:00:00'), id: 3 },
        { date: new Date('2026-02-18T09:05:00'), id: 4 }
    ];
    
    targets.forEach(target => {
        const timeDiff = target.date - now;
        
        if (timeDiff > 0) {
            // 计算天、小时、分钟、秒
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            // 更新倒计时显示
            document.getElementById(`day${target.id}`).textContent = String(days).padStart(2, '0');
            document.getElementById(`hour${target.id}`).textContent = String(hours).padStart(2, '0');
            document.getElementById(`minute${target.id}`).textContent = String(minutes).padStart(2, '0');
            document.getElementById(`second${target.id}`).textContent = String(seconds).padStart(2, '0');
            
            // 计算进度（假设开始日期为2026年1月1日）
            const startDate = new Date('2026-01-01T00:00:00');
            const totalTime = target.date - startDate;
            const elapsedTime = now - startDate;
            const progress = (elapsedTime / totalTime) * 100;
            
            // 更新进度条和进度文本
            const progressBar = document.getElementById(`progress${target.id}`);
            progressBar.style.width = `${progress}%`;
            document.getElementById(`progress-text${target.id}`).textContent = `进度 ${progress.toFixed(1)}%`;
        } else {
            // 倒计时结束
            document.getElementById(`day${target.id}`).textContent = '00';
            document.getElementById(`hour${target.id}`).textContent = '00';
            document.getElementById(`minute${target.id}`).textContent = '00';
            document.getElementById(`second${target.id}`).textContent = '00';
            document.getElementById(`progress${target.id}`).style.width = '100%';
            document.getElementById(`progress-text${target.id}`).textContent = '进度 100.0%';
        }
    });
}

// 初始化
function init() {
    updateCurrentTime();
    updateCountdowns();
    
    // 每秒更新一次
    setInterval(() => {
        updateCurrentTime();
        updateCountdowns();
    }, 1000);
}

// 页面加载完成后初始化
window.onload = init;