<template>
    <div class="card">
        <img src="https://picsum.photos/390/242?random=1">
        <div class="recipe-content">
            <h4>{{ props.title }}</h4>
            <p>{{ props.description }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    description: String
});
</script>

<style scoped>
.card {
    width: 390px;
    height: 475px;
    border-radius: 20;
}

.recipe-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 12px;
    width: 390px;
    height: 233px;
    background: #FFFFFF;
    box-shadow: 0px 15px 30px rgba(224, 224, 236, 0.8);
    border-radius: 0px 0px 20px 20px;
}

h4 {
    font-size: 18px;
    line-height: 27px;
    color: black;
}

p {
    font-size: 16px;
    line-height: 24px;
    color: #6B6262;
}
</style>
