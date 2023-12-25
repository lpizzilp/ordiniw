<!-- src/components/SevenSegmentDisplay.vue -->
<template>
    <div id="app">
        <h1>Seven Segment Display</h1>
        <div class="display">>
            <div class="seven-segment">
                <div v-for="(segment, index) in segments" :key="index" :class="segment ? 'segment-on' : 'segment-off'">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        };
    },
    computed: {
        segments() {
            const segments = {
                0: [1, 1, 1, 1, 1, 1, 0],
                1: [0, 1, 1, 0, 0, 0, 0],
                2: [1, 1, 0, 1, 1, 0, 1],
                3: [1, 1, 1, 1, 0, 0, 1],
                4: [0, 1, 1, 0, 0, 1, 1],
                5: [1, 0, 1, 1, 0, 1, 1],
                6: [1, 0, 1, 1, 1, 1, 1],
                7: [1, 1, 1, 0, 0, 0, 0],
                8: [1, 1, 1, 1, 1, 1, 1],
                9: [1, 1, 1, 1, 0, 1, 1]
            };
            return segments[this.value];
        }
    }
};
</script>

<style scoped>
.display {
  display: flex;
  gap: 20px;
}
.seven-segment {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px;
}

.segment-on {
    background-color: red;
    width: 10px;
    height: 40px;
    margin: 2px;
}

.segment-off {
    background-color: #ccc;
    width: 10px;
    height: 40px;
    margin: 2px;
}
</style>
