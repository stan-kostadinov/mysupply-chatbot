<template>
	<div class="message-container" :class="chatItem.from === 'bot' ? 'left-oriented' : 'right-oriented'">
		<div class="chat-profile-picture">
			<img :src="backgroundImage" alt="" width="32" height="32" />
		</div>

		<div class="chat-message" :class="chatItem.from === 'bot' ? 'left-oriented' : 'right-oriented'">
			{{ chatItem.message }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	props: {
		chatItem: {
            type: Object,
            required: true,
        },
	},
    setup(props) {
        const user = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFaklEQVR4nO1aTWxUVRR+KFKJEG1rZ86ZDlRNF1o1Gk2M7jWiCUp1BejS6AoounEjulOiK/yBaFi4MpO075zXcRQXFqIpivwoJoqVEqOgUTQkJggz95ZnzvuZjszPu/fNa0XDTe7q3XvO/e75P/c5zuXxPx2+O3SdosIjinG7JpxUBN8qgtOK4Fw0TyvGbzSDJ2uUW1jrl3qvdS6F4VeGezThRs3woWLUmtG3mcEewg+0ixuElrPoAKaGrtYEWxXDqfqhCM5rwr2aYJsiHK1y/lZ/otAva4M5UeivTuZvUwyPyRrNuE8xVBv2n9SMW2TtooBQHjykGI/Xb5bgkHbhab+8uteWluyRvZrhcAOg75WLDy6oFBThm/OqAYcVw5pMaPvOErkgTfBlA6Admaubz7m8ZjwY6jX8pQk3+yXnyuwvy1mqCcbEOYTSxgP+eD6XDXE3f4OIOwJxrOrmbu+4fgJu0YzPa8YpRTgrwBXBWUV4QhG+W/MK9yXxrE4O3qEIZiLJzMgZugPBuXwMQjN+Jgbbdq2H1yuG3YpxrqOnIrygGF/qRCumpxk/r4NJK5nAM0XqpAn3+6WBFW3XjudzmvBrK9dLqBThLn9P/pq2dEsDK2IwgZqlsRnF+FasTh0lsc25QhN8YhtDGrzep35pZFlHSVOkZoyv24Fw4eHYsJNsQnnweGoQ8fTguU48qm7hztgBGLtmv1RcLkYaiXNT0npJR7oFogh/SOYDY3V7MVExzfBsHCeSXGzg/xn/7FoijL5fzt1k4Jq/ii54c3LQi9IOExH6FRjIAkR404X7jVWe4GRHqWiGJyLCB5OIBkDKA5AZEA/XJfLznSUN6cz69kAIPopE95QREHG7WQExNGJN8Ex0xkrrQ5VX90paLVms1BZGQKh/pQS4TGzEw5uNeJaKfZI1SxxqWc+IaCOiH5sQrO9j+LFraTDO2aTvmnFfKMXC2uYDEb4aigxesAEiIs5AIkdteCrGF6ML2N4KZTn6+KgVUcI3upcI7LbkORruBa/FxzANkOzVlKCkJ4rwlwxU62eh5RgOqT6jCzjWDIThjwBIqdhnDKRU7MvKa9lUmH4UvxThb62ABPVzpwSuieAu56p6EdSNRAjOWfGtDPdE+85nAkSGdFC6lki7mJAEhKGaiWrJqLl4t1SAXUjjbNXDu2x4+mHRJUB+b2/shoGptRdJAwRHbfn5BCNtjT2OB7buNyBcGe4Rw0vhrX61VeWLgnfZuXgoxtfSBMR4SHFkbxuwNRUvChp8rQNi2hSl0YNpxi8sDPyA1BjpgODetimK1OVhQ8A8aWyiMT5YNI4bk8XBVDxKUdLIWGt7Tk2wxyaNb2YysswYSFppuNJiDWi8336RB09GunsoFRDqX2kMpEN7yaiwItzY2ftYlLpN+zl/ozGQFN1DNd/d+SnR2817Hzhi09+Vg0k30sLY9/tlGDKmP+UslXQ/2r/FNCbMGnUrJLJP5O9RDG+nie5hTxjeqXHu3iQ+mmBrtGfGOPaICMMebesGXZAiEG5qfAbIYB6V3lWrHm/coIvOtCZty/S7uGUadMkZ3mt8acp6KsaaZizJ4YNLq8BA/TWAYIcViIBAqbh8voEM0/LIk9RpzxjQnGLcWbc7gunUz3LSt5J3jcU6vG5rSzgrTxypQNTBuIVVDW8k/waIE+LWuwJRB0OrClauNatJMC1akQmIf/aFcWdWDbkEKVyQ7syCvr2L+1tIu1GMxxXjA87i/fEAY9LGyQ4AnApfi+0Lre4BSbbr4oboF45aisNXg184GNdLPeNcCiNognu4ThG8ImWz/ECjGM40HPpM8FONfCN4WUrqNH9LXB7Of2T8DV39NZg8LeUeAAAAAElFTkSuQmCC"
        const bot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO2XzUoDQQzH9+QrmEzbs+A7eLKX4nv1YUqhB2WTPkALvkO9WK8KemwCI1O2H+6ynZnt7lTBQE7Z5DcJ+S8kyxqY0PWDMLwJw1rmMMpSmTCsldE6F4LXdGDClz2YcZUQbIaHjs0wS2lagJNCOwVbNgMlnArj1w4S6tscgpklcxMNFYL3WGD1AfDhagWDXafnQo98EgxuMt4TY/8M77i9buMWUKvJT/ax37N5r6+EeWy8HkT4rAzLOrAr+GPbI+N1nIomOwNzaQI+sBufK15om2LjzcEtLZf+g/Vyo4alEix8Oq7V426jPTpWr65PyMULj5FT2Rr/8jz5+mfA2tVy/RpwV6ZtgA/XBK4kN/e+7zeEdw7qclq7JmJcGMZJwcWtNbaT26vzwHMYbY+2wFGX7RsvXpY4QnjaOAAAAABJRU5ErkJggg==";
        const backgroundImage = ref(props.chatItem.from === 'bot' ? bot : user)

        return { backgroundImage }
    }
});
</script>

<style lang="scss" scoped>
.message-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 10px;
    .chat-profile-picture {
        display: flex;
        margin: 10px;
    }
    &.right-oriented {
        justify-content: flex-end;
        .chat-profile-picture {
            order: 1;
        }
    }
    .chat-message {
        border: 1px solid orange;
        padding: 10px;
        border-radius: 10px;
        max-width: 50%;
        min-width: 10%;
        position: relative;
        &::before {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 0px;
            height: 0px;
        }
        &.left-oriented {
            &:before {
                left: -20px;
                border-top: 10px solid transparent;
                border-right: 10px solid orange;
                border-bottom: 10px solid transparent;
                border-left: 10px solid transparent;
            }
        }
        &.right-oriented {
            border-color: lightblue;
            background: lightblue;
            text-align: right;
            &::before {
                right: -20px;
                border-top: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-left: 10px solid lightblue;
            }
        }
    }
}
</style>