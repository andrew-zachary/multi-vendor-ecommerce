<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

import APIClient from "../../utils/apiClient.js";

import IconBtn from "../IconBtn.vue";
import SolidBtn from "../SolidBtn.vue";
import InputText from "../InputText.vue";

import useProductStore from "../../stores/product.js";

const { item } = defineProps(['item']);

const toast = useToast();
const productStore = useProductStore();

const apiClient = new APIClient(`products/images/${item._id}`);

const editMode = ref(false);
const descriptionInput = ref(item.description);

const toggle = () => {

    editMode.value = !editMode.value;
};

const submit = async () => {

    const res = await apiClient.patch({description: descriptionInput.value}, {withLoadingScreen: true});
    toast.add({ severity: 'success', summary: 'success', detail: 'Image was updated', life: 3000});
    productStore.productImageUpdated(res.data);
    toggle();
};
</script>
<template>
    <div>
        <div v-show="!editMode" class="flex justify-between">
            <p class="text-4xl">
                <span v-show="item.description.length > 0">{{ item.description }}</span>
                <span v-show="!item.description.length > 0" class="capitalize">image description ...</span>
            </p>
            <p class="left-right-margin-1">
                <IconBtn size="small" icon="pi pi-file-edit" @click="toggle" />
            </p>
        </div>
        <div v-show="editMode">
            <InputText name="description" id="description" label="description" :value="item.description" @input-change="(e) => descriptionInput = e.target.value" />
            <p>
                <SolidBtn type="button" label="update" size="small" @click="submit" class="mb-4" />
                <SolidBtn type="button" label="cancel" size="small" @click="toggle" />
            </p>
        </div>
    </div>
</template>