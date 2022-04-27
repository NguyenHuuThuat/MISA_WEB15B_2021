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
                <div class="dialog-title">THÔNG TIN NHÂN VIÊN</div>
                <div class="dialog-close-button"
                     @click="btnCloseOnClick()"
                >&#x2715;</div>
            </div>

            <!-- body -->
            <div class="dialog-body">
                <div class="dialog-body-left">
                    <div class="dbl-avatar">
                        
                    </div>
                    <div class="dbl-text">
                        (Vui lòng chọn anh có định dạng <strong>.jpg,</strong>
                        <strong>.jpeg,</strong> <strong>.png,</strong>
                        <strong>.gif.</strong>)
                    </div>
                </div>
                <div class="dialog-body-right">
                    <div class="dbr-top">
                        <div class="dbr-head">
                            <div class="dbr-head-text">
                                A. THÔNG TIN CHUNG
                            </div>
                            <div class="dbr-head-line"></div>
                        </div>
                        <div class="dbr-top-duoi">
                            <div class="dbr-td-left">
                                <div class="form-group"
                                 :class="{'invalid': !isValidCode}"
                                >
                                    <label for="">Mã nhân viên <span style="color: red;">(*)</span></label>
                                    <input type="text" class="form-control" id="txtEmployeeCode"  placeholder=""
                                    v-model="employee.EmployeeCode"
                                    @blur="checkCode"
                                    @focus="isValidCode = true" 
                                    ref="first"
                                     />
                                     <p v-if="errorCode.length" style="color: red; font-size: 12px; margin-top: 2px;">
                                         {{errorCode[0]}}
                                     </p>
                                </div>
                                <div class="form-group">
                                    <label for="">Ngày sinh</label>
                                    <input type="date" class="form-control" id="txtEmployeeDob"  placeholder=""
                                    v-model="employee.DateOfBirth" 
                                     />
                                </div>
                                <div class="form-group"
                                 :class="{'invalid': !isValidCCCD}"
                                >
                                    <label for="">Số CMTND / Căn cước <span style="color: red;">(*)</span></label>
                                    <input type="text" class="form-control" id="txtEmployeeCCCD"  placeholder=""
                                    v-model="employee.IdentityNumber" 
                                    @blur="checkCCCD"
                                    @focus="isValidCCCD = true"
                                     />
                                     <p v-if="errorCCCD.length" style="color: red; font-size: 12px; margin-top: 2px;">
                                         {{errorCCCD[0]}}
                                     </p>
                                </div>
                                <div class="form-group">
                                    <label for="">Nơi cấp</label>
                                    <input type="text" class="form-control" id="txtEmployeeCCCDPlace"  placeholder=""
                                    v-model="employee.IdentityPlace"
                                     />
                                </div>
                                <div class="form-group"
                                 :class="{'invalid': !isValidEmail}"
                                >
                                    <label for="">Email <span style="color: red;">(*)</span></label>
                                    <input type="email" class="form-control" id="txtEmail"  placeholder="example@mail.mail"
                                    v-model="employee.Email" 
                                    @blur="checkEmail"                                 
                                    @focus="isValidEmail = true"
                                     />
                                     <p v-if="errorEmail.length" style="color: red; font-size: 12px; margin-top: 2px;"
                                        novalidate = "true">
                                         {{errorEmail[0]}}
                                         {{errorEmail[1]}}
                                     </p>
                                </div>
                            </div>
                            <div class="dbr-td-right">
                                <div class="form-group"
                                 :class="{'invalid': !isValidName}" 
                                >
                                    <label for="">Họ và tên <span style="color: red;">(*)</span></label>
                                    <input type="text" class="form-control" id="txtFullName"  placeholder=""
                                    v-model="employee.FullName" 
                                    @blur="checkName"
                                    @focus="isValidName = true"
                                     />
                                     <p v-if="errorName.length" style="color: red; font-size: 12px; margin-top: 2px;">
                                         {{errorName[0]}}
                                     </p>
                                </div>
                                <div class="form-group">
                                    <label for="">Giới tính</label>
                                    <div class="radioButton"> <!-- cung name moi chi click duoc 1 cai-->
                                        <select id="gender-list"  style="width: 100%; height: 30px; border: 1px solid #bbbbbb; border-radius: 4px; padding-left: 16px; "
                                        v-model="employee.Gender"
                                        >
                                            <option value="1">Nam</option>
                                            <option value="0">Nữ</option>
                                            <option value="2">Không xác định</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Ngày cấp</label>
                                    <input type="date" class="form-control" id="txtCCCDDate"  placeholder=""
                                    v-model="employee.IdentityDate" 
                                     />
                                </div>
                                <div class="form-group" style="margin-top: 70px;"
                                 :class="{'invalid': !isValidSDT}"
                                >
                                    <label for="">Số điện thoại <span style="color: red;">(*)</span></label>
                                    <input type="text" class="form-control" id="txtPhoneNumber"  placeholder=""
                                    v-model="employee.PhoneNumber" 
                                    @blur="checkSDT"
                                    @focus="isValidSDT = true"
                                     />
                                     <p v-if="errorSDT.length" style="color: red; font-size: 12px; margin-top: 2px;">
                                         {{errorSDT[0]}}
                                     </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dbr-bot">
                        <div class="dbr-head">
                            <div class="dbr-head-text">
                                B. THÔNG TIN CÔNG VIỆC
                            </div>
                            <div class="dbr-head-line"></div>
                        </div>
                        <div class="dbr-bot-duoi">
                            <div class="dbr-bd-left">
                                <div class="form-group">
                                    <label for="">Vị trí</label>
                                    <div class="radioButton"> <!-- cung name moi chi click duoc 1 cai-->
                                        <select id="gender-list" style="width: 100%; height: 30px; border: 1px solid #bbbbbb; border-radius: 4px; padding-left: 16px; "
                                        v-model="employee.PositionId"
                                        >
                                            <option value="3700cc49-55b5-69ea-4929-a2925c0f334d">
                                                Giám đốc
                                            </option>
                                            <option value="148ed882-32b8-218e-9c20-39c2f00615e8">
                                                Nhân viên Marketing
                                            </option>
                                            <option value="25c6c36e-1668-7d10-6e09-bf1378b8dc91">
                                                Thu ngân
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Mã số thuế cá nhân</label>
                                    <input type="text" class="form-control" id="txtMST"  placeholder=""
                                    v-model="employee.PersonalTaxCode" 
                                     />
                                </div>
                                <div class="form-group">
                                    <label for="">Ngày gia nhập công ty</label>
                                    <input type="date" class="form-control" id="txtStartDate"  placeholder=""
                                    v-model="employee.JoinDate" 
                                     />
                                </div>
                            </div>
                            <div class="dbr-bd-right">
                                <div class="form-group">
                                    <label for="">Phòng ban</label>
                                    <div class="radioButton"> <!-- cung name moi chi click duoc 1 cai-->
                                        <select id="gender-list" style="width: 100%; height: 30px; border: 1px solid #bbbbbb; border-radius: 4px; padding-left: 16px; "
                                        v-model="employee.DepartmentId"
                                        >
                                            <option value="469b3ece-744a-45d5-957d-e8c757976496">
                                                Phòng Nhân sự
                                            </option>
                                            <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c">
                                                Phòng Công nghệ
                                            </option>
                                            <option value="17120d02-6ab5-3e43-18cb-66948daf6128">
                                                Phòng đào tạo
                                            </option>
                                            <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">
                                                Phòng Marketting
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Mức lương cơ bản</label>
                                    <input type="text" class="form-control" id="txtSalary"  placeholder="VNĐ"
                                    v-model="employee.Salary" 
                                     />
                                </div>
                                <div class="form-group">
                                    <label for="">Tình trạng công việc</label>
                                    <div class="radioButton"> <!-- cung name moi chi click duoc 1 cai-->
                                        <select id="gender-list" style="width: 100%; height: 30px; border: 1px solid #bbbbbb; border-radius: 4px; padding-left: 16px; "
                                        v-model="employee.WorkStatus"
                                        >
                                            <option value="1">Đang làm việc</option>
                                            <option value="2">Đang thử việc</option>
                                            <option value="0">Đã nghỉ việc</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
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
                    <button id="btnSave" style="font-weight: bold;"
                    @click="btnSaveOnClick()"
                    
                    >
                    <i class="fa fa-floppy-o" aria-hidden="true" style="margin-right: 5px;"></i>
                    Lưu</button>
                </div>
            </div>
        </div>
    </div>

    <md-dialog-alert
      :md-active.sync="showAlert"
      :md-content="contentAlert"
      @keydown.esc="showAlert = false"
    />

  </div>
</template>


<script>
import axios from "../../../node_modules/axios";

export default {

  props: {
    isShow: { type: Boolean, default: false },
    employee: { type: Object, default: null },
    formMode: { type: String, default: "add" },
  },

  data() {
      return{
        //validate
        errorCode: [],
        errorCCCD: [],
        errorName: [],
        errorSDT: [],
        errorEmail: [],

        isValidCode: true,
        isValidCCCD: true,
        isValidEmail: true,
        isValidName: true,
        isValidSDT: true,


        //alert
        showAlert: false,
        contentAlert: "",

      };
  },


  watch: {
    isShow()
    {
        this.$nextTick(function () {
          this.$refs.first.focus();
        })
    }
  },

  methods: {

      announce(contentAnnouce) {
        this.contentAlert = contentAnnouce;
        this.showAlert = true;
      },
      
      //cac ham check validate
      checkCode: function (e) {
          this.errorCode = [];
          if(!this.employee.EmployeeCode){
              this.isValidCode = false;
              this.errorCode.push('Mã nhân viên không được bỏ trống!');
          }
          e.preventDefault();
      },
      checkCCCD: function(e){
          this.errorCCCD = [];
          if(!this.employee.IdentityNumber){
              this.isValidCCCD = false;
              this.errorCCCD.push('CCCD không được bỏ trống !');
          }
          e.preventDefault();
      },
      checkName: function (e) {
          this.errorName = [];
          if(!this.employee.FullName){
              this.isValidName = false;
              this.errorName.push('Họ và tên không được bỏ trống !');
          }
          e.preventDefault();
      },
      checkSDT: function (e) {
          this.errorSDT = [];
          if(!this.employee.PhoneNumber){
              this.isValidSDT = false;
              this.errorSDT.push('Số điện thoại không được bỏ trống!');
          }
          e.preventDefault();
      },
      validEmail: function (email) {
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      },
      checkEmail: function(e){
          this.errorEmail = [];
          if(!this.employee.Email){
              this.isValidEmail = false;
              this.errorEmail.push('Email không được bỏ trống !');
          }
          if(!this.validEmail(this.employee.Email)){
              this.isValidEmail = false;
              this.errorEmail.push('Email chưa đúng định dạng');
          } else {
              this.errorEmail.push('');
          }
          e.preventDefault();
      },

      //ham reset lai dialog khi them moi, hoac sua nhan vien moi se khong bi dinh validate cu
      defaultValidate(){
        //validate
        this.errorCode= [];
        this.errorCCCD= [];
        this.errorName= [];
        this.errorSDT=[];
        this.errorEmail= [];

        this.isValidCode= true;
        this.isValidCCCD= true;
        this.isValidEmail= true;
        this.isValidName= true;
        this.isValidSDT= true;

      },

    /**--------------------------------------
     * dong dialog
     */
    btnCloseOnClick() {

        this.defaultValidate();

      this.$emit("hideDialog");
    },

    //kiem tra validate truoc khi bam nut save
    checkValidBeforeSave(){
        if(this.isValidCode){
            this.isValidCode = false;
        }
        if(this.isValidCCCD){
            this.isValidCCCD = false;
        }
        if(this.isValidEmail){
            this.isValidEmail = false;
        }
        if(this.isValidName){
            this.isValidName = false;
        }
        if(this.isValidSDT){
            this.isValidSDT = false;
        }
    },

    //click nut save: luu moi hoac sua
    btnSaveOnClick() {

      this.checkValidBeforeSave();
      
      if (this.formMode == "add") {
        axios
          .post("http://api.manhnv.net/v1/employees", this.employee)
          .then(() => {
            // console.log(res);
            this.$emit("hideDialog");
            this.announce('Thêm thành công !');
          })
          .catch(() => {
            // console.log(res);
            // alert('Thêm thất bại')
            this.announce('Thêm thất bại');
          });
      } else {
        axios
          .put(
            "http://api.manhnv.net/v1/employees/" + this.employee.EmployeeId,
            // "http://localhost:3000/employees" + this.employee.id,
            this.employee
          )
          .then(() => {
            // console.log(res);
            this.$emit("hideDialog");
            this.announce('Sửa thành công !');
          })
          .catch(() => {
            // console.log(res);
            this.announce('Sửa thất bại !');
          });
      }
    },



  },//end methods

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
    height: 700px;
    border-radius: 5px;
    background-color: whitesmoke;
    top: calc(50% - 25px - 350px);
    left: calc(50% - 100px - 300px);
    border: 2px solid #e5e5e5;
    border-radius: 7px;
}

/* header */
.dialog .dialog-content .dialog-header{
    /* display: flex; */
    height: 40px;
    background-color:whitesmoke;
}

.dialog-header .dialog-title{
    font-size: 18px;
    font-weight: bold;
    padding-top: 15px;
    padding-left: 10px;
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
    height: 600px;
    width: 100%;
    display: flex;
}
    .dialog-body .dialog-body-left{
        height: 100%;
        width: 30%;
        
    }
        .dialog-body-left .dbl-avatar{
            width: 90%;
            height: 155px;
            border: 1px solid #e5e5e5;
            border-radius: 50%;
            margin-left: 5%;
            margin-right: 5%;
            margin-top: 20px;
            background-image: url("../../assets/img/default-avatar.jpg");
            background-position: center;
            background-size: contain;
        }
        .dialog-body-left .dbl-text{
            width: 90%;
            margin: 5%;
            text-align: center;
            font-size: 13px;
        }
    .dialog-body .dialog-body-right{
        height: 100%;  
        width: 70%;
    }
        .dbr-top{
            height: 60%;
        }
        .dbr-bot{
            height: 40%;
        }
            .dbr-head{
                height: 40px;
                margin-left: 5px;
            }
                .dbr-head-text{
                    padding-top: 5px;
                }
                .dbr-head-line{
                    height: 8px;
                    width: 20%;
                    background-color: #0d8b2c;
                    margin-top: 5px;
                }
            .dbr-top-duoi{
                width: 100%;
                
                display: flex;
            }
                .dbr-td-left{
                    width: 50%;
                }
                .dbr-td-right{
                    width: 48%;
                }
            .dbr-bot-duoi{
                width: 100%;
                
                display: flex;
            }
                .dbr-bd-left{
                    width: 50%;
                }
                .dbr-bd-right{
                    width: 48%;
                }
        


    .form-group{
        margin:5px 5px 10px 5px;
        
        
    }
    .form-group label{
        font-size: 13px;
    }
    .form-group input{
        height: 30px;
        width: 100%;
        border: 1px solid #bbbbbb;
        border-radius: 4px;
        padding-left: 16px;
    }
    .form-group input:hover{
        border: 1px solid #0d8b2c;
    }





/* footer */
.dialog-content  .dialog-footer{
    width: 100%;
    height: 60px;
    background-color:#e5e5e5;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
}
    .dialog-footer .footer-button{
        width: 230px;
        height: 40px;
        background-color: #e5e5e5;
        position: absolute;
        right: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
        .footer-button button{
            height: 100%;
            width: 100px;
            border: none;
            cursor: pointer;
            transition: 0.5s;
            background-color: #e5e5e5;
            border-radius: 6px;
            outline: none;
        }
        .footer-button button:hover{
            color: white;
            background-color: #016019;
        }

.dialog-hide{
    display: none;
}


.invalid {
    position: relative;
}
.invalid input{
    border-color: red;
}
/* .invalid::after{
    content: "Vui lòng nhập trường này";
    position: absolute;
    left: 0;
    top: 100%;
    width: 150px;
    height: 13px;
    color: red;
    font-size: 10px;
} */


</style>