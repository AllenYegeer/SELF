<template>
    <div>
        <div class="author">
            <!-- 头像 -->
            <img src=" " alt="">
            <span>作者</span>
        </div>
        <div class="achieve">
            <span>
                关注量
                <span>12</span>
            </span>
            <span>
                粉丝量
                <span>12</span>
            </span>
            <span>
                作品量
                <span>12</span>
            </span>
        </div>
        <button class="concern">关注</button>
    </div>
</template>

<script>

</script>

<style>
    .author img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        vertical-align: middle;
    }
    .achieve{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }
    .achieve > span{
        display: inline-flex;
        flex-direction: column;
        align-items: center;
    }
    .concern{
        display: block;
        padding: 5px 30px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        margin: 5px auto;
        cursor: pointer;
    }
</style>