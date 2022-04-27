<template>
  <div>
    <!-- pretop -->
        <div class="pretop">
            <div class="pretop-text">Danh sách nhân viên</div>
            <div class="pretop-button" id = "btnAdd"
                 @click="btnAddOnClick()"
            >
                <div class="icon-add"></div>
                <div class="text-add">Thêm nhân viên</div>
            </div>
        </div>

        <!-- top -->
        <div class="top">
            <div class="top-search">
                <button id="btn-search" type="submit"><i class="fa fa-search"></i></button>
                <input type="text" placeholder="Tìm kiếm theo Mã, Tên khác" name="search"
                  v-model.trim="phoneNumberOrEmployeeCodeOrFullName"
                  @input="filtersAll()">
            </div>
            <select class="top-sort-list" style="outline: none; border-radius: 4px; padding-left: 10px; width: 120px; font-size: 13px; margin-left: 5px;"
              v-model="sortChoose"
              @change="sortsBy()">
                <option value="">Sắp sếp</option>
                <option v-for="itemSort in listItemSorts"
                        v-bind:key="itemSort.id"
                        v-bind:value="itemSort.id">{{itemSort.text}}</option>
            </select>

            <!-- phong ban -->
            <select class="top-sort-list" style="outline: none; border-radius: 4px; padding-left: 10px; width: 100px; font-size: 13px; margin-left: 2px;"
              v-model="deparChoose"
              @change="filterByDepar()">
                <option value="">Phòng ban</option>
                <option v-for="itemDepar in listItemDepars"
                        v-bind:key="itemDepar.id"
                        v-bind:value="itemDepar.id">{{itemDepar.text}}</option>
            </select>
            <!-- vi tri -->
            <select class="top-sort-list" style="outline: none; border-radius: 4px; padding-left: 5px; width: 100px; font-size: 13px; margin-left: 2px; "
              v-model="posChoose"
              @change="filterByPos()">
                <option value="">Vị trí</option>
                <option v-for="itemPos in listItemPoss"
                        v-bind:key="itemPos.id"
                        v-bind:value="itemPos.id">{{itemPos.text}}</option>
            </select>
            
            <div class="btn-delete"
              @click="deleteEmployeeRecord">Xóa nhân viên</div>
            <div id="btn-refresh" class="top-refresh"
             @click="setUpAllDefault"><i class="fa fa-refresh" aria-hidden="true"></i></div>
        </div>

        <!-- mid -->
        <div class="mid">
            <div class="grid">
                <table id="tblListCustomer" border="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Chức vụ</th>
                            <th>Phòng ban</th>
                            <th>Mức lương cơ bản</th>
                            <th>Tình trạng công việc</th>
                        </tr>
                    </thead>
                    <tbody style="font-size: 13px;">
                        <tr
                          v-for="employee in employeeForDisplay"
                          :key="employee.EmployeeId"
                          @dblclick="trOnDblClick(employee.EmployeeId)"
                          @click="choseEmployeeToDelete(employee.EmployeeId)"
                          :class="{
                            'selected-employee-record':
                              employee.EmployeeId == idOfDeletedEmployee,
                          }"
                        >
                          <td>{{ employee.EmployeeCode }}</td>
                          <td>{{ employee.FullName }}</td>
                          <td>{{ formatGender(employee.Gender) }}</td>
                          <td>{{ formatDateDDMMYYYY(employee.DateOfBirth) }}</td>
                          <td>{{ employee.PhoneNumber }}</td>
                          <td>{{ employee.Email }}</td>
                          <td>{{ formatPosition(employee.PositionId) }}</td>
                          <td>{{ formatDepartment(employee.DepartmentId) }}</td>
                          <td style="text-align: right;">{{ formatMoney(employee.Salary) }}</td>
                          <td>{{ formatWorkStatus(employee.WorkStatus)}}</td>
                          
                        </tr>
                        
                        
                    </tbody>
                </table>
            </div>
        </div>

        <!-- bot -->
        <div class="bot">
            <div class="bot-left">Hiển thị 1-10/1000 Khách hàng</div>
            <div class="bot-mid">
                <div class="bm-left">
                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div class="bm-mid">
                    <div class="bm-mid-box">1</div>
                    <div class="bm-mid-box">2</div>
                    <div class="bm-mid-box">3</div>
                    <div class="bm-mid-box">4</div>
                </div>
                <div class="bm-right">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </div>
            </div>
            <div class="bot-right">10 Khách hàng/trang</div>
        </div>

    <!-- dialog alert -->
    <md-dialog-alert
      :md-active.sync="showAlert"
      :md-content="contentAlert"
      @keydown.esc="showAlert = false"
    />

    <!-- dialog confirm -->
    <md-dialog-confirm
      :md-active.sync="showConfirm"
      md-title="Xác nhận"
      md-content="Bạn muốn xóa nhân viên này ?"
      md-confirm-text="Xác nhận"
      md-cancel-text="Hủy"
      @md-cancel="disagreeDelete"
      @md-confirm="agreeDelete"
    />

    <!-- dialog them, sua -->
    <EmployeeDetail
      :isShow="isShowDialogDetail"
      :employee="selectedEmployee"
      :formMode="dialogFormMode"
      @hideDialog="hideDialog"
    />

  </div>
</template>


<script>
import EmployeeDetail from "./EmployeeDetail";
import axios from "axios";
export default {
  components: {
    EmployeeDetail,
  },
  created() {
    // load dữ liệu cho trang
    axios
      .get("http://api.manhnv.net/v1/employees")
      .then((res) => {
        console.log(res);
        this.employees = res.data;
        this.employeeForExcute = res.data;
        this.loadDataToDisplay();
      })
      .catch((res) => {
        console.log(res);
      });
  },

  props: [],

  methods: {

      // load du lieu de hien thi mac dinh
      loadData(){
          axios
      .get("http://api.manhnv.net/v1/employees")
      .then((res) => {
        console.log(res);
        this.employees = res.data;
        this.employeeForExcute = res.data;
        this.loadDataToDisplay();
      })
      .catch((res) => {
        console.log(res);
      });
      },
      // load data tu excute den display de hien thi
      loadDataToDisplay(){
        this.employeeForDisplay = [];
        for(var i=0; i<this.employeeForExcute.length; i++){
          this.employeeForDisplay.push(this.employeeForExcute[i]);
        }
      },

    /**--------------------------------------
     * click hien thi dialog them, sua
     */
    btnAddOnClick() {
      //auto +1 ma nhan vien
      var nextEmployeeCode = this.employees[0].EmployeeCode.toString().split("-");
      nextEmployeeCode = 1 + parseInt(nextEmployeeCode[1]);
      for(var i=1; ; i++){
        if(Math.floor(nextEmployeeCode / Math.pow(10, i)) == 0){
          i = 6-i;
          for(var j=1; j<=i; j++){
            nextEmployeeCode = "0" + nextEmployeeCode;
          }
          break;
        }
      }

      this.dialogFormMode = "add";

      this.selectedEmployee = {};
      this.selectedEmployee.EmployeeCode = "NV-" + nextEmployeeCode;
      this.isShowDialogDetail = true;

    },
    /**--------------------------------------
     *  an dialog them, sua
     */
    hideDialog() {
      this.isShowDialogDetail = false;
      this.loadData();
    },

    //format dinh dang date de hien thi va truyen lai cho dialog
    formatForInputDate(date){
      if(date == '' || date == null) return '';
      var d = new Date(date);
      return (
        d.getFullYear() + "-"
        + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + "-"
        + (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate())
      );
    },

    //double click de sua thong tin
    trOnDblClick(id) {
      // Lấy id của bản ghi được chọn:

      // Gọi Api lấy thông tin của khách hàng:
      axios
        .get("http://api.manhnv.net/v1/employees/" + id)
        .then((res) => {
          res.data.DateOfBirth = this.formatForInputDate(res.data.DateOfBirth);
          res.data.IdentityDate = this.formatForInputDate(res.data.IdentityDate);
          res.data.JoinDate = this.formatForInputDate(res.data.JoinDate);
          this.selectedEmployee = res.data;
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
      // Thực hiện bindding dữ liệu lên form chi tiết:
      // Cập nhật trạng thái form:
      this.dialogFormMode = "edit";
      // Hiển thị Dialog chi tiết:
      this.isShowDialogDetail = true;
    },

    //lay id nhan vien de xoa
    choseEmployeeToDelete(employeeCodeChosen){
        if (
            this.idOfDeletedEmployee == null || this.idOfDeletedEmployee != employeeCodeChosen
        ) {
            this.idOfDeletedEmployee = employeeCodeChosen;
        } else {
            this.idOfDeletedEmployee = null;
        }
    },

    //thong bao dialog alert
    announce(contentAnnouce) {
      this.contentAlert = contentAnnouce;
      this.showAlert = true;
    },

    //xoa nhan vien
    agreeDelete() {
        console.log(this.idOfDeletedEmployee);
        axios
          .delete("http://api.manhnv.net/v1/employees/" + this.idOfDeletedEmployee)
          .then(() => {
                this.announce("Xóa thành công !")
                this.loadData();
                this.loadDataToDisplay();
          })
          .catch(() => {
            this.announce("Xóa thất bại !")
          });
    },

    disagreeDelete() {
        this.showConfirm = false;
    },

    deleteEmployeeRecord() {
        if(this.idOfDeletedEmployee == null){
            this.announce("Vui lòng chọn nhân viên bạn muốn xóa !")
        } else {
            this.showConfirm = true;
        }
    }, // end xoa nhan vien

    //dat lai mac dinh
    setUpAllDefault(){
      this.loadData();
      this.phoneNumberOrEmployeeCodeOrFullName = "";
      this.sortChoose = "";
      this.deparChoose = "";
      this.posChoose = "";
    },

    //dinh dang ngay hien thi
    formatDateDDMMYYYY(date){
      if(!date){
          return "";
      }
      var newDate = new Date(date);
      var dateString = newDate.getDate() ;
      if(newDate.getDate() < 10) dateString = "0" + dateString;
      var monthString = newDate.getMonth() + 1;
      if(newDate.getMonth() + 1 < 10) monthString = "0" + monthString;
      var yearString = newDate.getFullYear();
      return `${dateString}-${monthString}-${yearString}`;
    },
    formatDateYYYYMMDD(date){
      if(!date){
          return "";
      }
      var newDate = new Date(date);
      var dateString = newDate.getDate() ;
      if(newDate.getDate() < 10) dateString = "0" + dateString;
      var monthString = newDate.getMonth() + 1;
      if(newDate.getMonth() + 1 < 10) monthString = "0" + monthString;
      var yearString = newDate.getFullYear();
      return `${yearString}-${monthString}-${dateString}`;
    },
    //dinh dang hien thi tien
    formatMoney(a){
      if(a == null) return "";
      return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },

    //dinh dang hien thi vi tri
    formatPosition(a){
      if(a == '3700cc49-55b5-69ea-4929-a2925c0f334d') return 'Giám đốc';
      else if(a == '148ed882-32b8-218e-9c20-39c2f00615e8') return 'Nhân viên Marketting';
      else if(a == '25c6c36e-1668-7d10-6e09-bf1378b8dc91') return 'Thu ngân';
      else return ''
    },
    //dinh dang hien thi phong ban
    formatDepartment(a){
      if(a == '469b3ece-744a-45d5-957d-e8c757976496') return 'Phòng Nhân sự';
      else if(a == '4e272fc4-7875-78d6-7d32-6a1673ffca7c') return 'Phòng Công nghệ';
      else if(a == '17120d02-6ab5-3e43-18cb-66948daf6128') return 'Phòng đào tạo';
      else if(a == '142cb08f-7c31-21fa-8e90-67245e8b283e') return 'Phòng Marketting';
      else return '';
    },
    //dinh dang hien thi gioi tinh
    formatGender(a){
      if(a == '0') return 'Nữ';
      else if(a == '1') return 'Nam';
      else if(a == '2') return 'Không xác định';
      else return 'Khác'
    },
    //dinh dang hien thi trang thai cong viec
    formatWorkStatus(a){
      if(a == '0') return 'Đã nghỉ việc';
      else if(a == '1') return 'Đang làm việc';
      else if(a == '2') return 'Đang thử việc';
      else return '';
    },

    //ham loc theo ma, ten, sdt
    filtersAll() {
      if(this.phoneNumberOrEmployeeCodeOrFullName == ""){
        this.employeeForDisplay = this.employees;
      }
      else {
        this.employeeForDisplay = [];
        for(var i=0; i<this.employeeForExcute.length; i++){
          if(this.employeeForExcute[i].EmployeeCode.toString().search(this.phoneNumberOrEmployeeCodeOrFullName) != -1 || 
             this.employeeForExcute[i].FullName.toString().search(this.phoneNumberOrEmployeeCodeOrFullName) != -1 ||
             this.employeeForExcute[i].PhoneNumber.toString().search(this.phoneNumberOrEmployeeCodeOrFullName) != -1 )
             this.employeeForDisplay.push(this.employeeForExcute[i]);
        }
      }
    },
    //ham sap xep
    sortsBy(){
      // console.log(this.sortChoose);
      if(this.sortChoose == "" || this.sortChoose == 1){
        this.loadData();
      }
      else if(this.sortChoose == 2){
        // console.log(this.employeeForExcute);
        this.employeeForExcute.sort((a, b) => (a.FullName > b.FullName) ? 1 : -1);
        this.loadDataToDisplay();
      }
      else if(this.sortChoose == 3){
        this.employeeForExcute.sort((a, b) => (Number(a.Salary < b.Salary)) ? 1 : -1);
        this.loadDataToDisplay();

      }
    },
    //ham loc theo phong ban
    filterByDepar(){
      console.log(this.deparChoose);
      if(this.deparChoose == ""){
        this.loadData();
      }
      else if(this.deparChoose == 1){
        // console.log(this.employees);
        this.employeeForExcute = [];
          for(let i=0; i<this.employees.length; i++){
            if(this.employees[i].DepartmentId == '469b3ece-744a-45d5-957d-e8c757976496'){
              this.employeeForExcute.push(this.employees[i]);
            }
          }
        this.loadDataToDisplay();
      }
      else if(this.deparChoose == 2){
        this.employeeForExcute = [];
          for(let i=0; i<this.employees.length; i++){
            if(this.employees[i].DepartmentId == '17120d02-6ab5-3e43-18cb-66948daf6128'){
              this.employeeForExcute.push(this.employees[i]);
            }
          }
        this.loadDataToDisplay();
      }
      else if(this.deparChoose == 3){
        this.employeeForExcute = [];
          for(let i=0; i<this.employees.length; i++){
            if(this.employees[i].DepartmentId == '142cb08f-7c31-21fa-8e90-67245e8b283e'){
              this.employeeForExcute.push(this.employees[i]);
            }
          }
        this.loadDataToDisplay();
      }
      else if(this.deparChoose == 4){
        this.employeeForExcute = [];
          for(let i=0; i<this.employees.length; i++){
            if(this.employees[i].DepartmentId == '4e272fc4-7875-78d6-7d32-6a1673ffca7c'){
              this.employeeForExcute.push(this.employees[i]);
            }
          }
        this.loadDataToDisplay();
      }
    },
    //ham loc theo vi tri
    filterByPos(){
      if(this.posChoose == ""){
        this.loadData();
      }
      else if(this.posChoose == 1){
        this.employeeForExcute = [];
        for(let i=0; i<this.employees.length; i++){
          if(this.employees[i].PositionId == '25c6c36e-1668-7d10-6e09-bf1378b8dc91'){
            this.employeeForExcute.push(this.employees[i]);
          }
        }
        this.loadDataToDisplay();
      }
      else if(this.posChoose == 2){
        this.employeeForExcute = [];
        for(let i=0; i<this.employees.length; i++){
          if(this.employees[i].PositionId == '148ed882-32b8-218e-9c20-39c2f00615e8'){
            this.employeeForExcute.push(this.employees[i]);
          }
        }
        this.loadDataToDisplay();
      }
      else if(this.posChoose == 3){
        this.employeeForExcute = [];
        for(let i=0; i<this.employees.length; i++){
          if(this.employees[i].PositionId == '3700cc49-55b5-69ea-4929-a2925c0f334d'){
            this.employeeForExcute.push(this.employees[i]);
          }
        }
        this.loadDataToDisplay();
      }
    },



  },
  data() {
    return {
      dialogFormMode: "add",
      isShowDialogDetail: false,
      selectedEmployee: {},

      //data storage
      employees: [],
      employeeForExcute: [],
      employeeForDisplay: [],


      idOfDeletedEmployee: null,

      //alert
      showAlert: false,
      contentAlert: "",

      //confirm
      showConfirm: false,

      //filter
      phoneNumberOrEmployeeCodeOrFullName: "",
      sortChoose: "",
      listItemSorts: [
        {id: 1, text: 'Sắp xếp theo thứ tự thêm mới'},
        {id: 2, text: 'Sắp xếp theo tên khách hàng'},
        {id: 3, text: 'Sắp xếp theo lương giảm dần'},
      ],
      deparChoose: "",
      listItemDepars: [
        {id: 1, text: 'Phòng Nhân sự'},
        {id: 2, text: 'Phòng đào tạo'},
        {id: 3, text: 'Phòng Marketting'},
        {id: 4, text: 'Phòng Công nghệ'},
      ],
      posChoose: "",
      listItemPoss: [
        {id: 1, text: 'Thu ngân'},
        {id: 2, text: 'Nhân viên Maketting'},
        {id: 3, text: 'Giám đốc'},
      ]

    };
  },
  watch: {},
};
</script>

<style scoped>
  .mid .grid {
    position: absolute;
    height: calc(100vh - 220px);
    width: 100%;
    right: 0px;
    overflow: scroll;
  }

  .selected-employee-record{
    background-color: rgb(185, 185, 185);
  }

  
  

  

    
</style>