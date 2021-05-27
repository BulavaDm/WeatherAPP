<template>
    <div class="item" @click="handleClick(source)">
        <div class="item__content">
            <span class="item__country">{{ country }},</span>
            <span>{{ start }}</span>
            <span class="item__search">{{ searchValue }}</span>
            <span>{{ end }}</span>
        </div>
    </div>
</template>

<script>
import countries from "../../countries.list";

export default {
    name: 'SearchItem',

    props: {
        source: { 
            type: Object,
            required: true
        },
        search: {
            type: String,
            required: true
        },
        handleClick: {
            type: Function,
            required: true
        },
    },

    data() {
        return {
            searchValue: '',
            start: '',
            end: ''
        }
    },

    created() {
        this.formatValue(this.source.name, this.search);
    },

    computed: {
        country() {
            return countries[this.source.country] ? countries[this.source.country] : 'Unknown';
        }
    },

    watch: {
        search: function (val) {
            this.formatValue(this.source.name, val);
        },
    },

    methods: {
        formatValue(name, search) {
            const index = name.toUpperCase().indexOf(search.toUpperCase());
            this.start = name.slice(0, index);
            this.searchValue = name.slice(index, index + search.length);
            this.end = name.slice(index + search.length, name.length);
        }
    }
}
</script>

<style scoped lang="scss">
    .item {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        background: #F8F6F6;
        border-bottom: 2px solid #EDF0F4;

        &__content {
            width: 100%;
            padding: 0 2%;
        }

        &__country {
            margin-right: 4px;
        }

        &__search {
            color: #037631;
        }
    }

    .item:hover {
        cursor: pointer;
    }
</style>