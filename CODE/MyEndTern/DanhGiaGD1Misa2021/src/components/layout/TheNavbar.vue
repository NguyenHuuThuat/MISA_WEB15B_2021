<template>

    <!--NavBar-->
    <div id="navbar">
        <!-- logo-box -->
        <div class="logo-box">
            <div class="sidebar"></div>
            <div class="logo"></div>
        </div>

        <!-- navbar-list -->
        <div class="navbar-box">
            <div class="nav-item">
                <div class="nav-icon icon1"></div>
                <div class="nav-text">Tổng quan</div>
            </div>
        </div>
        
        <router-link class="navbar-box" to="/report" style="text-decoration: none;">
            <div class="nav-item">
                <div class="nav-icon icon2"></div>
                <div class="nav-text">Báo cáo</div>
            </div>
        </router-link>

        <div class="navbar-box">
            <div class="nav-item">
                <div class="nav-icon icon3"></div>
                <div class="nav-text">Mua hàng</div>
            </div>
        </div>


        <router-link class="navbar-box" to="/customer" style="text-decoration: none;">
            <div class="nav-item" style="">
                <div class="nav-icon icon4"></div>
                <div class="nav-text">Danh mục khách hàng</div>
            </div>
        </router-link>

        <router-link class="navbar-box" to="/employee" style="text-decoration: none;">
            <div class="nav-item">
                <div class="nav-icon icon5"></div>
                <div class="nav-text">Danh mục nhân viên</div>
            </div>
        </router-link>

        <div class="navbar-box">
            <div class="nav-item">
                <div class="nav-icon icon6"></div>
                <div class="nav-text">Thiết lập hệ thống</div>
            </div>
        </div>
        <a :href="'https://dongvuvd7.github.io/Login-RegristerF8/loginForm.html'" target="_blank" style="text-decoration:none">
            <div class="navbar-box">
                <div class="nav-item">
                    <div class="nav-icon icon7"></div>
                    <div class="nav-text">Đăng xuất</div>
                </div>
            </div>
        </a>
    </div>
</template>
<style scoped>
#navbar {
    width: 200px;
    height: 100vh;
    background-color: whitesmoke;
    text-decoration: none;
}

/* logo-box */
.logo-box{
    display: flex;
    height: 60px;
    width: 100%;
    background-color: whitesmoke;

}

    .logo-box .sidebar{
        width: 40px;
        height: 60px;
        background-image: url("../../assets/img/toggle.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 25px;
        transition: 0.5s;
    }
    .logo-box .sidebar:hover{
        cursor: pointer;
        background-color:rgb(223, 223, 223);
    }

    .logo-box .logo{
        width: calc(100% - 75px);
        height: 60px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 120px;
        background-image: url("../../assets/cukcuk-logo.png");
    }
    .logo-box .logo:hover{
        cursor: pointer;
    }

/* nav-bar list */
.navbar-box .nav-item {
    display: flex;
    height: 45px;
    width: 100%;
    background-color:whitesmoke;
    align-items: center;
    transition: 0.5s;
    color: rgb(83, 78, 78);
}
.navbar-box .nav-item:hover{
    cursor: pointer;
    background-color: rgb(230, 230, 230);
    color: black;
    font-weight: bold;
}


    .nav-item .nav-icon{
        width: 20px;
        height: 20px;
        margin-left: 10px;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .nav-item .nav-text{
        margin-left: 10px;
    }

        .nav-icon.icon1{
            background-image: url("../../assets/icon/all.png");
        }
        .nav-icon.icon2{
            background-image: url("../../assets/icon/report.png");
        }
        .nav-icon.icon3{
            background-image: url("../../assets/icon/buy.png");
        }
        .nav-icon.icon4{
            background-image: url("../../assets/icon/customer.png");
        }
        .nav-icon.icon5{
            background-image: url("../../assets/icon/employee.png");
        }
        .nav-icon.icon6{
            background-image: url("../../assets/icon/settings.png");
        }
        .nav-icon.icon7{
            background-image: url("../../assets/icon/logout.png");
        }



</style>