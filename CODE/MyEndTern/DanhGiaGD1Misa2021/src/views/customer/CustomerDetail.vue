<template>
  <div>
    <!-- Dialog -->
    <div class="dialog" id="dlgCustomerDetail"
         :class="{'dialog-hide': !isShow}"
    >
        <!-- nen den xung quanh -->
        <div class="dialog-model"
            @click="btnCloseOnClick()"
        ></div>
 
        <!-- noi dung -->
        <div class="dialog-content">

            <!-- header -->
            <div class="dialog-header">
                <div class="dialog-title">Thông tin Khách hàng</div>
                <div class="dialog-close-button"
                     @click="btnCloseOnClick()"
                >&#x2715;</div>
            </div>

            <!-- body -->
            <div class="dialog-body">
                <!-- body-tren -->
                <div class="tren">
                    <!-- tren left -->
                    <div class="tren-left">
                        <div class="avatar">

                        </div>
                        <div class="avatar-text">
                            Vui lòng chọn ảnh có định dạng <b>.jpg, .jprg, .png, .gif.</b>
                        </div>
                    </div>
                    <!-- tren mid -->
                    <div class="tren-mid">
                        <form>
                            <div class="form-group">
                              <label for="">Mã khách hàng (*)</label>
                              <input type="text" class="form-control" id="txtCustomerCode"  placeholder=""
                              v-model="customer.CustomerCode" />
                            </div>
                            <div class="form-group">
                              <label for="">Mã thẻ thành viên</label>
                              <input type="text" class="form-control" id="txtMTTV" placeholder=""
                              v-model="customer.MemberCardCode" />
                            </div>
                            <div class="form-group">
                                <label for="">Ngày sinh</label>
                                <input
                                    id="dtDateOfBirth"
                                    class="form-control"
                                    type="date"
                                    v-model="customer.DateOfBirth"
                                />
                              </div>
                          </form>
                    </div>
                    <!-- tren right -->
                    <div class="tren-right">
                        <form>
                            <div class="form-group">
                              <label for="">Họ và tên (*)</label>
                              <input type="text" class="form-control" id="txtFullName"  placeholder=""
                              v-model="customer.FullName" />
                            </div>
                            <div class="form-group">
                                <label>Nhóm khách hàng</label>
                                <select id="cbCustomerGroup" style="height: 28px; width: 80%; position: absolute; bottom: 74px; left: 15px; border: 1px solid rgb(80, 78, 78); border-radius: 4px;"
                                v-model="customer.CustomerGroupId">
                                    <option value="0cb5da7c-59cd-4953-b17e-c9adc9161663">
                                    Nhóm khách hàng MISA
                                    </option>
                                    <option value="19165ed7-212e-21c4-0428-030d4265475f">
                                    Khách VIP
                                    </option>
                                    <option value="3631011e-4559-4ad8-b0ad-cb989f2177da">
                                    Khách vãng lai
                                    </option>
                                    <option value="7a0b757e-41eb-4df6-c6f8-494a84b910f4">
                                    Khách thường
                                    </option>
                                </select>
                            </div>                           
                        </form>
                        <label id="radioBt">Giới tính</label>
                        <div class="radioButton"> <!-- cung name moi chi click duoc 1 cai-->
                            <select id="gender-list" v-model="customer.Gender" style=" border: 1px solid rgb(80, 78, 78); border-radius: 4px; padding-left: 10px; position: absolute; bottom: -4px; left: 4px; width: 90%; height: 27px;">
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                                <option value="2">Không xác định</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- body-duoi -->
                <div class="duoi">
                    <!-- duoi-top -->
                    <div class="duoi-top">
                        <!-- duoi top left -->
                        <div class="dt-left">
                            <form>
                                <div class="form-group">
                                  <label for="">Email</label>
                                  <input type="email" class="form-control" id="txtEmail"  placeholder="example@domain.com"
                                  v-model="customer.Email">
                                </div>
                                <div class="form-group">
                                  <label for="">Tên công ty</label>
                                  <input type="text" class="form-control" id="txtCompany" placeholder=""
                                  v-model="customer.CompanyName">
                                </div>                           
                            </form>
                        </div>
                        <!-- duoi top right -->
                        <div class="dt-right">
                            <form>
                                <div class="form-group">
                                  <label for="">Số điện thoại (*)</label>
                                  <input type="text" class="form-control" id="txtPhoneNumber"  placeholder=""
                                  v-model="customer.PhoneNumber">
                                </div>
                                <div class="form-group">
                                  <label for="">Số tiền nợ</label>
                                  <input type="text" class="form-control" id="txtMST" placeholder=""
                                  v-model="customer.DebitAmount">
                                </div>                           
                            </form>
                        </div>
                    </div>
                    <!-- duoi bot -->
                    <div class="duoi-bot">
                        <div class="form-group">
                            <label for="">Địa chỉ</label>
                            <input type="text" class="form-control" id="txtAddress" placeholder=""
                            v-model="customer.Address">
                          </div> 
                    </div>
                </div>
            </div>
            <!-- footer -->
            <div class="dialog-footer">
                <div class="footer-button">
                    <button id="btnCancel" style="font-weight: bold;"
                    @click="btnCloseOnClick()"
                    >Hủy</button>
                    <button id="btnDelete" style="font-weight: bold;">Xóa</button>
                    <button id="btnSave" style="font-weight: bold;"
                    @click="btnSaveOnClick()"
                    >Lưu</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
import axios from "../../../node_modules/axios";
export default {
  props: {
    isShow: { type: Boolean, default: false },
    customer: { type: Object, default: null },
    formMode: { type: String, default: "add" },
  },
  methods: {
    /**--------------------------------------
     * Gọi đến phương thức ẩn Dialog của cha
     * CreatedBy: NVMANH (31/03/2021)
     */
    btnCloseOnClick() {
      this.$emit("hideDialog");
    },

    btnSaveOnClick() {
      if (this.formMode == "add") {
        axios
          .post("http://api.manhnv.net/api/customers", this.customer)
          .then(() => {
            // console.log(res);
            this.$emit("hideDialog");
          })
          .catch(() => {
            // console.log(res);
          });
      } else {
        axios
          .put(
            "http://api.manhnv.net/api/customers/" + this.customer.CustomerId,
            this.customer
          )
          .then(() => {
            // console.log(res);
            this.$emit("hideDialog");
          })
          .catch(() => {
            // console.log(res);
          });
      }
    },
  },
};
</script>


<style scoped>

/* dialog model */
.dialog-model{
    position: absolute;
    top: -61px;
    left: -201px;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.5;
}

/* dialog content */
.dialog-content{
    position: absolute;
    width: 600px;
    height: 500px;
    border-radius: 5px;
    background-color: whitesmoke;
    top: calc(50% - 25px - 250px);
    left: calc(50% - 100px - 300px);
}

/* header */
.dialog .dialog-content .dialog-header{
    /* display: flex; */
    height: 40px;
    background-color:whitesmoke;
}

.dialog-header .dialog-title{
    font-size: 20px;
    font-weight: bold;
    padding-top: 10px;
    padding-left: 20px;
}

.dialog-header .dialog-close-button{
    width: 35px;
    height: 35px;
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 0 4px 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}
.dialog-header .dialog-close-button:hover{
    cursor: pointer;
    background-color: rgb(209, 209, 209);
}

/* body */
.dialog .dialog-content .dialog-body{
    width: calc(100% - 30px);
    height: calc(100% - 100px);
    background-color: whitesmoke;
    padding-left: 15px;
    padding-right: 15px;
}
    /* body tren */
    .dialog-body .tren{
        display: flex;
        height: 200px;
    }
        /* tren left */
        .dialog-body .tren .tren-left{
            width: 35%;
            height: 100%;
            background-color: whitesmoke;
            display: flex;
            justify-content: center;
            position: relative;
        }
            .tren-left .avatar{
                background-color:whitesmoke;
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin-top: 10px;
                background-image: url("../../assets/img/default-avatar.jpg") ;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
            .tren-left .avatar-text{
                position: absolute;
                bottom: 0px;
                text-align: center;
                font-size: 12px;
            }
            /* tren mid */
        .dialog-body .tren .tren-mid{
            width: 35%;
            height: 100%;
            background-color:  whitesmoke;
            /* display: flex;
            justify-content: center; */
        }
        /* dung form chung cho ca mid vs right ben tren */
            .tren  form{
                margin: 15px;
            }
            .tren  form .form-group{
                padding-bottom: 15px;
            }
            .tren  form .form-group input{
                margin-top: 3px;
                height: 25px;
                border: 1px solid rgb(80, 78, 78);
                border-radius: 4px;
            }
            .tren  form .form-group .form-control{
                width: 95%;
            }
            /* tren right */
        .dialog-body .tren .tren-right{
            
            width: 35%;
            height: 100%;
            background-color:  whitesmoke;
            position: relative;
        }
            
        #radioBt{
            position: absolute;
            left: 15px;
            bottom: 40px;
        }
        .dialog-body .tren .tren-right .radioButton{
           position: absolute;
           left: 10px;
           bottom: 15px;
           display: flex;
           justify-content: space-around;
           width: 90%;
        }
        .dialog-body .tren .tren-right .gender-list{
            height: 27px;
            position: absolute;
            left: 15px;
            bottom: 11px;
            width: 90%;
        }
        input[type="radio"]{
            /* width: 15px;
            height: 15px; */
        }
        input{
            padding-left: 15px;
        }


        /* body duoi */
    .dialog-body .duoi{
        height: 200px;
        width: 100%;
        background-color: whitesmoke;
    }
        /* duoi top */
        .dialog-body .duoi .duoi-top{
            width: 100%;
            height: 130px;
            display: flex;
        }
            /* duoi top left */
            .duoi .duoi-top .dt-left{
                width: 74%;
                height: 100%;
            }
                .duoi-top form{
                    margin-left: 10px;
                    margin-top: 10px;
                    margin-right: 10px;
                }
                .duoi-top input{
                    width: 100%;
                    margin-top: 3px;
                    height: 25px;
                    border: 1px solid rgb(80, 78, 78);
                    border-radius: 4px;
                }
                .duoi-top .dt-right input{
                    width: 95%;;
                }
                .duoi-top form .form-group{
                    padding-bottom: 10px;
                }
                /* duoi top right */
            .duoi .duoi-top .dt-right{
                width: 40%;
                height: 100%;
            }
            /* duoi bot */
        .dialog-body .duoi .duoi-bot{
            padding-left: 10px;
            padding-top: 0px;
        }
            
            .duoi-bot input{
                width: 97%;
                margin-top: 3px;
                height: 25px;
                border: 1px solid rgb(80, 78, 78);
                border-radius: 4px;
            }


/* footer */
.dialog-content  .dialog-footer{
    width: 100%;
    height: 60px;
    background-color:rgb(209, 209, 209);
    display: flex;
    align-items: center;

}
    .dialog-footer .footer-button{
        width: 380px;
        height: 40px;
        background-color: rgb(209, 209, 209);
        position: absolute;
        right: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
        .footer-button button{
            height: 100%;
            width: 23%;
            border: none;
            cursor: pointer;
            transition: 0.5s;
            background-color: rgb(209, 209, 209);
            border-radius: 6px;
            outline: none;
        }
        .footer-button button:hover{
            color: white;
            background-color: rgb(6, 82, 35);
        }

.dialog-hide{
    display: none;
}

</style>