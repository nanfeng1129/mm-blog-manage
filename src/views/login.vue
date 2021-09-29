<template>
    <div class="login">
        <div class="login-canvas"><canvas></canvas></div>
        登录页
    </div>
</template>
<script>
/* eslint-disable */
import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return {
        }
    },
    mounted(){
        document.addEventListener('touchmove', function(e) {
            e.preventDefault()
        })

        var c = document.getElementsByTagName('canvas')[0],
        pr = window.devicePixelRatio || 1,
        w = window.screen.width,
        h = window.screen.height,
        //f = 90,
        f = 120,
        q,
        r = 0,
        u = Math.PI * 1.5,
        v = Math.cos,
        z = Math.random

        var x = c.getContext('2d');
        c.width = w * pr
        c.height = h * pr
        x.scale(pr, pr)
        x.globalAlpha = 0.6

        function i() {
        x.clearRect(0, 0, w, h)
        q = [{ x: 0, y: h * .9 + f }, { x: 0, y: h * .3 - f }]
        while (q[1].x < w + f) d(q[0], q[1])
        }

        function d(i, j) {
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        //var k = j.x + (z() * 2 - 0.25) * f,
        var k = j.x + (z() * 2.3 - 0.3) * f,
            n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r -= u / -50
        x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = { x: k, y: n }
        }

        function y(p) {
        //var t = p + (z() * 2 - 1.1) * f
        var t = p + (z() * 3 - 1.7) * f
        return (t > h || t < 0) ? y(p) : t
        }

        document.onclick = i
        document.ontouchstart = i
        i()
    },
    methods:{
        
    }
})
</script>
<style lang="less" scoped>
.login{
    &-canvas{
        position: fixed;
        width: 100%;
        height: 100%;
    }
}
</style>
