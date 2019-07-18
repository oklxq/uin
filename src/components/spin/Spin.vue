<template>
    <svg class="u-spin" :width="size" :height="size">
        <circle cx="50%" cy="50%" r="30%" fill="transparent"></circle>
    </svg>
</template>

<script>
    export default {
        name: "Spin",
        props: {
            size: {
                type: String,
                default: '30',
            },
            color: {
                type: String,
                default:
                    '#000'
            }
        }
    }
</script>
