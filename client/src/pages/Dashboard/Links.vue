<script setup>
import { useRouter } from 'vue-router';

import FieldSetBlock from '../../components/FieldSetBlock.vue';
import LabelIconBtn from '../../components/LabelIconBtn.vue';

const router = useRouter();
</script>

<template>
<FieldSetBlock>
    <ul>
        <li class="mb-4">
            <LabelIconBtn label="new" icon="pi pi-plus" @click="router.push({name: 'product'})"></LabelIconBtn>
        </li>
        <li class="mb-4">
            <LabelIconBtn label="collection" icon="pi pi-database" @click="router.push({name: 'collection'})"></LabelIconBtn>
        </li>
        <li>
            <LabelIconBtn label="gallery" icon="pi pi-image" @click="router.push({name: 'gallery'})"></LabelIconBtn>
        </li>
    </ul>
</FieldSetBlock>
</template>

<style lang="scss"></style>