<template>
    <calender-view
        :rangeTips="rangeTips"
        @selected="cb"
        mode="range"
    />
</template>
<script>
import Calendar from '@/widgets/calendar/index.vue';

export default {
    name: 'f_book1_calendar',
    components: {
        [Calendar.name]: Calendar
    },
    computed: {
    },
    data() {
        return {
            rangeTips: ['请选择1', '请选择2']
        };
    },
    methods: {
        cb(result) {
        }
    }
}
</script>
