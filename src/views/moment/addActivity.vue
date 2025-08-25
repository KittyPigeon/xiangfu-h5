<template>
  <div class="activity-container">
    <!-- <nav-bar></nav-bar> -->
    <div class="activity-form">
      <!-- 封面上传 -->
      <van-uploader
        v-model="coverFileList"
        :max-count="1"
        :before-read="beforeReadCover"
        upload-text="上传活动封面图"
        preview-size="100"
        class="cover-upload"
      >
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
          <van-field
            v-model="form.title"
            name="title"
            label="添加标题"
            placeholder="请输入标题"
            required
            :rules="[{ required: true, message: '请输入活动标题' }]"
          />

          <!-- 组织者活动 -->
          <van-field
            v-model="form.organizer"
            name="organizer"
            label="组织者活动"
            placeholder="请选择"
            required
          >
          </van-field>

          <!-- 活动地点 -->
          <van-field
            v-model="form.location"
            name="location"
            label="活动地点"
            placeholder="请选择"
            required
          >
          </van-field>

          <!-- 场地号 -->
          <van-field
            v-model="form.venueNo"
            name="venueNo"
            label="场地号"
            placeholder="请输入场地号"
            required
            :rules="[{ required: true, message: '请输入场地号' }]"
          />

          <!-- 活动日期（可多选） -->
          <van-field
            v-model="form.activityDates"
            name="activityDates"
            label="活动日期 (可多选)"
            placeholder="请选择"
            required
            @click="showDatePopup = true"
          >
            <template #button>
              <van-button size="mini" type="primary">选择</van-button>
            </template>
          </van-field>
          <van-popup v-model:show="showDatePopup" position="bottom">
            <van-calendar
              v-model:show="showDatePopup"
              type="multiple"
              :formatter="formatter"
              @confirm="dates => handleDateConfirm(dates)"
              @cancel="showDatePopup = false"
              multiple
            />
          </van-popup>

          <!-- 活动开始时间 -->
          <van-field
            v-model="form.startTime"
            name="startTime"
            label="活动开始时间"
            placeholder="请选择"
            required
            @click="showTimePopup = true"
          >
            <template #button>
              <van-button size="mini" type="primary">选择</van-button>
            </template>
          </van-field>
          <van-popup v-model:show="showTimePopup" position="bottom">
            <van-date-picker
              v-model="currentDate"
              title="选择日期"
              :min-date="minDate"
              :max-date="maxDate"
              @cancel="showTimePopup = false"
              @confirm="showTimePopup = false"
            />
            <van-time-picker
              v-model="currentTime"
              @confirm="val => handleTimeConfirm(val, 'startTime')"
              @cancel="showTimePopup = false"
            />
          </van-popup>

          <!-- 活动结束时间 -->
          <van-field
            v-model="form.endTime"
            name="endTime"
            label="活动结束时间"
            placeholder="请选择"
            required
            @click="showEndTimePopup = true"
          >
            <template #button>
              <van-button size="mini" type="primary">选择</van-button>
            </template>
          </van-field>
          <van-popup v-model:show="showEndTimePopup" position="bottom">
            <van-date-picker
              v-model="currentDate"
              title="选择日期"
              :min-date="minDate"
              :max-date="maxDate"
              @cancel="showEndTimePopup = false"
              @confirm="handleEndDateConfirm"
            />
          </van-popup>
        </div>

        <!-- 操作按钮 -->
        <div class="form-buttons">
          <van-button
            size="mini"
            type="default"
            class="btn-save"
            @click="saveDraft"
            >存草稿</van-button
          >
          <van-button
            size="mini"
            type="primary"
            class="btn-submit"
            native-type="submit"
            >发布</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { createGroupActivity } from "@/api/group-activity";
import { showToast } from "vant";
import { uploadFileApi } from "@/api/common";
import to from "await-to-js";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

// hooks
const router = useRouter();

// 表单数据
const form = reactive({
  title: "",
  organizer: "",
  location: "",
  venueNo: "",
  activityDates: "",
  startTime: "",
  endTime: "",
  coverImage: ""
});
const formatter = day => {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();

  if (month === 5) {
    if (date === 1) {
      day.topInfo = "劳动节";
    } else if (date === 4) {
      day.topInfo = "青年节";
    } else if (date === 11) {
      day.text = "今天";
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
  uploadFileApi({
    file: file
  }).then((res: any) => {
    console.log("ers", res);
    form.coverImage = res.fileUrl;
  });
  return true;
};
const afterReadCover = (file: File) => {
  console.log("file", file);
};

// 选择器数据
const organizerOptions = ref<any[]>([
  "组织者选项1",
  "组织者选项2",
  "组织者选项3"
]);
const locationOptions = ref<any[]>(["地点A", "地点B", "地点C"]);
const showOrganizerPopup = ref(false);
const showLocationPopup = ref(false);

// 日期选择
const currentDate = ref<any>(["2021", "01", "01"]);
const showDatePopup = ref(false);
const getMaxDate = computed(
  () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
); // 未来7天
const dateFormatter = (date: any) => ({
  className:
    date.date.getDay() === 0 || date.date.getDay() === 6 ? "weekend" : ""
});

// 时间选择
const currentTime = ref<any>([]);
const currentEndTime = ref<any>([]);
const showTimePopup = ref(false);
const showEndTimePopup = ref(false);
const currentYear = new Date().getFullYear();

const minDate = ref(new Date(currentYear, 0, 1));
const maxDate = ref(new Date(2099, 0, 1));
// 方法：选择器确认
const handlePickerConfirm = (val: string, type: "organizer" | "location") => {
  form[type] = val;
  if (type === "organizer") showOrganizerPopup.value = false;
  if (type === "location") showLocationPopup.value = false;
};

// 方法：日期确认（多选）
const handleDateConfirm = (dates: any[]) => {
  console.log("dates", dates);
  form.activityDates = dates.map(d => formatDate(d)).join("、");
  showDatePopup.value = false;
};

// 方法：时间确认
const handleTimeConfirm = (val: Date, type: "startTime" | "endTime") => {
  form[type] = formatTime(val);
  if (type === "startTime") showTimePopup.value = false;
  if (type === "endTime") showEndTimePopup.value = false;
};

// 方法：提交表单
const handleSubmit = async () => {
  const [err, res] = await to<any, any>(
    createGroupActivity({
      title: form.title,
      organizer: form.organizer,
      activityType: "运动",
      coverImage: form.coverImage,
      price: 50,
      tags: '["篮球","运动","健身"]',
      venueName: form.venueNo,
      address: form.location,
      longitude: 116.397428,
      latitude: 39.90923,
      startTime: dayjs(form.startTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: dayjs(form.endTime).format("YYYY-MM-DD 23:59:59"),
      description: "周末篮球约战，欢迎篮球爱好者参加！",
      //   images: '["https://example.com/img1.jpg","https://example.com/img2.jpg"]',
      maxParticipants: 10
      //   signupFee: 20,
      //   signupDeadline: "",
      //   allowWaitlist: true,
      //   maxWaitlist: 5,
      //   contactInfo: "微信：zhangsan123",
      //   requirements: "请自带运动装备和水",
      //   endTimeAfterStartTime: true,
      //   signupDeadlineBeforeStartTime: true,
      //   maxWaitlistValidWhenAllowWaitlist: true
    })
  );
  if (err) {
    showToast(err.message);
    return;
  }
  showToast("创建活动成功");
  setTimeout(() => {
    router.back();
  }, 500);
  // 可在此处调用接口提交数据
};

// 方法：存草稿
const saveDraft = () => {
  console.log("保存草稿：", form);
  router.go(-1)
  // 可在此处实现草稿保存逻辑
};

// 工具函数：格式化日期
const formatDate = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

// 工具函数：格式化时间
const formatTime = (date: any) => {
  return (
    currentDate.value.join("-") + " " + date.selectedValues.join(":") + ":00"
  );
};

const handleEndDateConfirm = val => {
  console.log("val", val);
  showEndTimePopup.value = false;
  form.endTime = val.selectedValues.join("-");
};
</script>

<style scoped lang="less">
// :deep(:root) {
//     --van-calendar-range-edge-background: #FF6D23;
// }

.activity-container {
  background: linear-gradient(
    180deg,
    rgba(255, 109, 35, 0.5) 11.54%,
    rgba(255, 109, 35, 0) 100%
  );
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
  color: #ff6d23;
}

:deep(.van-field__label) {
  width: 144px;
}
:deep(.van-button--mini) {
  background: #ff6d23;
  color: #fff;
  border: none;
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
  background: #ff6d23;
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
    background: #fff6f2;
    border-radius: 8px;
    color: #ff6d23;
    font-size: 18px;
  }

  .btn-submit {
    flex: 1;
    background: linear-gradient(253.43deg, #ff6d23 0%, #ffa375 100%);
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
