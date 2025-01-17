<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'

const props = defineProps({
    id: String,
    title: String,
    show: Boolean
})
const emit = defineEmits(['onClose'])

const elmRef = ref(null)
const modalBS = ref(null)

onMounted(() => {
    modalBS.value = new bootstrap.Modal(elmRef.value)

    elmRef.value.addEventListener('hidden.bs.modal', event => {
        onClose()
    })

    if (props.show) {
        onShow()
    }
})

watch(
  () => props.show,
  (newValue) => {
    if (newValue == true) {
      onShow()
    } else {
      onHide()
    }
  }
)

function onClose() {
    emit('onClose')
}

function onShow() {
    modalBS.value.show()
}
function onHide() {
    modalBS.value.toggle()
}
</script>

<template>
<div class="modal" tabindex="-1" ref="elmRef">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content _border shadow-lg">
      <div class="modal-header">
        <h5 class="modal-title">{{ title || '' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</div>
</template>
