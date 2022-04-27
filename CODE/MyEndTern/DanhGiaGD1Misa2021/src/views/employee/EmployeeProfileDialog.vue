<template>
    <div>
     

            <!-- dialog information customer -->
    <div class="infor-card"
         :class="{'dialog-hide': !isShowProfile}">

        <div class="off-around-card"
         @click="btnCloseProfile()"
        ></div>

        <div class="card-main">
            <div class="card-header">
                <div class="card-header-title">INFORMATION EMPLOYEE</div>
            </div>
            <div class="card-body">
                <div class="card-avatar"></div>
                <div class="card-text">
                    <h2 class="card-name">NGUYỄN VĂN MẠNH</h2>
                    <h3 class="card-team">KHỐI SẢN XUẤT</h3>
                    <p class="basic-infor">0987654321</p>
                    <p class="basic-infor">nguyenvanmanh@misa.com</p>
                    <p class="quote-infor">"The greatest glory in living lies not in never falling, but in rising every time we fall." - Nelson Mandela</p>
                    <p class="time-infor">From 8/2015</p>
                </div>
            </div>
            <div class="card-close"
                @click="btnCloseProfile()"
            >CLOSE</div>
        </div>
    </div>

    </div>
</template>

<script>
export default {
    props: {
        isShowProfile: {type: Boolean, default: false},
    },
    methods: {
        btnCloseProfile(){
            this.$emit("hideProfile");
        },
    }
}
</script>



<style scoped>

    .dialog-hide{
        display: none;
    }

    .infor-card{
        position: relative;
        z-index: 2;
        height: 100vh;
        width: 100%;
        top: -100vh;
        left: 0;
    }

    .off-around-card{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        opacity: 0.8;
    }
    .card-main{
        position: absolute;
        width: 350px;
        height: 600px;
        background-color: whitesmoke;
        top: calc(50% - 300px);
        left: calc(50% - 175px);
    }
        .card-main .card-header{
            height: 50px;
            width: 100%;
            background-color: aquamarine;
            display: flex;
            align-items: center;
            letter-spacing: 5px;
            justify-content: space-around;
            font-weight: bold;
            font-size: 17px;
        }
        .card-main .card-body{
            height: calc(100% - 100px);
            width: 100%;
            position: relative;
            
        }
            .card-body .card-avatar{
                margin-top: 10px;
                width: 250px;
                height: 240px;
                border-radius: 10px;
                position: absolute;
                left: 50px;
                background-image: url("../../assets/img/img_avatar.png");
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            .card-body .card-text{
                width: 100%;
                height: 240px;
                position: absolute;
                bottom: 0px;
                text-align: center;
            }
                .card-text .card-name{
                    letter-spacing: 3px;
                }
                .card-text .card-team{
                    letter-spacing: 3px;
                }
                .card-text .basic-infor{
                    font-size: 15px;
                }
                .card-text .quote-infor{
                    font-style: italic;
                    margin-left: 10px;
                    margin-right: 10px;
                }
                .card-text .time-infor{
                    letter-spacing: 3px;
                    font-weight: bold;
                }
        .card-main .card-close{
            height: 50px;
            width: 100%;
            background-color: aquamarine;
            display: flex;
            align-items: center;
            letter-spacing: 5px;
            justify-content: space-around;
            font-weight: bold;
            font-size: 17px;
        }
        .card-main .card-close:hover{
            cursor: pointer;
            background-color: #01B075;
        }
</style>