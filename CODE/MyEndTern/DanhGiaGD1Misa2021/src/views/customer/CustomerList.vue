<template>
  <div>
    <!-- pretop -->
        <div class="pretop">
            <div class="pretop-text">Danh sách khách hàng</div>
            <div class="pretop-button" id = "btnAdd"
                 @click="btnAddOnClick()"
            >
                <div class="icon-add"></div>
                <div class="text-add">Thêm khách hàng</div>
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
            <select class="top-sort-list" style="outline: none; border-radius: 4px; padding-left: 10px;"
              v-model="sortChoose"
              @change="sortsBy()">
                <option value="">Chọn kiểu sắp xếp</option>
                <option v-for="itemSort in listItemSorts"
                        v-bind:key="itemSort.id"
                        v-bind:value="itemSort.id">{{itemSort.text}}</option>
            </select>
            <div class="btn-delete"
              @click="deleteCustomerRecord">Xóa khách hàng</div>
            <div id="btn-refresh" class="top-refresh"
             @click="setUpAllDefault"><i class="fa fa-refresh" aria-hidden="true"></i></div>
        </div>

        <!-- mid -->
        <div class="mid">
            <div class="grid">
                <table id="tblListCustomer" border="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>Mã khách hàng</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Nhóm khách hàng</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Số tiền nợ</th>
                            <th>Mã thẻ thành viên</th>
                            <th>Đang hoạt động</th>
                        </tr>
                    </thead>
                    <tbody style="font-size: 13px;">
                        <tr
                          v-for="customer in customerForDisplay"
                          :key="customer.CustomerId"
                          @dblclick="trOnDblClick(customer.CustomerId)"
                          @click="choseCustomerToDelete(customer.CustomerId)"
                          :class="{
                            'selected-customer-record':
                              customer.CustomerId == customerIdOfDeletedCustomer,
                          }"
                        >
                          <td>{{ customer.CustomerCode }}</td>
                          <td>{{ customer.FullName }}</td>
                          <td>{{ customer.GenderName }}</td>
                          <td>{{ formatDateDDMMYYYY(customer.DateOfBirth) }}</td>
                          <td>{{ customer.CustomerGroupName }}</td>
                          <td>{{ customer.PhoneNumber }}</td>
                          <td>{{ customer.Email }}</td>
                          <td>{{ customer.Address }}</td>
                          <td style="text-align: right;">{{ formatMoney(customer.DebitAmount) }}</td>
                          <td>{{ customer.MemberCardCode}}</td>
                          
                          <td style="text-align: center;"><input type="checkbox" checked /></td>
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


    <md-dialog-alert
      :md-active.sync="showAlert"
      :md-content="contentAlert"
      @keydown.esc="showAlert = false"
    />

    <md-dialog-confirm
      :md-active.sync="showConfirm"
      md-title="Xác nhận"
      md-content="Do you want delete this customer ?"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="disagreeDelete"
      @md-confirm="agreeDelete"
    />


    <CustomerDetail
      :isShow="isShowDialogDetail"
      :customer="selectedCustomer"
      :formMode="dialogFormMode"
      @hideDialog="hideDialog"
    />

  </div>
</template>


<script>
import CustomerDetail from "./CustomerDetail.vue";
import axios from "axios";
export default {
  components: {
    CustomerDetail,
  },
  created() {
    // load dữ liệu cho trang
    axios
      .get("http://api.manhnv.net/api/customers")
      .then((res) => {
        console.log(res);
        this.customers = res.data;
        this.customerForExcute = res.data;
        this.loadDataToDisplay();
      })
      .catch((res) => {
        console.log(res);
      });
  },
  props: [],
  methods: {
      loadData(){
          axios
      .get("http://api.manhnv.net/api/customers")
      .then((res) => {
        console.log(res);
        this.customers = res.data;
        this.customerForExcute = res.data;
        this.loadDataToDisplay();
      })
      .catch((res) => {
        console.log(res);
      });
      },

      loadDataToDisplay(){
        this.customerForDisplay = [];
        for(var i=0; i<this.customerForExcute.length; i++){
          this.customerForDisplay.push(this.customerForExcute[i]);
        }
      },

    /**--------------------------------------
     * Hiển thị Dialog của cha
     * CreatedBy: NVMANH (31/03/2021)
     */
    btnAddOnClick() {
      this.selectedCustomer = {};
      this.isShowDialogDetail = true;
    },
    /**--------------------------------------
     *  ẩn Dialog chi tiết
     * CreatedBy: NVMANH (31/03/2021)
     */
    hideDialog() {
      this.isShowDialogDetail = false;
      this.loadData();
    },


    formatForInputDate(date){
      var d = new Date(date);
      return (
        d.getFullYear() + "-"
        + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + "-"
        + (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate())
      );
    },

    trOnDblClick(customerId) {
      // Lấy id của bản ghi được chọn:

      // Gọi Api lấy thông tin của khách hàng:
      axios
        .get("http://api.manhnv.net/api/customers/" + customerId)
        .then((res) => {
          res.data.DateOfBirth = this.formatForInputDate(res.data.DateOfBirth);
          this.selectedCustomer = res.data;
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

    choseCustomerToDelete(customerCodeChosen){
        if (
            this.customerIdOfDeletedCustomer == null || this.customerIdOfDeletedCustomer != customerCodeChosen
        ) {
            this.customerIdOfDeletedCustomer = customerCodeChosen;
        } else {
            this.customerIdOfDeletedCustomer = null;
        }
    },

    announce(contentAnnouce) {
      this.contentAlert = contentAnnouce;
      this.showAlert = true;
    },

    agreeDelete() {
        console.log(this.customerIdOfDeletedCustomer);
        axios
          .delete("http://api.manhnv.net/api/customers/" + this.customerIdOfDeletedCustomer)
          .then(() => {
                this.announce("Delete success !")
                this.loadData();
                this.loadDataToDisplay();
          })
          .catch(() => {
            this.announce("Delete fail !")
          });
    },

    disagreeDelete() {
        this.showConfirm = false;
    },

    deleteCustomerRecord() {
        if(this.customerIdOfDeletedCustomer == null){
            this.announce("Please click into customer who you needed delete !")
        } else {
            this.showConfirm = true;
        }
    },

    setUpAllDefault(){
      this.loadData();
      this.phoneNumberOrEmployeeCodeOrFullName = "";
      this.sortChoose = "";
    },

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

    formatMoney(a){
      if(a == null) return "";
      return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    },

    filtersAll() {
      if(this.phoneNumberOrEmployeeCodeOrFullName == ""){
        this.customerForDisplay = this.customers;
      }
      else {
        this.customerForDisplay = [];
        for(var i=0; i<this.customerForExcute.length; i++){
          if(this.customerForExcute[i].CustomerCode.toString().search(this.phoneNumberOrEmployeeCodeOrFullName) != -1 || 
             this.customerForExcute[i].FullName.toString().search(this.phoneNumberOrEmployeeCodeOrFullName) != -1 ||
             this.customerForExcute[i].PhoneNumber.toString().search(this.phoneNumberOrEmployeeCodeOrFullName) != -1 )
             this.customerForDisplay.push(this.customerForExcute[i]);
        }
      }
    },
    
    sortsBy(){
      // console.log(this.sortChoose);
      if(this.sortChoose == "" || this.sortChoose == 1){
        this.loadData();
      }
      else if(this.sortChoose == 2){
        // console.log(this.customerForExcute);
        this.customerForExcute.sort((a, b) => (a.FullName > b.FullName) ? 1 : -1);
        this.loadDataToDisplay();
      }
      else if(this.sortChoose == 3){
        this.customerForExcute.sort((a, b) => (Number(a.DebitAmount < b.DebitAmount)) ? 1 : -1);
        this.loadDataToDisplay();

      }
    }



  },
  data() {
    return {
      dialogFormMode: "add",
      isShowDialogDetail: false,
      selectedCustomer: {},

      //data storage
      customers: [],
      customerForExcute: [],
      customerForDisplay: [],


      customerIdOfDeletedCustomer: null,

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
      ]

    };
  },
  watch: {},
};
</script>

<style scoped>
  .mid .grid{
    position: absolute;
    height: calc(100vh - 220px);
    width: 100%;
    right: 0px;
    overflow: scroll;
  }

  .selected-customer-record{
    background-color: rgb(185, 185, 185);
  }

    
</style>