import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            a: 0,
            b: 0,
            op: '+'
        }
    },
    computed: {
        result() {
            switch(this.op) {
                case '+': return this.a + this.b
                case '-': return this.a - this.b
                case '*': return this.a * this.b
                case '/': return this.a / this.b
            }
        }
    }
})

app.mount('#app')
