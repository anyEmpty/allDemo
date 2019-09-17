<template>
    <div class="calender" :class="{'calendar-range': mode == 'range','calendar-top':warnTips}">
        <div class="calendar-top-tips" v-if="warnTips" ref="ctip">{{warnTips}}</div>
        <div class="month-list">
            <div
                class="month"
                v-for="month in calendarData"
                :id="month.monthId"
                :key="month.monthId"
            >
                <h1>{{month.title}}</h1>
                <div class="title">
                    <div class="weekend">日</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div class="weekend">6</div>
                </div>
                <div class="day-line" v-for="(week,index) in month.month" :key="index">
                    <div
                        class="day"
                        v-for="day in week"
                        @click="clickHandler(month.monthId, $event)"
                        :key="day.date"
                        :data-text="day.relaxText"
                        :data-date="day.date"
                        :data-disabled="day.disable"
                        :class="{
                            hide:!day.text,
                            disable: day.disable,
                            festival: day.festival,
                            today: day.alias === '今天',
                            selected: selectedTime === day.date || (currentCls && (currentStr[0] ==day.date || currentStr[1] ==day.date)) ,
                            work:day.fillWork, //补班
                            relax:day.relax, // 休假期
                            prepurchase:day.prePurchase, // 预约期
                            'range-from': mode == 'range' && current.length == 2 && currentDateTime[0] == day.dateTime && currentDateTime[0] != currentDateTime[1],
                            'range-day': mode == 'range' && current.length == 2 && currentDateTime[0] < day.dateTime && currentDateTime[1] > day.dateTime && currentDateTime[0] != currentDateTime[1],
                            'range-to': mode == 'range' && current.length == 2 && currentDateTime[1] == day.dateTime && currentDateTime[0] != currentDateTime[1],
                            'border-range-from': borderRangeFrom,
                            'border-range-to': borderRangeTo,
                        }"
                    >
                        <div class="day-bg"></div>
                        <div class="day-item" :data-text="day.relaxText">
                            <p>{{day.alias || day.text}}</p>
                            <p
                                v-if="currentSub.length && currentStr.indexOf(day.date) != -1"
                            >{{currentSub[currentStr.indexOf(day.date)]}}</p>
                            <p v-else-if="subData[day.date]">{{ subData[day.date] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="calendar-tips fixed" v-if="rangeText">{{rangeText}}</div>
    </div>
</template>

<script>
import { getHolidays, getFestival, getWorks } from "./index";

let today = Date.today();
let tomorrow = Date.today().addDays(1);
let afterDay = Date.today().addDays(2);
/**
 * 获取最近三天的名称
 * @param  {Date} date 日期对象
 * @return {string}      日期的名称
 */
function getRecentDay(date) {
    let dayStr = "";
    if (date.getTime() === today.getTime()) {
        dayStr = "今天";
    } else if (date.getTime() === tomorrow.getTime()) {
        dayStr = "明天";
    }
    return dayStr;
}

export default {
    name: "calender-view",
    props: {
        warnTips: {
            type: String,
            default: ""
        },
        startDate: {
            type: Date,
            default: () => Date.today()
        },
        endDate: {
            type: Date,
            default: () => Date.today().addMonths(12)
        },
        selectedDate: Date,
        subData: {
            // 下标数据
            type: Object,
            default: () => ({})
        },
        currentSub: {
            type: Array,
            default: () => []
        },

        fromChangeAny: Boolean, // 去程时间可以选任意时间 不受返程限制
        currentCls: Boolean,
        currentDate: {
            // 已选中时间  [ time1, time2 ]  [ time1 ]  第一个值之前的实际
            type: Array,
            default: () => []
        },
        rangeCurrent: { type: Array },
        mode: {
            type: String,
            default: "rangeFrom" // rangeTo  range
        },
        prePurchaseDate: {
            //火车票新增预购日期
            type: Number,
            default: 0 // rangeTo  range
        },
        /**
         *
         */
        rangeTips: { type: Array },
        /**
         * fliterRangeTime: 连选的时候 选择第二个时间 做校验函数
         */
        fliterRangeTime: {
            type: Function,
            default: (time1, time2) => time2 > time1
        },
        /**
         * 选择的起始日期是否为一个月的最后一天和第二个月的第一天
         */
        borderRangeFrom: {
            type: Boolean,
            default: false
        },
        /**
         * 选择的起始日期是否为一个月的最后一天和第二个月的第一天
         */
        borderRangeTo: {
            type: Boolean,
            default: false
        }
    },
    data() {
        let current = this.formatArrDate(this.currentDate);
        let current2 = this.formatArrDate(this.rangeCurrent || []);
        return {
            current,
            current2,
            calendarData: [],
            selected: ""
        };
    },
    computed: {
        selectedTime() {
            return this.selected && this.selected.format("yyyy-MM-dd");
        },
        currentStr() {
            return this.current.map(item => item && item.format("yyyy-MM-dd"));
        },
        currentDateTime() {
            return this.current.map(item => item && item.getTime());
        },
        rangeText() {
            let text = "";
            if (this.mode === "range" && this.rangeTips) {
                text = this.rangeTips[this.current2.length];
            } else if (this.mode === "rangeFrom" && this.rangeTips) {
                text = this.rangeTips[0];
            } else if (this.mode === "rangeTo" && this.rangeTips) {
                text = this.rangeTips[1];
            }
            return text;
        }
    },
    created() {
        this.calendarData = this.buildCalendar();
        this.selected = this.current[0] || this.selectedDate;
    },
    mounted() {
        if (this.selected) {
            let el = document.getElementById(
                `${this.selected.getFullYear()}${this.selected.getMonth() + 1}`
            );
            if (el) {
                let top = this.warnTips ? this.$refs.ctip.clientHeight : 0;
                window.scrollTo(0, el.offsetTop - top);
            }
        }
    },
    methods: {
        /**
         * 格式化数组中的日期
         */
        formatArrDate(dateList) {
            return dateList.map(item => {
                let item2 =
                    (item &&
                        (typeof item === "string"
                            ? item.replace(/-/g, "/")
                            : item.clearTime())) ||
                    "";
                let itemDate = new Date(item2);
                if (isNaN(itemDate.getTime())) {
                    return null;
                }
                return itemDate;
            });
        },
        /**
         * 构造每个月里的日期数据
         * @param  {timestamp} time 每个月的第一天的timestamp
         * @return {object}      每个月的数据
         */
        buildMonth(time) {
            let monthDate = [];
            let firstDate = new Date(time);
            let beforeDay = new Date(this.selected).addDays(-1); // 已选天的前一天
            let month = firstDate.getMonth();
            let date = new Date(time);
            let topEmpty = date.getDay();
            let dateList = new Array(topEmpty).fill("");
            let lastDate = new Date(this.endDate).addDays(
                -this.prePurchaseDate
            ); // 非预约时期的最后一天

            while (date.getMonth() === month) {
                let dateInfo = {};
                if (dateList.length === 7) {
                    monthDate.push(dateList);
                    dateList = [];
                }
                dateInfo.text = date.getDate();
                dateInfo.dateTime = new Date(date).getTime();
                dateInfo.date = date.format("yyyy-MM-dd");
                dateInfo.relaxText = "";
                // 开始日期之前和结束日期之后的日期置灰
                if (date < this.startDate || date > this.endDate) {
                    dateInfo.disable = true;
                }
                if (this.mode === "rangeTo" && date < beforeDay) {
                    // mode == rangeTo 选择返程日期 不可选择小于已选日期的时间
                    // 返程时间必须大于去程时间
                    dateInfo.disable = true;
                }
                // 节日处理
                let festival = getFestival(date);
                if (festival) {
                    dateInfo.festival = festival;
                    dateInfo.text = festival;
                }
                if (getHolidays(dateInfo.date)) {
                    dateInfo.relax = true;
                    dateInfo.relaxText = "休";
                } else if (getWorks(dateInfo.date)) {
                    dateInfo.fillWork = true;
                    dateInfo.relaxText = "班";
                }
                if (date > lastDate && date <= this.endDate) {
                    //如果是预购日期显示为 “预”
                    dateInfo.prePurchase = true;
                    dateInfo.relaxText = "预";
                }
                // 周末处理
                // dateInfo.weekend = date.getDay()
                // 最近日期处理  今天明天 后天
                let recentDay = getRecentDay(date);
                if (recentDay) {
                    dateInfo.alias = recentDay;
                    dateInfo.festival = undefined;
                }

                dateList.push(dateInfo);
                date.addDays(1);
            }
            if (dateList.length) {
                for (let i = dateList.length; i < 7; i++) {
                    dateList.push("");
                }
                monthDate.push(dateList);
                dateList = null;
            }

            let minShort = firstDate.format("yyyy年MM月");

            return {
                month: monthDate,
                title: minShort,
                monthId: `${firstDate.getFullYear()}${firstDate.getMonth() + 1}`
            };
        },

        /**
         * 构造整个日历的所有数据
         * @param  {timestamp} startTime 起始日期的timestamp
         * @return {Array}           日历的数据
         */
        buildCalendar() {
            let startDate = new Date(this.startDate);
            let calendarData = [];
            let endDate = this.endDate;
            while (startDate <= endDate) {
                calendarData.push(
                    this.buildMonth(startDate.firstDayOfMonth().getTime())
                );
                startDate.addMonths(1);
            }
            return calendarData;
        },
        /**
         * 点击事件处理
         * @param  {event} e 事件对象
         * @return
         */
        clickHandler(monthId, e) {
            if (e.currentTarget.dataset.disabled) return;

            let date = e.currentTarget.dataset.date;
            let $date = new Date(date.replace(/-/g, "/"));
            let $dateTime = $date.getTime();
            let goDate = this.current[0]; // this.$route.params.date;
            let backDate = this.current[1]; // this.$route.params.backDate;
            if (this.mode === "range") {
                let lens = this.current2.length;
                if (lens === 0) {
                    this.current = [$date];
                    this.current2 = [$date];
                    this.selected = $date;
                } else if (lens === 1) {
                    let date1 = this.current2[0].getTime();
                    if ($dateTime < date1) {
                        if (this.fromChangeAny) {
                            this.current = [$date];
                            this.current2 = [$date];
                            this.selected = $date;
                        }
                    } else {
                        if (!this.fliterRangeTime(date1, $dateTime)) {
                            return;
                        }
                        this.current2.push($date);
                        this.current = this.current2;
                        this.current2 = this.current2;
                    }
                }
                if (this.current2.length === 2) {
                    this.$emit("selected", {
                        current: [...this.current2]
                    });
                }
                return;
            }

            if (
                this.mode === "rangeTo" &&
                goDate &&
                $dateTime < goDate.getTime()
            ) {
                // 返程
                this.$alert({
                    message: `${this.$t(
                        "tips.returnDateEarlier"
                    )} ${goDate.format("yyyy-MM-dd")}`
                });
                return;
            } else if (
                !this.fromChangeAny &&
                this.mode === "rangeFrom" &&
                backDate &&
                $dateTime > backDate.getTime()
            ) {
                this.$alert({
                    message: `${this.$t(
                        "tips.departureDateLater"
                    )} ${backDate.format("yyyy-MM-dd")}`
                });
                return;
            }
            this.selected = $date;
            let current = [...this.current];
            if (this.mode === "rangeTo") {
                current[1] = this.selected;
            } else if (this.mode === "rangeFrom") {
                current[0] = this.selected;
            }
            this.current = current;

            this.$emit("selected", {
                date,
                current: [...this.current]
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
