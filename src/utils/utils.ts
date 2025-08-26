/**
 * 随机打乱数组顺序（Fisher-Yates 洗牌算法）
 * @param array 要打乱的数组
 * @returns 打乱后的新数组
 */
export function shuffleArray<T>(array: T[]): T[] {
    // 创建数组副本，避免修改原数组
    const shuffled = [...array];

    // 从最后一个元素开始向前遍历
    for (let i = shuffled.length - 1; i > 0; i--) {
        // 随机选择一个当前元素之前的位置
        const j = Math.floor(Math.random() * (i + 1));

        // 交换当前元素与随机选择的元素
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}