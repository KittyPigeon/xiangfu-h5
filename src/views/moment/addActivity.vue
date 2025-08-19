<template>

    <div class="activity-container">
        <nav-bar></nav-bar>
        <div class="activity-form">
            <!-- 封面上传 -->
            <van-uploader v-model="coverFileList" :max-count="1" :before-read="beforeReadCover" upload-text="上传活动封面图"
                preview-size="100" class="cover-upload">
                <template #default>
                    <div class="cover-placeholder">
                        <van-icon name="plus" class="cover-plus" />
                        <p class="cover-text">上传活动封面图</p>
                    </div>
                </template>
            </van-uploader>

            <!-- 表单区域 -->
            <van-form @submit="handleSubmit">
                <div class="form-content">
                    <!-- 标题 -->
                    <van-field v-model="form.title" name="title" label="添加标题" placeholder="请输入标题" required
                        :rules="[{ required: true, message: '请输入活动标题' }]" />

                    <!-- 组织者活动 -->
                    <van-field v-model="form.organizer" name="organizer" label="组织者活动" placeholder="请选择" required>
                    </van-field>


                    <!-- 活动地点 -->
                    <van-field v-model="form.location" name="location" label="活动地点" placeholder="请选择" required>
                    </van-field>

                    <!-- 场地号 -->
                    <van-field v-model="form.venueNo" name="venueNo" label="场地号" placeholder="请输入场地号" required
                        :rules="[{ required: true, message: '请输入场地号' }]" />

                    <!-- 活动日期（可多选） -->
                    <van-field v-model="form.activityDates" name="activityDates" label="活动日期 (可多选)" placeholder="请选择"
                        required @click="showDatePopup = true">
                        <template #button>
                            <van-button size="mini" type="primary">选择</van-button>
                        </template>
                    </van-field>
                    <van-popup v-model:show="showDatePopup" position="bottom">
                        <van-calendar v-model:show="showDatePopup" type="multiple" :formatter="formatter"
                            @confirm="(dates) => handleDateConfirm(dates)" @cancel="showDatePopup = false" multiple />
                    </van-popup>

                    <!-- 活动开始时间 -->
                    <van-field v-model="form.startTime" name="startTime" label="活动开始时间" placeholder="请选择" required
                        @click="showTimePopup = true">
                        <template #button>
                            <van-button size="mini" type="primary">选择</van-button>
                        </template>
                    </van-field>
                    <van-popup v-model:show="showTimePopup" position="bottom">
                        <van-date-picker v-model="currentDate" title="选择日期" :min-date="minDate" :max-date="maxDate"
                            @confirm="showTimePopup = false" />
                        <van-time-picker v-model="currentTime" @confirm="(val) => handleTimeConfirm(val, 'startTime')"
                            @cancel="showTimePopup = false" />
                    </van-popup>

                    <!-- 活动结束时间 -->
                    <van-field v-model="form.endTime" name="endTime" label="活动结束时间" placeholder="请选择" required
                        @click="showEndTimePopup = true">
                        <template #button>
                            <van-button size="mini" type="primary">选择</van-button>
                        </template>
                    </van-field>
                    <van-popup v-model:show="showEndTimePopup" position="bottom">
                        <van-date-picker v-model="currentDate" title="选择日期" :min-date="minDate" :max-date="maxDate"
                            @confirm="handleEndDateConfirm" />
                    </van-popup>

                </div>

                <!-- 操作按钮 -->
                <div class="form-buttons">
                    <van-button size="mini" type="info" class="btn-save" @click="saveDraft">存草稿</van-button>
                    <van-button size="mini" type="primary" class="btn-submit" native-type="submit">发布</van-button>
                </div>
            </van-form>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

import type { PickerColumn } from 'vant';

// 表单数据
const form = reactive({
    title: '',
    organizer: '',
    location: '',
    venueNo: '',
    activityDates: '',
    startTime: '',
    endTime: '',
});
const formatter = (day) => {
    const month = day.date.getMonth() + 1;
    const date = day.date.getDate();

    if (month === 5) {
        if (date === 1) {
            day.topInfo = '劳动节';
        } else if (date === 4) {
            day.topInfo = '青年节';
        } else if (date === 11) {
            day.text = '今天';
        }
    }

    //   if (day.type === 'start') {
    //     day.bottomInfo = '入住';
    //   } else if (day.type === 'end') {
    //     day.bottomInfo = '离店';
    //   }

    return day;
};
// 上传封面
const coverFileList = ref<any[]>([]);
const beforeReadCover = (file: File) => {
    // 可在此处限制文件大小、格式等
    console.log('上传封面：', file);
    return true;
};

// 选择器数据
const organizerOptions = ref<any[]>(['组织者选项1', '组织者选项2', '组织者选项3']);
const locationOptions = ref<any[]>(['地点A', '地点B', '地点C']);
const showOrganizerPopup = ref(false);
const showLocationPopup = ref(false);

// 日期选择
const currentDate = ref<any>(['2021', '01', '01']);
const showDatePopup = ref(false);
const getMaxDate = computed(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // 未来7天
const dateFormatter = (date: any) => ({
    className: date.date.getDay() === 0 || date.date.getDay() === 6 ? 'weekend' : '',
});

// 时间选择
const currentTime = ref<any>([]);
const currentEndTime = ref<any>([]);
const showTimePopup = ref(false);
const showEndTimePopup = ref(false);
const minDate = ref(new Date(2020, 0, 1))
const maxDate = ref(new Date(2099, 0, 1))
// 方法：选择器确认
const handlePickerConfirm = (val: string, type: 'organizer' | 'location') => {
    form[type] = val;
    if (type === 'organizer') showOrganizerPopup.value = false;
    if (type === 'location') showLocationPopup.value = false;
};

// 方法：日期确认（多选）
const handleDateConfirm = (dates: any[]) => {
    console.log('dates',dates)
    form.activityDates = dates.map((d) => formatDate(d)).join('、');
    showDatePopup.value = false;
};

// 方法：时间确认
const handleTimeConfirm = (val: Date, type: 'startTime' | 'endTime') => {
    form[type] = formatTime(val);
    if (type === 'startTime') showTimePopup.value = false;
    if (type === 'endTime') showEndTimePopup.value = false;
};

// 方法：提交表单
const handleSubmit = () => {
    console.log('提交表单：', form);
    // 可在此处调用接口提交数据
};

// 方法：存草稿
const saveDraft = () => {
    console.log('保存草稿：', form);
    // 可在此处实现草稿保存逻辑
};

// 工具函数：格式化日期
const formatDate = (date: Date) => {
    return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        date.getDate().toString().padStart(2, '0')
    );
};

// 工具函数：格式化时间
const formatTime = (date: any) => {
    return (
        currentDate.value.join("-") + ' ' +
        date.selectedValues.join(":")
    );
};

const handleEndDateConfirm = (val) => {
    console.log('val', val)
    showEndTimePopup.value = false;
    form.endTime = val.selectedValues.join('-')
}
</script>

<style scoped lang="less">
// :deep(:root) {
//     --van-calendar-range-edge-background: #FF6D23;
// }

.activity-container {
    background: linear-gradient(180deg, rgba(255, 109, 35, 0.5) 11.54%, rgba(255, 109, 35, 0) 100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

}

:deep(.van-nav-bar) {
    background: transparent;

}

:deep(.van-hairline--bottom:after) {
    border: none;
}

:deep(.van-field__label--required:before) {
    color: #FF6D23;
}

:deep(.van-field__label) {
    width: 144px;
}
:deep(.van-button--mini){
    background: #FF6D23;
    color:#fff;
    border:none;
}
// :deep(.van-calendar__day--start) {
//     background: #FF6D23;
// }

// :deep(.van-calendar__day--end, .van-calendar__day--start, .van-calendar__day--start-end, .van-calendar__day--multiple-middle, .van-calendar__day--multiple-selected) {
//     background: #FF6D23;
// }

// :deep(.van-calendar__day--end, .van-calendar__day--start, .van-calendar__day--start-end, .van-calendar__day--multiple-middle, .van-calendar__day--multiple-selected) {
//     background: #FF6D23;
// }

:deep(.van-calendar__confirm.van-button--primary) {
    background: #FF6D23;
    color: #fff;
    border: none;
}

.activity-form {
    /* position: absolute;
    bottom: 0;
    left: 0;
    right: 0; */
    flex: 1;
    margin-top: 59px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    border-radius: 12px 12px 0 0;
    padding: 16px;
    /* height: 688px; */
}

/* 封面上传 */
.cover-upload {
    background: #f5f5f5;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    display: block;
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cover-plus {
    font-size: 24px;
    color: #999;
    margin-bottom: 8px;
}

.cover-text {
    color: #999;
}

/* 表单样式 */
.van-form {
    background: #fff;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    flex: 1;

    .form-content {
        flex: 1;
    }
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    /* justify-content: flex-end; */
    gap: 12px;
    margin-top: 12px;

    .btn-save {
        width: 88px;
        height: 44px;
        background: #FFF6F2;
        border-radius: 8px;
        color: #FF6D23;
        font-size: 18px;
    }

    .btn-submit {
        flex: 1;
        background: linear-gradient(253.43deg, #FF6D23 0%, #FFA375 100%);
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        border: none;
        height: 44px;
        border-radius: 8px;
    }
}

/* 日期格式化 */
.weekend {
    color: #ff0000;
}
</style>