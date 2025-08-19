<script setup lang="ts">
import { ref } from 'vue';

interface SportType {
    icon: string;
    name: string;
    id: number;
}

// 运动类型列表
const sportTypes = ref<SportType[]>([
    { icon: 'basketball', name: '篮球', id: 1 },
    { icon: 'badminton', name: '羽毛球', id: 2 },
    { icon: 'footerball', name: '足球', id: 3 },
    { icon: 'billiards', name: '台球', id: 4 },
    { icon: 'pingpong', name: '乒乓球', id: 5 }
]);

// 当前选中的运动类型
const selectedSport = ref<number>(1);

// 日期相关
const today = new Date();
const currentDate = ref<Date>(today);
const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六',];
const dates = ref<number[]>([]);

// 初始化日期数据
const initDates = (startDate: Date = new Date()) => {
    const currentDay = startDate.getDate();
    dates.value = Array.from({ length: 7 }, (_, i) => currentDay + i);
};

initDates();

// 切换运动类型
const handleSportSelect = (sportId: number) => {
    selectedSport.value = sportId;
};

// 选择日期
const handleDateSelect = (date: number, index: number) => {
    const newDate = new Date(today);
    newDate.setDate(date);
    currentDate.value = newDate;
};

// 切换日期范围
const handleDateRangeChange = (direction: 'prev' | 'next') => {
    const firstDate = new Date(today);
    firstDate.setDate(dates.value[0]);

    if (direction === 'prev') {
        firstDate.setDate(firstDate.getDate() - 7);
    } else {
        firstDate.setDate(firstDate.getDate() + 7);
    }

    initDates(firstDate);
};
</script>

<template>
    <div class="calendar-container">
        <!-- 运动类型选择 -->
        <div class="sport-types">
            <div v-for="sport in sportTypes" :key="sport.id" class="sport-item"
                :class="{ active: selectedSport === sport.id }" @click="handleSportSelect(sport.id)">
                <span class="sport-icon" :class="[sport.icon]"></span>
                <span class="sport-name">{{ sport.name }}</span>
            </div>
        </div>

        <!-- 日期选择 -->
        <div class="date-wrapper">
            <div class="arrow left" @click="handleDateRangeChange('prev')">
                <van-icon name="arrow-left" />
            </div>

            <div class="date-section">
                <div v-for="(date, index) in dates" :key="index" class="date-item"
                    :class="{ active: currentDate.getDate() === date }" @click="handleDateSelect(date, index)">
                    <div class="weekday">{{ weekDays[index] }}</div>
                    <div class="date">{{ date }}</div>
                </div>
            </div>

            <div class="arrow right" @click="handleDateRangeChange('next')">
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/mixin.less');

.calendar-container {
    background: #fff;
    border-radius: 16px 16px 0 0;
    padding: 16px 16px 0;

    .sport-types {
        display: flex;
        justify-content: space-between;

        &::-webkit-scrollbar {
            display: none;
        }

        .sport-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            white-space: nowrap;

            .sport-icon {
                width: 18px;
                height: 18px;
                margin-right: 4px;

                // font-size: 24px;
                &.badminton {
                    background: url('@/assets/icons/icon-badminton.png') no-repeat center;
                    background-size: cover;
                }

                &.basketball {
                    background: url('@/assets/icons/icon-basketball.png') no-repeat center;
                    background-size: cover;
                }

                &.billiards {
                    background: url('@/assets/icons/icon-billiards.png') no-repeat center;
                    background-size: cover;
                }


                &.footerball {
                    background: url('@/assets/icons/icon-footerball.png') no-repeat center;
                    background-size: cover;
                }

                &.pingpong {
                    background: url('@/assets/icons/icon-pingpong.png') no-repeat center;
                    background-size: cover;
                }
            }

            .sport-name {
                font-size: 12px;
                font-weight: 500;
                color: #000;
            }
        }
    }

    .date-wrapper {
        display: flex;
        align-items: center;
        margin-top: 16px;
        border-top: 1px solid #E3E5EB;
        padding-top: 14px;
        padding-bottom: 24px;
        .arrow {
            cursor: pointer;
            color: #666;
            
        }
    }

    .date-section {
        flex: 1;
        display: flex;
        // gap: 24px;
        justify-content: space-between;
        margin:0 4px;
        .date-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            cursor: pointer;
            width: 30px;

            &.active {
                .date {
                    color: #fff;
                    border-radius: 50%;
                    background: linear-gradient(270deg, #FF6D23 0%, #FF8B51 74.52%, #FF9560 100%);
                }
            }

            .weekday {
                font-size: 14px;
                color: #A6A6A6;
            }

            .date {
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                color: #000;
            }
        }
    }
}
</style>