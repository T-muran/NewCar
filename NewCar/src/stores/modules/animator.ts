import { defineStore } from 'pinia'
import { reactive} from 'vue'

export const anim = defineStore('anim',()=>{
    const animations = reactive({
        isCollapse: true,
    })

    return {
        animations
    }
})