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
        { date: new Date('2026-02-06T20:00:00'), id: 1, title: '周五出狱（休息一天）', icon: '🎯', note: '马上快到晚上7点，我要点好饭' },
        { date: new Date('2026-02-14T20:00:00'), id: 2, title: '春节放假（休息九天）+年度窝囊费+董事红包', icon: '🧧', note: '开心开心极了' },
        { date: new Date('2026-02-18T09:05:00'), id: 4, title: '尼泊尔之旅', icon: '✈️', note: '世界那么大，我想去看看！' },
        { date: new Date('2026-03-01T00:00:00'), id: 3, title: '退税退税退税日', icon: '💰', note: '还钱！！！！！！！！！' },
        { date: new Date('2026-02-28T20:00:00'), id: 5, title: '周六休息日', icon: '🎉', note: '又到周五了！' },
        { date: new Date('2026-03-06T20:00:00'), id: 6, title: '周六休息日', icon: '🎉', note: '继续加油！' },
        { date: new Date('2026-03-13T20:00:00'), id: 7, title: '周六休息日', icon: '🎉', note: '坚持就是胜利！' },
        { date: new Date('2026-03-27T20:00:00'), id: 8, title: '周六休息日', icon: '🎉', note: '快了快了！' },
        { date: new Date('2026-04-03T20:00:00'), id: 9, title: '周六休息日', icon: '🎉', note: '加油加油！' },
        { date: new Date('2026-04-10T20:00:00'), id: 10, title: '周六休息日', icon: '🎉', note: '再坚持一下！' },
        { date: new Date('2026-04-17T20:00:00'), id: 11, title: '周六休息日', icon: '🎉', note: '周末来了！' },
        { date: new Date('2026-04-24T20:00:00'), id: 12, title: '周六休息日', icon: '🎉', note: '休息一下！' },
        { date: new Date('2026-04-30T20:00:00'), id: 13, title: '五一假期', icon: '🌸', note: '劳动节快乐！' },
        { date: new Date('2026-05-08T20:00:00'), id: 14, title: '周六休息日', icon: '🎉', note: '继续努力！' },
        { date: new Date('2026-05-15T20:00:00'), id: 15, title: '周六休息日', icon: '🎉', note: '快到了！' }
    ];
    
    // 按日期排序
    targets.sort((a, b) => a.date - b.date);
    
    // 筛选出未过期的倒计时，最多4个
    const activeTargets = targets.filter(target => target.date > now).slice(0, 4);
    
    // 隐藏所有卡片
    const allCards = document.querySelectorAll('.countdown-card');
    allCards.forEach(card => card.style.display = 'none');
    
    // 显示活跃的卡片
    activeTargets.forEach((target, index) => {
        const card = allCards[index];
        if (card) {
            card.style.display = 'flex';
            
            const timeDiff = target.date - now;
            
            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                document.getElementById(`day${index + 1}`).textContent = String(days).padStart(2, '0');
                document.getElementById(`hour${index + 1}`).textContent = String(hours).padStart(2, '0');
                document.getElementById(`minute${index + 1}`).textContent = String(minutes).padStart(2, '0');
                document.getElementById(`second${index + 1}`).textContent = String(seconds).padStart(2, '0');
                
                const startDate = new Date('2026-01-01T00:00:00');
                const totalTime = target.date - startDate;
                const elapsedTime = now - startDate;
                const progress = Math.min((elapsedTime / totalTime) * 100, 100);
                
                document.getElementById(`progress${index + 1}`).style.width = `${progress}%`;
                document.getElementById(`progress-text${index + 1}`).textContent = `进度 ${progress.toFixed(1)}%`;
                
                card.querySelector('.countdown-title').textContent = target.title;
                card.querySelector('.countdown-icon').textContent = target.icon;
                card.querySelector('.countdown-date').textContent = `${target.date.getFullYear()}年${String(target.date.getMonth() + 1).padStart(2, '0')}月${String(target.date.getDate()).padStart(2, '0')}日 ${String(target.date.getHours()).padStart(2, '0')}:${String(target.date.getMinutes()).padStart(2, '0')}`;
                card.querySelector('.countdown-note').textContent = target.note;
            }
        }
    });
}

// 初始化
function init() {
    updateCurrentTime();
    updateCountdowns();
    
    setInterval(() => {
        updateCurrentTime();
        updateCountdowns();
    }, 1000);
}

window.onload = init;
