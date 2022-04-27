<template>
    <div>
        <!-- header -->
        <div id="header">
            <!-- <div class="header-list">
                <p>Nhà hàng Biển Đông</p>
                <i class='bx bxs-chevron-down'></i>
            </div> -->

            <select class="header-list" style="outline: none; border-radius: 4px; padding-left: 10px;">
                <option value="NHBD" selected>Nhà hàng Biển Đông</option>
                <option value="NHBT">Nhà hàng Biển Tây</option>
                <option value="NHBN">Nhà hàng Biển Nam</option>
                <option value="NHBB">Nhà hàng Biển Bắc</option>
            </select>
        

            <div class="header-profile" id="btn-showProfile"
                @click="btnShowProfile()"
            >
                <div class="avatar"></div>
                <div class="name">Nguyễn Văn Mạnh</div>
                <div class="more"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div>
            </div>

        </div>

        <CustomerProfile 
            :isShowProfile="isShowDialogProfile"
            @hideProfile="hideProfile"
        />

    </div>
</template>


<script>
    import CustomerProfile from "../../views/customer/CustomerProfileDialog.vue";

export default {
    components: {
        CustomerProfile,
    },
     
    props: [],

    data() {
        return {
            isShowDialogProfile: false,
        };
    },

    methods: {
        btnShowProfile(){
            console.log("show profile")
            this.isShowDialogProfile = true;
        },

        hideProfile(){
            this.isShowDialogProfile = false;
        }

    },
    

    
}
</script>





<style scoped>
#header{
    position: absolute;
    left: 200px;
    right: 0px;
    height: 60px;
    top: 0px;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    border-left: 1px solid #adadad;
}

#header .header-list{
    height: 40px;
    width: 250px;
    border: 1px solid #BBBBBB;
    border-radius: 4px;
    background-color: white;
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 15px;
}
#header .header-list:hover{
    cursor: pointer;
}
    .header-list p{
        margin-left: 20px;
    }
    .header-list i{
        margin-left: 90px ;
        color: black;
    }

#header .header-profile{
    height: 30px;
    width: 205px;
    background-color: white;
    display: flex;
    align-items: center;
    /* margin-left: 860px; */
    position: absolute;
    right: 10px;
    /* border: 1px solid #0d4a0d; */
    border-radius: 5px;
}

#header .header-profile:hover{
    cursor: pointer;
}
    .header-profile .avatar{
        width: 30px;
        height: 30px;
        background-image: url("../../assets/icon/avatar-default.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        /* border: 1px solid rgb(17, 107, 65); */
        border-radius: 50%;
    }
    .header-profile .name{
        width: 150px;
        margin-left: 15px;
        font-weight: bold;
        color: rgb(75, 68, 68);
    }
    .header-profile .name:hover{
        color: #000;
        font-weight: bold;
    }
    .header-profile .more{
        width: 20px;
        height: 20px;
        /* background-image: url("../../content/icon/option.png"); */
        /* background-repeat: no-repeat; */
        /* background-position: center; */
        /* background-size: contain; */
        margin-left: 0px;
        padding-right: 12px;
        font-size: 20px;
        color: rgb(75, 68, 68);
        transition: 1s;
    }
    .header-profile .more:hover{
        color: #000;
        font-weight: bold;
        transform: rotate(360deg);
    }
    

</style>