document.addEventListener('DOMContentLoaded', () => {

    const heading = document.querySelector('.main-heading');
    const words = ['SNAKE', 'PLAY'];
    let currentState = 'SNAKE'; // 初始状态

    // --- 1. 初始化函数：创建单词和字母结构 ---
    function setupWords() {
        words.forEach(wordStr => {
            const wordContainer = document.createElement('div');
            // 初始时只有第一个单词是激活的
            if (wordStr === currentState) {
                wordContainer.classList.add('animate-in');
            } else {
                wordContainer.classList.add('animate-out');
            }
            
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('word');
            wordDiv.dataset.word = wordStr;

            const letters = wordStr.split('');
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                 // 为初始动画设置延迟
                if (wordStr === currentState) {
                   span.style.animationDelay = `${index * 50}ms`;
                }
                wordDiv.appendChild(span);
            });
            wordContainer.appendChild(wordDiv)
            heading.appendChild(wordContainer);
        });
    }

    // --- 2. 动画控制函数 ---
    function animateWords(targetState) {
        if (targetState === currentState) return;

        const currentContainer = heading.querySelector(`[data-word="${currentState}"]`).parentElement;
        const targetContainer = heading.querySelector(`[data-word="${targetState}"]`).parentElement;

        if (!currentContainer || !targetContainer) return;
        
        targetContainer.classList.remove('animate-out');
        targetContainer.classList.add('animate-in');
        staggerAnimation(targetContainer.querySelector('.word'));

        currentContainer.classList.remove('animate-in');
        currentContainer.classList.add('animate-out');
        staggerAnimation(currentContainer.querySelector('.word'));

        currentState = targetState;
    }
    
    // --- 3. 交错动画延迟函数 ---
    function staggerAnimation(wordDiv) {
        const letters = wordDiv.querySelectorAll('span');
        const delayIncrement = 50;
        letters.forEach((span, index) => {
            span.style.animationDelay = `${index * delayIncrement}ms`;
        });
    }

    // --- 4. 鼠标移动事件监听 ---
    window.addEventListener('mousemove', (e) => {
        const mouseYPercentage = e.clientY / window.innerHeight;
        const targetState = (mouseYPercentage < 0.2) ? 'PLAY' : 'SNAKE';
        animateWords(targetState);
    }, { passive: true });

    // --- 5. 页面加载时，初始化单词 ---
    setupWords();
});