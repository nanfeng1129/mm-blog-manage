<template>
    <router-view />
</template>
<style lang="less">
*{
    padding: 0;
    margin: 0;
}
html{
    overflow: hidden;
}
html:hover{
    overflow: overlay;
}
html::-webkit-scrollbar{
    width: 7px;
    height: 7px;
}
html::-webkit-scrollbar-button{
    display: none;
}
html::-webkit-scrollbar-thumb{
    background: slategrey;
    border-radius: 3px;
}
html::-webkit-scrollbar-track{
    background: #fff;
    border-radius: 3px;
}
html::-webkit-scrollbar-corner{
    background: #fff;
}
</style>
