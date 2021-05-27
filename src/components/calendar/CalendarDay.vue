<template>
    <div class="day" @click="$emit('click', dateTime)">
        <div class="day__week">{{ day }}</div>
        <div class="day__date" :class="{ 'is-selected': isSelected }">{{ date }}</div>
    </div>
</template>

<script>
import { getDate, getDayName } from '../../services/dateTime'

export default {
    name: "CalendarDay",

    props: {
        dateTime: {
            type: Number,
            required: true
        },

        isSelected: {
            type: Boolean,
            required: true
        }
    },

    computed: {
        day() {
            return getDayName(this.dateTime, 'short');
        },

        date() {
            return getDate(this.dateTime);
        },
    }
}
</script>

<style scoped lang="scss">
    .day {
        width: 100%;
        margin: 0px 4px;
        font-size: 16px;

        &:hover {
            cursor: pointer;
        }

        @media screen and (max-width: 600px) {
            font-size: 10px;
        }

        &__week {
            background: linear-gradient(180deg, #AA0101 21.35%, rgba(250, 18, 18, 0.51) 98.96%);
            border-radius: 4px 4px 0px 0px;
            padding: 2px;
            margin-bottom: 2px;
            text-align: center;
            font-size: 1em;
            color: #FFF;
        }

        &__date {
            background: #FFFFFF;
            border-radius: 0px 0px 4px 4px;
            text-align: center;
            padding: 2px;
            color: #000;
            font-size: 1.6em;
            transition: background-color 0.25s;
        }

        .is-selected {
            background: #F5ECEC;
        }
    }
</style>