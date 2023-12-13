import {createVNode,render} from 'vue'
import loadingBar from '../components/loadingBar.vue'

const Bar = createVNode(loadingBar)
render(Bar,document.body)

export default Bar